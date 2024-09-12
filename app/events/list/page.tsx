import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { EventStatus } from "@prisma/client";
import EventActions from "./EventActions";
import EventsTable, { columnNames, eventQuery } from "./EventsTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: eventQuery;
}
const Events = async function ({ searchParams }: Props) {
  const statuses = Object.values(EventStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const where = { status };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const events = await prisma.event.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const eventCount = await prisma.event.count({ where });
  return (
    <Flex gap="3" direction="column">
      <EventActions />
      <EventsTable searchParams={searchParams} events={events} />
      <Pagination
        itemCount={eventCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const revalidate = 0;
export default Events;
