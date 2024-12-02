"use server";

import { getUserByEmail } from "@/app/users/users";
import { ResetSchema } from "@/app/validationSchema";
import { sendPasswordResetEmail } from "@/app/emails/mails";
import { generatePasswordResetToken } from "@/utils/tokens";
import { z } from "zod";

type ResetFormValues = z.infer<typeof ResetSchema>;
export const reset = async (values: ResetFormValues) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Email" };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not Found" };
  }
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  return { success: "Reset email sent!" };
};
