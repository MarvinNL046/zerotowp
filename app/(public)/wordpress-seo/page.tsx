import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "WordPress SEO for Beginners — The Complete Guide",
  description:
    "Learn how to optimize your WordPress site for search engines. Step-by-step SEO guides written for beginners.",
  alternates: { canonical: "https://zerotowp.com/wordpress-seo" },
};

export default async function SeoHubPage() {
  const posts = await fetchQuery(api.posts.listPublished, { category: "seo" });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          WordPress SEO for Beginners — The Complete Guide
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Search engine optimization does not have to be complicated. These guides break down
          WordPress SEO into simple, actionable steps so your content gets found by the
          people who need it.
        </p>
      </div>

      {posts.length > 0 ? (
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
      ) : (
        <p className="text-slate-500 text-center py-16">SEO content coming soon!</p>
      )}
    </div>
  );
}
