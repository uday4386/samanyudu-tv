# Setup Sub-Admins and Super-Admins

Please go back to your **Supabase dashboard -> SQL Editor** ([Click here to open Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql)) and run this script to create the new permissions table for your admins!

```sql
-- 1. Create the admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'sub_admin')),
  district TEXT
);

-- 2. Turn on Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Allow Anyone to read the rules so the Dashboard knows who is allowed in
CREATE POLICY "Public can view admins" ON admin_users
  FOR SELECT USING (true);

-- 4. Automatically add your first Super Admin (Change the email below to your real login email!)
INSERT INTO admin_users (email, role, district) 
VALUES ('admin@samanyudu.tv', 'super_admin', 'ALL')
ON CONFLICT (email) DO NOTHING;
```
