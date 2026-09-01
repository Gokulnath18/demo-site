import { render } from "@testing-library/react";
import { Reveal } from "./Reveal";

const useReducedMotionMock = jest.fn(() => false);

jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    useReducedMotion: () => useReducedMotionMock(),
  };
});

describe("Reveal", () => {
  it("renders its children unconditionally, regardless of animation state", () => {
    const { getByText } = render(
      <Reveal>
        <p>Reveal content</p>
      </Reveal>,
    );
    expect(getByText("Reveal content")).toBeInTheDocument();
  });

  it("starts with a translate offset by default (motion preferred)", () => {
    useReducedMotionMock.mockReturnValue(false);
    const { container } = render(<Reveal>content</Reveal>);
    const el = container.firstChild as HTMLElement;

    expect(el.style.opacity).toBe("0");
    expect(el.style.transform).toContain("translateY");
  });

  it("drops the translate offset and stays opacity-only when reduced motion is preferred", () => {
    useReducedMotionMock.mockReturnValue(true);
    const { container } = render(<Reveal>content</Reveal>);
    const el = container.firstChild as HTMLElement;

    expect(el.style.opacity).toBe("0");
    expect(el.style.transform).toBe("");
  });
});
