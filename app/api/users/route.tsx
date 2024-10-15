import { getUserByEmail } from "@/app/users/users";
import { LoginSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const where = { id: params.id };
  const user = await prisma.user.findUnique({ where });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  return NextResponse.json(user, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json(); // Ensure you await the parsing of the JSON
  const loginValidation = LoginSchema.safeParse(body);
  if (!loginValidation.success) {
    return NextResponse.json(loginValidation.error.format(), { status: 400 });
  }
  const { email, password } = loginValidation.data;
  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 }); // Use NextResponse here
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    return NextResponse.json(user, { status: 200 }); // Wrap user in NextResponse
  }
  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
