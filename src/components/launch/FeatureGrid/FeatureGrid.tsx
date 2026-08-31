import { Card } from "@/components/ui/Card";
import type { FeatureContent } from "@/lib/cms";
import styles from "./FeatureGrid.module.css";

export interface FeatureGridProps {
  features: FeatureContent[];
}

// Fetched in `launch/page.tsx` (Stage 4's mock CMS layer) and passed down as
// plain props — this component itself does no data fetching.
export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className={styles.section} aria-labelledby="features-heading">
      <h2 id="features-heading" className={styles.heading}>
        Everything your queue needs
      </h2>
      <ul className={styles.grid}>
        {features.map((feature) => (
          <li key={feature.id}>
            <Card className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
