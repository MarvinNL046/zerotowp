"use client";

import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const LEADS_API_URL = "https://beaming-ermine-172.convex.site";

interface NewsletterFormProps {
  source: string;
}

export default function NewsletterForm({ source }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(`${LEADS_API_URL}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site: "zerotowp", email: email.trim(), source }),
      });
      const data = await res.json();
      // 200 with status "subscribed" | "already_subscribed" | "resubscribed"
      if (!res.ok || !data.ok) throw new Error(data.error ?? "subscribe_failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  // Success micro-interaction
  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-sm text-green-400 font-medium">
        <CheckCircle className="h-4 w-4" />
        You&apos;re subscribed! Check your inbox.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#f97316] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-500 hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 transition-all duration-200"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Subscribing...
          </>
        ) : (
          "Subscribe"
        )}
      </button>
      {/* Error state — semantic red color */}
      {status === "error" && (
        <p className="text-xs text-red-400 font-medium">{errorMessage}</p>
      )}
    </form>
  );
}
