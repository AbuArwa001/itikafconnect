import Image from "next/image";
import Link from "next/link";
const Profile = () => {
  const links = [
    { label: "profile", href: "/profile" },
    { label: "settings", href: "/settings" },
    { label: "logout", href: "/api/auth/signout" },
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
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            width={10}
            height={10}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="justify-between">
              {link.label}
              {link.label === "profile" && <span className="badge">New</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
