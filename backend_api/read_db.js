const db = require('./db');
async function check() {
    try {
        const { rows: n } = await db.query("SELECT id, title, image_url, video_url FROM news ORDER BY timestamp DESC LIMIT 10");
        console.log('News:', n);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
