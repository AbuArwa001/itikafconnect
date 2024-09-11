import { Event } from "@prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";

import ReactMarkdown from "react-markdown";

const EventDetails = async ({ event }: { event: Event }) => {
  return (
    <>
      <Heading>EvenDetails</Heading>
      <br />
      <Heading as="h2">{event.name}</Heading>
      <Flex gap={`2`} my={`3`}>
        <p>{event.status}</p>
        <p>Location: {event.location}</p>
        <p>{event!.date!.toDateString()}</p>
      </Flex>
      <Card className="prose max-w-full" mt={`3`}>
        <ReactMarkdown>{event.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default EventDetails;
