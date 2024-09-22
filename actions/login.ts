"use server";
import z from "zod";
import { LoginSchema } from "@/app/validationSchema";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
type LoginFormValues = z.infer<typeof LoginSchema>;

export const login = async (data: LoginFormValues) => {
  const validatedFields = LoginSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid Cridential" };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Cridential" };
      }
    }
    throw error;
  }
  return { success: "Login successful" };
};
// export const login = async (email: string, password: string) => {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//   return await response.json();
// }
