import statsData from "./data/stats.json";

/** A single headline stat callout — pre-formatted for direct display. */
export interface StatHighlight {
  id: string;
  value: string;
  label: string;
}

/** One raw monthly data point behind the stat panel's trend chart. */
export interface StatTrendPoint {
  /** ISO 8601 date, first of the month. */
  date: string;
  postsScheduled: number;
}

export interface StatsData {
  highlights: StatHighlight[];
  trend: StatTrendPoint[];
}

const stats = statsData as StatsData;

/** Simulated network latency, matching the pattern in `getChangelog.ts`. */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Returns mock stat-panel content — headline callouts plus a monthly trend
 * series — simulating a call to a Content API. Unlike `getChangelog`,
 * `trend` is returned in its stored (not necessarily chronological) order:
 * sorting it is `formatStatData`'s job, not the fetcher's, so that ordering
 * logic stays covered by the transform's unit tests.
 */
export async function getStats(): Promise<StatsData> {
  await delay(250);

  return {
    highlights: [...stats.highlights],
    trend: [...stats.trend],
  };
}
