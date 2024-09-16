// pages/api/registerEvent.ts
import prisma from "@/prisma/client"; // Make sure your Prisma client is properly set up on the server side.
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { userId, eventId } = body;
  // const eventValidation = EventSchema.safeParse(body);
  // if (!eventValidation.success) {
  //   return NextResponse.json(eventValidation.error.format(), { status: 400 });
  // }
  try {
    const registration = await prisma.registration.create({
      data: {
        userId,
        eventId,
      },
    });
    return NextResponse.json(registration, { status: 201 });
    // res.status(200).json(registration);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to register event" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { body } = request;

  return NextResponse.json(body);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Authenticate the session
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extract `id` from the URL path params
  // Parse the request body
  const body = await request.json();
  console.log("params", params);
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { message: "Missing registration ID" },
      { status: 400 }
    );
  }

  try {
    // Update registration status using the parsed `id`
    const registration = await prisma.registration.update({
      where: {
        id: Number(id), // Ensure `id` is properly converted to a number if necessary
      },
      data: {
        status: body.status, // Update the status field from the request body
      },
    });

    // Return the updated registration data
    return NextResponse.json(registration, { status: 200 });
  } catch (error) {
    console.error("Failed to update registration:", error);
    return NextResponse.json(
      { error: "Failed to Update Registration" },
      { status: 500 }
    );
  }
}

// export async function GET(request: NextRequest) {
//   const { body } = request;

//   return NextResponse.json(body);
// }
