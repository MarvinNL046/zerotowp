import { internalMutation } from "./_generated/server";

// ─── Article 1: WordPress.com vs WordPress.org ────────────────────────────────

export const seedWordPressComVsOrg = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-com-vs-wordpress-org";

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        content: comVsOrgContent,
        title: "WordPress.com vs WordPress.org — What's the Difference?",
        excerpt:
          "Confused by WordPress.com and WordPress.org? I break down the key differences, pros and cons, pricing, and which one is right for you as a beginner.",
        updatedAt: now,
      });
      return { message: "Updated existing article", id: existing._id };
    }

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "getting-started"))
      .first();

    const id = await ctx.db.insert("posts", {
      title: "WordPress.com vs WordPress.org — What's the Difference?",
      slug,
      excerpt:
        "Confused by WordPress.com and WordPress.org? I break down the key differences, pros and cons, pricing, and which one is right for you as a beginner.",
      content: comVsOrgContent,
      category: "beginners-guide",
      tags: [
        "wordpress",
        "wordpress.com",
        "wordpress.org",
        "comparison",
        "beginners",
        "self-hosted",
        "hosted",
      ],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "marvin",
      authorName: "Marvin",
      seoTitle:
        "WordPress.com vs WordPress.org — Which One Should You Use? (2026)",
      seoDescription:
        "Confused by WordPress.com and WordPress.org? I break down the key differences, pros and cons, pricing, and which one is right for you as a beginner.",
      clusterId: cluster?._id,
      clusterRole: "supporting" as const,
    });

    return { message: "Article created", id };
  },
});

