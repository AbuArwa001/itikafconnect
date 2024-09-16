import { RegistrationStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const registrationStatus: Record<
  RegistrationStatus,
  { label: string; color: "red" | "violet" | "green" }
> = {
  approved: { label: "Approved", color: "green" },
  pending: { label: "Pending", color: "violet" },
  rejected: { label: "Rejected", color: "red" },
};

const eventStatusBadge = ({ status }: { status: RegistrationStatus }) => {
  return (
    <Badge color={registrationStatus[status].color}>
      {registrationStatus[status].label}
    </Badge>
  );
};

export default eventStatusBadge;
