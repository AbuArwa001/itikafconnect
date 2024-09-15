import { getUserByEmail } from "@/app/users/users";
import { LoginSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}
export async function POST(request: NextRequest) {
  const body = request.json();
  const loginValidation = LoginSchema.safeParse(body);
  if (!loginValidation.success) {
    return NextResponse.json(loginValidation.error.format(), { status: 400 });
  }
  const { email, password } = loginValidation.data;
  const user = await getUserByEmail(email);
  if (!user || !user.password) return null;
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) return user;
  return NextResponse.json(user, { status: 200 });
}
