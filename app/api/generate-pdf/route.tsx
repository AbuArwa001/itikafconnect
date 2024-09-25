import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

/**
 *
 * @param origin
 * @returns
 */
const getCorsHeaders = (origin: string) => {
  // Default options
  const headers = {
    "Access-Control-Allow-Methods":
      process.env.NEXT_PUBLIC_ALLOWED_METHODS || "POST,OPTIONS",
    "Access-Control-Allow-Headers":
      process.env.NEXT_PUBLIC_ALLOWED_HEADERS || "Content-Type",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_DOMAIN_URL || "*",
  };

  const allowedOrigins =
    process.env.NEXT_PUBLIC_ALLOWED_ORIGIN?.split(",") || [];

  if (allowedOrigins.includes("*")) {
    headers["Access-Control-Allow-Origin"] = "*";
  } else if (allowedOrigins.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }

  return headers;
};

/**
 * Handle OPTIONS requests for CORS preflight.
 */
export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request.headers.get("origin") || ""),
  });
};

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { htmlContent } = await req.json();

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();

    // Add the HTML content as text
    page.drawText(htmlContent, {
      x: 50,
      y: page.getHeight() - 50,
      size: 12,
    });

    // Serialize the PDFDocument to bytes (Uint8Array)
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      headers: {
        ...getCorsHeaders(req.headers.get("origin") || ""),
        "Content-Type": "application/pdf",
      },
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to generate PDF" }),
      {
        status: 500,
        headers: {
          ...getCorsHeaders(req.headers.get("origin") || ""),
          "Content-Type": "application/json",
        },
      }
    );
  }
}
