import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";
import ReviewCard from "@/components/reviews/review-card";

export const metadata: Metadata = {
  title: "Best WordPress Themes in 2026 — Free & Premium Options",
  description:
    "Find the perfect WordPress theme for your site. We review free and premium themes for speed, design, and beginner-friendliness.",
};

export default async function ThemesHubPage() {
  const [posts, reviews] = await Promise.all([
    fetchQuery(api.posts.listPublished, { category: "themes" }),
    fetchQuery(api.reviews.listPublished, { category: "themes" }),
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Best WordPress Themes in 2026 — Free &amp; Premium Options
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Your theme controls how your site looks and feels. We review the best free and
          premium WordPress themes so you can pick one that is fast, beautiful, and easy to customize.
        </p>
      </div>

      {reviews.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Theme Reviews</h2>
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
              />
            ))}
          </div>
        </section>
      )}

      {posts.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-6">Theme Guides</h2>
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
        <p className="text-slate-500 text-center py-16">Theme content coming soon!</p>
      )}
    </div>
  );
}
