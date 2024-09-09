"use client";
import { Button, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE, { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEvent = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Enter the event Name"></TextField.Root>
      <SimpleMDE placeholder="Reply to comment…" />
      <ReactDatePicker
        selected={selectedDate}
        onChange={(
          date: Date | null,
          event: React.SyntheticEvent<any> | undefined
        ) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        placeholderText="Select event date"
        className="w-full p-2 border rounded"
      />
      <TextField.Root placeholder="Enter Location"></TextField.Root>
      <Button>Add New Event</Button>
    </div>
  );
};

export default AddEvent;
