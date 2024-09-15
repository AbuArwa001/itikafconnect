"use client";
import FormWrapper from "@/app/components/FormWrapper";
import { LoginSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Link, TextField, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle signup logic
  };

  return (
    <FormWrapper title="Create Account" subtitle="Please fill in your details.">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Box mb="2">
          <TextField.Root size="2" placeholder="Name" {...register("name")} />
        </Box>
        <Box mb="2">
          <TextField.Root size="2" placeholder="Email" {...register("email")} />
        </Box>
        <Box mb="2">
          <TextField.Root
            size="2"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
        </Box>
        <Button
          type="submit"
          variant="solid"
          className="w-full h-12 bg-light_gold"
        >
          Sign up
        </Button>

        <Text as="p" className="w-full mt-4 text-center">
          <Link href="/auth/login">Already have an account? Log in</Link>
        </Text>
      </form>
    </FormWrapper>
  );
};

export default SignupForm;
