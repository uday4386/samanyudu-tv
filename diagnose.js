
const { createClient } = require('@supabase/supabase-js');

// Config from .env (hardcoded for diagnosis)
const SUPABASE_URL = 'https://vgokxvelxjgsfoitayyw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function diagnose() {
    console.log("=== SUPABASE DIAGNOSIS ===");
    console.log(`URL: ${SUPABASE_URL}`);

    // 1. List Buckets
    console.log("\n[1] Listing Buckets...");
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();

    if (bucketError) {
        console.error("FAIL: Could not list buckets.", bucketError.message);
        return;
    }

    console.log(`Found ${buckets.length} buckets.`);
    buckets.forEach(b => console.log(` - Name: ${b.name}, Public: ${b.public}`));

    const mediaBucket = buckets.find(b => b.name === 'media');
    if (!mediaBucket) {
        console.error("FAIL: 'media' bucket NOT found!");
        return;
    }
    console.log("PASS: 'media' bucket exists.");

    if (!mediaBucket.public) {
        console.warn("WARNING: 'media' bucket is NOT PUBLIC. Public URLs will fail unless signed URLs are used.");
    } else {
        console.log("PASS: 'media' bucket is public.");
    }

    // 2. Test Upload
    console.log("\n[2] Testing Upload (diagnose_test.txt)...");
    const testCurrentTime = new Date().toISOString();
    const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload('diagnose_test.txt', `Test content generated at ${testCurrentTime}`, {
            contentType: 'text/plain',
            upsert: true
        });

    if (uploadError) {
        console.error("FAIL: Upload failed.", uploadError.message);
        if (uploadError.message.includes('row-level security')) {
            console.error(" -> HINT: RLS Policy missing. See INSTRUCTIONS_TO_FIX_UPLOAD.md");
        }
        return;
    }
    console.log("PASS: Upload successful.", uploadData.path);

    // 3. Test Public URL Access
    console.log("\n[3] Testing Public URL Access...");
    const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl('diagnose_test.txt');

    console.log(`Public URL: ${publicUrl}`);

    try {
        const response = await fetch(publicUrl, { method: 'HEAD' });
        console.log(`Fetch Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            console.log("PASS: Public file is accessible!");
        } else {
            console.error("FAIL: Public file is NOT accessible (Status code not 200).");
            console.error(" -> Cause: Bucket might be private or RLS Select policy is missing.");
        }
    } catch (e) {
        console.error("FAIL: Could not fetch public URL.", e.message);
    }
}

diagnose();
