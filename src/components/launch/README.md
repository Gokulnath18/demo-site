# components/launch

Components specific to the launch/landing page.

- **Hero** — headline, subhead, primary CTA. `HeroCta` is the only Client
  Component in the section (needs `track()` on click), kept separate so
  `Hero` itself stays a Server Component.
- **FeatureGrid** — renders `FeatureContent[]` (fetched from `lib/cms` in
  `launch/page.tsx`) as a grid of `Card`s.
- **ChangelogTimeline** — renders `ChangelogEntry[]` (same fetch pattern) as
  an ordered list of dated entries.

Motion/animation (stagger, scroll triggers, count-up) arrives in Stage 8 —
everything here is static for now.
