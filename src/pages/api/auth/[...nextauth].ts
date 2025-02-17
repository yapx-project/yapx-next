import NextAuth, { SessionStrategy, User } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema/users";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts } from "@/db/schema/accounts";
import { JWT } from "next-auth/jwt";
import { Session } from "@/types/auth/Session";
import { findUserByEmail } from "@/entities/users/service";

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
  callbacks: {
    session: async ({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    // jwt: async ({ user, token }: { user: User; token: JWT }) => {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },
  },
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

        const existingUser = await findUserByEmail(credentials!.email);

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
