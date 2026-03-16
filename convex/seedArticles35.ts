import { internalMutation } from "./_generated/server";

// ─── Article 1: Cloudflare CDN Setup ────────────────────────────────

export const seedCloudflareCDN = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "setup-cloudflare-cdn-wordpress";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-speed"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-speed' not found. Seed the speed cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-speed':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Set Up Cloudflare CDN for WordPress (Free & Fast)",
      excerpt:
        "Cloudflare's free CDN tier can cut your WordPress load times in half. I've set it up on every site I manage, and the process takes about 15 minutes. Here's exactly how to do it, step by step.",
      content: cloudflareCDNContent,
      category: "speed" as const,
      tags: [
        "cloudflare",
        "cdn",
        "wordpress speed",
        "cloudflare cdn",
        "bunnycdn",
        "content delivery network",
        "wordpress performance",
        "free cdn",
      ],
      seoTitle: "How to Set Up Cloudflare CDN for WordPress (2026 Guide)",
      seoDescription:
        "Step-by-step guide to setting up Cloudflare CDN for WordPress. Free tier setup, SSL configuration, caching rules, and comparison with BunnyCDN and other CDNs.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing Cloudflare CDN article:", existing._id);
      return {
        message: "Updated existing Cloudflare CDN article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new Cloudflare CDN article:", postId);
      return {
        message: "Created new Cloudflare CDN article",
        id: postId,
      };
    }
  },
});

