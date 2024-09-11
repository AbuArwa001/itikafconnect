"use client"; // Ensures the component is treated as a Client Component
import Link from "next/link";
import React, { useState } from "react";
import Profile from "./Profile";
import NavItem from "./NavItem";
import { useSession } from "next-auth/react";
import { Container } from "@radix-ui/themes";

function Navbar() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const { status, data: session } = useSession();

  return (
    <>
      {/* Navbar */}
      {/* <Container> */}
      <nav className="bg-light_gold navbar bg-base-100">
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

        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl text-dark-brown">
            ItiKafConnect
          </Link>
        </div>
        <div className="flex-none">
          {status === "authenticated" && <NavItem />}
          {status === "authenticated" && (
            <Profile user={session?.user ?? null} />
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Login</Link>
          )}
        </div>
      </nav>
      {/* </Container> */}
      {/* Sidebar */}
      {/* <Sidebar isExpanded={isSidebarExpanded} /> */}
    </>
  );
}

export default Navbar;
