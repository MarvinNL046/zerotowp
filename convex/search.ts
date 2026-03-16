import { query } from "./_generated/server";
import { v } from "convex/values";

export const searchContent = query({
  args: { query: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { query: searchQuery, limit = 10 }) => {
    if (!searchQuery || searchQuery.length < 2) return [];

    const q = searchQuery.toLowerCase();

    const [posts, reviews] = await Promise.all([
      ctx.db
        .query("posts")
        .withIndex("by_status", (idx) => idx.eq("status", "published"))
        .collect(),
      ctx.db
        .query("reviews")
        .withIndex("by_status", (idx) => idx.eq("status", "published"))
        .collect(),
    ]);

    const results = [
      ...posts.map((p) => ({ ...p, type: "post" as const })),
      ...reviews.map((r) => ({ ...r, type: "review" as const })),
    ]
      .map((item) => {
        let score = 0;
        const title = item.title.toLowerCase();
        const excerpt = (item.excerpt || "").toLowerCase();
        const tags = (item.tags || []).map((t) => t.toLowerCase());

        if (title.includes(q)) score += 10;
        if (title.startsWith(q)) score += 5;
        if (excerpt.includes(q)) score += 3;
        if (tags.some((t) => t.includes(q))) score += 5;

        return {
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          category: item.category,
          type: item.type,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return results;
  },
});
