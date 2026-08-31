"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { sharedVisualProps } from "./Button";
import type { ButtonProps } from "./Button";
import styles from "./Button.module.css";

export type LinkButtonProps = Omit<
  Extract<ButtonProps, { as: "a" }>,
  "as" | "href"
> & { href: string };

// Renders Next's `Link` directly, styled with Button's own class/aria
// helpers, rather than nesting `<Button as="a">` inside `<Link legacyBehavior
// passHref>`. `legacyBehavior` clones its child to attach routing props, and
// that clone requires a ref — since Next.js 13, `Link` renders its own `<a>`
// and accepts anchor props (className, onClick, ...) directly, so no clone
// (and no `legacyBehavior`, which is deprecated) is needed to get there.
export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  onClick,
  ...rest
}: LinkButtonProps) {
  const isBlocked = loading;
  const spinner = loading && (
    <span className={styles.spinner} aria-hidden="true" />
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isBlocked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <Link
      href={href}
      {...rest}
      {...sharedVisualProps(variant, size, isBlocked, loading, className)}
      onClick={handleClick}
      tabIndex={isBlocked ? -1 : rest.tabIndex}
    >
      {spinner}
      {children}
    </Link>
  );
}
