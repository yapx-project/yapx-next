import type { NextApiRequest, NextApiResponse } from "next";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";
import { ensureUserIsLoggedIn } from "@/entities/users/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/entities/posts/types/Session";
import { followUserById, unfollowUserById } from "@/entities/users/service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing user ID." });
  }

  switch (method) {
    case "PUT":
      return followUserHandler(req, res, id);
    case "DELETE":
      return unfollowUserHandler(req, res, id);
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function followUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  try {
    const data = await followUserById(id, user.id!);
    return res.status(200).json({ item: data });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      return res.status(409).json({ message: "Already following" });
    }
    throw error;
  }
}

export async function unfollowUserHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  const data = await unfollowUserById(id, user.id!);
  return res.status(200).json({ item: data });
}

export default withGlobalErrorHandler(handler);
