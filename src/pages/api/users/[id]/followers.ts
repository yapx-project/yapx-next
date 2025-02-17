import type { NextApiRequest, NextApiResponse } from "next";
import { findFollowersUsers } from "@/entities/users/service";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";
import { parseQueryParamAsNumber } from "@/shared/utils/params";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing user ID." });
  }

  switch (method) {
    case "GET":
      return getFollowersUsersHandler(req, res, id);
    default:
      res.setHeader("Allow", ["GET"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function getFollowersUsersHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  user_id: string,
) {
  const limit = parseQueryParamAsNumber(req.query.limit);
  const offset = parseQueryParamAsNumber(req.query.offset);
  const postData = await findFollowersUsers(user_id, limit, offset);
  return res.status(200).json({ item: postData });
}

export default withGlobalErrorHandler(handler);
