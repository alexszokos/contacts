import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for merging tailwind classes safely
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
