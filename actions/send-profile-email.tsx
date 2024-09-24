import puppeteer from "puppeteer";
import { Resend } from "resend";

// Function to convert HTML to PDF using Puppeteer
const convertHtmlToPdf = async (htmlContent: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: "A4" });
  await browser.close();
  return Buffer.from(pdfBuffer);
};

// Function to send the PDF via email using Resend
const sendEmailWithPdf = async (pdfBuffer: Buffer, userEmail: string) => {
  const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
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

// The generatePdf function
import React from "react";

export const generatePdf = async (
  userEmail: string,
  componentRef: React.RefObject<HTMLElement>
) => {
  try {
    // Remove buttons from the HTML content
    const element = componentRef.current;
    if (element) {
      const buttons = element.querySelectorAll("button");
      buttons.forEach((button: HTMLButtonElement) => button.remove());
    } else {
      console.error("Element reference is null.");
    }

    // Get HTML content and convert it to PDF
    if (!element) {
      throw new Error("Element reference is null.");
    }
    const htmlContent = element.outerHTML;
    const pdfBuffer = await convertHtmlToPdf(htmlContent);

    // Send the PDF via email
    await sendEmailWithPdf(pdfBuffer, userEmail);

    alert("PDF has been sent to your email!");
  } catch (error) {
    console.error("Error generating or sending PDF:", error);
  }
};
