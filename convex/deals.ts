import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listActive = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("deals")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .order("asc")
      .collect();
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("deals").collect();
  },
});

export const getById = query({
  args: { id: v.id("deals") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    provider: v.string(),
    category: v.string(),
    discountPercentage: v.number(),
    couponCode: v.optional(v.string()),
    affiliateLink: v.string(),
    logo: v.optional(v.id("_storage")),
    isActive: v.boolean(),
    expiresAt: v.optional(v.number()),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("deals", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("deals"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    provider: v.optional(v.string()),
    category: v.optional(v.string()),
    discountPercentage: v.optional(v.number()),
    couponCode: v.optional(v.string()),
    affiliateLink: v.optional(v.string()),
    logo: v.optional(v.id("_storage")),
    isActive: v.optional(v.boolean()),
    expiresAt: v.optional(v.number()),
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
  args: { id: v.id("deals") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
