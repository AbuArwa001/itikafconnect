"use client"; // Ensures the component is treated as a Client Component
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import defaultImage from "@/app/assets/images/Default.jpg";
import { AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/themes";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DropdownMenu } from "@/components/ui/dropdown-menu";

function Navbar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const { data: session } = useSession();
  const user = useCurrentUser();
  const initials = `${user?.name?.split(" ")[0].slice(0, 1)}${user?.name
    ?.split(" ")[1]
    .slice(0, 1)}`;

  return (
    <>
      <nav className="flex justify-between py-2 px-5 bg-light_gold h-auto">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="text-xl text-dark-brown">
            ItiKafConnect
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/admin" className="text-dark-brown">
              Admin
            </Link>
            <Link
              href={`/users/${session?.user?.id}/events`}
              className="text-dark-brown"
            >
              MyEvents
            </Link>
            <Link href="/events/list" className="text-dark-brown">
              Events
            </Link>
          </div>
        </div>
        {session?.user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none p-2 z-10">
              <Avatar fallback={initials}>
                <AvatarImage
                  src={
                    typeof user?.image === "string"
                      ? user.image
                      : typeof defaultImage === "string"
                      ? defaultImage
                      : undefined
                  }
                />
                <AvatarFallback className="text-black">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white border rounded-md shadow-lg z-20 right-0 top-0 mt-2">
              <DropdownMenuLabel className="px-4 py-2 text-gray-700">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-t my-1" />
              <DropdownMenuItem>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
      {isSidebarExpanded && (
        <div className="md:hidden bg-light_gold p-4 space-y-4">
          <Link href="/admin" className="text-dark-brown block">
            Admin
          </Link>
          <Link
            href={`/users/${session?.user?.id}/events`}
            className="text-dark-brown block"
          >
            MyEvents
          </Link>
          <Link href="/events/list" className="text-dark-brown block">
            Events
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
