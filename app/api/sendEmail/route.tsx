// app/api/sendMail/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

// export async function POST(req: NextRequest) {
//   try {
//     const { email, subject, htmlContent } = await req.json();

//     // Send the email using Resend API
//     const response = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       to: email,
//       subject: subject,
//       html: htmlContent,
//     });

//     return NextResponse.json({ success: true, response });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: (error as Error).message,
//       },
//       { status: 500 }
//     );
//   }
// }
export async function POST(req: NextRequest) {
  try {
    const { email, subject, htmlContent } = await req.json();

    // Send the email using Resend API
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
