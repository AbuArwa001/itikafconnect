import { Button } from "@/components/ui/button";
import React from "react";
import { MdAppRegistration } from "react-icons/md";

const RegisterEventButton = () => {
  return (
    <Button>
      <MdAppRegistration className="m-2" />
      Register
    </Button>
  );
};

export default RegisterEventButton;
