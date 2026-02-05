
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgokxvelxjgsfoitayyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugNews() {
    console.log("Fetching news to inspect columns...");
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .limit(3);

    if (error) {
        console.error("Error fetching news:", error.message);
        return;
    }

    if (data.length === 0) {
        console.log("No news items found.");
        return;
    }

    console.log("\n--- First News Item Raw Data ---");
    console.log(JSON.stringify(data[0], null, 2));

    console.log("\n--- Checking Image Fields ---");
    data.forEach(item => {
        console.log(`ID: ${item.id}`);
        console.log(`Title: ${item.title}`);
        console.log(`image_url: ${item.image_url}`);
        // Check for common misspellings or alternative cases
        console.log(`imageUrl: ${item.imageUrl}`);
        console.log(`Image: ${item.image}`);
        console.log("-------------------");
    });
}

debugNews();
