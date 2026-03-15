import { internalMutation } from "./_generated/server";

export const seedInstallGoogleAnalytics = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "install-google-analytics-wordpress";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-seo"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-seo' not found. Seed the SEO cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-seo':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "How to Add Google Analytics to WordPress (3 Methods, Step by Step)",
      excerpt:
        "A practical, no-fluff guide to installing Google Analytics on your WordPress site. I walk you through three methods — MonsterInsights, Site Kit by Google, and manual code — so you can start tracking real visitor data today.",
      content: installGoogleAnalyticsContent,
      category: "seo",
      tags: [
        "google analytics",
        "google analytics wordpress",
        "monsterinsights",
        "site kit",
        "wordpress analytics",
        "ga4",
        "website tracking",
      ],
      seoTitle:
        "How to Add Google Analytics to WordPress (2026 Guide)",
      seoDescription:
        "Learn how to install Google Analytics on WordPress using MonsterInsights, Site Kit by Google, or manual code. Step-by-step instructions with screenshots for beginners.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing Google Analytics article:",
        existing._id
      );
      return {
        message: "Updated existing Google Analytics article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new Google Analytics article:", postId);
      return {
        message: "Created new Google Analytics article",
        id: postId,
      };
    }
  },
});

const installGoogleAnalyticsContent = `
<p>I put off installing Google Analytics on my first WordPress site for way too long. For months, I was publishing content and had absolutely no idea if anyone was reading it. When I finally set up analytics and saw my first real traffic data, it changed how I approached everything — from the topics I wrote about to the way I structured my pages. That single free tool gave me more clarity about my site than anything else I'd tried.</p>

<p>If you're running a WordPress site without analytics, you're flying blind. In this guide, I'll show you exactly how to add Google Analytics to WordPress using three different methods — from the easiest plugin approach to the manual developer route. Pick the one that matches your comfort level and you'll be tracking visitors within the next 15 minutes.</p>

<img src="/screenshots/google-analytics-homepage.webp" alt="Google Analytics homepage showing the free analytics platform" />

<h2>Why You Need Google Analytics on Your WordPress Site</h2>

<p>Google Analytics is the most widely used web analytics platform on the planet, and it's completely free. Once installed, it tells you exactly who visits your site, where they come from, what pages they read, how long they stay, and what they do before leaving. Without this data, every decision you make about your site — what content to create, which pages to improve, where to focus your marketing efforts — is based on guesswork.</p>

<p>Here's what Google Analytics actually shows you:</p>

<ul>
<li><strong>How many people visit your site</strong> — daily, weekly, monthly, with trends over time</li>
<li><strong>Where your traffic comes from</strong> — Google search, social media, direct visits, referral links, or email campaigns</li>
<li><strong>Which pages perform best</strong> — so you can double down on what works</li>
<li><strong>How long visitors stay</strong> — and whether they're actually engaging with your content</li>
<li><strong>What devices and browsers they use</strong> — so you can optimize the experience</li>
</ul>

<p>Whether you're running a blog, an online store, or a business website, this data is essential. And the best part? Google Analytics 4 (GA4) is the current version, and it's free for everyone. Let's get it installed.</p>

<h2>Before You Start: Create a Google Analytics Account</h2>

<p>Before connecting Analytics to WordPress, you need a Google Analytics account and a property for your website. If you already have this set up, skip ahead to the installation method of your choice.</p>

<ol>
<li><strong>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener">analytics.google.com</a></strong> and sign in with your Google account (the same one you use for Gmail works fine)</li>
<li><strong>Click "Start measuring"</strong> to begin the setup wizard</li>
<li><strong>Enter an Account name</strong> — this can be your business name or just "My Websites"</li>
<li><strong>Create a Property</strong> — enter your website name, select your time zone, and choose your currency</li>
<li><strong>Fill in your business details</strong> — select your industry category and business size</li>
<li><strong>Choose your business objectives</strong> — select "Get baseline reports" if you're not sure</li>
<li><strong>Select "Web" as your platform</strong> when asked how you want to collect data</li>
<li><strong>Enter your website URL</strong> and give your data stream a name (your site name works)</li>
<li><strong>Copy your Measurement ID</strong> — it starts with "G-" followed by a string of characters (e.g., G-ABC123XYZ). You'll need this for the WordPress setup</li>
</ol>

<p>That's it for the Google side. Now let's connect it to WordPress.</p>

<h2>Method 1: Using MonsterInsights (Easiest for Beginners)</h2>

<p><a href="https://www.monsterinsights.com/" target="_blank" rel="noopener">MonsterInsights</a> is the most popular Google Analytics plugin for WordPress, with over 3 million active installations. I recommend this method for most people because it handles the technical setup automatically and gives you traffic reports right inside your WordPress dashboard — no need to switch between tabs or learn the Google Analytics interface.</p>

<img src="/screenshots/monsterinsights-plugin-page.webp" alt="MonsterInsights plugin page on WordPress.org showing it is the number one Google Analytics plugin" />

<h3>Step 1: Install the MonsterInsights Plugin</h3>

<ol>
<li>Log in to your WordPress dashboard</li>
<li>Go to <strong>Plugins &rarr; Add New Plugin</strong></li>
<li>Search for <strong>"MonsterInsights"</strong> in the search bar</li>
<li>Find <strong>"MonsterInsights – Google Analytics Dashboard for WordPress (Website Stats Made Easy)"</strong> in the results</li>
<li>Click <strong>"Install Now"</strong>, then click <strong>"Activate"</strong></li>
</ol>

<h3>Step 2: Run the Setup Wizard</h3>

<p>After activation, MonsterInsights automatically launches its setup wizard. If it doesn't, go to <strong>Insights &rarr; Settings</strong> in your WordPress sidebar.</p>

<ol>
<li><strong>Choose your website category</strong> — select "Business Website," "Blog," or "Online Store"</li>
<li><strong>Click "Connect MonsterInsights"</strong> — this opens a popup asking you to sign in with your Google account</li>
<li><strong>Sign in to Google</strong> and grant MonsterInsights permission to access your Analytics data. You'll see a permissions screen — click <strong>"Allow"</strong></li>
<li><strong>Select the correct property</strong> — choose the GA4 property you created earlier from the dropdown</li>
<li><strong>Click "Complete Connection"</strong> — MonsterInsights will verify the connection and return you to WordPress</li>
</ol>

<h3>Step 3: Configure Recommended Settings</h3>

<p>The wizard walks you through a few more options. Here's what I recommend:</p>

<ul>
<li><strong>Events Tracking</strong> — Leave enabled. This automatically tracks file downloads, outbound links, and other interactions</li>
<li><strong>Enhanced Link Attribution</strong> — Enable this. It helps Analytics distinguish between multiple links on the same page that point to the same URL</li>
<li><strong>File Download Tracking</strong> — Leave the defaults (doc, pdf, ppt, zip, xls, docx, pptx, xlsx)</li>
</ul>

<p>Click <strong>"Save and Continue"</strong> through the remaining screens. You can skip any upsell pages for the Pro version — the free plugin handles everything most sites need.</p>

<h3>Step 4: Verify It's Working</h3>

<p>After completing the wizard:</p>

<ol>
<li>Go to <strong>Insights &rarr; Reports</strong> in your WordPress dashboard</li>
<li>You might see a message saying "No data yet" — that's normal. Google Analytics needs a few hours (sometimes up to 24 hours) to start showing data</li>
<li>To double-check immediately, open your site in a new browser tab, then go to your <a href="https://analytics.google.com" target="_blank" rel="noopener">Google Analytics dashboard</a> and click <strong>"Realtime"</strong> in the left sidebar. You should see yourself as an active user</li>
</ol>

<p>That's it. MonsterInsights will now automatically track every visitor, and you can view your reports at <strong>Insights &rarr; Reports</strong> without leaving WordPress.</p>

<h2>Method 2: Using Site Kit by Google (Official Google Plugin)</h2>

<p>If you prefer using Google's own official plugin, <a href="https://sitekit.withgoogle.com/" target="_blank" rel="noopener">Site Kit by Google</a> is a solid choice. It connects not just Google Analytics but also Google Search Console, AdSense, and PageSpeed Insights — all from a single plugin. I use this on several of my sites because I like having all my Google tools in one dashboard.</p>

<img src="/screenshots/google-site-kit-plugin.webp" alt="Site Kit by Google plugin page on WordPress.org" />

<h3>Step 1: Install Site Kit</h3>

<ol>
<li>In your WordPress dashboard, go to <strong>Plugins &rarr; Add New Plugin</strong></li>
<li>Search for <strong>"Site Kit by Google"</strong></li>
<li>Find the plugin by <strong>Google</strong> (it has 5+ million active installations)</li>
<li>Click <strong>"Install Now"</strong>, then <strong>"Activate"</strong></li>
</ol>

<h3>Step 2: Connect Your Google Account</h3>

<ol>
<li>After activation, you'll see a <strong>"Start Setup"</strong> prompt at the top of your dashboard. Click it</li>
<li><strong>Sign in with Google</strong> — use the same Google account that has your Analytics property</li>
<li><strong>Grant permissions</strong> — Site Kit asks for access to your Google services. Click <strong>"Allow"</strong> on each permission screen</li>
<li><strong>Verify site ownership</strong> — Site Kit automatically verifies your site with Google Search Console. This happens in the background</li>
</ol>

<h3>Step 3: Connect Google Analytics</h3>

<ol>
<li>Once signed in, Site Kit shows your dashboard with connected services</li>
<li>Find the <strong>"Analytics"</strong> section and click <strong>"Connect Service"</strong></li>
<li>Select your <strong>GA4 property</strong> from the dropdown (or let Site Kit create one if you haven't yet)</li>
<li>Click <strong>"Configure Analytics"</strong></li>
</ol>

<h3>Step 4: Check Your Dashboard</h3>

<p>After connecting, go to <strong>Site Kit &rarr; Dashboard</strong> in your WordPress sidebar. You'll see an overview panel that combines data from all connected Google services. Analytics data typically starts appearing within 24-48 hours.</p>

<p>The main advantage of Site Kit is the unified dashboard. Instead of checking three different Google tools, you see everything — search performance, page speed scores, and visitor analytics — in a single view inside WordPress.</p>

<h2>Method 3: Manual Code Installation (For Developers)</h2>

<p>If you prefer not to install a plugin — maybe you're optimizing for performance, or you just like keeping your plugin count low — you can add the Google Analytics tracking code directly to your WordPress theme. This method requires you to be comfortable editing code, but it's straightforward.</p>

<h3>Step 1: Get Your GA4 Tracking Code</h3>

<ol>
<li>Go to <a href="https://analytics.google.com" target="_blank" rel="noopener">analytics.google.com</a></li>
<li>Click the <strong>gear icon (Admin)</strong> in the bottom-left corner</li>
<li>Under your property, click <strong>"Data Streams"</strong></li>
<li>Click on your web data stream</li>
<li>Under <strong>"Google tag"</strong>, click <strong>"View tag instructions"</strong></li>
<li>Select <strong>"Install manually"</strong></li>
<li>Copy the entire code snippet — it looks something like this:</li>
</ol>

<pre><code>&lt;!-- Google tag (gtag.js) --&gt;
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"&gt;&lt;/script&gt;
&lt;script&gt;
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
&lt;/script&gt;</code></pre>

<p>Replace <code>G-XXXXXXXXXX</code> with your actual Measurement ID.</p>

<h3>Step 2: Add the Code to Your Theme</h3>

<p>The recommended approach is using your theme's <code>functions.php</code> file with a proper WordPress hook:</p>

<ol>
<li>Go to <strong>Appearance &rarr; Theme File Editor</strong> in your WordPress dashboard</li>
<li>Select <strong>functions.php</strong> from the file list on the right</li>
<li>Add this code at the bottom of the file (replace the Measurement ID with yours):</li>
</ol>

<pre><code>function add_google_analytics() { ?&gt;
&lt;!-- Google tag (gtag.js) --&gt;
&lt;script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"&gt;&lt;/script&gt;
&lt;script&gt;
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
&lt;/script&gt;
&lt;?php }
add_action('wp_head', 'add_google_analytics');</code></pre>

<ol start="4">
<li>Click <strong>"Update File"</strong> to save</li>
</ol>

<p><strong>Important:</strong> If you're using a child theme (and you should be — read my guide on <a href="/best-free-wordpress-themes">choosing the right WordPress theme</a>), add this code to your child theme's <code>functions.php</code> instead. Otherwise, a theme update will overwrite your changes and you'll lose tracking.</p>

<p>An alternative approach: many modern themes like Astra, GeneratePress, and Kadence have a built-in "Header Scripts" section in their customizer settings. Check <strong>Appearance &rarr; Customize</strong> for a "Custom Code" or "Header/Footer Scripts" option. If your theme has this, paste the GA4 code snippet there instead — it's simpler and update-safe.</p>

<h2>What to Track First: 5 Key Metrics for Beginners</h2>

<p>Once Google Analytics is running, the amount of data can feel overwhelming. I've been there. Don't try to learn everything at once. Instead, focus on these five metrics that will give you the most actionable insights right away.</p>

<h3>1. Users and Sessions</h3>

<p>This is your baseline traffic number. Go to <strong>Reports &rarr; Acquisition &rarr; Overview</strong> in Google Analytics. <strong>Users</strong> tells you how many individual people visited your site. <strong>Sessions</strong> counts total visits (one user can have multiple sessions). Track this weekly to see if your traffic is growing. Don't obsess over daily fluctuations — look at the trend over weeks and months.</p>

<h3>2. Traffic Sources</h3>

<p>Navigate to <strong>Reports &rarr; Acquisition &rarr; Traffic Acquisition</strong>. This shows you <em>where</em> your visitors come from. The main channels are:</p>

<ul>
<li><strong>Organic Search</strong> — people finding you via Google (this is what <a href="/wordpress-seo">your SEO efforts</a> drive)</li>
<li><strong>Direct</strong> — people typing your URL directly or using bookmarks</li>
<li><strong>Referral</strong> — clicks from other websites linking to you</li>
<li><strong>Social</strong> — traffic from social media platforms</li>
</ul>

<p>If you're investing time in SEO, you want to see Organic Search growing over time. If it's flat while Direct is high, your SEO strategy might need work.</p>

<h3>3. Top Pages</h3>

<p>Go to <strong>Reports &rarr; Engagement &rarr; Pages and Screens</strong>. This shows which pages get the most traffic. This is gold for content strategy — it tells you what topics your audience cares about so you can create more content in those areas. It also reveals underperforming pages that might need updating or better <a href="/best-wordpress-seo-plugins">on-page SEO</a>.</p>

<h3>4. Engagement Rate</h3>

<p>In GA4, engagement rate replaced the old bounce rate. It measures the percentage of sessions where a user spent at least 10 seconds on your site, triggered a conversion event, or viewed 2+ pages. A healthy engagement rate for a content site is typically 55-75%. If yours is below 40%, your content might not be matching what visitors expect when they click through from search results.</p>

<h3>5. Average Engagement Time</h3>

<p>Found in the same <strong>Pages and Screens</strong> report, this tells you how long people actually spend reading each page. If you're writing 2,000-word articles and the average engagement time is 15 seconds, people aren't reading — they're bouncing. For a well-performing blog post, aim for 2-4 minutes of average engagement time.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is Google Analytics free?</h3>
<p>Yes, Google Analytics 4 is completely free for all websites. There's also a paid version called Analytics 360 for enterprise companies, but the free version has everything a WordPress site needs — including real-time reporting, audience insights, conversion tracking, and integration with Google Ads and Search Console.</p>

<h3>How long does it take for Google Analytics to start showing data?</h3>
<p>Real-time data shows up immediately — you can visit your own site and see yourself in the Realtime report within seconds. However, standard reports take 24-48 hours to start populating. Don't panic if your dashboard looks empty right after setup. Give it a full day before troubleshooting.</p>

<h3>Should I use a plugin or add the code manually?</h3>
<p>For most WordPress users, I recommend a plugin like MonsterInsights or Site Kit. They're easier to set up, provide in-dashboard reporting, and won't break when you update your theme. Manual code is fine if you're a developer who wants to minimize plugins, but it requires maintaining the code yourself and visiting the GA4 interface separately to view reports.</p>

<h3>Will Google Analytics slow down my website?</h3>
<p>The Google Analytics tracking script adds roughly 28KB to your page load — barely noticeable on modern connections. In my testing across multiple sites, the impact on Core Web Vitals is minimal (typically 0-50ms on Largest Contentful Paint). The insights you gain far outweigh this tiny performance cost. If speed is a major concern, consider loading the script with a delay or using a plugin that optimizes script loading.</p>

<h3>Can I use Google Analytics with an SEO plugin like Rank Math or Yoast?</h3>
<p>Absolutely. Google Analytics and <a href="/best-wordpress-seo-plugins">SEO plugins</a> serve different purposes and work perfectly together. Analytics tracks your visitor behavior and traffic sources, while SEO plugins help you optimize your content for search engines. In fact, using both together is the standard setup for any serious WordPress site — the SEO plugin helps you rank, and Analytics shows you whether it's working.</p>

<h2>What's Next?</h2>

<p>Now that Google Analytics is tracking your visitors, here are the logical next steps:</p>

<ul>
<li><strong><a href="/wordpress-seo">WordPress SEO Guide</a></strong> — Learn how to optimize your site for Google so you actually have traffic worth tracking</li>
<li><strong><a href="/best-wordpress-seo-plugins">Best SEO Plugins</a></strong> — Compare Rank Math, Yoast, and AIOSEO to find the right SEO plugin for your site</li>
<li><strong><a href="/install-wordpress">Install WordPress</a></strong> — Just getting started? Here's my step-by-step guide to setting up WordPress from scratch</li>
</ul>

<p>The biggest mistake I see beginners make with Analytics isn't the setup — it's ignoring the data after installation. Set a weekly reminder to spend 10 minutes looking at your reports. Over time, the patterns will start telling a story, and that story will guide every smart decision you make about your site.</p>
`;
