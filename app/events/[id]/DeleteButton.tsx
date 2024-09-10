"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ eventId }: { eventId: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const deleteEvent = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/events/${eventId}`);
      router.push("/events");
      router.refresh();
    } catch (error) {
      setError(true);
      setIsDeleting(false);
      console.error(error);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            {isDeleting && <Spinner />}
            Delete Event
            {/* <Link href={`/events/${eventId}/delete`}>Delete Event</Link> */}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title className="AlertDialogTitle">
            Confirmation
          </AlertDialog.Title>
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
              <Button color="red" onClick={deleteEvent}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title className="AlertDialogTitle">
            Error
          </AlertDialog.Title>
          <AlertDialog.Description>
            An error occurred while deleting the event
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button color="red" mt="2" onClick={() => setError(false)}>
              Close
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
