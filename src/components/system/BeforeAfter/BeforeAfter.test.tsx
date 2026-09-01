import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { BeforeAfter } from "./BeforeAfter";

describe("BeforeAfter", () => {
  it("renders both the before and after panels", () => {
    render(<BeforeAfter />);
    expect(
      screen.getByText("Before", { selector: "strong" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Get started" }),
    ).toBeInTheDocument();
  });

  it("renders the before example as a non-interactive image, not a control", () => {
    render(<BeforeAfter />);
    const before = screen.getByRole("img", {
      name: /illustrative earlier version/i,
    });

    expect(before.tagName).toBe("DIV");
    expect(before).not.toHaveAttribute("tabindex");
  });

  it("keeps the after example a real, focusable button", () => {
    render(<BeforeAfter />);
    const after = screen.getByRole("button", { name: "Get started" });
    after.focus();
    expect(after).toHaveFocus();
  });

  it("renders a written diff with two to four bullets", () => {
    render(<BeforeAfter />);
    const list = screen.getByRole("list");
    expect(list.children.length).toBeGreaterThanOrEqual(2);
    expect(list.children.length).toBeLessThanOrEqual(4);
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<BeforeAfter />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
