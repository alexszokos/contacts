import { describe, it, expect } from "vitest";
import { validateContactData } from "./validation";

describe("validateContactData", () => {
  it("should return an error if name is empty", () => {
    const formData = new FormData();
    formData.append("name", "");
    formData.append("phoneNumber", "123456789");

    const { errors, isValid } = validateContactData(formData);

    expect(isValid).toBe(false);
    expect(errors.name).toBe("Name is required.");
  });

  it("should return an error for invalid phone formats", () => {
    const formData = new FormData();
    formData.append("name", "John Doe");
    formData.append("phoneNumber", "abc"); // Invalid

    const { errors, isValid } = validateContactData(formData);

    expect(isValid).toBe(false);
    expect(errors.phoneNumber).toBe("Invalid phone number format.");
  });

  it("should pass with valid data", () => {
    const formData = new FormData();
    formData.append("name", "Jane Doe");
    formData.append("phoneNumber", "+3601234567");

    const { isValid } = validateContactData(formData);

    expect(isValid).toBe(true);
  });
});
