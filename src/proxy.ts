import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, readAdminToken } from "@/lib/session-token";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = token ? await readAdminToken(token) : null;
  const isLogin = pathname === "/admin/login";

  if (isLogin && session) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!isLogin && !session) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
