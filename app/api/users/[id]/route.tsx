import { getUserByEmail } from "@/app/users/users";
import { NexOfKeenSchema, UserSchema } from "@/app/validationSchema";
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
  try {
    const body = await request.json();
    let userValidation;
    let updatedUser;
    if (body.next_of_kin) {
      userValidation = NexOfKeenSchema.safeParse(body);
      // Validation failed
      if (!userValidation.success) {
        return NextResponse.json(userValidation.error.format(), {
          status: 400,
        });
      }

      // Destructure validated data
      const { next_of_kin, next_of_kin_no, email } = userValidation.data;

      // Check if the user exists
      const user = await getUserByEmail(email);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Update the user with "next of kin" information
      updatedUser = await prisma.user.update({
        where: { email },
        data: {
          next_of_kin,
          next_of_kin_no,
        },
      });
    } else {
      // Handle general user updates
      userValidation = UserSchema.safeParse(body);

      // Validation failed
      if (!userValidation.success) {
        return NextResponse.json(userValidation.error.format(), {
          status: 400,
        });
      }

      // Destructure validated data
      const { name, phone, id_passport, address, email } = userValidation.data;

      // Check if the user exists
      const user = await getUserByEmail(email);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      // Update the user with general information
      updatedUser = await prisma.user.update({
        where: { email },
        data: {
          name,
          phone,
          id_passport,
          address,
        },
      });
    }

    // Return the updated user data
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
