import {index, sqliteTable, text} from "drizzle-orm/sqlite-core"
import {posts} from "@/db/schema/posts";
import {v4 as uuid} from "uuid";

export const tags = sqliteTable('tags', {
    id: text().primaryKey().$defaultFn(uuid),
    post_id: text('post_id')
        .notNull()
        .references(
            () => posts.id,
            {onDelete: 'cascade'}
        ),
    tag: text().notNull(),
}, (t) => {
    return {
        tagIdx: index("tag_idx").on(t.tag),
    }
});
