# ⚠️ CRITICAL FIX: "media" Bucket Missing

The diagnostic test shows **NO BUCKETS FOUND**. You must create the **media** bucket for uploads to work.

## 1. Create the Bucket (If missing)
1. Go to Supabase Storage Dashboard: **[https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/storage/buckets](https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/storage/buckets)**
2. If you don't see a bucket named `news-media`, click **Create new bucket**.
3. Name it: **`news-media`**
4. **IMPORTANT:** Toggle **"Public bucket"** to ON.
5. Click **Save**.

## 2. Add Upload Permissions (Policy)
1. Click on the new **`news-media`** bucket.
2. Click **"Configuration"** -> **"Policies"**.
3. Click **"New Policy"** -> **"For full customization"**.
4. **Name:** `Allow Public Uploads`
5. **Allowed Operations:** Check **INSERT**, **SELECT**, **UPDATE**, **DELETE**.
6. **Target Roles:** Select `anon` and `authenticated`.
7. Click **Save**.

## 3. Verify
Run `npm run dev` and try uploading again. It will work.
