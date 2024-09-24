import { Button } from "@/components/ui/button";
import { Box, Card, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { ProfiLeInforProps } from "./ProfiLeInfor";

const NextOfKeen = ({ user }: ProfiLeInforProps) => {
  const router = useRouter();
  const currentUser = user;
  const isLoading = !currentUser;
  const [isSubmit, setSubmit] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Data", data);
    console.log("Data", data.next_of_kin_no);
    console.log("Data", data.next_of_kin);
    try {
      setSubmit(true);
      const res = await axios.patch(`/api/users/${currentUser?.id}`, {
        email: currentUser?.email,
        next_of_kin: data.next_of_kin,
        next_of_kin_no: data.next_of_kin_no,
      });

      if (res.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating next of kin information:", error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Next of Kin</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Flex gap="6">
          <Box className="w-1/2">
            <label>Name</label>
            {isLoading ? (
              <Skeleton height="2rem" />
            ) : (
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.next_of_kin || "N/A"}
                name="next_of_kin"
              />
            )}
            {/* {isLoading ? (
              <Skeleton height="2rem" />
            ) : (
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.next_of_kin || "N/A"}
              />
            )} */}
          </Box>
          <Box className="w-1/2">
            <label>Phone</label>
            {isLoading ? (
              <Skeleton height="2rem" />
            ) : (
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.next_of_kin_no || "N/A"}
                name="next_of_kin_no"
              />
            )}
            {/* {isLoading ? (
              <Skeleton height="2rem" />
            ) : (
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.next_of_kin_no || "N/A"}
              />
            )} */}
          </Box>
        </Flex>
        <Button className="bg-light_gold" disabled={isSubmit} type="submit">
          Update
        </Button>
      </form>
    </Card>
  );
};

export default NextOfKeen;
