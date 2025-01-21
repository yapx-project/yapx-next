import {sqliteTable, integer, text} from "drizzle-orm/sqlite-core"
import {created_at, updated_at} from "@/db/schema/helpers/timestamp.helpers";
import {relations} from "drizzle-orm";
import {follows} from "@/db/schema/follows";
import {posts} from "@/db/schema/posts";
import {likes} from "@/db/schema/likes";
import {saves} from "@/db/schema/saves";

export const users = sqliteTable('users', {
    id: integer().primaryKey(),
    email: text().unique().notNull(),
    nickname: text().unique().notNull(),
    password: text(), // null если зарегался через oauth
    first_name: text(),
    last_name: text(),

    ...created_at,
    ...updated_at
});

export const usersRelations = relations(users, ({many}) => ({
    followedBy: many(follows, {relationName: 'followedBy'}),
    following: many(follows, {relationName: 'following'}),
    posts: many(posts, {relationName: 'owner'}),
    liked_posts: many(likes),
    saved_posts: many(saves),
}));