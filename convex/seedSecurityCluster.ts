import { internalMutation } from "./_generated/server";

export const seedSecurityCluster = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("clusters").withIndex("by_slug", (q) => q.eq("slug", "wordpress-security")).first();
    if (existing) return { message: "Cluster already exists", id: existing._id };
    const id = await ctx.db.insert("clusters", {
      name: "WordPress Security",
      slug: "wordpress-security",
      description: "Protect your WordPress site from hackers and malware. Firewalls, SSL, login security, and malware removal guides.",
      sortOrder: 8,
    });
    return { message: "Created wordpress-security cluster", id };
  },
});
