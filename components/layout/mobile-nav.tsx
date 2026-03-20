"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Rocket,
  Newspaper,
  BookOpen,
  Server,
  Plug,
  Palette,
  Search,
  Zap,
  Shield,
  BookText,
  Star,
  Wrench,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

const TOP_LINKS = [
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

const WORDPRESS_LINKS = [
  { label: "Hosting", href: "/wordpress-hosting", icon: Server },
  { label: "Plugins", href: "/wordpress-plugins", icon: Plug },
  { label: "Themes", href: "/wordpress-themes", icon: Palette },
  { label: "SEO", href: "/wordpress-seo", icon: Search },
  { label: "Speed", href: "/wordpress-speed", icon: Zap },
  { label: "Security", href: "/wordpress-security", icon: Shield },
];

const RESOURCES_LINKS = [
  { label: "Tutorials", href: "/tutorials", icon: GraduationCap },
  { label: "Glossary", href: "/glossary", icon: BookText },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "Tools", href: "/tools", icon: Wrench },
];

function MobileNavSection({
  title,
  links,
  pathname,
  defaultOpen = false,
}: {
  title: string;
  links: { label: string; href: string; icon: React.ComponentType<{ size?: number; className?: string }> }[];
  pathname: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-400"
      >
        {title}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="flex flex-col gap-0.5 px-1">
          {links.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] font-medium transition-all active:scale-[0.98] ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-orange-500" : "text-slate-400"}
                />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  const overlay = (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 z-[70] h-dvh w-[280px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${
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
        <nav className="flex flex-col gap-2 px-2 py-4 flex-1 overflow-y-auto">
          {/* Start Here CTA */}
          <Link
            href="/start-here"
            className="flex items-center gap-3 rounded-xl bg-[#f97316] mx-1 px-4 py-3 text-[15px] font-semibold text-white hover:bg-orange-500 active:scale-[0.98] transition-all mb-1"
          >
            <Rocket size={18} />
            Start Here
          </Link>

          {/* Top links */}
          <div className="flex flex-col gap-0.5 px-1">
            {TOP_LINKS.map(({ label, href, icon: Icon }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] font-medium transition-all active:scale-[0.98] ${
                    isActive
                      ? "bg-orange-50 text-orange-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    size={18}
                    className={
                      isActive ? "text-orange-500" : "text-slate-400"
                    }
                  />
                  {label}
                </Link>
              );
            })}
          </div>

          {/* WordPress section */}
          <MobileNavSection
            title="WordPress"
            links={WORDPRESS_LINKS}
            pathname={pathname}
            defaultOpen
          />

          {/* Resources section */}
          <MobileNavSection
            title="Resources"
            links={RESOURCES_LINKS}
            pathname={pathname}
          />
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

  return (
    <>
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={() => setOpen(true)}
        className="lg:hidden flex items-center justify-center rounded-lg p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all"
      >
        <Menu size={22} />
      </button>

      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
