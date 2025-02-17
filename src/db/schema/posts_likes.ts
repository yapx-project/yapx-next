import { sqliteTable, primaryKey, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import { posts } from "@/db/schema/posts";

export const postsLikes = sqliteTable(
  "posts_likes",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    post_id: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.user_id, t.post_id] })],
);

export const postsLikesRelations = relations(postsLikes, ({ one }) => ({
  user: one(users, {
    fields: [postsLikes.user_id],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [postsLikes.post_id],
    references: [posts.id],
  }),
}));
