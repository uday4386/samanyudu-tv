
import { createClient } from '@supabase/supabase-js';

// Config
const SUPABASE_URL = 'https://vgokxvelxjgsfoitayyw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkLatestShort() {
    console.log("=== CHECKING LATEST SHORT ===");

    // 1. Get latest short
    const { data: shorts, error } = await supabase
        .from('shorts')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1);

    if (error) {
        console.error("Error fetching shorts:", error.message);
        return;
    }

    if (!shorts || shorts.length === 0) {
        console.log("No shorts found in database.");
        return;
    }

    const short = shorts[0];
    console.log("Latest Short:", short);
    const url = short.video_url;

    if (!url) {
        console.error("FAIL: Video URL is empty.");
        return;
    }

    console.log(`\nTesting URL: ${url}`);

    // check if it is a nice URL or garbage
    if (url.includes('example.com')) {
        console.warn("WARNING: URL is a placeholder (example.com). This is NOT a real upload.");
        return;
    }

    try {
        const response = await fetch(url, { method: 'HEAD' });
        console.log(`Status: ${response.status} ${response.statusText}`);
        console.log(`Content-Type: ${response.headers.get('content-type')}`);
        console.log(`Content-Length: ${response.headers.get('content-length')}`);

        if (response.ok) {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('video')) {
                console.log("PASS: URL is accessible and returns video content.");
            } else {
                console.warn("WARNING: URL is accessible but Content-Type is NOT video/mp4. It is:", contentType);
                console.warn(" -> Browser might fail to play this if it thinks it is text or octet-stream.");
            }
        } else {
            console.error("FAIL: URL is NOT accessible.");
            if (response.status === 404) console.error(" -> 404 Not Found. File might not affect in bucket or bucket name mismatch.");
            if (response.status === 400) console.error(" -> 400 Bad Request. URL formatting issue?");
        }

    } catch (e) {
        console.error("FAIL: Network request failed.", e.message);
    }
}

checkLatestShort();
