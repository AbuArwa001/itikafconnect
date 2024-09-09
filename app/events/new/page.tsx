"use client";
import { useForm, Controller } from "react-hook-form";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { EventSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type AddEventForm = z.infer<typeof EventSchema>;

const AddEvent = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddEventForm>({
    resolver: zodResolver(EventSchema),
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: AddEventForm) => {
    if (!data.date) {
      return setError("Please select a date for the event");
    }

    const formattedDate = new Date(data.date).toISOString();

    try {
      const response = await axios.post("/api/events", {
        ...data,
        date: formattedDate,
      });
      console.log(response);
      router.push("/events");
    } catch (error) {
      setError("An error occurred while adding the event");
      console.error(error); // Log error details for debugging
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
        ></TextField.Root>
        <ErrorMessage>{errors.name?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Enter description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <ReactDatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date: Date | null) => {
                // Convert date to ISO format and update form state
                const isoDate = date ? new Date(date).toISOString() : "";
                setValue("date", isoDate);
                field.onChange(isoDate); // Trigger field change if needed
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select event date"
              className="w-full p-2 border rounded"
            />
          )}
        />
        <ErrorMessage>{errors.date?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Enter Location"
          {...register("location")}
        ></TextField.Root>
        <ErrorMessage>{errors.location?.message}</ErrorMessage>
        <Button type="submit">Add New Event</Button>
      </form>
    </div>
  );
};

export default AddEvent;
