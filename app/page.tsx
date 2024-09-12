// import Layout from "./components/layout/Layout";
// import Header from "./components/layout/header/Header";

import prisma from "@/prisma/client";
// import EventSummary from "./EventSummary";
import EventsCharts from "./EventsCharts";
import { Flex, Grid } from "@radix-ui/themes";
import EventSummary from "./EventSummary";
import LatestEvents from "./LatestEvents";
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
  // return  <EventSummary onGoing={onGoing} ended={ended} cancelled={cancelled} />;
  // return <EventsCharts onGoing={onGoing} ended={ended} cancelled={cancelled} />;
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="2">
        <EventSummary onGoing={onGoing} ended={ended} cancelled={cancelled} />
        <EventsCharts onGoing={onGoing} ended={ended} cancelled={cancelled} />
      </Flex>
      <LatestEvents />
    </Grid>
  );
}
