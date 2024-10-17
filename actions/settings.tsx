"use server";

import { getUserByEmail, getUserById } from "@/app/users/users";
import { SettingsSchema } from "@/app/validationSchema";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import { sendVerificationEmail } from "@/utils/mails";
import { generateVerificationToken } from "@/utils/tokens";
import z from "zod";
import bcrypt from "bcryptjs";
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized user" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized Access" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in Use" };
    }
    const verificationToken = await generateVerificationToken(
      values.email || ""
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        ...values,
      },
    });
    return { success: "Verification Email Sent" };
  }
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordMatch) {
      return { error: "Incorrect Password" };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values = {
      ...values,
      password: hashedPassword,
      newPassword: undefined,
    };
  }
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated!" };
};
