import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { created_at, updated_at } from "@/db/schema/helpers/timestamp.helpers";
import { v4 as uuid } from "uuid";
import { relations } from "drizzle-orm";
import { posts } from "@/db/schema/posts";
import { postsSaves } from "@/db/schema/posts_saves";
import { postsLikes } from "@/db/schema/posts_likes";
import { usersFollows } from "@/db/schema/users_follows";

export const users = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(uuid),
  email: text().unique().notNull(),
  emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
  nickname: text().unique().notNull().$defaultFn(uuid), // TODO: fallback if oauth reg
  password: text(),
  name: text().notNull().default(""),
  image: text("image"),

  ...created_at,
  ...updated_at,
});

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts, { relationName: "owner" }),
  liked_posts: many(postsLikes),
  saved_posts: many(postsSaves),
  followedBy: many(usersFollows, { relationName: "followedBy" }),
  following: many(usersFollows, { relationName: "following" }),
}));
