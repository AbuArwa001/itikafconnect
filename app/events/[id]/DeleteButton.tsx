"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteButton = ({ eventId }: { eventId: number }) => {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          Delete Event
          {/* <Link href={`/events/${eventId}/delete`}>Delete Event</Link> */}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Description>
          You Are About to Delete An Event? This Action Cannot be Undone.
        </AlertDialog.Description>
        <Flex mt="3" gap="3">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                await axios.delete(`/api/events/${eventId}`);
                router.push("/events");
                router.refresh();
              }}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteButton;
