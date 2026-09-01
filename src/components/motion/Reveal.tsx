"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { getRevealVariants, viewportOnce } from "@/lib/motion/variants";

export interface RevealProps {
  children: ReactNode;
  className?: string;
}

// Generic scroll-triggered fade/slide-in wrapper shared by Hero,
// ChangelogTimeline, and the CTA banner, so their entrance motion is
// visually identical rather than each section tuning its own numbers (see
// `lib/motion/variants.ts`). Kept as a thin client leaf that wraps
// server-rendered `children` rather than converting those sections into
// Client Components themselves — same boundary discipline as HeroCta/
// StatChart from Stage 6/7.
//
// Animates transform (translateY) + opacity only, both GPU-accelerated and
// neither layout-triggering. `children` render into the DOM unconditionally
// on mount — only their opacity/transform change, so screen readers see the
// real content immediately regardless of scroll position or animation state.
export function Reveal({ children, className }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={getRevealVariants(Boolean(prefersReducedMotion))}
    >
      {children}
    </motion.div>
  );
}
