"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";

const TRENDING_SEARCHES = [
  { label: "Best WordPress Hosting", href: "/how-to-choose-wordpress-hosting" },
  { label: "Speed Up WordPress", href: "/speed-up-wordpress" },
  { label: "Best SEO Plugins", href: "/best-seo-plugins" },
  { label: "WordPress vs Wix", href: "/wordpress-vs-wix" },
  { label: "Start a Blog", href: "/start-a-blog" },
  { label: "Best Free Themes", href: "/best-free-wordpress-themes" },
  { label: "Security Guide", href: "/wordpress-security-complete-guide" },
  { label: "WooCommerce Store", href: "/create-online-store-wordpress" },
];

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const results = useQuery(
    api.search.searchContent,
    debouncedQuery.length >= 2 ? { query: debouncedQuery, limit: 6 } : "skip"
  );

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        // On mobile, expand; on desktop, focus
        if (window.innerWidth < 768) {
          setMobileExpanded(true);
          setTimeout(() => mobileInputRef.current?.focus(), 100);
        } else {
          inputRef.current?.focus();
        }
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setMobileExpanded(false);
        inputRef.current?.blur();
        mobileInputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setOpen(false);
        setMobileExpanded(false);
      }
    },
    [query, router]
  );

  const categoryLabel = (category: string) => {
    const map: Record<string, string> = {
      hosting: "Hosting",
      plugins: "Plugins",
      themes: "Themes",
      seo: "SEO",
      tutorials: "Tutorials",
      speed: "Speed",
      security: "Security",
    };
    return map[category] || category;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop search */}
      <form onSubmit={handleSubmit} className="hidden md:flex items-center">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search articles..."
            className="w-56 lg:w-64 pl-9 pr-14 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-0.5 rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-400">
            ⌘K
          </kbd>
        </div>
      </form>

      {/* Mobile search icon */}
      {!mobileExpanded && (
        <button
          type="button"
          aria-label="Open search"
          onClick={() => {
            setMobileExpanded(true);
            setTimeout(() => mobileInputRef.current?.focus(), 100);
          }}
          className="md:hidden flex items-center justify-center rounded-lg p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <Search size={20} />
        </button>
      )}

      {/* Mobile expanded search */}
      {mobileExpanded && (
        <form
          onSubmit={handleSubmit}
          className="md:hidden flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              ref={mobileInputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
            />
          </div>
          <button
            type="button"
            aria-label="Close search"
            onClick={() => {
              setMobileExpanded(false);
              setQuery("");
              setOpen(false);
            }}
            className="flex items-center justify-center rounded-lg p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </form>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 md:left-auto md:right-auto md:w-96 mt-2 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
          {debouncedQuery.length < 2 ? (
            /* Trending searches — shown when input is empty or < 2 chars */
            <div>
              <div className="flex items-center gap-2 px-4 pt-3 pb-2">
                <TrendingUp size={14} className="text-orange-500" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Popular
                </span>
              </div>
              <ul className="divide-y divide-slate-100">
                {TRENDING_SEARCHES.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => {
                        setOpen(false);
                        setMobileExpanded(false);
                        setQuery("");
                      }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50 transition-colors"
                    >
                      <Search size={14} className="text-slate-400 shrink-0" />
                      <span className="text-sm text-slate-700 flex-1">{label}</span>
                      <ArrowRight size={14} className="text-slate-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : results === undefined ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              No results for &ldquo;{debouncedQuery}&rdquo;
            </div>
          ) : (
            <>
              <ul className="divide-y divide-slate-100">
                {results.map((result) => (
                  <li key={`${result.type}-${result.slug}`}>
                    <Link
                      href={`/${result.slug}`}
                      onClick={() => {
                        setOpen(false);
                        setMobileExpanded(false);
                        setQuery("");
                      }}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-orange-50 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {result.title}
                        </p>
                        {result.excerpt && (
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {result.excerpt}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 mt-0.5 inline-flex items-center rounded-full bg-orange-100 border border-orange-200 px-2 py-0.5 text-[10px] font-semibold text-orange-700 capitalize">
                        {categoryLabel(result.category)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={() => {
                  setOpen(false);
                  setMobileExpanded(false);
                }}
                className="block px-4 py-3 text-center text-sm font-medium text-orange-600 hover:bg-orange-50 border-t border-slate-100 transition-colors"
              >
                View all results
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
