"use client";
import { useRouter } from "next/navigation";
interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}
const LoginButton = ({ children, mode }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push("auth/login");
  };
  if (mode === "modal") {
    return (
      <span
        className="bg-light_gold text-black px-4 py-2 rounded-md"
        onClick={onClick}
      >
        {children}
      </span>
    );
  }
  return (
    <span
      className="bg-light_gold text-black px-4 py-2 rounded-md"
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default LoginButton;
