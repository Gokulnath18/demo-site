# components/launch

Components specific to the launch/landing page.

- **Hero** — headline, subhead, primary CTA. `HeroCta` is the only Client
  Component in the section for `track()` on click; the section's entrance
  animation is a separate Client leaf, `Reveal` (see below), kept out of
  `Hero` itself so it stays a Server Component.
- **StatPanel** — headline stat callouts plus a Recharts trend chart.
  Unlike FeatureGrid/ChangelogTimeline, it fetches its own data (`getStats`)
  rather than receiving it as props from `launch/page.tsx`, so it stays a
  self-contained Server Component wrapper. The chart itself is isolated in
  `StatChart`, a Client Component — Recharts is the heaviest dependency
  added so far, so that "use client" boundary is kept as small as possible.
  The raw trend data is shaped for the chart by the pure `formatStatData`
  transform (`lib/stats/formatStatData.ts`), which is where this section's
  unit-tested logic lives. Each headline callout counts up via
  `AnimatedNumber`, StatPanel's other Client Component — see its own
  comments for the aria-hidden/sr-only split that keeps assistive tech
  reading the accurate final value instead of intermediate ticks.
- **FeatureGrid** — renders `FeatureContent[]` (fetched from `lib/cms` in
  `launch/page.tsx`) as a grid of `Card`s, staggered into view via
  `StaggerList`/`StaggerItem` (`components/motion`).
- **ChangelogTimeline** — renders `ChangelogEntry[]` (same fetch pattern) as
  an ordered list of dated entries, wrapped in `Reveal` for its entrance.

Motion/animation (Stage 8): the shared `Reveal`/`StaggerList`/`StaggerItem`
wrappers live in `src/components/motion/`, and their timing/easing/stagger
values are centralized in `src/lib/motion/variants.ts` (built on the
duration/easing tokens in `src/lib/tokens.ts`) so every entrance animation
on this page moves at the same rate rather than each component picking its
own numbers. Every animated component reads `useReducedMotion()` and swaps
to an opacity-only (or, for `AnimatedNumber`, no-animation) variant — see
each component's own comment for which choice it made and why.
