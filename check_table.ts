
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgokxvelxjgsfoitayyw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
    console.log("Checking for 'news' table...");
    const { data, error } = await supabase.from('news').select('count', { count: 'exact', head: true });

    if (error) {
        console.error("Error: Table 'news' likely does not exist or has no policy.");
        console.error("Details:", error.message);
    } else {
        console.log("Success: Table 'news' exists and is accessible.");
    }
}

checkTables();
