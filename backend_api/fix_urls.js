const db = require('./db');

async function fixUrls() {
    const brokenDomain = 'cdn.samanyudutv.com';
    const localhostBase = 'http://localhost:5000/uploads';
    const ipBase = 'http://192.168.187.185:5000/uploads';

    try {
        const tables = ['shorts', 'news', 'advertisements'];
        const columns = {
            'shorts': ['video_url'],
            'news': ['image_url', 'video_url'],
            'advertisements': ['media_url']
        };

        for (const table of tables) {
            const cols = columns[table];
            const { rows } = await db.query(`SELECT id, ${cols.join(', ')} FROM ${table}`);

            for (const row of rows) {
                let updated = false;
                const updates = {};

                for (const col of cols) {
                    let val = row[col];
                    if (val && (val.includes(brokenDomain) || val.includes('localhost') || val.includes('192.168.29.208'))) {
                        val = val.replace(/https?:\/\/cdn\.samanyudutv\.com/, ipBase);
                        val = val.replace(/http:\/\/localhost:5000\/uploads/, ipBase);
                        val = val.replace(/http:\/\/192\.168\.29\.208:5000\/uploads/, ipBase);
                        updates[col] = val;
                        updated = true;
                    }
                }

                if (updated) {
                    const setClause = Object.keys(updates).map((k, i) => `${k} = $${i + 1}`).join(', ');
                    const values = Object.values(updates);
                    values.push(row.id);
                    await db.query(`UPDATE ${table} SET ${setClause} WHERE id = $${values.length}`, values);
                    console.log(`Updated ${table} ${row.id}`);
                }
            }
        }

        console.log("All broken and localhost URLs fixed to point to IP fallback.");
    } catch (err) {
        console.error("Error fixing URLs:", err);
    } finally {
        process.exit(0);
    }
}

fixUrls();
