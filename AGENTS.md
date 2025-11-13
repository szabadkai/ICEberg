# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with Lit web components under `src/components`, immutable scoring data in `src/data`, shared store logic in `src/store`, and helpers such as CSV export in `src/utils`. Styling is centralized in `src/styles.css` plus Tailwind config files at the root. Public assets (favicons, illustrations) sit in `public/`, production output lands in `dist/`, and Supabase SQL migrations live in `supabase/migrations`. Docs for workflows (e.g., `SCORING_GUIDE.md`, `COLLABORATIVE_SCORING.md`) are in `docs/` and should be updated alongside code changes.

## Build, Test & Development Commands
- `npm run dev`: launches Vite with hot reload at `http://localhost:5173`.
- `npm run build`: runs `tsc` then bundles for production into `dist/`.
- `npm run build:standalone` / `npm run build:collaborative`: compile with the respective `.env.*` presets for kiosk or Supabase deployments (each script temporarily copies the env file, so avoid interruptions).
- `npm run preview`: serves the production bundle locally for smoke testing.
Use `npx vite --host` when pairing or demoing on the network.

## Coding Style & Naming Conventions
TypeScript + Lit components follow 2-space indentation, explicit interfaces, and PascalCase class names (e.g., `IceScorecardApp`). Component files use kebab-case with the `ice-` prefix, while shared utilities prefer camelCase exports. Run `npx eslint "src/**/*.{ts,js}" --max-warnings=0` and `npx prettier --check "src/**/*.{ts,css}"` before committing; fix via `--write` when necessary. Tailwind classes belong in templates—avoid inline styles.

## Testing Guidelines
Automated tests are not yet wired up, so rely on TypeScript checks plus manual end-to-end walks: start a dev server, score at least one feature, export to CSV, and (when Supabase is enabled) verify inserts through the dashboard. When adding regression coverage, colocate specs next to components (e.g., `ice-results-screen.test.ts`) and exercise edge cases such as empty exports, pagination, and network failures.

## Commit & Pull Request Guidelines
History favors concise, imperative commits (`tooltips`, `supabase`). Keep subjects under 50 characters, lowercase unless a proper noun, and describe one logical change. PRs should include: summary of changes, testing notes (`npm run dev`, `npm run build`), linked issues (`Fixes #123`), and UI diffs (screenshots or short Loom) for any visual updates. Ensure related docs and SQL migrations are updated and reference any new environment variables.

## Security & Configuration Tips
Never commit `.env` files; use `.env.example` to document required keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`). Before shipping collaborative features, rerun the SQL in `supabase/migrations/20250110_create_scores_table.sql` and confirm Row Level Security policies. For previews, scrub exported CSVs of sensitive data before sharing outside the team.
