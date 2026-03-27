import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";
import { Newspaper } from "lucide-react";

export const metadata: Metadata = {
  title: "WordPress News — Latest Updates & Releases",
  description:
    "Stay up to date with the latest WordPress news, plugin updates, security patches, and industry trends. Your daily dose of WordPress.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const posts = await fetchQuery(api.posts.listPublished, {
    category: "news",
  });

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-orange-50 py-12 px-4 border-b">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 mb-4">
            <Newspaper className="w-6 h-6" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
            WordPress News
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            The latest WordPress updates, plugin releases, security patches, and
            industry news — curated for site owners and developers.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg mb-2">No news yet.</p>
            <p className="text-slate-400 text-sm">
              Check back soon — we publish WordPress news regularly.
            </p>
          </div>
        ) : (
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
        )}
      </section>
    </>
  );
}
