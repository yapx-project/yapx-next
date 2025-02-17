import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/posts";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Session } from "@/types/auth/Session";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      return get(req, res);
    case "POST":
      return create(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res
        .status(405)
        .json({ error: `Method ${req.method} Not Allowed` });
  }
}

export async function get(req: NextApiRequest, res: NextApiResponse) {
  const postsData = await db.select().from(posts).limit(25);
  return res.status(200).json({ items: postsData });
}

const postSchema = z.object({
  text: z.string().min(1, "Минимальная длина поста 1 символ"),
  reply_to_post_id: z.optional(z.string().uuid()),
});

export async function create(req: NextApiRequest, res: NextApiResponse) {
  const session = (await getServerSession(req, res, authOptions)) as Session;
  if (!(session && session.user)) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  try {
    const data = postSchema.parse(req.body);

    const result = await db
      .insert(posts)
      .values({
        owner_id: session.user.id!,
        text: data.text,
        reply_to_post_id: data.reply_to_post_id, // TODO: check?
      })
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
