import {sqliteTable, integer, text} from "drizzle-orm/sqlite-core"
import {created_at, updated_at} from "@/db/schema/helpers/timestamp.helpers";
import {relations} from "drizzle-orm";
import {users} from "@/db/schema/users";
import {likes} from "@/db/schema/likes";
import {saves} from "@/db/schema/saves";

export const posts = sqliteTable('posts', {
    id: integer().primaryKey(),
    text: text(),

    owner_id: integer('owner_id')
        .references(
            () => users.id,
            {onDelete: 'cascade'}
        ),
    // счетчики для оптимизации
    likes_count: integer().default(0),
    repost_count: integer().default(0),

    ...created_at,
    ...updated_at
});

export const postsRelations = relations(posts, ({one, many}) => ({
    owner: one(users, {
        fields: [posts.owner_id],
        references: [users.id],
    }),
    liked_by: many(likes),
    added_to_favourite: many(saves),
}));