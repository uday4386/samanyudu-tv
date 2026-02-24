require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');

async function executeSchema() {
    console.log("Connecting to local 'samanyudu' to build schema...");

    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'samanyudu',
    });

    try {
        await client.connect();
        const sql = fs.readFileSync('schema.sql').toString();
        await client.query(sql);
        console.log("✅ Complete Supabase structure was accurately recreated on local PostgreSQL!");
    } catch (error) {
        console.error("❌ Error migrating schema:", error.message);
    } finally {
        await client.end();
    }
}

executeSchema();
