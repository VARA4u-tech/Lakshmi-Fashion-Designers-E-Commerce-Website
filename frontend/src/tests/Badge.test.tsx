import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";
import { describe, it, expect } from "vitest";

describe("Badge Component", () => {
  it("renders with default variant", () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText("Test Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-primary");
  });

  it("renders with secondary variant", () => {
    render(<Badge variant="secondary">Secondary Badge</Badge>);
    const badge = screen.getByText("Secondary Badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-secondary");
  });
});
