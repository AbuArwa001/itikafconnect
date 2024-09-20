import { getUserByEmail } from "@/app/users/users";
import { UserSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const where = { id: params.id };

    // Use findUnique to retrieve a single user by ID
    const user = await prisma.user.findUnique({ where });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const userValidation = UserSchema.safeParse(body);
  // console.log("BODY", body);
  if (!userValidation.success) {
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
