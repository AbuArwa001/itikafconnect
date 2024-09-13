import { z } from "zod";

export const EventSchema = z.object({
  name: z.string().min(4, "Name Is Required").max(100),
  date: z.string().min(8, "Date Is Required"),
  location: z.string().min(4, "Location is Required").max(100),
  description: z.string().min(4, "Please provide Description").max(300),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Pease enter password"),
});
