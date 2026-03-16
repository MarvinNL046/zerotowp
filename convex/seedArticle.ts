import { internalMutation } from "./_generated/server";

export const seedWhatIsWordPress = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Check if article already exists
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", "what-is-wordpress"))
      .first();

    if (existing) {
      // Update existing
      await ctx.db.patch(existing._id, {
        content: articleContent,
        title: "What Is WordPress? A Beginner-Friendly Explanation",
        excerpt:
          "WordPress is the world's most popular website builder, powering over 40% of all websites. In this guide, I'll explain exactly what WordPress is, how it works, and why it's the best choice for beginners.",
        updatedAt: now,
      });
      return { message: "Updated existing article", id: existing._id };
    }

    // Find the Getting Started cluster
    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "getting-started"))
      .first();

    const id = await ctx.db.insert("posts", {
      title: "What Is WordPress? A Beginner-Friendly Explanation",
      slug: "what-is-wordpress",
      excerpt:
        "WordPress is the world's most popular website builder, powering over 40% of all websites. In this guide, I'll explain exactly what WordPress is, how it works, and why it's the best choice for beginners.",
      content: articleContent,
      category: "beginners-guide",
      tags: [
        "wordpress",
        "beginners",
        "what is wordpress",
        "cms",
        "website builder",
      ],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "marvin",
      authorName: "Marvin",
      seoTitle: "What Is WordPress? Everything Beginners Need to Know (2026)",
      seoDescription:
        "WordPress powers 40%+ of all websites. Learn what WordPress is, how it works, the difference between WordPress.org and WordPress.com, and why beginners love it.",
      clusterId: cluster?._id,
      clusterRole: "supporting" as const,
      learningPathOrder: 0,
    });

    return { message: "Article created", id };
  },
});

