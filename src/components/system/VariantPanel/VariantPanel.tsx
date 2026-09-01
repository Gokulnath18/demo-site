import type { ReactNode } from "react";
import styles from "./VariantPanel.module.css";

export interface VariantExample {
  label: string;
  children: ReactNode;
}

export interface VariantPanelProps {
  examples: VariantExample[];
  className?: string;
}

// One lightweight, prop-driven grid shared by every primitive's section
// rather than a bespoke layout per component: each cell just wraps whatever
// real element the caller passes in, so hover/focus/disabled states are the
// actual component's own states (genuinely triggerable), not a second,
// heavier mockup tree re-implementing them.
export function VariantPanel({ examples, className }: VariantPanelProps) {
  const gridClassNames = [styles.grid, className].filter(Boolean).join(" ");

  return (
    <div className={gridClassNames}>
      {examples.map((example) => (
        <div className={styles.cell} key={example.label}>
          <div className={styles.preview}>{example.children}</div>
          <p className={styles.caption}>{example.label}</p>
        </div>
      ))}
    </div>
  );
}
