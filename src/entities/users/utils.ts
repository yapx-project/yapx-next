import { Session } from "@/entities/posts/types/Session";

function ensureUserIsLoggedIn(session: Session | null | undefined) {
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  if (!session.user) {
    throw new Error("UNAUTHORIZED");
  }
  if (!session.user.id) {
    throw new Error("UNAUTHORIZED");
  }
  return session.user;
}

export { ensureUserIsLoggedIn };
