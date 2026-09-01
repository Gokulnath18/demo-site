import { render } from "@testing-library/react";
import { StaggerItem, StaggerList } from "./Stagger";

const useReducedMotionMock = jest.fn(() => false);

jest.mock("motion/react", () => {
  const actual = jest.requireActual("motion/react");
  return {
    ...actual,
    useReducedMotion: () => useReducedMotionMock(),
  };
});

describe("StaggerList / StaggerItem", () => {
  it("renders every item's content unconditionally, regardless of animation state", () => {
    const { getByText } = render(
      <StaggerList>
        <StaggerItem>Item one</StaggerItem>
        <StaggerItem>Item two</StaggerItem>
      </StaggerList>,
    );
    expect(getByText("Item one")).toBeInTheDocument();
    expect(getByText("Item two")).toBeInTheDocument();
  });

  it("gives each item a translate offset by default (motion preferred)", () => {
    useReducedMotionMock.mockReturnValue(false);
    const { container } = render(
      <StaggerList>
        <StaggerItem>Item</StaggerItem>
      </StaggerList>,
    );
    const item = container.querySelector("li") as HTMLElement;

    expect(item.style.opacity).toBe("0");
    expect(item.style.transform).toContain("translateY");
  });

  it("drops each item's translate offset when reduced motion is preferred", () => {
    useReducedMotionMock.mockReturnValue(true);
    const { container } = render(
      <StaggerList>
        <StaggerItem>Item</StaggerItem>
      </StaggerList>,
    );
    const item = container.querySelector("li") as HTMLElement;

    expect(item.style.opacity).toBe("0");
    expect(item.style.transform).toBe("");
  });
});
