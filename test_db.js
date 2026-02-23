require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vgokxvelxjgsfoitayyw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
    console.log("Fetching first news to check ID type...");
    const { data: newsData, error: newsError } = await supabase.from('news').select('*').limit(1);
    console.log("News Data:", newsData);

    const { data: shortsData, error: shortsError } = await supabase.from('shorts').select('*').limit(1);
    console.log("Shorts Data:", shortsData);

    const { data: testrpc, error: rpcerror } = await supabase.rpc('increment_news_likes', { row_id: newsData[0].id });
    console.log("RPC Error:", rpcerror);
}

testFetch();
