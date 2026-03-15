import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";

export const metadata: Metadata = {
  title: "WordPress Tutorials — Step-by-Step Guides for Beginners",
  description:
    "Practical WordPress tutorials covering speed optimization, backups, security, WooCommerce, blogging, and email setup. Follow along step by step.",
};

export default async function TutorialsHubPage() {
  const posts = await fetchQuery(api.posts.listPublished, {
    category: "tutorials",
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          WordPress Tutorials — Step-by-Step Guides
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Practical guides you can follow along with. Speed up your site, set up
          backups, secure WordPress, launch an online store, start a blog, and
          fix your email — all step by step.
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
        <p className="text-slate-500 text-center py-16">
          Tutorials coming soon!
        </p>
      )}
    </div>
  );
}
