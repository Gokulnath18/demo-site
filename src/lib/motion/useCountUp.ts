"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";
import { COUNT_UP_DURATION_S, countUpEase } from "./variants";

export interface UseCountUpOptions {
  /** Start the animation once this becomes true (driven by `useInView`). */
  active: boolean;
  /** Skip the animation entirely and jump straight to `target`. */
  skip: boolean;
}

/**
 * Animates a number from 0 up to `target` once `active` flips true, using
 * the shared count-up duration/easing from `variants.ts`. Runs at most
 * once per mount — `active` toggling back off (e.g. `useInView` with
 * `once: false`) doesn't restart it, since a stat re-counting every time
 * it scrolls past would read as broken, not delightful.
 */
export function useCountUp(
  target: number,
  { active, skip }: UseCountUpOptions,
): number {
  // Only the actual `animate()` subscription lives in the effect — the
  // `skip` case is a pure render-time value, not a set-state-in-effect
  // sync, so it doesn't trigger an extra render.
  const [animatedValue, setAnimatedValue] = useState(0);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (skip || !active || hasStarted.current) return;
    hasStarted.current = true;

    const controls = animate(0, target, {
      duration: COUNT_UP_DURATION_S,
      ease: countUpEase,
      onUpdate: setAnimatedValue,
    });

    return () => controls.stop();
  }, [active, skip, target]);

  return skip ? target : animatedValue;
}
