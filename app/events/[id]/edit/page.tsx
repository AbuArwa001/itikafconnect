import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import EventFormSkeleton from "./loading";

const EventFrm = dynamic(() => import("@/app/events/_components/EventForm"), {
  ssr: false,
  loading: () => <EventFormSkeleton />,
});
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
