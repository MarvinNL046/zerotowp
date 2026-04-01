import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import CategoryFilter from "@/components/blog/category-filter";
import PostCard from "@/components/blog/post-card";
import InlineAd from "@/components/ads/inline-ad";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "https://zerotowp.com/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const posts = await fetchQuery(api.posts.listPublished, { category });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog</h1>
        <CategoryFilter activeCategory={category} />
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-500 text-center py-16">No posts found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: Doc<"posts"> & { featuredImageUrl?: string | null }) => (
              <PostCard
                key={post._id}
                post={{
                  title: post.title,
                  slug: post.slug,
                  excerpt: post.excerpt,
                  category: post.category,
                  publishedAt: post.publishedAt,
                  featuredImageUrl: post.featuredImageUrl || `/images/blog/${post.slug}.webp`,
                }}
              />
            ))}
          </div>
          <InlineAd />
        </>
      )}
    </div>
  );
}
