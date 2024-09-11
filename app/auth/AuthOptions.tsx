import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import { AdapterUser } from "next-auth/adapters";

const authOptions: NextAuthOptions = {
  adapter: {
    ...PrismaAdapter(prisma),
    // Custom createUser function
    createUser: async (data) => {
      // Find or create a default role (e.g., "User" role)
      let defaultRole = await prisma.role.findUnique({
        where: { roleName: "User" },
      });

      // If the role doesn't exist, create it
      if (!defaultRole) {
        defaultRole = await prisma.role.create({
          data: {
            roleName: "User",
          },
        });
      }

      // Create the user with the assigned default role and ensure type compatibility
      const user = await prisma.user.create({
        data: {
          ...data,
          email: data.email ?? "", // Ensure email is a string
          role: {
            connect: { id: defaultRole.id }, // Use id for connecting to role
          },
        },
      });

      // Type-casting the created user to match AdapterUser interface
      return {
        ...user,
        email: user.email as string, // Force email to string for compatibility
      } as AdapterUser;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
