import defaultImage from "@/app/assets/images/Default.jpg";
import Image from "next/image";
import Link from "next/link";
import { LogoutForm } from "./components/LogoutForm";
interface User {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}

interface ProfileProps {
  user: User | null;
}

const Profile = ({ user }: ProfileProps) => {
  const links = [
    { label: user?.email, href: "/profile" },
    { label: "profile", href: "/profile" },
    { label: "settings", href: "/settings" },
    // { label: "logout", href: "/api/auth/signout" },
  ];
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <Image
            alt="User Avatar"
            src={user?.image || defaultImage} // Fallback to default image
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="justify-between">
              {link.label}
              {link.label === "profile" && <span className="badge">New</span>}
            </Link>
          </li>
        ))}
        <li>
          <LogoutForm />
        </li>
      </ul>
    </div>
  );
};

export default Profile;
