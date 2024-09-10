import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import EventStatusBadge from "@/app/components/eventStatusBadge";
import EventActions from "./EventActions";
import Link from "../components/Link";

const Events = async function () {
  const events = await prisma.event.findMany();
  return (
    <div className="m-10">
      <EventActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Date
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Location
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Description
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created_At
            </Table.ColumnHeaderCell>
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
                {event.date.toString()}
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

export default Events;
