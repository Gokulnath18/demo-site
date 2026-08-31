import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import LaunchPage from "./page";
import { getChangelog, getFeatures } from "@/lib/cms";

jest.mock("@/lib/cms", () => ({
  getFeatures: jest.fn(),
  getChangelog: jest.fn(),
}));

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
  });

  it("renders a single h1 headline", async () => {
    await renderLaunchPage();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders an h2 for each section", async () => {
    await renderLaunchPage();
    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.length).toBeGreaterThanOrEqual(4);
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
