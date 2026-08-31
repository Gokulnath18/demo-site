import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import Home from "./page";

describe("Home", () => {
  it("renders a single h1 headline", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders a link to the launch page", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: "View the Launch Page" });
    expect(link).toHaveAttribute("href", "/launch");
  });

  it("renders a link to the design system page", () => {
    render(<Home />);
    const link = screen.getByRole("link", { name: "View the Design System" });
    expect(link).toHaveAttribute("href", "/system");
  });

  it("makes both entry links keyboard-focusable in order", async () => {
    const user = userEvent.setup();
    render(<Home />);

    await user.tab();
    expect(
      screen.getByRole("link", { name: "View the Launch Page" }),
    ).toHaveFocus();

    await user.tab();
    expect(
      screen.getByRole("link", { name: "View the Design System" }),
    ).toHaveFocus();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<Home />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
