import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/posts";
import { users } from "@/db/schema/users";
import { and, eq, or } from "drizzle-orm";
import { postsLikes } from "@/db/schema/posts_likes";
import { postsSaves } from "@/db/schema/posts_saves";
import { usersFollows } from "@/db/schema/users_follows";
import { selectPost } from "@/entities/posts/service";

const selectPublicProfile = {
  id: users.id,
  nickname: users.nickname,
  name: users.name,
  image: users.image,
};

/* Auth */
async function findUserByEmail(email: string) {
  return db.select().from(users).where(eq(users.email, email)).get();
}

async function findUserByEmailOrNickname(email: string, nickname: string) {
  return db
    .select()
    .from(users)
    .where(or(eq(users.email, email), eq(users.nickname, nickname)))
    .get();
}

/* Users */

async function findPublicUserProfiles(limit: number = 25, offset: number = 0) {
  return db.select(selectPublicProfile).from(users).limit(limit).offset(offset);
}

async function getPublicUserProfileById(id: string) {
  return db
    .select(selectPublicProfile)
    .from(users)
    .where(eq(users.id, id))
    .get();
}

async function findLikedPosts(
  user_id: string,
  limit: number = 25,
  offset: number = 0,
) {
  return db
    .select(selectPost)
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
    .select(selectPost)
    .from(posts)
    .leftJoin(postsSaves, eq(postsSaves.post_id, posts.id))
    .leftJoin(users, eq(posts.owner_id, users.id))
    .where(eq(postsSaves.user_id, user_id))
    .limit(limit)
    .offset(offset);
}

async function followUserById(following_id: string, user_id: string) {
  return db
    .insert(usersFollows)
    .values({
      followed_by_id: user_id,
      following_id: following_id,
    })
    .returning();
}

async function unfollowUserById(following_id: string, user_id: string) {
  return db
    .delete(usersFollows)
    .where(
      and(
        eq(usersFollows.followed_by_id, user_id),
        eq(usersFollows.following_id, following_id),
      ),
    )
    .returning();
}

async function findFollowersUsers(
  user_id: string,
  limit: number = 25,
  offset: number = 0,
) {
  return db
    .select(selectPublicProfile)
    .from(users)
    .leftJoin(usersFollows, eq(usersFollows.following_id, users.id))
    .where(eq(usersFollows.following_id, user_id))
    .limit(limit)
    .offset(offset);
}

async function findFollowingUsers(
  user_id: string,
  limit: number = 25,
  offset: number = 0,
) {
  return db
    .select(selectPublicProfile)
    .from(users)
    .leftJoin(usersFollows, eq(usersFollows.followed_by_id, users.id))
    .where(eq(usersFollows.followed_by_id, user_id))
    .limit(limit)
    .offset(offset);
}

export {
  selectPublicProfile,
  findUserByEmail,
  findUserByEmailOrNickname,
  findPublicUserProfiles,
  getPublicUserProfileById,
  findLikedPosts,
  findSavedPosts,
  followUserById,
  unfollowUserById,
  findFollowersUsers,
  findFollowingUsers,
};
