import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "How to Speed Up WordPress — Complete Performance Guide",
  description:
    "Make your WordPress site faster with these proven optimization techniques. Caching, image optimization, hosting tips, and more.",
};

export default async function SpeedHubPage() {
  const posts = await fetchQuery(api.posts.listPublished, { category: "speed" });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          How to Speed Up WordPress — Complete Performance Guide
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          A slow site loses visitors and rankings. Learn how to make your WordPress site
          lightning fast with caching, image optimization, and smart hosting choices.
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
        <p className="text-slate-500 text-center py-16">Speed optimization content coming soon!</p>
      )}
    </div>
  );
}
