import EventFrm from "@/app/events/_components/EventForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface props {
  params: { id: string };
}
const EditEvents = async ({ params }: props) => {
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!event) notFound();
  return <EventFrm event={event} />;
};

export default EditEvents;
