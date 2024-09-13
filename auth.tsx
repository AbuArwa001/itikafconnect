import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth, { DefaultSession, type Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { getUserById } from "./app/users/users";

const prisma = new PrismaClient();

/**
 * This module augments the `next-auth` types to include custom properties in the `Session` interface.
 */
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's role */
      role: string;
    } & DefaultSession["user"];
  }
}

// Extending the JWT interface to include `role`
declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token }: { token: JWT }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
