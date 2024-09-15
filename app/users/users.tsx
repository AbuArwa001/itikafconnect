import prisma from "@/prisma/client";

export const getUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email: email } });
export const getUserById = (id: string) =>
  prisma.user.findUnique({ where: { id: id } });
// export async function getUserByEmail({ email }: { email: string }) {
//   try {
//       const user = await prisma.user.findUnique({ where: { email } });
//   } catch (error) {

//   }
// return user;
// }

// export default getUserByEmail;
