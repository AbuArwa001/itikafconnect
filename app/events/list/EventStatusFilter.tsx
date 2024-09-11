"use client";
import { EventStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value?: EventStatus }[] = [
  { label: "All" },
  { label: "On going", value: "ONGOING" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Ended", value: "ENDED" },
];

const EventStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Status.." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default EventStatusFilter;
