import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Card } from "./Card";

describe("Card", () => {
  it("renders children", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies the default variant class by default", () => {
    render(<Card data-testid="card">content</Card>);
    expect(screen.getByTestId("card").className).toMatch(/default/);
  });

  it("applies the elevated variant class when requested", () => {
    render(
      <Card data-testid="card" variant="elevated">
        content
      </Card>,
    );
    expect(screen.getByTestId("card").className).toMatch(/elevated/);
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(
      <Card>
        <h2>Card title</h2>
        <p>Card body copy.</p>
      </Card>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
