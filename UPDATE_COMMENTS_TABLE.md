# Fix Comment Names

Because Supabase securely hides user profiles by default, comments couldn't automatically load the names of *other* users!

To fix this, we will simply save the user's name directly into the comment row itself. 

Please go back to your **Supabase dashboard -> SQL Editor** ([Click here to open Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql)) and run this tiny script to update the table:

```sql
-- Add a column to store the author's name directly with the comment
ALTER TABLE shorts_comments 
ADD COLUMN IF NOT EXISTS user_name TEXT DEFAULT 'User';
```

Once you run this, the app will start attaching the correct names to every new comment, and everyone will be able to see them!
