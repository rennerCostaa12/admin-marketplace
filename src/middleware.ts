import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("@Marketplace:admin_token_user")?.value;

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    const urlLogin = new URL("/login", request.url);

    return NextResponse.redirect(urlLogin);
  }

  if (request.nextUrl.pathname.includes("login") && token) {
    const urlLogin = new URL("/dashboard", request.url);
    return NextResponse.redirect(urlLogin);
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
