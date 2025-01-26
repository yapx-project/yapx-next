import {sqliteTable, integer, text, foreignKey, index} from "drizzle-orm/sqlite-core"
import {created_at, updated_at} from "@/db/schema/helpers/timestamp.helpers";
import {relations} from "drizzle-orm";
import {users} from "@/db/schema/users";
import {likes} from "@/db/schema/likes";
import {saves} from "@/db/schema/saves";
import {attachments} from "@/db/schema/attachments";
import {v4 as uuid} from "uuid";
import {tags} from "@/db/schema/tags";

export const posts = sqliteTable('posts', {
    id: text().primaryKey().$defaultFn(uuid),
    text: text(),

    owner_id: text('owner_id')
        .notNull()
        .references(
            () => users.id,
            {onDelete: 'cascade'}
        ),
    reply_post_id: text('reply_post_id'),
    // счетчики для оптимизации
    likes_count: integer()
        .notNull()
        .default(0),
    repost_count: integer()
        .notNull()
        .default(0),

    ...created_at,
    ...updated_at
}, (table) => {
    return {
        parentReference: foreignKey({
            columns: [table.reply_post_id],
            foreignColumns: [table.id],
            name: "reply_post_id_fkey",
        }).onDelete('set null'), // TODO: уточнить
        // индексы для сортировок
        likesCountIdx: index("likes_count_idx").on(table.likes_count),
        CreatedAtIdx: index("created_at_idx").on(table.created_at),
    };
});

export const postsRelations = relations(posts, ({one, many}) => ({
    owner: one(users, {
        fields: [posts.owner_id],
        references: [users.id],
    }),
    liked_by: many(likes),
    added_to_favourite: many(saves),
    attachments: many(attachments),
    tags: many(tags),
}));
