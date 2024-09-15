import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const arrClas = [
    "justify-center",
    "items-center",
    "h-full",
    "flex",
    "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
    "from-extra_light_gold",
    "to-light_gold",
  ];
  const classLogin = arrClas.join(" ");
  return <div className={`${classLogin}`}>{children}</div>;
};

export default AuthLayout;
