import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export function withGlobalErrorHandler(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "UNAUTHORIZED") {
          return res.status(401).json({ message: "You must be logged in." });
        }
        if (error.message === "FORBIDDEN") {
          return res.status(403).json({ message: "Permission denied." });
        }
        if (error instanceof z.ZodError) {
          return res
            .status(400)
            .json({ error: "Validation error", validation: error.errors });
        }
      }

      console.error("Unhandled error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
