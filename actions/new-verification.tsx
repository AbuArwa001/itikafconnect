"use server";

import { getUserByEmail } from "@/app/users/users";
import { getVerificationTokenByToken } from "@/app/users/verification-token";
import prisma from "@/prisma/client";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return { error: "Token does not exist" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired" };
  }
  const exisTingUser = await getUserByEmail(existingToken.email);
  if (!exisTingUser) {
    return { error: "Email does Not exist" };
  }
  await prisma.user.update({
    where: { id: exisTingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await prisma.verificationToken.delete({
    where: { identifier: existingToken.identifier },
  });
  return { success: "Email Verified" };
};
