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
