"use client";
import { User } from "@prisma/client";
import { Button, Card, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Attachments from "./Attachments";
import NextOfKeen from "./NextOfKeen";
import ProfiLeInfor from "./ProfiLeInfor";

interface props {
  params: {
    id: string;
  };
}

const Account = ({ params: { id } }: props) => {
  const componentRef = useRef(null);
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

    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <div ref={componentRef}>
        <Card className="p-4 bg-light_gold text-dark_brown">
          <Flex direction="column" align="center" gap="6">
            <div className="border-opacity-15 rounded-md border-2 w-[30%] text-center p-2 bg-white">
              <h1 className="font-bold text-lg">
                Profile Picture/Passport Size
              </h1>
            </div>

            <ProfiLeInfor user={user} />

            <NextOfKeen />

            <Attachments user={user} />
          </Flex>
        </Card>
      </div>

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
