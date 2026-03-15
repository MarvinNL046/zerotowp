import { internalMutation } from "./_generated/server";

export const seedTutorialsCluster = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "tutorials"))
      .first();

    if (existing) {
      return { message: "Cluster already exists", id: existing._id };
    }

    const id = await ctx.db.insert("clusters", {
      name: "WordPress Tutorials",
      slug: "tutorials",
      description:
        "Step-by-step WordPress tutorials covering speed, security, backups, eCommerce, blogging, and email setup.",
      sortOrder: 6,
    });
    return { message: "Created tutorials cluster", id };
  },
});
