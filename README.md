# Design System Demo

A standalone portfolio demo proving design-system and front-end craft skills.
Built with Next.js (App Router), TypeScript, and CSS Modules — no UI library
dependency, no CSS framework.

This is not a clone of any existing product. It's a from-scratch component
library and design-token system consumed by two pages:

- `/launch` — a polished, animated landing/launch page
- `/system` — a component showcase page

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/            Routes (/, /launch, /system) and the root layout
  components/     ui/ (shared primitives), launch/, system/
  lib/            tokens.ts, cms/ (mock content), analytics/ (mock data)
  styles/         tokens.css — design tokens as CSS custom properties
```

`src/styles/tokens.css` and `src/lib/tokens.ts` are a manual mirror of the
same design tokens (color, type, spacing, radius, shadow, motion) — one in
CSS for styling, one in TypeScript for values components need as JS (e.g.
durations passed into Motion). Keep them in sync when either changes.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run format` — Prettier, write mode
- `npm run format:check` — Prettier, check mode
