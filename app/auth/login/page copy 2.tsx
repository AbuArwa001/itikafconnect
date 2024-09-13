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
  return <div>Login Page</div>;
};

export default LoginPage;
