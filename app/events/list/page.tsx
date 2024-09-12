import { EventStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import EventActions from "./EventActions";
import { Event, EventStatus } from "@prisma/client";
import NextLink from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: EventStatus;
    orderBy: keyof Event;
  };
}
const Events = async function ({ searchParams }: Props) {
  const statuses = Object.values(EventStatus);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const columns: {
    label: string;
    value: keyof Event;
    className?: string;
  }[] = [
    { label: "Name", value: "name" },
    { label: "On going", value: "status", className: "hidden md:table-cell" },
    { label: "Date", value: "date", className: "hidden md:table-cell" },
    { label: "Location", value: "location", className: "hidden md:table-cell" },
    {
      label: "Description",
      value: "description",
      className: "hidden md:table-cell",
    },
    {
      label: "Created_At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;
  const events = await prisma.event.findMany({
    where: {
      status,
    },
    orderBy,
  });

  return (
    <div className="m-10">
      <EventActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.className}
              >
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: column.value,
                    },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {events.map((event) => (
            <Table.Row key={event.id}>
              <Table.Cell>
                <Link href={`/events/${event.id}`}>{event.name}</Link>
                <div className="block md:hidden ">
                  <EventStatusBadge status={event.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <EventStatusBadge status={event.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {event.date!.toString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {event.location}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {event.description}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {event.createdAt.toString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export const revalidate = 0;
export default Events;
