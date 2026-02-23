const { createClient } = require('@supabase/supabase-js');
const s = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
    const { data, error } = await s.from('shorts_comments').select('*, auth.users(raw_user_meta_data)');
    console.log('Data:', data);
    console.log('Error:', error);
}
test();
