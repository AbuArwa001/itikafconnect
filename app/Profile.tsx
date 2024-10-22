import defaultImage from "@/app/assets/images/Default.jpg";
import Link from "next/link";
import { LogoutForm } from "./components/LogoutForm";
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
  const initials = `${user?.name?.split(" ")[0].slice(0, 1)}${user?.name
    ?.split(" ")[1]
    .slice(0, 1)}`;
  const links = [
    { label: user?.email, href: "/profile" },
    { label: "profile", href: "/profile" },
    { label: "settings", href: "/settings" },
    // { label: "logout", href: "/api/auth/signout" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
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
          <AvatarFallback className="text-black">{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {links.map((link, index) => (
          <DropdownMenuItem key={index}>
            <Link
              href={link.href}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {link.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
