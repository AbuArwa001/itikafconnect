import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import EventStatusFilter from "./EventStatusFilter";

const EventActions = () => {
  return (
    <Flex mb="5" justify="between">
      <EventStatusFilter />
      <Button>
        <Link href="/events/new">Add event</Link>
      </Button>
    </Flex>
  );
};

export default EventActions;
