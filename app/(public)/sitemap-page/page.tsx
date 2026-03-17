import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const metadata: Metadata = {
  title: "Sitemap — ZeroToWP",
  description:
    "Browse all pages on ZeroToWP organized by topic. Find WordPress guides, reviews, tutorials, and more.",
};

const CATEGORIES: {
  key: string;
  label: string;
  pillarHref: string;
  pillarLabel: string;
}[] = [
  {
    key: "hosting",
    label: "Hosting",
    pillarHref: "/wordpress-hosting",
    pillarLabel: "WordPress Hosting Guide",
  },
  {
    key: "plugins",
    label: "Plugins",
    pillarHref: "/wordpress-plugins",
    pillarLabel: "WordPress Plugins Guide",
  },
  {
    key: "themes",
    label: "Themes",
    pillarHref: "/wordpress-themes",
    pillarLabel: "WordPress Themes Guide",
  },
  {
    key: "seo",
    label: "SEO",
    pillarHref: "/wordpress-seo",
    pillarLabel: "WordPress SEO Guide",
  },
  {
    key: "speed",
    label: "Speed",
    pillarHref: "/wordpress-speed",
    pillarLabel: "WordPress Speed Guide",
  },
  {
    key: "security",
    label: "Security",
    pillarHref: "/wordpress-security",
    pillarLabel: "WordPress Security Guide",
  },
  {
    key: "errors",
    label: "Errors",
    pillarHref: "/wordpress-errors",
    pillarLabel: "WordPress Errors Guide",
  },
  {
    key: "tutorials",
    label: "Tutorials",
    pillarHref: "/tutorials",
    pillarLabel: "WordPress Tutorials",
  },
];

const MAIN_PAGES = [
  { label: "Home", href: "/" },
  { label: "Start Here", href: "/start-here" },
  { label: "Blog", href: "/blog" },
  { label: "Reviews", href: "/reviews" },
  { label: "Tools", href: "/tools" },
  { label: "Deals", href: "/deals" },
];

const LEGAL_PAGES = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Authors", href: "/authors" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "How We Test", href: "/how-we-test" },
];

export default async function SitemapPage() {
  const [posts, reviews] = await Promise.all([
    fetchQuery(api.posts.listPublished, {}),
    fetchQuery(api.reviews.listPublished, {}),
  ]);

  // Group posts by category
  const postsByCategory: Record<string, { title: string; slug: string }[]> = {};
  for (const post of posts) {
    const cat = post.category || "uncategorized";
    if (!postsByCategory[cat]) {
      postsByCategory[cat] = [];
    }
    postsByCategory[cat].push({ title: post.title, slug: post.slug });
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">Sitemap</h1>
      <p className="text-lg text-slate-600 mb-12">
        A complete overview of every page on ZeroToWP, organized by topic.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Main pages */}
        <SitemapSection title="Main Pages">
          {MAIN_PAGES.map((page) => (
            <SitemapLink key={page.href} href={page.href} label={page.label} />
          ))}
        </SitemapSection>

        {/* Category sections */}
        {CATEGORIES.map((cat) => (
          <SitemapSection key={cat.key} title={cat.label}>
            <SitemapLink
              href={cat.pillarHref}
              label={cat.pillarLabel}
              bold
            />
            {(postsByCategory[cat.key] || []).map((post) => (
              <SitemapLink
                key={post.slug}
                href={`/${post.slug}`}
                label={post.title}
              />
            ))}
          </SitemapSection>
        ))}

        {/* Reviews */}
        {reviews.length > 0 && (
          <SitemapSection title="Reviews">
            <SitemapLink href="/reviews" label="All Reviews" bold />
            {reviews.map((review: any) => (
              <SitemapLink
                key={review.slug}
                href={`/${review.slug}`}
                label={review.title}
              />
            ))}
          </SitemapSection>
        )}

        {/* Legal / Info pages */}
        <SitemapSection title="Legal &amp; Info">
          {LEGAL_PAGES.map((page) => (
            <SitemapLink key={page.href} href={page.href} label={page.label} />
          ))}
        </SitemapSection>
      </div>
    </div>
  );
}

function SitemapSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
        {title}
      </h2>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

function SitemapLink({
  href,
  label,
  bold,
}: {
  href: string;
  label: string;
  bold?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`text-sm hover:text-orange-500 transition-colors ${
          bold
            ? "font-semibold text-slate-900"
            : "text-slate-600"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}
