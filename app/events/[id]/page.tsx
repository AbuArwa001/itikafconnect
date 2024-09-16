// import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Badge, Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";
// import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import EventDetails from "./EventDetails";
import { auth } from "@/auth";
import RegisterEventButton from "./RegisterEventButton";
import { EventStatusBadge } from "@/app/components";
import ShowSubscribers from "./showSubscribers";
interface props {
  params: {
    id: string;
  };
}
const fetchEvent = cache((eventId: number) =>
  prisma.event.findUnique({ where: { id: eventId } })
);
const fetchRegistration = cache((userId: string, eventId: number) =>
  prisma.registration.findFirst({
    where: {
      userId: userId,
      eventId: eventId,
    },
  })
);
const EventDetail = async ({ params: { id } }: props) => {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";
  const event = await fetchEvent(parseInt(id));
  if (!event) notFound();
  const events = await fetchRegistration(session?.user.id || "", event.id);
  const eventStatus = !events ? { status: "Not Registered" } : events;
  // events.length !== 0 ? events = ["Not Registered"] : events;
  console.log(eventStatus);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <EventDetails event={event} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            {isAdmin && (
              <>
                <EditButton eventId={event.id} />
                <DeleteButton eventId={event.id} />
              </>
            )}
            <ShowSubscribers />
            <RegisterEventButton
              eventId={event.id}
              userId={session.user.id}
              eventStatus={event.status}
              status={events?.status || ""}
            />
          </Flex>
        )}
        <br />
        <Card>
          <Heading className="border-2 rounded-md  p-1">
            Registration Details
          </Heading>
          {session && (
            <Flex direction="column" gap="4">
              <div>
                <Heading>Registration Status</Heading>
                <div>
                  {!events && <Badge color="red">{eventStatus.status}</Badge>}
                  {events && <Badge color="green">{eventStatus.status}</Badge>}
                </div>
                <h5>Event Status</h5>
                <div>{<EventStatusBadge status={event.status} />}</div>
              </div>
            </Flex>
          )}
        </Card>
      </Box>
    </Grid>
  );
};
export async function generateMetadata({ params }: props) {
  const event = await fetchEvent(parseInt(params.id));
  return {
    title: event?.name,
    description: "View details of event " + event?.id,
  };
}
export default EventDetail;
