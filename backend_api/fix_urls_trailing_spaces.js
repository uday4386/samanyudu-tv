const db = require('./db');

async function fixUrls() {
    try {
        console.log('Fixing past URLs...');
        let { rows: news } = await db.query('SELECT id, image_url, video_url FROM news');
        let updatedNewsCount = 0;

        for (let n of news) {
            let updateNeeded = false;
            let img = n.image_url;
            let vid = n.video_url;

            if (img) {
                if (img.endsWith(' ') || img.endsWith('%20')) {
                    img = img.trim();
                    if (img.endsWith('%20')) img = img.substring(0, img.length - 3);
                    updateNeeded = true;
                }
                if (img.includes(' -')) { // Spaces generated in the middle of filename
                    // Since the URL contains ' -', the file saved as `177... -123.jpg`, but local server URLs don't have this problem, but in general it might be encoded. Let's just fix the trailing first.
                }
            }
            if (vid) {
                if (vid.endsWith(' ') || vid.endsWith('%20')) {
                    vid = vid.trim();
                    if (vid.endsWith('%20')) vid = vid.substring(0, vid.length - 3);
                    updateNeeded = true;
                }
            }

            if (updateNeeded) {
                await db.query('UPDATE news SET image_url = $1, video_url = $2 WHERE id = $3', [img, vid, n.id]);
                updatedNewsCount++;
            }
        }

        let { rows: shorts } = await db.query('SELECT id, video_url FROM shorts');
        let updatedShortsCount = 0;

        for (let s of shorts) {
            let vid = s.video_url;
            if (vid) {
                if (vid.endsWith(' ') || vid.endsWith('%20')) {
                    vid = vid.trim();
                    if (vid.endsWith('%20')) vid = vid.substring(0, vid.length - 3);

                    await db.query('UPDATE shorts SET video_url = $1 WHERE id = $2', [vid, s.id]);
                    updatedShortsCount++;
                }
            }
        }

        console.log(`Updated ${updatedNewsCount} news items.`);
        console.log(`Updated ${updatedShortsCount} short items.`);
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

fixUrls();
