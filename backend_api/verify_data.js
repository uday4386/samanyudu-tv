require('dotenv').config();
const { Client } = require('pg');

async function checkDatabase() {
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'samanyudu',
    });

    try {
        await client.connect();
        console.log("📊 CHECKING LOCAL DATABASE 'samanyudu'...\n");

        const tables = [
            'admin_users',
            'advertisements',
            'news',
            'shorts',
            'news_likes',
            'shorts_likes',
            'shorts_comments'
        ];

        for (const table of tables) {
            const { rows } = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
            console.log(`Table '${table}' has ${rows[0].count} rows.`);
        }

        console.log("\n✅ All tables and data are safely inside your local PC's PostgreSQL!");
    } catch (error) {
        console.error("❌ Error checking database:", error.message);
    } finally {
        await client.end();
    }
}

checkDatabase();
