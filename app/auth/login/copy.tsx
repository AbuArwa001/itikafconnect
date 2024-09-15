"use client";
import { Box, Button, TextField, Link, Text } from "@radix-ui/themes";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import FormWrapper from "@/app/components/FormWrapper";
import { LoginSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { signIn } from "@/auth"; // Correctly import signIn
import { z } from "zod";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/webauthn";

type UserForm = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(LoginSchema),
  });
  const { data: session, update, status } = useSession();
  const onSubmit = async (data: UserForm) => {
    if (!data) {
      return setError("Please enter your details.");
    }

    try {
      // Use next-auth's signIn to manage login
      const result = await signIn("credentials", {
        redirect: false, // Prevent redirect, handle manually
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error", err);
    }
  };

  return (
    <FormWrapper title="Welcome Back" subtitle="Please log in to continue.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Box mb="2">
          <TextField.Root
            size="2"
            placeholder="Email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </Box>
        <Box mb="2">
          <TextField.Root
            size="2"
            placeholder="Password"
            type="password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </Box>
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          variant="solid"
          className="w-full h-12 bg-light_gold"
        >
          Sign in
        </Button>

        <Button variant="solid" className="w-full h-12 bg-white mt-4">
          <FcGoogle size={24} className="mr-2" /> Sign in with Google
        </Button>

        <Text as="p" className="w-full mt-4 text-center">
          <Link href="/auth/signup">Don&apos;t have an account?</Link>
        </Text>
        <div>
          {status === "authenticated" ? (
            <button onClick={() => signIn("passkey", { action: "register" })}>
              Register new Passkey
            </button>
          ) : status === "unauthenticated" ? (
            <button onClick={() => signIn("passkey")}>
              Sign in with Passkey
            </button>
          ) : null}
        </div>
      </form>
    </FormWrapper>
  );
};

export default LoginForm;
