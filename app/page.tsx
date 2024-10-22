import prisma from "@/prisma/client";
import { Metadata } from "next";
import EventsCharts from "./EventsCharts";
import EventSummary from "./EventSummary";
import LatestEvents from "./LatestEvents";
import updateEventStatuses from "@/actions/update-events";

export default async function Home() {
  await updateEventStatuses();
  const total = await prisma.event.count();
  const onGoing = await prisma.event.count({
    where: {
      status: "ONGOING",
    },
  });
  const ended = await prisma.event.count({
    where: {
      status: "ENDED",
    },
  });
  const cancelled = await prisma.event.count({
    where: {
      status: "CANCELLED",
    },
  });

  return (
    <div className="container mx-auto px-4 space-y-6 md:space-y-8 lg:space-y-10 ">
      <EventSummary
        total={total}
        onGoing={onGoing}
        ended={ended}
        cancelled={cancelled}
      />
      <EventsCharts onGoing={onGoing} ended={ended} cancelled={cancelled} />
      <LatestEvents />
    </div>
  );
}

export const metadata: Metadata = {
  title: "ItikafConnect - Dashboard",
  description: "View summary of events and latest events",
};
