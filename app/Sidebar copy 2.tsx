import React from "react";
import Link from "next/link";
import { MdEventAvailable } from "react-icons/md";
import classnames from "classnames";

interface SidebarProps {
  isExpanded?: boolean; // Make isExpanded optional in case it's not controlled here
}

function Sidebar({ isExpanded = true }: SidebarProps) {
  const sideLinks = [
    {
      label: "Home",
      href: "/dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "Details",
      href: "/details",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      label: "events",
      href: "/events/list",
      icon: <MdEventAvailable className="size-5" />,
    },
  ];

  return (
    <div
      className={classnames({
        "top-0 left-0": true,
        "h-full bg-gray-300 rounded-md transition-all duration-300 ease-in-out overflow-y-auto":
          true,
        "w-64": isExpanded,
        "w-16": !isExpanded,
      })}
    >
      <ul className="menu p-4">
        {sideLinks.map((link, index) => (
          <li key={index} className="mb-2">
            <Link
              href={link.href}
              className="tooltip tooltip-right flex items-center space-x-2"
              data-tip={!isExpanded ? link.label : undefined}
            >
              {link.icon}
              {isExpanded && <span className="ml-2">{link.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
