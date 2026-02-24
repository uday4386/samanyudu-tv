const db = require('./db');

async function listShorts() {
    try {
        const { rows } = await db.query('SELECT * FROM shorts');
        console.log(JSON.stringify(rows, null, 2));
    } catch (err) {
        console.error(err);
    }
}

listShorts();
