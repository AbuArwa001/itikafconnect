import Link from "next/link";
import { Button } from "@radix-ui/themes";

const EventActions = () => {
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/events/new">Add event</Link>
        </Button>
      </div>
    </div>
  );
};

export default EventActions;
