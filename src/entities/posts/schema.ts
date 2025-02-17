import { z } from "zod";

const createPostSchema = z.object({
  text: z.string().min(1, "Минимальная длина поста 1 символ"),
  reply_to_post_id: z.optional(z.string().uuid()),
});

export type CreatePost = z.infer<typeof createPostSchema>;

const updatePostSchema = z.object({
  text: z.string().min(1, "Минимальная длина поста 1 символ"),
});

export type UpdatePost = z.infer<typeof updatePostSchema>;

export { createPostSchema, updatePostSchema };
