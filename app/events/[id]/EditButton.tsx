import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditButton = ({ eventId }: { eventId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/events/edit/${eventId}/`}>Edit Event</Link>
    </Button>
  );
};

export default EditButton;
