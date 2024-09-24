"use client";
import { FaTableList } from "react-icons/fa6";
import { Button } from "@radix-ui/themes";
import { useState } from "react";
// import loading from "./loading";
import delay from "delay";
import Link from "next/link";

// interface Props {
//   params: { eventId: number };
// }
const ShowSubscribers = ({ eventId }: { eventId: number }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const showList = async () => {
    setLoading(true);
    await delay(2000);
    setLoading(false);
  };

  return (
    <Button disabled={loading} onClick={showList}>
      <FaTableList className="m-2" />
      <Link href={`/subscribers/${eventId}`}>
        Show All Subscribers
        {/* {loading && <Spinner />} */}
      </Link>
    </Button>
  );
};

export default ShowSubscribers;