const comVsOrgContent = `
<p>When you first start researching WordPress, you quickly run into a confusing problem: there are two websites — WordPress.org and WordPress.com — and it's not obvious what the difference is. Are they the same thing? Do you need both? Which one should you use?</p>

<p>I've been building websites for over 20 years, and this is one of the most common questions I get from beginners. Let me clear it up once and for all.</p>

<h2>The Short Answer</h2>

<p>Here's my quick recommendation before we dive into the details:</p>

<ul>
<li><strong>Use WordPress.org</strong> if you want full control, flexibility, and the ability to grow your site into anything — blog, online store, membership site, portfolio.</li>
<li><strong>Use WordPress.com</strong> only if you want something extremely simple with zero technical setup, and you're okay with significant limitations.</li>
</ul>

<p>For almost everyone reading this, <strong>WordPress.org is the right choice</strong>. It takes about 15 minutes to set up, costs just a few dollars a month for hosting, and gives you complete freedom. The rest of this guide explains exactly why — and covers the edge cases where WordPress.com might make sense.</p>

<h2>What Is WordPress.org?</h2>

<img src="/screenshots/wordpress-org-homepage.webp" alt="The WordPress.org homepage showing the Meet WordPress heading with options to Design, Build, and Extend your website" />

<p>WordPress.org is the home of the <strong>free, open-source WordPress software</strong>. When most people say "WordPress," this is what they mean.</p>

<p>Here's how it works: you download the WordPress software (for free), install it on your own web hosting account, and you have a fully functional website that you own and control completely.</p>

<h3>What you get with WordPress.org</h3>

<ul>
<li><strong>Free software</strong> — the CMS itself costs nothing, ever</li>
<li><strong>Full control</strong> — install any theme, any plugin, modify any code</li>
<li><strong>Access to 61,000+ plugins</strong> — including WooCommerce for e-commerce</li>
<li><strong>Access to 14,000+ themes</strong> — free and premium</li>
<li><strong>Complete SEO control</strong> — robots.txt, sitemaps, redirects, everything</li>
<li><strong>You own everything</strong> — your content, your data, your files</li>
<li><strong>Unlimited monetization</strong> — ads, affiliate links, stores, memberships</li>
</ul>

<h3>What it requires</h3>

<ul>
<li><strong>Web hosting</strong> — roughly $3-10/month depending on the provider (see my <a href="/wordpress-hosting">WordPress hosting guide</a>)</li>
<li><strong>A domain name</strong> — about $10-15/year</li>
<li><strong>15 minutes to install</strong> — most hosts offer one-click installation (see my <a href="/how-to-install-wordpress">step-by-step install guide</a>)</li>
</ul>

<p>That's it. There's no ongoing technical maintenance burden — you just keep WordPress and your plugins updated (which takes a few clicks every couple of weeks).</p>

<h2>What Is WordPress.com?</h2>

<img src="/screenshots/wordpress-com-homepage.webp" alt="The WordPress.com homepage as seen from the Netherlands, showing Dutch-language text with 'Maak een gratis website' (Create a free website) and plan options" />

<p>That screenshot above is how WordPress.com looks when visiting from the Netherlands — so you'll see the Dutch-language version of the site. The platform serves different regional versions, but the plans and features are the same globally.</p>

<p>WordPress.com is a <strong>commercial hosting service</strong> built by Automattic (the company founded by one of WordPress's original creators). It runs WordPress under the hood, but it's a managed, hosted product — meaning they handle the servers, and you work within their system.</p>

<h3>What you get with WordPress.com</h3>

<ul>
<li><strong>Free tier available</strong> — limited, with WordPress.com branding and ads</li>
<li><strong>No server management</strong> — they handle hosting and updates</li>
<li><strong>Simplified interface</strong> — fewer settings to worry about</li>
<li><strong>Some themes available</strong> — limited selection compared to WordPress.org</li>
</ul>

<h3>What you don't get (unless you pay for top-tier plans)</h3>

<ul>
<li><strong>No custom plugins</strong> — on free and lower-tier paid plans, you can only use plugins WordPress.com has pre-approved</li>
<li><strong>Limited themes</strong> — you can't install arbitrary third-party themes on most plans</li>
<li><strong>No direct file access</strong> — you can't edit theme files or access your server</li>
<li><strong>WordPress.com ads on your site</strong> — on the free plan, they show ads you don't earn from</li>
<li><strong>Subdomain on free plan</strong> — your site will be yourname.wordpress.com, not yourname.com</li>
<li><strong>Limited monetization</strong> — you can't use Google AdSense on lower plans</li>
</ul>

<h2>Key Differences</h2>

<h3>Cost</h3>

<p><strong>WordPress.org:</strong> The software is free. You pay for hosting ($3-10/month) and a domain (~$10/year). Total first year: roughly $50-130.</p>

<p><strong>WordPress.com:</strong> The free plan exists but is very limited. Paid plans range from $4/month (Starter) to $45/month (Business) — and you really need the Business plan ($25+/month) to get plugin access. At that price, you're paying more than self-hosted WordPress while getting less flexibility.</p>

<h3>Customization</h3>

<p><strong>WordPress.org:</strong> Unlimited. Install any theme, any plugin, edit any file. If you can imagine it, you can build it.</p>

<p><strong>WordPress.com:</strong> Very limited on lower plans. You're working within guardrails. On the Business plan and above you get more flexibility, but you're still not getting full server access.</p>

<h3>Plugins and Themes</h3>

<p><strong>WordPress.org:</strong> Full access to the entire plugin and theme ecosystem — all 61,000+ plugins and 14,000+ themes, plus any premium marketplace options.</p>

<p><strong>WordPress.com:</strong> On the free and Personal plan, you're limited to a small curated set. The Business plan unlocks plugin installation, but you're still in a managed environment.</p>

<h3>SEO Control</h3>

<p><strong>WordPress.org:</strong> Complete control. You can install any SEO plugin (Yoast, Rank Math, etc.), edit your robots.txt, set up custom redirects, control your sitemaps, and configure everything at the server level.</p>

<p><strong>WordPress.com:</strong> Basic SEO features are available, but you can't install advanced SEO plugins on lower plans and you have limited control over technical SEO settings.</p>

<h3>Monetization</h3>

<p><strong>WordPress.org:</strong> No restrictions. Use Google AdSense, Mediavine, affiliate links, WooCommerce, paid memberships — anything you want. WordPress takes 0% of your revenue.</p>

<p><strong>WordPress.com:</strong> The free plan actually shows WordPress.com's ads on your site (ads you don't earn from). You need to upgrade to a paid plan to run your own ads. Even then, certain monetization methods require the more expensive plans.</p>

<h3>Ownership</h3>

<p><strong>WordPress.org:</strong> You own everything — your content, your files, your database. You can export everything and move to a different host in a few hours.</p>

<p><strong>WordPress.com:</strong> Your content is technically yours, but it lives on their platform. If they change their terms, raise prices dramatically, or shut down a feature you rely on, you're dependent on their decisions.</p>

<h2>Comparison Table</h2>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>WordPress.org</th>
      <th>WordPress.com (Free)</th>
      <th>WordPress.com (Business)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monthly cost</td>
      <td>$3-10 (hosting)</td>
      <td>Free</td>
      <td>~$25/month</td>
    </tr>
    <tr>
      <td>Custom domain</td>
      <td>Yes</td>
      <td>No (subdomain only)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Install any plugin</td>
      <td>Yes (61,000+)</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Install any theme</td>
      <td>Yes (14,000+)</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Full SEO control</td>
      <td>Yes</td>
      <td>Limited</td>
      <td>Mostly</td>
    </tr>
    <tr>
      <td>Run your own ads</td>
      <td>Yes</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>WooCommerce / e-commerce</td>
      <td>Yes</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Server/file access</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>You own the hosting</td>
      <td>Yes</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <td>WordPress.com branding</td>
      <td>No</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
  </tbody>
</table>

<h2>Which One Should You Choose?</h2>

<p>Use this quick decision framework:</p>

<p><strong>Choose WordPress.org if:</strong></p>
<ul>
<li>You want a professional website with your own domain name</li>
<li>You plan to monetize through ads, affiliate marketing, or an online store</li>
<li>You want access to the full plugin ecosystem (SEO tools, e-commerce, forms, etc.)</li>
<li>You care about long-term flexibility and ownership</li>
<li>You want the best possible SEO control</li>
<li>Your budget is modest — self-hosted is actually cheaper for anything beyond the most basic use</li>
</ul>

<p><strong>Choose WordPress.com if:</strong></p>
<ul>
<li>You just want a personal journal or hobby site with no monetization goals</li>
<li>You genuinely want zero technical involvement and don't mind the limitations</li>
<li>The free subdomain (yourname.wordpress.com) is acceptable to you</li>
</ul>

<p>Honestly, I struggle to recommend WordPress.com's paid plans because at $25/month (Business plan), you could self-host WordPress on quality hosting for $5-10/month and get more flexibility. The only real argument for WordPress.com is the zero-maintenance aspect — but maintaining self-hosted WordPress is easier than most people expect.</p>

<h2>How to Get Started with WordPress.org</h2>

<p>If you've decided on WordPress.org (good choice), here's the quick path:</p>

<ol>
<li><strong>Choose a hosting provider</strong> — I've done the research in my <a href="/wordpress-hosting">WordPress hosting comparison</a>. For most beginners, a managed WordPress host or a solid shared host works perfectly.</li>
<li><strong>Register a domain name</strong> — Usually done through your hosting provider during signup.</li>
<li><strong>Install WordPress</strong> — Almost every host offers one-click WordPress installation. I walk through the entire process in my <a href="/how-to-install-wordpress">WordPress installation guide</a>.</li>
<li><strong>Choose a theme and install essential plugins</strong> — Your site will be ready within an hour.</li>
</ol>

<p>For the full walkthrough from zero to a live website, see my <a href="/start-here">complete WordPress beginner's guide</a>. And if you're still unsure about what WordPress even is at its core, start with <a href="/what-is-wordpress">What Is WordPress?</a> — that covers the fundamentals.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is WordPress.com really free?</h3>
<p>There is a free plan, but it's quite limited: your site will have a WordPress.com subdomain (yourname.wordpress.com), WordPress.com will show ads on your site, and you can't install plugins or use a custom theme. For most people with any real website goals, the free plan isn't practical.</p>

<h3>Can I switch from WordPress.com to WordPress.org later?</h3>
<p>Yes, you can export your content from WordPress.com and import it into a self-hosted WordPress.org installation. The process works reasonably well for posts and pages, though some settings and customizations won't transfer automatically. It's easier to start with WordPress.org from the beginning than to migrate later.</p>

<h3>Are WordPress.com and WordPress.org the same software?</h3>
<p>WordPress.com runs on the WordPress software, but it's a managed environment with restrictions. WordPress.org is the open-source software itself, which you can install and run with complete freedom. They share the same underlying code but offer very different experiences.</p>

<h3>Does WordPress.com have WooCommerce?</h3>
<p>WooCommerce is available on WordPress.com's higher-tier plans (Commerce plan), but you're paying a premium for it — around $45/month. With WordPress.org, you can install WooCommerce for free and only pay for hosting ($3-10/month). For anyone building an online store, WordPress.org is the obvious choice.</p>

<h3>Is self-hosted WordPress hard to manage?</h3>
<p>Not really. Updating WordPress, themes, and plugins takes about two minutes every few weeks — you just click "Update" in the admin dashboard. The main things that require attention are keeping software updated and having a backup solution in place (which you can automate with a free plugin). I cover the basics in my <a href="/what-is-wordpress">WordPress overview guide</a>.</p>
`;

