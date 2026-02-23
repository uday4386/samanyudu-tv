# 🚀 How to Enable Secure User-Based Likes

We need to create the secure, user-tied relational tables for Likes. This prevents duplicate likes and ties every like to a specific Auth User Profile.

## 1. Run the SQL Script
1. Go to your Supabase Dashboard: **[https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/sql/new](https://supabase.com/dashboard/project/vgokxvelxjgsfoitayyw/sql/new)**
2. Click **New query** (or just clear out the box) and paste this exact script:

```sql
-- 1. Create the 'news_likes' table
CREATE TABLE IF NOT EXISTS news_likes (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    news_id UUID REFERENCES news(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (user_id, news_id)
);

-- 2. Create the 'shorts_likes' table
CREATE TABLE IF NOT EXISTS shorts_likes (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    short_id UUID REFERENCES shorts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (user_id, short_id)
);

-- 3. Enable Strict Security (RLS) so users can only manage their own likes
ALTER TABLE news_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shorts_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own news likes" ON news_likes
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read all news likes" ON news_likes
    FOR SELECT USING (true);

CREATE POLICY "Users can manage their own shorts likes" ON shorts_likes
    FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can read all shorts likes" ON shorts_likes
    FOR SELECT USING (true);

-- 4. Create Triggers to Automatically Update the Main Counter
-- This is incredibly powerful. Every time a row is inserted/deleted into the likes table it perfectly counts it up/down!
CREATE OR REPLACE FUNCTION update_news_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE news SET likes = COALESCE(likes, 0) + 1 WHERE id = NEW.news_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE news SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) WHERE id = OLD.news_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_news_like
AFTER INSERT OR DELETE ON news_likes
FOR EACH ROW EXECUTE FUNCTION update_news_like_count();


CREATE OR REPLACE FUNCTION update_shorts_like_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE shorts SET likes = COALESCE(likes, 0) + 1 WHERE id = NEW.short_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE shorts SET likes = GREATEST(COALESCE(likes, 0) - 1, 0) WHERE id = OLD.short_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_shorts_like
AFTER INSERT OR DELETE ON shorts_likes
FOR EACH ROW EXECUTE FUNCTION update_shorts_like_count();
```

3. Click **"Run"** in the bottom right!

That's it for the database! I have already updated your Mobile App code to seamlessly interact with these tables.
