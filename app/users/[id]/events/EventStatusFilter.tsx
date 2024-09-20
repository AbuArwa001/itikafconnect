"use client";
import { EventStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: EventStatus }[] = [
  { label: "All" },
  { label: "On going", value: "ONGOING" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Ended", value: "ENDED" },
];

const EventStatusFilter = () => {
  const user = useSession().data?.user;
  const router = useRouter();
  const searchparams = useSearchParams();
  const status = searchparams.get("status") as EventStatus;
  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchparams.get("orderBy"))
          params.append("orderBy", searchparams.get("orderBy")!);
        const filter = params.size ? "?" + params.toString() : "";
        router.push(`/users/${user?.id}/events/${filter}`);
      }}
    >
      <Select.Trigger placeholder="Filter by Status.." />
      <Select.Content>
        {statuses.map((status, index) => (
          <Select.Item key={index} value={status.value || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default EventStatusFilter;
