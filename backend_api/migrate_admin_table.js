const db = require('./db');

async function migrateAdminTable() {
    try {
        console.log('Migrating admin_users table...');

        // Add name if not exists
        await db.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS name VARCHAR');

        // Add password if not exists
        await db.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS password VARCHAR');

        // Add state if not exists
        await db.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS state VARCHAR');

        // Update role column to have default
        await db.query("ALTER TABLE admin_users ALTER COLUMN role SET DEFAULT 'sub_admin'");

        // Ensure email is unique and not null
        // First check if email exists as a column
        const { rows: colCheck } = await db.query("SELECT * FROM information_schema.columns WHERE table_name = 'admin_users' AND column_name = 'email'");
        if (colCheck.length === 0) {
            await db.query('ALTER TABLE admin_users ADD COLUMN email VARCHAR UNIQUE');
        }

        // Add created_at if not exists
        await db.query('ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP');

        console.log('✅ admin_users table migrated successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

migrateAdminTable();
