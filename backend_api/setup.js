require('dotenv').config();
const { Client } = require('pg');

async function createDatabase() {
    console.log("Connecting to PostgreSQL to create the entirely new 'samanyudu' database...");

    // We connect to the default 'postgres' database first just to create our custom one.
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'postgres',
    });

    try {
        await client.connect();

        // Check if the db already exists
        const res = await client.query("SELECT datname FROM pg_catalog.pg_database WHERE datname = 'samanyudu'");

        if (res.rowCount === 0) {
            console.log("Database does not exist. Creating 'samanyudu' database...");
            await client.query('CREATE DATABASE samanyudu');
            console.log("✅ 'samanyudu' database created successfully!");
        } else {
            console.log("⚡ 'samanyudu' database already exists!");
        }
    } catch (error) {
        if (error.code === '28P01') {
            console.error("\n❌ PASSWORD AUTHENTICATION FAILED!");
            console.error("Please make sure you put the password you typed during the PostgreSQL installation into your 'backend_api/.env' file exactly on the DB_PASSWORD line!\n");
        } else {
            console.error("\n❌ Error connecting to PostgreSQL:", error.message);
        }
    } finally {
        await client.end();
    }
}

createDatabase();
