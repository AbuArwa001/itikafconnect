"use client";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@radix-ui/themes";
import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface AddEventForm {
  name: string;
  description: string;
  date: string; // Changed to string to hold ISO format
  location: string;
}

const AddEvent = () => {
  const { register, control, handleSubmit, setValue, watch } =
    useForm<AddEventForm>();
  const router = useRouter();
  const dateValue = watch("date");

  const onSubmit = async (data: AddEventForm) => {
    // Ensure date is in ISO format before logging or sending it
    const formattedDate = new Date(data.date).toISOString();
    console.log({ ...data, date: formattedDate });
    await axios.post("/api/events", { ...data, date: formattedDate });
    router.push("/events");
    // Perform your API request here, for example:
    // axios.post('/api/events', { ...data, date: formattedDate });
  };

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root
        placeholder="Enter the event Name"
        {...register("name")}
      ></TextField.Root>
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Enter description" {...field} />
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <ReactDatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) => {
              // Convert the date to ISO format and update the form state
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
      <TextField.Root
        placeholder="Enter Location"
        {...register("location")}
      ></TextField.Root>
      <Button type="submit">Add New Event</Button>
    </form>
  );
};

export default AddEvent;
