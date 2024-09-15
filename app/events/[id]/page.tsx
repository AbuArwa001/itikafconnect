// import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading } from "@radix-ui/themes";
// import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import EventDetails from "./EventDetails";
import { auth } from "@/auth";
import RegisterEventButton from "./RegisterEventButton";
interface props {
  params: {
    id: string;
  };
}
const fetchEvent = cache((eventId: number) =>
  prisma.event.findUnique({ where: { id: eventId } })
);
const fetchRegistration = cache((userId: string, eventId: number) =>
  prisma.registration.findMany({
    where: {
      userId: userId,
      eventId: eventId,
    },
  })
);
const EventDetail = async ({ params: { id } }: props) => {
  const session = await auth();
  const event = await fetchEvent(parseInt(id));
  if (!event) notFound();
  const events = await fetchRegistration(session?.user.id || "", event.id);
  console.log(events);
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <EventDetails event={event} />
      </Box>
      <Box>
        {session && (
          <Flex direction="column" gap="4">
            <EditButton eventId={event.id} />
            <DeleteButton eventId={event.id} />
            <RegisterEventButton />
          </Flex>
        )}
        <br />
        <Box>
          <Heading className="border-2 rounded-md">
            Registration Details
          </Heading>
          {session && (
            <Flex direction="column" gap="4">
              <div>
                <Heading>Registration Status</Heading>
                <div>
                  <span>{session.user.id}</span>
                </div>
                <Heading>Event Status</Heading>
                <div>
                  <span></span>
                </div>
              </div>
            </Flex>
          )}
        </Box>
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
