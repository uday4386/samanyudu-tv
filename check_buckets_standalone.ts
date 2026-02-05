
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgokxvelxjgsfoitayyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function listBuckets() {
    console.log("Checking storage buckets...");
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("Error listing buckets:", error.message);
    } else {
        console.log("Existing Buckets:");
        if (!data || data.length === 0) {
            console.log("No buckets found.");
        } else {
            data.forEach(b => console.log(`- ${b.name} (public: ${b.public})`));
        }

        // Try to create 'media' bucket if it doesn't exist
        const mediaBucket = data?.find(b => b.name === 'media');
        if (!mediaBucket) {
            console.log("\n'media' bucket is MISSING. Attempting to create it...");
            const { data: newData, error: createError } = await supabase.storage.createBucket('media', {
                public: true
            });

            if (createError) {
                console.error("FAILED to create 'media' bucket:", createError.message);
                console.error("You likely need to create this bucket manually in the Supabase Dashboard.");
            } else {
                console.log("Successfully created 'media' bucket!");
            }
        } else {
            console.log("\n'media' bucket exists.");
        }
    }
}

listBuckets();
