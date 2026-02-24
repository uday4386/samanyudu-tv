const db = require('./db');

async function checkShortsCols() {
    try {
        const { rows } = await db.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'shorts'
        `);
        console.log('Columns in shorts:', rows);
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

checkShortsCols();
