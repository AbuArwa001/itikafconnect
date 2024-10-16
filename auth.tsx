import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getUserById } from "./app/users/users";
import { getAccountByUserId } from "./utils/account";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }
      const existingUser = await getUserById(user.id || "");
      if (!existingUser?.emailVerified) return false;
      return true;
    },
    // Handle session callback, customize session object with user role
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.role) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.name = token.name ?? null;
        session.user.email = token.email ?? "";
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },

    // Handle JWT callback to add role to the token
    async jwt({ token }) {
      // console.log("I AM BEING CALLED AGAIN");
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      const existingAccount = existingUser?.id
        ? await getAccountByUserId(existingUser.id)
        : null;
      if (existingUser) {
        token.role = existingUser.role;
        token.email = existingUser.email;
        token.name = existingUser.name;
        token.isOAuth = !!existingAccount;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
