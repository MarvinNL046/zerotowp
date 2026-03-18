import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isAuthRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

const ALLOWED_ADMIN_EMAILS = ["info@staycoolairco.nl"];

export default clerkMiddleware(async (auth, req) => {
  if (isAuthRoute(req)) return NextResponse.next();

  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      const signInUrl = new URL("/sign-in", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }

    // Check email from multiple possible claim locations
    const email =
      (sessionClaims?.email as string) ||
      (sessionClaims?.primaryEmail as string) ||
      (sessionClaims?.emailAddress as string) ||
      ((sessionClaims?.emailAddresses as string[] | undefined)?.[0]) ||
      "";

    if (email && !ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase())) {
      return new NextResponse("Forbidden — access restricted", { status: 403 });
    }

    // If no email found in claims, allow through — the admin layout
    // does its own server-side check via currentUser()
    if (!email) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
