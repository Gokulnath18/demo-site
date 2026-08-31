import { Card } from "../Card";
import { Badge } from "../Badge";
import { LinkButton } from "../Button";
import styles from "./PricingCard.module.css";

export interface PricingCardProps {
  name: string;
  price: string;
  billingPeriod: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Text of a status pill (e.g. "Most popular"). Omit for no badge. */
  badge?: string;
  /** Visually emphasizes this tier (elevated surface, accent border). */
  highlighted?: boolean;
}

// Shared design-system primitive (composed from Card + Badge + Button/
// LinkButton) rather than a launch-page-only component, even though the
// launch page is its only consumer for now — it's generic pricing-tier
// display, not launch-specific content.
export function PricingCard({
  name,
  price,
  billingPeriod,
  description,
  features,
  ctaLabel,
  ctaHref,
  badge,
  highlighted = false,
}: PricingCardProps) {
  const cardClassNames = [styles.card, highlighted && styles.highlighted]
    .filter(Boolean)
    .join(" ");

  return (
    <Card
      variant={highlighted ? "elevated" : "default"}
      className={cardClassNames}
    >
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        {badge && (
          <Badge variant="info" className={styles.badge}>
            {badge}
          </Badge>
        )}
      </div>
      <p className={styles.price}>
        <span className={styles.priceAmount}>{price}</span>
        <span className={styles.pricePeriod}>{billingPeriod}</span>
      </p>
      <p className={styles.description}>{description}</p>
      <ul className={styles.featureList}>
        {features.map((feature) => (
          <li key={feature} className={styles.featureItem}>
            {feature}
          </li>
        ))}
      </ul>
      <LinkButton
        href={ctaHref}
        variant={highlighted ? "primary" : "secondary"}
        size="md"
        className={styles.cta}
      >
        {ctaLabel}
      </LinkButton>
    </Card>
  );
}
