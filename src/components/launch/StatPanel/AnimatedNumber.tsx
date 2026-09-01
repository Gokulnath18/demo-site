"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { parseStatValue } from "@/lib/motion/parseStatValue";
import { useCountUp } from "@/lib/motion/useCountUp";
import styles from "./AnimatedNumber.module.css";

export interface AnimatedNumberProps {
  /** A pre-formatted stat string from the CMS, e.g. "2.4M", "+18%". */
  value: string;
}

// Reduced-motion choice: the number jumps straight to its final value with
// no animation at all, rather than an instant/opacity-only transition —
// unlike the slide/fade reveals elsewhere in this stage, a static number
// reads identically to a sighted user either way, so there's no visual
// affordance worth preserving.
//
// Accessibility: while counting, the ticking number is `aria-hidden` and a
// visually-hidden sibling span holds the real, final `value` string
// verbatim — present in the DOM from the first render, not swapped in once
// the animation finishes — so assistive tech always gets the accurate
// figure and never announces intermediate ticks. See AnimatedNumber.module.css.
export function AnimatedNumber({ value }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const parsed = parseStatValue(value);
  const skip = !parsed || Boolean(prefersReducedMotion);

  const current = useCountUp(parsed?.target ?? 0, { active: isInView, skip });

  // Nothing to count (unparseable format) or animation skipped entirely —
  // render the plain static text once, no aria-hidden/sr-only split needed.
  if (skip || !parsed) {
    return <span ref={ref}>{value}</span>;
  }

  const displayText = `${parsed.prefix}${current.toFixed(parsed.decimals)}${parsed.suffix}`;

  return (
    <span ref={ref}>
      <span aria-hidden="true">{displayText}</span>
      <span className={styles.srOnly}>{value}</span>
    </span>
  );
}
