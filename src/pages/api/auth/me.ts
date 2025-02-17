import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/entities/posts/types/Session";
import { ensureUserIsLoggedIn } from "@/entities/users/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  return res.status(201).json({ user: user });
}
