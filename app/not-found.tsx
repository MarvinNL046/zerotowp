import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

const POPULAR_PAGES = [
  { label: "Start Here", href: "/start-here", description: "New to WordPress? Begin here" },
  { label: "Best Hosting", href: "/wordpress-hosting", description: "Top hosting providers compared" },
  { label: "Best Plugins", href: "/wordpress-plugins", description: "Essential plugins for every site" },
  { label: "Best Themes", href: "/wordpress-themes", description: "Beautiful themes that work" },
  { label: "SEO Guide", href: "/wordpress-seo", description: "Rank higher in Google" },
  { label: "Tutorials", href: "/tutorials", description: "Step-by-step WordPress guides" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Empty state — clear visual hierarchy */}
      <div className="text-center mb-12">
        <p className="text-[80px] sm:text-[120px] font-extrabold text-slate-100 leading-none select-none">
          404
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight -mt-4">
          Page not found
        </h1>
        <p className="text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed.
        </p>
      </div>

      {/* Search CTA — signifier for next action */}
      <Link
        href="/search"
        className="inline-flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm hover:border-orange-300 hover:text-orange-600 hover:shadow-md active:scale-[0.98] transition-all duration-200 mb-14"
      >
        <Search className="h-4 w-4" />
        Search our site
      </Link>

      {/* Popular pages — clear cards with hover feedback */}
      <div className="w-full max-w-3xl">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center mb-6">
          Popular Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_PAGES.map(({ label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 hover:border-orange-200 hover:bg-orange-50/50 hover:shadow-sm active:scale-[0.99] transition-all duration-200"
            >
              <div>
                <p className="font-medium text-slate-900 group-hover:text-orange-600 transition-colors text-sm tracking-tight">
                  {label}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 ml-3" />
            </Link>
          ))}
        </div>
      </div>

      {/* Primary CTA — strong button with proper states */}
      <div className="mt-14">
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-[#f97316] px-8 py-3.5 text-white font-semibold shadow-lg shadow-orange-500/25 hover:bg-orange-500 hover:shadow-xl active:scale-[0.98] transition-all duration-200"
        >
          Back to homepage &rarr;
        </Link>
      </div>
    </div>
  );
}