// ─── Article 2: How to Install WordPress ─────────────────────────────────────

export const seedInstallWordPress = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "install-wordpress";

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        content: installContent,
        title: "How to Install WordPress — Step-by-Step for Beginners",
        excerpt:
          "Learn how to install WordPress in under 15 minutes. I walk you through the entire process with screenshots — from choosing hosting to your first login.",
        updatedAt: now,
      });
      return { message: "Updated existing article", id: existing._id };
    }

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "getting-started"))
      .first();

    const id = await ctx.db.insert("posts", {
      title: "How to Install WordPress — Step-by-Step for Beginners",
      slug,
      excerpt:
        "Learn how to install WordPress in under 15 minutes. I walk you through the entire process with screenshots — from choosing hosting to your first login.",
      content: installContent,
      category: "start-here",
      tags: [
        "wordpress",
        "install",
        "setup",
        "beginners",
        "hosting",
        "tutorial",
      ],
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "marvin",
      authorName: "Marvin",
      seoTitle: "How to Install WordPress Step by Step (2026 Beginner Guide)",
      seoDescription:
        "Learn how to install WordPress in under 15 minutes. I walk you through the entire process with screenshots — from choosing hosting to your first login.",
      clusterId: cluster?._id,
      clusterRole: "supporting" as const,
      learningPathOrder: 2,
    });

    return { message: "Article created", id };
  },
});

