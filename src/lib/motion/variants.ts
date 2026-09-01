import { duration, easing } from "@/lib/tokens";
import type { Transition, Variants } from "motion/react";

/**
 * Shared timing/easing for every Motion animation on the launch page, built
 * on the duration/easing tokens in `src/lib/tokens.ts` rather than new
 * magic numbers — the point is that Hero's reveal, FeatureGrid's stagger,
 * and ChangelogTimeline's reveal all move at the same rate and curve, so
 * the page reads as one system instead of several components each picking
 * their own numbers. Add new shared values here, not inline in a component.
 */

const REVEAL_DISTANCE_PX = 16;

/** Small on purpose: a long stagger across a list is exactly the kind of
 *  long-running main-thread JS that dents a Lighthouse Performance score on
 *  load. FeatureGrid's list is short (a handful of cards), so 80ms/item
 *  stays well under a second of total stagger even in the worst case. */
export const STAGGER_DELAY_S = 0.08;

const revealTransition: Transition = {
  duration: duration.slow / 1000,
  ease: easing.decelerate,
};

const reducedRevealTransition: Transition = {
  duration: duration.instant / 1000,
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE_PX },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

// Reduced-motion choice: opacity-only, near-instant. Content still fades
// in rather than popping into place, but the translate — the part a
// motion-sensitive viewer is most likely to react to — is dropped
// entirely rather than just shortened.
const reducedRevealVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: reducedRevealTransition },
};

/** Fade/slide-in variants for a single reveal target (Hero, ChangelogTimeline,
 *  CTA banner, and each FeatureGrid item), swapped for an opacity-only pair
 *  when reduced motion is preferred. This is the one place that decision is
 *  made — components call it rather than branching on the preference
 *  themselves, so the reduced-motion behavior can't drift between them. */
export function getRevealVariants(prefersReducedMotion: boolean): Variants {
  return prefersReducedMotion ? reducedRevealVariants : revealVariants;
}

/** Container variants for a staggered list (FeatureGrid). Children provide
 *  their own item variants via {@link getRevealVariants} and inherit the
 *  "hidden"/"visible" label from this container through Motion's variant
 *  propagation — reduced motion collapses the stagger to 0 so all items
 *  still respect the opacity-only reduction above instead of no-op'ing. */
export function getStaggerContainerVariants(
  prefersReducedMotion: boolean,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : STAGGER_DELAY_S,
      },
    },
  };
}

/** `viewport` option shared by every `whileInView` usage: trigger once,
 *  slightly before the target is fully on screen. */
export const viewportOnce = { once: true, amount: 0.3 } as const;

// Deliberately its own value rather than reusing the UI transition scale
// above — a count-up needs enough time to read as *counting* rather than
// flickering, which 250-600ms isn't built for.
export const COUNT_UP_DURATION_S = 1.2;
export const countUpEase = easing.standard;
