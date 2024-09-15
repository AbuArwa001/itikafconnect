"use client";
import { Button, Flex } from "@radix-ui/themes";

const LoginButton = () => {
  const handleLogin = () => {
    console.log("session");
  };

  return (
    <Flex justify="center" gap="2" className="mt-4 mb-4">
      <Button
        variant="solid"
        color="gold"
        onClick={handleLogin}
        className="w-full"
      >
        Sign in
      </Button>
    </Flex>
  );
};

export default LoginButton;
