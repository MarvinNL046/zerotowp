import { v } from "convex/values";
import { mutation, internalMutation, action } from "./_generated/server";
import { makeFunctionReference } from "convex/server";

// NOTE: newsletter subscriptions now live in the shared wetry-sites-leads
// backend (https://beaming-ermine-172.convex.site, site "zerotowp"). The
// functions below are deprecated and no longer called by the UI; they are
// kept only so old clients don't hard-crash. The public `list` query and
// `remove` mutation were removed (public mailing-list leak).

/** @deprecated Use the wetry-sites-leads HTTP API (POST /subscribe) instead. */
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

/** @deprecated Use the wetry-sites-leads HTTP API (POST /subscribe) instead. */
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

/** @deprecated Use the wetry-sites-leads HTTP API (POST /subscribe) instead. */
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
