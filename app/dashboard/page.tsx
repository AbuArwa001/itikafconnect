import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Link from "next/link";
import { FaCalendarAlt } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

function Home() {
  return (
    <Command className="bg-secondary rounded-none">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <LuLayoutDashboard className="mr-2" />
            DashBoard
          </CommandItem>
          <CommandItem>
            <FaCalendarAlt
              className="mr-2"
              style={{ color: "var(--geist-foreground)" }}
            />
            <Link href="/calendar">Calendar</Link>
          </CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <FaUser className="mr-2" />
            <Link href="/profile">Profile</Link>
          </CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default Home;
