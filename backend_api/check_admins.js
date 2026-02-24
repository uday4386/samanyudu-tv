const db = require('./db');
async function checkAdmins() {
    try {
        const { rows } = await db.query('SELECT email, role FROM admin_users');
        console.log('Admin Users:', rows);
    } catch (e) {
        console.error(e);
    }
}
checkAdmins();
