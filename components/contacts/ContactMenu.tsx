"use client";

import { Button } from "@/components/ui/Button";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import More from "@/assets/icons/More.svg";
import Settings from "@/assets/icons/Settings.svg";
import Favourite from "@/assets/icons/Favourite.svg";
import Delete from "@/assets/icons/Delete.svg";
import { Contact } from "@prisma/client";
import { useState, useTransition } from "react";
import { deleteContact } from "@/lib/actions";
import { ContactModal } from "./ContactModal";
import { AnimatePresence } from "motion/react";

interface ContactMenuProps {
  contact: Contact;
}

export const ContactMenu = ({ contact }: ContactMenuProps) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteContact(contact.id);

      if (!result.success) alert(result.error || "Failed to delete");
    });
  };

  return (
    <>
      <Dropdown
        trigger={
          <Button
            icon={More}
            variant="secondary"
            className="data-[state=open]:bg-main-80"
          />
        }
      >
        <DropdownItem
          icon={Settings}
          label="Edit"
          onClick={() => setIsOpen(true)}
        />
        <DropdownItem icon={Favourite} label="Favourite" />
        <DropdownItem
          icon={Delete}
          label={isPending ? "Removing..." : "Remove"}
          disabled={isPending}
          onClick={handleDelete}
        />
      </Dropdown>

      <AnimatePresence>
        {isOpen && (
          <ContactModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            contact={contact}
          />
        )}
      </AnimatePresence>
    </>
  );
};
