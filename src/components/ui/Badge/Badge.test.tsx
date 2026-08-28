import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Badge } from "./Badge";
import type { BadgeVariant } from "./Badge";

const variants: { variant: BadgeVariant; text: string }[] = [
  { variant: "neutral", text: "Draft" },
  { variant: "success", text: "Success" },
  { variant: "info", text: "Info" },
];

describe("Badge", () => {
  it.each(variants)(
    "renders the $variant variant with its text and class",
    ({ variant, text }) => {
      render(<Badge variant={variant}>{text}</Badge>);
      const badge = screen.getByText(text);
      expect(badge).toBeInTheDocument();
      expect(badge.className).toMatch(new RegExp(variant));
    },
  );

  it("defaults to the neutral variant", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default").className).toMatch(/neutral/);
  });

  it("has no baseline accessibility violations", async () => {
    const { container } = render(<Badge>Live</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
