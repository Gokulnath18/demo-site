"use client";

import { forwardRef } from "react";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
} from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonOwnProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Shows a spinner and blocks interaction, but keeps the element focusable
   *  and announced (aria-disabled + aria-busy) rather than removing it from
   *  the tab order the way native `disabled` does. */
  loading?: boolean;
  children?: ReactNode;
}

// Polymorphic `as="a"` pattern chosen over a separate LinkButton component:
// callers reach for Button in both button and link contexts constantly
// (e.g. a "primary" CTA that's sometimes a submit, sometimes a nav link),
// and a discriminated union keeps each shape's HTML attributes correctly
// typed (href only valid when as="a") without duplicating the variant/size/
// loading styling logic in a second component.
type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    as?: "button";
  };

type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    as: "a";
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function sharedVisualProps(
  variant: ButtonVariant,
  size: ButtonSize,
  isBlocked: boolean,
  loading: boolean,
  className?: string,
) {
  return {
    className: [styles.button, styles[variant], styles[size], className]
      .filter(Boolean)
      .join(" "),
    "aria-busy": loading || undefined,
    "aria-disabled": isBlocked || undefined,
  } as const;
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(props, ref) {
  if (props.as === "a") {
    const {
      as: _as,
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      onClick,
      ...rest
    } = props;
    void _as; // discriminant only — must be excluded from `rest` so it isn't spread onto the DOM node
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
      <a
        {...rest}
        ref={ref as Ref<HTMLAnchorElement>}
        {...sharedVisualProps(variant, size, isBlocked, loading, className)}
        onClick={handleClick}
        tabIndex={rest.tabIndex}
      >
        {spinner}
        {children}
      </a>
    );
  }

  const {
    as: _as,
    variant = "primary",
    size = "md",
    loading = false,
    className,
    children,
    onClick,
    ...rest
  } = props;
  void _as; // discriminant only — must be excluded from `rest` so it isn't spread onto the DOM node
  const isBlocked = loading || Boolean(rest.disabled);
  const spinner = loading && (
    <span className={styles.spinner} aria-hidden="true" />
  );

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isBlocked) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type="button"
      {...rest}
      ref={ref as Ref<HTMLButtonElement>}
      {...sharedVisualProps(variant, size, isBlocked, loading, className)}
      onClick={handleClick}
    >
      {spinner}
      {children}
    </button>
  );
});
