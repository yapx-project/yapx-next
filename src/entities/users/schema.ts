import { z } from "zod";

const registerUserSchema = z.object({
  email: z.string().email("Некорректный email"),
  nickname: z
    .string()
    .min(3, "Минимальная длинна имени пользователя 3 символа"),
  password: z.string().min(6, "Минимальная длина пароля 6 символов"),
  name: z.string().min(1, "Имя не может быть пустым"),
});

export { registerUserSchema };
