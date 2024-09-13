// import authOptions from "@/app/auth/AuthOptions";
import { EventSchema } from "@/app/validationSchema";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
// import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const eventValidation = EventSchema.safeParse(body);
  if (!eventValidation.success) {
    return NextResponse.json(eventValidation.error.format(), { status: 400 });
  }
  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 });
  }
  const updatedEvent = await prisma.event.update({
    where: {
      id: event.id,
    },
    data: {
      name: body.name,
      date: body.date,
      location: body.location,
      description: body.description,
    },
  });

  return NextResponse.json(updatedEvent, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const event = await prisma.event.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!event) {
    return NextResponse.json({ message: "Invalid Event" }, { status: 404 });
  }
  await prisma.event.delete({
    where: {
      id: event.id,
    },
  });

  return NextResponse.json({ message: "Event deleted" }, { status: 200 });
}
