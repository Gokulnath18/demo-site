import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import SystemPage from "./page";

describe("SystemPage", () => {
  it("renders a single h1 headline", () => {
    render(<SystemPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders an h2 section heading for every showcased primitive", () => {
    render(<SystemPage />);
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBeGreaterThanOrEqual(8);
  });

  it("renders a nav link for every section", () => {
    render(<SystemPage />);
    const nav = screen.getByRole("navigation", {
      name: "Showcased components",
    });
    expect(within(nav).getAllByRole("link")).toHaveLength(8);
  });

  it("renders the Button before/after comparison", () => {
    render(<SystemPage />);
    expect(
      screen.getByRole("heading", { name: /before & after/i }),
    ).toBeInTheDocument();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<SystemPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  }, 15000);
});
