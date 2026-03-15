import { internalMutation } from "./_generated/server";

export const seedSpeedCluster = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("clusters").withIndex("by_slug", (q) => q.eq("slug", "wordpress-speed")).first();
    if (existing) return { message: "Cluster already exists", id: existing._id };
    const id = await ctx.db.insert("clusters", {
      name: "WordPress Speed",
      slug: "wordpress-speed",
      description: "Make your WordPress site lightning fast. Caching, image optimization, CDN setup, and performance guides.",
      sortOrder: 7,
    });
    return { message: "Created wordpress-speed cluster", id };
  },
});
