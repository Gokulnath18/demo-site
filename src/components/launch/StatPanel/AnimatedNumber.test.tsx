import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { AnimatedNumber } from "./AnimatedNumber";

const useReducedMotionMock = jest.fn(() => false);

jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    useReducedMotion: () => useReducedMotionMock(),
  };
});

describe("AnimatedNumber", () => {
  beforeEach(() => {
    useReducedMotionMock.mockReturnValue(false);
  });

  it("exposes the exact, final value to assistive tech via a visually-hidden span", () => {
    render(<AnimatedNumber value="2.4M" />);
    // The IntersectionObserver stub in jest.setup.ts never reports an
    // intersection, so the count never starts — the animating (aria-hidden)
    // span stays at its 0 starting point. The sr-only span is what this
    // test — and, more importantly, a screen reader — relies on for the
    // accurate figure, regardless of animation/in-view state.
    expect(screen.getByText("2.4M")).toBeInTheDocument();
  });

  it("hides the animating number from assistive tech", () => {
    const { container } = render(<AnimatedNumber value="2.4M" />);
    const animating = container.querySelector('[aria-hidden="true"]');
    expect(animating).toBeInTheDocument();
    expect(animating).toHaveTextContent(/M$/);
  });

  it("renders the value once, with no aria-hidden/sr-only split, when reduced motion is preferred", () => {
    useReducedMotionMock.mockReturnValue(true);
    const { container } = render(<AnimatedNumber value="2.4M" />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(screen.getByText("2.4M")).toBeInTheDocument();
  });

  it("falls back to plain static text for a value with no numeric portion", () => {
    const { container } = render(<AnimatedNumber value="N/A" />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<AnimatedNumber value="+18%" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
