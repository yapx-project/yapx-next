import { sqliteTable, primaryKey, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import { created_at } from "@/db/schema/helpers/timestamp.helpers";
import { posts } from "@/db/schema/posts";

export const postsSaves = sqliteTable(
  "posts_saves",
  {
    user_id: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    post_id: text("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    ...created_at,
  },
  (t) => [primaryKey({ columns: [t.user_id, t.post_id] })],
);

export const postsSavesRelations = relations(postsSaves, ({ one }) => ({
  user: one(users, {
    fields: [postsSaves.user_id],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [postsSaves.post_id],
    references: [posts.id],
  }),
}));
