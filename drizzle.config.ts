import {defineConfig} from "drizzle-kit";

export default defineConfig({
    schema: './src/db/schema',
    out: './src/db',
    dialect: 'turso',
    dbCredentials: {
        url: process.env.TURSO_CONNECTION_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
    },
});
