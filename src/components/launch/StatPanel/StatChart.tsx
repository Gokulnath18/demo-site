"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ChartDatum } from "@/lib/stats/formatStatData";
import styles from "./StatChart.module.css";

export interface StatChartProps {
  data: ChartDatum[];
}

const numberFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

// Recharts (+ its d3-* peers) is the heaviest dependency in this project —
// roughly 90KB gzipped, versus low single-digit KB for everything else
// added so far. That's the whole reason this file exists as its own
// Client Component: isolating the "use client" boundary here, rather than
// on `StatPanel`, keeps that cost scoped to this one chart subtree instead
// of pulling the rest of the launch page's static content into the client
// bundle.
export function StatChart({ data }: StatChartProps) {
  const first = data[0];
  const last = data[data.length - 1];
  const trendDescription =
    first && last
      ? `Posts scheduled per month, from ${numberFormatter.format(first.value)} in ${first.label} to ${numberFormatter.format(last.value)} in ${last.label}.`
      : "Posts scheduled per month.";

  return (
    // Recharts' SVG output isn't meaningfully readable node-by-node by
    // screen readers, so it's flattened to a single accessible image with
    // a text alternative here, rather than exposed as an interactive
    // widget (accessibilityLayer disabled below to match).
    <div
      className={styles.chart}
      role="img"
      aria-label={`Area chart. ${trendDescription}`}
    >
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          accessibilityLayer={false}
        >
          <CartesianGrid vertical={false} stroke="var(--color-border)" />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            stroke="var(--color-text-muted)"
            fontSize={12}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke="var(--color-text-muted)"
            fontSize={12}
            width={40}
            tickFormatter={(value: number) => numberFormatter.format(value)}
          />
          <Tooltip
            formatter={(value) => numberFormatter.format(Number(value))}
            contentStyle={{
              background: "var(--color-surface-raised)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text)",
            }}
            labelStyle={{ color: "var(--color-text-muted)" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="var(--color-accent)"
            strokeWidth={2}
            fill="var(--color-accent)"
            fillOpacity={0.1}
            dot={{
              r: 4,
              fill: "var(--color-accent)",
              stroke: "var(--color-surface)",
              strokeWidth: 2,
            }}
            activeDot={{ r: 6 }}
            // No draw-in animation: the numeric callouts render as final
            // static values (per this stage's scope), and an animated
            // chart beside static numbers would read as inconsistent.
            // Count-up/reveal motion for both arrives together in Stage 8.
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
