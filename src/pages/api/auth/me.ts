import type { NextApiResponse } from "next";
import { ValidationExceptionDto } from "@/types/exceptions/validation-exception";
import { ApiExceptionDto } from "@/types/exceptions/api-exception";
import { AuthNextApiRequest, needAuth } from "@/middleware/backend/auth";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { UserResponse } from "@/types/users/user-response";

async function handler(
  req: AuthNextApiRequest,
  res: NextApiResponse<UserResponse | ValidationExceptionDto | ApiExceptionDto>,
) {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Необходима авторизация" });
  }

  const user = await db.select().from(users).where(eq(users.id, userId)).get();

  if (!user) {
    return res.status(401).json({ error: "Необходима авторизация" });
  }

  return res.status(200).json({
    id: user.id,
    email: user.email,
    nickname: user.nickname,
    full_name: user.full_name,
  });
}

export default needAuth(handler);
