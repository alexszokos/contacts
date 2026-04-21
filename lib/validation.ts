// lib/validation.ts
import { MAX_FILE_SIZE } from "@/consts/limits";
import { ActionState } from "./actions";

// Centralized validation logic for contact data
export const validateContactData = (formData: FormData) => {
  const errors: ActionState["errors"] = {};

  const name = formData.get("name") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const imageFile = formData.get("image") as File | null;

  if (!name || name.trim().length < 1) {
    errors.name = "Name is required.";
  }

  if (phoneNumber && phoneNumber.trim().length > 0) {
    const sanitized = phoneNumber.trim().replace(/[\s-]/g, "");
    const phoneRegex = /^\+?\d{7,15}$/;

    if (!phoneRegex.test(sanitized)) {
      errors.phoneNumber = "Invalid phone number format.";
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,24}$/;
  if (email && email.trim().length > 0 && !emailRegex.test(email)) {
    errors.email = "A valid email address is required.";
  }

  if (imageFile && imageFile.size > MAX_FILE_SIZE) {
    errors.image = "Image must be less than 500KB.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
