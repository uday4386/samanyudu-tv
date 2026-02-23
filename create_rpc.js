require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vgokxvelxjgsfoitayyw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function createRPCs() {
    console.log("Creating RPCs for atomic likes...");

    // Create increment_news_likes
    let { data, error } = await supabase.rpc('increment_likes', {});
    console.log("Result:", data, error);
}

createRPCs();
