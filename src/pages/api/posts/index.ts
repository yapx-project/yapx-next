import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/types/auth/Session";
import { createPostSchema } from "@/entities/posts/schema";
import { createPost, findPosts } from "@/entities/posts/service";
import { parseQueryParamAsNumber } from "@/shared/utils/params";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";
import { ensureUserIsLoggedIn } from "@/entities/users/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getPostsHandler(req, res);
    case "POST":
      return createPostHandler(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function getPostsHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const limit = parseQueryParamAsNumber(req.query.limit);
  const offset = parseQueryParamAsNumber(req.query.offset);
  const posts = await findPosts(limit, offset);
  return res.status(200).json({ items: posts });
}

export async function createPostHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const user = ensureUserIsLoggedIn(
    (await getServerSession(req, res, authOptions)) as Session,
  );

  try {
    const data = createPostSchema.parse(req.body);

    const result = await createPost(data, user.id!);

    return res.status(200).json({ item: result });
  } catch (error) {
    throw error;
  }
}

export default withGlobalErrorHandler(handler);
