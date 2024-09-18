"use client";
import { getFileUrl } from "@/app/api/awsS3/s3";
import { Box, Button, Card, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateUserProfilePictureInDB } from "@/app/api/awsS3/s3";

// Example Prisma update function
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

// Example Prisma update function
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});
export const uploadFile = async (
  file: Buffer,
  fileName: string,
  userName: string
) => {
  const filBuffer = file;
  try {
    // Convert the file to a Blob
    // const blob =
    //   file instanceof Blob ? file : new Blob([file], { type: file.type });

    // Create the S3 upload parameters
    const params = {
      Bucket: "eu-north-1",
      Key: `${userName}/${fileName}`,
      Body: filBuffer,
      ContentType: "image/jpeg",
    };

    // Upload the file to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    console.log("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
const ProfiLeInfor = () => {
  const currentUser = useSession().data?.user;
  const [profileUrl, setProfileUrl] = useState("");
  // const [newProfile, setNewProfile] = useState(null);

  // Fetch profile picture from S3
  useEffect(() => {
    const fetchProfileUrl = () => {
      if (currentUser) {
        // const url = await getFileUrl(
        //   "profile.jpg",
        //   currentUser?.email || "DefaultUser"
        // );
        const url = currentUser?.profile_picture || "/profile.jpg";
        console.log(currentUser);
        console.log(url);
        setProfileUrl(url); // Update state with the S3 URL
      }
    };
    fetchProfileUrl();
  }, [currentUser]);

  const handleProfileUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", currentUser?.email || "DefaultUser");

    try {
      const res = await fetch("/api/awsS3", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      const newProfileUrl = await getFileUrl(
        data.fileName,
        currentUser?.email || "DefaultUser"
      );
      console.log(newProfileUrl);

      // Update the user's profile picture URL in the database
      await updateUserProfilePictureInDB(
        currentUser?.email || "",
        newProfileUrl
      );

      setProfileUrl(newProfileUrl); // Update profile picture URL
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <Flex gap="6" className="w-full justify-between">
      {/* Profile Picture */}
      <Card className="p-4 border-2 bg-light_gold">
        <div>
          <Image
            src={profileUrl}
            alt="Profile Picture"
            height={300}
            width={300}
          />
          <input type="file" onChange={handleProfileUpload} />
        </div>
        {/* <Image
          src={profile}
          height={300}
          width={300}
          alt="Profile Picture"
          className="rounded-md"
        /> */}
      </Card>

      {/* Profile Information Form */}
      <Card className="p-4 w-[60%]">
        <h1 className="text-2xl font-bold">Profile Information</h1>
        <form className="space-y-4">
          <Flex gap="6">
            <Box className="w-1/2">
              <label>First Name</label>
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.name?.split(" ")[0]}
              />
            </Box>
            <Box className="w-1/2">
              <label>Last Name</label>
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.name?.split(" ")[2]}
              />
            </Box>
          </Flex>

          <Flex gap="6">
            <Box className="w-1/2">
              <label>Email</label>
              <TextField.Root
                radius="large"
                disabled={true}
                defaultValue={currentUser?.email || "N/A"}
              />
            </Box>
            <Box className="w-1/2">
              <label>Phone</label>
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.phone || "N/A"}
              />
            </Box>
          </Flex>

          <Flex gap="6">
            <Box className="w-1/2">
              <label>ID/Passport No.</label>
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.phone || "N/A"}
              />
            </Box>
            <Box className="w-1/2">
              <label>Physical Address</label>
              <TextField.Root
                radius="large"
                defaultValue={currentUser?.address || "N/A"}
              />
            </Box>
          </Flex>

          <Button color="orange" className="w-full">
            Edit Profile
          </Button>
        </form>
      </Card>
    </Flex>
  );
};

export default ProfiLeInfor;
