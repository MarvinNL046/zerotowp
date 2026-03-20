import Link from "next/link";
import NavDropdown from "./nav-dropdown";
import MobileNav from "./mobile-nav";
import SearchBar from "./search";

const WORDPRESS_LINKS = [
  { label: "Hosting", href: "/wordpress-hosting", desc: "Best WordPress hosts compared" },
  { label: "Plugins", href: "/wordpress-plugins", desc: "Essential plugins & reviews" },
  { label: "Themes", href: "/wordpress-themes", desc: "Free & premium themes" },
  { label: "SEO", href: "/wordpress-seo", desc: "Rank higher on Google" },
  { label: "Speed", href: "/wordpress-speed", desc: "Optimize performance" },
  { label: "Security", href: "/wordpress-security", desc: "Protect your site" },
];

const RESOURCES_LINKS = [
  { label: "Tutorials", href: "/tutorials", desc: "Step-by-step guides" },
  { label: "Glossary", href: "/glossary", desc: "WordPress terms A–Z" },
  { label: "Reviews", href: "/reviews", desc: "Honest product reviews" },
  { label: "Tools", href: "/tools", desc: "Free WordPress tools" },
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
        <nav className="hidden lg:flex items-center gap-1">
          <Link
            href="/news"
            className="text-sm font-medium text-slate-500 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150"
          >
            News
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-slate-500 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150"
          >
            Blog
          </Link>
          <NavDropdown label="WordPress" links={WORDPRESS_LINKS} />
          <NavDropdown label="Resources" links={RESOURCES_LINKS} />
          <Link
            href="/start-here"
            className="text-sm font-semibold bg-[#f97316] text-white px-4 py-2 rounded-lg hover:bg-orange-500 active:scale-[0.97] shadow-sm shadow-orange-500/20 transition-all duration-200 ml-2"
          >
            Start Here &rarr;
          </Link>
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
