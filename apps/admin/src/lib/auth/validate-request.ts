import { cache } from "react";
import { cookies } from "next/headers";
import type { Session, User } from "lucia";
import { lucia } from "@acme/auth";

export const uncachedValidateRequest = async (): Promise<
  { session: Session  } | { session: null; }
> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return { session: null };
  }
  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch {
    console.error("Failed to set session cookie");
  }
  return result; 
};

export const validateRequest = cache(uncachedValidateRequest);
