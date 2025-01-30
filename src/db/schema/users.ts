import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { created_at, updated_at } from "@/db/schema/helpers/timestamp.helpers";
import { v4 as uuid } from "uuid";

export const users = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(uuid),
  email: text().unique().notNull(),
  nickname: text().unique().notNull(),
  password: text(), // null если зарегался через oauth
  full_name: text().notNull().default(""),

  ...created_at,
  ...updated_at,
});
