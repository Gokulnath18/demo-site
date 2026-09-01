"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  getRevealVariants,
  getStaggerContainerVariants,
  viewportOnce,
} from "@/lib/motion/variants";

export interface StaggerListProps {
  children: ReactNode;
  className?: string;
}

// `StaggerList`/`StaggerItem` render the exact `<ul>`/`<li>` FeatureGrid
// already used (via Motion's `motion.ul`/`motion.li`), so wiring them in
// doesn't add an extra wrapper element or touch FeatureGrid's grid layout.
// Only these two leaves are Client Components — FeatureGrid itself stays a
// Server Component, same boundary discipline as Reveal.
export function StaggerList({ children, className }: StaggerListProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={getStaggerContainerVariants(Boolean(prefersReducedMotion))}
    >
      {children}
    </motion.ul>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
}

// Deliberately sets no `initial`/`animate`/`whileInView` of its own — it
// inherits the "hidden"/"visible" state from the nearest `StaggerList`
// ancestor via Motion's variant propagation, which is what makes the
// per-item stagger delay work.
export function StaggerItem({ children }: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.li variants={getRevealVariants(Boolean(prefersReducedMotion))}>
      {children}
    </motion.li>
  );
}
