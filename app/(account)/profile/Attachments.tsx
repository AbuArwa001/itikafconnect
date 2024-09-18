"use client";
import React from "react";
import { useState, useEffect } from "react";
import { uploadFile, getFileUrl } from "@/app/api/awsS3/s3";
import Image from "next/image";
import { Box, Card, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";

const Attachments = () => {
  const currentUser = useSession().data?.user;
  const [idFrontUrl, setIdFrontUrl] = useState("");
  const [idBackUrl, setIdBackUrl] = useState("");
  //   const [newAttachment, setNewAttachment] = useState(null);

  useEffect(() => {
    const fetchAttachmentUrls = async () => {
      const frontUrl = await getFileUrl(
        currentUser?.email || "DefaultUser",
        "id_front.jpg"
      );
      const backUrl = await getFileUrl(
        currentUser?.email || "DefaultUser",
        "id_back.jpg"
      );
      setIdFrontUrl(frontUrl); // Update state with the S3 URL
      setIdBackUrl(backUrl);
    };

    if (currentUser) {
      fetchAttachmentUrls();
    }
  }, [currentUser]);

  const handleAttachmentUpload = async (e, fileName: string) => {
    const file = e.target.files ? e.target.files[0] : null;
    await uploadFile(file, fileName, currentUser?.email || "DefaultUser");
    const url = await getFileUrl(fileName, "id_back.jpg");
    fileName === "id_front.jpg" ? setIdFrontUrl(url) : setIdBackUrl(url);
  };

  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Attachments</h1>
      <Flex gap="6" className="justify-center">
        <Box>
          <label>ID Front</label>
          {idFrontUrl ? (
            <Image src={idFrontUrl} alt="ID Front" height={100} width={100} />
          ) : (
            <div className="border-2 border-dashed h-[150px] w-[200px] flex items-center justify-center relative">
              <span className="text-sm text-gray-500">Upload</span>
              <input
                type="file"
                onChange={(e) => handleAttachmentUpload(e, "id_front.jpg")}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                accept="image/*"
              />
            </div>
          )}
        </Box>

        <Box>
          <label>ID Back</label>
          {idBackUrl ? (
            <Image src={idBackUrl} alt="ID Back" height={150} width={200} />
          ) : (
            <div className="border-2 border-dashed h-[150px] w-[200px] flex items-center justify-center relative">
              <span className="text-sm text-gray-500">Upload</span>
              <input
                type="file"
                onChange={(e) => handleAttachmentUpload(e, "id_back.jpg")}
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
              onChange={(e) => handleAttachmentUpload(e, "additional.jpg")}
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
