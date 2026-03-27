import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";
import NewsletterForm from "@/components/layout/newsletter-form";
import { WebSiteSchema } from "@/components/seo/schema-markup";
import InlineAd from "@/components/ads/inline-ad";

export const metadata: Metadata = {
  alternates: { canonical: "https://zerotowp.com" },
};
import {
  Rocket,
  Shield,
  Zap,
  Search,
  Palette,
  Plug,
  Server,
  BookOpen,
  BookText,
  AlertTriangle,
} from "lucide-react";

const CLUSTERS = [
  {
    label: "Getting Started",
    href: "/start-here",
    icon: Rocket,
    description: "Build your first WordPress site from scratch",
    color: "bg-orange-100 text-orange-700",
  },
  {
    label: "Hosting",
    href: "/wordpress-hosting",
    icon: Server,
    description: "Find the right host for your budget and needs",
    color: "bg-blue-100 text-blue-700",
  },
  {
    label: "Plugins",
    href: "/wordpress-plugins",
    icon: Plug,
    description: "The best plugins for every use case",
    color: "bg-purple-100 text-purple-700",
  },
  {
    label: "Themes",
    href: "/wordpress-themes",
    icon: Palette,
    description: "Beautiful themes that are fast and customizable",
    color: "bg-pink-100 text-pink-700",
  },
  {
    label: "SEO",
    href: "/wordpress-seo",
    icon: Search,
    description: "Get your site ranking on Google",
    color: "bg-green-100 text-green-700",
  },
  {
    label: "Speed",
    href: "/wordpress-speed",
    icon: Zap,
    description: "Make your site load in under 2 seconds",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    label: "Security",
    href: "/wordpress-security",
    icon: Shield,
    description: "Protect your site from hackers and malware",
    color: "bg-red-100 text-red-700",
  },
  {
    label: "Tutorials",
    href: "/tutorials",
    icon: BookOpen,
    description: "Step-by-step guides for common tasks",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    label: "Errors",
    href: "/wordpress-errors",
    icon: AlertTriangle,
    description: "Fix common WordPress errors fast",
    color: "bg-amber-100 text-amber-700",
  },
  {
    label: "Glossary",
    href: "/glossary",
    icon: BookText,
    description: "WordPress terms explained in plain English",
    color: "bg-teal-100 text-teal-700",
  },
];

const POPULAR_GUIDES = [
  { label: "How to Make a WordPress Website", href: "/how-to-make-a-wordpress-website" },
  { label: "Best WordPress Hosting", href: "/how-to-choose-wordpress-hosting" },
  { label: "Speed Up WordPress", href: "/speed-up-wordpress" },
  { label: "WordPress SEO Checklist", href: "/wordpress-seo-checklist" },
  { label: "Best Free Themes", href: "/best-free-wordpress-themes" },
  { label: "Start a Blog", href: "/start-a-blog" },
];

async function getHomepageContent(): Promise<{
  posts: Doc<"posts">[];
  reviews: Doc<"reviews">[];
  isDegraded: boolean;
}> {
  try {
    const [posts, reviews] = await Promise.all([
      fetchQuery(api.posts.listPublished, { limit: 6 }),
      fetchQuery(api.reviews.listPublished, { limit: 3 }),
    ]);

    return { posts, reviews, isDegraded: false };
  } catch (error) {
    console.error("Failed to load homepage content", error);
    return { posts: [], reviews: [], isDegraded: true };
  }
}

