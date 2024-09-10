import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

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
      <Card>
        <p>{event.description}</p>
      </Card>
    </div>
  );
};

export default EvenDetails;
