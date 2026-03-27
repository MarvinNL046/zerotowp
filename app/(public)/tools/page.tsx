import type { Metadata } from "next";
import Link from "next/link";
import {
  Server,
  Shield,
  Zap,
  Search,
  Plug,
  Palette,
  ShoppingCart,
  Mail,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "WordPress Toolkit — Tools I Actually Use and Recommend",
  description:
    "My curated collection of WordPress tools, plugins, and services. Every tool on this list I've personally tested on real sites.",
};

type Tool = {
  name: string;
  url: string;
  description: string;
  price: string;
  reviewSlug?: string;
  reviewLabel?: string;
};

type Category = {
  title: string;
  icon: React.ElementType;
  color: string;
  iconBg: string;
  tools: Tool[];
};

const CATEGORIES: Category[] = [
  {
    title: "Web Hosting",
    icon: Server,
    color: "text-blue-700",
    iconBg: "bg-blue-100",
    tools: [
      {
        name: "SiteGround",
        url: "https://www.siteground.com/",
        description:
          "Fast hosting on Google Cloud with outstanding support. My go-to recommendation for most beginners.",
        price: "From $2.99/mo",
        reviewSlug: "/siteground-review",
        reviewLabel: "Read our SiteGround review",
      },
      {
        name: "Hostinger",
        url: "https://www.hostinger.com/",
        description:
          "Best budget option with built-in AI tools and a clean dashboard.",
        price: "From $1.99/mo",
        reviewSlug: "/hostinger-review",
        reviewLabel: "Read our Hostinger review",
      },
      {
        name: "Bluehost",
        url: "https://www.bluehost.com/",
        description:
          "Officially recommended by WordPress.org. Solid beginner-friendly option.",
        price: "From $2.95/mo",
        reviewSlug: "/bluehost-review",
        reviewLabel: "Read our Bluehost review",
      },
      {
        name: "Kinsta",
        url: "https://kinsta.com/",
        description:
          "Premium managed WordPress hosting powered by Google Cloud. For sites that need top performance.",
        price: "From $35/mo",
        reviewSlug: "/managed-wordpress-hosting",
        reviewLabel: "Compare managed hosts",
      },
      {
        name: "Cloudways",
        url: "https://www.cloudways.com/",
        description:
          "Managed cloud hosting where you pick your provider (DigitalOcean, AWS, Google Cloud).",
        price: "From $14/mo",
        reviewSlug: "/managed-wordpress-hosting",
        reviewLabel: "Compare managed hosts",
      },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    color: "text-red-700",
    iconBg: "bg-red-100",
    tools: [
      {
        name: "Wordfence",
        url: "https://www.wordfence.com/",
        description:
          "Comprehensive firewall and malware scanner with a generous free tier.",
        price: "Free / $149/yr",
        reviewSlug: "/best-security-plugins",
        reviewLabel: "Compare security plugins",
      },
      {
        name: "Sucuri",
        url: "https://sucuri.net/",
        description:
          "Cloud-based website firewall with CDN included. Great for stopping attacks before they reach your server.",
        price: "From $199/yr",
        reviewSlug: "/best-wordpress-firewall-plugins",
        reviewLabel: "Compare firewall plugins",
      },
      {
        name: "Really Simple SSL",
        url: "https://really-simple-ssl.com/",
        description:
          "One-click HTTPS setup and mixed content fixer. Install it and forget it.",
        price: "Free",
        reviewSlug: "/setup-ssl-wordpress",
        reviewLabel: "SSL setup guide",
      },
      {
        name: "Two-Factor",
        url: "https://wordpress.org/plugins/two-factor/",
        description:
          "Adds two-factor authentication to your WordPress login. Simple, free, essential.",
        price: "Free",
        reviewSlug: "/wordpress-login-security",
        reviewLabel: "Login security guide",
      },
    ],
  },
  {
    title: "Performance & Speed",
    icon: Zap,
    color: "text-yellow-700",
    iconBg: "bg-yellow-100",
    tools: [
      {
        name: "WP Rocket",
        url: "https://wp-rocket.me/",
        description:
          "The best caching plugin, period. Works out of the box with zero configuration needed.",
        price: "$59/yr",
        reviewSlug: "/best-caching-plugins",
        reviewLabel: "Compare caching plugins",
      },
      {
        name: "LiteSpeed Cache",
        url: "https://wordpress.org/plugins/litespeed-cache/",
        description:
          "Powerful free caching plugin, especially on LiteSpeed servers. Includes image optimization.",
        price: "Free",
        reviewSlug: "/best-caching-plugins",
        reviewLabel: "Compare caching plugins",
      },
      {
        name: "Cloudflare",
        url: "https://www.cloudflare.com/",
        description:
          "Free CDN, DNS management, and basic DDoS protection. Every WordPress site should use this.",
        price: "Free",
        reviewSlug: "/setup-cloudflare-cdn-wordpress",
        reviewLabel: "Cloudflare setup guide",
      },
      {
        name: "ShortPixel",
        url: "https://shortpixel.com/",
        description:
          "Image compression and WebP/AVIF conversion. Smaller images = faster site.",
        price: "Free (100 imgs/mo) / from $3.99/mo",
        reviewSlug: "/best-image-optimization-plugins",
        reviewLabel: "Compare image optimizers",
      },
      {
        name: "WP-Optimize",
        url: "https://getwpo.com/",
        description:
          "Database cleanup, table optimization, and caching in one plugin.",
        price: "Free",
        reviewSlug: "/wordpress-database-optimization",
        reviewLabel: "Database optimization guide",
      },
    ],
  },
  {
    title: "SEO",
    icon: Search,
    color: "text-green-700",
    iconBg: "bg-green-100",
    tools: [
      {
        name: "Rank Math",
        url: "https://rankmath.com/",
        description:
          "The most generous free SEO plugin. Schema markup, redirections, and keyword tracking built in.",
        price: "Free / $59/yr",
        reviewSlug: "/yoast-vs-rank-math",
        reviewLabel: "Yoast vs Rank Math",
      },
      {
        name: "Yoast SEO",
        url: "https://yoast.com/",
        description:
          "The most popular WordPress SEO plugin. Reliable, well-supported, and beginner-friendly.",
        price: "Free / $99/yr",
        reviewSlug: "/yoast-vs-rank-math",
        reviewLabel: "Yoast vs Rank Math",
      },
      {
        name: "Google Search Console",
        url: "https://search.google.com/search-console/",
        description:
          "Free and essential. Monitor your search performance, fix indexing issues, submit sitemaps.",
        price: "Free",
        reviewSlug: "/wordpress-seo-checklist",
        reviewLabel: "SEO checklist",
      },
      {
        name: "Google Analytics",
        url: "https://analytics.google.com/",
        description:
          "Free traffic analytics from Google. Understand where your visitors come from and what they do.",
        price: "Free",
        reviewSlug: "/install-google-analytics-wordpress",
        reviewLabel: "Setup guide",
      },
      {
        name: "Ahrefs",
        url: "https://ahrefs.com/",
        description:
          "Professional keyword research, backlink analysis, and competitor monitoring.",
        price: "From $99/mo",
        reviewSlug: "/keyword-research-beginners",
        reviewLabel: "Keyword research guide",
      },
    ],
  },
  {
    title: "Essential Plugins",
    icon: Plug,
    color: "text-purple-700",
    iconBg: "bg-purple-100",
    tools: [
      {
        name: "WPForms",
        url: "https://wpforms.com/",
        description:
          "Drag-and-drop form builder. Create contact forms, surveys, and payment forms in minutes.",
        price: "Free / from $49.50/yr",
        reviewSlug: "/best-contact-form-plugins",
        reviewLabel: "Compare form plugins",
      },
      {
        name: "WP Mail SMTP",
        url: "https://wpmailsmtp.com/",
        description:
          "Fix WordPress email delivery issues. Connects to Gmail, Outlook, SendGrid, and more.",
        price: "Free / from $49/yr",
        reviewSlug: "/wordpress-email-setup",
        reviewLabel: "Email setup guide",
      },
      {
        name: "UpdraftPlus",
        url: "https://updraftplus.com/",
        description:
          "Scheduled backups to Google Drive, Dropbox, S3, and other cloud storage.",
        price: "Free / from $70/yr",
        reviewSlug: "/wordpress-backup-guide",
        reviewLabel: "Backup guide",
      },
      {
        name: "Duplicator",
        url: "https://duplicator.com/",
        description:
          "Site migration and backups. The easiest way to move WordPress to a new host.",
        price: "Free / from $49.50/yr",
        reviewSlug: "/migrate-wordpress-to-new-host",
        reviewLabel: "Migration guide",
      },
      {
        name: "MonsterInsights",
        url: "https://www.monsterinsights.com/",
        description:
          "See your Google Analytics data right inside the WordPress dashboard.",
        price: "Free / from $99.60/yr",
        reviewSlug: "/install-google-analytics-wordpress",
        reviewLabel: "Analytics setup guide",
      },
    ],
  },
  {
    title: "Themes & Design",
    icon: Palette,
    color: "text-pink-700",
    iconBg: "bg-pink-100",
    tools: [
      {
        name: "Astra",
        url: "https://wpastra.com/",
        description:
          "The fastest multipurpose theme with 2M+ active installs. Lightweight and endlessly customizable.",
        price: "Free / $47/yr",
        reviewSlug: "/astra-theme-review",
        reviewLabel: "Read our Astra review",
      },
      {
        name: "GeneratePress",
        url: "https://generatepress.com/",
        description:
          "The lightest WordPress theme available. A developer favorite for performance-focused sites.",
        price: "Free / $59/yr",
        reviewSlug: "/generatepress-vs-astra",
        reviewLabel: "GeneratePress vs Astra",
      },
      {
        name: "Kadence",
        url: "https://www.kadencewp.com/",
        description:
          "Feature-rich free theme with a built-in header/footer builder. Great value.",
        price: "Free / $149/yr",
        reviewSlug: "/best-free-wordpress-themes",
        reviewLabel: "Best free themes",
      },
      {
        name: "Elementor",
        url: "https://elementor.com/",
        description:
          "The most popular WordPress page builder. Visual drag-and-drop editing for any theme.",
        price: "Free / $59/yr",
        reviewSlug: "/elementor-vs-divi",
        reviewLabel: "Elementor vs Divi",
      },
      {
        name: "Divi",
        url: "https://www.elegantthemes.com/gallery/divi/",
        description:
          "All-in-one page builder and theme with a lifetime pricing option.",
        price: "$89/yr or $249 lifetime",
        reviewSlug: "/elementor-vs-divi",
        reviewLabel: "Elementor vs Divi",
      },
    ],
  },
  {
    title: "eCommerce",
    icon: ShoppingCart,
    color: "text-emerald-700",
    iconBg: "bg-emerald-100",
    tools: [
      {
        name: "WooCommerce",
        url: "https://woocommerce.com/",
        description:
          "The WordPress eCommerce plugin. Powers over 25% of all online stores worldwide.",
        price: "Free",
        reviewSlug: "/create-online-store-wordpress",
        reviewLabel: "Store setup guide",
      },
      {
        name: "Stripe",
        url: "https://stripe.com/",
        description:
          "Accept credit card payments with no monthly fee. Industry-standard payment processing.",
        price: "2.9% + 30\u00a2 per transaction",
        reviewSlug: "/create-online-store-wordpress",
        reviewLabel: "Store setup guide",
      },
      {
        name: "Easy Digital Downloads",
        url: "https://easydigitaldownloads.com/",
        description:
          "Purpose-built for selling digital products like ebooks, software, and courses.",
        price: "Free / from $99.50/yr",
      },
    ],
  },
  {
    title: "Email Marketing",
    icon: Mail,
    color: "text-indigo-700",
    iconBg: "bg-indigo-100",
    tools: [
      {
        name: "Brevo",
        url: "https://www.brevo.com/",
        description:
          "300 free emails per day with a solid WordPress plugin. Great for starters on a budget.",
        price: "Free / from $25/mo",
        reviewSlug: "/wordpress-email-setup",
        reviewLabel: "Email setup guide",
      },
      {
        name: "Mailchimp",
        url: "https://mailchimp.com/",
        description:
          "The most popular email marketing platform with a generous free tier for small lists.",
        price: "Free (up to 500 contacts)",
      },
      {
        name: "ConvertKit",
        url: "https://convertkit.com/",
        description:
          "Built specifically for creators and bloggers. Excellent automation and landing pages.",
        price: "Free (up to 10K subscribers) / from $25/mo",
      },
    ],
  },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3">
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold text-slate-900 hover:text-orange-600 transition-colors inline-flex items-center gap-1.5"
        >
          {tool.name}
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>
        <span className="flex-shrink-0 text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-1">
          {tool.price}
        </span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">
        {tool.description}
      </p>
      {tool.reviewSlug && (
        <Link
          href={tool.reviewSlug}
          className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors mt-auto"
        >
          {tool.reviewLabel || "Read our review"} &rarr;
        </Link>
      )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20 px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-100 opacity-40 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700 tracking-wide">
            WordPress Toolkit
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Tools I Actually Use and Recommend
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            After 10+ years of building WordPress sites, these are the tools
            I keep coming back to. Every tool on this list I&apos;ve personally
            tested on real projects &mdash; no filler, no pay-to-play rankings.
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {CATEGORIES.reduce((acc, cat) => acc + cat.tools.length, 0)} tools
            </span>
            <span className="text-slate-300">|</span>
            <span>{CATEGORIES.length} categories</span>
            <span className="text-slate-300">|</span>
            <span>Updated March 2026</span>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <section className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="flex-shrink-0 text-sm font-medium text-slate-600 hover:text-orange-600 px-3 py-1.5 rounded-full hover:bg-orange-50 transition-colors"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-16">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const anchor = category.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-");

            return (
              <div key={category.title} id={anchor} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-lg ${category.iconBg} ${category.color} flex items-center justify-center`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {category.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.name} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How I Choose Tools */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            How I Choose Tools
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Tested on real sites",
                text: "Every tool on this page has been installed and used on actual WordPress projects I manage.",
              },
              {
                title: "Performance impact",
                text: "I measure the speed impact of every plugin. If it slows your site down significantly, it doesn't make the list.",
              },
              {
                title: "Value for money",
                text: "Free alternatives are listed where they genuinely compete. I won't recommend premium tools when a free one does the job.",
              },
              {
                title: "Support quality",
                text: "When something breaks at 2 AM, you want a team that responds fast. I factor in support quality and documentation.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-slate-50 border-t">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-slate-500">
            Some links on this page may be affiliate links, which means I earn a
            small commission if you purchase through them &mdash; at no extra
            cost to you. This helps support ZeroToWP and keeps the content free.
            See our{" "}
            <Link
              href="/affiliate-disclosure"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              affiliate disclosure
            </Link>{" "}
            for details.
          </p>
        </div>
      </section>
    </>
  );
}
