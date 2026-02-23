# 🚀 How to Enable Atomic Likes & Real-Time Sync in Supabase

To fix the issue where likes overwrite each other and don't sync properly across multiple users, you must run this quick script in your Supabase SQL Editor.

## 1. Run the SQL Script
1. Go to your Supabase Dashboard: **[https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/sql/new](https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/sql/new)**
2. Paste the following SQL code into the editor:

```sql
-- 1. Create a function to atomically increment likes for News
CREATE OR REPLACE FUNCTION increment_news_likes(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE news SET likes = COALESCE(likes, 0) + 1 WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- 2. Create a function to atomically decrement likes for News
CREATE OR REPLACE FUNCTION decrement_news_likes(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE news SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- 3. Create a function to atomically increment likes for Shorts
CREATE OR REPLACE FUNCTION increment_shorts_likes(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE shorts SET likes = COALESCE(likes, 0) + 1 WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- 4. Create a function to atomically decrement likes for Shorts
CREATE OR REPLACE FUNCTION decrement_shorts_likes(row_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE shorts SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) WHERE id = row_id;
END;
$$ LANGUAGE plpgsql;

-- 5. IMPORTANT: Enable Realtime tracking for 'news' and 'shorts' so other phones update instantly
alter publication supabase_realtime add table news;
alter publication supabase_realtime add table shorts;
```

3. Click **"Run"** in the bottom right.

## 2. Done!
I have already updated the frontend code in the app to use these atomic functions! Once you run the SQL snippet, likes will flawlessly increment/decrement and sync in real-time instantly without ever missing a count!
