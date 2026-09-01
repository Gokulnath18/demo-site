import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

// jsdom has no PointerEvent constructor. Base UI (used by Tabs, Accordion,
// Tooltip) synthesizes pointer events internally — e.g. turning an Enter/
// Space keydown on a Tabs.Tab into a click — so tests exercising that code
// path throw without this polyfill.
if (typeof window !== "undefined" && !window.PointerEvent) {
  class PointerEvent extends MouseEvent {
    pointerId?: number;
    pointerType?: string;

    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId;
      this.pointerType = params.pointerType;
    }
  }

  window.PointerEvent = PointerEvent as unknown as typeof window.PointerEvent;
}

// jsdom has no IntersectionObserver. Motion's `useInView`/`whileInView`
// (Stage 8's Reveal/Stagger/AnimatedNumber components) construct a real one
// unconditionally, so without this stub mounting any of them throws. It
// never actually reports an intersection — entrance content simply stays in
// its initial ("hidden") state for the lifetime of a test, which is fine
// since assertions target text content and reduced-motion prop gating, not
// animation state (exact animation timing is out of scope for these tests).
if (typeof window !== "undefined" && !window.IntersectionObserver) {
  class IntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds: ReadonlyArray<number> = [];
  }

  window.IntersectionObserver =
    IntersectionObserver as unknown as typeof window.IntersectionObserver;
  global.IntersectionObserver = window.IntersectionObserver;
}
