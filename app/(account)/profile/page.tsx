"use client";
import { Card, Flex, Button } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import ProfiLeInfor from "./ProfiLeInfor";
import NextOfKeen from "./NextOfKeen";
import Attachments from "./Attachments";
import { useReactToPrint } from "react-to-print";
import { useSession } from "next-auth/react";
import axios from "axios";
import { User } from "@prisma/client";

const Account = () => {
  const componentRef = useRef(null);
  const userId = useSession().data?.user.id;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUserData(id: string) {
      try {
        const res = await axios.get(`/api/users/${id}`);
        const fetchedUser = res.data as User;
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    if (userId) {
      fetchUserData(userId);
    }
  }, [userId]);
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
            <ProfiLeInfor user={user} />

            {/* Next of Kin */}
            <NextOfKeen user={user} />

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
