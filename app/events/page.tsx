import { Button } from "@radix-ui/themes";
import Link from "next/link";

const Events = () => {
  return (
    <div className="m-10">
      This is an Events page
      <Button>
        <Link href="/events/new">Add event</Link>
      </Button>
    </div>
  );
};

export default Events;
