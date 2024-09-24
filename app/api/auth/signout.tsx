import { signOut } from "@/auth"; // Your custom signOut logic
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signOut();
    res.status(200).json({ message: "Signed out" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
