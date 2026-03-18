"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Rocket, Server, Plug, Palette, Search, BookOpen, BookText, Star, AlertTriangle } from "lucide-react";

const NAV_LINKS = [
  { label: "Start Here", href: "/start-here", icon: Rocket, highlight: true },
  { label: "Hosting", href: "/wordpress-hosting", icon: Server },
  { label: "Plugins", href: "/wordpress-plugins", icon: Plug },
  { label: "Themes", href: "/wordpress-themes", icon: Palette },
  { label: "SEO", href: "/wordpress-seo", icon: Search },
  { label: "Tutorials", href: "/tutorials", icon: BookOpen },
  { label: "Glossary", href: "/glossary", icon: BookText },
  { label: "Errors", href: "/wordpress-errors", icon: AlertTriangle },
  { label: "Reviews", href: "/reviews", icon: Star },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="md:hidden flex items-center justify-center rounded-lg p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all"
      >
        <Menu size={22} />
      </button>

      {/* Overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-rocket.svg" alt="ZeroToWP" className="h-8" />
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg p-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
          {NAV_LINKS.map(({ label, href, icon: Icon, highlight }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return highlight ? (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl bg-[#f97316] px-4 py-3 text-[15px] font-semibold text-white hover:bg-orange-500 active:scale-[0.98] transition-all mb-1"
              >
                <Icon size={18} />
                {label}
              </Link>
            ) : (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-all active:scale-[0.98] ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon size={18} className={isActive ? "text-orange-500" : "text-slate-400"} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-100 shrink-0">
          <p className="text-xs text-slate-400">
            Free WordPress tutorials for beginners.
          </p>
        </div>
      </div>
    </>
  );
}