const installContent = `
<p>Installing WordPress sounds technical, but I promise it's not. I've helped dozens of complete beginners get their first WordPress site live, and the entire process — from signing up for hosting to logging into your new WordPress admin — takes about 15 minutes.</p>

<p>I've been building websites for over 20 years. In that time, the WordPress installation process has gotten much, much simpler. Most hosting providers now offer one-click installation that handles almost everything for you. In this guide I'll walk through both the easy way (one-click) and the manual method, so you understand what's happening either way.</p>

<h2>What You Need Before Installing WordPress</h2>

<p>Before you can install WordPress, you need two things:</p>

<ol>
<li><strong>A domain name</strong> — This is your website's address (example: mywebsite.com). Domain names cost around $10-15 per year. Most hosting providers let you register a domain during the signup process.</li>
<li><strong>Web hosting</strong> — This is the server where your WordPress files and database will live. Hosting costs roughly $3-10 per month depending on the provider and plan.</li>
</ol>

<p>If you haven't chosen a hosting provider yet, read my <a href="/wordpress-hosting">WordPress hosting guide</a> first. I compare the main options for beginners and give clear recommendations based on budget and use case. Once you have hosting and a domain, come back here and follow the steps below.</p>

<p>Not sure what WordPress actually is before diving into installation? Check out <a href="/what-is-wordpress">What Is WordPress?</a> for the quick overview.</p>

<h2>Method 1: One-Click Install (Recommended for Beginners)</h2>

<p>The vast majority of hosting providers — including SiteGround, Bluehost, Hostinger, and most others — offer a one-click WordPress installer. This is by far the easiest method and the one I recommend for anyone who isn't specifically trying to learn the technical details.</p>

<h3>Step 1: Log into your hosting control panel</h3>

<p>After signing up for hosting, you'll receive login credentials for your hosting control panel. This is usually either cPanel (the traditional interface used by most shared hosts) or a custom dashboard specific to your host.</p>

<h3>Step 2: Find the WordPress installer</h3>

<p>Look for a section called "WordPress," "WordPress Installer," "Softaculous," or "Website Builder." The exact name varies by host, but it's usually prominently featured. Many hosts place it on the main dashboard because WordPress installation is so common.</p>

<h3>Step 3: Run the installer</h3>

<p>Click the installer and you'll be asked to fill in a few details:</p>

<ul>
<li><strong>Domain</strong> — Select the domain where you want to install WordPress (you may have multiple domains on one hosting account)</li>
<li><strong>Directory</strong> — Leave this blank to install WordPress at your root domain (yoursite.com). Only fill this in if you want WordPress in a subdirectory like yoursite.com/blog</li>
<li><strong>Site title</strong> — Your website's name. You can change this later.</li>
<li><strong>Admin username</strong> — Choose something other than "admin" (it's a common attack target)</li>
<li><strong>Admin password</strong> — Use a strong, unique password. Store it in a password manager.</li>
<li><strong>Admin email</strong> — Use a real email address you check — WordPress sends password resets and important notifications here</li>
</ul>

<h3>Step 4: Click install and wait</h3>

<p>The installer will set up your database, copy the WordPress files, and configure everything. This usually takes 30-60 seconds. When it's done, you'll see a confirmation screen with links to your new website and your admin login page.</p>

<p><strong>That's it.</strong> WordPress is installed. Skip down to the "Your First WordPress Login" section.</p>

<h2>Method 2: Manual Installation</h2>

<p>If your host doesn't offer a one-click installer (rare these days), or if you want to understand what's happening under the hood, here's the manual process. This is also useful if you're setting up a local development environment.</p>

<h3>What you need for manual installation</h3>

<ul>
<li>Access to your hosting account's file manager or an FTP client</li>
<li>Access to your hosting account's database tools (usually phpMyAdmin)</li>
<li>The WordPress software downloaded from WordPress.org</li>
</ul>

<img src="/screenshots/wordpress-org-homepage.webp" alt="The WordPress.org homepage where you can download the free WordPress software" />

<p>Go to WordPress.org and click "Get WordPress" to download the latest version. You'll get a zip file containing all the WordPress files.</p>

<h3>The manual installation steps</h3>

<ol>
<li><strong>Create a database</strong> — In your hosting control panel, find the MySQL Databases section. Create a new database, create a database user, assign the user to the database with "All Privileges," and note down the database name, username, and password.</li>
<li><strong>Upload the WordPress files</strong> — Unzip the WordPress download. Using your host's file manager or an FTP client, upload all the files inside the "wordpress" folder to your domain's public directory (usually called public_html or www).</li>
<li><strong>Run the WordPress setup wizard</strong> — Visit your domain in a browser. WordPress will detect the files and show a setup wizard. Enter your database details (name, username, password, host — the host is usually "localhost"), and then fill in your site title and admin account details.</li>
<li><strong>Complete the installation</strong> — Click "Install WordPress" and the wizard will create all the necessary database tables and complete the setup.</li>
</ol>

<p>The manual method involves more steps, but each step is straightforward. If you get stuck on the database part, your hosting provider's documentation will have specific instructions for their platform.</p>

<h2>Your First WordPress Login</h2>

<p>Whether you used one-click or manual installation, your WordPress admin login page will be at:</p>

<p><strong>yoursite.com/wp-admin</strong></p>

<p>Enter the admin username and password you set during installation. After logging in, you'll see the WordPress dashboard:</p>

<img src="/screenshots/wordpress-admin-dashboard.webp" alt="The WordPress admin dashboard showing the welcome screen with quick links to customize your site, create your first post, add an about page, and set up your homepage" />

<p>This is your home base. Everything you need to manage your website is accessible from this screen. The left sidebar is your main navigation — it gives you access to Posts, Pages, Media, Appearance, Plugins, Users, and Settings.</p>

<p>Take a few minutes to click around and familiarize yourself with the layout. Don't worry about breaking anything at this stage — you're the only one here and everything can be undone.</p>

<h2>Essential First Steps After Installing</h2>

<p>Your WordPress installation is live, but there are a few important things to do before you start creating content.</p>

<h3>1. Set your permalink structure</h3>

<p>By default, WordPress uses ugly URLs like yoursite.com/?p=123. You want clean URLs like yoursite.com/your-post-title. To fix this:</p>

<ol>
<li>In the left sidebar, go to <strong>Settings > Permalinks</strong></li>
<li>Select <strong>Post name</strong></li>
<li>Click <strong>Save Changes</strong></li>
</ol>

<p>Do this before you create any content. Changing permalink structure after you have posts can break links.</p>

<h3>2. Delete the sample content</h3>

<p>WordPress installs with placeholder content: a "Hello World" post and a "Sample Page." Delete both:</p>

<ul>
<li>Go to <strong>Posts > All Posts</strong>, hover over "Hello World," and click Trash</li>
<li>Go to <strong>Pages > All Pages</strong>, hover over "Sample Page," and click Trash</li>
</ul>

<h3>3. Install a theme</h3>

<p>WordPress comes with a default theme (currently Twenty Twenty-Five), which is actually quite good. But you can browse thousands of alternatives by going to <strong>Appearance > Themes > Add New</strong>. Popular beginner-friendly free themes include Astra, Kadence, and GeneratePress.</p>

<p>For now, you can leave the default theme and focus on getting your content set up. You can always change the theme later without losing your content.</p>

<h3>4. Install essential plugins</h3>

<p>A few plugins are worth installing from the start:</p>

<ul>
<li><strong>An SEO plugin</strong> (Yoast SEO or Rank Math) — Helps you optimize your content for search engines</li>
<li><strong>A security plugin</strong> (Wordfence or Solid Security) — Adds basic security hardening</li>
<li><strong>A backup plugin</strong> (UpdraftPlus) — Automatically backs up your site to cloud storage</li>
<li><strong>A caching plugin</strong> — Improves your site's loading speed</li>
</ul>

<p>Install plugins by going to <strong>Plugins > Add New</strong> and searching by name. I cover the full list of must-have plugins in my <a href="/wordpress-plugins">essential WordPress plugins guide</a>.</p>

<h3>5. Update everything</h3>

<p>Check <strong>Dashboard > Updates</strong> and install any pending updates for WordPress core, themes, or plugins. Starting with everything up to date is a good habit.</p>

<h2>Creating Your First Post</h2>

<p>Once your basic setup is done, you're ready to create content. Go to <strong>Posts > Add New</strong> to open the block editor:</p>

<img src="/screenshots/wordpress-block-editor.webp" alt="The WordPress block editor showing the post creation interface with a title field at the top and the block inserter button for adding paragraphs, images, headings, and other content blocks" />

<p>The block editor works by adding "blocks" — individual pieces of content like paragraphs, headings, images, lists, and more. Here's how to create a basic post:</p>

<ol>
<li><strong>Click the title area</strong> at the top and type your post's title</li>
<li><strong>Click the "+" button</strong> or press Enter to add your first content block</li>
<li><strong>Type your content</strong> — a paragraph block is added by default when you start typing</li>
<li><strong>Add more blocks</strong> as needed — headings, images, lists, etc.</li>
<li><strong>Set your categories and tags</strong> in the right sidebar under "Post"</li>
<li><strong>Click "Publish"</strong> when you're ready to make it live</li>
</ol>

<p>The block editor has a gentle learning curve, but within an hour of writing you'll have the basics down. If you want to add an image, click the "+" button and choose "Image." To add a heading, choose "Heading" and select H2 or H3 from the toolbar that appears.</p>

<p>For more guidance on building out your site, see my <a href="/wordpress-themes">WordPress themes guide</a> and the <a href="/wordpress-plugins">essential plugins guide</a>. For keeping your site secure once it's live, read my <a href="/wordpress-security">WordPress security guide</a>.</p>

<p>Ready for the complete picture? My <a href="/start-here">WordPress beginner's guide</a> walks through everything from installation to a fully configured site, step by step. And if you haven't settled on a host yet, <a href="/wordpress-hosting">my hosting guide</a> will point you in the right direction.</p>

<h2>Frequently Asked Questions</h2>

<h3>How long does it take to install WordPress?</h3>
<p>With a one-click installer, the actual installation takes about 60 seconds. Including the time to fill in your details and log in for the first time, figure on 5-10 minutes total. The initial setup steps (permalink structure, plugins, basic settings) add another 15-20 minutes. So plan for about 30 minutes from zero to a configured site.</p>

<h3>Can I install WordPress for free?</h3>
<p>The WordPress software is free. You need paid hosting to run it, which starts at around $3/month for basic shared hosting. Many hosts offer a free domain for the first year when you sign up for hosting, which can save you $10-15. See my <a href="/wordpress-hosting">hosting guide</a> for current recommendations and deals.</p>

<h3>What if I make a mistake during installation?</h3>
<p>Most mistakes during installation are completely reversible. If you entered the wrong database name, you can update it in the wp-config.php file. If you don't like your site title, change it in Settings > General. If something goes really wrong, most hosts let you delete the WordPress installation and start over with a fresh one-click install — it takes about 2 minutes.</p>

<h3>Do I need to install WordPress manually or is the one-click installer okay?</h3>
<p>The one-click installer is perfectly fine for the vast majority of websites. It installs the same WordPress software that manual installation does — the process is just automated. There's no quality difference in the end result. Manual installation is only necessary if your host doesn't offer a one-click option (uncommon) or if you're setting up a specific advanced configuration.</p>

<h3>What's the difference between installing WordPress locally vs. on a live server?</h3>
<p>A local installation runs on your own computer and is only visible to you — it's great for development and testing. A live server installation (what this guide covers) is accessible on the internet and is what you need for a real website. Tools like LocalWP make local installation easy if you want to experiment before going live, but for your first WordPress site, go straight to a real hosting account.</p>
`;
