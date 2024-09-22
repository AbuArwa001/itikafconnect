"use client"; // Ensures the component is treated as a Client Component
import { Skeleton } from "@/app/components";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
// import NavItem from "./NavItem";
import { Flex } from "@radix-ui/themes";
import Profile from "./Profile";

function Navbar() {
  const user = useSession().data?.user;
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const { status, data: session } = useSession();

  // useEffect(() => {});
  return (
    <>
      {/* Navbar */}
      {/* <Container> */}
      <nav className="flex justify-between bg-light_gold navbar bg-base-100 col-span-2 h-auto">
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
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl text-dark-brown">
              ItiKafConnect
            </Link>
          </div>
        </div>
        <Flex align="end">
          <div className="flex-1">
            <Link
              href={`/users/${session?.user?.id}/events`}
              className="btn btn-ghost text-xl text-dark-brown"
            >
              MyEvents
            </Link>
          </div>
          <div className="flex-1">
            <Link
              href="/events/list"
              className="btn btn-ghost text-xl text-dark-brown"
            >
              Events
            </Link>
          </div>
          {/* <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl text-dark-brown">
              Calendar
            </Link>
          </div> */}
          <div className="flex-none">
            {status === "loading" && (
              <Skeleton width="3rem" height="3rem" className="rounded-md" />
            )}
            {/* {status === "authenticated" && <NavItem />} */}
            {user && <Profile user={session?.user ?? null} />}
            {status === "unauthenticated" && (
              // <div className="flex-1 ">
              //  </div>
              <Link href="/" className="btn btn-ghost text-xl text-dark-brown">
                Login
              </Link>
            )}
          </div>
        </Flex>
      </nav>
      {/* </Container> */}
      {/* <Sidebar isExpanded={isSidebarExpanded} /> */}
      {/* <Sidebar isExpanded={isSidebarExpanded} /> */}
    </>
  );
}

export default Navbar;
