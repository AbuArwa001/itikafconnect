"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useTransition } from "react";
import { SignupSchema } from "@/app/validationSchema";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState } from "react";
import { signup } from "@/actions/signup";
type SignupFormValues = z.infer<typeof SignupSchema>;

export const SignUpForm = () => {
  const [isPending, setIsPending] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const onSubmit = (data: SignupFormValues) => {
    setError("");
    setSuccess("");
    setIsPending(() => {
      signup(data).then((response: { error?: string }) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccess("Login Success");
        }
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Create An Account"
      backButtonLabel="Already Have an Account?"
      backButtonHref="/auth/login"
      title="Sign Up"
      showSocial={true}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Full Names</FormLabel>
                  <FormControl>
                    <Input
                      // id="email"
                      type="name"
                      {...field}
                      disabled={isPending}
                      placeholder="Full Name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      // id="email"
                      type="email"
                      {...field}
                      disabled={isPending}
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <FormControl>
                    <Input
                      // id="email"
                      type="Password"
                      {...field}
                      disabled={isPending}
                      placeholder="********"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white rounded-md py-2"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
