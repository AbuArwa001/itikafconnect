import React from "react";
import { Box, Card, Flex, TextField } from "@radix-ui/themes";

const NextOfKeen = () => {
  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Next of Kin</h1>
      <form className="space-y-3">
        <Flex gap="6">
          <Box className="w-1/2">
            <label>Name</label>
            <TextField.Root radius="large" defaultValue="Hamza" />
          </Box>
          <Box className="w-1/2">
            <label>Phone</label>
            <TextField.Root
              radius="large"
              defaultValue="Starehe, Ngara, Nairobi"
            />
          </Box>
        </Flex>
      </form>
    </Card>
  );
};

export default NextOfKeen;
