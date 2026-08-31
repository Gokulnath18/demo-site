# lib/analytics

Mock analytics layer simulating Segment/GTM/Mixpanel event tracking. Added in
Stage 4.

- `track.ts` — typed `track(event, props?)`, console-logged in dev, no-op
  elsewhere; no real SDK, network call, or API key
- `AnalyticsEvent` is a closed string-literal union, not a bare `string`
