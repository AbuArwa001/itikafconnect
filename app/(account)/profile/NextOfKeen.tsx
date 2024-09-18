import React from "react";
import { Box, Card, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const NextOfKeen = () => {
  const currentUser = useSession().data;
  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Next of Kin</h1>
      <form className="space-y-3">
        <Flex gap="6">
          <Box className="w-1/2">
            <label>Name</label>
            <TextField.Root
              radius="large"
              defaultValue={currentUser?.user.next_of_kin || "N/A"}
            />
          </Box>
          <Box className="w-1/2">
            <label>Phone</label>
            <TextField.Root
              radius="large"
              defaultValue={currentUser?.user.next_of_kin_no || "N/A"}
            />
          </Box>
        </Flex>
      </form>
    </Card>
  );
};

export default NextOfKeen;
