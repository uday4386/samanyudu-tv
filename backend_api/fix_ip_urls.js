const db = require('./db');

async function fixIPUrls() {
    const oldIP = '10.141.147.185';
    const newIP = '172.16.25.13';

    try {
        const tables = ['shorts', 'news', 'advertisements'];
        const columns = {
            'shorts': ['video_url'],
            'news': ['image_url', 'video_url'],
            'advertisements': ['media_url']
        };

        let totalUpdated = 0;

        for (const table of tables) {
            const cols = columns[table];
            const query = `SELECT id, ${cols.map(c => `"${c}"`).join(', ')} FROM ${table}`;
            try {
                const { rows } = await db.query(query);

                for (const row of rows) {
                    let updated = false;
                    const updates = {};
                    let updateQueryParts = [];
                    let values = [];
                    let vIndex = 1;

                    for (const col of cols) {
                        let val = row[col];
                        if (val && val.includes(oldIP)) {
                            val = val.replace(oldIP, newIP);
                            updates[col] = val;
                            updateQueryParts.push(`"${col}" = $${vIndex}`);
                            values.push(val);
                            vIndex++;
                            updated = true;
                        }
                    }

                    if (updated) {
                        values.push(row.id);
                        await db.query(`UPDATE ${table} SET ${updateQueryParts.join(', ')} WHERE id = $${vIndex}`, values);
                        totalUpdated++;
                    }
                }
            } catch (tableErr) {
                console.log(`Could not update table ${table}: ${tableErr.message}`);
                // Continue with other tables
            }
        }

        console.log(`Fixed ${totalUpdated} records with the old IP address.`);
    } catch (err) {
        console.error("Error fixing URLs:", err);
    } finally {
        process.exit(0);
    }
}

fixIPUrls();
