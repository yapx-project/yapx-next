import type { NextApiRequest, NextApiResponse } from "next";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";
import { likePostById, unlikePostById } from "@/entities/posts/service";
import { ensureUserIsLoggedIn } from "@/entities/users/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/entities/posts/types/Session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing post ID." });
  }

  switch (method) {
    case "PUT":
      return likePostHandler(req, res, id);
    case "DELETE":
      return unlikePostHandler(req, res, id);
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function likePostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  try {
    const likeData = await likePostById(id, user.id!);
    return res.status(200).json({ item: likeData });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      return res.status(409).json({ message: "Already liked post" });
    }
    throw error;
  }
}

export async function unlikePostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  const unlikeData = await unlikePostById(id, user.id!);
  return res.status(200).json({ item: unlikeData });
}

export default withGlobalErrorHandler(handler);
