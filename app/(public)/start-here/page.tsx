import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import NewsletterForm from "@/components/layout/newsletter-form";
import { BreadcrumbSchema } from "@/components/seo/schema-markup";
import {
  Rocket,
  Server,
  Plug,
  Palette,
  Search,
  Zap,
  Shield,
  ListChecks,
  MousePointerClick,
  PartyPopper,
  ChevronRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Start Here — Your WordPress Journey Begins | ZeroToWP",
  description:
    "New to WordPress? Follow our step-by-step learning path from complete beginner to confident WordPress user. Free guides, real screenshots, no fluff.",
  alternates: { canonical: "https://zerotowp.com/start-here" },
};

const HUB_LINKS = [
  {
    label: "WordPress Hosting",
    href: "/wordpress-hosting",
    description: "Compare the best hosting providers",
    icon: Server,
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "WordPress Plugins",
    href: "/wordpress-plugins",
    description: "Essential plugins for every use case",
    icon: Plug,
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "WordPress Themes",
    href: "/wordpress-themes",
    description: "Beautiful, fast themes that work",
    icon: Palette,
    color: "bg-pink-100 text-pink-600",
  },
  {
    label: "WordPress SEO",
    href: "/wordpress-seo",
    description: "Get your site ranking in Google",
    icon: Search,
    color: "bg-green-100 text-green-600",
  },
  {
    label: "WordPress Speed",
    href: "/wordpress-speed",
    description: "Make your site load lightning fast",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    label: "WordPress Security",
    href: "/wordpress-security",
    description: "Keep your site safe from threats",
    icon: Shield,
    color: "bg-red-100 text-red-600",
  },
];

/* Group learning path steps into phases for visual clarity */
const PHASES = [
  { label: "Plan", range: [0, 2], icon: ListChecks, color: "text-blue-500" },
  { label: "Build", range: [3, 5], icon: MousePointerClick, color: "text-orange-500" },
  { label: "Launch", range: [6, 7], icon: PartyPopper, color: "text-green-500" },
] as const;

function getPhaseForIndex(index: number) {
  return PHASES.find((p) => index >= p.range[0] && index <= p.range[1]);
}

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
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zerotowp.com" },
          { name: "Start Here" },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 sm:py-20 md:py-28 px-4">
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-100 opacity-40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-amber-100 opacity-40 blur-3xl" />

        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100/80 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-orange-700">
            <Rocket className="h-4 w-4" />
            Free Step-by-Step Guide
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Start Your WordPress{" "}
            <span className="text-[#f97316]">Journey</span>
          </h1>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl leading-relaxed">
            I&apos;ve been building WordPress sites for over 10 years. This is
            the exact learning path I wish I had when I started — no fluff,
            no overwhelm, just the steps that matter in the right order.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              {guides.length} guides
            </span>
            <span className="text-slate-300">|</span>
            <span>Beginner friendly</span>
            <span className="text-slate-300">|</span>
            <span>Free forever</span>
          </div>
          {guides.length > 0 && (
            <Link
              href={`/${guides[0].slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f97316] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-orange-500/25 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98] transition-all duration-200 mt-2"
            >
              Start with Step 1
              <ChevronRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </section>

      {/* How This Works — compact strip */}
      <section className="py-10 px-4 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: ListChecks,
                title: "Follow the steps in order",
                desc: "Each guide builds on the previous one",
              },
              {
                icon: MousePointerClick,
                title: "Learn by doing",
                desc: "Real screenshots, real examples, no theory",
              },
              {
                icon: PartyPopper,
                title: "Launch your site",
                desc: "You'll have a live WordPress site by the end",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Steps */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Your Learning Path
          </h2>
          <p className="text-slate-500 mb-10">
            {guides.length} steps from zero to a live WordPress site.
          </p>

          {guides.length === 0 ? (
            <p className="text-slate-500 text-center py-8">
              Guides coming soon!
            </p>
          ) : (
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-orange-200 to-green-200" />

              <ol className="space-y-3">
                {guides.map((post, index) => {
                  const phase = getPhaseForIndex(index);
                  const isFirstInPhase =
                    phase && index === phase.range[0];

                  return (
                    <li key={post._id}>
                      {/* Phase label */}
                      {isFirstInPhase && phase && (
                        <div className="flex items-center gap-3 mb-3 ml-12">
                          <phase.icon
                            className={`h-4 w-4 ${phase.color}`}
                          />
                          <span
                            className={`text-xs font-bold uppercase tracking-widest ${phase.color}`}
                          >
                            Phase: {phase.label}
                          </span>
                        </div>
                      )}

                      <Link
                        href={`/${post.slug}`}
                        className="group flex gap-4 bg-white border border-slate-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 relative"
                      >
                        {/* Number circle */}
                        <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-sm flex items-center justify-center group-hover:bg-orange-600 transition-colors shadow-sm shadow-orange-500/30">
                          {index + 1}
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#f97316] transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                          <span className="mt-1 text-sm font-medium text-orange-500 group-hover:text-orange-600 transition-colors inline-flex items-center gap-1">
                            Read guide
                            <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>

              {/* Completion badge */}
              <div className="flex items-center gap-3 mt-6 ml-1">
                <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm shadow-green-500/30">
                  <PartyPopper className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-700">
                    Congratulations!
                  </p>
                  <p className="text-xs text-slate-500">
                    Your WordPress site is live. Time to go deeper.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Go Deeper — with icons */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Go Deeper
            </h2>
            <p className="text-slate-500">
              Completed the learning path? Explore these topics to take your
              site to the next level.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HUB_LINKS.map(
              ({ label, href, description, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 hover:border-orange-200 hover:shadow-md hover:shadow-orange-100/50 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200"
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-xl ${color} flex items-center justify-center transition-transform group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold text-slate-900 group-hover:text-[#f97316] transition-colors">
                      {label}
                    </span>
                    <span className="text-xs text-slate-500 leading-relaxed">
                      {description}
                    </span>
                  </div>
                </Link>
              ),
            )}
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
