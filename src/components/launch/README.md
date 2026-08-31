# components/launch

Components specific to the launch/landing page.

- **Hero** — headline, subhead, primary CTA. `HeroCta` is the only Client
  Component in the section (needs `track()` on click), kept separate so
  `Hero` itself stays a Server Component.
- **StatPanel** — headline stat callouts plus a Recharts trend chart.
  Unlike FeatureGrid/ChangelogTimeline, it fetches its own data (`getStats`)
  rather than receiving it as props from `launch/page.tsx`, so it stays a
  self-contained Server Component wrapper. The chart itself is isolated in
  `StatChart`, the section's only Client Component — Recharts is the
  heaviest dependency added so far, so that "use client" boundary is kept
  as small as possible. The raw trend data is shaped for the chart by the
  pure `formatStatData` transform (`lib/stats/formatStatData.ts`), which is
  where this section's unit-tested logic lives.
- **FeatureGrid** — renders `FeatureContent[]` (fetched from `lib/cms` in
  `launch/page.tsx`) as a grid of `Card`s.
- **ChangelogTimeline** — renders `ChangelogEntry[]` (same fetch pattern) as
  an ordered list of dated entries.

Motion/animation (stagger, scroll triggers, count-up) arrives in Stage 8 —
everything here is static for now.
