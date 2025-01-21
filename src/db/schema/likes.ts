import {sqliteTable, integer, primaryKey} from "drizzle-orm/sqlite-core"
import {users} from "@/db/schema/users";
import {relations} from "drizzle-orm";
import {posts} from "@/db/schema/posts";

export const likes = sqliteTable(
    'likes',
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
    },
    (t) => ({
        pk: primaryKey({columns: [t.user_id, t.post_id]}),
    }),
);

export const likesRelations = relations(likes, ({one}) => ({
    user: one(users, {
        fields: [likes.user_id],
        references: [users.id],
    }),
    post: one(posts, {
        fields: [likes.post_id],
        references: [posts.id],
    }),
}));
