// import { Card, Flex, Text } from "@radix-ui/themes"; // Import the 'Text' component from the appropriate library
import { EventStatus } from "@prisma/client";
// import Link from "next/link";
import DashBoardCard from "./components/DashboardCard";
import { EventStatusBadge } from "./components";
import React from "react";
import { FcStatistics } from "react-icons/fc";

interface Props {
  total: number;
  onGoing: number;
  ended: number;
  cancelled: number;
}

const EventSummary = ({ total, onGoing, ended, cancelled }: Props) => {
  const statusContainers: {
    label: string;
    value: number;
    status: EventStatus | "TOTAL";
    icon: React.ReactElement;
  }[] = [
    {
      label: "Total",
      value: total,
      status: "TOTAL",
      icon: <FcStatistics size={60} />,
    },
    {
      label: "On Going",
      value: onGoing,
      status: "ONGOING",
      icon: <EventStatusBadge status="ONGOING" />,
    },
    {
      label: "Ended",
      value: ended,
      status: "ENDED",
      icon: <EventStatusBadge status="ENDED" />,
    },
    {
      label: "Cancelled",
      value: cancelled,
      status: "CANCELLED",
      icon: <EventStatusBadge status="CANCELLED" />,
    },
  ];
  return (
    <>
      <div className="flex flex-col md:flex-row  gap-5 mb-5">
        {statusContainers.map((container) => (
          <DashBoardCard
            key={container.label}
            title={container.label}
            count={container.value}
            icon={container.icon}
          />
          // <Card key={container.label}>
          //   <Flex direction="column" gap="1" align="center">
          //     <Link
          //       className="text-sm font-medium text-gray-500"
          //       href={`/events/list?status=${container.status}`}
          //     >
          //       {container.label}
          //     </Link>
          //     <Text size="5" className="font-bold">
          //       {container.value}
          //     </Text>
          //   </Flex>
          // </Card>
        ))}
      </div>
    </>
  );
};

export default EventSummary;
