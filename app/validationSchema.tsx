import { UserRole } from "@prisma/client";
import { z } from "zod";

export const EventSchema = z.object({
  name: z.string().min(4, "Name Is Required").max(100),
  startDate: z.string().min(8, "Date Is Required"),
  endDate: z.string().min(8, "Date Is Required"),
  location: z.string().min(4, "Location is Required").max(100),
  description: z.string().min(4, "Please provide Description"),
});

export const SettingsSchema = z.object({
  email: z.optional(z.string().email()),
  role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.SUPERADMIN]),
  password: z.optional(z.string().min(6)),
  newPassword: z.optional(z.string().min(6)),
});
export const ResetSchema = z.object({
  email: z.string().email("Email is Required"),
});
export const NexOfKeenSchema = z.object({
  email: z.string().email("Email is Required"),
  next_of_kin: z.string().min(6, {
    message: "Minimum of 6 characters is required",
  }),
  next_of_kin_no: z.string().min(6, {
    message: "Minimum of 10 characters is required",
  }),
});
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters is required",
  }),
});
export const LoginSchema = z.object({
  email: z.string().email("Email is Required"),
  password: z.string().min(1, "Password is Required"),
});
export const SignupSchema = z.object({
  name: z.string().min(4, "Name Is Required").max(100),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters required"),
});
export const UserSchema = z.object({
  email: z.string(),
  name: z.string().min(4, "Name Is Required").max(100),
  phone: z.string().min(10, "Phone Number is Required"),
  address: z.string().min(4, "Address is Required"),
  id_passport: z.string().min(4, "ID/Passport Number is Required"),
  // next_of_kin: z.string().min(4, "Next of Kin is Required"),
  // next_of_kin_no: z.string().min(10, "Next of Kin Number is Required"),
});
