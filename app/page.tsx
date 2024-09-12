// import Layout from "./components/layout/Layout";
// import Header from "./components/layout/header/Header";

import prisma from "@/prisma/client";
import EventSummary from "./EventSummary";
// import LatestEvents from "./LatestEvents";

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
  return <EventSummary onGoing={onGoing} ended={ended} cancelled={cancelled} />;
}
