import { internalMutation } from "./_generated/server";

export const seedErrorsCluster = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("clusters").withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors")).first();
    if (existing) return { message: "Cluster already exists", id: existing._id };
    const id = await ctx.db.insert("clusters", {
      name: "WordPress Errors",
      slug: "wordpress-errors",
      description: "Fix common WordPress errors fast. Step-by-step solutions for the most frustrating WordPress problems.",
      sortOrder: 9,
    });
    return { message: "Created wordpress-errors cluster", id };
  },
});
