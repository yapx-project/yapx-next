import type { NextApiRequest, NextApiResponse } from "next";
import { ApiExceptionDto } from "@/types/exceptions/api-exception";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ValidationExceptionDto } from "@/types/exceptions/validation-exception";
import JWT_SECRET from "@/consts/jwt";
import { SigninResponse } from "@/types/auth/SigninResponse";

const loginSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    SigninResponse | ValidationExceptionDto | ApiExceptionDto
  >,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = loginSchema.parse(req.body);

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .get();

    if (!existingUser) {
      return res.status(404).json({
        error: "Неправильные почта или пароль",
      });
    }

    // если пароля нет, значит регался через oauth
    if (!existingUser.password) {
      return res.status(404).json({
        error: "Используйте метод входа используемый при регистрации",
      });
    }

    const validPassword = await bcrypt.compare(
      data.password,
      existingUser.password,
    );

    if (!validPassword) {
      return res.status(404).json({
        error: "Неправильные почта или пароль",
      });
    } else {
      const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(201).json({ token: token });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Ошибка валидации", validation: error.errors });
    }

    return res.status(500).json({ error: "Server error" });
  }
}
