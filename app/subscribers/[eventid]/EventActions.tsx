import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import RegistrationStatusFilter from "./RegistrationStatusFilter";

const EventActions = () => {
  return (
    <Flex justify="between">
      <RegistrationStatusFilter />
      <Button>
        <Link href="/events/new">Add event</Link>
      </Button>
    </Flex>
  );
};

export default EventActions;