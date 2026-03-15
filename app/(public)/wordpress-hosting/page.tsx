import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";
import ReviewCard from "@/components/reviews/review-card";

export const metadata: Metadata = {
  title: "Best WordPress Hosting in 2026 — Honest Picks for Beginners",
  description:
    "Compare the best WordPress hosting providers for beginners. We tested them all so you can pick the right host for your site and budget.",
};

const reviewImageMap: Record<string, string> = {
  "siteground-review": "/screenshots/siteground-wordpress-hosting.webp",
  "bluehost-review": "/screenshots/bluehost-wordpress-hosting.webp",
  "hostinger-review": "/screenshots/hostinger-wordpress-hosting.webp",
};

export default async function HostingHubPage() {
  const [posts, reviews] = await Promise.all([
    fetchQuery(api.posts.listPublished, { category: "hosting" }),
    fetchQuery(api.reviews.listPublished, { category: "hosting" }),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Best WordPress Hosting in 2026 — Honest Picks for Beginners
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Choosing the right host is the most important decision for your WordPress site.
          We have tested every major provider so you do not have to. Here are our honest
          recommendations based on real performance data.
        </p>
      </div>

      {reviews.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">WordPress Hosting Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review: Doc<"reviews">) => (
              <ReviewCard
                key={review._id}
                title={review.title}
                slug={review.slug}
                productName={review.productName}
                rating={review.rating}
                excerpt={review.excerpt}
                category={review.category}
                featuredImageUrl={reviewImageMap[review.slug]}
              />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">WordPress Hosting Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </section>
      )}

      {posts.length === 0 && reviews.length === 0 && (
        <p className="text-slate-500 text-center py-16">Hosting content coming soon!</p>
      )}
    </div>
  );
}
