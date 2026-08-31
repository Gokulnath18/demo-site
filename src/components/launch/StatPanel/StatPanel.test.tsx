import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { StatPanel } from "./StatPanel";
import { getStats } from "@/lib/cms";

jest.mock("@/lib/cms", () => ({
  getStats: jest.fn(),
}));

const mockStats = {
  highlights: [
    { id: "h1", value: "2.4M", label: "Posts scheduled all-time" },
    { id: "h2", value: "150K+", label: "Workspaces on Beacon" },
    { id: "h3", value: "4.2 hrs", label: "Saved weekly per team" },
  ],
  trend: [
    { date: "2026-01-01", postsScheduled: 61000 },
    { date: "2026-02-01", postsScheduled: 68000 },
    { date: "2026-03-01", postsScheduled: 72000 },
  ],
};

async function renderStatPanel() {
  const ui = await StatPanel();
  return render(ui);
}

describe("StatPanel", () => {
  beforeEach(() => {
    (getStats as jest.Mock).mockResolvedValue(mockStats);
  });

  it("renders a headline callout for each fetched highlight", async () => {
    await renderStatPanel();
    expect(screen.getByText("2.4M")).toBeInTheDocument();
    expect(screen.getByText("Posts scheduled all-time")).toBeInTheDocument();
    expect(screen.getByText("150K+")).toBeInTheDocument();
    expect(screen.getByText("Workspaces on Beacon")).toBeInTheDocument();
    expect(screen.getByText("4.2 hrs")).toBeInTheDocument();
    expect(screen.getByText("Saved weekly per team")).toBeInTheDocument();
  });

  it("renders an additional callout computed from the trend data", async () => {
    await renderStatPanel();
    // (72000 - 61000) / 61000 * 100 = 18.03... -> rounds to 18
    expect(screen.getByText("+18%")).toBeInTheDocument();
  });

  it("renders exactly one callout per highlight plus the computed one", async () => {
    await renderStatPanel();
    const heading = screen.getByRole("heading", {
      level: 2,
      name: /beacon by the numbers/i,
    });
    const section = heading.closest("section");
    const list = section?.querySelector("ul");
    expect(list?.children).toHaveLength(mockStats.highlights.length + 1);
  });

  it("gives the chart an accessible name describing what it shows", async () => {
    await renderStatPanel();
    expect(
      screen.getByRole("img", { name: /posts scheduled per month/i }),
    ).toBeInTheDocument();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = await renderStatPanel();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
