# Celesnity

Flagship website for Celesnity and Minder: industrial intelligence for the physical world.

## Repository

```text
celesnity/
├── celesnity-web/                  # Production Next.js application
├── README.md
└── .gitignore
```

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
cd celesnity-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` — celestial artwork direction
- `/blueprint` — industrial blueprint artwork direction; intentionally excluded from search indexing

## Quality checks

Run these commands from `celesnity-web/`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Browser tests are available through `npm run test:e2e`.

## Deployment

The Vercel project root directory must be:

```text
celesnity-web
```

Framework preset: **Next.js**. Build and output settings use the Next.js defaults.

The maintained production assets live under `celesnity-web/public/` and `celesnity-web/app/fonts/`.
