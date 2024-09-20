import Pagination from "@/app/components/Pagination";
import EventActions from "./EventActions";
import EventsTable, { columnNames, eventQuery } from "./EventsTable";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { EventStatus } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";
// import { useSession } from "next-auth/react";

interface Props {
  searchParams: eventQuery;
}

const Events = async function ({ searchParams }: Props) {
  const statuses = Object.values(EventStatus);
  const session = await auth();
  // const { data: session } = useSession();
  const searchStatus = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const where = { status: searchStatus };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const registerEvent = await prisma.registration.findMany({
    where: {
      userId: session?.user?.id || "",
    },
  });
  const events = await prisma.event.findMany({
    where: {
      id: {
        in: registerEvent.map((event) => event.eventId),
      },
      status: searchStatus,
    },
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
export const metadata: Metadata = {
  title: "ItikafConnect - Events",
  description: "View all events",
};

export default Events;
