import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import LaunchPage from "./page";
import { getChangelog, getFeatures, getStats } from "@/lib/cms";

jest.mock("@/lib/cms", () => ({
  getFeatures: jest.fn(),
  getChangelog: jest.fn(),
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

const mockFeatures = [
  { id: "f1", title: "Feature one", description: "Description one." },
  { id: "f2", title: "Feature two", description: "Description two." },
];

const mockChangelog = [
  {
    id: "c1",
    slug: "entry-one",
    title: "Entry one",
    html: "<p>Entry one body.</p>",
    plaintext: "Entry one body.",
    published_at: "2026-08-01T00:00:00.000Z",
    tags: [{ id: "tag-1", name: "Feature", slug: "feature" }],
  },
  {
    id: "c2",
    slug: "entry-two",
    title: "Entry two",
    html: "<p>Entry two body.</p>",
    plaintext: "Entry two body.",
    published_at: "2026-07-01T00:00:00.000Z",
    tags: [],
  },
];

async function renderLaunchPage() {
  const ui = await LaunchPage();
  return render(ui);
}

describe("LaunchPage", () => {
  beforeEach(() => {
    (getFeatures as jest.Mock).mockResolvedValue(mockFeatures);
    (getChangelog as jest.Mock).mockResolvedValue(mockChangelog);
    (getStats as jest.Mock).mockResolvedValue(mockStats);
  });

  it("renders a single h1 headline", async () => {
    await renderLaunchPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders an h2 for each section", async () => {
    await renderLaunchPage();
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBeGreaterThanOrEqual(5);
  });

  it("renders the stat panel's headline callouts and chart", async () => {
    await renderLaunchPage();
    expect(screen.getByText("2.4M")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /posts scheduled per month/i }),
    ).toBeInTheDocument();
  });

  it("renders the fetched feature grid items", async () => {
    await renderLaunchPage();
    expect(screen.getByText("Feature one")).toBeInTheDocument();
    expect(screen.getByText("Feature two")).toBeInTheDocument();
    expect(
      screen.getAllByRole("heading", { level: 3, name: /^Feature (one|two)$/ }),
    ).toHaveLength(2);
  });

  it("renders all pricing tiers", async () => {
    await renderLaunchPage();
    expect(screen.getByText("Starter")).toBeInTheDocument();
    expect(screen.getByText("Team")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
  });

  it("renders the fetched changelog entries in order", async () => {
    await renderLaunchPage();
    const region = screen.getByRole("region", { name: /what.?s new/i });
    const list = region.querySelector("ol");
    expect(list?.children).toHaveLength(2);
    expect(screen.getByText("Entry one")).toBeInTheDocument();
    expect(screen.getByText("Entry two")).toBeInTheDocument();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = await renderLaunchPage();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
