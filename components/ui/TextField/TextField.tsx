import { InputHTMLAttributes, useId } from "react";
import { cn } from "@/lib/utils";
import { Text } from "../Text/Text";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextField = ({
  label,
  error,
  className,
  ...props
}: TextFieldProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="cursor-pointer w-fit">
          <Text variant="message" opacity="secondary" className="leading-4">
            {label}
          </Text>
        </label>
      )}

      <input
        id={id}
        className={cn(
          "font-lexend h-10 w-full rounded-lg py-2 px-3 outline-none transition-all duration-75",
          "text-white text-sm leading-[100%] tracking-normal placeholder:text-white/32",
          "bg-main-80 border border-main-60 hover:border-main-30 focus:bg-main-60 focus:border-main-10",
          className,
        )}
        {...props}
      />

      {error && (
        <Text variant="message" className="text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
};
