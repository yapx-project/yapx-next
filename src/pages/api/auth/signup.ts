import type { NextApiRequest, NextApiResponse } from "next";
import { ApiExceptionDto } from "@/types/exceptions/api-exception";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import bcrypt from "bcryptjs";
import { ValidationExceptionDto } from "@/types/exceptions/validation-exception";
import { SignupResponse } from "@/types/auth/SignupResponse";
import { findUserByEmailOrNickname } from "@/entities/users/service";
import { registerUserSchema } from "@/entities/users/schema";

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
    const data = registerUserSchema.parse(req.body);

    const existingUser = await findUserByEmailOrNickname(
      data.email,
      data.nickname,
    );

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
        name: data.name,
        password: hashedPassword,
      })
      .run();

    return res.status(201).json({ message: "Пользователь создан" });
  } catch (error) {
    throw error;
  }
}