const cloudflareCDNContent = `
<p>Every WordPress site I've ever built gets Cloudflare. Not because it's trendy, not because some blogger told me to — because it genuinely makes sites faster and more secure, and the free tier is shockingly generous. I've been using Cloudflare since 2015, and I've set it up on well over a hundred WordPress sites. The entire process takes about 15 minutes, and the performance gains are immediate.</p>

<p>In this guide, I'll walk you through every step of setting up Cloudflare CDN for your WordPress site. We'll cover what a CDN actually does, why Cloudflare's free plan is enough for most sites, the exact setup process, my recommended settings, and how Cloudflare compares to alternatives like BunnyCDN.</p>

<h2>What Is a CDN and Why Your WordPress Site Needs One</h2>

<p>A Content Delivery Network (CDN) is a global network of servers that stores copies of your website's static files — images, CSS, JavaScript, fonts — and serves them from the server closest to each visitor. Without a CDN, every visitor hits your origin server, no matter where they are. A visitor in Tokyo loading your site hosted in Amsterdam has to wait for data to travel literally halfway around the world.</p>

<p>With a CDN, that same visitor gets served from a data center in Tokyo. The result? Dramatically lower latency, faster page loads, and a better experience for everyone. CDNs also reduce the load on your origin server, which means your hosting can handle more traffic before slowing down. If you're serious about <a href="/wordpress-speed-optimization/">WordPress speed optimization</a>, a CDN is non-negotiable.</p>

<h2>Why Cloudflare Is My Default Recommendation</h2>

<p>There are plenty of CDN providers out there, but Cloudflare's free tier is hard to beat. Here's what you get without paying a cent:</p>

<ul>
<li><strong>Global CDN</strong> with over 300 data centers worldwide</li>
<li><strong>Free SSL certificate</strong> — no need to configure Let's Encrypt separately</li>
<li><strong>DDoS protection</strong> — automatic mitigation with no configuration needed</li>
<li><strong>DNS management</strong> — Cloudflare's DNS is one of the fastest in the world (1.1.1.1)</li>
<li><strong>Basic firewall rules</strong> — block bots, countries, or specific IPs</li>
<li><strong>Web analytics</strong> — basic traffic insights without any tracking scripts</li>
</ul>

<p>For a free service, that's an absurd amount of value. Most WordPress sites will never need to upgrade to a paid plan. I only recommend the Pro plan ($25/month) for sites that need image optimization (Polish) or the Web Application Firewall (WAF) with managed rulesets.</p>

<img src="/screenshots/cloudflare-homepage.webp" alt="Cloudflare homepage showing their global network and free tier offering" />

<h2>Step-by-Step: Setting Up Cloudflare for WordPress</h2>

<p>Here's the exact process I follow every time I set up Cloudflare on a new WordPress site. No guesswork, no unnecessary steps.</p>

<h3>Step 1: Create a Cloudflare Account</h3>

<p>Go to <strong>cloudflare.com</strong> and click <strong>"Sign Up"</strong>. Enter your email and create a password. That's it — no credit card required for the free plan.</p>

<h3>Step 2: Add Your Website</h3>

<p>Once logged in, click <strong>"Add a Site"</strong> in the top navigation bar. Enter your domain name (e.g., <code>yoursite.com</code>) and click <strong>"Add Site"</strong>. When asked to select a plan, choose the <strong>"Free"</strong> tier at the bottom and click <strong>"Continue"</strong>.</p>

<p>Cloudflare will scan your existing DNS records. This usually takes about 60 seconds. Review the records it found — they should match what you currently have at your domain registrar. If anything is missing, add it manually. The most important records are your <strong>A record</strong> (pointing to your server IP) and any <strong>CNAME records</strong> (like <code>www</code>).</p>

<h3>Step 3: Change Your Nameservers</h3>

<p>This is the critical step. Cloudflare will give you two nameservers — something like <code>ada.ns.cloudflare.com</code> and <code>bob.ns.cloudflare.com</code>. You need to update your domain registrar to use these nameservers instead of the current ones.</p>

<p>How to do this depends on your registrar:</p>

<ul>
<li><strong>Namecheap:</strong> Go to Domain List &rarr; click your domain &rarr; under "Nameservers," select <strong>"Custom DNS"</strong> and paste both Cloudflare nameservers</li>
<li><strong>GoDaddy:</strong> My Products &rarr; DNS &rarr; scroll to Nameservers &rarr; click <strong>"Change"</strong> &rarr; select <strong>"Enter my own nameservers"</strong></li>
<li><strong>Google Domains / Squarespace Domains:</strong> DNS &rarr; Custom name servers &rarr; toggle on and paste the Cloudflare nameservers</li>
</ul>

<p>After updating, click <strong>"Done, check nameservers"</strong> in Cloudflare. Propagation typically takes 15 minutes to a few hours, though I've seen it happen in under 5 minutes. Cloudflare will email you when the nameservers are active.</p>

<h3>Step 4: Configure SSL Mode — Full (Strict)</h3>

<p>This is where most people mess up. In the Cloudflare dashboard, go to <strong>SSL/TLS &rarr; Overview</strong>. Set the encryption mode to <strong>"Full (Strict)"</strong>.</p>

<p>Here's why this matters:</p>

<ul>
<li><strong>Flexible</strong> — encrypts traffic between visitors and Cloudflare, but sends unencrypted traffic to your server. This causes redirect loops with WordPress and is a security risk. Never use this.</li>
<li><strong>Full</strong> — encrypts both legs but doesn't verify your server's SSL certificate. Better, but not ideal.</li>
<li><strong>Full (Strict)</strong> — encrypts everything and verifies your server has a valid SSL certificate. This is the correct setting if your host provides SSL (and in 2026, they all do).</li>
</ul>

<p>If you're using a host like Cloudways, SiteGround, or any host that provides free Let's Encrypt SSL, Full (Strict) is the right choice. If you see redirect loops or errors after enabling Cloudflare, the SSL mode is almost always the problem.</p>

<h3>Step 5: Enable Caching</h3>

<p>Go to <strong>Caching &rarr; Configuration</strong>. Set the <strong>Caching Level</strong> to <strong>"Standard"</strong> — this is the default and works well for WordPress. Set the <strong>Browser Cache TTL</strong> to <strong>"Respect Existing Headers"</strong>. This lets your <a href="/best-caching-plugins/">WordPress caching plugin</a> control browser cache duration instead of Cloudflare overriding it.</p>

<p>Turn on <strong>"Always Online"</strong> — this serves a cached version of your site if your origin server goes down. It's saved me during more than one hosting outage.</p>

<h3>Step 6: Set Up Cache Rules (Replaces Page Rules)</h3>

<p>Cloudflare has moved from the old "Page Rules" system to the new <strong>Rules</strong> section. You get 10 free rules. Here are the essential ones for WordPress:</p>

<p><strong>Rule 1: Bypass cache for WordPress admin</strong></p>
<p>Go to <strong>Rules &rarr; Cache Rules &rarr; Create Rule</strong>. Set the rule to match when the URI path contains <code>/wp-admin/</code> or when the URI path contains <code>/wp-login.php</code>. Set the action to <strong>"Bypass Cache"</strong>. This ensures your admin dashboard always loads fresh content.</p>

<p><strong>Rule 2: Cache everything else aggressively</strong></p>
<p>Create another rule matching all other URLs. Set the action to <strong>"Eligible for Cache"</strong> with an Edge TTL of 1 month. This tells Cloudflare to cache your static pages at the edge, massively reducing origin server load.</p>

<h2>Recommended Cloudflare Settings for WordPress</h2>

<p>After the basic setup, here are the optimizations I enable on every WordPress site. All of these are available on the free plan unless noted otherwise.</p>

<h3>Speed &rarr; Optimization &rarr; Content Optimization</h3>

<ul>
<li><strong>Auto Minify:</strong> Enable for JavaScript, CSS, and HTML. This strips whitespace and comments from your files, reducing their size by 10-20%. If your caching plugin already minifies, you can skip this to avoid double-processing.</li>
<li><strong>Brotli compression:</strong> Turn this on. Brotli is more efficient than gzip and is supported by all modern browsers. Your files will be 15-20% smaller than with gzip alone.</li>
<li><strong>Early Hints:</strong> Enable this. It sends <code>103 Early Hints</code> headers, telling the browser to start loading critical resources before the HTML even finishes loading. Free performance boost.</li>
<li><strong>Rocket Loader:</strong> I recommend leaving this <strong>off</strong> for WordPress sites. It defers all JavaScript loading, which sounds great in theory but frequently breaks WordPress plugins, sliders, and interactive elements. Not worth the debugging headaches.</li>
</ul>

<h3>Cloudflare APO (Automatic Platform Optimization)</h3>

<p>If you want to go further, Cloudflare offers <strong>APO for WordPress</strong> at $5/month (or free with the Pro plan). APO caches your entire WordPress page — HTML included — at the edge. This effectively turns your dynamic WordPress site into a static site from a performance perspective. Load times can drop to under 200ms globally.</p>

<p>APO requires installing the official <strong>Cloudflare WordPress plugin</strong>. Go to <strong>Plugins &rarr; Add New</strong> in your WordPress dashboard, search for "Cloudflare," install it, and connect it with your API token. Then enable APO in the plugin settings.</p>

<p>For most sites, the free CDN settings above are enough. APO is worth it for high-traffic sites or sites where every millisecond matters for <a href="/core-web-vitals-wordpress/">Core Web Vitals</a> scores.</p>

<h3>Security Settings Worth Enabling</h3>

<ul>
<li><strong>Security &rarr; Settings &rarr; Security Level:</strong> Set to <strong>"Medium"</strong></li>
<li><strong>Security &rarr; Settings &rarr; Challenge Passage:</strong> Set to <strong>30 minutes</strong></li>
<li><strong>Security &rarr; Settings &rarr; Browser Integrity Check:</strong> Leave <strong>on</strong></li>
<li><strong>Security &rarr; Bots &rarr; Bot Fight Mode:</strong> Turn <strong>on</strong> — this blocks known bad bots from wasting your server resources</li>
</ul>

<h2>Cloudflare vs BunnyCDN vs Other CDNs — Quick Comparison</h2>

<p>Cloudflare is my default choice, but it's not the only option. Here's how the main CDN providers stack up for WordPress sites:</p>

<table>
<thead>
<tr>
<th>Feature</th>
<th>Cloudflare (Free)</th>
<th>Cloudflare Pro ($25/mo)</th>
<th>BunnyCDN</th>
<th>KeyCDN</th>
</tr>
</thead>
<tbody>
<tr>
<td>Price</td>
<td>Free</td>
<td>$25/month</td>
<td>~$1/mo for small sites</td>
<td>Pay-per-use ($0.04/GB)</td>
</tr>
<tr>
<td>Global PoPs</td>
<td>300+</td>
<td>300+</td>
<td>123</td>
<td>60+</td>
</tr>
<tr>
<td>Free SSL</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>DDoS Protection</td>
<td>Yes</td>
<td>Yes (advanced)</td>
<td>Basic</td>
<td>Basic</td>
</tr>
<tr>
<td>Image Optimization</td>
<td>No</td>
<td>Yes (Polish)</td>
<td>Yes (Bunny Optimizer)</td>
<td>No</td>
</tr>
<tr>
<td>WordPress Plugin</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes (CDN Enabler)</td>
<td>Yes</td>
</tr>
<tr>
<td>Setup Complexity</td>
<td>Nameserver change</td>
<td>Nameserver change</td>
<td>CNAME only</td>
<td>CNAME only</td>
</tr>
<tr>
<td>Best For</td>
<td>Most WordPress sites</td>
<td>High-traffic / security focus</td>
<td>Budget-conscious, media-heavy</td>
<td>Developers, pay-per-use</td>
</tr>
</tbody>
</table>

<img src="/screenshots/bunnycdn-homepage.webp" alt="BunnyCDN homepage — a popular alternative CDN for WordPress sites" />

<p><strong>My recommendation:</strong> Start with Cloudflare Free. It costs nothing and handles 90% of what you need. If you run a media-heavy site with lots of images and video, BunnyCDN's pay-as-you-go pricing ($0.01/GB in most regions) combined with their image optimizer is excellent value. You can even use both — Cloudflare as your DNS/security layer and BunnyCDN specifically for media delivery.</p>

<h2>Frequently Asked Questions</h2>

<h3>Does Cloudflare slow down WordPress?</h3>
<p>No — if configured correctly, Cloudflare speeds up WordPress significantly. The most common issue I see is people setting the SSL mode to "Flexible," which causes redirect loops and makes the site appear broken. Set it to Full (Strict) and you'll be fine. If you notice any issues, disable Rocket Loader first — that setting causes more problems than it solves on WordPress sites.</p>

<h3>Do I still need a caching plugin with Cloudflare?</h3>
<p>Yes. Cloudflare caches static files at the edge, but a <a href="/best-caching-plugins/">WordPress caching plugin</a> handles server-side page caching, HTML minification, and database query caching. They work at different levels and complement each other. I typically pair Cloudflare with WP Rocket or LiteSpeed Cache.</p>

<h3>Can I use Cloudflare with any hosting provider?</h3>
<p>Yes. Cloudflare works with every hosting provider because it sits in front of your server as a reverse proxy. You simply point your domain's nameservers to Cloudflare, and Cloudflare routes traffic to your host. Whether you're on shared hosting, a VPS, or managed WordPress hosting, the setup process is identical.</p>

<h3>Will Cloudflare break my WordPress site?</h3>
<p>It shouldn't, but there are two common issues: redirect loops (fix: set SSL to Full Strict) and broken dynamic features like WooCommerce carts or membership login pages (fix: create cache bypass rules for those URLs). If you follow the setup steps in this guide, you'll avoid both problems entirely.</p>

<p>Setting up Cloudflare is one of the highest-impact, lowest-effort optimizations you can make for your WordPress site. Combined with a good <a href="/best-caching-plugins/">caching plugin</a> and <a href="/best-image-optimization-plugins/">image optimization</a>, you're well on your way to a fast, globally-distributed WordPress site. For the complete picture of everything that affects your site's speed, check out my full <a href="/wordpress-speed-optimization/">WordPress Speed Optimization</a> guide.</p>
`;

