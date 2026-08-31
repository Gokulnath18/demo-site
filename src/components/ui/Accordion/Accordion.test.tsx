import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Accordion } from "./Accordion";

const items = [
  { value: "a", title: "What is Base UI?", content: "An unstyled library." },
  { value: "b", title: "How do I start?", content: "Read the docs." },
  { value: "c", title: "Is it free?", content: "Yes." },
];

describe("Accordion", () => {
  it("renders all triggers with panels collapsed by default", () => {
    render(<Accordion items={items} />);

    const trigger = screen.getByRole("button", { name: "What is Base UI?" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("uses real button elements for triggers", () => {
    render(<Accordion items={items} />);
    for (const item of items) {
      expect(screen.getByRole("button", { name: item.title }).tagName).toBe(
        "BUTTON",
      );
    }
  });

  it("expands a panel on click and updates aria-expanded", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole("button", { name: "What is Base UI?" });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("An unstyled library.")).toBeVisible();
  });

  it("expands a panel via keyboard (Enter and Space)", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    const trigger = screen.getByRole("button", { name: "How do I start?" });
    trigger.focus();
    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    await user.keyboard(" ");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("only allows one open panel at a time by default (single type)", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);

    await user.click(screen.getByRole("button", { name: "What is Base UI?" }));
    await user.click(screen.getByRole("button", { name: "How do I start?" }));

    expect(
      screen.getByRole("button", { name: "What is Base UI?" }),
    ).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.getByRole("button", { name: "How do I start?" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("allows multiple open panels when type is multiple", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} type="multiple" />);

    await user.click(screen.getByRole("button", { name: "What is Base UI?" }));
    await user.click(screen.getByRole("button", { name: "How do I start?" }));

    expect(
      screen.getByRole("button", { name: "What is Base UI?" }),
    ).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: "How do I start?" }),
    ).toHaveAttribute("aria-expanded", "true");
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<Accordion items={items} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
