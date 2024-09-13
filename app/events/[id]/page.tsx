// import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
// import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { cache } from "react";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import EventDetails from "./EventDetails";
import { auth } from "@/auth";
interface props {
  params: {
    id: string;
  };
}
const fetchEvent = cache((eventId: number) =>
  prisma.event.findUnique({ where: { id: eventId } })
);
const EventDetail = async ({ params: { id } }: props) => {
  const session = await auth();
  const event = await fetchEvent(parseInt(id));
  if (!event) notFound();
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
          </Flex>
        )}
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
