import { Card, Flex, Text } from "@radix-ui/themes"; // Import the 'Text' component from the appropriate library
import { EventStatus } from "@prisma/client";
import Link from "next/link";

interface Props {
  onGoing: number;
  ended: number;
  cancelled: number;
}

const EventSummary = ({ onGoing, ended, cancelled }: Props) => {
  const statusContainers: {
    label: string;
    value: number;
    status: EventStatus;
  }[] = [
    { label: "On Going", value: onGoing, status: "ONGOING" },
    { label: "Ended", value: ended, status: "ENDED" },
    { label: "Cancelled", value: cancelled, status: "CANCELLED" },
  ];
  return (
    <Flex gap="4">
      {statusContainers.map((container) => (
        <Card key={container.label}>
          <Flex direction="column" gap="1" align="center">
            <Link
              className="text-sm font-medium text-gray-500"
              href={`/events/list?status=${container.status}`}
            >
              {container.label}
            </Link>
            <Text size="5" className="font-bold">
              {container.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default EventSummary;
