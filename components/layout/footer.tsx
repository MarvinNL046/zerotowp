import Link from "next/link";
import NewsletterForm from "./newsletter-form";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-rocket-white.svg" alt="ZeroToWP" className="h-10" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Helping beginners build their first WordPress site
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Start Here", href: "/start-here" },
                { label: "Blog", href: "/blog" },
                { label: "Reviews", href: "/reviews" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Topics */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Topics
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Hosting", href: "/wordpress-hosting" },
                { label: "Plugins", href: "/wordpress-plugins" },
                { label: "Themes", href: "/wordpress-themes" },
                { label: "SEO", href: "/wordpress-seo" },
                { label: "Speed", href: "/wordpress-speed" },
                { label: "Security", href: "/wordpress-security" },
                { label: "Errors", href: "/wordpress-errors" },
                { label: "Tutorials", href: "/tutorials" },
                { label: "Glossary", href: "/glossary" },
                { label: "Reviews", href: "/reviews" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-400">
              Get the latest WordPress tips delivered to your inbox.
            </p>
            <NewsletterForm source="footer" />
          </div>
        </div>

        {/* Trust links */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-4 justify-center">
          {[
            { label: "About", href: "/about" },
            { label: "Authors", href: "/authors" },
            { label: "Contact", href: "/contact" },
            { label: "How We Test", href: "/how-we-test" },
            { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
            { label: "Disclaimer", href: "/disclaimer" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "Cookie Policy", href: "/cookie-policy" },
            { label: "Editorial Policy", href: "/editorial-policy" },
            { label: "Sitemap", href: "/sitemap-page" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-2">
          <p className="text-sm text-slate-500 text-center">
            &copy; 2026 ZeroToWP. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 text-center max-w-2xl mx-auto">
            WordPress&reg; is a trademark of the WordPress Foundation. ZeroToWP is
            an independent website and is not affiliated with, endorsed by, or
            sponsored by the WordPress Foundation.
          </p>
        </div>
      </div>
    </footer>
  );
}
