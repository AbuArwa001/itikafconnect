"use server";
import z from "zod";
import bcrypt from "bcryptjs";
import { SignupSchema } from "@/app/validationSchema";
import { getUserByEmail } from "@/app/users/users";
import prisma from "@/prisma/client";

type LoginFormValues = z.infer<typeof SignupSchema>;

export const signup = async (data: LoginFormValues) => {
  const validatedFields = SignupSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Cridential" };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists" };
  }
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
  // TODO: Send email verification
  return { success: "Account Created" };
};
