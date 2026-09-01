import { Card } from "@/components/ui/Card";
import { getStats } from "@/lib/cms";
import { formatStatData } from "@/lib/stats/formatStatData";
import { AnimatedNumber } from "./AnimatedNumber";
import { StatChart } from "./StatChart";
import styles from "./StatPanel.module.css";

// Fetches its own data, unlike FeatureGrid/ChangelogTimeline (which receive
// already-fetched props from `launch/page.tsx`). Keeping the fetch here
// means this stays a thin Server Component wrapper, with the Recharts
// "use client" boundary isolated to `StatChart` alone — see the comment
// there for why that boundary's placement matters.
export async function StatPanel() {
  const stats = await getStats();
  const chartData = formatStatData(stats.trend);

  const growthValue =
    chartData.percentChange === null
      ? null
      : `${chartData.percentChange > 0 ? "+" : ""}${chartData.percentChange}%`;

  return (
    <section className={styles.section} aria-labelledby="stats-heading">
      <h2 id="stats-heading" className={styles.heading}>
        Beacon by the numbers
      </h2>

      {/* Headline callouts double as the chart's accessible text
          alternative — real text content, not locked inside the SVG. */}
      <ul className={styles.highlights}>
        {stats.highlights.map((highlight) => (
          <li key={highlight.id}>
            <Card className={styles.highlightCard}>
              <p className={styles.highlightValue}>
                <AnimatedNumber value={highlight.value} />
              </p>
              <p className={styles.highlightLabel}>{highlight.label}</p>
            </Card>
          </li>
        ))}
        {growthValue && (
          <li>
            <Card className={styles.highlightCard}>
              <p className={styles.highlightValue}>
                <AnimatedNumber value={growthValue} />
              </p>
              <p className={styles.highlightLabel}>
                Posts scheduled, last 6 months
              </p>
            </Card>
          </li>
        )}
      </ul>

      <Card className={styles.chartCard}>
        <StatChart data={chartData.points} />
      </Card>
    </section>
  );
}
