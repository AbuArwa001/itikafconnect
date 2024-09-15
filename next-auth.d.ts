import { User, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession & {
  id: string;
  role: UserRole;
} & User;
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
