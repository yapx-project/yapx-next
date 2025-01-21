import {integer} from "drizzle-orm/sqlite-core";
import {sql} from "drizzle-orm";

const created_at = {
    created_at: integer('created_at', {mode: 'timestamp'})
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`)
}

const updated_at = {
    updated_at: integer('updated_at', {mode: 'timestamp'})
        .notNull()
        .default(sql`(CURRENT_TIMESTAMP)`) // ?
        .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
}

export {created_at, updated_at}