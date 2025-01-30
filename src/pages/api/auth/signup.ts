import type { NextApiRequest, NextApiResponse } from "next";
import { ApiExceptionDto } from "@/types/exceptions/api-exception";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { ValidationExceptionDto } from "@/types/exceptions/validation-exception";
import { SignupResponse } from "@/types/auth/SignupResponse";

const registerSchema = z.object({
  email: z.string().email("Некорректный email"),
  nickname: z
    .string()
    .min(3, "Минимальная длинна имени пользователя 3 символа"),
  password: z.string().min(6, "Минимальная длина пароля 6 символов"),
  full_name: z.string().min(1, "Имя не может быть пустым"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    SignupResponse | ValidationExceptionDto | ApiExceptionDto
  >,
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = registerSchema.parse(req.body);

    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.email, data.email), eq(users.nickname, data.nickname)))
      .get();

    if (existingUser) {
      return res.status(409).json({
        error: "Пользователь с таким email или nickname уже существует",
      });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await db
      .insert(users)
      .values({
        email: data.email,
        nickname: data.nickname,
        full_name: data.full_name,
        password: hashedPassword,
      })
      .run();

    return res.status(201).json({ message: "Пользователь создан" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Ошибка валидации", validation: error.errors });
    }

    return res.status(500).json({ error: "Server error" });
  }
}
