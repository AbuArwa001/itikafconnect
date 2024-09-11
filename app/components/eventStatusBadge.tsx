import { EventStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const eventStatus: Record<
  EventStatus,
  { label: string; color: "red" | "violet" | "green" }
> = {
  ONGOING: { label: "ongoing", color: "green" },
  ENDED: { label: "ended", color: "violet" },
  CANCELLED: { label: "Cancelled", color: "red" },
};

const eventStatusBadge = ({ status }: { status: EventStatus }) => {
  return (
    <Badge color={eventStatus[status].color}>{eventStatus[status].label}</Badge>
  );
};

export default eventStatusBadge;
