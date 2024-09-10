import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil2Icon } from "@radix-ui/react-icons";
interface props {
  params: {
    id: string;
  };
}
const EvenDetails = async ({ params: { id } }: props) => {
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!event) notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="3">
      <Box>
        <Heading>EvenDetails</Heading>
        <br />
        <Heading as="h2">{event.name}</Heading>
        <Flex gap={`2`} my={`3`}>
          <p>{event.status}</p>
          <p>Location: {event.location}</p>
          <p>{event.date.toDateString()}</p>
        </Flex>
        <Card className="prose" mt={`3`}>
          <ReactMarkdown>{event.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/events/${event.id}/edit`}>Edit Event</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default EvenDetails;
