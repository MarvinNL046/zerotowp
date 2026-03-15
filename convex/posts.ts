import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { validateSlug } from "./lib/reservedSlugs";

// Queries

export const listPublished = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, { category, limit }) => {
    let posts = await ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .order("desc")
      .collect();

    if (category !== undefined) {
      posts = posts.filter((p) => p.category === category);
    }

    if (limit !== undefined) {
      posts = posts.slice(0, limit);
    }

    return posts;
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const getByCluster = query({
  args: {
    clusterId: v.id("clusters"),
  },
  handler: async (ctx, { clusterId }) => {
    const posts = await ctx.db
      .query("posts")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", clusterId))
      .collect();

    return posts.filter((p) => p.status === "published");
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});

export const getById = query({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

// Mutations

export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    featuredImage: v.optional(v.id("_storage")),
    status: v.string(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
    clusterRole: v.optional(v.string()),
    learningPathOrder: v.optional(v.number()),
    relatedPosts: v.optional(v.array(v.id("posts"))),
  },
  handler: async (ctx, args) => {
    validateSlug(args.slug);
    const now = Date.now();
    const publishedAt = args.status === "published" ? now : undefined;

    return await ctx.db.insert("posts", {
      ...args,
      publishedAt,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    featuredImage: v.optional(v.id("_storage")),
    status: v.optional(v.string()),
    author: v.optional(v.string()),
    authorName: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
    clusterRole: v.optional(v.string()),
    learningPathOrder: v.optional(v.number()),
    relatedPosts: v.optional(v.array(v.id("posts"))),
  },
  handler: async (ctx, { id, ...fields }) => {
    if (fields.slug !== undefined) {
      validateSlug(fields.slug);
    }
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Post with id ${id} not found`);
    }

    const now = Date.now();

    // Set publishedAt on first publish
    let publishedAt: number | undefined = undefined;
    if (fields.status === "published" && existing.publishedAt === undefined) {
      publishedAt = now;
    }

    // Filter out undefined values to avoid unsetting fields
    const updates = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, {
      ...updates,
      ...(publishedAt !== undefined ? { publishedAt } : {}),
      updatedAt: now,
    });
  },
});

export const remove = mutation({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
