import { prisma } from "@/lib/prisma";
import { ContactItem } from "./ContactItem";
import { Contact } from "@prisma/client";

export const ContactList = async () => {
  const contacts: Contact[] = await prisma.contact.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-col">
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
};
