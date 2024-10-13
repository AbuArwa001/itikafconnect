import prisma from "@/prisma/client";

// export const getServerSideProps = async () => {
//   await updateEventStatuses();

//   // Return whatever props you need for the page
//   return {
//     props: {},
//   };
// };

async function updateEventStatuses() {
  const now = new Date();

  const endedEvents = await prisma.event.findMany({
    where: {
      endDate: { lt: now },
      status: { notIn: ["ENDED", "CANCELLED"] },
    },
  });

  await prisma.event.updateMany({
    where: {
      id: { in: endedEvents.map((event) => event.id) },
    },
    data: { status: "ENDED" },
  });
}

export default updateEventStatuses;
