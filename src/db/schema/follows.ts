import {sqliteTable, primaryKey, text} from "drizzle-orm/sqlite-core"
import {users} from "@/db/schema/users";
import {relations} from "drizzle-orm";
import {created_at} from "@/db/schema/helpers/timestamp.helpers";

export const follows = sqliteTable(
    'follows',
    {
        followed_by_id: text('followed_by_id')
            .notNull()
            .references(
                () => users.id,
                {onDelete: 'cascade'}
            ),
        following_id: text('following_id')
            .notNull()
            .references(
                () => users.id,
                {onDelete: 'cascade'}
            ),
        ...created_at
    },
    (t) => ({
        pk: primaryKey({columns: [t.followed_by_id, t.following_id]}),
    }),
);

export const followRelations = relations(follows, ({one}) => ({
    followedBy: one(users, {
        fields: [follows.followed_by_id],
        references: [users.id],
    }),
    following: one(users, {
        fields: [follows.following_id],
        references: [users.id],
    }),
}));