// ─── Article 2: Database Optimization ────────────────────────────────

export const seedDatabaseOptimization = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-database-optimization";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-speed"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-speed' not found. Seed the speed cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-speed':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "WordPress Database Optimization — Clean Up for Speed",
      excerpt:
        "Your WordPress database accumulates junk over time — post revisions, spam comments, expired transients, orphaned metadata. I'll show you how to clean it up safely with WP-Optimize and phpMyAdmin, and how to schedule automatic cleanups.",
      content: databaseOptimizationContent,
      category: "speed" as const,
      tags: [
        "wordpress database",
        "database optimization",
        "wp-optimize",
        "phpmyadmin",
        "post revisions",
        "transients",
        "wordpress speed",
        "wordpress performance",
      ],
      seoTitle:
        "WordPress Database Optimization: Clean Up for Speed (2026)",
      seoDescription:
        "Learn how to clean and optimize your WordPress database for faster load times. Step-by-step guide using WP-Optimize and phpMyAdmin to remove bloat and schedule cleanups.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing database optimization article:",
        existing._id,
      );
      return {
        message: "Updated existing database optimization article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new database optimization article:", postId);
      return {
        message: "Created new database optimization article",
        id: postId,
      };
    }
  },
});

const databaseOptimizationContent = `
<p>Here's something most WordPress tutorials won't tell you: your database is quietly getting bloated every single day. Every time you hit "Save Draft," WordPress creates a post revision. Every spam comment Akismet catches stays in the database. Every plugin that stores temporary data creates transients that may never get cleaned up. After a year, a typical WordPress database can be 5-10x larger than it needs to be.</p>

<p>I've seen WordPress sites where a simple database cleanup dropped query times by 40%. That's not a typo. The database is the backbone of your WordPress site — every page load involves multiple database queries. When the database is bloated, every single query takes longer. In this guide, I'll show you exactly what to clean, how to clean it safely, and how to automate the process so your database stays lean.</p>

<h2>Why Your WordPress Database Slows Down Over Time</h2>

<p>WordPress stores everything in a MySQL (or MariaDB) database — your posts, pages, comments, settings, plugin data, theme options, all of it. Over time, several types of unnecessary data accumulate:</p>

<ul>
<li><strong>Post revisions:</strong> WordPress saves a new revision every time you click "Save Draft" or "Update." A single post can easily have 50+ revisions, each storing a complete copy of the content.</li>
<li><strong>Auto-drafts:</strong> WordPress auto-saves your work every 60 seconds. These auto-drafts pile up in the database.</li>
<li><strong>Trashed posts and pages:</strong> Items in the trash stay in the database until you empty it.</li>
<li><strong>Spam and trashed comments:</strong> Even after Akismet flags spam, those comments live in the database.</li>
<li><strong>Expired transients:</strong> Plugins use transients (temporary cached data). Many plugins don't clean up their transients when they expire.</li>
<li><strong>Orphaned postmeta:</strong> When you delete a post, the associated metadata sometimes gets left behind.</li>
<li><strong>Orphaned relationships:</strong> Tags and categories assigned to deleted posts leave behind orphaned term relationships.</li>
</ul>

<p>All of this junk inflates your database tables, makes indexes less efficient, and slows down the queries that power every page of your WordPress site. Cleaning it up is one of the easiest wins for <a href="/wordpress-speed-optimization/">WordPress speed optimization</a>.</p>

<h2>Method 1: Using WP-Optimize (Recommended)</h2>

<p>WP-Optimize is my go-to plugin for database cleanup. It's free, well-maintained by the team behind UpdraftPlus, and handles everything you need without touching phpMyAdmin. Over a million sites use it, and I've never had it cause a problem.</p>

<img src="/screenshots/wp-optimize-plugin.webp" alt="WP-Optimize plugin page on WordPress.org — database cleanup, image compression, and caching in one plugin" />

<h3>Step 1: Install WP-Optimize</h3>

<p>In your WordPress dashboard, go to <strong>Plugins &rarr; Add New</strong>. Search for <strong>"WP-Optimize"</strong>. Click <strong>"Install Now"</strong>, then <strong>"Activate"</strong>.</p>

<h3>Step 2: Run Your First Cleanup</h3>

<p>After activation, go to <strong>WP-Optimize &rarr; Database</strong> in the left sidebar. You'll see a list of optimization options with checkboxes. Here's what I recommend enabling for your first cleanup:</p>

<ul>
<li><strong>Clean all post revisions</strong> — check this. This is usually the biggest space saver.</li>
<li><strong>Clean all auto-draft posts</strong> — check this.</li>
<li><strong>Clean all trashed posts</strong> — check this.</li>
<li><strong>Remove spam comments</strong> — check this.</li>
<li><strong>Remove trashed comments</strong> — check this.</li>
<li><strong>Remove expired transient options</strong> — check this.</li>
<li><strong>Remove orphaned post meta</strong> — check this.</li>
<li><strong>Optimize database tables</strong> — check this. This runs MySQL's <code>OPTIMIZE TABLE</code> command, which defragments your tables and reclaims wasted space.</li>
</ul>

<p>Before clicking anything, take note of the numbers next to each item. WP-Optimize tells you exactly how many items it will remove. On a site that's been running for a year without cleanup, I typically see 500-2000+ post revisions and hundreds of expired transients.</p>

<h3>Step 3: Take a Backup First</h3>

<p>I know, I know — nobody wants to hear "take a backup first." But seriously, do it. WP-Optimize even has a button to create a backup before optimizing if you have UpdraftPlus installed. Click <strong>"Create a backup with UpdraftPlus"</strong> at the top of the optimization page. If you don't have UpdraftPlus, use whatever backup solution you have — just make sure you have a recent database backup before proceeding.</p>

<h3>Step 4: Run the Optimization</h3>

<p>Click <strong>"Run all selected optimizations"</strong>. WP-Optimize will process each task and show you how many items were removed and how much space was recovered. On a typical year-old site, you'll see anywhere from 5MB to 50MB of database bloat removed.</p>

<h3>Step 5: Verify Everything Works</h3>

<p>After the cleanup, visit your site's front end and check a few pages. Log into the admin, create a test post draft, check your comments. Everything should work exactly as before, just faster. If anything looks wrong (extremely unlikely), restore from the backup you created in Step 3.</p>

<h2>Method 2: Manual Cleanup via phpMyAdmin (For Developers)</h2>

<p>If you prefer direct database access or want more granular control, you can clean up your WordPress database manually through phpMyAdmin. This method is faster for experienced users but riskier if you make a mistake. <strong>Always back up your database before running any SQL queries.</strong></p>

<h3>Access phpMyAdmin</h3>

<p>Log into your hosting control panel (cPanel, Plesk, or your host's custom panel). Find <strong>"phpMyAdmin"</strong> under the Databases section and click it. Select your WordPress database from the left sidebar.</p>

<h3>Delete Post Revisions</h3>

<p>Click the <strong>"SQL"</strong> tab at the top and run this query:</p>

<pre><code>DELETE a, b, c
FROM wp_posts a
LEFT JOIN wp_term_relationships b ON (a.ID = b.object_id)
LEFT JOIN wp_postmeta c ON (a.ID = c.post_id)
WHERE a.post_type = 'revision';</code></pre>

<p>Replace <code>wp_</code> with your actual table prefix if you changed it during installation.</p>

<h3>Delete Expired Transients</h3>

<pre><code>DELETE FROM wp_options
WHERE option_name LIKE '%_transient_timeout_%'
AND option_value < UNIX_TIMESTAMP();</code></pre>

<p>Then clean up the corresponding transient values:</p>

<pre><code>DELETE FROM wp_options
WHERE option_name LIKE '%_transient_%'
AND option_name NOT LIKE '%_transient_timeout_%';</code></pre>

<h3>Delete Spam and Trashed Comments</h3>

<pre><code>DELETE FROM wp_comments WHERE comment_approved = 'spam';
DELETE FROM wp_comments WHERE comment_approved = 'trash';</code></pre>

<h3>Optimize All Tables</h3>

<p>After deleting data, select all tables in phpMyAdmin, choose <strong>"Optimize table"</strong> from the dropdown menu at the bottom, and click <strong>"Go"</strong>. This reclaims the freed space and rebuilds table indexes.</p>

<h2>What to Clean and What to Keep</h2>

<p>Here's my definitive list of what's safe to clean and what you should leave alone:</p>

<table>
<thead>
<tr>
<th>Data Type</th>
<th>Safe to Clean?</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Post revisions</td>
<td>Yes</td>
<td>Keep the last 3-5 per post (see below)</td>
</tr>
<tr>
<td>Auto-drafts</td>
<td>Yes</td>
<td>Safe to remove all</td>
</tr>
<tr>
<td>Trashed posts</td>
<td>Yes</td>
<td>Check trash first — you might want something back</td>
</tr>
<tr>
<td>Spam comments</td>
<td>Yes</td>
<td>Remove all without hesitation</td>
</tr>
<tr>
<td>Trashed comments</td>
<td>Yes</td>
<td>Safe to remove all</td>
</tr>
<tr>
<td>Expired transients</td>
<td>Yes</td>
<td>Plugins will recreate them as needed</td>
</tr>
<tr>
<td>Orphaned postmeta</td>
<td>Yes</td>
<td>Metadata for deleted posts — no longer needed</td>
</tr>
<tr>
<td>Active transients</td>
<td>Careful</td>
<td>Only delete if you know what plugin created them</td>
</tr>
<tr>
<td>wp_options autoload</td>
<td>Careful</td>
<td>Disable autoload on large values, don't delete them</td>
</tr>
</tbody>
</table>

<h3>Limit Post Revisions Going Forward</h3>

<p>The single most impactful thing you can do is limit post revisions so your database doesn't bloat up again. Add this line to your <code>wp-config.php</code> file, just above the line that says <code>/* That's all, stop editing! */</code>:</p>

<pre><code>define('WP_POST_REVISIONS', 5);</code></pre>

<p>This limits WordPress to keeping only the last 5 revisions per post. That gives you enough undo history without the database growing out of control. Some people set it to 3, some to 10 — I find 5 is the sweet spot. If you want to disable revisions entirely (I don't recommend this), set the value to <code>false</code>.</p>

<h3>Disable Auto-Saves or Increase the Interval</h3>

<p>WordPress auto-saves every 60 seconds by default. If you want to reduce how often auto-saves happen, add this to <code>wp-config.php</code>:</p>

<pre><code>define('AUTOSAVE_INTERVAL', 300); // Auto-save every 5 minutes</code></pre>

<h2>Schedule Automatic Database Cleanups</h2>

<p>Manual cleanups are great, but the real power move is automating the process. WP-Optimize makes this simple.</p>

<p>Go to <strong>WP-Optimize &rarr; Settings</strong> (or the scheduling section within the Database tab). Enable <strong>"Enable scheduled clean-up and target of optimization"</strong>. I recommend the following schedule:</p>

<ul>
<li><strong>Frequency:</strong> Weekly</li>
<li><strong>Day:</strong> Sunday (or whenever your traffic is lowest)</li>
<li><strong>Optimizations to run:</strong> Enable all the same options from your manual cleanup — revisions, auto-drafts, spam comments, expired transients, and table optimization</li>
</ul>

<p>With scheduled cleanups, your database stays lean without you ever having to think about it. I set this up on every WordPress site I manage, and database performance stays consistently fast over the long term.</p>

<p>If you're not using WP-Optimize, you can also schedule cleanups using <strong>WP-Sweep</strong> (another excellent free plugin) or by setting up a cron job on your server. But for most people, WP-Optimize's built-in scheduler is the easiest and most reliable option.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can database optimization break my WordPress site?</h3>
<p>Not if you use WP-Optimize or stick to the safe cleanup items listed above. These operations only remove genuinely unnecessary data — spam comments, old revisions, expired temporary data. I've run database cleanups on hundreds of sites and never had one break. That said, always take a backup before your first cleanup. It takes two minutes and gives you a safety net.</p>

<h3>How often should I optimize my WordPress database?</h3>
<p>Weekly is ideal for active sites (sites where you publish regularly or have active comment sections). Monthly is fine for sites that don't change much. Set up automatic scheduling in WP-Optimize and forget about it. If you notice your site getting sluggish and it's been a while since your last cleanup, run a manual optimization and check if it makes a difference.</p>

<h3>Does database optimization help with Core Web Vitals?</h3>
<p>Indirectly, yes. A bloated database means slower server response times, which increases your <a href="/core-web-vitals-wordpress/">Time to First Byte (TTFB)</a>. TTFB affects all three Core Web Vitals because everything else waits for the server to respond. I've seen TTFB drop by 100-200ms after a thorough database cleanup on sites that hadn't been optimized in over a year. Combined with a good <a href="/best-caching-plugins/">caching plugin</a>, your TTFB should be well under 500ms.</p>

<p>Database optimization is one of those things that doesn't sound exciting, but the results speak for themselves. A clean database means faster queries, lower server load, and snappier page loads for your visitors. Pair it with the other techniques in my <a href="/wordpress-speed-optimization/">WordPress Speed Optimization</a> guide for the full picture.</p>
`;

