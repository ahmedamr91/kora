# مدرج Monorepo

Professional Arabic-first football intelligence platform.

## Structure

```txt
madraj/
├── apps/
│   ├── web/      # Next.js frontend
│   └── api/      # Cloudflare Worker API
├── packages/
│   ├── ui/       # shared brand/ui constants
│   ├── types/    # shared TypeScript types
│   └── config/   # shared config helpers
└── docs/
```

## Run frontend

```bash
npm install
npm run dev:web
```

Frontend runs on:

```txt
http://localhost:3000
```

## Run API locally

```bash
npm run dev:api
```

API runs on:

```txt
http://localhost:8787
```

Test endpoints:

```txt
/health
/matches
/matches/live
/stories
/competitions
```

## Deploy frontend

Recommended: Vercel.

- Import GitHub repo
- Set root directory to `apps/web`
- Deploy

## Deploy API

```bash
cd apps/api
npx wrangler login
npx wrangler deploy
```

Add free provider key safely:

```bash
npx wrangler secret put FOOTBALL_DATA_API_KEY
```

## Important

Do not place API keys in the frontend. Keep all secrets inside Cloudflare Worker or later in backend environment variables.
