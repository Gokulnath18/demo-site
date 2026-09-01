import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { ComponentNav } from "./ComponentNav";

const items = [
  { id: "button", label: "Button" },
  { id: "card", label: "Card" },
  { id: "badge", label: "Badge" },
];

function renderWithSections() {
  return render(
    <div>
      <ComponentNav items={items} />
      {items.map((item) => (
        <section key={item.id} id={item.id}>
          <h2>{item.label}</h2>
        </section>
      ))}
    </div>,
  );
}

describe("ComponentNav", () => {
  it("renders a link for every item", () => {
    renderWithSections();
    for (const item of items) {
      expect(
        screen.getByRole("link", { name: item.label }),
      ).toBeInTheDocument();
    }
  });

  it("each link's href points to an existing section with a matching id", () => {
    renderWithSections();
    for (const item of items) {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", `#${item.id}`);
      expect(document.getElementById(item.id)).toBeInTheDocument();
    }
  });

  it("reaches every link via Tab, in order", async () => {
    const user = userEvent.setup();
    renderWithSections();

    for (const item of items) {
      await user.tab();
      expect(screen.getByRole("link", { name: item.label })).toHaveFocus();
    }
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = renderWithSections();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
