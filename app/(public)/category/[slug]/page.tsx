import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import PostCard from "@/components/blog/post-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    title: `${categoryName} — ZeroToWP`,
    robots: { index: false, follow: true },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await fetchQuery(api.posts.listPublished, { category: slug });

  const categoryName = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900">{categoryName}</h1>
        <p className="text-slate-500 mt-2">{posts.length} post{posts.length !== 1 ? "s" : ""}</p>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-500 text-center py-16">No posts in this category yet.</p>
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
    </div>
  );
}
