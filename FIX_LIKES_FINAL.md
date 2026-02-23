# 🚨 ONE FINAL FIX: The Missing "Likes" Column

I realized the reason you got that error (**"Failed to update like count remotely"**) is because your database tables literally do not have a column called `likes` to store the numbers yet! 🤯

We need to add this column to both the `news` and `shorts` tables so the numbers have a place to save.

## Do exactly what you just did again:
1. Go back to that same exact SQL Editor link: **[https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/sql/new](https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/sql/new)**
2. Click **"New query"** (or just clear out the old code).
3. Paste the following exact script:

```sql
-- 1. Add the "likes" column to the 'news' table, defaulting to 0
ALTER TABLE news ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- 2. Add the "likes" column to the 'shorts' table, defaulting to 0
ALTER TABLE shorts ADD COLUMN IF NOT EXISTS likes INTEGER DEFAULT 0;

-- 3. (Optional safety) Force any existing NULL likes to 0
UPDATE news SET likes = 0 WHERE likes IS NULL;
UPDATE shorts SET likes = 0 WHERE likes IS NULL;
```

4. Click the green **"Run"** button in the bottom right!

Once this says "Success", the app will immediately work flawlessly. Try liking a post right after!
