"use client";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import "react-datepicker/dist/react-datepicker.css";
import EventFormSkeleton from "./loading";
// type AddEventForm = z.infer<typeof EventSchema>;
const EventFrm = dynamic(() => import("@/app/events/_components/EventForm"), {
  ssr: false,
  loading: () => <EventFormSkeleton />,
});
const AddEvent = () => {
  return <EventFrm />;
};

export default AddEvent;
