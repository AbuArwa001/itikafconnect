import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import EventStatusFilter from "./EventStatusFilter";
import { auth } from "@/auth";

const EventActions = async () => {
  const user = await auth();
  return (
    <Flex justify="between">
      <EventStatusFilter />
      {user?.user.role === "ADMIN" && (
        <Button>
          <Link href="/events/new">Add event</Link>
        </Button>
      )}
    </Flex>
  );
};

export default EventActions;
