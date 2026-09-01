import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { VariantPanel } from "./VariantPanel";
import { Button } from "@/components/ui/Button";

const examples = [
  { label: "Primary", children: <Button variant="primary">Go</Button> },
  {
    label: "Disabled",
    children: (
      <Button variant="primary" disabled>
        Go
      </Button>
    ),
  },
];

describe("VariantPanel", () => {
  it("renders every example with its caption", () => {
    render(<VariantPanel examples={examples} />);
    expect(screen.getByText("Primary")).toBeInTheDocument();
    expect(screen.getByText("Disabled")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Go" })).toHaveLength(2);
  });

  it("renders a disabled example with the real disabled attribute", () => {
    render(<VariantPanel examples={examples} />);
    const buttons = screen.getAllByRole("button", { name: "Go" });
    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<VariantPanel examples={examples} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
