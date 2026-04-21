import { render, screen } from "@testing-library/react";
import { Text } from "./Text";
import { expect, it, describe } from "vitest";

describe("Text", () => {
  it("renders as an h1 tag when variant is h1", () => {
    render(<Text variant="h1">Heading 1</Text>);
    const element = screen.getByRole("heading", { level: 1 });

    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("H1");
    expect(element).toHaveClass("font-glysa");
  });

  it("renders as a p tag when variant is body", () => {
    render(<Text variant="body">Body text</Text>);
    const element = screen.getByText("Body text");

    expect(element.tagName).toBe("P");
    expect(element).toHaveClass("font-lexend");
  });

  it("applies the correct opacity class", () => {
    render(<Text opacity="secondary">Secondary text</Text>);
    const element = screen.getByText("Secondary text");

    expect(element).toHaveClass("opacity-secondary");
  });

  it("merges custom className with variant classes", () => {
    render(<Text className="custom-class">Content</Text>);
    const element = screen.getByText("Content");

    expect(element).toHaveClass("custom-class");
    expect(element).toHaveClass("truncate");
  });

  it("forwards extra HTML attributes", () => {
    render(<Text title="tooltip">Hover me</Text>);
    const element = screen.getByText("Hover me");

    expect(element).toHaveAttribute("title", "tooltip");
  });
});
