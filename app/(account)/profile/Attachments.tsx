import React, { useEffect, useState } from "react";
import { Box, Card, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  getFileUrl,
  getUrl,
  updateUserIdBackInDB,
  updateUserIdFrontInDB,
} from "@/app/api/awsS3/s3";

const Attachments = () => {
  const currentUser = useSession().data?.user;
  const [idFrontUrl, setIdFrontUrl] = useState("");
  const [idBackUrl, setIdBackUrl] = useState("");

  useEffect(() => {
    const fetchAttachmentUrls = async () => {
      const url = await getUrl(currentUser?.id || "");
      setIdFrontUrl(url?.id_front || "");
      setIdBackUrl(url?.id_back || "");
    };

    if (currentUser) {
      fetchAttachmentUrls();
    }
  }, [currentUser]);

  const handleAttachmentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fileName: string
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "email",
      `${currentUser?.email}/${fileName}` || "DefaultUser"
    );

    try {
      const res = await fetch("/api/awsS3", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const newProfileUrl = await getFileUrl(
        `${fileName}/${file.name}`,
        currentUser?.email || "DefaultUser"
      );

      if (fileName === "id_front") {
        await updateUserIdFrontInDB(currentUser?.email || "", newProfileUrl);
        setIdFrontUrl(newProfileUrl);
      } else if (fileName === "id_back") {
        await updateUserIdBackInDB(currentUser?.email || "", newProfileUrl);
        setIdBackUrl(newProfileUrl);
      }
    } catch (error) {
      console.error("Error uploading attachment:", error);
    }
  };

  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Attachments</h1>
      <Flex gap="6" className="justify-center">
        <Box>
          <label>ID Front</label>
          {idFrontUrl ? (
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
          <div className="border-2 border-dashed h-[150px] w-[200px] flex items-center justify-center relative">
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
