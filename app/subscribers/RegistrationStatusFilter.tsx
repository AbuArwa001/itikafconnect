"use client";
import { RegistrationStatus } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { label: string; value?: RegistrationStatus }[] = [
  { label: "All" },
  { label: "Pending", value: "pending" },
  { label: "Rejected", value: "rejected" },
  { label: "Approved", value: "approved" },
];

const RegistrationStatusFilter = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const status = searchparams.get("status") as RegistrationStatus;
  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchparams.get("orderBy"))
          params.append("orderBy", searchparams.get("orderBy")!);
        const filter = params.size ? "?" + params.toString() : "";
        router.push(`/subscribers/${filter}`);
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

export default RegistrationStatusFilter;
