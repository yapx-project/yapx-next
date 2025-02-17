import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/posts";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema/users";
import { CreatePost, UpdatePost } from "@/entities/posts/schema";

async function findPosts(limit: number = 25, offset: number = 0) {
  return db
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
    .leftJoin(users, eq(posts.owner_id, users.id))
    .limit(limit)
    .offset(offset);
}

async function findPostById(id: string) {
  return db.select().from(posts).where(eq(posts.id, id)).get() || null;
}

async function getPostById(id: string) {
  return db
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
}

async function createPost(post: CreatePost, userId: string) {
  const insertResult = await db
    .insert(posts)
    .values({
      owner_id: userId,
      text: post.text,
      reply_to_post_id: post.reply_to_post_id, // TODO: check?
    })
    .returning({ id: posts.id });
  return getPostById(insertResult[0].id);
}

async function updatePostById(id: string, post: UpdatePost) {
  return db
    .update(posts)
    .set({
      text: post.text,
    })
    .where(eq(posts.id, id))
    .returning();
}

async function deletePostById(id: string) {
  return db.delete(posts).where(eq(posts.id, id)).returning();
}

export {
  findPosts,
  findPostById,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
};
