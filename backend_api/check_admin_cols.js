const db = require('./db');

async function checkColumns() {
    try {
        const { rows } = await db.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'admin_users'
        `);
        console.log('Columns in admin_users:', rows);
        process.exit(0);
    } catch (err) {
        console.error('Error checking columns:', err);
        process.exit(1);
    }
}

checkColumns();
