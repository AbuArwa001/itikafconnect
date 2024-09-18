import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

async function uploadFileToS3(file: Buffer, fileName: string, email: string) {
  const filBuffer = file;
  console.log(fileName);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${email}/${fileName}`,
    Body: filBuffer,
    ContentType: "image/jpeg",
  };
  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const email = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name, email);

    // await s3Client.send(command);
    return NextResponse.json({ Success: true, fileName });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json(
        { error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
