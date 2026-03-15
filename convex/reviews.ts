import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { validateSlug } from "./lib/reservedSlugs";

// Queries

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("reviews")
      .withIndex("by_status", (q) => q.eq("status", "published"));

    const results = await q.order("desc").collect();

    const filtered = args.category
      ? results.filter((r) => r.category === args.category)
      : results;

    return args.limit ? filtered.slice(0, args.limit) : filtered;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getByCluster = query({
  args: { clusterId: v.id("clusters") },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", args.clusterId))
      .collect();

    return reviews.filter((r) => r.status === "published");
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Mutations

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    rating: v.number(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    affiliateLink: v.string(),
    affiliateLabel: v.string(),
    productName: v.string(),
    productImage: v.optional(v.id("_storage")),
    category: v.string(),
    tags: v.array(v.string()),
    status: v.string(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
  },
  handler: async (ctx, args) => {
    validateSlug(args.slug);
    const now = Date.now();
    return await ctx.db.insert("reviews", {
      ...args,
      publishedAt: args.status === "published" ? now : undefined,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("reviews"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    rating: v.optional(v.number()),
    pros: v.optional(v.array(v.string())),
    cons: v.optional(v.array(v.string())),
    affiliateLink: v.optional(v.string()),
    affiliateLabel: v.optional(v.string()),
    productName: v.optional(v.string()),
    productImage: v.optional(v.id("_storage")),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    status: v.optional(v.string()),
    author: v.optional(v.string()),
    authorName: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
  },
  handler: async (ctx, args) => {
    if (args.slug !== undefined) {
      validateSlug(args.slug);
    }
    const { id, ...fields } = args;
    const now = Date.now();

    const existing = await ctx.db.get(id);
    if (!existing) throw new Error(`Review not found: ${id}`);

    const updates = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined)
    );

    // Set publishedAt on first publish
    if (
      updates.status === "published" &&
      existing.status !== "published" &&
      !existing.publishedAt
    ) {
      updates.publishedAt = now;
    }

    updates.updatedAt = now;

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
