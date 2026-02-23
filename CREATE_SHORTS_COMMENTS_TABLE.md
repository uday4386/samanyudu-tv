# Setup Shorts Comments

We need a dedicated secure table for saving and retrieving user comments on Shorts.

Please go to your **Supabase dashboard -> SQL Editor** ([Click here to open Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql)) and run the following script:

```sql
-- 1. Create the 'shorts_comments' table
CREATE TABLE IF NOT EXISTS shorts_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    short_id UUID REFERENCES shorts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE shorts_comments ENABLE ROW LEVEL SECURITY;

-- 3. Allow anyone to READ comments
CREATE POLICY "Anyone can view shorts comments" ON shorts_comments
    FOR SELECT USING (true);

-- 4. Allow logged-in users to INSERT comments
CREATE POLICY "Authenticated users can insert comments" ON shorts_comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 5. Allow users to DELETE their own comments
CREATE POLICY "Users can delete own comments" ON shorts_comments
    FOR DELETE USING (auth.uid() = user_id);

-- 6. Add a comments count to shorts table if it doesn't already exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='shorts' AND column_name='comments_count') THEN
        ALTER TABLE shorts ADD COLUMN comments_count INT DEFAULT 0;
    END IF;
END
$$;

-- 7. Trigger to automatically update comment count
CREATE OR REPLACE FUNCTION update_shorts_comment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE shorts SET comments_count = COALESCE(comments_count, 0) + 1 WHERE id = NEW.short_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE shorts SET comments_count = GREATEST(COALESCE(comments_count, 0) - 1, 0) WHERE id = OLD.short_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_shorts_comment ON shorts_comments;
CREATE TRIGGER on_shorts_comment
AFTER INSERT OR DELETE ON shorts_comments
FOR EACH ROW EXECUTE FUNCTION update_shorts_comment_count();
```

After running this script, the app will instantly be able to read and write comments!
