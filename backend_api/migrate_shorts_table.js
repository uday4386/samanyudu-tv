const db = require('./db');

async function migrateShortsTable() {
    try {
        console.log('Migrating shorts table...');

        // Add area (district) if not exists
        await db.query('ALTER TABLE shorts ADD COLUMN IF NOT EXISTS area VARCHAR');

        // Add author if not exists
        await db.query('ALTER TABLE shorts ADD COLUMN IF NOT EXISTS author VARCHAR');

        console.log('✅ shorts table migrated successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

migrateShortsTable();
