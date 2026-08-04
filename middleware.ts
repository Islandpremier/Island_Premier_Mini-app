import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

if (
  req.nextUrl.pathname === "/admin" ||
  req.nextUrl.pathname.startsWith("/api/admin/login") ||
  req.nextUrl.pathname.startsWith("/api/admin/verify")
) {
  return NextResponse.next();
}

  const session = req.cookies.get("admin-session");

  if (session?.value !== "logged") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
}; 