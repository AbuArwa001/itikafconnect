"use client";
import { EventStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: EventStatus }[] = [
  { label: "All" },
  { label: "On going", value: "ONGOING" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Ended", value: "ENDED" },
];

const EventStatusFilter = () => {
  const router = useRouter();
  return (
    <Select.Root
      onValueChange={(status) => {
        const filter = status ? `?status=${status}` : "";
        router.push(`/events/list/${filter}`);
      }}
    >
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
