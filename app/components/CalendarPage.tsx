"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  status: string;
}

interface CalendarPageProps {
  eventsCal: Event[];
}

const CalendarPage: React.FC<CalendarPageProps> = ({ eventsCal }) => {
  const [events, setEvents] = useState<Event[]>(eventsCal);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = eventsCal;
      setEvents(data);
    };

    fetchEvents();
  }, [eventsCal]);

  useEffect(() => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      // Prevent tooltip from hiding when mouse enters the tooltip itself
      tooltip.addEventListener("mouseover", () => {
        tooltip.classList.remove("hidden");
      });
      tooltip.addEventListener("mouseleave", () => {
        tooltip.classList.add("hidden");
      });
    }
  }, []);

  return (
    <div className="relative">
      <div
        ref={tooltipRef}
        className="event-tooltip fixed bg-gray-300 border border-gray-300 shadow-lg p-2 rounded hidden pointer-events-auto"
      ></div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={false}
        eventClick={(info) => {
          if (info.event.url) {
            window.location.href = info.event.url;
            info.jsEvent.preventDefault();
          }
        }}
        eventMouseEnter={(info) => {
          const tooltip = tooltipRef.current;
          if (tooltip) {
            const eventRect = info.el.getBoundingClientRect(); // Get event element's position
            tooltip.innerHTML = `
              <strong>${info.event.title}</strong><br>
              Start: ${info.event.start?.toLocaleString()}<br>
              End: ${info.event.end?.toLocaleString()}<br>
              <a href="events/${
                info.event.id
              }" class="underline text-blue-600 hover:text-blue-800">Open</a>
            `;
            tooltip.classList.remove("hidden");
            // Position the tooltip above the event
            tooltip.style.top = `${eventRect.top - tooltip.offsetHeight - 1}px`;
            tooltip.style.left = `${
              eventRect.left + eventRect.width / 2 - tooltip.offsetWidth / 2
            }px`;
          }
        }}
        eventMouseLeave={() => {
          const tooltip = tooltipRef.current;
          if (tooltip) {
            tooltip.classList.add("hidden");
          }
        }}
      />
    </div>
  );
};

export default CalendarPage;
