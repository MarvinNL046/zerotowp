import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Queries

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const terms = await ctx.db.query("glossary").collect();
    return terms.sort((a, b) =>
      a.term.toLowerCase().localeCompare(b.term.toLowerCase())
    );
  },
});

export const getBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("glossary")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const listByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, { category }) => {
    const terms = await ctx.db
      .query("glossary")
      .withIndex("by_category", (q) => q.eq("category", category))
      .collect();
    return terms.sort((a, b) =>
      a.term.toLowerCase().localeCompare(b.term.toLowerCase())
    );
  },
});

// Mutations

export const create = mutation({
  args: {
    term: v.string(),
    slug: v.string(),
    shortDefinition: v.string(),
    content: v.string(),
    relatedTerms: v.array(v.string()),
    relatedArticles: v.array(v.string()),
    category: v.string(),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("glossary", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("glossary"),
    term: v.optional(v.string()),
    slug: v.optional(v.string()),
    shortDefinition: v.optional(v.string()),
    content: v.optional(v.string()),
    relatedTerms: v.optional(v.array(v.string())),
    relatedArticles: v.optional(v.array(v.string())),
    category: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...fields }) => {
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error(`Glossary term with id ${id} not found`);
    }

    const updates = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined)
    );

    await ctx.db.patch(id, updates);
  },
});

export const remove = mutation({
  args: {
    id: v.id("glossary"),
  },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
