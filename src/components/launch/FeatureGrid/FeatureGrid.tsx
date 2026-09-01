import { Card } from "@/components/ui/Card";
import { StaggerItem, StaggerList } from "@/components/motion";
import type { FeatureContent } from "@/lib/cms";
import styles from "./FeatureGrid.module.css";

export interface FeatureGridProps {
  features: FeatureContent[];
}

// Fetched in `launch/page.tsx` (Stage 4's mock CMS layer) and passed down as
// plain props — this component itself does no data fetching. `StaggerList`/
// `StaggerItem` render the `<ul>`/`<li>` directly (see their own comments),
// so FeatureGrid stays a Server Component and its grid layout is untouched.
export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <section className={styles.section} aria-labelledby="features-heading">
      <h2 id="features-heading" className={styles.heading}>
        Everything your queue needs
      </h2>
      <StaggerList className={styles.grid}>
        {features.map((feature) => (
          <StaggerItem key={feature.id}>
            <Card className={styles.card}>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerList>
    </section>
  );
}
