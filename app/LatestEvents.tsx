import prisma from "@/prisma/client";
import { Card, Flex, Heading, Table } from "@radix-ui/themes";
import { EventStatusBadge, Link } from "./components";

const LatestEvents = async () => {
  const events = await prisma.event.findMany({
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Events{" "}
      </Heading>
      <Table.Root variant="surface">
        <Table.Body>
          {events.map((event) => (
            <Table.Row key={event.id}>
              <Table.Cell>
                <Flex direction="column" gap="2" align="start">
                  <Link href={`/events/${event.id}`}>{event.name}</Link>
                  <EventStatusBadge status={event.status} />
                </Flex>
              </Table.Cell>
              {/* <Table.Cell>{event.date!.toString()}</Table.Cell>
            <Table.Cell>{event.location}</Table.Cell> */}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestEvents;
