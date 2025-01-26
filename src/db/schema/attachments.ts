import {integer, sqliteTable, text} from "drizzle-orm/sqlite-core"
import {created_at, updated_at} from "@/db/schema/helpers/timestamp.helpers";
import { v4 as uuid } from 'uuid';
import {posts} from "@/db/schema/posts";

export const attachments = sqliteTable('attachments', {
    id: text().primaryKey().$defaultFn(uuid),
    type: integer().notNull(),
    url: text(),

    post_id: text('post_id')
        .notNull()
        .references(
            () => posts.id,
            {onDelete: 'cascade'}
        ),

    ...created_at,
    ...updated_at
});
