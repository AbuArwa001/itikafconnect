"use client";
import { Card, Flex, Button } from "@radix-ui/themes";
import React, { useRef } from "react";
import ProfiLeInfor from "./ProfiLeInfor";
import NextOfKeen from "./NextOfKeen";
import Attachments from "./Attachments";
import { useReactToPrint } from "react-to-print";

const Account = () => {
  const componentRef = useRef(null);

  // Print function
  const handlePrint = useReactToPrint({
    content: () => componentRef.current, // Target the content to print
  });

  return (
    <div>
      {/* Printable section */}
      <div ref={componentRef}>
        <Card className="p-4 bg-light_gold text-dark_brown">
          <Flex direction="column" align="center" gap="6">
            {/* Passport/Profile Picture Section */}
            <div className="border-opacity-15 rounded-md border-2 w-[30%] text-center p-2 bg-white">
              <h1 className="font-bold text-lg">
                Profile Picture/Passport Size
              </h1>
            </div>

            {/* Profile Information */}
            <ProfiLeInfor />

            {/* Next of Kin */}
            <NextOfKeen />

            {/* Attachments */}
            <Attachments />
          </Flex>
        </Card>
      </div>

      {/* Print Button */}
      <Flex className="justify-center mt-6">
        <Button
          color="orange"
          onClick={handlePrint}
          className="bg-light_gold text-white"
        >
          Print Profile
        </Button>
      </Flex>
    </div>
  );
};

export default Account;
