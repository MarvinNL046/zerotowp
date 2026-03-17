import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "WordPress Errors — Fix Common Problems Fast",
  description:
    "Step-by-step solutions for the most common WordPress errors. White Screen of Death, database errors, 500 errors, and more — all fixed in plain English.",
};

export default async function ErrorsHubPage() {
  const posts = await fetchQuery(api.posts.listPublished, { category: "errors" });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          WordPress Errors — Fix Common Problems Fast
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          WordPress errors look scary, but most have simple fixes. Follow these step-by-step
          guides to get your site back up and running in minutes, not hours.
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
        <p className="text-slate-500 text-center py-16">Error troubleshooting guides coming soon!</p>
      )}
    </div>
  );
}
