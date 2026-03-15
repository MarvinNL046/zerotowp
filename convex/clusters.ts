import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("clusters").order("asc").collect();
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getById = query({
  args: { id: v.id("clusters") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getWithContent = query({
  args: { id: v.id("clusters") },
  handler: async (ctx, args) => {
    const cluster = await ctx.db.get(args.id);
    if (!cluster) return null;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", args.id))
      .collect();

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", args.id))
      .collect();

    return { cluster, posts, reviews };
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    pillarPostId: v.optional(v.id("posts")),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clusters", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("clusters"),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    description: v.optional(v.string()),
    pillarPostId: v.optional(v.id("posts")),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const updates = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined)
    );
    return await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("clusters") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
