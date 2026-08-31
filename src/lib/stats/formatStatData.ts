import type { StatTrendPoint } from "@/lib/cms/getStats";

/** One point on the stat panel's trend chart, shaped for Recharts. */
export interface ChartDatum {
  label: string;
  value: number;
}

export interface StatChartData {
  points: ChartDatum[];
  latestValue: number | null;
  percentChange: number | null;
}

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

/**
 * Shapes raw monthly trend records into what `StatChart` renders: sorted
 * chronologically (the CMS doesn't guarantee order — see `getStats`), with
 * human-readable month labels, plus the derived headline figures
 * (`latestValue`, `percentChange` from the first point to the last) that
 * `StatPanel` surfaces as a plain-text callout alongside the chart.
 */
export function formatStatData(rawPoints: StatTrendPoint[]): StatChartData {
  if (rawPoints.length === 0) {
    return { points: [], latestValue: null, percentChange: null };
  }

  const sorted = [...rawPoints].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  const points = sorted.map((point) => ({
    label: monthFormatter.format(new Date(point.date)),
    value: point.postsScheduled,
  }));

  const first = sorted[0].postsScheduled;
  const last = sorted[sorted.length - 1].postsScheduled;

  return {
    points,
    latestValue: last,
    // A single point (or a zero-valued starting point) has no meaningful
    // percent change to report, rather than dividing by zero or comparing a
    // point to itself.
    percentChange:
      sorted.length > 1 && first !== 0
        ? Math.round(((last - first) / first) * 100)
        : null,
  };
}
