import { Skeleton } from "@/app/components";
import { Box, Button, Card, Flex } from "@radix-ui/themes";
// ProfiLeInfor.tsx
// import { useSession } from "next-auth/react";
import defaultImg from "@/app/assets/images/Default.jpg";
import Image from "next/image";
import { User } from "@prisma/client";

export interface ProfiLeInforProps {
  user: User | null;
}

const Loading = () => {
  return (
    <Flex gap="6" className="w-full justify-between">
      <Card className="p-4 border-2 bg-light_gold">
        <div>
          <Image
            src={defaultImg}
            alt="Profile Picture"
            height={300}
            width={300}
            priority={true}
          />
          <Skeleton />
          {/* <input type="file" onChange={handleProfileUpload} /> */}
        </div>
      </Card>

      <Card className="p-4 w-[60%]">
        <h1 className="text-2xl font-bold">Profile Information</h1>
        <form className="space-y-4">
          <Flex gap="6">
            <Box className="w-1/2">
              <label>First Name</label>
              <Skeleton />
              {/* <TextField.Root
                radius="large"
                defaultValue={currentUser?.name?.split(" ")[0]}
                name="firstName"
              /> */}
            </Box>
            <Box className="w-1/2">
              <label>Last Name</label>
              <Skeleton />
              {/* <TextField.Root
                radius="large"
                defaultValue={currentUser?.name?.split(" ")[1]}
                name="lastName"
              /> */}
            </Box>
          </Flex>

          <Flex gap="6">
            <Box className="w-1/2">
              <label>Email</label>
              <Skeleton />
              {/* <TextField.Root
                radius="large"
                disabled
                defaultValue={currentUser?.email || "N/A"}
                name="email"
              /> */}
            </Box>
            <Box className="w-1/2">
              <label>Phone</label>
              <Skeleton />
            </Box>
          </Flex>

          <Flex gap="6">
            <Box className="w-1/2">
              <label>ID/Passport No.</label>
              <Skeleton />
              {/* <TextField.Root
                radius="large"
                defaultValue={currentUser?.id_passport || "N/A"}
                name="id_passport"
              /> */}
            </Box>
            <Box className="w-1/2">
              <label>Physical Address</label>
              <Skeleton />
              {/* <TextField.Root
                radius="large"
                defaultValue={currentUser?.address || "N/A"}
                name="address"
              /> */}
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

export default Loading;
