import { internalMutation } from "./_generated/server";

export const seedPillarArticle = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "how-to-make-a-wordpress-website";

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "getting-started"))
      .first();

    if (!cluster) {
      return { message: "Cluster 'getting-started' not found — aborting." };
    }

    let postId;

    if (existing) {
      await ctx.db.patch(existing._id, {
        title:
          "How to Make a WordPress Website — Complete Beginner's Guide (2026)",
        excerpt:
          "Learn how to build a WordPress website from scratch in 2026. I walk through every step with screenshots — hosting, setup, themes, plugins, and your first content.",
        content: pillarContent,
        category: "start-here",
        tags: [
          "wordpress",
          "website",
          "beginners",
          "tutorial",
          "step-by-step",
          "how to",
          "guide",
        ],
        seoTitle:
          "How to Make a WordPress Website in 2026 — Step-by-Step Guide",
        seoDescription:
          "Learn how to build a WordPress website from scratch in 2026. I walk through every step with screenshots — hosting, setup, themes, plugins, and your first content.",
        clusterId: cluster._id,
        clusterRole: "pillar" as const,
        updatedAt: now,
      });
      postId = existing._id;
      console.log("Updated existing pillar article:", postId);
    } else {
      postId = await ctx.db.insert("posts", {
        title:
          "How to Make a WordPress Website — Complete Beginner's Guide (2026)",
        slug,
        excerpt:
          "Learn how to build a WordPress website from scratch in 2026. I walk through every step with screenshots — hosting, setup, themes, plugins, and your first content.",
        content: pillarContent,
        category: "start-here",
        tags: [
          "wordpress",
          "website",
          "beginners",
          "tutorial",
          "step-by-step",
          "how to",
          "guide",
        ],
        status: "published",
        publishedAt: now,
        updatedAt: now,
        author: "marvin",
        authorName: "Marvin",
        seoTitle:
          "How to Make a WordPress Website in 2026 — Step-by-Step Guide",
        seoDescription:
          "Learn how to build a WordPress website from scratch in 2026. I walk through every step with screenshots — hosting, setup, themes, plugins, and your first content.",
        clusterId: cluster._id,
        clusterRole: "pillar" as const,
      });
      console.log("Created new pillar article:", postId);
    }

    // Update the cluster's pillarPostId to point to this article
    await ctx.db.patch(cluster._id, {
      pillarPostId: postId,
    });
    console.log("Updated cluster pillarPostId to:", postId);

    return {
      message: existing ? "Updated existing pillar article" : "Created pillar article",
      postId,
      clusterId: cluster._id,
    };
  },
});

