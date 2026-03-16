"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Start Here", href: "/start-here", highlight: true },
  { label: "Hosting", href: "/wordpress-hosting" },
  { label: "Plugins", href: "/wordpress-plugins" },
  { label: "Themes", href: "/wordpress-themes" },
  { label: "SEO", href: "/wordpress-seo" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Glossary", href: "/glossary" },
  { label: "Reviews", href: "/reviews" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center rounded-lg p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* Overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-rocket.svg" alt="ZeroToWP" className="h-9" />
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {NAV_LINKS.map(({ label, href, highlight }) =>
            highlight ? (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-xl bg-[#f97316] px-4 py-3 text-base font-semibold text-white hover:bg-orange-500 transition-colors mb-2"
              >
                {label}
              </Link>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Footer note */}
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 leading-relaxed">
            Free WordPress tutorials for beginners.
          </p>
        </div>
      </div>
    </>
  );
}
