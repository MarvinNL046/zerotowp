import { v } from "convex/values";
import { query, mutation, internalMutation, action } from "./_generated/server";
import { makeFunctionReference } from "convex/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("subscribers").collect();
  },
});

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { id: existing._id, isNew: false };
    }

    const id = await ctx.db.insert("subscribers", {
      email: args.email,
      source: args.source,
      subscribedAt: Date.now(),
    });

    return { id, isNew: true };
  },
});

export const subscribeInternal = internalMutation({
  args: {
    email: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { id: existing._id, isNew: false };
    }

    const id = await ctx.db.insert("subscribers", {
      email: args.email,
      source: args.source,
      subscribedAt: Date.now(),
    });

    return { id, isNew: true };
  },
});

export const remove = mutation({
  args: { id: v.id("subscribers") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const subscribeAndEmail = action({
  args: { email: v.string(), source: v.string() },
  handler: async (ctx, args): Promise<{ id: string; isNew: boolean }> => {
    const result = await ctx.runMutation(
      makeFunctionReference<"mutation", { email: string; source: string }, { id: string; isNew: boolean }>("subscribers:subscribeInternal"),
      args
    );
    if (result.isNew) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ZeroToWP <hello@zerotowp.com>",
          to: args.email,
          subject: "Welcome to ZeroToWP!",
          html: "<h1>Welcome!</h1><p>Thanks for subscribing. We'll help you build your first WordPress site.</p>",
        }),
      });
    }
    return result;
  },
});
