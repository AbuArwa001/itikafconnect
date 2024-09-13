"use client";
import {
  Box,
  Button,
  Card,
  Flex,
  Inset,
  Link,
  Text,
  TextField,
} from "@radix-ui/themes";
import Image from "next/image";
import log from "@/app/assets/images/msq1.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth } from "@/auth";

const LoginPage = () => {
  const session = auth();
  const handleLogin = () => {
    console.log(session);
  };
  return (
    <Flex justify="center" align="center" height="100vh">
      <Card
        size="3"
        variant="surface"
        style={{ width: "100%", maxWidth: "320px" }}
        className="bg-light_gold"
      >
        {/* Image Header */}
        <Inset clip="padding-box" side="top">
          <Image
            src={log}
            alt="Bold typography"
            width={320}
            height={120}
            style={{
              objectFit: "cover",
              height: 160,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>

        {/* Content Section */}
        <Box className="p-6 last:col-span-2">
          <Text size="4" weight="bold" mb="2">
            Welcome Back
          </Text>
          <Text as="p" size="2" mb="4">
            Please log in to continue.
          </Text>

          {/* Login Form */}
          <Box mb="2">
            <TextField.Root size="2" placeholder="Email" />
          </Box>
          <Box mb="2">
            <TextField.Root size="2" placeholder="Password" type="password" />
          </Box>
          <Flex justify="center" gap="1">
            <Button variant="solid" color="gold" onClick={handleLogin}>
              Sign in
            </Button>
            {/* <Button variant="soft" color="gold">
              Sign Up
              </Button> */}
          </Flex>
          <Button asChild mt="2" ml="4">
            <Button className="w-full h-12 bg-white">
              <FcGoogle size={24} className="mr-2 bg-white" /> Sign in with
              Google
            </Button>
          </Button>
          <Text as="p" className="w-full mt-2" ml="5">
            <Link href="/auth/signup">Don't have an Account?</Link>
          </Text>
        </Box>
      </Card>
    </Flex>
  );
};

export default LoginPage;
