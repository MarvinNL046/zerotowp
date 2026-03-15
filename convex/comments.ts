import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listApproved = query({
  args: { postSlug: v.string() },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post_slug", (q) => q.eq("postSlug", args.postSlug))
      .collect();

    return comments
      .filter((c) => c.status === "approved")
      .sort((a, b) => a.createdAt - b.createdAt);
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("comments")
      .order("desc")
      .collect();
  },
});

export const countPending = query({
  args: {},
  handler: async (ctx) => {
    const pending = await ctx.db
      .query("comments")
      .withIndex("by_status", (q) => q.eq("status", "pending"))
      .collect();
    return pending.length;
  },
});

export const create = mutation({
  args: {
    postSlug: v.string(),
    parentId: v.optional(v.id("comments")),
    authorName: v.string(),
    authorEmail: v.string(),
    content: v.string(),
    notifyOnReply: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("comments", {
      postSlug: args.postSlug,
      parentId: args.parentId,
      authorName: args.authorName,
      authorEmail: args.authorEmail,
      content: args.content,
      status: "pending",
      notifyOnReply: args.notifyOnReply,
      createdAt: Date.now(),
    });
  },
});

export const approve = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "approved" });
  },
});

export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
