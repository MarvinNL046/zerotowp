"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { type ReactNode, useState, useEffect } from "react";

/**
 * Conditionally renders ClerkProvider only on admin/auth routes.
 * Uses a mounted state to avoid SSR/client mismatch.
 * Public pages render children directly — zero Clerk JS overhead.
 */
export function ClerkProviderLazy({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, check pathname
  const needsClerk =
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/sign-in") ||
    pathname?.startsWith("/sign-up");

  // On admin/auth routes: always wrap with ClerkProvider
  if (needsClerk) {
    return (
      <ClerkProvider afterSignOutUrl="/" signInFallbackRedirectUrl="/admin">
        {children}
      </ClerkProvider>
    );
  }

  // On public routes: skip ClerkProvider entirely
  // Use a key to force remount if user navigates between public and admin
  return <>{children}</>;
}
