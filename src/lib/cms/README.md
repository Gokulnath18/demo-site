# lib/cms

Mock CMS layer simulating a Ghost Content API, for the launch page (Stage 6).
Added in Stage 4.

- `getChangelog.ts` — async function returning `ChangelogEntry[]`, sorted by
  `published_at` descending, with simulated network latency
- `data/changelog.json` — original placeholder changelog content
