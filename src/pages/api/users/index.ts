import type { NextApiRequest, NextApiResponse } from "next";
import { parseQueryParamAsNumber } from "@/shared/utils/params";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";
import { findPublicUserProfiles } from "@/entities/users/service";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      return getUsersHandler(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function getUsersHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const limit = parseQueryParamAsNumber(req.query.limit);
  const offset = parseQueryParamAsNumber(req.query.offset);
  const posts = await findPublicUserProfiles(limit, offset);
  return res.status(200).json({ items: posts });
}

export default withGlobalErrorHandler(handler);