// ─── Article 3: Lazy Loading ─────────────────────────────────────────

export const seedLazyLoading = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-lazy-loading";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-speed"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-speed' not found. Seed the speed cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-speed':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "Lazy Loading in WordPress — Complete Guide",
      excerpt:
        "Lazy loading defers images, iframes, and videos until they're scrolled into view. WordPress has native lazy loading since version 5.5, but there's more to it than just the built-in solution. Here's everything you need to know.",
      content: lazyLoadingContent,
      category: "speed" as const,
      tags: [
        "lazy loading",
        "wordpress images",
        "a3 lazy load",
        "wp rocket",
        "perfmatters",
        "wordpress speed",
        "core web vitals",
        "lcp",
        "wordpress performance",
      ],
      seoTitle: "WordPress Lazy Loading: Complete Guide (2026)",
      seoDescription:
        "Learn how to implement lazy loading in WordPress for images, iframes, and videos. Covers native lazy loading, best plugins (a3 Lazy Load, Perfmatters), and common pitfalls like LCP issues.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing lazy loading article:", existing._id);
      return {
        message: "Updated existing lazy loading article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new lazy loading article:", postId);
      return {
        message: "Created new lazy loading article",
        id: postId,
      };
    }
  },
});

const lazyLoadingContent = `
<p>When I audit WordPress sites for performance, one of the first things I check is whether lazy loading is working correctly. The concept is simple: instead of loading every image, iframe, and video on the page at once, you only load them when the user scrolls them into view. On a typical blog post with 10+ images, this can reduce initial page weight by 50-70% and dramatically improve load times.</p>

<p>WordPress has had native lazy loading since version 5.5, which was a huge step forward. But the built-in solution has limitations. In this guide, I'll cover everything: how native lazy loading works, when you need a plugin for more control, the best lazy loading plugins compared, how to test if it's working, and the common mistakes that actually hurt performance instead of helping it.</p>

<h2>What Is Lazy Loading?</h2>

<p>Lazy loading is a technique where images, iframes (like embedded YouTube videos), and other heavy resources are only loaded when they're about to become visible in the browser viewport. Instead of the browser downloading all 15 images on a page the moment it loads, it only downloads the 2-3 images visible "above the fold." As the user scrolls down, the remaining images load just before they come into view.</p>

<p>The performance benefits are significant. Fewer initial HTTP requests, less bandwidth consumed, faster <a href="/core-web-vitals-wordpress/">Core Web Vitals</a> scores, and a snappier experience — especially on mobile connections. Google explicitly recommends lazy loading as a performance best practice, and it's one of the most common recommendations in PageSpeed Insights audits.</p>

<h2>WordPress Native Lazy Loading (Since WP 5.5)</h2>

<p>Starting with WordPress 5.5 (released in August 2020), WordPress automatically adds the <code>loading="lazy"</code> attribute to all <code>&lt;img&gt;</code> tags in your post content. This is a native browser feature — no JavaScript required, no plugins needed. The browser handles everything.</p>

<p>Here's what WordPress does by default:</p>

<ul>
<li>Adds <code>loading="lazy"</code> to images in post and page content</li>
<li>Adds <code>loading="lazy"</code> to images in comment sections</li>
<li>Adds <code>loading="lazy"</code> to avatar images (Gravatars)</li>
<li>Since WordPress 5.9, it <strong>skips the first content image</strong> — this is important because you don't want to lazy load above-the-fold images (more on this later)</li>
</ul>

<p>The native approach works well for basic sites. If you run a simple blog with images in your posts, the built-in lazy loading is probably sufficient. You don't need to install anything — it just works.</p>

<p>However, native lazy loading has several limitations:</p>

<ul>
<li><strong>No iframe support:</strong> WordPress doesn't add <code>loading="lazy"</code> to iframes (YouTube embeds, Google Maps, etc.) by default</li>
<li><strong>No video support:</strong> Native lazy loading doesn't handle <code>&lt;video&gt;</code> elements</li>
<li><strong>No background images:</strong> CSS background images can't be lazy loaded with the <code>loading</code> attribute</li>
<li><strong>No placeholder/blur-up effect:</strong> Images simply appear when loaded — no smooth fade-in or low-quality placeholder</li>
<li><strong>No threshold control:</strong> You can't configure how far in advance images start loading before they enter the viewport</li>
<li><strong>Theme images may be skipped:</strong> Images added directly by your theme (header images, widget images) might not get the lazy loading attribute</li>
</ul>

<h2>When You Need a Lazy Loading Plugin</h2>

<p>If any of the following apply to your site, a dedicated lazy loading plugin is worth installing:</p>

<ul>
<li><strong>You embed YouTube videos or Google Maps</strong> — iframes are heavy. A single YouTube embed loads 1-2MB of data even if the visitor never clicks play. A good lazy loading plugin replaces the iframe with a lightweight placeholder (thumbnail + play button) until the user clicks.</li>
<li><strong>Your theme uses CSS background images</strong> — hero sections, sliders, and parallax effects often use <code>background-image</code> in CSS. Only JavaScript-based lazy loading can handle these.</li>
<li><strong>You want visual placeholders</strong> — a blur-up effect or colored placeholder while images load provides a better user experience than a blank space suddenly being filled.</li>
<li><strong>You need more control over which images are excluded</strong> — sometimes you need to exclude specific images from lazy loading (logos, above-the-fold hero images, critical product images).</li>
<li><strong>You have a media-heavy site</strong> — portfolio sites, photography blogs, or WooCommerce stores with dozens of product images per page benefit significantly from more aggressive lazy loading.</li>
</ul>

<h2>Best Lazy Loading Plugins for WordPress</h2>

<p>I've tested all the major lazy loading plugins over the years. Here are the three I recommend, depending on your needs and budget:</p>

<img src="/screenshots/a3-lazy-load-plugin.webp" alt="a3 Lazy Load plugin on WordPress.org — free lazy loading for images, iframes, and videos" />

<table>
<thead>
<tr>
<th>Feature</th>
<th>a3 Lazy Load</th>
<th>Perfmatters</th>
<th>WP Rocket (built-in)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Price</td>
<td>Free</td>
<td>$24.95/year</td>
<td>$59/year (full caching plugin)</td>
</tr>
<tr>
<td>Images</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Iframes/YouTube</td>
<td>Yes</td>
<td>Yes (with YouTube facade)</td>
<td>Yes (with YouTube facade)</td>
</tr>
<tr>
<td>Videos</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
</tr>
<tr>
<td>Background images</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
</tr>
<tr>
<td>Placeholder effect</td>
<td>Spinner or custom</td>
<td>None (native loading)</td>
<td>None (native loading)</td>
</tr>
<tr>
<td>Exclude specific images</td>
<td>Yes (by CSS class)</td>
<td>Yes (by class or URL)</td>
<td>Yes (by class or attribute)</td>
</tr>
<tr>
<td>YouTube thumbnail facade</td>
<td>No</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Performance impact</td>
<td>Minimal (lightweight)</td>
<td>Minimal</td>
<td>Part of larger plugin</td>
</tr>
<tr>
<td>Best for</td>
<td>Free, full-featured solution</td>
<td>Lightweight paid option</td>
<td>Already using WP Rocket</td>
</tr>
</tbody>
</table>

<h3>a3 Lazy Load — Best Free Option</h3>

<p>a3 Lazy Load is the most comprehensive free lazy loading plugin. It handles images, iframes, videos, and even CSS background images. Setup takes about two minutes: install it, go to <strong>Settings &rarr; a3 Lazy Load</strong>, and the defaults are sensible. The plugin uses the Intersection Observer API, which is well-supported in all modern browsers.</p>

<p>I recommend enabling these settings:</p>
<ul>
<li><strong>Lazy Load Images:</strong> On</li>
<li><strong>Lazy Load Videos:</strong> On</li>
<li><strong>Lazy Load iframes:</strong> On</li>
<li><strong>Skip images with class "no-lazy":</strong> This lets you exclude specific images by adding the CSS class <code>no-lazy</code> to them</li>
<li><strong>Effect:</strong> Choose "fadein" for a smooth appearance transition</li>
</ul>

<h3>Perfmatters — Best Lightweight Paid Option</h3>

<p>Perfmatters ($24.95/year) is a performance-focused plugin that includes lazy loading plus dozens of other optimizations (disable unused scripts, DNS prefetching, local Google Analytics, script manager). If you want an all-in-one performance toolkit beyond just lazy loading, Perfmatters is excellent value.</p>

<p>Its lazy loading implementation is clean and uses the native <code>loading="lazy"</code> attribute where possible, falling back to JavaScript only when needed. The YouTube facade feature is particularly nice — it replaces YouTube iframes with a static thumbnail and play button, saving 1-2MB per embed.</p>

<h3>WP Rocket — If You're Already Using It</h3>

<p>If you already use <a href="/best-caching-plugins/">WP Rocket as your caching plugin</a>, don't install a separate lazy loading plugin. WP Rocket includes lazy loading for images and iframes, plus a YouTube facade feature. Go to <strong>WP Rocket &rarr; Media</strong> and enable <strong>"LazyLoad for images"</strong> and <strong>"LazyLoad for iframes and videos"</strong>. Check the <strong>"Replace YouTube iframe with preview image"</strong> option to save bandwidth on YouTube embeds.</p>

<h2>How to Test If Lazy Loading Is Working</h2>

<p>After setting up lazy loading, you need to verify it's actually working. Here are three methods I use:</p>

<h3>Method 1: Browser DevTools Network Tab</h3>

<p>Open your site in Chrome or Firefox. Press <strong>F12</strong> to open DevTools. Click the <strong>"Network"</strong> tab. Filter by <strong>"Img"</strong> to see only image requests. Now reload the page. You should see that only the above-the-fold images load initially. As you scroll down, new image requests should appear in the Network tab as each image enters the viewport.</p>

<h3>Method 2: View Page Source</h3>

<p>Right-click on your page and select <strong>"View Page Source"</strong>. Search for <code>loading="lazy"</code>. You should find this attribute on your image tags (except the first content image, which should not be lazy loaded). If you're using a JavaScript-based plugin like a3 Lazy Load, look for <code>data-src</code> attributes instead of regular <code>src</code> attributes on images below the fold.</p>

<h3>Method 3: PageSpeed Insights</h3>

<p>Run your page through <strong>PageSpeed Insights</strong> (pagespeed.web.dev). Look for the audit called <strong>"Defer offscreen images"</strong>. If lazy loading is working correctly, this audit should show a green checkmark. If it still shows a warning, some images below the fold aren't being lazy loaded — usually theme images or images added via custom HTML that bypass the lazy loading mechanism.</p>

<h2>Common Lazy Loading Mistakes (And How to Fix Them)</h2>

<p>Lazy loading can actually <em>hurt</em> performance if implemented incorrectly. Here are the most common mistakes I see:</p>

<h3>Mistake 1: Lazy Loading Above-the-Fold Images (Kills LCP)</h3>

<p>This is the number one lazy loading mistake. If you lazy load your hero image, featured image, or any image that's visible when the page first loads (without scrolling), you're directly harming your <strong>Largest Contentful Paint (LCP)</strong> score. LCP measures how long it takes for the largest visible element to render — and that's often your hero image.</p>

<p>When you lazy load an above-the-fold image, the browser waits until the page is partially rendered, then the lazy loading script detects the image is in view, and <em>then</em> it starts downloading. This adds unnecessary delay to what should be a priority resource.</p>

<p><strong>The fix:</strong> Exclude above-the-fold images from lazy loading. WordPress 5.9+ does this automatically for the first content image, but your theme's header image, logo, or hero banner may not be excluded. In a3 Lazy Load, add the CSS class <code>no-lazy</code> to these images. In WP Rocket, add <code>data-no-lazy="1"</code> as an attribute. Better yet, add <code>fetchpriority="high"</code> to your LCP image to tell the browser to prioritize it.</p>

<h3>Mistake 2: Layout Shifts from Missing Dimensions</h3>

<p>When a lazy-loaded image finally loads, it can push content around on the page — this is called a <strong>layout shift</strong>, and it hurts your <a href="/core-web-vitals-wordpress/">Cumulative Layout Shift (CLS)</a> score. This happens when your images don't have explicit <code>width</code> and <code>height</code> attributes.</p>

<p><strong>The fix:</strong> Always set <code>width</code> and <code>height</code> attributes on your <code>&lt;img&gt;</code> tags. WordPress does this automatically when you insert images through the media library, but images added via custom HTML or page builders sometimes lack these attributes. When the browser knows the image dimensions in advance, it reserves the correct space even before the image loads, preventing layout shifts.</p>

<h3>Mistake 3: Lazy Loading Critical JavaScript-Dependent Content</h3>

<p>Some plugins and themes load images via JavaScript (sliders, galleries, lightboxes). If your lazy loading plugin tries to modify these images, it can conflict with the gallery plugin's own loading mechanism, resulting in broken images or double-loading.</p>

<p><strong>The fix:</strong> Exclude JavaScript-powered galleries and sliders from lazy loading. Most lazy loading plugins let you exclude images by CSS class or by parent container. In a3 Lazy Load, you can specify exclusion classes under the settings. In WP Rocket, you can exclude entire page sections.</p>

<h3>Mistake 4: Using Multiple Lazy Loading Solutions</h3>

<p>If you're running WordPress 5.5+ (which adds native lazy loading), plus a caching plugin with lazy loading, plus a dedicated lazy loading plugin — you've got three systems trying to modify the same images. This can cause conflicts, broken images, or unnecessary JavaScript overhead.</p>

<p><strong>The fix:</strong> Pick one lazy loading solution and disable the others. If you use WP Rocket, use its built-in lazy loading and don't install a3 Lazy Load. If you want the most control, use a3 Lazy Load and disable lazy loading in your caching plugin. WordPress's native lazy loading works alongside plugins because it uses the browser's built-in <code>loading</code> attribute, which doesn't conflict with JavaScript-based solutions.</p>

<h2>Frequently Asked Questions</h2>

<h3>Does lazy loading affect SEO?</h3>
<p>No. Google fully supports the <code>loading="lazy"</code> attribute and JavaScript-based lazy loading. Googlebot renders pages and scrolls through content, so lazy-loaded images are still indexed. The one caveat: make sure your images have proper <code>alt</code> attributes and that they're in standard <code>&lt;img&gt;</code> tags (not loaded exclusively via JavaScript without any HTML fallback). If Googlebot can find the image URL in the HTML, it will index it.</p>

<h3>Should I lazy load all images?</h3>
<p>No. Exclude your above-the-fold images — the ones visible without scrolling. This typically includes your site logo, header image, hero banner, and the featured image if it appears at the top of posts. Lazy loading these critical images delays their rendering and hurts your LCP score. Only lazy load images that are below the fold — the ones users have to scroll to see.</p>

<h3>Does lazy loading work on mobile?</h3>
<p>Yes, and it's even more important on mobile. Mobile connections are typically slower than desktop, so deferring offscreen images has a bigger impact on load times. The native <code>loading="lazy"</code> attribute is supported by all major mobile browsers (Chrome, Safari, Firefox, Samsung Internet). JavaScript-based lazy loading solutions like a3 Lazy Load also work perfectly on mobile devices.</p>

<p>Lazy loading is one of the simplest and most effective <a href="/wordpress-speed-optimization/">WordPress speed optimizations</a> you can make. Get the implementation right — especially the above-the-fold exclusion — and you'll see immediate improvements in both load times and <a href="/core-web-vitals-wordpress/">Core Web Vitals</a> scores. For more performance wins, check out my guides on <a href="/best-caching-plugins/">caching plugins</a> and <a href="/best-image-optimization-plugins/">image optimization</a>.</p>
`;