const articleContent = `
<p>If you've ever thought about building a website, you've probably heard the name <strong>WordPress</strong>. But what exactly is it? And why does everyone keep recommending it?</p>

<p>I've been building websites for over 20 years, and I've used dozens of different tools and platforms. WordPress is the one I keep coming back to — and for good reason. In this guide, I'll break down everything you need to know about WordPress in plain English.</p>

<h2>What Is WordPress?</h2>

<p>WordPress is a free, open-source <strong>content management system (CMS)</strong> that lets you create and manage websites without needing to write code from scratch. Think of it as the engine that powers your website — it handles everything from displaying your content to managing your pages, images, and settings.</p>

<p>Originally launched in 2003 as a simple blogging tool, WordPress has grown into a full-featured website builder that now powers <strong>over 43% of all websites on the internet</strong>. That's not just blogs — we're talking about everything from small business sites to major publications like Rolling Stone, Time Magazine, and even NASA.</p>

<img src="/screenshots/wordpress-org-homepage.webp" alt="The WordPress.org homepage showing the Meet WordPress heading and the Design, Build, Extend features" />

<p>That screenshot above is the official WordPress.org website. This is where you can download the WordPress software for free and access the entire ecosystem of themes and plugins.</p>

<h2>WordPress.org vs WordPress.com — The Important Difference</h2>

<p>This is the #1 thing that confuses beginners, so let me clear it up right away.</p>

<p>There are two "versions" of WordPress:</p>

<ul>
<li><strong>WordPress.org</strong> (self-hosted) — The free software you download and install on your own web hosting. You have full control over everything. This is what most people mean when they say "WordPress."</li>
<li><strong>WordPress.com</strong> (hosted) — A commercial service that hosts WordPress for you. It's easier to start with but comes with limitations and monthly fees for features you'd get for free with WordPress.org.</li>
</ul>

<p><strong>My recommendation:</strong> Go with WordPress.org (self-hosted). Yes, you need to buy hosting (starting at around $3/month), but you get complete freedom to customize your site however you want. I have a separate guide that goes deeper into <a href="/wordpress-com-vs-wordpress-org">WordPress.com vs WordPress.org</a> if you want the full comparison.</p>

<h2>What Can You Build with WordPress?</h2>

<p>When people hear "WordPress," they often think "blog." And while WordPress started as a blogging platform, it can now be used to build virtually any type of website:</p>

<ul>
<li><strong>Blogs and personal websites</strong> — WordPress's bread and butter</li>
<li><strong>Business websites</strong> — Company sites with contact forms, about pages, and service listings</li>
<li><strong>Online stores</strong> — With the WooCommerce plugin, you can sell physical and digital products</li>
<li><strong>Membership sites</strong> — Paid content, online courses, and community forums</li>
<li><strong>Portfolios</strong> — Showcase your work as a photographer, designer, or developer</li>
<li><strong>News and magazine sites</strong> — Multi-author publications with categories and editorial workflows</li>
</ul>

<p>If you can imagine a website, you can probably build it with WordPress.</p>

<h2>How WordPress Works — The Basics</h2>

<p>WordPress runs on a web server (your hosting provider) and uses a database to store all your content. When someone visits your website, WordPress pulls the right content from the database and displays it using your chosen theme.</p>

<p>Here's a simplified version of how it works:</p>

<ol>
<li><strong>You write content</strong> in the WordPress admin dashboard (also called "wp-admin")</li>
<li><strong>WordPress stores it</strong> in a database on your hosting server</li>
<li><strong>A visitor requests your page</strong> by typing your URL or clicking a link</li>
<li><strong>WordPress assembles the page</strong> using your content + your theme's design</li>
<li><strong>The visitor sees the finished page</strong> in their browser</li>
</ol>

<p>You never need to touch code unless you want to. Everything is managed through a visual admin panel:</p>

<img src="/screenshots/wordpress-admin-dashboard.webp" alt="The WordPress admin dashboard showing the welcome screen, sidebar menu with Posts, Media, Pages, and Settings options" />

<p>This is what the WordPress admin dashboard looks like. The left sidebar gives you access to everything: your posts, pages, media library, appearance settings, plugins, and more.</p>

<h2>The WordPress Block Editor</h2>

<p>When you create or edit a post or page in WordPress, you use the <strong>Block Editor</strong> (also called Gutenberg). It works like a visual builder where every piece of content — a paragraph, image, heading, button, or video — is a "block" that you can add, move, and customize.</p>

<img src="/screenshots/wordpress-block-editor.webp" alt="The WordPress block editor showing the post creation interface with title field, block chooser, and sidebar settings" />

<p>The block editor makes it easy to create professional-looking content without any design skills. You can drag and drop blocks, change their settings, and see exactly how your post will look before you publish it.</p>

<h2>Themes — Change How Your Site Looks</h2>

<p>One of the best things about WordPress is that you can completely change how your website looks by switching themes. A theme controls your site's design — colors, fonts, layout, everything.</p>

<p>The WordPress theme directory has over 14,000 free themes to choose from:</p>

<img src="/screenshots/wordpress-themes-directory.webp" alt="The WordPress.org themes directory showing over 14,000 free themes including Twenty Twenty-Five, Hello Elementor, and Astra" />

<p>You can browse themes by category, popularity, or features. Many themes are free, and premium themes with more features typically cost $50-100 as a one-time purchase. I recommend starting with a popular free theme like <strong>Astra</strong> or the default <strong>Twenty Twenty-Five</strong> theme, and upgrading later if you need more features.</p>

<h2>Plugins — Add Features to Your Site</h2>

<p>If themes control how your site looks, <strong>plugins</strong> control what your site can do. Plugins are add-ons that extend WordPress with new features — and there are over 61,000 free plugins available.</p>

<img src="/screenshots/wordpress-plugins-directory.webp" alt="The WordPress.org plugins directory showing over 61,000 free plugins including popular ones like Elementor, Yoast SEO, and WooCommerce" />

<p>Here are some common examples of what plugins can add to your site:</p>

<ul>
<li><strong>Yoast SEO</strong> — Helps you optimize your content for search engines</li>
<li><strong>WooCommerce</strong> — Turns your site into a full online store</li>
<li><strong>Contact Form 7</strong> — Adds contact forms to your pages</li>
<li><strong>LiteSpeed Cache</strong> — Makes your site load faster</li>
<li><strong>Elementor</strong> — A drag-and-drop page builder for custom layouts</li>
</ul>

<p>Installing a plugin takes about 30 seconds — you search for it in the WordPress admin, click "Install," and then "Activate." That's it. I cover the must-have plugins in my <a href="/wordpress-plugins">essential WordPress plugins guide</a>.</p>

<h2>Why I Recommend WordPress for Beginners</h2>

<p>After 20 years of building websites, here's why I still recommend WordPress to every beginner I talk to:</p>

<ul>
<li><strong>It's free.</strong> The WordPress software itself costs nothing. You only pay for hosting (a few dollars per month).</li>
<li><strong>No coding required.</strong> The block editor and themes let you build a professional site without touching a line of code.</li>
<li><strong>You own everything.</strong> Unlike Wix or Squarespace, your WordPress site is truly yours. You can move it, export it, and customize it however you want.</li>
<li><strong>Massive community.</strong> Millions of users, thousands of tutorials, and an active support community means you'll never get stuck without help.</li>
<li><strong>It grows with you.</strong> Start with a simple blog, add an online store later, integrate email marketing — WordPress scales from a hobby project to a full business.</li>
<li><strong>SEO-friendly out of the box.</strong> WordPress is built with clean code that search engines love. Add an SEO plugin and you're set.</li>
</ul>

<h2>Common Misconceptions About WordPress</h2>

<h3>Is WordPress only for blogs?</h3>
<p>No. While it started as a blogging tool, WordPress now powers every type of website imaginable. E-commerce stores, corporate sites, portfolios, forums — you name it.</p>

<h3>Is WordPress hard to learn?</h3>
<p>Not at all. Most beginners can set up their first WordPress site in under an hour. The basics (creating posts, adding images, choosing a theme) are genuinely intuitive. The learning curve only steepens when you want advanced customizations.</p>

<h3>Is WordPress secure?</h3>
<p>WordPress itself is very secure — it's maintained by a dedicated security team. Most security issues come from outdated plugins or weak passwords. Keep everything updated and use strong passwords, and you'll be fine. I cover this in detail in my <a href="/wordpress-security">WordPress security guide</a>.</p>

<h3>Is WordPress really free?</h3>
<p>The software is 100% free. But you'll need web hosting ($3-10/month) and a domain name (~$10/year). Some themes and plugins have premium versions, but you can build a fully functional site using only free tools.</p>

<h2>How to Get Started with WordPress</h2>

<p>Ready to build your first WordPress site? Here's the quick version:</p>

<ol>
<li><strong>Choose a hosting provider</strong> — I compare the best options in my <a href="/wordpress-hosting">WordPress hosting guide</a></li>
<li><strong>Install WordPress</strong> — Most hosts offer one-click installation (I walk through this in my <a href="/install-wordpress">installation guide</a>)</li>
<li><strong>Pick a theme</strong> — Browse the free theme directory and choose one that fits your style</li>
<li><strong>Add essential plugins</strong> — SEO, security, and performance basics</li>
<li><strong>Start creating content</strong> — Write your first post or page</li>
</ol>

<p>Or if you want the full step-by-step walkthrough, check out my <a href="/start-here">complete beginner's guide to WordPress</a>. It covers everything from zero to a live website. You can also browse our <a href="/tutorials">WordPress tutorials</a> for guided walkthroughs on installation, backups, SEO, and more.</p>

<h2>Frequently Asked Questions</h2>

<h3>How much does WordPress cost?</h3>
<p>The WordPress software is free. You'll need hosting ($3-10/month) and a domain name (~$10/year). Total first-year cost: roughly $50-130 depending on your hosting choice.</p>

<h3>Can I make money with a WordPress site?</h3>
<p>Absolutely. You can monetize through ads, affiliate marketing, selling products (with WooCommerce), offering services, creating online courses, or selling memberships. WordPress doesn't take any cut of your revenue.</p>

<h3>Do I need to know how to code?</h3>
<p>No. You can build a complete, professional website without writing a single line of code. The block editor, themes, and plugins handle everything visually.</p>

<h3>What's the difference between WordPress and website builders like Wix?</h3>
<p>WordPress gives you complete ownership and flexibility — you can customize anything and move your site anywhere. Website builders like Wix are easier to start with but lock you into their platform with limited customization. WordPress also has a much larger ecosystem of themes and plugins.</p>

<h3>How long does it take to build a WordPress site?</h3>
<p>A basic site can be up and running in under an hour. A more polished site with custom content, images, and optimized settings typically takes a weekend. A complex site with e-commerce, memberships, or custom features can take a few weeks.</p>
`;
