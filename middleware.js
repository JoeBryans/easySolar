import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";

export async function middleware(req) {
  // const user =
  //   console.log("user", user);
  const user = true;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/signIn", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
    // Example: Only apply to specific paths (uncomment and adjust as needed)
    "/dashboard/:path*",
    // "/settings/:path*",
    // "/api/protected-route/:path*",
  ],
};
