import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import EventDetails from "./EventDetails";
import DeleteButton from "./DeleteButton";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <EventDetails event={event} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditButton eventId={event.id} />
          <DeleteButton eventId={event.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default EventDetail;
