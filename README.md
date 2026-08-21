# Celesnity

Flagship website for Celesnity and Minder: industrial intelligence for the physical world.

## Repository

```text
celesnity/
├── celesnity-web/                  # Production Next.js application
├── docs/
│   ├── brand-summary.md            # Concise brand reference
│   └── research/symphonyai/        # Archived competitor research
├── README.md
└── .gitignore
```

The independent product repositories that may appear beside this project locally are deliberately ignored here. They keep their own Git history and remotes.

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

Production: [celesnity-competitor.vercel.app](https://celesnity-competitor.vercel.app/)

## Archived research

The former root `index.html` is preserved at `docs/research/symphonyai/index.html`. It is research material, not part of the production website or Vercel build.

The earlier full brand-kit implementation and source artwork remain recoverable from Git history before repository cleanup. The maintained production assets live under `celesnity-web/public/` and `celesnity-web/app/fonts/`.
