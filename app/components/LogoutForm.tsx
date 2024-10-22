"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export const LogoutForm = () => {
  return (
    <Button
      type="button"
      className="btn btn-ghost cursor-pointer"
      variant="link"
      onClick={() => signOut()}
    >
      Logout
    </Button>
  );
};
