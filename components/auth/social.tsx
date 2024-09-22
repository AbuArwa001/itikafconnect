"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useState } from "react";

export const Social = () => {
  const [isLoading, setLoading] = useState(false);

  const onClick = (provider: "google" | "github") => {
    setLoading(true);
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
    setLoading(false);
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        disabled={isLoading}
        onClick={() => onClick("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      {/* <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub className="h-5 w-5" />
      </Button> */}
    </div>
  );
};
