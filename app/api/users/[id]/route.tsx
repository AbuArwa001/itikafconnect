import { getUserByEmail } from "@/app/users/users";
import { UserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const where = { id: params.id };

  // Use findUnique instead of findMany to retrieve a single user
  const user = await prisma.user.findUnique({ where });
  // console.log("user", user);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const userValidation = UserSchema.safeParse(body);
  if (!userValidation.success) {
    console.log("BODY", body);
    return NextResponse.json(userValidation.error.format(), { status: 400 });
  }
  const { name, phone, id_passport, address, email } = userValidation.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  const updatedUser = await prisma.user.update({
    where: { email },
    data: {
      name,
      phone,
      id_passport,
      address,
    },
  });
  return NextResponse.json(updatedUser, { status: 200 });
}
