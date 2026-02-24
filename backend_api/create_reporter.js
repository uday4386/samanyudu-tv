const db = require('./db');
async function createReporter() {
    try {
        await db.query(`
            INSERT INTO admin_users (email, password, name, role, state, district)
            VALUES ($1, $2, $3, $4, $5, $6)
            ON CONFLICT (email) DO UPDATE 
            SET password = EXCLUDED.password, role = EXCLUDED.role, state = EXCLUDED.state, district = EXCLUDED.district
        `, ['reporter@test.com', 'reporter123', 'Test Reporter', 'sub_admin', 'Andhra Pradesh', 'Vijayawada']);
        console.log('Reporter created successfully');
    } catch (e) {
        console.error(e);
    }
}
createReporter();
