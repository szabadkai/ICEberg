# ICEberg Build Guide

This project supports two build configurations: **Standalone** and **Collaborative**.

## Standalone Build (GitHub Pages)

The standalone build is a lightweight version without database features, perfect for GitHub Pages hosting.

### Features
- Single-user scoring
- Batch upload from CSV
- Export scores to CSV
- No database/authentication required
- Works completely offline after loading

### Building
```bash
npm run build:standalone
```

This will:
1. Use `.env.standalone` configuration (disables Supabase)
2. Build the application without collaborative features
3. Output to `dist/` directory
4. Configure base path for GitHub Pages deployment

### Deployment

The project includes a GitHub Actions workflow that automatically:
1. Builds the standalone version on push to `main`
2. Deploys to GitHub Pages

To enable GitHub Pages:
1. Go to your repository Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to `main` branch

The app will be available at: `https://your-username.github.io/ICEberg/`

## Collaborative Build (Full Features)

The collaborative build includes all features with Supabase backend for team scoring sessions.

### Additional Features
- Multi-user scoring sessions
- Real-time collaboration
- Consensus analysis with variance metrics
- Session management and history
- Data visualization dashboard

### Setup

1. Create a `.env` file with your Supabase credentials:
```bash
VITE_ENABLE_SUPABASE=true
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Run database migrations from `supabase/migrations/`:
   - `20250110_create_scores_table.sql`
   - `20250111_create_collaborative_tables.sql`
   - `20250111_add_responses_column.sql`

### Building
```bash
npm run build:collaborative
```

Or simply:
```bash
npm run build
```

### Development

```bash
# Standalone mode (no Supabase)
cp .env.standalone .env
npm run dev

# Collaborative mode (with Supabase)
cp .env.collaborative .env
npm run dev
```

## Configuration Files

- `.env.standalone` - Configuration for standalone build
- `.env.collaborative` - Template for collaborative build
- `.env` - Active configuration (git-ignored)
- `vite.config.ts` - Build configuration with mode detection
- `tsconfig.standalone.json` - TypeScript config for standalone build

## Project Structure

```
src/
├── components/
│   ├── ice-landing-page.ts          # Conditionally shows collaborative features
│   ├── ice-session-*.ts             # Collaborative features (hidden in standalone)
│   └── ...
├── lib/
│   └── supabase.ts                  # Conditional Supabase initialization
└── store/
    ├── store.ts                     # Main state management
    ├── session-store.ts             # Collaborative session management
    └── supabase-store.ts            # Database operations
```

## Environment Variables

| Variable | Standalone | Collaborative |
|----------|-----------|---------------|
| `VITE_ENABLE_SUPABASE` | `false` | `true` |
| `VITE_SUPABASE_URL` | - | Required |
| `VITE_SUPABASE_ANON_KEY` | - | Required |

## Troubleshooting

### Standalone build fails with TypeScript errors
The standalone build skips TypeScript checking since Supabase types may not be valid when disabled. Vite will still catch runtime errors during build.

### Collaborative features not showing
Ensure `VITE_ENABLE_SUPABASE=true` in your `.env` file and Supabase credentials are configured.

### GitHub Pages deployment fails
1. Check that GitHub Actions has Pages permissions in repository settings
2. Verify the `base` path in `vite.config.ts` matches your repository name
3. Ensure the workflow file is in `.github/workflows/deploy.yml`
