"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { EventSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type EventForm = z.infer<typeof EventSchema>;

const EventFrm = ({ event }: { event?: Event }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventForm>({
    resolver: zodResolver(EventSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: EventForm) => {
    if (!data.startDate) {
      return setError("Please select a date for the event");
    }

    const formattedDate = new Date(data.startDate).toISOString();

    try {
      setIsSubmitting(true);
      if (event) {
        await axios.patch(`/api/events/${event.id}`, {
          ...data,
          date: formattedDate,
        });
        router.push("/events/list");
        router.refresh();
      } else {
        await axios.post("/api/events", {
          ...data,
          date: formattedDate,
        });
        router.push("/events/list");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred while adding the event");
      console.error(error); // Log error details for debugging
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          placeholder="Enter the event Name"
          {...register("name")}
          defaultValue={event?.name}
        ></TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={event?.description ?? ""}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <ReactDatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) =>
                field.onChange(date ? date.toISOString() : null)
              } // Directly handle onChange
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Event Start Date"
              className="w-full p-2 border rounded"
              //   defaultValue={event?.date}
            />
          )}
        />
        <ErrorMessage>{errors.startDate?.message}</ErrorMessage>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <ReactDatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) =>
                field.onChange(date ? date.toISOString() : null)
              } // Directly handle onChange
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Event End Date"
              className="w-full p-2 border rounded m-2"
              //   defaultValue={event?.date}
            />
          )}
        />
        <ErrorMessage>{errors.endDate?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Enter Location"
          {...register("location")}
          defaultValue={event?.location ?? ""}
        ></TextField.Root>
        <ErrorMessage>{errors.location?.message}</ErrorMessage>.
        <Button type="submit" disabled={isSubmitting}>
          {event ? "Update Event" : "Add New Event"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default EventFrm;
