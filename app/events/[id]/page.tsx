import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import EventDetails from "./EventDetails";
interface props {
  params: {
    id: string;
  };
}
const EventDetail = async ({ params: { id } }: props) => {
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!event) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Box>
        <EventDetails event={event} />
      </Box>
      <Box>
        <EditButton eventId={event.id} />
      </Box>
    </Grid>
  );
};

export default EventDetail;
