const db = require('./db');
async function checkAdmin() {
    try {
        const { rows } = await db.query("SELECT * FROM admin_users WHERE email = 'admin1@samanyudu.tv'");
        console.log('Admin User:', rows[0]);
    } catch (e) {
        console.error(e);
    }
}
checkAdmin();
