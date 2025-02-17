import { sqliteTable, primaryKey, text } from "drizzle-orm/sqlite-core";
import { users } from "@/db/schema/users";
import { relations } from "drizzle-orm";
import { created_at } from "@/db/schema/helpers/timestamp.helpers";

export const usersFollows = sqliteTable(
  "users_follows",
  {
    followed_by_id: text("followed_by_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    following_id: text("following_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    ...created_at,
  },
  (t) => [primaryKey({ columns: [t.followed_by_id, t.following_id] })],
);

export const followRelations = relations(usersFollows, ({ one }) => ({
  followedBy: one(users, {
    fields: [usersFollows.followed_by_id],
    references: [users.id],
  }),
  following: one(users, {
    fields: [usersFollows.following_id],
    references: [users.id],
  }),
}));
