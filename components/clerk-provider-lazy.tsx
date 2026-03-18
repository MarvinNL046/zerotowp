"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

/**
 * Conditionally wraps children with ClerkProvider only on admin/auth routes.
 * This prevents Clerk's ~200KB+ JS bundle from loading on public pages,
 * keeping the mobile PageSpeed score at 99.
 */
export function ClerkProviderLazy({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const needsClerk =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up");

  if (needsClerk) {
    return (
      <ClerkProvider afterSignOutUrl="/" signInFallbackRedirectUrl="/admin">
        {children}
      </ClerkProvider>
    );
  }

  return <>{children}</>;
}
