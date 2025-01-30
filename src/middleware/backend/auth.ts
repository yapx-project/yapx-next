import { NextApiRequest, NextApiResponse } from "next";
import JWT_SECRET from "@/consts/jwt";
import { verify } from "jsonwebtoken";

export interface AuthNextApiRequest extends NextApiRequest {
  userId?: string;
}

type Handler = (
  req: AuthNextApiRequest,
  res: NextApiResponse,
) => Promise<void> | void;

export function needAuth(handler: Handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Необходима авторизация" });
      }

      const token = authHeader.replace("Bearer ", "");

      if (!token) {
        return res.status(401).json({ error: "Необходима авторизация" });
      }

      const decoded = verify(token, JWT_SECRET) as {
        id: string;
      };

      const customReq = req as AuthNextApiRequest;
      customReq.userId = decoded.id;
      return handler(customReq, res);
    } catch {
      return res.status(401).json({ error: "Server error" });
    }
  };
}
