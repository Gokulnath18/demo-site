import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tabs } from "./Tabs";

const items = [
  { value: "overview", label: "Overview", content: <p>Overview content</p> },
  { value: "projects", label: "Projects", content: <p>Projects content</p> },
  { value: "account", label: "Account", content: <p>Account content</p> },
];

describe("Tabs", () => {
  it("renders all tab triggers and the default panel", () => {
    render(<Tabs items={items} />);

    expect(screen.getByRole("tab", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByText("Overview content")).toBeInTheDocument();
  });

  it("respects defaultValue", () => {
    render(<Tabs items={items} defaultValue="projects" />);
    expect(screen.getByText("Projects content")).toBeInTheDocument();
  });

  it("marks the active tab with aria-selected", async () => {
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const projectsTab = screen.getByRole("tab", { name: "Projects" });
    expect(overviewTab).toHaveAttribute("aria-selected", "true");
    expect(projectsTab).toHaveAttribute("aria-selected", "false");

    await user.click(projectsTab);

    expect(projectsTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Projects content")).toBeInTheDocument();
  });

  it("moves focus with arrow keys and Home/End, activating on Enter/Space", async () => {
    // Base UI's Tabs.List defaults to manual activation: arrow keys move
    // the roving tabindex, but the tab only becomes selected on Enter/Space.
    const user = userEvent.setup();
    render(<Tabs items={items} />);

    const overviewTab = screen.getByRole("tab", { name: "Overview" });
    const projectsTab = screen.getByRole("tab", { name: "Projects" });
    const accountTab = screen.getByRole("tab", { name: "Account" });

    overviewTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(projectsTab).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(projectsTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    expect(accountTab).toHaveFocus();
    await user.keyboard(" ");
    expect(accountTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    expect(overviewTab).toHaveFocus();
  });

  it("calls onValueChange when the active tab changes", async () => {
    const user = userEvent.setup();
    const onValueChange = jest.fn();
    render(<Tabs items={items} onValueChange={onValueChange} />);

    await user.click(screen.getByRole("tab", { name: "Account" }));

    expect(onValueChange).toHaveBeenCalledWith("account");
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<Tabs items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
