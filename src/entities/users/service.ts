import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/posts";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { postsLikes } from "@/db/schema/posts_likes";
import { postsSaves } from "@/db/schema/posts_saves";

async function findLikedPosts(
  user_id: string,
  limit: number = 25,
  offset: number = 0,
) {
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
    .leftJoin(postsLikes, eq(postsLikes.post_id, posts.id))
    .leftJoin(users, eq(posts.owner_id, users.id))
    .where(eq(postsLikes.user_id, user_id))
    .limit(limit)
    .offset(offset);
}

async function findSavedPosts(
  user_id: string,
  limit: number = 25,
  offset: number = 0,
) {
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
    .leftJoin(postsSaves, eq(postsSaves.post_id, posts.id))
    .leftJoin(users, eq(posts.owner_id, users.id))
    .where(eq(postsSaves.user_id, user_id))
    .limit(limit)
    .offset(offset);
}

export { findLikedPosts, findSavedPosts };
