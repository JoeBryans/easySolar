import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // If the user is authenticated, continue
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define the routes that require authentication
  const protectedRoutes = ["/dashboard(*)"]; // Example protected routes

  const isProtectedRoute = protectedRoutes.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute) {
    if (!session) {
      // Redirect to the sign-in page if not authenticated
      // const signInUrl = `/auth/signin?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
      const signInUrl = `/signIn?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
      return NextResponse.redirect(new URL(signInUrl, req.url));
    }
    // If authenticated, allow access
    return NextResponse.next();
  }

  // If it's not a protected route, allow access
  return NextResponse.next();
}

// Optionally, configure the matcher to specify which paths this middleware should run for.
// Without a matcher, it will run on every route.
// export const config = {
//   matcher: [], // Apply middleware to these paths
// };

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/dashboard/:path*",
  ],
};
