import { internalMutation } from "./_generated/server";

// Spread articles across Jan 15 - Mar 15 2026 in a realistic publishing order
const POST_DATES: Record<string, string> = {
  // Getting Started cluster — published first (mid-Jan)
  "how-to-make-a-wordpress-website": "2026-01-15",
  "what-is-wordpress": "2026-01-17",
  "wordpress-com-vs-wordpress-org": "2026-01-20",
  "install-wordpress": "2026-01-22",
  "how-to-install-wordpress": "2026-01-24",
  "how-to-choose-a-domain-name": "2026-01-27",
  "cost-to-build-wordpress-site": "2026-01-30",
  "wordpress-dashboard-explained": "2026-02-01",

  // Hosting cluster — early Feb
  "how-to-choose-wordpress-hosting": "2026-02-03",
  "cheap-wordpress-hosting": "2026-02-05",
  "bluehost-vs-siteground": "2026-02-07",
  "managed-wordpress-hosting": "2026-02-10",
  "wordpress-vs-wix": "2026-02-12",
  "migrate-wordpress-to-new-host": "2026-02-14",

  // Plugins cluster — mid Feb
  "best-wordpress-plugins": "2026-02-17",
  "must-have-plugins-new-site": "2026-02-19",
  "best-seo-plugins": "2026-02-21",
  "best-contact-form-plugins": "2026-02-23",
  "best-caching-plugins": "2026-02-25",
  "best-security-plugins": "2026-02-27",
  "best-email-marketing-plugins": "2026-02-28",
  "best-code-snippet-plugins": "2026-03-01",
  "best-membership-plugins": "2026-03-02",
  "best-translation-plugins": "2026-03-03",
  "best-monetization-plugins": "2026-03-04",

  // Themes cluster — late Feb / early Mar
  "best-wordpress-themes": "2026-03-01",
  "best-free-wordpress-themes": "2026-03-02",
  "astra-theme-review": "2026-03-03",
  "elementor-vs-divi": "2026-03-04",
  "generatepress-vs-astra": "2026-03-05",
  "how-to-choose-wordpress-theme": "2026-03-06",

  // SEO cluster — early Mar
  "wordpress-seo-guide": "2026-03-07",
  "is-wordpress-good-for-seo": "2026-03-08",
  "improve-wordpress-seo": "2026-03-08",
  "wordpress-seo-checklist": "2026-03-09",
  "yoast-vs-rank-math": "2026-03-10",
  "install-google-analytics-wordpress": "2026-03-10",
  "keyword-research-beginners": "2026-03-11",
  "write-blog-post-that-ranks": "2026-03-12",

  // Tutorials cluster — most recent
  "speed-up-wordpress": "2026-03-12",
  "wordpress-backup-guide": "2026-03-13",
  "wordpress-security-guide": "2026-03-13",
  "create-online-store-wordpress": "2026-03-14",
  "start-a-blog": "2026-03-14",
  "wordpress-email-setup": "2026-03-15",

  // Speed cluster — spread through Feb-Mar
  "wordpress-speed-optimization": "2026-02-08",
  "core-web-vitals-wordpress": "2026-02-11",
  "best-image-optimization-plugins": "2026-02-13",
  "setup-cloudflare-cdn-wordpress": "2026-02-16",
  "wordpress-database-optimization": "2026-02-18",
  "wordpress-lazy-loading": "2026-02-20",

  // Errors cluster — spread through Mar
  "common-wordpress-errors": "2026-03-05",
  "fix-white-screen-of-death": "2026-03-06",
  "fix-error-establishing-database-connection": "2026-03-07",
  "fix-500-internal-server-error": "2026-03-08",
  "fix-wordpress-memory-exhausted-error": "2026-03-09",
  "fix-too-many-redirects": "2026-03-10",

  // Security cluster — spread through Feb-Mar
  "wordpress-security-complete-guide": "2026-02-22",
  "setup-ssl-wordpress": "2026-02-24",
  "best-wordpress-firewall-plugins": "2026-02-26",
  "remove-malware-wordpress": "2026-02-28",
  "wordpress-login-security": "2026-03-02",
  "wordpress-file-permissions": "2026-03-04",
};

const REVIEW_DATES: Record<string, string> = {
  "bluehost-review": "2026-02-04",
  "siteground-review": "2026-02-06",
  "hostinger-review": "2026-02-08",
};

export const shufflePostDates = internalMutation({
  args: {},
  handler: async (ctx) => {
    let updated = 0;

    // Update posts
    for (const [slug, dateStr] of Object.entries(POST_DATES)) {
      const post = await ctx.db
        .query("posts")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (post) {
        const publishedAt = new Date(dateStr + "T09:00:00Z").getTime();
        await ctx.db.patch(post._id, { publishedAt, updatedAt: publishedAt });
        updated++;
      }
    }

    // Update reviews
    for (const [slug, dateStr] of Object.entries(REVIEW_DATES)) {
      const review = await ctx.db
        .query("reviews")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();
      if (review) {
        const publishedAt = new Date(dateStr + "T09:00:00Z").getTime();
        await ctx.db.patch(review._id, { publishedAt, updatedAt: publishedAt });
        updated++;
      }
    }

    return { message: `Updated ${updated} dates` };
  },
});
