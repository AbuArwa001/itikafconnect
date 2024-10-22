import defaultImage from "@/app/assets/images/Default.jpg";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface ProfileProps {
  user: User | null;
}

const Profile = ({ user }: ProfileProps) => {
  const initials = `${user?.name
    ?.split(" ")[0]
    .slice(0, 1)
    .toUpperCase()}${user?.name?.split(" ")[1].slice(0, 1).toUpperCase()}`;
  const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    signOut();
  };
  const links = [
    // { label: user?.email, href: "/profile" },
    { label: "Profile", href: "/profile" },
    { label: "Settings", href: "/settings" },
    { label: "Logout", href: "#" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none m-2 bg-slate-500 rounded-full">
        <Avatar>
          <AvatarImage
            src={
              typeof user?.image === "string"
                ? user.image
                : typeof defaultImage === "string"
                ? defaultImage
                : undefined
            }
          />
          <AvatarFallback className="text-black py-2 px-3">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-3">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link, index) => (
          <DropdownMenuItem key={index}>
            {link.label !== "Logout" ? (
              <Link
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            ) : (
              <Link
                href="#"
                onClick={handleSignOut}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {link.label}
              </Link>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
