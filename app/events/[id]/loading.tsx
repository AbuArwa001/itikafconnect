import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";

const Loading = () => {
  return (
    <Box>
      <Heading>Event Details</Heading>
      <br />
      <Heading as="h2">
        <Skeleton width="10rem" />
      </Heading>
      <Flex gap={`2`} my={`3`}>
        <p>
          <Skeleton width="5rem" />
        </p>
        <p>
          <Skeleton width="5rem" />
        </p>
        <p>
          <Skeleton width="7rem" />
        </p>
      </Flex>
      <Card className="prose" mt={`3`}>
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default Loading;
