import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/mails";

export async function POST(req: Request) {
  try {
    const { to, subject, html }: { to: string; subject: string; html: string } =
      await req.json();

    if (!to || !subject || !html) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const response = await sendEmail(to, subject, html);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
