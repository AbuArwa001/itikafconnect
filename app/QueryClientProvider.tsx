"use client";
import {
  QueryClient,
  QueryClientProvider as ReactQueryCLP,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient();
  return <ReactQueryCLP client={queryClient}>{children}</ReactQueryCLP>;
};

export default QueryClientProvider;
