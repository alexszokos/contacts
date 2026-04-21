import { render, screen, fireEvent } from "@testing-library/react";
import { TextField } from "./TextField";
import { expect, it, describe, vi } from "vitest";

describe("TextField", () => {
  it("renders with a label and links to input", () => {
    render(<TextField label="Username" placeholder="Enter name" />);

    const label = screen.getByText("Username");
    const input = screen.getByLabelText("Username");

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Enter name");
  });

  it("displays error message", () => {
    const errorMessage = "Required field";
    render(<TextField label="Email" error={errorMessage} />);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
    expect(errorText).toHaveClass("text-red-500");
  });

  it("calls onChange handler and updates value", () => {
    const handleChange = vi.fn();
    render(<TextField label="Name" onChange={handleChange} />);

    const input = screen.getByLabelText("Name") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "John Doe" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input.value).toBe("John Doe");
  });

  it("forwards native input props", () => {
    render(<TextField label="Password" type="password" required />);

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toBeRequired();
  });
});
