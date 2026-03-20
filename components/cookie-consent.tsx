"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_personalization: "granted",
        ad_user_data: "granted",
      });
    }
  };

  const reject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setVisible(false);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_personalization: "denied",
        ad_user_data: "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-3xl rounded-lg border bg-white p-4 shadow-lg dark:bg-neutral-900 dark:border-neutral-800 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            We use cookies for analytics and advertising. By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
            <Link href="/cookie-policy" className="text-blue-600 underline underline-offset-2 hover:text-blue-500">
              Cookie Policy
            </Link>
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={reject}
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              Reject
            </button>
            <button
              onClick={accept}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
