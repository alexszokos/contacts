"use client";

import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { TextField } from "../ui/TextField";
import { useRef, useState, useActionState, useEffect } from "react";
import Image from "next/image";
import Add from "@/assets/icons/Add.svg";
import Delete from "@/assets/icons/Delete.svg";
import Change from "@/assets/icons/Change.svg";
import { createContact, ActionState, updateContact } from "@/lib/actions";
import { Contact } from "@prisma/client";
import { MAX_FILE_SIZE } from "@/consts/limits";
import { validateContactData } from "@/lib/validation";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: Contact;
}

const initialState: ActionState = {
  success: false,
  message: null,
};

export const ContactModal = ({
  isOpen,
  onClose,
  contact,
}: ContactModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    contact?.image || null,
  );
  const [shouldDeleteImage, setShouldDeleteImage] = useState(false);
  const [clientErrors, setClientErrors] = useState<ActionState["errors"]>({});

  const [state, formAction, isPending] = useActionState(
    async (prevState: ActionState, formData: FormData) => {
      if (contact) {
        formData.append("shouldDeleteImage", String(shouldDeleteImage));
        return updateContact(contact.id, prevState, formData);
      }
      return createContact(prevState, formData);
    },
    initialState,
  );

  useEffect(() => {
    if (state.success) onClose();
  }, [state.success, onClose]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const { errors, isValid } = validateContactData(formData);

    if (!isValid) {
      e.preventDefault();
      setClientErrors(errors);
    } else {
      setClientErrors({});
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        alert("File size exceeds 500KB. Please choose a smaller image.");
        e.target.value = "";
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setShouldDeleteImage(false);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
    setShouldDeleteImage(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={contact ? "Edit contact" : "Add contact"}
    >
      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 md:gap-12"
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-18 h-18 md:w-22 md:h-22 rounded-full overflow-hidden shrink-0">
              <Image
                src={imagePreview || "/images/DefaultPfp.png"}
                alt="Preview"
                width={88}
                height={88}
                className="object-cover"
              />
            </div>

            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />

            <div className="flex items-center gap-2">
              <Button
                variant="primary"
                type="button"
                icon={imagePreview ? Change : Add}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? "Change picture" : "Add picture"}
              </Button>

              {imagePreview && (
                <Button
                  variant="primary"
                  type="button"
                  icon={Delete}
                  onClick={handleImageDelete}
                />
              )}
            </div>
          </div>

          <TextField
            label="Name"
            name="name"
            placeholder="Jamie Wright"
            defaultValue={state.inputs?.name ?? contact?.name ?? ""}
            error={clientErrors?.name || state.errors?.name}
          />
          <TextField
            label="Phone number"
            name="phoneNumber"
            placeholder="+01 234 5678"
            defaultValue={
              state.inputs?.phoneNumber ?? contact?.phoneNumber ?? ""
            }
            error={clientErrors?.phoneNumber || state.errors?.phoneNumber}
          />
          <TextField
            label="Email address"
            name="email"
            type="email"
            placeholder="jamie.wright@mail.com"
            defaultValue={state.inputs?.email ?? contact?.email ?? ""}
            error={clientErrors?.email || state.errors?.email}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            type="button"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Done"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
