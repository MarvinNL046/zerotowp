import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "WordPress Security Guide — Protect Your Site the Smart Way",
  description:
    "Keep your WordPress site safe from hackers and malware. Practical security guides for beginners who want peace of mind.",
};

export default async function SecurityHubPage() {
  const posts = await fetchQuery(api.posts.listPublished, { category: "security" });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          WordPress Security Guide — Protect Your Site the Smart Way
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          WordPress security does not have to be scary. Follow these straightforward guides
          to protect your site from common threats, keep your data safe, and sleep well at night.
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
        <p className="text-slate-500 text-center py-16">Security content coming soon!</p>
      )}
    </div>
  );
}
