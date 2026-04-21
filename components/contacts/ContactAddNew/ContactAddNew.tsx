"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { ContactModal } from "../ContactModal/ContactModal";
import Add from "@/assets/icons/Add.svg";
import { AnimatePresence } from "motion/react";

export const ContactAddNew = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button icon={Add} variant="special" onClick={() => setIsOpen(true)}>
        Add new
      </Button>

      <AnimatePresence>
        {isOpen && (
          <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};
