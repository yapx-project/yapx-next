import {sqliteTable, integer, primaryKey} from "drizzle-orm/sqlite-core"
import {users} from "@/db/schema/users";
import {relations} from "drizzle-orm";
import {created_at} from "@/db/schema/helpers/timestamp.helpers";
import {posts} from "@/db/schema/posts";

export const saves = sqliteTable(
    'saves',
    {
        user_id: integer('user_id')
            .notNull()
            .references(
                () => users.id,
                {onDelete: 'cascade'}
            ),
        post_id: integer('post_id')
            .notNull()
            .references(
                () => posts.id,
                {onDelete: 'cascade'}
            ),
        ...created_at
    },
    (t) => ({
        pk: primaryKey({columns: [t.user_id, t.post_id]}),
    }),
);

export const likesRelations = relations(saves, ({one}) => ({
    user: one(users, {
        fields: [saves.user_id],
        references: [users.id],
    }),
    post: one(posts, {
        fields: [saves.post_id],
        references: [posts.id],
    }),
}));
