import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import NewsletterForm from "@/components/layout/newsletter-form";

export const metadata: Metadata = {
  title: "Start Here — Your WordPress Journey Begins | ZeroToWP",
  description:
    "New to WordPress? Follow our step-by-step learning path from complete beginner to confident WordPress user. Free guides, real screenshots, no fluff.",
};

const HUB_LINKS = [
  {
    label: "WordPress Hosting",
    href: "/wordpress-hosting",
    description: "Compare the best hosting providers for your budget",
  },
  {
    label: "WordPress Plugins",
    href: "/wordpress-plugins",
    description: "Essential plugins every site needs",
  },
  {
    label: "WordPress Themes",
    href: "/wordpress-themes",
    description: "Find the perfect design for your site",
  },
  {
    label: "WordPress SEO",
    href: "/wordpress-seo",
    description: "Get your site ranking in Google",
  },
  {
    label: "WordPress Speed",
    href: "/wordpress-speed",
    description: "Make your site load lightning fast",
  },
  {
    label: "WordPress Security",
    href: "/wordpress-security",
    description: "Keep your site safe from hackers",
  },
];

export default async function StartHerePage() {
  const posts = await fetchQuery(api.posts.listPublished, {
    category: "start-here",
  });

  const guides = [...posts].sort((a, b) => {
    const orderA = a.learningPathOrder ?? Infinity;
    const orderB = b.learningPathOrder ?? Infinity;
    if (orderA !== orderB) return orderA - orderB;
    return (a.publishedAt ?? 0) - (b.publishedAt ?? 0);
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-20 px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-100 opacity-40 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-semibold text-orange-700 tracking-wide">
            Free Step-by-Step Guide
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Start Your WordPress Journey
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">
            I&apos;ve been building WordPress sites for over 10 years. This is
            the exact learning path I wish I had when I started — no
            fluff, no overwhelm, just the steps that matter in the right order.
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {guides.length} guides
            </span>
            <span className="text-slate-300">|</span>
            <span>Beginner friendly</span>
            <span className="text-slate-300">|</span>
            <span>Free forever</span>
          </div>
        </div>
      </section>

      {/* How This Works */}
      <section className="py-12 px-4 bg-white border-b">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center">
                1
              </div>
              <p className="text-sm font-medium text-slate-800">
                Follow the steps in order
              </p>
              <p className="text-xs text-slate-500">
                Each guide builds on the previous one
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center">
                2
              </div>
              <p className="text-sm font-medium text-slate-800">
                Learn by doing
              </p>
              <p className="text-xs text-slate-500">
                Real screenshots, real examples, no theory
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center">
                3
              </div>
              <p className="text-sm font-medium text-slate-800">
                Launch your site
              </p>
              <p className="text-xs text-slate-500">
                You&apos;ll have a live WordPress site by the end
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Steps */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Your Learning Path
          </h2>

          {guides.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              Guides coming soon!
            </p>
          ) : (
            <div className="relative">
              {/* Vertical line connecting steps */}
              <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-orange-200 hidden md:block" />

              <ol className="space-y-4">
                {guides.map((post, index) => (
                  <li key={post._id}>
                    <Link
                      href={`/${post.slug}`}
                      className="group flex gap-5 bg-white border border-slate-200 rounded-xl p-6 hover:border-orange-300 hover:shadow-md transition-all relative"
                    >
                      {/* Number circle */}
                      <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-lg flex items-center justify-center group-hover:bg-orange-600 transition-colors shadow-sm">
                        {index + 1}
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                            {post.title}
                          </h2>
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        <span className="mt-1 text-sm font-medium text-orange-500 group-hover:text-orange-600 transition-colors">
                          Read guide &rarr;
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* Deep Dive Topics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Go Deeper
            </h2>
            <p className="text-slate-600">
              Once you&apos;ve completed the learning path, explore these topics
              to take your site to the next level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HUB_LINKS.map(({ label, href, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <span className="text-base font-semibold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {label}
                </span>
                <span className="text-sm text-slate-500 leading-relaxed">
                  {description}
                </span>
                <span className="text-sm font-medium text-orange-500 mt-auto">
                  Explore &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl font-bold">
            Get WordPress Tips in Your Inbox
          </h2>
          <p className="text-slate-300 leading-relaxed">
            I send practical WordPress advice once a week. No spam, no fluff —
            just the stuff that actually helps you build a better site.
          </p>
          <div className="w-full max-w-md">
            <NewsletterForm source="start-here" />
          </div>
        </div>
      </section>
    </>
  );
}
