import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const protectedRoutes = ["/start-a-campaigning", "/dashboard*"]; // add other protected routes as needed

export const middleware = async (req: NextRequest) => {
  const session = await auth();
  const { nextUrl } = req;
  const isLoggedIn = !!session;

  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isProtectedRoute && !isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)']
};