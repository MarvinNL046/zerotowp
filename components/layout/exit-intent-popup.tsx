"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { X } from "lucide-react";

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const subscribe = useMutation(api.subscribers.subscribe);

  const handleShow = useCallback(() => {
    const dismissed = sessionStorage.getItem("exit-popup-dismissed");
    const alreadySubscribed = localStorage.getItem("ztw-subscribed");
    if (dismissed || alreadySubscribed) return;
    setShow(true);
  }, []);

  useEffect(() => {
    // Desktop: mouse leaves viewport at top
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) handleShow();
    }

    // Mobile: back button / scroll up quickly (simplified: use timeout)
    let scrollTimer: ReturnType<typeof setTimeout>;
    let lastScroll = 0;
    function onScroll() {
      const current = window.scrollY;
      // User scrolled up fast after reading (at least 50% of page)
      if (
        current < lastScroll - 200 &&
        lastScroll > document.body.scrollHeight * 0.5
      ) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(handleShow, 500);
      }
      lastScroll = current;
    }

    // Delay attaching listeners so popup doesn't fire immediately
    const attachTimer = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
    }, 5000);

    return () => {
      clearTimeout(attachTimer);
      clearTimeout(scrollTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [handleShow]);

  function dismiss() {
    setShow(false);
    sessionStorage.setItem("exit-popup-dismissed", "1");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    try {
      await subscribe({ email: email.trim(), source: "exit-intent" });
      setStatus("success");
      localStorage.setItem("ztw-subscribed", "1");
    } catch {
      setStatus("idle");
    }
  }

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={dismiss}
      />

      {/* Popup */}
      <div className="fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
          {/* Close button */}
          <button
            onClick={dismiss}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            {status === "success" ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  You&apos;re in!
                </h3>
                <p className="text-slate-600 text-sm">
                  Check your inbox for WordPress tips that actually work.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Continue reading
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="inline-block text-3xl mb-2">⚡</span>
                  <h3 className="text-xl font-bold text-slate-900">
                    Wait — before you go!
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    Get my free WordPress cheat sheet + weekly tips that have
                    helped 1,000+ beginners build better sites.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl bg-[#f97316] px-4 py-3 text-sm font-semibold text-white hover:bg-orange-500 transition-colors disabled:opacity-60"
                  >
                    {status === "loading"
                      ? "Subscribing..."
                      : "Send Me the Cheat Sheet"}
                  </button>
                </form>

                <p className="text-xs text-slate-400 text-center mt-3">
                  No spam, ever. Unsubscribe in one click.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
