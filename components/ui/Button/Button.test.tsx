import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { expect, it, describe, vi } from "vitest";

describe("Button", () => {
  const MockIcon = () => <svg data-testid="button-icon" />;

  it("renders text content correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("renders an icon when provided", () => {
    render(<Button icon={MockIcon} />);
    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("applies the correct variant classes", () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-main-60");

    rerender(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-transparent");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Submit</Button>);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is passed", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeDisabled();
  });

  it("applies specific padding when both icon and label are present", () => {
    render(<Button icon={MockIcon}>Label</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveClass("pl-3");
    expect(button).toHaveClass("md:pl-3");
  });
});
