"use client"; // Ensures the component is treated as a Client Component
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import Profile from "./Profile";

function Navbar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const { data: session } = useSession();
  const user = useCurrentUser();
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
          {session?.user && <Profile user={user || null} />}
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