const pillarContent = `
<p>I've been building websites for over 20 years and working with WordPress for more than a decade. If you've ever wondered whether you can build a proper website without hiring a developer or learning to code — the answer is yes, and WordPress is how you do it.</p>

<p>This guide walks through every single step, from getting hosting to publishing your first content. I've added screenshots at the key moments so you know exactly what to expect. Plan for about an hour from start to finish, and by the end you'll have a real, live WordPress website.</p>

<p>If you're not sure what WordPress actually is yet, start with <a href="/what-is-wordpress">What Is WordPress?</a> — that covers the basics before you dive in here.</p>

<h2>What You'll Need to Get Started</h2>

<p>Before I walk you through the steps, here's a quick overview of what's involved:</p>

<ul>
<li><strong>Web hosting</strong> — roughly $3–10 per month. This is the server where your website lives.</li>
<li><strong>A domain name</strong> — about $10 per year. This is your website's address (like yourname.com). Most hosts include one free for the first year.</li>
<li><strong>About one hour</strong> — maybe less if you move quickly through the steps.</li>
</ul>

<p>That's it. No coding knowledge required. WordPress itself is free.</p>

<p>One thing to clear up before we go further: there are two "WordPresses" — WordPress.org (the free, self-hosted software) and WordPress.com (a commercial hosting service). This guide is about WordPress.org, which is what almost everyone means when they say "WordPress." If you're curious about the difference, I've written a full breakdown in <a href="/wordpress-com-vs-wordpress-org">WordPress.com vs WordPress.org</a>.</p>

<h2>Step 1 — Choose a WordPress Hosting Provider</h2>

<p><em>Time estimate: 10–15 minutes (including signup)</em></p>

<p>Web hosting is the service that stores your website's files and makes them accessible on the internet. Think of it like renting space on a computer that's always switched on and connected to the internet.</p>

<p>Choosing the right host matters more than most beginners realize. A slow or unreliable host will hurt your visitor experience and your search rankings from day one. The good news is that decent hosting for a new WordPress site doesn't cost much.</p>

<p>For most beginners, I recommend one of these three:</p>

<h3>Bluehost</h3>
<p>Officially recommended by WordPress.org, Bluehost has a beginner-friendly dashboard and includes a free domain with most plans. Good starting point if you want something reliable and well-documented.</p>
<img src="/screenshots/bluehost-wordpress-hosting.webp" alt="Bluehost WordPress hosting page showing managed hosting plans with Trustpilot rating" />

<h3>SiteGround</h3>
<p>Excellent performance and support, slightly higher price but worth it once your site gets traffic. SiteGround is a strong choice if speed and uptime reliability are your priorities.</p>
<img src="/screenshots/siteground-wordpress-hosting.webp" alt="SiteGround WordPress hosting page showing high-performance plans starting at 2.99 per month" />

<h3>Hostinger</h3>
<p>The most affordable option (often under $3/month), with solid performance for a new site and very smooth onboarding. Hostinger also offers AI-powered tools that can help you get started faster.</p>
<img src="/screenshots/hostinger-wordpress-hosting.webp" alt="Hostinger WordPress hosting page showing plans from 1.99 per month with AI agent features" />

<p>All three offer one-click WordPress installation, which makes Step 3 a lot easier. I've tested and compared them in detail in my <a href="/wordpress-hosting">WordPress hosting guide</a> — if you're not sure which to pick, start there.</p>

<h2>Step 2 — Register Your Domain Name</h2>

<p><em>Time estimate: 5 minutes</em></p>

<p>Your domain name is your website's address — the thing people type to find you. Something like <strong>yourname.com</strong> or <strong>mybusiness.com</strong>.</p>

<p>Domain names typically cost around $10–15 per year. Most hosting providers let you register a domain as part of the signup process, and many include a free domain for the first year with their hosting plans. This is convenient — one less account to manage.</p>

<p>A few tips for choosing a good domain name:</p>

<ul>
<li><strong>Keep it short and easy to spell</strong> — the fewer characters, the better</li>
<li><strong>Avoid hyphens and numbers</strong> — they're easy to get wrong when telling someone your URL</li>
<li><strong>Go with .com if you can</strong> — it's still the most trusted extension and what people default to typing</li>
<li><strong>Make it memorable</strong> — ideally it should say something about what the site is about</li>
<li><strong>Don't overthink it</strong> — your domain name matters less than the quality of your content. Most successful sites have straightforward, descriptive names.</li>
</ul>

<p>If your first choice is taken, try adding a word like "the," "my," or a relevant keyword. Or use a domain name generator to brainstorm alternatives.</p>

<h2>Step 3 — Install WordPress</h2>

<p><em>Time estimate: 5 minutes</em></p>

<p>Once you have hosting, installing WordPress is fast. Nearly every hosting provider offers a one-click WordPress installer — you fill in a few fields, click install, and WordPress is set up automatically.</p>

<img src="/screenshots/wordpress-org-homepage.webp" alt="The WordPress.org homepage — the home of the free, open-source WordPress software" />

<p>The WordPress software itself comes from WordPress.org (pictured above). Your host downloads and installs it for you when you use the one-click installer, so you never have to go there manually.</p>

<p>During installation, you'll be asked for:</p>

<ul>
<li><strong>Site title</strong> — your website's name (you can change this later)</li>
<li><strong>Admin username</strong> — avoid using "admin" as it's a common target for attacks</li>
<li><strong>Admin password</strong> — use something strong and store it in a password manager</li>
<li><strong>Admin email</strong> — use a real address, WordPress sends password resets and notifications here</li>
</ul>

<p>For a detailed walkthrough including screenshots for different hosting providers, see my <a href="/install-wordpress">step-by-step WordPress installation guide</a>.</p>

<h2>Step 4 — Log In to Your WordPress Dashboard</h2>

<p><em>Time estimate: 2 minutes</em></p>

<p>Once WordPress is installed, your admin login page lives at:</p>

<p><strong>yoursite.com/wp-admin</strong></p>

<p>Enter the username and password you set during installation. After logging in, you'll see the WordPress dashboard:</p>

<img src="/screenshots/wordpress-admin-dashboard.webp" alt="The WordPress admin dashboard — your home base for managing everything on your website" />

<p>This is your control center. Everything you need to manage your website is accessible from here. Here's a quick overview of the left sidebar menu:</p>

<ul>
<li><strong>Dashboard</strong> — overview of site activity, updates, and quick links</li>
<li><strong>Posts</strong> — where you write and manage blog posts</li>
<li><strong>Pages</strong> — where you manage standalone pages (About, Contact, etc.)</li>
<li><strong>Media</strong> — your uploaded images and files</li>
<li><strong>Appearance</strong> — themes, menus, and visual customization</li>
<li><strong>Plugins</strong> — install, activate, and manage plugins</li>
<li><strong>Users</strong> — manage user accounts and roles</li>
<li><strong>Settings</strong> — general site configuration</li>
</ul>

<p>Don't worry about learning every menu right now. We'll go through the important parts step by step.</p>

<h2>Step 5 — Choose and Install a Theme</h2>

<p><em>Time estimate: 10–20 minutes</em></p>

<p>A WordPress theme controls how your website looks — its layout, colors, fonts, and overall design. You can switch themes at any time without losing your content, so there's no pressure to get this perfect on day one.</p>

<p>To browse and install themes, go to <strong>Appearance &gt; Themes</strong> in your dashboard:</p>

<img src="/screenshots/wordpress-themes-admin.webp" alt="The WordPress Themes admin page showing installed themes with an Add New button to browse the theme directory" />

<p>Click <strong>Add New Theme</strong> to search the WordPress theme directory, which has over 14,000 free themes. You can filter by features, layout, and subject.</p>

<img src="/screenshots/wordpress-themes-directory.webp" alt="The WordPress.org themes directory showing popular free themes available to browse and install" />

<p>For beginners, I recommend starting with one of these:</p>

<ul>
<li><strong>Astra</strong> — lightweight, fast, and highly customizable. One of the most popular WordPress themes in the world for good reason.</li>
<li><strong>GeneratePress</strong> — similar to Astra, extremely fast, and developer-loved. Slightly more minimal out of the box.</li>
</ul>

<p>Both have free versions that work well for most sites, and premium upgrades if you need advanced features later. I cover theme options in more detail in my <a href="/wordpress-themes">WordPress themes guide</a>, including premium recommendations and what to look for.</p>

<p>To install a theme: find it in the directory, click <strong>Install</strong>, then click <strong>Activate</strong>. Your site will immediately switch to the new look.</p>

<h2>Step 6 — Install Essential Plugins</h2>

<p><em>Time estimate: 10–15 minutes</em></p>

<p>Plugins add functionality to WordPress. There are over 60,000 free plugins in the official directory — everything from contact forms to e-commerce to security. You don't need most of them, but a few are worth installing on every site.</p>

<p>Go to <strong>Plugins &gt; Add New Plugin</strong> in your dashboard:</p>

<img src="/screenshots/wordpress-plugin-install.webp" alt="The Add Plugins page in WordPress admin where you can search for and install plugins from the official directory" />

<img src="/screenshots/wordpress-plugins-directory.webp" alt="The WordPress.org plugins directory showing thousands of free plugins available to extend your site" />

<p>Here are the five plugins I install on every new WordPress site:</p>

<ol>
<li><strong>Yoast SEO</strong> — helps you optimize your content for search engines. It adds a checklist to every post and page showing what you can improve, and it handles your sitemap automatically.</li>
<li><strong>LiteSpeed Cache</strong> (or WP Super Cache if your host doesn't use LiteSpeed) — speeds up your site by caching pages. A faster site means better rankings and happier visitors.</li>
<li><strong>UpdraftPlus</strong> — automated backups to Google Drive, Dropbox, or another cloud service. Set it up once and never worry about losing your site.</li>
<li><strong>WPForms Lite</strong> — the easiest way to add a contact form to your site. The free version covers everything a new site needs.</li>
<li><strong>Wordfence Security</strong> — adds a firewall and malware scanner. The free version provides solid protection for most sites.</li>
</ol>

<p>To install each one: search by name, click <strong>Install Now</strong>, then click <strong>Activate</strong>. Each plugin will add its own menu item in your dashboard where you can configure it.</p>

<p>For a full list of recommended plugins by category, see my <a href="/wordpress-plugins">essential WordPress plugins guide</a>.</p>

<h2>Step 7 — Configure Your Site Settings</h2>

<p><em>Time estimate: 5 minutes</em></p>

<p>Before creating content, there are a few settings worth getting right from the start. The most important one is your permalink structure.</p>

<h3>Permalink structure</h3>

<p>By default, WordPress uses ugly URLs like <strong>yoursite.com/?p=123</strong>. You want clean, readable URLs like <strong>yoursite.com/your-post-title</strong>. This matters for both user experience and SEO.</p>

<p>Go to <strong>Settings &gt; Permalinks</strong>:</p>

<img src="/screenshots/wordpress-permalink-settings.webp" alt="The WordPress Settings > Permalinks page showing the permalink structure options with Post name selected" />

<p>Select <strong>Post name</strong> and click <strong>Save Changes</strong>. Do this before you create any content — changing your permalink structure later will break existing URLs and require setting up redirects.</p>

<h3>Other settings to check</h3>

<ul>
<li><strong>Settings &gt; General</strong> — confirm your site title and tagline. Set your timezone correctly (this affects when scheduled posts publish).</li>
<li><strong>Settings &gt; Reading</strong> — by default WordPress shows your latest posts on the homepage. If you want a static page as your homepage instead, you can set that here (we'll come back to this in Step 8).</li>
<li><strong>Settings &gt; Discussion</strong> — decide whether to allow comments on posts. For a new site, the defaults are fine.</li>
</ul>

<h2>Step 8 — Create Your First Pages</h2>

<p><em>Time estimate: 15–20 minutes</em></p>

<p>Pages in WordPress are for content that doesn't change often and isn't part of your blog — things like your homepage, About page, and Contact page. They're different from Posts (which are dated blog entries that appear in reverse-chronological order).</p>

<p>Go to <strong>Pages &gt; Add New Page</strong> to open the block editor:</p>

<img src="/screenshots/wordpress-block-editor.webp" alt="The WordPress block editor showing the content creation interface with blocks for paragraphs, headings, images, and more" />

<p>The block editor works by adding "blocks" — individual pieces of content. A paragraph is a block. A heading is a block. An image is a block. You build pages by stacking blocks.</p>

<p>Create these three pages to start:</p>

<h3>Home page</h3>
<p>For a new site, I'd start simple. Write a brief introduction to who you are and what the site is about. You can always redesign this later once you know what content you're building around.</p>

<h3>About page</h3>
<p>Tell visitors who you are, your background, and why you created this site. This is often one of the most-visited pages on any website — people want to know who's behind it.</p>

<h3>Contact page</h3>
<p>Add a contact form using WPForms (the plugin you installed in Step 6). Go to <strong>WPForms &gt; Add New</strong>, use the simple contact form template, and copy the generated shortcode onto your Contact page.</p>

<p>Once you've created your Home and About pages, go to <strong>Settings &gt; Reading</strong> and set your "Homepage displays" to "A static page," then select your Home page. This makes your custom page appear at yoursite.com instead of a list of posts.</p>

<h2>Step 9 — Write Your First Blog Post</h2>

<p><em>Time estimate: 20–60 minutes depending on length</em></p>

<p>Posts are the blogging side of WordPress — dated entries that appear in reverse-chronological order and are organized by categories and tags. If your site has a blog, newsletter, or news section, posts are what you'll use.</p>

<p>Go to <strong>Posts &gt; Add New Post</strong>. The editor looks and works the same as the page editor.</p>

<p>A few things to know about posts that are different from pages:</p>

<ul>
<li><strong>Categories</strong> — broad groupings that organize your content. Every post should have at least one category. Set these in the right sidebar under "Post."</li>
<li><strong>Tags</strong> — more specific keywords. Optional, but useful for content discovery.</li>
<li><strong>Featured image</strong> — the main image that appears with your post in listings. Set this in the right sidebar under "Post." Most themes display this at the top of the post and in any post grids or archives.</li>
<li><strong>Excerpt</strong> — a short summary of the post. Some themes display this in listings. If you don't write one, WordPress will auto-generate it from your first paragraph.</li>
</ul>

<p>When you're ready to publish, click the blue <strong>Publish</strong> button in the top right. WordPress will ask you to confirm — click Publish again and your post is live.</p>

<h2>Step 10 — Set Up Your Navigation Menu</h2>

<p><em>Time estimate: 5 minutes</em></p>

<p>Your navigation menu is the bar of links at the top (or side) of your site that helps visitors find their way around. By default, WordPress may show a basic menu or nothing — either way you'll want to set this up manually.</p>

<p>Go to <strong>Appearance &gt; Menus</strong> (or <strong>Appearance &gt; Editor &gt; Navigation</strong> if your theme uses the newer Site Editor).</p>

<p>Here's the process for classic themes:</p>

<ol>
<li>Click <strong>Create a new menu</strong>, give it a name (like "Main Menu"), and click <strong>Create Menu</strong>.</li>
<li>On the left, check the pages you want to include (Home, About, Contact, and any others).</li>
<li>Click <strong>Add to Menu</strong>. The pages will appear in the menu builder on the right.</li>
<li>Drag and drop to reorder them.</li>
<li>Under <strong>Menu Settings</strong>, check the box for <strong>Primary Menu</strong> (or whatever your theme calls its main navigation location).</li>
<li>Click <strong>Save Menu</strong>.</li>
</ol>

<p>Visit your site's homepage and you should see your new navigation menu in place.</p>

<h2>What to Do Next</h2>

<p>You now have a working WordPress website with a theme, essential plugins, key pages, and a navigation menu. That's a real foundation.</p>

<p>Here's where to go from here, depending on what matters most to you:</p>

<ul>
<li><strong>Get found on Google</strong> — Read my <a href="/wordpress-seo">WordPress SEO guide</a> to understand how to optimize your content for search engines. This is one of the highest-leverage things you can focus on early.</li>
<li><strong>Make your site faster</strong> — Page speed affects both user experience and rankings. My <a href="/wordpress-speed">WordPress speed guide</a> covers caching, images, and the biggest performance wins.</li>
<li><strong>Keep it secure</strong> — WordPress powers 43% of the web, which makes it a target. My <a href="/wordpress-security">WordPress security guide</a> covers the essentials without overwhelming you.</li>
<li><strong>Explore more plugins</strong> — There are plugins for everything. My <a href="/wordpress-plugins">WordPress plugins guide</a> breaks down the best options by category.</li>
<li><strong>Customize your design</strong> — If you want to go deeper on themes and page builders, my <a href="/wordpress-themes">WordPress themes guide</a> covers what's available and what's worth using.</li>
</ul>

<p>For the full structured learning path — a step-by-step sequence that covers everything in order — visit my <a href="/start-here">Start Here</a> page. It maps out the journey from complete beginner to a confident WordPress site owner.</p>

<h2>Frequently Asked Questions</h2>

<h3>How much does it cost to make a WordPress website?</h3>
<p>The WordPress software is free. Your main costs are hosting (roughly $3–10/month) and a domain name (around $10/year). Many hosts include a free domain for the first year. So your first year total is typically $40–130, depending on the host. After that it's mainly the hosting renewal. You can run a real website on surprisingly little if you're careful with which plugins and themes you pick (plenty of excellent free options exist).</p>

<h3>How long does it take to build a WordPress website?</h3>
<p>You can have a basic WordPress site live in under an hour — I've walked you through exactly that in this guide. A more polished site with custom design, complete content, and everything configured might take a weekend. The timeline depends mostly on how long it takes you to write your content, which is true of any platform.</p>

<h3>Do I need to know how to code?</h3>
<p>No. WordPress is designed to be used without coding. Everything in this guide — hosting, installation, themes, plugins, content creation — requires zero code. If you want to make small visual tweaks that go beyond what your theme's settings allow, a basic understanding of CSS is useful, but it's not required to run a successful website.</p>

<h3>Will my WordPress site work on mobile?</h3>
<p>Yes. Any modern WordPress theme is responsive by default, meaning it automatically adjusts to look good on phones, tablets, and desktops. Both Astra and GeneratePress (recommended above) are fully responsive. You can preview how your site looks on different screen sizes using the Customizer in your dashboard.</p>

<h3>Can I sell products on my WordPress website?</h3>
<p>Yes. The WooCommerce plugin (free) turns any WordPress site into a full e-commerce store. It supports physical products, digital downloads, subscriptions, and more. Setting up an online store properly takes more than an hour, but it starts with exactly the same WordPress foundation you've set up here.</p>

<h3>Can I make money with a WordPress website?</h3>
<p>Yes, and WordPress imposes no restrictions on how. Common approaches include: display ads (Google AdSense, Mediavine), affiliate marketing (recommending products and earning commissions), selling your own products or services, paid memberships or courses, and sponsored content. Many people run full-time income-generating sites on WordPress.</p>

<h3>What's the difference between WordPress.com and WordPress.org?</h3>
<p>WordPress.org is the free, self-hosted software this guide is based on. WordPress.com is a commercial hosting service that uses the WordPress software but limits what you can do (especially on free and lower-tier plans). For almost everyone building a real website, WordPress.org is the right choice. I cover this in full in <a href="/wordpress-com-vs-wordpress-org">WordPress.com vs WordPress.org</a>.</p>

<h3>Is WordPress secure?</h3>
<p>WordPress itself is secure when properly maintained. Most security issues come from outdated plugins, weak passwords, or using nulled (pirated) themes and plugins. The basics — keeping everything updated, using strong passwords, and installing a security plugin like Wordfence — protect most sites from most attacks. I cover the full picture in my <a href="/wordpress-security">WordPress security guide</a>.</p>
`;
