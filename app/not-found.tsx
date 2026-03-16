import Link from "next/link";

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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* 404 heading */}
      <div className="text-center mb-12">
        <p className="text-8xl font-bold text-slate-200 select-none mb-2">
          404
        </p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Oops! This page doesn&apos;t exist.
        </h1>
        <p className="text-slate-500 max-w-md mx-auto">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed in the first place.
        </p>
      </div>

      {/* Search link */}
      <Link
        href="/search"
        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm text-slate-600 shadow-sm hover:bg-slate-50 transition-colors mb-12"
      >
        <svg
          className="h-4 w-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        Search our site
      </Link>

      {/* Popular pages */}
      <div className="w-full max-w-3xl">
        <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider text-center mb-6">
          Popular Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {POPULAR_PAGES.map(({ label, href, description }) => (
            <Link
              key={href}
              href={href}
              className="rounded-xl border border-slate-200 p-4 hover:border-orange-300 hover:bg-orange-50/50 transition-colors group"
            >
              <p className="font-medium text-slate-900 group-hover:text-orange-600 transition-colors text-sm">
                {label}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Back to home */}
      <div className="mt-12">
        <Link
          href="/"
          className="rounded-lg bg-orange-500 px-6 py-3 text-white font-medium hover:bg-orange-600 transition-colors"
        >
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
}
