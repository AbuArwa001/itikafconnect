"use client";

import { getUserByEmail } from "@/app/users/users";
import { NewPasswordSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getPasswordResetTokenByToken } from "@/utils/password-reset-token";
import { z } from "zod";
import bcrypt from "bcryptjs";

type NewPasswordToken = z.infer<typeof NewPasswordSchema>;

export const newPassword = async (
  values: NewPasswordToken,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Missing token!" };
  }
  const { password } = validatedFields.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token!" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has Expired" };
  }
  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email Does not exist" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });
  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });
  return { success: "Password update" };
};
