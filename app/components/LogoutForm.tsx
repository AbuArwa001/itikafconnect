"use client";
import { signOut } from "next-auth/react";

export const LogoutForm = () => {
  return (
    <button type="button" className="btn btn-ghost" onClick={() => signOut()}>
      Logout
    </button>
  );
};
