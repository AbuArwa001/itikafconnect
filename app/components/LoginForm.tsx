"use client";
import log from "@/app/assets/images/msq1.jpg";
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
import { FcGoogle } from "react-icons/fc";
import LoginButton from "./LoginButton";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "../validationSchema";

type UserForm = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(LoginSchema),
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const onSubmit = async (data: UserForm) => {
    if (!data) {
      return setError("Please Enter details");
    }
    try {
      const user = await axios.post("/api/users/login", data);
      if (!user) {
        setError("Invalid email or password");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("An error occurred during login.\n\tPlease try again.");
      console.error(error);
    }
  };

  return (
    <Flex justify="center" align="center" className="min-h-screen w-full p-4">
      <Card
        size="3"
        variant="surface"
        className="w-full max-w-lg bg-light_gold"
      >
        {/* Image Header */}
        <Inset clip="padding-box" side="top">
          <Image
            src={log}
            alt="Mosque Image"
            className="object-cover w-full h-40 bg-gray-500"
            width={320}
            height={160}
          />
        </Inset>
        {/* Content Section */}
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Box className="p-6">
            <Text size="4" weight="bold" mb="2">
              Welcome Back
            </Text>
            <Text as="p" size="2" mb="4">
              Please log in to continue.
            </Text>
            {/* Email Input */}
            <Box mb="2" className="w-full">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    size="2"
                    placeholder="Email"
                    {...field}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                )}
              />
              {errors.email && (
                <Text as="p" color="red" size="1">
                  {errors.email.message}
                </Text>
              )}
            </Box>
            {/* Password Input */}
            <Box mb="2" className="w-full">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField.Root
                    size="2"
                    placeholder="Password"
                    type="password"
                    {...field}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                )}
              />
              {errors.password && (
                <Text as="p" color="red" size="1">
                  {errors.password.message}
                </Text>
              )}
            </Box>
            {/* Login Button */}
            <LoginButton />
            {/* Sign in with Google */}
            <Button
              variant="solid"
              className="w-full h-12 bg-white mt-4 flex items-center justify-center cursor-pointer"
            >
              <FcGoogle size={24} className="mr-2" /> Sign in with Google
            </Button>
            {/* Sign Up Link */}
            <Text as="p" className="w-full mt-4 text-center">
              <Link href="/auth/signup">Don&apos;t have an Account?</Link>
            </Text>
            {/* Error Display */}
            {error && (
              <Text as="p" color="red" size="2" className="mt-2">
                {error}
              </Text>
            )}
          </Box>
        </form>
      </Card>
    </Flex>
  );
};

export default LoginForm;
