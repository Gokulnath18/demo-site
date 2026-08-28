import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Card.module.css";

export type CardVariant = "default" | "elevated";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children?: ReactNode;
}

// No Card.Header/Card.Body/Card.Footer subcomponents: every consumer so far
// (PricingCard in Stage 6, generic content containers elsewhere) just needs
// a styled box with normal children layout. Splitting into subcomponents
// now would be speculative structure with no real usage driving its shape;
// add them later if a consumer's layout actually needs Card to coordinate
// internal spacing between named regions.
export function Card({
  variant = "default",
  className,
  children,
  ...rest
}: CardProps) {
  const classNames = [styles.card, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
}
