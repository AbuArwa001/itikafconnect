// ProfiLeInfor.tsx
"use client";
import { getFileUrl, getProfileUrl } from "@/app/api/awsS3/s3";
import { Box, Button, Card, Flex, TextField } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateUserProfilePictureInDB } from "@/app/api/awsS3/s3";
import defaultImg from "@/app/assets/images/defaultImage.png";

const ProfiLeInfor = () => {
  const currentUser = useSession().data?.user;
  const [profileUrl, setProfileUrl] = useState("");
  // const [newProfile, setNewProfile] = useState(null);

  // Fetch profile picture from S3
  useEffect(() => {
    const fetchProfileUrl = async () => {
      if (currentUser) {
        try {
          // Fetch the profile URL for the current user
          const url = (await getProfileUrl(currentUser.id)) || "/profile.jpg";
          // console.log(currentUser);
          // console.log(url);
          url
            ? setProfileUrl(url)
            : setProfileUrl(process.env.NEXT_PUBLIC_DEFAULT_USER || "");
          setProfileUrl(url); // Update state with the S3 URL
        } catch (error) {
          console.error("Error fetching profile URL:", error);
        }
      }
    };

    fetchProfileUrl();
  }, [currentUser]);

  const handleProfileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const file = e.target.files?.[0];
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
      console.log("NEW URL", process.env.NEXT_PUBLIC_DEFAULT_USER);

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
            src={profileUrl || defaultImg}
            alt="Profile Picture"
            height={300}
            width={300}
            priority={true}
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
