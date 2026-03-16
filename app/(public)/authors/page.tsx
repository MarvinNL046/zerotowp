import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authors — ZeroToWP",
  description:
    "Meet the team behind ZeroToWP. Learn about our WordPress experience, testing methodology, and commitment to honest reviews.",
};

export default function AuthorsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-3">
        Meet the Team
      </h1>
      <p className="text-lg text-slate-600 mb-12">
        The people behind the guides, reviews, and tutorials on ZeroToWP.
      </p>

      {/* Author card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-16">
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-24" />
        <div className="px-8 pb-8 -mt-12">
          <div className="flex items-end gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-orange-500 shrink-0">
              M
            </div>
            <div className="pb-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-0">
                Marvin
              </h2>
              <p className="text-slate-500 text-sm">
                Founder &amp; Lead Writer
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Experience
              </h3>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  10+ years of WordPress experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  Builds and manages WordPress sites professionally
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  Tests every tool and plugin personally before recommending
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-0.5 shrink-0">
                    &#10003;
                  </span>
                  Based in the Netherlands
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Philosophy
              </h3>
              <blockquote className="border-l-4 border-orange-300 pl-4 text-slate-600 italic text-sm">
                &ldquo;Every guide on ZeroToWP is based on real experience, not
                recycled tips from other blogs. I only recommend products
                I&apos;ve actually used and believe in.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      {/* Our approach */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Our Approach
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "First-Hand Testing",
              description:
                "We install every plugin, configure every setting, and run every test ourselves. Nothing gets published without hands-on experience.",
            },
            {
              title: "Honest Reviews",
              description:
                "We highlight both strengths and weaknesses. If a product has issues, we say so — even if it means missing out on a commission.",
            },
            {
              title: "Regular Updates",
              description:
                "WordPress evolves fast. We revisit our guides regularly to keep them accurate and up to date with the latest versions.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 p-6"
            >
              <h3 className="font-semibold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why trust us */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Why Trust Us
        </h2>
        <div className="prose prose-slate max-w-none">
          <ul className="text-slate-600 space-y-2">
            <li>
              <strong>We use the products we recommend.</strong> Our reviews are
              based on real-world usage, not spec sheets or press releases.
            </li>
            <li>
              <strong>We disclose affiliate relationships.</strong> When a link
              earns us a commission, we say so. Our editorial opinions are never
              for sale.
            </li>
            <li>
              <strong>We correct errors.</strong> If we get something wrong, we
              fix it fast and transparently. Accuracy matters more than pride.
            </li>
          </ul>
        </div>
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-4">
        <Link
          href="/editorial-policy"
          className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Editorial Policy
        </Link>
        <Link
          href="/how-we-test"
          className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          How We Test
        </Link>
        <Link
          href="/affiliate-disclosure"
          className="inline-flex items-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Affiliate Disclosure
        </Link>
      </div>
    </div>
  );
}
