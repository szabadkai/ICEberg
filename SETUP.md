# ICE Scorecard Setup Guide

## Quick Start (LocalStorage Only)

The app works out of the box with LocalStorage (browser-based storage). No setup required!

Just run:
```bash
npm install
npm run dev
```

## Database Setup (Optional - Recommended for Production)

To enable cloud storage, score editing, and multi-device access, set up Supabase:

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details:
   - Name: `ice-scorecard`
   - Database Password: (create a strong password)
   - Region: (choose closest to you)
4. Click "Create new project" and wait ~2 minutes

### Step 2: Run the Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the contents of `supabase/migrations/20250110_create_scores_table.sql`
4. Paste into the SQL editor
5. Click **"Run"**

You should see: "Success. No rows returned"

### Step 3: Get Your API Keys

1. In Supabase, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your values:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Restart the dev server:
   ```bash
   npm run dev
   ```

### Step 5: Verify It Works

1. Open the app at `http://localhost:5173`
2. Score a feature
3. Check Supabase:
   - Go to **Table Editor** → **scores**
   - You should see your score!

## Features Enabled with Supabase

✅ **Cloud Storage**: Scores saved in the cloud, not just browser
✅ **Multi-Device**: Access scores from any device
✅ **Edit Scores**: Edit previously saved scores
✅ **Delete Individual Scores**: Remove specific scores
✅ **No 100-item Limit**: Store unlimited scores
✅ **Better Performance**: Faster loading with pagination
✅ **Collaboration Ready**: Foundation for multi-user features

## Troubleshooting

### "Supabase not configured" message

- Check that `.env` file exists and has correct values
- Make sure to restart dev server after creating `.env`
- Verify URL starts with `https://` and key is the **anon** key, not service key

### Scores not saving to database

- Check browser console for errors
- Verify SQL migration ran successfully in Supabase
- Check **Logs** in Supabase dashboard for errors

### Migration fails with "already exists"

- The migration is safe to run multiple times
- Or drop the table: `DROP TABLE IF EXISTS scores CASCADE;` then re-run

## Switching from LocalStorage to Supabase

When you add Supabase config, existing LocalStorage scores will remain but won't sync. To migrate:

1. Export scores to CSV from the old version
2. Set up Supabase
3. Manually import if needed (or just start fresh)

## Production Deployment

For production:

1. Add environment variables to your hosting platform (Vercel, Netlify, etc.)
2. Consider adding authentication (Supabase Auth)
3. Update RLS policies to require authentication
4. Enable email notifications for high-priority scores

## Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Report an Issue](https://github.com/yourusername/ice-scorecard/issues)
