"use client";
import { ResetSchema } from "@/app/validationSchema";
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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { reset } from "@/actions/reset";
type ResetFormValues = z.infer<typeof ResetSchema>;

export const ResetForm = () => {
  const [isPending, setIsPending] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data: ResetFormValues) => {
    // setError("");
    // setSuccess("");
    setIsPending(() => {
      reset(data).then((value) => {
        setError(value?.error);
        setSuccess(value?.success);
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot Your Password?"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
      title="Forgot Password"
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white rounded-md py-2"
          >
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
