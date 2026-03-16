import Link from "next/link";
import MobileNav from "./mobile-nav";
import SearchBar from "./search";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-rocket.svg" alt="ZeroToWP" className="h-10" />
        </Link>

        {/* Desktop nav links — hidden on mobile, visible on md+ */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/start-here"
            className="text-sm font-semibold bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors"
          >
            Start Here
          </Link>
          <Link
            href="/wordpress-hosting"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Hosting
          </Link>
          <Link
            href="/wordpress-plugins"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Plugins
          </Link>
          <Link
            href="/wordpress-themes"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Themes
          </Link>
          <Link
            href="/wordpress-seo"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            SEO
          </Link>
          <Link
            href="/tutorials"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Tutorials
          </Link>
          <Link
            href="/reviews"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Reviews
          </Link>
        </nav>

        {/* Search + Mobile nav */}
        <div className="flex items-center gap-2">
          <SearchBar />
          {/* Mobile hamburger — client island, visible only on mobile */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
