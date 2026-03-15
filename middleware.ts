import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const ALLOWED_ADMIN_EMAILS = ["info@staycoolairco.nl"];

export default clerkMiddleware(async (auth, req) => {
  // Auth routes are always accessible
  if (isAuthRoute(req)) return NextResponse.next();

  // Admin routes require authentication + email check
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    // Not logged in — redirect to sign-in
    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check if email is allowed
    const email =
      (sessionClaims?.email as string) ||
      (sessionClaims?.primaryEmail as string) ||
      "";

    if (!ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase())) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
