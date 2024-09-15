import prisma from "@/prisma/client";
import { Metadata } from "next";
import EventsCharts from "./EventsCharts";
import EventSummary from "./EventSummary";
import LatestEvents from "./LatestEvents";

export default async function Home() {
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
    <div className="space-y-4">
      <EventSummary onGoing={onGoing} ended={ended} cancelled={cancelled} />
      <EventsCharts onGoing={onGoing} ended={ended} cancelled={cancelled} />
      <LatestEvents />
    </div>
  );
}

export const metadata: Metadata = {
  title: "ItikafConnect - Dashboard",
  description: "View summary of events and latest events",
};
