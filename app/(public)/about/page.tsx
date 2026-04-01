import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the team behind ZeroToWP. We build and test WordPress sites hands-on, then share honest guides, reviews, and tutorials to help beginners succeed.",
  alternates: { canonical: "https://zerotowp.com/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">About ZeroToWP</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          ZeroToWP helps complete beginners build their first WordPress site with
          confidence. No jargon, no fluff — just clear, tested advice.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Our Mission</h2>
        <p className="text-slate-600 mb-6">
          We believe everyone deserves an honest, beginner-friendly resource for learning
          WordPress. The web is full of outdated tutorials and biased reviews. We set out
          to create something better: guides that are accurate, up to date, and written by
          people who actually use the tools they recommend.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Who We Are</h2>
        <p className="text-slate-600 mb-6">
          ZeroToWP is run by WordPress enthusiasts with years of experience building,
          managing, and optimizing WordPress sites. We have launched dozens of sites, tested
          hundreds of plugins, and migrated more hosting accounts than we can count.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Our Approach</h2>
        <p className="text-slate-600 mb-6">
          Every guide on this site is based on hands-on experience. We install the plugins,
          run the speed tests, and configure the settings ourselves before writing a single
          word. When we recommend a product, it is because we have used it and believe it
          delivers real value.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Meet the Founder</h2>
          <div className="flex flex-col md:flex-row gap-6 items-start not-prose">
            <img
              src="/images/team/marvin.webp"
              alt="Marvin — Founder & Developer"
              width={160}
              height={160}
              className="rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-1">Marvin</h3>
              <p className="text-sm text-orange-500 font-medium mb-3">Founder &amp; Developer</p>
              <p className="text-slate-600 mb-3">
                Marvin is a Dutch web developer and digital entrepreneur who builds tools and resources to help
                people get started online. From travel guides to hosting reviews, VPN comparisons to WordPress
                tutorials — he creates practical, honest content based on hands-on testing and real experience.
              </p>
              <p className="text-slate-600">
                When he&apos;s not coding, you&apos;ll find him exploring Southeast Asia or testing the latest
                web technologies for his growing network of niche websites.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">How We Make Money</h2>
        <p className="text-slate-600">
          Some links on this site are affiliate links, which means we may earn a small
          commission if you make a purchase through them. This never affects our editorial
          independence or the honesty of our reviews. Read our{" "}
          <a href="/affiliate-disclosure" className="text-orange-500 hover:text-orange-600 underline">
            affiliate disclosure
          </a>{" "}
          for full details.
        </p>
      </div>
    </div>
  );
}
