import { DefaultSession } from "next-auth";

export interface Session extends DefaultSession {
  user?: {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}
