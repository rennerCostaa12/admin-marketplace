import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("@Marketplace:admin_token_user")?.value;

  if (token) {
    const decodedToken = jwt.decode(token) as { exp: number };
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      request.cookies.delete("@Marketplace:admin_token_user");
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    const urlLogin = new URL("/login", request.url);

    return NextResponse.redirect(urlLogin);
  }

  if (request.nextUrl.pathname.includes("login") && token) {
    const urlLogin = new URL("/admin/dashboard", request.url);
    return NextResponse.redirect(urlLogin);
  }
}

export const config = {
  matcher: [
    "/",
    "/admin/dashboard/:path*",
    "/admin/cadastrar-produtos/:path*",
    "/admin/listagem-de-produtos/:path*",
  ],
};
