import { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

const sizeClasses = {
  button: "w-6 h-6",
  list: "w-5 h-5",
} as const;

const opacityClasses = {
  primary: "opacity-primary",
  secondary: "opacity-secondary",
  disabled: "opacity-disabled",
} as const;

type IconSize = keyof typeof sizeClasses;
type IconOpacity = keyof typeof opacityClasses;

interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  src: ElementType;
  size?: IconSize;
  opacity?: IconOpacity;
}

export const Icon = ({
  src: SvgComponent,
  size = "button",
  opacity = "primary",
  className,
  ...props
}: IconProps) => {
  return (
    <SvgComponent
      viewBox="0 0 24 24"
      className={cn(
        "text-white",
        sizeClasses[size],
        opacityClasses[opacity],
        className,
      )}
      {...props}
    />
  );
};
