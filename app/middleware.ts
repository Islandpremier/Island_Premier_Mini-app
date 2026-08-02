import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (!req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (
    req.nextUrl.pathname === "/admin/login" ||
    req.nextUrl.pathname === "/admin/verify"
  ) {
    return NextResponse.next();
  }

  const session = req.cookies.get("admin-session");

  if (session?.value !== "logged") {
    return NextResponse.redirect(
      new URL("/admin/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};