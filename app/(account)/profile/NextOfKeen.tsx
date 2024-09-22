import { Box, Card, Flex, TextField } from "@radix-ui/themes";
import { ProfiLeInforProps } from "./ProfiLeInfor";
import Skeleton from "react-loading-skeleton";

const NextOfKeen = ({ user }: ProfiLeInforProps) => {
  const currentUser = user;
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
                defaultValue={currentUser?.next_of_kin || "N/A"}
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
                defaultValue={currentUser?.next_of_kin_no || "N/A"}
              />
            )}
          </Box>
        </Flex>
      </form>
    </Card>
  );
};

export default NextOfKeen;
