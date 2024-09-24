// ProfiLeInfor.tsx
"use client";
import {
  getFileUrl,
  getProfileUrl,
  updateUserProfilePictureInDB,
} from "@/app/api/awsS3/s3";
import defaultImage from "@/app/assets/images/Default.jpg";
// import defaultImg from "@/app/assets/images/Default.jpg";
import { Skeleton } from "@/app/components";
import { User } from "@prisma/client";
import { Box, Button, Card, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface ProfiLeInforProps {
  user: User | null;
}

const ProfiLeInfor = ({ user }: ProfiLeInforProps) => {
  // const userId = useSession().data?.user.id;
  const currentUser = user;
  const [profileUrl, setProfileUrl] = useState("");
  const isLoading = !currentUser;
  const router = useRouter();
  // const [newProfile, setNewProfile] = useState(null);

  // Fetch profile picture from S3
  useEffect(() => {
    const fetchProfileUrl = async () => {
      if (currentUser) {
        try {
          // Fetch the profile URL for the current user
          const url = await getProfileUrl(currentUser.id);
          url ? setProfileUrl(url) : setProfileUrl("");
        } catch (error) {
          console.error("Error fetching profile URL:", error);
        }
      }
    };

    fetchProfileUrl();
    console.log("profile", profileUrl);
  }, [currentUser]);

  // console.log("CURRENT USER", currentUser);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await axios.patch(`/api/users/${currentUser?.id}`, {
        name: `${data.firstName} ${data.lastName}`,
        email: currentUser?.email,
        phone: data.phone,
        address: data.address,
        id_passport: data.id_passport,
      });

      if (res.status === 200) {
        router.refresh(); // Refresh the page after updating
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
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
          {isLoading ? (
            <Skeleton height="18rem" width="18rem" />
          ) : (
            <Image
              src={currentUser.profile_picture || defaultImage}
              alt="Profile Picture"
              height={300}
              width={300}
              priority
            />
          )}
          {isLoading ? (
            <Skeleton />
          ) : (
            <input type="file" onChange={handleProfileUpload} />
          )}
          {/* <input type="file" onChange={handleProfileUpload} /> */}
        </div>
      </Card>

      {/* Profile Information Form */}
      <Card className="p-4 w-[60%]">
        <h1 className="text-2xl font-bold">Profile Information</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Flex gap="6">
            <Box className="w-1/2">
              <label>First Name</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.name?.split(" ")[0]}
                  name="firstName"
                />
              )}
            </Box>
            <Box className="w-1/2">
              <label>Last Name</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.name?.split(" ")[1]}
                  name="lastName"
                />
              )}
            </Box>
          </Flex>

          <Flex gap="6">
            <Box className="w-1/2">
              <label>Email</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  disabled
                  defaultValue={currentUser?.email || "N/A"}
                  name="email"
                />
              )}
            </Box>
            <Box className="w-1/2">
              <label>Phone</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.phone || "N/A"}
                  name="phone"
                />
              )}
            </Box>
          </Flex>

          <Flex gap="6">
            <Box className="w-1/2">
              <label>ID/Passport No.</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.id_passport || "N/A"}
                  name="id_passport"
                />
              )}
            </Box>
            <Box className="w-1/2">
              <label>Physical Address</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.address || "N/A"}
                  name="address"
                />
              )}
            </Box>
          </Flex>

          <Button color="orange" className="w-full" type="submit">
            Edit Profile
          </Button>
        </form>
      </Card>
    </Flex>
  );
};
export default ProfiLeInfor;
