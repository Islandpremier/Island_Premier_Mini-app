import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  const session = cookieStore.get("admin-session");

  if (!session) {
    return NextResponse.json({
      logged: false,
    });
  }

  return NextResponse.json({
    logged: true,
  });
}