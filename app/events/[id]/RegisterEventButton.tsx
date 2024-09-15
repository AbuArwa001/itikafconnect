"use client";
import { Spinner } from "@/app/components";
import prisma from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { MdAppRegistration } from "react-icons/md";

interface Event {
  eventId: number;
  userId: string;
  eventStatus: string;
  status: string;
}

const RegisterEventButton = ({
  eventId,
  userId,
  eventStatus,
  status,
}: Event) => {
  console.log("eventStatus", eventStatus);
  const [loading, setLoading] = React.useState<boolean>(false);
  const disable =
    eventStatus === "ENDED" ||
    eventStatus === "CANCELLED" ||
    status === "approved" ||
    status === "pending"
      ? true
      : false;

  const handleDelete = async () => {
    console.log("Button clicked");
    try {
      setLoading(true);
      const registered = axios.post(`/api/register`, {
        userId,
        eventId,
      });
      await prisma.registration.create({
        data: {
          userId,
          eventId,
        },
      });
      console.log("registration", registered);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Button disabled={disable} onClick={handleDelete}>
      <MdAppRegistration className="m-2" />
      Register
      {loading && <Spinner />}
    </Button>
  );
};

export default RegisterEventButton;
