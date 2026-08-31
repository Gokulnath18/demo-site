import changelogData from "./data/changelog.json";

/** A single Ghost tag, as returned by the Content API. */
export interface ChangelogTag {
  id: string;
  name: string;
  slug: string;
}

/**
 * Shape of one changelog entry, mirroring a Ghost Content API post
 * (https://ghost.org/docs/content-api/#posts) trimmed to the fields the
 * launch page needs.
 */
export interface ChangelogEntry {
  id: string;
  slug: string;
  title: string;
  html: string;
  plaintext: string;
  /** ISO 8601 timestamp. */
  published_at: string;
  tags: ChangelogTag[];
}

const entries = changelogData as ChangelogEntry[];

/**
 * Simulated network latency. Stage 6 renders this as a Server Component
 * `await`, so it needs to behave like a real fetch (i.e. actually resolve
 * asynchronously) rather than a synchronous read — that's what lets that
 * stage build and test against a realistic loading state.
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns mock changelog entries, newest first, simulating a call to a
 * Ghost-style Content API.
 */
export async function getChangelog(): Promise<ChangelogEntry[]> {
  await delay(300);

  return [...entries].sort(
    (a, b) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  );
}
