require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://vgokxvelxjgsfoitayyw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testRealtime() {
    console.log("Subscribing to realtime news...");
    const channel = supabase
        .channel('public:news')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'news' }, payload => {
            console.log("Realtime payload received!", payload);
        })
        .subscribe((status) => {
            console.log("Sub status:", status);
            if (status === 'SUBSCRIBED') {
                console.log("Triggering an update...");
                supabase.rpc('increment_news_likes', { row_id: '63cd1a40-b592-45b5-abc4-37a1b4770fca' }).then(res => {
                    console.log("Update sent", res.error || "Success");
                });
            }
        });
}

testRealtime();
