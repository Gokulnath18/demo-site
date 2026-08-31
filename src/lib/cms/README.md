# lib/cms

Mock CMS layer simulating a Ghost Content API, for the launch page (Stage 6).
Added in Stage 4.

- `getChangelog.ts` — async function returning `ChangelogEntry[]`, sorted by
  `published_at` descending, with simulated network latency
- `data/changelog.json` — original placeholder changelog content
- `getFeatures.ts` — added in Stage 6 for the launch page's feature grid.
  Async function returning `FeatureContent[]` in authored order, with
  simulated latency. Doesn't mirror a Ghost resource shape like
  `ChangelogEntry` does — feature-grid copy is evergreen, not a dated post,
  so the schema is just `{ id, title, description }`.
- `data/features.json` — original placeholder feature-grid content
- `index.ts` — barrel re-exporting both fetchers and their types
