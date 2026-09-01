import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { A11yNotes } from "./A11yNotes";

const props = {
  implementation: "Base UI (@base-ui/react/tabs)",
  roles: ["tablist / tab / tabpanel per the WAI-ARIA Tabs pattern"],
  keyboard: ["Left/Right arrow keys move focus between tabs"],
  notes: "Manual activation: Enter/Space activates the focused tab.",
};

describe("A11yNotes", () => {
  it("renders implementation, roles, keyboard, and notes content", async () => {
    const user = userEvent.setup();
    render(<A11yNotes {...props} />);

    // <details> content exists in the DOM even while collapsed.
    expect(screen.getByText(props.implementation)).toBeInTheDocument();
    expect(screen.getByText(props.roles[0])).toBeInTheDocument();
    expect(screen.getByText(props.keyboard[0])).toBeInTheDocument();
    expect(screen.getByText(props.notes)).toBeInTheDocument();

    await user.click(screen.getByText("Accessibility notes"));
    expect(screen.getByText(props.implementation)).toBeVisible();
  });

  it("omits the Notes row when no notes are given", () => {
    render(
      <A11yNotes
        implementation={props.implementation}
        roles={props.roles}
        keyboard={props.keyboard}
      />,
    );
    expect(screen.queryByText("Notes")).not.toBeInTheDocument();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<A11yNotes {...props} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
