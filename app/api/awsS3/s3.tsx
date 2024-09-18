// s3.tsx
"use server";
import prisma from "@/prisma/client";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
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
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: `${userName}/${fileName}`,
  });
  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};
export const getProfileUrl = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return "";
  }
  return user.profile_picture;
};
export const getUrl = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user) {
    return null;
  }
  return user;
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
export async function updateUserIdFrontInDB(email: string, profileUrl: string) {
  return prisma.user.update({
    where: { email },
    data: { id_front: profileUrl },
  });
}
export async function updateUserIdBackInDB(email: string, profileUrl: string) {
  return prisma.user.update({
    where: { email },
    data: { id_back: profileUrl },
  });
}
