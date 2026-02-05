
import { supabase } from './src/lib/supabase';

async function listBuckets() {
    console.log("Checking storage buckets...");
    const { data, error } = await supabase.storage.listBuckets();

    if (error) {
        console.error("Error listing buckets:", error.message);
    } else {
        console.log("Existing Buckets:");
        if (data.length === 0) {
            console.log("No buckets found.");
        } else {
            data.forEach(b => console.log(`- ${b.name} (public: ${b.public})`));
        }
    }
}

listBuckets();
