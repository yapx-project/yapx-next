import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/types/auth/Session";
import { updatePostSchema } from "@/entities/posts/schema";
import {
  deletePostById,
  findPostById,
  getPostById,
  updatePostById,
} from "@/entities/posts/service";
import { ensureUserIsLoggedIn } from "@/entities/users/utils";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing post ID." });
  }

  switch (method) {
    case "GET":
      return getPostHandler(id, res);
    case "PATCH":
      return updatePostHandler(req, res, id);
    case "DELETE":
      return deletePostHandler(req, res, id);
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function getPostHandler(id: string, res: NextApiResponse) {
  const postData = await getPostById(id);
  if (!postData) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.status(200).json({ item: postData });
}

export async function updatePostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  const postData = await findPostById(id);
  if (!postData) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (postData.owner_id !== user.id) {
    throw new Error("FORBIDDEN");
  }

  try {
    const data = updatePostSchema.parse(req.body);

    const updatedPost = await updatePostById(id, data);

    return res.status(200).json({ item: updatedPost });
  } catch (error) {
    throw error;
  }
}

export async function deletePostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  const postData = await findPostById(id);
  if (!postData) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (postData.owner_id !== user.id) {
    throw new Error("FORBIDDEN");
  }

  try {
    const deletedPost = await deletePostById(id);

    return res.status(200).json({ item: deletedPost });
  } catch (error) {
    throw error;
  }
}

export default withGlobalErrorHandler(handler);
