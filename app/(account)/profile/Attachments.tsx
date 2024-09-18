"use client";
import {
  getFileUrl,
  getUrl,
  updateUserIdBackInDB,
  updateUserIdFrontInDB,
} from "@/app/api/awsS3/s3";
import { UserRole } from "@prisma/client";
import { Box, Card, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface UserWithoutSession {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
  phone: string | null;
  address: string | null;
  id_front?: string | null; // Assuming these are the fields you're working with
  id_back?: string | null;
  role: UserRole;
}

const Attachments = () => {
  const currentUser = useSession().data?.user;
  const [idFrontUrl, setIdFrontUrl] = useState("");
  const [idBackUrl, setIdBackUrl] = useState("");
  //   const [newAttachment, setNewAttachment] = useState(null);

  useEffect(() => {
    const fetchAttachmentUrls = async () => {
      const url: UserWithoutSession | null = await getUrl(
        currentUser?.id || ""
      );
      const frontUrl = url?.id_front || "";
      frontUrl ? setIdFrontUrl(frontUrl) : setIdFrontUrl("");
      const backUrl = url?.id_back || "";
      backUrl ? setIdBackUrl(backUrl) : setIdBackUrl("");
    };

    if (currentUser) {
      fetchAttachmentUrls();
    }
  }, [currentUser]);

  const handleAttachmentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fileName: string
  ) => {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "email",
      `${currentUser?.email}/${fileName}` || "DefaultUser"
    );
    console.log(`File name: ${currentUser?.email}/${fileName}`);
    try {
      const res = await fetch("/api/awsS3", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      // const prefix = fileName === "id_front" ? "id_front" : "id_back";
      const newProfileUrl: string = await getFileUrl(
        `${fileName}/${file.name}`,
        currentUser?.email || "DefaultUser"
      );
      console.log("NEW URL newprof", newProfileUrl);
      if (fileName === "id_front") {
        await updateUserIdFrontInDB(currentUser?.email || "", newProfileUrl);
      }
      if (fileName === "id_back") {
        await updateUserIdBackInDB(currentUser?.email || "", newProfileUrl);
      }
    } catch (error) {
      console.error("Error uploading attachment:", error);
    }

    // await uploadFile(file, fileName, currentUser?.email || "DefaultUser");
    const url = await getFileUrl(fileName, currentUser?.email || "DefaultUser");
    fileName === "id_front.jpg" ? setIdFrontUrl(url) : setIdBackUrl(url);
  };

  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Attachments</h1>
      <Flex gap="6" className="justify-center">
        <Box>
          <label>ID Front</label>
          {idFrontUrl ? (
            // <></>
            <Image src={idFrontUrl} alt="ID Front" height={150} width={200} />
          ) : (
            <div className="border-2 border-dashed h-[150px] w-[200px] flex items-center justify-center relative">
              <span className="text-sm text-gray-500">Upload</span>
              <input
                type="file"
                onChange={(e) => handleAttachmentUpload(e, "id_front")}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                accept="image/*"
              />
            </div>
          )}
        </Box>

        <Box>
          <label>ID Back</label>
          {idBackUrl ? (
            // <></>
            <Image src={idBackUrl} alt="ID Back" height={150} width={200} />
          ) : (
            <div className="border-2 border-dashed h-[150px] w-[200px] flex items-center justify-center relative">
              <span className="text-sm text-gray-500">Upload</span>
              <input
                type="file"
                onChange={(e) => handleAttachmentUpload(e, "id_back")}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                accept="image/*"
              />
            </div>
          )}
        </Box>

        <Box>
          <label>Additional Attachment</label>
          <div className="border-2 border-dashed h-[150px] w-[200px] flex items-center justify-center">
            {/* Placeholder for additional attachment */}
            <span className="text-sm text-gray-500">Upload</span>
            <input
              type="file"
              onChange={(e) => handleAttachmentUpload(e, "additional")}
              className="absolute opacity-0 w-full h-full cursor-pointer"
              accept="image/*"
            />
          </div>
        </Box>
      </Flex>
    </Card>
  );
};

export default Attachments;
