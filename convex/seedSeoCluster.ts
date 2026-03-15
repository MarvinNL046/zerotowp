import { internalMutation } from "./_generated/server";

export const seedSeoCluster = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-seo"))
      .first();
    if (existing) return { message: "Cluster already exists", id: existing._id };
    const id = await ctx.db.insert("clusters", {
      name: "WordPress SEO",
      slug: "wordpress-seo",
      description:
        "Learn WordPress SEO from zero to expert. Plugins, checklists, tips, and guides to rank higher on Google.",
      sortOrder: 5,
    });
    return { message: "Created wordpress-seo cluster", id };
  },
});
