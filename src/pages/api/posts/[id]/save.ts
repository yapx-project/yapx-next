import type { NextApiRequest, NextApiResponse } from "next";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";
import { savePostById, unsavePostById } from "@/entities/posts/service";
import { ensureUserIsLoggedIn } from "@/entities/users/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/types/auth/Session";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing post ID." });
  }

  switch (method) {
    case "PUT":
      return savePostHandler(req, res, id);
    case "DELETE":
      return unsavePostHandler(req, res, id);
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function savePostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  try {
    const saveData = await savePostById(id, user.id!);
    return res.status(200).json({ item: saveData });
  } catch (error) {
    if (error instanceof Error && error.message.includes("UNIQUE")) {
      return res.status(409).json({ message: "Already saved" });
    }
    throw error;
  }
}

export async function unsavePostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  const unsaveData = await unsavePostById(id, user.id!);
  return res.status(200).json({ item: unsaveData });
}

export default withGlobalErrorHandler(handler);
