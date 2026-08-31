import { formatStatData } from "./formatStatData";
import type { StatTrendPoint } from "@/lib/cms/getStats";

function point(date: string, postsScheduled: number): StatTrendPoint {
  return { date, postsScheduled };
}

describe("formatStatData", () => {
  it("returns empty points and null metrics for an empty array", () => {
    expect(formatStatData([])).toEqual({
      points: [],
      latestValue: null,
      percentChange: null,
    });
  });

  it("returns a single point with no percent change", () => {
    const result = formatStatData([point("2026-03-01", 50000)]);
    expect(result.points).toEqual([{ label: "Mar", value: 50000 }]);
    expect(result.latestValue).toBe(50000);
    expect(result.percentChange).toBeNull();
  });

  it("sorts out-of-order dates chronologically before mapping to points", () => {
    const result = formatStatData([
      point("2026-03-01", 72000),
      point("2026-01-01", 61000),
      point("2026-02-01", 68000),
    ]);
    expect(result.points.map((p) => p.label)).toEqual(["Jan", "Feb", "Mar"]);
    expect(result.points.map((p) => p.value)).toEqual([61000, 68000, 72000]);
  });

  it("derives latestValue and percentChange from the chronologically last point, not the last array entry", () => {
    const result = formatStatData([
      point("2026-06-01", 104000),
      point("2026-01-01", 61000),
    ]);
    expect(result.latestValue).toBe(104000);
    expect(result.percentChange).toBe(70);
  });

  it("computes a negative percentChange when the value decreases", () => {
    const result = formatStatData([
      point("2026-01-01", 100000),
      point("2026-02-01", 80000),
    ]);
    expect(result.percentChange).toBe(-20);
  });

  it("rounds percentChange to the nearest integer", () => {
    const result = formatStatData([
      point("2026-01-01", 3),
      point("2026-02-01", 4),
    ]);
    // (4 - 3) / 3 * 100 = 33.33...
    expect(result.percentChange).toBe(33);
  });

  it("returns a null percentChange when the first point's value is zero, instead of dividing by zero", () => {
    const result = formatStatData([
      point("2026-01-01", 0),
      point("2026-02-01", 500),
    ]);
    expect(result.percentChange).toBeNull();
    expect(Number.isFinite(result.percentChange)).toBe(false);
  });

  it("formats each point's label as a short month name", () => {
    const result = formatStatData([point("2026-12-15", 1000)]);
    expect(result.points[0].label).toBe("Dec");
  });

  it("does not mutate the input array", () => {
    const input = [point("2026-03-01", 72000), point("2026-01-01", 61000)];
    const inputCopy = [...input];
    formatStatData(input);
    expect(input).toEqual(inputCopy);
  });
});
