"use client";

import type { ReactElement, ReactNode } from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  /** The trigger element. Base UI's `render` prop merges tooltip behavior
   *  directly onto this element instead of wrapping it in an extra node.
   *  Base UI does not wire the popup to the trigger via `aria-describedby`
   *  — give `children` its own accessible name (visible text or
   *  `aria-label`) that conveys the same information as `content`, since
   *  screen reader and touch users never see the popup itself. */
  children: ReactElement;
  side?: TooltipSide;
  /** Hover delay before opening, in ms. @default 600 (Base UI's default) */
  delay?: number;
}

// Base UI over Radix: Radix's Tooltip ties open state to a Provider-scoped
// context and asChild-cloned trigger, which makes both harder to drive with
// a plain DOM ref. Base UI exposes the same primitives (Root/Trigger/
// Positioner/Popup) but keeps the DOM closer to the surface — its `render`
// prop merges behavior onto our own trigger element rather than requiring a
// clone step, and Popup/Positioner read straight off data-state attributes
// we can style directly. Smaller API surface, less indirection to reason
// about when this component gets composed elsewhere in the system.
export function Tooltip({
  content,
  children,
  side = "top",
  delay,
}: TooltipProps) {
  return (
    <BaseTooltip.Provider delay={delay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={side} sideOffset={8}>
            <BaseTooltip.Popup className={styles.popup}>
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
}
