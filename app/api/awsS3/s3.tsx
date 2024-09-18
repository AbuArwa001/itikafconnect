"use server";
import prisma from "@/prisma/client";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const REGION = "eu-north-1";
const BUCKET_NAME = "itikafconnect";

const s3Client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: "AKIAUJRDVR7A7AZQ2Z4M",
    secretAccessKey: "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",
  },
});

// export const uploadFile = async (
//   file: Buffer,
//   fileName: string,
//   userName: string
// ) => {
//   const filBuffer = file;
//   try {
//     // Convert the file to a Blob
//     // const blob =
//     //   file instanceof Blob ? file : new Blob([file], { type: file.type });

//     // Create the S3 upload parameters
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: `${userName}/${fileName}`,
//       Body: filBuffer,
//       ContentType: "image/jpeg",
//     };

//     // Upload the file to S3
//     const command = new PutObjectCommand(params);
//     await s3Client.send(command);

//     console.log("File uploaded successfully");
//   } catch (error) {
//     console.error("Error uploading file:", error);
//   }
// };

export const getFileUrl = async (fileName: string, userName: string) => {
  const command = new GetObjectCommand({
    Bucket: "itikafconnect",
    Key: `${userName}/${fileName}`,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export async function updateUserProfilePictureInDB(
  email: string,
  profileUrl: string
) {
  return prisma.user.update({
    where: { email },
    data: { profile_picture: profileUrl },
  });
}
