import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Mute from "@/assets/icons/Mute.svg";
import Call from "@/assets/icons/Call.svg";
import { ContactMenu } from "./ContactMenu";
import { Contact } from "@prisma/client";

interface ContactItemProps {
  contact: Contact;
}

export const ContactItem = ({ contact }: ContactItemProps) => {
  return (
    <div className="group flex items-center justify-between py-2 md:py-3">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Image
            src={contact.image || "/images/DefaultPfp.png"}
            alt={contact.name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col max-w-37 md:max-w-90 overflow-hidden">
          <Text variant="h3">{contact.name}</Text>
          <Text variant="message" opacity="secondary" className="leading-4">
            {contact.phoneNumber}
          </Text>
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 has-data-[state=open]:opacity-100 transition-opacity">
        <Button icon={Mute} variant="secondary" />
        <Button icon={Call} variant="secondary" />
        <ContactMenu contact={contact} />
      </div>
    </div>
  );
};
