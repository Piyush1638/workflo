import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isPublicPath = pathName === "/sign-in" || pathName === "/sign-up" || pathName === "/verifyemail";
  const token = request.cookies.get('token')?.value;

  // Redirect to sign-in if trying to access a protected route without a token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // Redirect to home if accessing public path while authenticated
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ["/sign-in", "/sign-up", "/", "/verifyemail"],
};
