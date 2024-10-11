"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}
import React from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
}

interface CalendarPageProps {
  eventsCal: Event[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({ eventsCal }) => {
  const [events, setEvents] = useState<Event[]>(eventsCal);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = eventsCal;
      setEvents(data);
    };

    fetchEvents();
  }, [eventsCal]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={false}
    />
  );
};

export default CalendarPage;
