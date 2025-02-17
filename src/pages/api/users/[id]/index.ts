import type { NextApiRequest, NextApiResponse } from "next";
import { getPublicUserProfileById } from "@/entities/users/service";
import { withGlobalErrorHandler } from "@/shared/utils/globalErrorHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id } = query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid or missing user ID." });
  }

  switch (method) {
    case "GET":
      return getUserHandler(id, res);
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function getUserHandler(id: string, res: NextApiResponse) {
  const data = await getPublicUserProfileById(id);
  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ item: data });
}

export default withGlobalErrorHandler(handler);
