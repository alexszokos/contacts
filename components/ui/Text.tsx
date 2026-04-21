import { ReactNode, ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

const variantClasses = {
  h1: "font-glysa text-[24px] leading-10 md:text-[32px] md:leading-12 font-medium",
  h2: "font-glysa text-[16px] leading-6 md:text-[24px] md:leading-10 font-medium",
  h3: "font-lexend text-[14px] leading-5 md:text-[16px] md:leading-6 font-normal tracking-custom",
  body: "font-lexend text-[12px] leading-3 md:text-[14px] md:leading-5 font-normal tracking-custom",
  message: "font-lexend text-[12px] leading-3 font-normal tracking-custom",
} as const;

const variantMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  message: "p",
} as const;

const opacityClasses = {
  primary: "opacity-primary",
  secondary: "opacity-secondary",
  disabled: "opacity-disabled",
} as const;

type TextVariant = keyof typeof variantClasses;
type TextOpacity = keyof typeof opacityClasses;

interface TextProps<V extends TextVariant> {
  variant?: V;
  opacity?: TextOpacity;
  className?: string;
  children: ReactNode;
}

export const Text = <V extends TextVariant = "body">({
  variant = "body" as V,
  opacity = "primary",
  className,
  children,
  ...props
}: TextProps<V> & ComponentPropsWithoutRef<(typeof variantMapping)[V]>) => {
  const Component = variantMapping[variant] as ElementType;

  return (
    <Component
      className={cn(
        "text-white truncate",
        variantClasses[variant],
        opacityClasses[opacity],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
