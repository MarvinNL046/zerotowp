"use client";

import Link from "next/link";
import NewsletterForm from "@/components/layout/newsletter-form";

const popularGuides = [
  { label: "How to Start a Blog", href: "/start-a-blog" },
  { label: "Choose WordPress Hosting", href: "/wordpress-hosting" },
  { label: "Install WordPress", href: "/how-to-install-wordpress" },
  { label: "Best WordPress Plugins", href: "/wordpress-plugins" },
  { label: "WordPress SEO Guide", href: "/wordpress-seo" },
];

export default function Sidebar() {
  return (
    <div className="w-full sticky top-20 space-y-6">
      {/* Start Here CTA */}
      <div className="bg-orange-500 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-2">New to WordPress?</h2>
        <p className="text-sm text-orange-100 mb-4">
          Learn everything you need to build your first WordPress site — step by step.
        </p>
        <Link
          href="/start-here"
          className="inline-block bg-white text-orange-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors"
        >
          Start Here →
        </Link>
      </div>

      {/* Popular Guides */}
      <div className="border border-slate-200 rounded-xl p-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
          Popular Guides
        </h2>
        <ul className="space-y-3">
          {popularGuides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="text-sm text-slate-700 hover:text-orange-600 transition-colors"
              >
                {guide.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="border border-slate-200 rounded-xl p-6 bg-slate-900">
        <h2 className="text-sm font-bold text-white uppercase tracking-wide mb-1">
          Stay in the Loop
        </h2>
        <p className="text-xs text-slate-400 mb-4">
          WordPress tips and tutorials, straight to your inbox.
        </p>
        <NewsletterForm source="sidebar" />
      </div>
    </div>
  );
}
