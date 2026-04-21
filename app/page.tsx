import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ContactList } from "@/components/contacts/ContactList";
import { ContactAddNew } from "@/components/contacts/ContactAddNew";
import BackArrow from "@/assets/icons/BackArrow.svg";
import LightMode from "@/assets/icons/LightMode.svg";
import Settings from "@/assets/icons/Settings.svg";
import ProfilePic from "@/assets/icons/ProfilePic.svg";

export default function Home() {
  return (
    <div className="grid w-full bg-main-100 min-h-screen grid-cols-1 grid-rows-[auto_auto_1fr] md:grid-cols-[1fr_minmax(0,768px)_1fr] md:grid-rows-[96px_96px_1fr]">
      {/* --- GRID TOP ROW (EMPTY SPACE) --- */}
      <div className="hidden md:block border-r border-b border-main-60" />
      <div className="hidden md:block border-b border-main-60" />
      <div className="hidden md:block border-l border-b border-main-60" />

      {/* --- GRID MIDDLE ROW (NAV / HEADER / ACTIONS) --- */}
      <div className="hidden md:flex border-r border-b border-main-60 items-center justify-end p-6">
        <Button icon={BackArrow} variant="secondary" />
      </div>
      <div className="border-b border-main-60 flex items-center justify-between p-2 md:p-6">
        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <Button icon={BackArrow} variant="secondary" />
          </div>
          <Text variant="h1">Contacts</Text>
        </div>
        <div className="flex items-center gap-1 md:gap-2">
          <Button icon={Settings} variant="secondary" />
          <Button icon={ProfilePic} variant="secondary" />
          <ContactAddNew />
        </div>
      </div>
      <div className="hidden md:flex border-l border-b border-main-60 items-center p-6">
        <Button icon={LightMode} variant="secondary" />
      </div>

      {/* --- GRID MAIN CONTENT --- */}
      <div className="hidden md:block border-r border-main-60" />
      <main className="w-full px-3 py-1 md:px-6 md:py-3">
        <ContactList />
      </main>
      <div className="hidden md:block border-l border-main-60" />
    </div>
  );
}
