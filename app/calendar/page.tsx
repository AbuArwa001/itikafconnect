import prisma from "@/prisma/client";
import CalendarPage from "@/app/components/CalendarPage";

const CalendarP = async () => {
  const eventsToFormat = await prisma.event.findMany();
  const formattedEvents = eventsToFormat.map((event) => ({
    id: event.id.toString(),
    title: event.name,
    start: event.startDate.toISOString(),
    end: event.endDate.toISOString(),
    url: `/events/${event.id}`,
  }));

  return (
    <div>
      <CalendarPage eventsCal={formattedEvents} />
    </div>
  );
};

export default CalendarP;
