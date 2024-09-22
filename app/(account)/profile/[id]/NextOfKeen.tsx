import React from "react";
import { Box, Card, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Skeleton from "@/app/components/Skeleton";

const NextOfKeen = () => {
  const currentUser = useSession().data;
  const isLoading = !currentUser;
  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Next of Kin</h1>
      <form className="space-y-3">
        <Flex gap="6">
          <Box className="w-1/2">
            <label>Name</label>
            {isLoading ? (
              <Skeleton height="2rem" />
            ) : (
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.user.next_of_kin || "N/A"}
              />
            )}
          </Box>
          <Box className="w-1/2">
            <label>Phone</label>
            {isLoading ? (
              <Skeleton height="2rem" />
            ) : (
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.user.next_of_kin_no || "N/A"}
              />
            )}
          </Box>
        </Flex>
      </form>
    </Card>
  );
};

export default NextOfKeen;
