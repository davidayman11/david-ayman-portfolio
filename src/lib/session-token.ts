import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "portfolio_admin";

function secretKey() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) return null;
  return new TextEncoder().encode(value);
}

export function authConfigured() {
  return secretKey() !== null;
}

export async function signAdminToken(adminId: string) {
  const key = secretKey();
  if (!key) {
    throw new Error("AUTH_SECRET is not configured.");
  }

  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(adminId)
    .setIssuer("david-portfolio")
    .setAudience("admin")
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(key);
}

export async function readAdminToken(token: string) {
  const key = secretKey();
  if (!key) return null;

  try {
    const { payload } = await jwtVerify(token, key, {
      issuer: "david-portfolio",
      audience: "admin",
    });
    if (!payload.sub) return null;
    return { adminId: payload.sub };
  } catch {
    return null;
  }
}
