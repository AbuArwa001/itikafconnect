// The generatePdf function
import React from "react";
import axios from "axios";
import { Resend } from "resend";

// Function to send the PDF via email using Resend
const sendEmailWithPdf = async (pdfBuffer: Buffer, userEmail: string) => {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY || "");
  const email = {
    from: "onboarding@resend.dev",
    to: userEmail,
    subject: `${userEmail} Profile PDF`,
    html: `<p>Please find attached the profile information of user ID ${userEmail}.</p>`,
    attachments: [
      {
        filename: "profile.pdf",
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  };

  await resend.emails.send(email);
};

export const generatePdf = async (
  userEmail: string,
  componentRef: React.RefObject<HTMLElement>
) => {
  try {
    const element = componentRef.current;
    if (element) {
      const buttons = element.querySelectorAll("button");
      buttons.forEach((button: HTMLButtonElement) => button.remove());
    } else {
      console.error("Element reference is null.");
      return;
    }

    const htmlContent = element.outerHTML;

    const response = await axios.post(
      "/api/generate-pdf",
      { htmlContent },
      { responseType: "arraybuffer" }
    );

    const pdfBuffer = Buffer.from(response.data);

    // Send the PDF via email
    await sendEmailWithPdf(pdfBuffer, userEmail);

    alert("PDF has been sent to your email!");
  } catch (error) {
    console.error("Error generating or sending PDF:", error);
  }
};
