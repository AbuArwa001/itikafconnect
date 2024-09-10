import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import delay from "delay";

interface props {
  params: {
    id: string;
  };
}
const EvenDetails = async ({ params: { id } }: props) => {
  await delay(3000);
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!event) {
    notFound();
  }
  return (
    <div>
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
    </div>
  );
};

export default EvenDetails;
