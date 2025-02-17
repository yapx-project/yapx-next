import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/posts";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/types/auth/Session";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return get(req, res);
    case "PATCH":
      return patch(req, res);
    case "DELETE":
      return del(req, res);
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(404).json({ message: "Wrong post id" });
  }

  const postData = await db
    .select({
      id: posts.id,
      text: posts.text,
      owner_id: posts.owner_id,
      reply_to_post_id: posts.reply_to_post_id,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      owner: {
        id: users.id,
        nickname: users.nickname,
        name: users.name,
        image: users.image,
      },
    })
    .from(posts)
    .where(eq(posts.id, id))
    .leftJoin(users, eq(posts.owner_id, users.id))
    .get();
  if (!postData) {
    return res.status(404).json({ message: "Post not found" });
  }
  return res.status(200).json({ item: postData });
}

const postSchema = z.object({
  text: z.string().min(1, "Минимальная длина поста 1 символ"),
});

export async function patch(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as Session;
  if (!(session && session.user)) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(404).json({ message: "Wrong post id" });
  }

  const postData = await db.select().from(posts).where(eq(posts.id, id)).get();
  if (!postData) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (postData.owner_id !== session.user.id) {
    return res.status(401).json({ message: "Permission error" });
  }

  try {
    const data = postSchema.parse(req.body);

    const result = await db
      .update(posts)
      .set({
        text: data.text,
      })
      .where(eq(posts.id, id))
      .returning();

    return res.status(200).json({ item: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Ошибка валидации", validation: error.errors });
    }
  }
}

export async function del(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as Session;
  if (!(session && session.user)) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  const id = req.query.id;
  if (typeof id !== "string") {
    return res.status(404).json({ message: "Wrong post id" });
  }

  const postData = await db.select().from(posts).where(eq(posts.id, id)).get();
  if (!postData) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (postData.owner_id !== session.user.id) {
    return res.status(401).json({ message: "Permission error" });
  }

  try {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();

    return res.status(200).json({ item: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ error: "Ошибка валидации", validation: error.errors });
    }
    return res.status(500).json({ error: "Server error" });
  }
}
