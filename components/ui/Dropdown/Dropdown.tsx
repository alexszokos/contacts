"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Text } from "../Text/Text";
import { ElementType } from "react";
import { Icon } from "@/components/ui/Icon/Icon";

interface DropdownProps {
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

export const Dropdown = ({ trigger, children }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className="min-w-40 md:min-w-55 bg-main-80 rounded-lg z-50 overflow-hidden"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface DropdownItemProps {
  icon: ElementType;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const DropdownItem = ({
  icon,
  label,
  disabled,
  onClick,
}: DropdownItemProps) => (
  <DropdownMenu.Item
    className="flex items-center gap-3 px-2.5 py-3 outline-none cursor-pointer hover:bg-main-70 transition-colors duration-75"
    onClick={onClick}
    disabled={disabled}
  >
    <Icon src={icon} size="list" opacity="secondary" />
    <Text variant="body">{label}</Text>
  </DropdownMenu.Item>
);
