import type { HTMLAttributes, ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "neutral" | "success" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children?: ReactNode;
}

// Badge conveys status through color alone in the `success`/`info` variants.
// Color contrast passes WCAG AA, but color perception itself is unreliable
// (colorblindness, grayscale displays). Callers MUST pair status variants
// with text that states the status in words (e.g. "Success" / "Live"), not
// rely on the pill color by itself to carry the meaning.
export function Badge({
  variant = "neutral",
  className,
  children,
  ...rest
}: BadgeProps) {
  const classNames = [styles.badge, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classNames} {...rest}>
      {children}
    </span>
  );
}