export default async function HomePage() {
  const { posts, reviews, isDegraded } = await getHomepageContent();

  return (
    <>
      <WebSiteSchema />

      {/* Hero */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <Image
          src="/hero-wordpress.svg"
          alt="Illustrated WordPress workspace scene with a creator silhouette and editor screen."
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(41,21,15,0.78)_0%,rgba(41,21,15,0.68)_36%,rgba(41,21,15,0.34)_60%,rgba(41,21,15,0.12)_100%),linear-gradient(180deg,rgba(54,28,20,0.14),rgba(54,28,20,0.58))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,243,224,0.22),transparent_30%),radial-gradient(circle_at_right,rgba(255,190,120,0.16),transparent_28%)]" />

        <div className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <div className="flex flex-col items-start gap-6 lg:gap-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-orange-700 shadow-sm backdrop-blur">
                WordPress Launch Desk
              </span>

              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                  Launch WordPress Sites Fast
                </h1>
                <p className="max-w-xl text-lg font-medium text-white/90 sm:text-xl">
                  Practical workflows for WordPress creators who need reliable launches, not guesswork.
                </p>
                <p className="max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
                  Sheets, dashboards, and ops all in one place. Follow the guides that pair sleek design with performance and SEO.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/start-here"
                  aria-label="Start a WordPress project with the beginner guide"
                  className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(249,115,22,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f97316]"
                >
                  Start a WordPress Project
                </Link>
                <Link
                  href="/wordpress-hosting"
                  aria-label="Compare WordPress hosting and tools"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/90 px-6 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                >
                  Compare Hosting &amp; Tools
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
                <span className="rounded-full border border-white/55 bg-white/80 px-3 py-1 shadow-sm backdrop-blur-sm">
                  70+ WordPress tutorials
                </span>
                <span className="rounded-full border border-white/55 bg-white/80 px-3 py-1 shadow-sm backdrop-blur-sm">
                  Reviews, checklists, and launch guides
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isDegraded && (
        <section className="border-y border-amber-200 bg-amber-50 px-4 py-4">
          <div className="mx-auto max-w-6xl">
            <p className="text-sm font-medium text-amber-900">
              Fresh content is tijdelijk niet beschikbaar. De site blijft online, maar recente
              artikelen en reviews laden pas weer zodra de contentdienst hersteld is.
            </p>
          </div>
        </section>
      )}

      {/* Topic Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              What Do You Need Help With?
            </h2>
            <p className="text-base text-slate-500">
              Choose a topic and dive into our free guides.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {CLUSTERS.map(({ label, href, icon: Icon, description, color }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${color} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 tracking-tight group-hover:text-[#f97316] transition-colors duration-200">
                    {label}
                  </h3>
                  <p className="text-[13px] text-slate-500 mt-1.5 leading-snug">
                    {description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Popular Guides
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_GUIDES.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 hover:border-orange-300 hover:shadow-sm transition-all group"
              >
                <span className="flex-shrink-0 h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <BookOpen className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ad between sections */}
      <div className="max-w-6xl mx-auto px-4">
        <InlineAd />
      </div>

      {/* Latest Posts */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Latest Articles
              </h2>
              <p className="text-base text-slate-500">
                Fresh guides to help you get the most out of WordPress.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden sm:inline-block text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              View all &rarr;
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {posts.map((post: Doc<"posts">) => (
                <PostCard
                  key={post._id}
                  post={{
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    category: post.category,
                    publishedAt: post.publishedAt,
                    featuredImageUrl: `/images/blog/${post.slug}.webp`,
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No posts yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* Hosting Reviews */}
      {reviews.length > 0 && (
        <section className="py-16 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Hosting Reviews
                </h2>
                <p className="text-base text-slate-500">
                  Honest reviews based on real testing — not affiliate hype.
                </p>
              </div>
              <Link
                href="/reviews"
                className="hidden sm:inline-block text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
              >
                All reviews &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review: Doc<"reviews">) => (
                <Link
                  key={review._id}
                  href={`/${review.slug}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-lg hover:border-orange-300 transition-all"
                >
                  <div className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-slate-900">
                        {review.productName}
                      </span>
                      <span className="text-sm font-medium text-orange-600 bg-orange-50 rounded-full px-2.5 py-0.5">
                        {review.rating}/5
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-800 group-hover:text-[#f97316] transition-colors leading-snug">
                      {review.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {review.excerpt}
                    </p>
                    <span className="text-sm font-medium text-orange-600 mt-auto">
                      Read Review &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust / E-E-A-T + Newsletter */}
      <section className="bg-slate-900 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Learn WordPress from Someone Who Actually Uses It
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                I&apos;m Marvin — I&apos;ve been building WordPress sites for over 10 years.
                Every guide on this site is based on real experience, not recycled tips.
                Subscribe to get practical advice delivered to your inbox.
              </p>
              <div className="flex gap-8 text-sm">
                <div>
                  <span className="text-2xl font-bold text-orange-400">60+</span>
                  <p className="text-slate-400 mt-0.5">Free guides</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-orange-400">9</span>
                  <p className="text-slate-400 mt-0.5">Topic hubs</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-orange-400">90+</span>
                  <p className="text-slate-400 mt-0.5">Screenshots</p>
                </div>
              </div>
              <div className="mt-2">
                <NewsletterForm source="homepage-expert" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                I need help with...
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CLUSTERS.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-200 hover:border-orange-500 hover:text-white transition-all group"
                  >
                    <Icon className="h-4 w-4 text-orange-500" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
