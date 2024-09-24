import { Box, Card, Flex, TextField } from "@radix-ui/themes";
import { ProfiLeInforProps } from "./ProfiLeInfor";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NexOfKeenSchema } from "@/app/validationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";

type NexOfKeenValues = z.infer<typeof NexOfKeenSchema>;
const NextOfKeen = ({ user }: ProfiLeInforProps) => {
  const router = useRouter();
  const form = useForm<NexOfKeenValues>({
    resolver: zodResolver(NexOfKeenSchema),
    defaultValues: {
      next_of_kin: "",
      next_of_kin_no: "",
    },
  });
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      console.log("Data", data.next_of_kin);
      const res = await axios.patch(`/api/users/${currentUser?.id}`, {
        next_of_kin: data.next_of_kin,
        next_of_kin_no: data.next_of_kin_no,
      });

      if (res.status === 200) {
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const currentUser = user;
  const isLoading = !currentUser;
  return (
    <Card className="p-4 w-full">
      <h1 className="text-2xl font-bold">Next of Kin</h1>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <Flex gap="6">
            <Box className="w-1/2">
              <label>Name</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.next_of_kin || "N/A"}
                />
              )}
            </Box>
            <Box className="w-1/2">
              <label>Phone</label>
              {isLoading ? (
                <Skeleton height="2rem" />
              ) : (
                <TextField.Root
                  radius="large"
                  defaultValue={currentUser?.next_of_kin_no || "N/A"}
                />
              )}
            </Box>
          </Flex>
          <Button type="submit" onSubmit={(event) => onSubmit(e)}>
            Update
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default NextOfKeen;
