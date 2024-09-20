import { EventStatusBadge } from "@/app/components";
import { Event, EventStatus } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import { default as Link, default as NextLink } from "next/link";

export interface eventQuery {
  status: EventStatus;
  orderBy: keyof Event;
  page: string;
}
interface Props {
  searchParams: eventQuery;
  events: Event[];
}
const EventsTable = ({ searchParams, events }: Props) => {
  return (
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
  );
};

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

export const columnNames = columns.map((column) => column.value);
export default EventsTable;
