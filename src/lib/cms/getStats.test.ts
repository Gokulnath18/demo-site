import { getStats } from "./getStats";
import type { StatHighlight, StatTrendPoint } from "./getStats";

function isStatHighlight(value: unknown): value is StatHighlight {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;

  return (
    typeof entry.id === "string" &&
    typeof entry.value === "string" &&
    typeof entry.label === "string"
  );
}

function isStatTrendPoint(value: unknown): value is StatTrendPoint {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;

  return (
    typeof entry.date === "string" && typeof entry.postsScheduled === "number"
  );
}

describe("getStats", () => {
  it("returns 3 to 5 headline highlights", async () => {
    const { highlights } = await getStats();
    expect(highlights.length).toBeGreaterThanOrEqual(3);
    expect(highlights.length).toBeLessThanOrEqual(5);
  });

  it("returns highlights matching the StatHighlight shape", async () => {
    const { highlights } = await getStats();
    highlights.forEach((highlight) => {
      expect(isStatHighlight(highlight)).toBe(true);
    });
  });

  it("returns more than one trend point", async () => {
    const { trend } = await getStats();
    expect(trend.length).toBeGreaterThan(1);
  });

  it("returns trend points matching the StatTrendPoint shape", async () => {
    const { trend } = await getStats();
    trend.forEach((point) => {
      expect(isStatTrendPoint(point)).toBe(true);
    });
  });

  it("resolves asynchronously rather than synchronously", () => {
    let resolved = false;
    const promise = getStats().then((stats) => {
      resolved = true;
      return stats;
    });

    expect(resolved).toBe(false);
    return promise;
  });
});
