import { sqliteTable, text, foreignKey, index } from "drizzle-orm/sqlite-core";
import { created_at, updated_at } from "@/db/schema/helpers/timestamp.helpers";
import { relations } from "drizzle-orm";
import { users } from "@/db/schema/users";
import { v4 as uuid } from "uuid";
import { postsLikes } from "@/db/schema/posts_likes";
import { postsSaves } from "@/db/schema/posts_saves";

export const posts = sqliteTable(
  "posts",
  {
    id: text().primaryKey().$defaultFn(uuid),
    text: text(),

    owner_id: text("owner_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    reply_to_post_id: text("reply_to_post_id"),

    // counters
    // likes_count: integer().notNull().default(0),
    // repost_count: integer().notNull().default(0),

    ...created_at,
    ...updated_at,
  },
  (table) => [
    foreignKey({
      columns: [table.reply_to_post_id],
      foreignColumns: [table.id],
      name: "reply_to_post_id_fkey",
    }).onDelete("set null"),
    // index("likes_count_idx").on(table.likes_count),
    index("created_at_idx").on(table.created_at),
  ],
);

export const postsRelations = relations(posts, ({ one, many }) => ({
  owner: one(users, {
    fields: [posts.owner_id],
    references: [users.id],
  }),
  liked_by: many(postsLikes),
  added_to_favourite: many(postsSaves),
}));
