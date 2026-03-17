import Link from "next/link";
import MobileNav from "./mobile-nav";
import SearchBar from "./search";

const NAV_ITEMS = [
  { label: "Hosting", href: "/wordpress-hosting" },
  { label: "Plugins", href: "/wordpress-plugins" },
  { label: "Themes", href: "/wordpress-themes" },
  { label: "SEO", href: "/wordpress-seo" },
  { label: "Tutorials", href: "/tutorials" },
  { label: "Glossary", href: "/glossary" },
  { label: "Reviews", href: "/reviews" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-rocket.svg" alt="ZeroToWP" className="h-10" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/start-here"
            className="text-sm font-semibold bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-orange-500 active:scale-[0.97] shadow-sm shadow-orange-500/20 transition-all duration-200 mr-2"
          >
            Start Here
          </Link>
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium text-slate-500 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Search + Mobile nav */}
        <div className="flex items-center gap-2">
          <SearchBar />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
