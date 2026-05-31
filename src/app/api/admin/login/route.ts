import { NextRequest, NextResponse } from "next/server";
import { checkAdminCredentials } from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (checkAdminCredentials(email, password)) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_session", "authenticated", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}