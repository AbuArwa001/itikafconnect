import { Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const EventFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="23rem" />
      <Skeleton height="2rem" width="12rem" className="mt-7" />
      <Skeleton height="2rem" />
    </Box>
  );
};

export default EventFormSkeleton;
