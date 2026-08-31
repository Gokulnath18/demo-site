import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tooltip } from "./Tooltip";

describe("Tooltip", () => {
  it("does not render its popup content until triggered", () => {
    render(
      <Tooltip content="Save your changes" delay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    expect(screen.queryByText("Save your changes")).not.toBeInTheDocument();
  });

  it("shows the popup on hover and hides it on unhover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your changes" delay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Save" });
    await user.hover(trigger);
    await waitFor(() =>
      expect(screen.getByText("Save your changes")).toBeInTheDocument(),
    );

    await user.unhover(trigger);
    await waitFor(() =>
      expect(screen.queryByText("Save your changes")).not.toBeInTheDocument(),
    );
  });

  it("shows the popup on focus, without trapping focus inside it", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your changes" delay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    await user.tab();
    const trigger = screen.getByRole("button", { name: "Save" });
    expect(trigger).toHaveFocus();
    await waitFor(() =>
      expect(screen.getByText("Save your changes")).toBeInTheDocument(),
    );
    // Focus should stay on the trigger — the popup must not steal it.
    expect(trigger).toHaveFocus();
  });

  it("dismisses on Escape", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your changes" delay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Save" }));
    await waitFor(() =>
      expect(screen.getByText("Save your changes")).toBeInTheDocument(),
    );

    await user.keyboard("{Escape}");
    await waitFor(() =>
      expect(screen.queryByText("Save your changes")).not.toBeInTheDocument(),
    );
  });

  it("has no baseline accessibility violations when open", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Save your changes" delay={0}>
        <button type="button">Save</button>
      </Tooltip>,
    );

    await user.hover(screen.getByRole("button", { name: "Save" }));
    await waitFor(() =>
      expect(screen.getByText("Save your changes")).toBeInTheDocument(),
    );

    // Scoped to the portaled popup subtree — axe's page-level "region"
    // landmark rule doesn't apply to a floating element rendered in
    // isolation the way it would to a full page.
    const popup = document.querySelector("[data-base-ui-portal]");
    const results = await axe(popup as HTMLElement);
    expect(results).toHaveNoViolations();
  });
});
