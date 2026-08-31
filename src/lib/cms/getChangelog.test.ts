import { getChangelog } from "./getChangelog";
import type { ChangelogEntry } from "./getChangelog";

function isChangelogEntry(value: unknown): value is ChangelogEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === "string" &&
    typeof entry.slug === "string" &&
    typeof entry.title === "string" &&
    typeof entry.html === "string" &&
    typeof entry.plaintext === "string" &&
    typeof entry.published_at === "string" &&
    Array.isArray(entry.tags) &&
    entry.tags.every(
      (tag) =>
        typeof tag === "object" &&
        tag !== null &&
        typeof (tag as Record<string, unknown>).id === "string" &&
        typeof (tag as Record<string, unknown>).name === "string" &&
        typeof (tag as Record<string, unknown>).slug === "string",
    )
  );
}

describe("getChangelog", () => {
  it("returns a realistic number of entries", async () => {
    const entries = await getChangelog();
    expect(entries.length).toBeGreaterThanOrEqual(5);
    expect(entries.length).toBeLessThanOrEqual(8);
  });

  it("returns entries matching the ChangelogEntry shape", async () => {
    const entries = await getChangelog();
    entries.forEach((entry) => {
      expect(isChangelogEntry(entry)).toBe(true);
    });
  });

  it("sorts entries by published_at descending", async () => {
    const entries = await getChangelog();
    const timestamps = entries.map((entry) =>
      new Date(entry.published_at).getTime(),
    );
    const sorted = [...timestamps].sort((a, b) => b - a);
    expect(timestamps).toEqual(sorted);
  });

  it("resolves asynchronously rather than synchronously", () => {
    let resolved = false;
    const promise = getChangelog().then((entries) => {
      resolved = true;
      return entries;
    });

    expect(resolved).toBe(false);
    return promise;
  });
});
