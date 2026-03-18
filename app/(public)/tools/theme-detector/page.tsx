import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Search, Globe, Palette, Plug, Server } from "lucide-react";
import { BreadcrumbSchema } from "@/components/seo/schema-markup";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import DetectorForm from "./detector-form";

export const metadata: Metadata = {
  title: "WordPress Theme Detector - Find Any Site's Theme & Plugins",
  description:
    "Free tool to detect which WordPress theme, plugins, and hosting any website uses. Enter a URL and get instant results.",
  keywords: [
    "wordpress theme detector",
    "what wordpress theme is that",
    "detect wordpress theme",
    "wordpress theme checker",
    "wordpress plugin detector",
  ],
  alternates: {
    canonical: "/tools/theme-detector",
  },
};

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Tools", href: "/tools" },
  { label: "Theme Detector" },
];

const EXAMPLE_SITES = [
  "techcrunch.com",
  "wpastra.com",        // Astra theme — links to our review
  "developer.mozilla.org",
  "generatepress.com",  // GeneratePress theme — links to our review
  "whitehouse.gov",
  "gymshark.com",       // Shopify — shows platform detection
  "www.kadencewp.com",  // Kadence theme — links to our review
  "jquery.com",
];

const STEPS = [
  {
    icon: Globe,
    title: "Enter a URL",
    description:
      "Type or paste any website address. We'll automatically add https:// if you forget it.",
  },
  {
    icon: Search,
    title: "We scan the source",
    description:
      "Our server fetches the page and analyzes the HTML source code and HTTP headers.",
  },
  {
    icon: Palette,
    title: "Get instant results",
    description:
      "See the WordPress theme, detected plugins, and hosting provider with links to learn more.",
  },
];

export default function ThemeDetectorPage() {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "WordPress Theme Detector",
    description:
      "Free tool to detect which WordPress theme, plugins, and hosting any website uses.",
    url: "https://zerotowp.com/tools/theme-detector",
    applicationCategory: "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: "ZeroToWP",
      url: "https://zerotowp.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zerotowp.com" },
          { name: "Tools", url: "https://zerotowp.com/tools" },
          { name: "Theme Detector" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 md:py-20 px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-100 opacity-40 blur-3xl" />

        <div className="relative max-w-3xl mx-auto">
          <Breadcrumbs items={BREADCRUMB_ITEMS} />

          <div className="text-center flex flex-col items-center gap-5 mt-2">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700 tracking-wide">
              Free Tool
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              WordPress Theme &amp; Plugin Detector
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Curious what theme or plugins a WordPress site is using? Enter any
              URL below and we&apos;ll analyze it instantly.
            </p>
          </div>

          {/* Detector form */}
          <div className="mt-8">
            <Suspense
              fallback={
                <div className="h-14 rounded-xl bg-slate-100 animate-pulse" />
              }
            >
              <DetectorForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Popular sites to try */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-slate-500 text-center mb-3">
            Popular sites to try:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {EXAMPLE_SITES.map((site) => (
              <Link
                key={site}
                href={`/tools/theme-detector?url=${encodeURIComponent(site)}`}
                className="text-sm text-slate-600 hover:text-orange-600 bg-slate-50 hover:bg-orange-50 px-3 py-1.5 rounded-full border border-slate-200 hover:border-orange-200 transition-colors"
              >
                {site}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-orange-500 mb-1">
                    Step {i + 1}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What we detect */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-10">
            What We Detect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Palette,
                title: "WordPress Theme",
                text: "We identify the active theme by analyzing the HTML source for wp-content/themes/ paths. Known themes show links to reviews and official sites.",
              },
              {
                icon: Plug,
                title: "Active Plugins",
                text: "We detect plugins from wp-content/plugins/ paths and HTML signatures. Only plugins that load front-end assets are visible.",
              },
              {
                icon: Server,
                title: "Hosting Provider",
                text: "HTTP response headers often reveal the hosting provider or CDN. We check for signatures from Kinsta, WP Engine, SiteGround, and more.",
              },
              {
                icon: Search,
                title: "WordPress Version",
                text: "If the site exposes its generator meta tag, we extract the exact WordPress version number.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Ready to build your own WordPress site?
          </h2>
          <p className="text-sm text-slate-600 mb-5">
            Check out our step-by-step guides to get started with WordPress, pick
            the right hosting, and choose the perfect theme.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/start-here"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors"
            >
              Start Here &rarr;
            </Link>
            <Link
              href="/best-free-wordpress-themes"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-700 font-semibold text-sm border border-slate-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
            >
              Best Free Themes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
