import { Flex } from "@radix-ui/themes";
import EventStatusFilter from "./EventStatusFilter";

const EventActions = () => {
  return (
    <Flex justify="between">
      <EventStatusFilter />
      {/* <Button>
        <Link href="/events/new">Add event</Link>
      </Button> */}
    </Flex>
  );
};

export default EventActions;