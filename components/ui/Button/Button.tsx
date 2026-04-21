import { ReactNode, ButtonHTMLAttributes, ElementType } from "react";
import { cn } from "@/lib/utils";
import { Text } from "../Text/Text";
import { Icon } from "../Icon/Icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ElementType;
  variant?: "primary" | "secondary" | "special";
}

const variantStyles = {
  primary: "bg-main-60 hover:bg-main-50 active:bg-main-40 rounded-lg",
  secondary: "bg-transparent hover:bg-main-90 active:bg-main-80 rounded-lg",
  special: "button-special rounded-full overflow-hidden",
};

export const Button = ({
  children,
  icon: IconSvg,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const hasLabel = !!children;
  const hasIcon = !!IconSvg;

  return (
    <button
      className={cn(
        "w-min p-1 md:p-2 text-white flex gap-1 md:gap-2 items-center justify-center max-h-10 transition-all duration-75 outline-none whitespace-nowrap cursor-pointer",
        hasLabel && "px-3 md:px-4",
        hasLabel && hasIcon && "pl-3 md:pl-3",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {IconSvg && <Icon src={IconSvg} size="button" />}

      {children && <Text variant="body">{children}</Text>}
    </button>
  );
};
