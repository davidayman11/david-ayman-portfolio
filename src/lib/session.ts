import { cookies } from "next/headers";
import { ADMIN_COOKIE, readAdminToken, signAdminToken } from "@/lib/session-token";

const MAX_AGE = 60 * 60 * 12;

export async function getSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return readAdminToken(token);
}

export async function setSession(adminId: string) {
  const token = await signAdminToken(adminId);
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}
