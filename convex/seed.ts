import { internalMutation } from "./_generated/server";

// Clear all data from all tables
export const clearAll = internalMutation({
  args: {},
  handler: async (ctx) => {
    const tables = ["posts", "reviews", "deals", "clusters", "pages", "subscribers", "media"] as const;
    for (const table of tables) {
      const docs = await ctx.db.query(table).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
    }
    return { message: "All data cleared" };
  },
});

export const seed = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // -------------------------
    // 1. Create clusters
    // -------------------------
    const gettingStartedClusterId = await ctx.db.insert("clusters", {
      name: "Getting Started",
      slug: "getting-started",
      description:
        "Everything you need to launch your first WordPress website from scratch.",
      sortOrder: 1,
    });

    const hostingClusterId = await ctx.db.insert("clusters", {
      name: "WordPress Hosting",
      slug: "wordpress-hosting",
      description:
        "Compare the best WordPress hosting providers and find the right plan for your needs.",
      sortOrder: 2,
    });

    // -------------------------
    // 2. Create posts
    // -------------------------

    // Pillar post – Getting Started
    const pillarPostId = await ctx.db.insert("posts", {
      title: "How to Make a WordPress Website (Complete Guide)",
      slug: "how-to-make-a-wordpress-website",
      excerpt:
        "The complete step-by-step guide to building your first WordPress website — from choosing a domain to going live.",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><h2>Step 1: Choose a Domain Name</h2><p>Your domain name is your website address. Choose something short, memorable, and relevant to your niche.</p><h2>Step 2: Pick a Hosting Provider</h2><p>Reliable hosting is the foundation of every fast website. We recommend starting with a managed WordPress host.</p><h2>Step 3: Install WordPress</h2><p>Most hosts offer a one-click WordPress installer. Follow the prompts and you'll have WordPress running in minutes.</p><h2>Step 4: Choose a Theme</h2><p>Browse the free theme directory or invest in a premium theme for more flexibility and support.</p><h2>Step 5: Install Essential Plugins</h2><p>Add an SEO plugin, a caching plugin, and a security plugin to get your site production-ready.</p>",
      category: "start-here",
      tags: ["wordpress", "beginner", "guide"],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "seed",
      authorName: "ZTW Team",
      clusterId: gettingStartedClusterId,
      clusterRole: "pillar",
      learningPathOrder: 0,
    });

    // Supporting post 1
    const domainPostId = await ctx.db.insert("posts", {
      title: "How to Choose a Domain Name",
      slug: "how-to-choose-a-domain-name",
      excerpt:
        "Learn how to pick the perfect domain name for your WordPress website — tips, tools, and common mistakes to avoid.",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><h2>Step 1: Brainstorm Keywords</h2><p>Think about the main topic of your website and list relevant keywords. Your domain should reflect what your site is about.</p><h2>Step 2: Keep It Short and Simple</h2><p>Short domains are easier to type and remember. Aim for under 15 characters if possible.</p><h2>Step 3: Choose the Right Extension</h2><p>.com is still the gold standard, but country-code TLDs and newer extensions like .io can work well for specific niches.</p><h2>Step 4: Check Availability</h2><p>Use a domain registrar like Namecheap or Google Domains to check whether your desired name is available.</p>",
      category: "start-here",
      tags: ["domain", "wordpress", "beginner"],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "seed",
      authorName: "ZTW Team",
      clusterId: gettingStartedClusterId,
      clusterRole: "supporting",
      learningPathOrder: 1,
    });

    // Supporting post 2
    const installPostId = await ctx.db.insert("posts", {
      title: "How to Install WordPress",
      slug: "how-to-install-wordpress",
      excerpt:
        "A beginner-friendly walkthrough for installing WordPress on any hosting provider in under 10 minutes.",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><h2>Step 1: Log In to Your Hosting Control Panel</h2><p>Access cPanel or your host's custom dashboard. Look for a WordPress or Softaculous installer.</p><h2>Step 2: Run the One-Click Installer</h2><p>Fill in your site name, admin username, and password. Click install and wait a minute or two.</p><h2>Step 3: Log In to WordPress</h2><p>Navigate to yourdomain.com/wp-admin and log in with the credentials you just created.</p><h2>Step 4: Complete the Setup Wizard</h2><p>Choose a theme, create your first page, and configure your general settings before launching.</p>",
      category: "start-here",
      tags: ["install", "wordpress", "beginner"],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "seed",
      authorName: "ZTW Team",
      clusterId: gettingStartedClusterId,
      clusterRole: "supporting",
      learningPathOrder: 2,
    });

    // Hosting pillar post
    const hostingPostId = await ctx.db.insert("posts", {
      title: "How to Choose WordPress Hosting",
      slug: "how-to-choose-wordpress-hosting",
      excerpt:
        "Not all hosting is created equal. Here's how to find the best WordPress hosting for your budget and goals.",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><h2>Step 1: Understand the Types of Hosting</h2><p>Shared, VPS, dedicated, and managed WordPress hosting each come with different price points and performance levels.</p><h2>Step 2: Evaluate Performance</h2><p>Look for hosts that offer SSD storage, a CDN, and solid uptime guarantees (99.9% or higher).</p><h2>Step 3: Consider Support Quality</h2><p>24/7 live chat or phone support is essential when you run into issues, especially as a beginner.</p><h2>Step 4: Compare Pricing</h2><p>Introductory prices can be misleading. Always check renewal rates before committing to a long-term plan.</p>",
      category: "hosting",
      tags: ["hosting", "wordpress", "comparison"],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "seed",
      authorName: "ZTW Team",
      clusterId: hostingClusterId,
      clusterRole: "pillar",
    });

    // -------------------------
    // 3. Update clusters with pillarPostId
    // -------------------------
    await ctx.db.patch(gettingStartedClusterId, { pillarPostId: pillarPostId });
    await ctx.db.patch(hostingClusterId, { pillarPostId: hostingPostId });

    // -------------------------
    // 4. Set relatedPosts on supporting posts
    // -------------------------
    await ctx.db.patch(domainPostId, {
      relatedPosts: [pillarPostId, installPostId],
    });
    await ctx.db.patch(installPostId, {
      relatedPosts: [pillarPostId, domainPostId],
    });

    // -------------------------
    // 5. Create reviews
    // -------------------------
    await ctx.db.insert("reviews", {
      title: "Bluehost Review: Is It Worth It for WordPress?",
      slug: "bluehost-review",
      excerpt:
        "An honest look at Bluehost's WordPress hosting plans — performance, support, pricing, and who it's best for.",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><h2>Performance</h2><p>Bluehost delivers solid page-load times on shared plans, especially with their built-in CDN integration.</p><h2>Support</h2><p>24/7 live chat is available, though wait times can vary. The knowledge base is extensive for self-service troubleshooting.</p><h2>Pricing</h2><p>Bluehost's introductory prices start very low, making it one of the most affordable entry points for new WordPress sites.</p><h2>Verdict</h2><p>Bluehost is a great choice for beginners who want an affordable, WordPress-friendly host with decent support.</p>",
      rating: 4,
      pros: ["Affordable", "Easy setup", "Free domain"],
      cons: ["Limited storage on basic plan"],
      affiliateLink: "https://example.com/bluehost",
      affiliateLabel: "Get Bluehost",
      productName: "Bluehost",
      category: "hosting",
      tags: ["hosting", "bluehost", "review"],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "seed",
      authorName: "ZTW Team",
    });

    await ctx.db.insert("reviews", {
      title: "SiteGround Review: Premium Hosting Worth the Price?",
      slug: "siteground-review",
      excerpt:
        "SiteGround is known for its exceptional support and fast servers. Here's our full review of their WordPress hosting.",
      content:
        "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><h2>Performance</h2><p>SiteGround's custom-built caching and Google Cloud infrastructure deliver consistently fast load times across all plans.</p><h2>Support</h2><p>SiteGround's support team is widely regarded as one of the best in the industry, with quick response times around the clock.</p><h2>Pricing</h2><p>Initial pricing is competitive, though renewal rates are notably higher — factor this into your long-term budget.</p><h2>Verdict</h2><p>SiteGround earns its reputation as a premium host. It's ideal for sites where performance and support are top priorities.</p>",
      rating: 5,
      pros: ["Excellent support", "Fast servers", "Free SSL"],
      cons: ["Higher renewal prices"],
      affiliateLink: "https://example.com/siteground",
      affiliateLabel: "Get SiteGround",
      productName: "SiteGround",
      category: "hosting",
      tags: ["hosting", "siteground", "review"],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "seed",
      authorName: "ZTW Team",
    });

    // -------------------------
    // 6. Create deals
    // -------------------------
    await ctx.db.insert("deals", {
      title: "Bluehost — 70% Off Hosting",
      description:
        "Get started with Bluehost's shared WordPress hosting at 70% off. Includes a free domain for the first year.",
      provider: "Bluehost",
      category: "hosting",
      discountPercentage: 70,
      couponCode: "STARTER70",
      affiliateLink: "https://example.com/bluehost-deal",
      isActive: true,
      sortOrder: 1,
    });

    await ctx.db.insert("deals", {
      title: "SiteGround — 80% Off Hosting",
      description:
        "SiteGround's biggest discount of the year. Grab managed WordPress hosting at 80% off regular price.",
      provider: "SiteGround",
      category: "hosting",
      discountPercentage: 80,
      affiliateLink: "https://example.com/siteground-deal",
      isActive: true,
      sortOrder: 2,
    });

    await ctx.db.insert("deals", {
      title: "WP Engine — 20% Off Managed Hosting",
      description:
        "WP Engine's premium managed WordPress hosting at 20% off. Perfect for high-traffic and business sites.",
      provider: "WP Engine",
      category: "hosting",
      discountPercentage: 20,
      affiliateLink: "https://example.com/wpengine-deal",
      isActive: true,
      sortOrder: 3,
    });

    return {
      message: "Seed complete",
      clusters: 2,
      posts: 4,
      reviews: 2,
      deals: 3,
    };
  },
});
