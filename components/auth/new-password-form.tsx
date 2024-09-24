"use client";
import { newPassword } from "@/actions/new-password";
import { NewPasswordSchema } from "@/app/validationSchema";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
type ResetFormValues = z.infer<typeof NewPasswordSchema>;

export const NewPasswordForm = () => {
  const seacrhParams = useSearchParams();
  const token = seacrhParams.get("token");

  const [isPending, setIsPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (data: ResetFormValues) => {
    // setError("");
    // setSuccess("");
    setIsPending(() => {
      newPassword(data, token).then((value) => {
        setError(value?.error);
        setSuccess(value?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter a new Password"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
      title="Password Reset"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Password</FormLabel>
                  <FormControl>
                    <Input
                      // id="email"
                      type="password"
                      {...field}
                      disabled={isPending}
                      placeholder="******"
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
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
