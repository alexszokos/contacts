"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { uploadImage } from "./storage";
import fs from "fs/promises";
import path from "path";
import { validateContactData } from "./validation";

export type ActionState = {
  success: boolean;
  message: string | null;
  errors?: {
    name?: string;
    phoneNumber?: string;
    email?: string;
    image?: string;
  };
  inputs?: {
    name?: string;
    phoneNumber?: string;
    email?: string;
  };
};

export async function createContact(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const imageFile = formData.get("image") as File | null;
  const { errors, isValid } = validateContactData(formData);

  if (!isValid) {
    return {
      success: false,
      message: "Validation failed.",
      errors,
      inputs: { name, phoneNumber, email },
    };
  }

  try {
    let imagePath = null;

    if (imageFile && imageFile.size > 0) {
      try {
        imagePath = await uploadImage(imageFile);
      } catch (uploadErr) {
        console.error("Image Upload Error:", uploadErr);
        return {
          success: false,
          message: "Failed to upload image. Please try again.",
        };
      }
    }

    await prisma.contact.create({
      data: { name, phoneNumber, email, image: imagePath },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Contact created successfully!",
    };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      success: false,
      message: "Failed to create contact.",
    };
  }
}

export async function deleteContact(id: string) {
  try {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) return { success: false, error: "Contact not found" };

    await deleteLocalFile(contact.image);
    await prisma.contact.delete({ where: { id } });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Failed to delete contact." };
  }
}

export async function updateContact(
  id: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const email = formData.get("email") as string;
  const imageFile = formData.get("image") as File | null;
  const shouldDeleteImage = formData.get("shouldDeleteImage") === "true";
  const { errors, isValid } = validateContactData(formData);

  if (!isValid) {
    return {
      success: false,
      message: "Validation failed.",
      errors,
      inputs: { name, phoneNumber, email },
    };
  }

  try {
    const contact = await prisma.contact.findUnique({ where: { id } });
    if (!contact) return { success: false, message: "Contact not found." };

    let imagePath = contact.image;

    if (shouldDeleteImage || (imageFile && imageFile.size > 0)) {
      await deleteLocalFile(contact.image);
      imagePath = null;
    }

    if (imageFile && imageFile.size > 0) {
      imagePath = await uploadImage(imageFile);
    }

    await prisma.contact.update({
      where: { id },
      data: { name, phoneNumber, email, image: imagePath },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Contact updated successfully!",
    };
  } catch (error) {
    console.error("Database Update Error:", error);
    return {
      success: false,
      message: "An error occurred while updating the contact.",
    };
  }
}

// Helper to keep the main function clean
async function deleteLocalFile(imagePath: string | null) {
  if (!imagePath || !imagePath.startsWith("/uploads/")) return;

  const filePath = path.join(process.cwd(), "public", imagePath);

  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(`Failed to delete file at ${filePath}:`, err);
  }
}
