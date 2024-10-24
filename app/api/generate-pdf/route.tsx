import { NextRequest, NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";

// Function to get CORS headers
const getCorsHeaders = (origin: string) => {
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

// Handle OPTIONS requests for CORS preflight
export const OPTIONS = async (request: NextRequest) => {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(request.headers.get("origin") || ""),
  });
};

// Handle POST requests to generate PDFs
export async function POST(req: NextRequest) {
  try {
    const { htmlContent } = await req.json();
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(htmlContent, {
      x: 50,
      y: page.getHeight() - 50,
      size: 12,
    });
    const pdfBytes = await pdfDoc.save();
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

// New route segment configurations
export const runtime = "nodejs";
export const preferredRegion = "us-east-1";
