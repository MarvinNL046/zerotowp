import { internalMutation } from "./_generated/server";

export const seedThemesCluster = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-themes"))
      .first();

    if (existing) {
      return { message: "Cluster already exists", id: existing._id };
    }

    const id = await ctx.db.insert("clusters", {
      name: "WordPress Themes",
      slug: "wordpress-themes",
      description:
        "Everything about WordPress themes — from free options to premium page builders. Find the perfect theme for your site.",
      sortOrder: 4,
    });
    return { message: "Created wordpress-themes cluster", id };
  },
});
