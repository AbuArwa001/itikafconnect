import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const EventSchema = z.object({
  name: z.string().min(4).max(100),
  date: z.string(),
  location: z.string().min(4).max(100),
  description: z.string().min(4).max(1000),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const eventValidation = EventSchema.safeParse(body);
  if (!eventValidation.success) {
    return NextResponse.json(eventValidation.error.errors, { status: 400 });
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
