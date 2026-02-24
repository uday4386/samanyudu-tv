require('dotenv').config();
const { Pool } = require('pg');

// This Pool connects to your new PostgreSQL database on Hetzner.
// Note: While developing locally, you can use a local Postgres database.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // ssl: { rejectUnauthorized: false } // You might need this for external connections later
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
