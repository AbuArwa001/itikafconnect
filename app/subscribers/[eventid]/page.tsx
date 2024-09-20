import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { RegistrationStatus } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import EventActions from "./EventActions";
import RegistrationTable, { regQuery } from "./RegistrationTable";
import { auth } from "@/auth";

interface Props {
  searchParams: regQuery;
}

const Subscribers = async ({ searchParams }: Props) => {
  const statuses = Object.values(RegistrationStatus);
  const session = await auth();
  const user = session?.user;
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  //   const orderBy = columnNames.includes(searchParams.orderBy)
  //     ? { [searchParams.orderBy]: "asc" }
  //     : undefined;
  const where = { status, eventId: searchParams.eventId };
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const registrations = await prisma.registration.findMany({
    where,
    // orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  const regs = await prisma.registration.count({ where });
  return (
    <Flex gap="3" direction="column">
      <EventActions />
      <RegistrationTable
        searchParams={searchParams}
        reg={registrations}
        currentUser={user || null} // Pass null if user is undefined
      />
      <Pagination itemCount={regs} pageSize={pageSize} currentPage={page} />
    </Flex>
  );
};

export default Subscribers;
