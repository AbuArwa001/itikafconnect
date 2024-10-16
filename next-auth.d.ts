import { User, UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession & {
  id: string;
  role: UserRole;
  profile_picture: string;
  next_of_kin: string;
  next_of_kin_no: string;
  id_front: string | null;
  isOAuth: boolean;
} & User;
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
