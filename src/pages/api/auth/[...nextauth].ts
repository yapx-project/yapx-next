import NextAuth, { SessionStrategy } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts } from "@/db/schema/accounts";

export const authOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
  }),
  pages: {
    signIn: "/auth/signin",
  },
  session: { strategy: "jwt" as SessionStrategy },
  skipCSRFCheck: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!(credentials || credentials!.email || credentials!.password)) {
          return null;
        }

        const existingUser = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials!.email))
          .get();

        if (!(existingUser && existingUser!.password)) {
          return null;
        }

        const validPassword = await bcrypt.compare(
          credentials!.password,
          existingUser.password,
        );

        if (validPassword) {
          return {
            id: existingUser.id,
            email: existingUser.email,
            nickname: existingUser.nickname,
            name: existingUser.name,
            image: existingUser.image,
          };
        }

        return null;
      },
    }),
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
  ],
};

export default NextAuth(authOptions);
