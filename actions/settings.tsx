"use server";

import { getUserById } from "@/app/users/users";
import { SettingsSchema } from "@/app/validationSchema";
import { currentUser } from "@/lib/auth";
import prisma from "@/prisma/client";
import z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized user" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "UnauthorizeDd Access" };
  }
  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated!" };
};
