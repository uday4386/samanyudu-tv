const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://vgokxvelxjgsfoitayyw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnb2t4dmVseGpnc2ZvaXRheXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTE2NDcsImV4cCI6MjA4NTY2NzY0N30.LP0KxR2Jn0FMlk31hYVKkqU4QhbAlQr8M_zbmNGEOyA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testAd() {
    console.log("Testing insert ad...");
    const { data, error } = await supabase.from('advertisements').insert({
        media_url: 'https://example.com/ad.jpg',
        interval_minutes: 15,
        click_url: '',
        is_active: true
    }).select();
    console.log("Insert AD Result:", { data, error });
}
testAd();
