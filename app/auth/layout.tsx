import { Flex } from "@radix-ui/themes";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="justify-center items-center h-full flex bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ky-400 to-blue-800">
      {children}
    </div>
  );
};

export default AuthLayout;
