import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { EventSchema } from "@/app/validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const eventValidation = EventSchema.safeParse(body);
  if (!eventValidation.success) {
    return NextResponse.json(eventValidation.error.format(), { status: 400 });
  }
  const createdEvent = await prisma.event.create({
    data: {
      name: body.name,
      date: body.date,
      location: body.location,
      description: body.description,
    },
  });

  return NextResponse.json(createdEvent, { status: 201 });
}

export async function GET(request: NextRequest) {
  const { body } = request;

  return NextResponse.json(body);
}
