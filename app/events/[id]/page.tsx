import authOptions from "@/app/auth/AuthOptions";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import EventDetails from "./EventDetails";
interface props {
  params: {
    id: string;
  };
}
const EventDetail = async ({ params: { id } }: props) => {
  const session = await getServerSession(authOptions);
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

export default EventDetail;
