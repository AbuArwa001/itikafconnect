"use client"; // Ensures the component is treated as a Client Component

import React from "react";
import Link from "next/link";

const DrawerContent = ({ isDrawerOpen }: { isDrawerOpen: boolean }) => {
  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      <li>
        <Link href="">{isDrawerOpen ? "Sidebar Item 2" : "SI2"}</Link>
      </li>
      <li>
        <Link href="">{isDrawerOpen ? "Sidebar Item 1" : "SI1"}</Link>
      </li>
    </ul>
  );
};

export default DrawerContent;
