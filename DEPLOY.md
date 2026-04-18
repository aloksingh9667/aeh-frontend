# Cloudflare Pages Deployment Settings

## Build Configuration (set in Cloudflare Pages Dashboard)

| Setting | Value |
|---|---|
| Framework preset | None |
| Build command | `pnpm install && pnpm --filter @workspace/aeh-website run build` |
| Build output directory | `artifacts/aeh-website/dist/public` |
| Root directory | *(leave empty)* |
| Node.js version | `22` |

## Environment Variables (set in CF Pages Dashboard)

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `VITE_API_URL` | Your backend API URL (e.g. from Render) |

> SPA routing is handled by `public/_redirects` file — no extra config needed.
