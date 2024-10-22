"use client"; // Ensures the component is treated as a Client Component
import { Skeleton } from "@/app/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
// import { Flex } from "@radix-ui/themes";
// import Profile from "./Profile";
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
import { DropdownMenu } from "reactstrap";
import { useCurrentUser } from "@/hooks/use-current-user";

function Navbar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const { status, data: session } = useSession();
  const user = useCurrentUser();
  const initials = `${user?.name?.split(" ")[0].slice(0, 1)}${user?.name
    ?.split(" ")[1]
    .slice(0, 1)}`;
  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between bg-light_gold  h-auto">
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
        {/* Logo and Links */}
        <div className="flex flex-1 items-center justify-between">
          <Link href="/" className="text-xl text-dark-brown">
            ItiKafConnect
          </Link>
          <div className="hidden md:flex space-x-4">
            {/* Links for larger screens */}
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

        {/* Profile or Skeleton */}
        <div className="flex items-center">
          {status === "loading" ? (
            <Skeleton width="3rem" height="3rem" className="rounded-md" />
          ) : (
            // <Profile user={session?.user ?? null} />
            session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
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
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
        </div>
      </nav>

      {/* Sidebar for smaller screens */}
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
