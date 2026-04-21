"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ title, isOpen, onClose, children }: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal forceMount>
        <Dialog.Overlay asChild forceMount>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
          />
        </Dialog.Overlay>

        <Dialog.Content
          asChild
          forceMount
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 w-full max-w-91 bg-main-100 rounded-lg z-50 focus:outline-none overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: "-50%", y: "-48%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%", y: "-48%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-4 md:p-6">
              <Dialog.Title className="font-glysa text-[20px] md:text-[24px] leading-10 font-medium mb-2 md:mb-6">
                {title}
              </Dialog.Title>
              {children}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
