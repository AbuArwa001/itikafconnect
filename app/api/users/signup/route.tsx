import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcryptjs";
import { SignupSchema } from "@/app/validationSchema";
import { getUserByEmail } from "@/app/users/users";

// Function to get a user by email
// POST method to handle signup
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const signupValidation = SignupSchema.safeParse(body);
    if (!signupValidation.success) {
      return NextResponse.json(signupValidation.error.format(), {
        status: 400,
      });
    }

    const { email, password, name } = signupValidation.data;

    // Check if the user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
