import { internalMutation } from "./_generated/server";

// ─────────────────────────────────────────────
// Article 1: Cost to Build a WordPress Site
// ─────────────────────────────────────────────

export const seedCostToBuildWordPressSite = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "cost-to-build-wordpress-site";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "getting-started"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'getting-started' not found. Seed the getting-started cluster first.",
      };
    }

    console.log("Found cluster 'getting-started':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "How Much Does a WordPress Website Really Cost in 2026? My Honest Breakdown",
      excerpt:
        "WordPress itself is free, but a real WordPress site is not. After building dozens of sites, I break down every cost — from domain names to premium plugins — so you can budget properly.",
      content: costToBuildContent,
      category: "getting-started",
      tags: [
        "wordpress cost",
        "website budget",
        "hosting cost",
        "domain name",
        "premium themes",
        "premium plugins",
        "wordpress pricing",
        "website expenses",
      ],
      seoTitle:
        "How Much Does a WordPress Website Cost in 2026? Full Breakdown",
      seoDescription:
        "WordPress is free, but building a real site is not. I break down every cost — hosting, domains, themes, plugins, and hidden expenses — with real numbers from my own projects.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing cost-to-build article:",
        existing._id
      );
      return {
        message: "Updated existing cost-to-build article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new cost-to-build article:", postId);
      return {
        message: "Created new cost-to-build article",
        id: postId,
      };
    }
  },
});

const costToBuildContent = `
<p>"WordPress is free!" — you have probably read that a hundred times. And technically, it is true. The WordPress software itself costs exactly zero dollars. But if you have ever tried to launch a real website, you already know that "free" comes with a pretty big asterisk.</p>

<p>My name is Marvin, and I have been building WordPress websites for over a decade. Personal blogs, client sites, affiliate projects, small business storefronts — you name it, I have probably built it. Along the way, I have spent money wisely, and I have also wasted money on things I absolutely did not need. Today I want to give you the most honest cost breakdown I can, so you know exactly what to expect before you spend a single euro or dollar.</p>

<p>The short version? You can launch a perfectly functional WordPress site for as little as $50–70 per year. But a more realistic budget for a site that looks professional and performs well is somewhere between $150 and $500 in your first year, with lower ongoing costs after that. Let me show you exactly where that money goes.</p>

<h2>The Big-Picture Cost Summary</h2>

<p>Before we dive into each category, here is a quick overview. I will break every line item down in detail below, but this table gives you the full picture at a glance:</p>

<table>
  <thead>
    <tr>
      <th>Expense</th>
      <th>Budget Option</th>
      <th>Mid-Range</th>
      <th>Premium</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Domain name</strong></td>
      <td>$10–15/year</td>
      <td>$10–15/year</td>
      <td>$10–50/year</td>
    </tr>
    <tr>
      <td><strong>Web hosting</strong></td>
      <td>$35–60/year</td>
      <td>$100–300/year</td>
      <td>$300–1,200/year</td>
    </tr>
    <tr>
      <td><strong>SSL certificate</strong></td>
      <td>Free (included)</td>
      <td>Free (included)</td>
      <td>Free–$200/year</td>
    </tr>
    <tr>
      <td><strong>Theme</strong></td>
      <td>Free</td>
      <td>$49–79 (one-time)</td>
      <td>$79–249 (one-time or annual)</td>
    </tr>
    <tr>
      <td><strong>Plugins</strong></td>
      <td>Free</td>
      <td>$50–200/year</td>
      <td>$300–1,000+/year</td>
    </tr>
    <tr>
      <td><strong>Email</strong></td>
      <td>Free (forwarding)</td>
      <td>$12–72/year</td>
      <td>$72–150/year</td>
    </tr>
    <tr>
      <td><strong>Developer help</strong></td>
      <td>$0 (DIY)</td>
      <td>$200–500</td>
      <td>$2,000–10,000+</td>
    </tr>
    <tr>
      <td><strong>TOTAL (Year 1)</strong></td>
      <td><strong>$50–75</strong></td>
      <td><strong>$250–600</strong></td>
      <td><strong>$1,000–12,000+</strong></td>
    </tr>
  </tbody>
</table>

<p>As you can see, the range is massive. That is because "a WordPress site" can mean anything from a personal blog to a full-blown WooCommerce store with thousands of products. Your costs depend entirely on what you are building and how much of the work you do yourself.</p>

<h2>Domain Name — $10 to $15 per Year</h2>

<p>Every website needs an address. That address is your domain name — something like <em>yoursite.com</em>. This is one of the few non-negotiable costs.</p>

<p>A standard <strong>.com</strong> domain costs between $10 and $15 per year at most registrars. I personally use <strong>Namecheap</strong> for most of my domains — they are straightforward, affordable, and I have never had a problem with them. <strong>Cloudflare Registrar</strong> is another great option because they sell domains at cost with zero markup, which usually works out to around $10–11 per year for a .com.</p>

<p>A few things to watch out for:</p>

<ul>
  <li><strong>Introductory pricing tricks.</strong> Some registrars advertise domains for $0.99 the first year, then jump to $18–20 on renewal. Always check the renewal price before you buy.</li>
  <li><strong>Premium domains.</strong> If someone already owns the domain you want, they might be willing to sell it — but "premium" domains can cost anywhere from $100 to $100,000. For a new site, just pick an available name and save your money.</li>
  <li><strong>Exotic TLDs.</strong> Extensions like .io, .dev, or .ai tend to cost more — sometimes $30–50 per year. Stick with .com if budget is a concern. I cover domain name strategy in detail in my guide on <a href="/blog/how-to-choose-a-domain-name">how to choose a domain name</a>.</li>
  <li><strong>WHOIS privacy.</strong> This used to be an extra cost, but most registrars now include it for free. Make sure yours does — it keeps your personal contact details out of the public WHOIS database.</li>
</ul>

<p><strong>My recommendation:</strong> Budget $10–15 per year for a .com domain from Namecheap or Cloudflare Registrar.</p>

<h2>Web Hosting — $35 to $1,200+ per Year</h2>

<p>Hosting is the biggest variable cost and probably the most important decision you will make. Your host is where your website lives. It is the computer that serves your pages to visitors 24/7. Cheap hosting can make your site slow, unreliable, and frustrating for visitors. Good hosting makes everything smoother.</p>

<p>I have tried a <em>lot</em> of hosts over the years, and here is how I think about the tiers:</p>

<h3>Budget Shared Hosting — $3 to $5 per Month</h3>

<p>This is where most beginners start, and honestly, it is fine for a brand-new site that gets very little traffic. Providers like <strong>Hostinger</strong>, <strong>Bluehost</strong>, and <strong>SiteGround</strong> (their StartUp plan) all fall into this category.</p>

<p>With shared hosting, your site shares server resources with hundreds (sometimes thousands) of other websites. It is like living in an apartment building — cheap, but you share the walls, the plumbing, and the elevator. If your neighbor's site gets a traffic spike, your site might slow down too.</p>

<p>I used shared hosting for my very first WordPress blog back in the day. It worked fine for the first few months when I was getting maybe 50 visitors a day. But once I crossed a few hundred daily visitors, page load times crept up to 3–4 seconds and I knew it was time to move.</p>

<p><strong>Typical pricing:</strong> $35–60 per year (often with a promotional first-year discount).</p>

<h3>Managed WordPress Hosting — $10 to $30 per Month</h3>

<p>This is the sweet spot for most serious WordPress sites. Managed hosts handle WordPress updates, security, daily backups, caching, and performance optimization for you. It is a significant step up from shared hosting.</p>

<p>My top recommendations in this tier:</p>

<ul>
  <li><strong>Cloudways</strong> — starts at $14/month. You pick your cloud provider (DigitalOcean, Vultr, or AWS) and Cloudways manages the server for you. Excellent performance for the price. This is what I use for most of my projects right now.</li>
  <li><strong>SiteGround</strong> (GrowBig or GoGeek) — $7–15/month on promotion, renews at $25–40/month. Solid support, built-in caching, and easy staging environments.</li>
  <li><strong>A2 Hosting</strong> (Turbo plans) — around $25/month. Fast LiteSpeed servers with good value.</li>
</ul>

<p><strong>Typical pricing:</strong> $120–360 per year.</p>

<h3>Premium Managed Hosting — $25 to $100+ per Month</h3>

<p>If your site is your business — or if you simply want the best performance and support money can buy — this is the tier to look at. These hosts handle everything and do it exceptionally well.</p>

<ul>
  <li><strong>Kinsta</strong> — starts at $35/month. Built on Google Cloud Platform. Blazing fast, beautiful dashboard, excellent support. I used Kinsta for a client's WooCommerce store and the speed difference compared to shared hosting was night and day.</li>
  <li><strong>WP Engine</strong> — starts at $26/month. One of the original managed WordPress hosts. Great developer tools, staging environments, and enterprise-grade reliability.</li>
  <li><strong>Flywheel</strong> (now part of WP Engine) — starts at $15/month. Designed for designers and agencies, with a clean interface and solid performance.</li>
</ul>

<p><strong>Typical pricing:</strong> $300–1,200+ per year.</p>

<p>For most readers of this site, I would say start with a budget shared host if you are just experimenting, and move to managed hosting (like Cloudways) once you are serious about your site. The performance difference is massive, and your visitors will thank you.</p>

<h2>SSL Certificate — Free (Usually)</h2>

<p>An SSL certificate encrypts the connection between your site and your visitors. It is what puts the padlock icon and "https://" in the browser address bar. Without it, browsers will warn visitors that your site is "not secure," which is a death sentence for credibility.</p>

<p>The good news: <strong>every reputable host now includes a free SSL certificate</strong>, usually powered by Let's Encrypt. You should not have to pay for SSL unless you need an extended validation (EV) certificate for a large e-commerce site, and even that is debatable in 2026.</p>

<p>If your host does not include free SSL, that is honestly a red flag. Switch hosts.</p>

<h2>WordPress Themes — Free to $250</h2>

<p>Your theme controls how your site looks. WordPress comes with a free default theme (currently Twenty Twenty-Five), and there are thousands of free themes in the WordPress.org theme directory. But most serious site owners end up using a premium theme or a theme/page builder combo.</p>

<h3>Free Themes</h3>

<p>Free themes are perfectly fine for getting started. Some popular free options that I actually like include:</p>

<ul>
  <li><strong>Kadence</strong> (free version) — lightweight, fast, and surprisingly powerful for a free theme. I have used this on multiple sites.</li>
  <li><strong>Astra</strong> (free version) — the most popular WordPress theme of all time, with good reason. It is fast, flexible, and works well with every page builder.</li>
  <li><strong>GeneratePress</strong> (free version) — minimal, clean, and extremely lightweight. Excellent for performance-focused sites.</li>
</ul>

<p>The downside of free themes is that they are limited. You will hit walls with customization, and you might need to write custom CSS or buy the premium version eventually anyway.</p>

<h3>Premium Themes — $49 to $249</h3>

<p>Premium themes give you more design options, better support, and usually more frequent updates. Here is what I would recommend:</p>

<ul>
  <li><strong>GeneratePress Premium</strong> — $59 one-time or $59/year for updates and support. My personal favorite for performance. It is what I use on several of my own sites. Incredibly lightweight and gives you complete control without needing a page builder.</li>
  <li><strong>Kadence Pro</strong> — $149/year for all themes and plugins. Excellent value, especially if you build multiple sites.</li>
  <li><strong>Astra Pro</strong> — $49/year or $239 lifetime. The most feature-rich option if you want tons of starter templates and deep WooCommerce integration.</li>
  <li><strong>Divi by Elegant Themes</strong> — $89/year or $249 lifetime. Includes a powerful visual page builder. Great for people who want to design visually without touching code. Can be a bit heavy on page load though.</li>
</ul>

<p>One mistake I see beginners make all the time: buying a theme before they have installed WordPress. Install WordPress first, pick a free theme, get your content going, and <em>then</em> decide if you need a premium theme. You might find that a free theme does everything you need. I walk you through the full setup process in my <a href="/blog/how-to-install-wordpress">WordPress installation guide</a>.</p>

<h2>Plugins — Free to $1,000+ per Year</h2>

<p>Plugins add functionality to your WordPress site. Need a contact form? There is a plugin for that. Need SEO tools? Plugin. E-commerce? Plugin. There are over 60,000 free plugins in the WordPress directory, and thousands more premium options.</p>

<p>Here is where costs can sneak up on you if you are not careful.</p>

<h3>Essential Plugins (Many Are Free)</h3>

<p>You can run a solid WordPress site using only free plugins. Here is a typical stack for a blog or content site:</p>

<table>
  <thead>
    <tr>
      <th>Function</th>
      <th>Free Option</th>
      <th>Premium Option</th>
      <th>Premium Cost</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>SEO</td>
      <td>Yoast SEO (free) or Rank Math (free)</td>
      <td>Rank Math Pro</td>
      <td>$59–199/year</td>
    </tr>
    <tr>
      <td>Caching / Performance</td>
      <td>LiteSpeed Cache or WP Super Cache</td>
      <td>WP Rocket</td>
      <td>$59–299/year</td>
    </tr>
    <tr>
      <td>Security</td>
      <td>Wordfence (free)</td>
      <td>Wordfence Premium</td>
      <td>$119/year</td>
    </tr>
    <tr>
      <td>Backups</td>
      <td>UpdraftPlus (free)</td>
      <td>UpdraftPlus Premium</td>
      <td>$70–195/year</td>
    </tr>
    <tr>
      <td>Contact forms</td>
      <td>WPForms Lite or Contact Form 7</td>
      <td>WPForms Pro</td>
      <td>$49–299/year</td>
    </tr>
    <tr>
      <td>Image optimization</td>
      <td>ShortPixel (100 free/month) or Smush</td>
      <td>ShortPixel</td>
      <td>$3–10/month</td>
    </tr>
    <tr>
      <td>Anti-spam</td>
      <td>Antispam Bee</td>
      <td>Akismet</td>
      <td>$8–33/month</td>
    </tr>
  </tbody>
</table>

<p>For my personal sites, I typically use Rank Math (free), LiteSpeed Cache (free — it comes with my hosting), Wordfence (free), UpdraftPlus (free), and WPForms Lite. That is a total plugin cost of exactly $0.</p>

<p>The one premium plugin I do pay for is <strong>WP Rocket</strong> at $59 per year. The performance improvement is significant enough that I consider it worth every cent. But it is a want, not a need — you can achieve similar results with free caching plugins if you are willing to spend more time configuring them.</p>

<h3>The Plugin Spending Trap</h3>

<p>Here is where I need to give you a serious warning. It is incredibly easy to spend $500+ per year on plugins before you realize what happened. Every plugin landing page is designed to make you feel like you <em>need</em> the premium version. You usually do not — at least not right away.</p>

<p>My rule of thumb: <strong>start with free plugins for everything.</strong> Only upgrade to premium when you hit a specific limitation that is genuinely holding your site back. I wasted probably $200 in my first year buying premium plugins I barely used because a blog post told me I "needed" them. Do not make the same mistake.</p>

<h2>Professional Email — Free to $72 per Year</h2>

<p>Having a professional email address (like hello@yoursite.com instead of yoursite123@gmail.com) matters for credibility. There are a few ways to get one:</p>

<ul>
  <li><strong>Free email forwarding</strong> — Services like Cloudflare Email Routing or ImprovMX (free tier) let you receive email at your domain and forward it to your Gmail. You can then set up Gmail to send "from" your custom address too. This is what I use for most of my smaller sites — it costs nothing.</li>
  <li><strong>Google Workspace</strong> — $7.20/month ($86.40/year) per user. The full Gmail experience with your custom domain. I use this for my main business email.</li>
  <li><strong>Zoho Mail</strong> — has a free plan for one domain with up to 5 users. The interface is not as polished as Gmail, but you cannot argue with free.</li>
  <li><strong>Your hosting provider</strong> — many hosts include email hosting. It works, but the webmail interfaces tend to be clunky and the spam filtering is mediocre.</li>
</ul>

<h2>Developer or Designer Help — $0 to $10,000+</h2>

<p>This is the wild card in your budget. If you are reading this site, you are probably planning to do most of the work yourself — and WordPress absolutely allows that. But there are situations where hiring help makes sense.</p>

<h3>When You Might Need Help</h3>

<ul>
  <li><strong>Custom design work</strong> — If you need a unique look that no theme provides, a designer can create custom page layouts or a custom theme. Expect to pay $500–3,000 depending on complexity.</li>
  <li><strong>Custom functionality</strong> — Need a plugin that does not exist or complex integrations? A WordPress developer will charge $50–150/hour, with most small projects running $300–2,000.</li>
  <li><strong>Site migration</strong> — Moving a site from one host to another or from WordPress.com to self-hosted WordPress. Some hosts do this for free, but if not, a developer will charge $100–300.</li>
  <li><strong>Speed optimization</strong> — If your site is slow and you cannot figure out why, a performance specialist can diagnose and fix issues for $200–500.</li>
</ul>

<h3>Where to Find WordPress Help</h3>

<p>If you do need to hire someone:</p>

<ul>
  <li><strong>Codeable</strong> — a curated marketplace specifically for WordPress development. Quality is high, prices start around $70/hour.</li>
  <li><strong>Fiverr / Upwork</strong> — more affordable options, but quality varies wildly. I have had both excellent and terrible experiences on these platforms. Always check reviews and ask for examples of previous WordPress work.</li>
  <li><strong>WordPress Facebook groups</strong> — communities like "Advanced WordPress" on Facebook have many developers who take freelance work. Just be careful with vetting.</li>
</ul>

<p>For what it is worth, I built this very site (ZeroToWP.com) myself without hiring anyone. WordPress gives you all the tools you need. If you follow the guides on this site, particularly the <a href="/blog/how-to-make-a-wordpress-website">step-by-step website building guide</a>, you can absolutely do it yourself and save the developer budget for later when your site is earning money.</p>

<h2>Hidden and Often-Forgotten Costs</h2>

<p>These are the expenses that nobody mentions in the "WordPress is free" articles. They are not huge individually, but they add up.</p>

<h3>Stock Images — $0 to $30 per Month</h3>

<p>Unless you take all your own photos, you will probably need stock images for blog posts, headers, and featured images. There are good free options:</p>

<ul>
  <li><strong>Unsplash</strong> — free, high-quality photos. My go-to for most images.</li>
  <li><strong>Pexels</strong> and <strong>Pixabay</strong> — also free with large libraries.</li>
  <li><strong>Canva</strong> (free tier) — great for creating custom graphics, social media images, and featured images.</li>
</ul>

<p>If you need premium stock photos, services like <strong>Shutterstock</strong> ($29/month for 10 images) or <strong>Adobe Stock</strong> ($30/month for 10 images) are the go-to options. But honestly, I have not paid for stock photos in years. Between Unsplash and Canva, I get everything I need.</p>

<h3>Content Delivery Network (CDN) — Free to $20 per Month</h3>

<p>A CDN serves your site from servers around the world, making it faster for visitors regardless of their location. <strong>Cloudflare</strong> offers a generous free plan that includes a CDN, basic DDoS protection, and DNS management. I use Cloudflare on every single site I build — there is no reason not to when the free tier is this good.</p>

<p>Premium CDN services like <strong>Bunny.net</strong> (starts at $1/month pay-as-you-go) or <strong>KeyCDN</strong> are options if you need more advanced features, but Cloudflare's free plan is more than enough for most sites.</p>

<h3>Renewal Price Increases</h3>

<p>This is the one that catches most people off guard. Many hosting companies and domain registrars offer deep discounts for your first year, then jack up prices dramatically on renewal.</p>

<p>Some examples of promotional vs. renewal pricing:</p>

<table>
  <thead>
    <tr>
      <th>Provider</th>
      <th>Promo Price (Year 1)</th>
      <th>Renewal Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Bluehost Basic</td>
      <td>$2.95/month</td>
      <td>$11.99/month</td>
    </tr>
    <tr>
      <td>Hostinger Premium</td>
      <td>$2.99/month</td>
      <td>$7.99/month</td>
    </tr>
    <tr>
      <td>SiteGround StartUp</td>
      <td>$2.99/month</td>
      <td>$17.99/month</td>
    </tr>
    <tr>
      <td>GoDaddy .com domain</td>
      <td>$6.17/year</td>
      <td>$22.17/year</td>
    </tr>
  </tbody>
</table>

<p>Always, <em>always</em> check the renewal price before committing. I learned this lesson the hard way in my early days when a $3/month hosting plan quietly became $15/month. Now I factor in the real, post-promotional price when I budget for any new project.</p>

<h3>Your Time</h3>

<p>This is the biggest hidden cost that nobody talks about. When you build a WordPress site yourself, you are trading money for time. Learning how to configure hosting, install WordPress, customize your theme, set up plugins, write content, and handle basic maintenance — all of that takes time.</p>

<p>For my first WordPress site, I probably spent 60–80 hours over the first month getting everything set up and learning the ropes. By my fifth site, I could have a new WordPress site live in under two hours. The learning curve is real, but it is a one-time investment that pays dividends forever.</p>

<h2>Realistic Budget Scenarios</h2>

<p>Let me lay out three real-world scenarios based on sites I have actually built or helped others build:</p>

<h3>Scenario 1: The Budget Blog — $65/Year</h3>

<p>This is the absolute minimum for a real, self-hosted WordPress site:</p>

<ul>
  <li>Domain from Cloudflare Registrar: $10/year</li>
  <li>Hostinger Premium hosting: $36/year (promotional price)</li>
  <li>Free theme (Kadence or Astra)</li>
  <li>Free plugins only (Rank Math, LiteSpeed Cache, Wordfence, UpdraftPlus)</li>
  <li>Free SSL (included with hosting)</li>
  <li>Free email forwarding via Cloudflare</li>
  <li>Free CDN via Cloudflare</li>
  <li>Free stock images from Unsplash</li>
</ul>

<p><strong>Total: approximately $46–65 per year.</strong> This is genuinely all you need to get started. Your site will not win any design awards, but it will be functional, secure, and fast enough.</p>

<h3>Scenario 2: The Serious Content Site — $250 to $400/Year</h3>

<p>This is what I would recommend for someone building a site they plan to grow:</p>

<ul>
  <li>Domain from Namecheap: $12/year</li>
  <li>Cloudways hosting (DigitalOcean 1GB): $168/year ($14/month)</li>
  <li>GeneratePress Premium theme: $59/year</li>
  <li>WP Rocket caching plugin: $59/year</li>
  <li>Free plugins for everything else</li>
  <li>Free SSL, CDN (Cloudflare), and email forwarding</li>
</ul>

<p><strong>Total: approximately $300 per year.</strong> This is pretty close to my own setup for ZeroToWP.com. Fast hosting, a lightweight premium theme, and one premium plugin that genuinely makes a difference.</p>

<h3>Scenario 3: The Professional Business Site — $800 to $2,000/Year</h3>

<p>For a business that depends on its website and wants premium everything:</p>

<ul>
  <li>Domain: $12/year</li>
  <li>Kinsta hosting: $420/year ($35/month)</li>
  <li>Premium theme (Kadence Pro bundle): $149/year</li>
  <li>WP Rocket: $59/year</li>
  <li>Rank Math Pro: $59/year</li>
  <li>WPForms Pro: $49/year</li>
  <li>UpdraftPlus Premium: $70/year</li>
  <li>Google Workspace email: $86/year</li>
  <li>Premium stock images: $200/year</li>
</ul>

<p><strong>Total: approximately $1,100 per year.</strong> Add a few hundred dollars for developer help with custom features, and you are looking at $1,500–2,000. Still far less than what most web design agencies charge for a single project.</p>

<h2>How to Save Money (Without Cutting Corners)</h2>

<p>After building more sites than I can count, here are my best tips for keeping costs down:</p>

<ul>
  <li><strong>Start free, upgrade later.</strong> Use free themes and plugins until you hit a genuine limitation. You can always upgrade — and by then, you will know exactly what you need instead of guessing.</li>
  <li><strong>Buy annual plans, not monthly.</strong> Hosting and plugins are almost always cheaper when you pay annually. I know it is a bigger upfront cost, but the savings over 12 months are significant.</li>
  <li><strong>Watch for Black Friday deals.</strong> WordPress products have enormous Black Friday and Cyber Monday sales — often 40–60% off. If you can time your purchases, you will save hundreds. I bought my GeneratePress license on Black Friday for about 40% off.</li>
  <li><strong>Use Cloudflare for everything you can.</strong> Free DNS, free CDN, free SSL (if your host somehow does not include it), free email forwarding, free basic security. There is no reason not to put every WordPress site behind Cloudflare.</li>
  <li><strong>Avoid "website builder" themes.</strong> Themes that try to do everything — page building, SEO, forms, pop-ups, social sharing — tend to be bloated and slow. Use a lightweight theme and add specific plugins for the features you actually need.</li>
  <li><strong>Do not buy plugins until you need them.</strong> This is worth repeating because it is the number one way beginners waste money. That fancy social sharing plugin? Your site with 10 visitors a day does not need it yet.</li>
</ul>

<h2>The WordPress.com Alternative</h2>

<p>Some of you might be wondering: "What about WordPress.com? Is not that easier and cheaper?"</p>

<p>WordPress.com is a hosted version of WordPress that handles the technical stuff for you. Their free plan gives you a website, but it comes with WordPress.com ads, a subdomain (yoursite.wordpress.com), and severe limitations on themes and plugins.</p>

<p>Their paid plans start at $4/month (Personal) and go up to $25/month (Business) for the ability to install custom plugins and themes. I have a detailed comparison in my <a href="/blog/wordpress-com-vs-wordpress-org">WordPress.com vs WordPress.org guide</a> if you want to dig deeper.</p>

<p>My honest take: for a serious website, self-hosted WordPress.org is almost always the better choice. You have full control, the total cost is comparable, and you are not locked into anyone's platform. The learning curve is a bit steeper, but that is exactly what this site is here to help you with.</p>

<h2>What I Personally Spend</h2>

<p>For full transparency, here is what I actually spend on a typical WordPress site per year:</p>

<ul>
  <li>Domain (Namecheap): $12</li>
  <li>Hosting (Cloudways — DigitalOcean): $168</li>
  <li>GeneratePress Premium: $59</li>
  <li>WP Rocket: $59</li>
  <li>Cloudflare (free plan): $0</li>
  <li>All other plugins: $0 (free versions)</li>
  <li>Stock images: $0 (Unsplash + Canva free)</li>
  <li>Email forwarding: $0 (Cloudflare)</li>
</ul>

<p><strong>Total: about $298 per year, or roughly $25 per month.</strong></p>

<p>That gets me a fast, professional-looking WordPress site with excellent performance, good SEO tools, and reliable backups. It is not the cheapest possible option, but it is a setup I am genuinely happy with after years of experimenting with different combinations.</p>

<h2>Final Thoughts</h2>

<p>WordPress is free. Building a <em>website</em> with WordPress is not — but it is remarkably affordable compared to any other option. Even at the budget level, $50–70 per year gets you a fully functional, professional website that you own and control completely.</p>

<p>My advice? Start small. Get a cheap domain and budget hosting, install a free theme, and focus on your content. You can always upgrade your hosting, switch to a premium theme, or add paid plugins later — and by then, you will be making informed decisions based on actual experience rather than marketing hype.</p>

<p>If you are ready to get started, head over to my <a href="/blog/how-to-make-a-wordpress-website">complete guide to building a WordPress website</a>. I will walk you through every step, from buying a domain to publishing your first post.</p>

<p>Got questions about WordPress costs that I did not cover? Feel free to leave a comment below — I am happy to help you figure out the right budget for your specific project.</p>
`;

// ─────────────────────────────────────────────
// Article 2: WordPress Dashboard Explained
// ─────────────────────────────────────────────

export const seedWordPressDashboardExplained = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-dashboard-explained";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "getting-started"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'getting-started' not found. Seed the getting-started cluster first.",
      };
    }

    console.log("Found cluster 'getting-started':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "The WordPress Dashboard Explained — A Complete Beginner's Tour",
      excerpt:
        "Just logged into WordPress for the first time and feeling overwhelmed? I walk you through every menu, every screen, and every button in the WordPress dashboard so you know exactly where everything lives.",
      content: dashboardExplainedContent,
      category: "getting-started",
      tags: [
        "wordpress dashboard",
        "wp-admin",
        "wordpress tutorial",
        "wordpress beginners",
        "admin panel",
        "wordpress navigation",
        "wordpress settings",
        "wordpress interface",
      ],
      seoTitle:
        "WordPress Dashboard Explained — Complete Beginner's Guide (2026)",
      seoDescription:
        "Feeling lost in the WordPress dashboard? I walk you through every menu item, every screen, and every setting — with tips from 10+ years of WordPress experience.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing dashboard-explained article:",
        existing._id
      );
      return {
        message: "Updated existing dashboard-explained article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new dashboard-explained article:", postId);
      return {
        message: "Created new dashboard-explained article",
        id: postId,
      };
    }
  },
});

const dashboardExplainedContent = `
<p>You have just installed WordPress, you have typed in your username and password, and now you are staring at a screen full of menus, widgets, and options that makes absolutely no sense. Trust me — I have been there. I remember the first time I logged into the WordPress dashboard back in the day, and my immediate reaction was "okay, what do I click?"</p>

<p>My name is Marvin, and after building WordPress sites for over a decade, navigating the dashboard is second nature to me. But I vividly remember how confusing it was at the beginning. This guide is the one I wish I had when I started — a complete, plain-English tour of every single section of the WordPress dashboard, what it does, and when you will actually use it.</p>

<p>By the time you finish reading this, you will know your way around wp-admin like a pro. Let us get into it.</p>

<h2>How to Access the WordPress Dashboard</h2>

<p>Before we tour the dashboard, you need to know how to get there. Your WordPress dashboard (also called "wp-admin" or the "admin area") lives at:</p>

<p><strong>yourdomain.com/wp-admin</strong></p>

<p>Type that into your browser, enter the username and password you created during <a href="/blog/how-to-install-wordpress">WordPress installation</a>, and you are in. You can also reach the login page at <strong>yourdomain.com/wp-login.php</strong> — both work the same way.</p>

<p><strong>Pro tip:</strong> Bookmark your login page. You will be visiting it a lot, and typing "/wp-admin" every time gets old fast. I also recommend using a password manager like Bitwarden or 1Password — your WordPress password should be long, random, and unique, which means you will never remember it on your own.</p>

<h2>The Dashboard Home Screen</h2>

<p>The first thing you see after logging in is the Dashboard home screen. Think of it as your WordPress command center. It shows you a summary of what is happening on your site through several <strong>widgets</strong> — small boxes of information that you can rearrange, collapse, or remove.</p>

<p>The default widgets include:</p>

<ul>
  <li><strong>At a Glance</strong> — shows you how many posts, pages, and comments your site has, which theme is active, and which version of WordPress you are running.</li>
  <li><strong>Activity</strong> — your most recent posts and comments in one place.</li>
  <li><strong>Quick Draft</strong> — a miniature editor for jotting down a blog post idea without leaving the dashboard. I have to be honest, I have never once used this. I always go to Posts > Add New instead. But it is there if you like it.</li>
  <li><strong>WordPress Events and News</strong> — upcoming WordPress meetups and community news. Mildly useful if you want to stay plugged into the WordPress ecosystem.</li>
  <li><strong>Site Health Status</strong> — tells you if there are any issues with your WordPress installation, like outdated PHP versions, inactive plugins, or security concerns. This one is actually worth paying attention to.</li>
</ul>

<h3>Customizing the Dashboard Home</h3>

<p>Most people do not realize you can customize this screen. Click the <strong>"Screen Options"</strong> tab in the top-right corner and you can toggle individual widgets on or off. You can also drag and drop widgets to rearrange them.</p>

<p>Personally, I hide everything except "At a Glance" and "Site Health Status." The rest is noise I do not need. The less cluttered your dashboard, the easier it is to focus on what matters — which is creating content and managing your site.</p>

<h2>The Left Sidebar — Your Main Navigation</h2>

<p>The left sidebar is where you will spend 99% of your time in WordPress. It is the main menu that gives you access to every feature and setting. Let me walk you through each item from top to bottom.</p>

<h2>Posts — Where Your Blog Lives</h2>

<p>Click on <strong>Posts</strong> and you will see a submenu with four items:</p>

<ul>
  <li><strong>All Posts</strong> — a list of every blog post on your site. You can search, filter, sort, and bulk-edit posts from here.</li>
  <li><strong>Add New Post</strong> — opens the block editor (also called Gutenberg) where you write and format your content.</li>
  <li><strong>Categories</strong> — organize your posts into broad topics. For example, this site has categories like "Getting Started," "Plugins," and "Themes."</li>
  <li><strong>Tags</strong> — more specific labels for your posts. If a category is like a book's chapter, a tag is like an index entry.</li>
</ul>

<p>Posts are the bread and butter of any WordPress blog. They are displayed in reverse chronological order (newest first) and are what most people think of when they think "blog content." Every article you are reading on ZeroToWP.com is a post.</p>

<h3>Posts vs. Pages — An Important Distinction</h3>

<p>This confused me for an embarrassingly long time when I started with WordPress, so let me clear it up: <strong>Posts</strong> are for time-based content like blog articles and news updates. <strong>Pages</strong> are for static, timeless content like your About page, Contact page, or Privacy Policy.</p>

<p>The key differences:</p>

<table>
  <thead>
    <tr>
      <th>Feature</th>
      <th>Posts</th>
      <th>Pages</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Displayed in blog feed</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Have categories and tags</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Show author and date</td>
      <td>Yes (usually)</td>
      <td>No (usually)</td>
    </tr>
    <tr>
      <td>Appear in RSS feed</td>
      <td>Yes</td>
      <td>No</td>
    </tr>
    <tr>
      <td>Can be hierarchical (parent/child)</td>
      <td>No</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Best for</td>
      <td>Blog articles, news, updates</td>
      <td>About, Contact, Legal pages</td>
    </tr>
  </tbody>
</table>

<p>When in doubt: if it is something you would write once and update occasionally (like an About page), make it a page. If it is something you will write regularly (like blog posts), make it a post.</p>

<h2>Media — Your File Library</h2>

<p>The <strong>Media</strong> section is where WordPress stores every image, video, PDF, and other file you upload. Click on it and you get two views:</p>

<ul>
  <li><strong>Library</strong> — a grid or list view of all your uploaded files. You can search, filter by type or date, and edit file details like alt text and captions.</li>
  <li><strong>Add New Media File</strong> — a drag-and-drop area for uploading new files.</li>
</ul>

<p>A few things worth knowing about the Media Library:</p>

<ul>
  <li><strong>WordPress creates multiple sizes of every image you upload.</strong> When you upload a photo, WordPress generates a thumbnail, medium, large, and full-size version. This happens automatically and is controlled in Settings > Media.</li>
  <li><strong>Always add alt text to your images.</strong> Alt text describes what is in an image for screen readers and search engines. It is important for accessibility and SEO. I make it a habit to add descriptive alt text to every single image I upload.</li>
  <li><strong>File organization is limited.</strong> WordPress stores files in date-based folders (like /uploads/2026/03/) but does not have a folder system in the Media Library interface. If this bothers you, a plugin like FileBird or Real Media Library can add folder functionality.</li>
  <li><strong>Optimize images before uploading.</strong> Large images slow down your site. I run all my images through <strong>ShortPixel</strong> or <strong>TinyPNG</strong> before uploading, or use a plugin that optimizes them automatically on upload.</li>
</ul>

<h2>Pages — Your Static Content</h2>

<p>The <strong>Pages</strong> section works almost identically to Posts — you get "All Pages" and "Add New Page." The editor is the same block editor. The only difference is how pages are treated on the front end of your site (no dates, no categories, no blog feed).</p>

<p>Every WordPress site needs a few essential pages:</p>

<ul>
  <li><strong>Home page</strong> — either a static page or your blog feed (you choose in Settings > Reading).</li>
  <li><strong>About page</strong> — who you are and what your site is about.</li>
  <li><strong>Contact page</strong> — how visitors can reach you. A simple form using WPForms Lite or Contact Form 7 works great.</li>
  <li><strong>Privacy Policy</strong> — legally required in most jurisdictions if you collect any data (including cookies and analytics). WordPress actually generates a template for you under Settings > Privacy.</li>
</ul>

<p>I usually create these four pages within the first hour of setting up a new WordPress site, even if they are just placeholder content. It gives the site structure right away.</p>

<h2>Comments — Managing Reader Interaction</h2>

<p>The <strong>Comments</strong> section shows you every comment left on your site. From here, you can approve, reply to, edit, spam, or delete comments. If you have comment moderation enabled (and you should), new comments will show up here as "Pending" until you approve them.</p>

<p>A word about spam: the moment your site gets any traffic at all, you will start receiving spam comments. It is inevitable. Install an anti-spam plugin like <strong>Antispam Bee</strong> (free) or <strong>Akismet</strong> (free for personal sites) from day one. On one of my sites, I was getting 50+ spam comments per day before I set up Antispam Bee. After installing it, spam dropped to maybe one or two per week that slipped through.</p>

<h2>Appearance — Controlling Your Site's Look</h2>

<p>This is where you control the visual design of your site. The submenu items here depend on which theme you are using, but typically include:</p>

<ul>
  <li><strong>Themes</strong> — browse, install, activate, and delete themes. You can have multiple themes installed but only one active at a time.</li>
  <li><strong>Customize</strong> (or <strong>Editor</strong> in block themes) — the live customizer that lets you adjust your site's appearance and preview changes in real time. This is where you set your site title, colors, fonts, header layout, footer content, and more.</li>
  <li><strong>Widgets</strong> — in classic themes, widgets are small blocks of content you can place in sidebars, footers, and other widget areas. Common widgets include search bars, recent posts lists, category lists, and custom text. Block themes handle this differently through the Site Editor.</li>
  <li><strong>Menus</strong> — create and manage your navigation menus. You can build menus from pages, posts, categories, or custom links, then assign them to locations in your theme (like the main header navigation or a footer menu).</li>
</ul>

<h3>Classic Themes vs. Block Themes</h3>

<p>WordPress is in a transition period right now. Older "classic" themes use the Customizer, widgets, and the traditional menu system. Newer "block themes" (also called Full Site Editing themes) use the Site Editor, which lets you design your entire site — headers, footers, page templates, everything — using the same block editor you use for writing posts.</p>

<p>If you are just starting out, I would recommend a classic theme like <strong>GeneratePress</strong> or <strong>Astra</strong>. The Customizer is more intuitive for beginners, and there are far more tutorials available. Block themes are the future, but the experience is still a bit rough around the edges in 2026.</p>

<h2>Plugins — Extending WordPress</h2>

<p>The <strong>Plugins</strong> section is your gateway to WordPress's massive ecosystem of extensions. You have two submenu items:</p>

<ul>
  <li><strong>Installed Plugins</strong> — a list of all plugins currently on your site, whether they are active or inactive. From here, you can activate, deactivate, update, or delete plugins.</li>
  <li><strong>Add New Plugin</strong> — search and install plugins from the WordPress.org plugin directory (over 60,000 free plugins) or upload a plugin zip file you purchased from a third-party marketplace.</li>
</ul>

<p>Some important plugin management tips:</p>

<ul>
  <li><strong>Delete plugins you are not using.</strong> Inactive plugins can still be a security risk if they have vulnerabilities. If you are not using it, delete it — do not just deactivate it.</li>
  <li><strong>Keep plugins updated.</strong> Plugin updates often include security patches. I check for updates at least once a week, and I have auto-updates enabled for trusted plugins.</li>
  <li><strong>Less is more.</strong> Every plugin you add increases your site's load time and potential attack surface. I try to keep my active plugin count under 15. If I can accomplish something with my theme's built-in features or a small code snippet, I skip the plugin. I go deeper on choosing the right plugins in my <a href="/blog/must-have-wordpress-plugins">must-have plugins guide</a>.</li>
  <li><strong>Read reviews before installing.</strong> Check the star rating, the number of active installations, when it was last updated, and whether it is compatible with your version of WordPress. A plugin that has not been updated in two years is a plugin you should probably avoid.</li>
</ul>

<h2>Users — Managing Who Has Access</h2>

<p>The <strong>Users</strong> section lets you manage everyone who has an account on your WordPress site. For a personal blog, this might just be you. For a multi-author site or a business, you might have several users with different access levels.</p>

<p>WordPress has five built-in user roles:</p>

<table>
  <thead>
    <tr>
      <th>Role</th>
      <th>What They Can Do</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Administrator</strong></td>
      <td>Everything. Full control over the entire site — themes, plugins, settings, all content, and other users.</td>
    </tr>
    <tr>
      <td><strong>Editor</strong></td>
      <td>Manage and publish all content (their own and others'), but cannot change themes, plugins, or site settings.</td>
    </tr>
    <tr>
      <td><strong>Author</strong></td>
      <td>Write and publish their own posts, upload files, but cannot edit others' content.</td>
    </tr>
    <tr>
      <td><strong>Contributor</strong></td>
      <td>Write posts but cannot publish them — they submit for review. Cannot upload files.</td>
    </tr>
    <tr>
      <td><strong>Subscriber</strong></td>
      <td>Can only read content and manage their own profile. The most limited role.</td>
    </tr>
  </tbody>
</table>

<p>For most personal sites and small blogs, you will be the only user with the Administrator role. But if you ever bring on a guest author or hire a writer, create them an Author or Contributor account — <strong>never</strong> give them your Administrator credentials. I learned this one the hard way when a freelance writer I hired accidentally deleted a page because I had given them admin access. Always use the principle of least privilege.</p>

<p>The <strong>Profile</strong> submenu lets you edit your own user profile — your display name, bio, profile picture (via Gravatar), and contact information. The display name is what appears on your published posts, so make sure it is set to whatever you want readers to see (usually your first name or full name, not your login username).</p>

<h2>Tools — Import, Export, and More</h2>

<p>The <strong>Tools</strong> section is a bit of a catch-all. The default items include:</p>

<ul>
  <li><strong>Available Tools</strong> — usually shows a "Categories and Tags Converter" link, which lets you convert categories to tags and vice versa. Not something you will use often.</li>
  <li><strong>Import</strong> — tools for importing content from other platforms (Blogger, Tumblr, another WordPress site, etc.). If you are migrating from WordPress.com to self-hosted WordPress, this is where you would import your exported content.</li>
  <li><strong>Export</strong> — export your entire site's content (posts, pages, comments) as an XML file. Useful for backups or for migrating to another WordPress installation.</li>
  <li><strong>Site Health</strong> — a detailed diagnostic page that checks your server configuration, WordPress settings, and installed themes/plugins for potential issues. This is more detailed than the dashboard widget version and worth checking once in a while.</li>
</ul>

<p>Many plugins also add their own items to the Tools menu. For example, I have seen import/export utilities for SEO plugins, redirection tools, and database cleanup tools show up here.</p>

<h2>Settings — The Core Configuration</h2>

<p>The <strong>Settings</strong> section is where you configure the fundamental behavior of your WordPress site. There are several sub-pages, and it is worth going through each one when you first set up your site.</p>

<h3>General Settings</h3>

<p>This is where you set your:</p>

<ul>
  <li><strong>Site Title</strong> — the name of your website, displayed in browser tabs and (usually) your header.</li>
  <li><strong>Tagline</strong> — a short description of your site. Some themes display this under the site title. I usually set this to something descriptive for SEO purposes.</li>
  <li><strong>WordPress Address and Site Address</strong> — these should both be your site's URL with "https://". Do not change these unless you know exactly what you are doing — a wrong URL here can lock you out of your site.</li>
  <li><strong>Email Address</strong> — the admin email address where WordPress sends notifications.</li>
  <li><strong>Timezone, Date Format, Time Format</strong> — set these to match your location and preferences. I always forget to do this and then wonder why my published post times look weird.</li>
</ul>

<h3>Writing Settings</h3>

<p>Controls default behavior for writing posts. The most relevant option is the <strong>Default Post Category</strong> — which category new posts are assigned to if you forget to pick one. I set this to my most-used category so I do not end up with a bunch of posts in "Uncategorized" (which looks unprofessional and is terrible for SEO).</p>

<h3>Reading Settings</h3>

<p>This is an important one. Here you decide:</p>

<ul>
  <li><strong>Your homepage displays</strong> — either your latest posts (classic blog style) or a static page. Most modern websites use a static front page with a separate blog page.</li>
  <li><strong>Blog pages show at most</strong> — how many posts per page on your blog feed. I usually set this to 10.</li>
  <li><strong>Search engine visibility</strong> — a checkbox that tells search engines not to index your site. <strong>Make absolutely sure this is unchecked when your site is live.</strong> I have seen people leave this checked for months and wonder why Google never finds their site. It is only useful while you are building your site and not ready for visitors yet.</li>
</ul>

<h3>Discussion Settings</h3>

<p>Controls how comments work on your site. Key settings include:</p>

<ul>
  <li><strong>Allow people to submit comments on new posts</strong> — turn this off if you do not want comments at all.</li>
  <li><strong>Comment must be manually approved</strong> — I strongly recommend enabling this. It means every comment goes into a moderation queue before it appears on your site, which prevents spam from showing up publicly.</li>
  <li><strong>Comment author must have a previously approved comment</strong> — a middle ground that auto-approves returning commenters but moderates first-time commenters.</li>
  <li><strong>Avatar display</strong> — whether to show Gravatar profile pictures next to comments.</li>
</ul>

<h3>Media Settings</h3>

<p>Defines the default image sizes WordPress generates when you upload an image:</p>

<ul>
  <li><strong>Thumbnail size</strong> — default 150x150 pixels.</li>
  <li><strong>Medium size</strong> — default 300x300 pixels.</li>
  <li><strong>Large size</strong> — default 1024x1024 pixels.</li>
</ul>

<p>I usually leave these at their defaults. Some theme developers recommend specific sizes — check your theme's documentation if you are unsure.</p>

<h3>Permalink Settings</h3>

<p>This controls the URL structure of your posts and pages. This is one of the <strong>first things you should configure</strong> on a new WordPress site. The default WordPress permalink structure is ugly (?p=123) and terrible for SEO.</p>

<p>I always use <strong>"Post name"</strong> — which creates URLs like <em>yoursite.com/your-post-title/</em>. Clean, readable, and good for search engines. Once you set your permalink structure, <strong>do not change it</strong> after you start publishing content, because all your existing URLs will break (unless you set up proper 301 redirects, which is a headache you want to avoid).</p>

<h3>Privacy Settings</h3>

<p>Lets you designate a page as your Privacy Policy page. WordPress generates a template to help you get started, but you should customize it to accurately reflect what data your site collects (cookies, analytics, contact form submissions, etc.).</p>

<h2>The Admin Toolbar</h2>

<p>At the very top of the dashboard (and on the front end of your site when you are logged in), you will see a dark toolbar. This is the <strong>Admin Toolbar</strong> (also called the Admin Bar). It gives you quick access to:</p>

<ul>
  <li><strong>Visit your site</strong> — click your site name to jump to the front end.</li>
  <li><strong>New content shortcuts</strong> — hover over "+ New" to quickly create a new post, page, or media upload without navigating through the sidebar.</li>
  <li><strong>Comments</strong> — shows a count of pending comments.</li>
  <li><strong>Updates</strong> — shows a count of available updates for WordPress core, themes, and plugins.</li>
  <li><strong>Your profile</strong> — click your name or avatar to edit your profile or log out.</li>
</ul>

<p>The Admin Toolbar is visible on the front end of your site too (only to you, not to visitors). Some people find this annoying — if you want to hide it, go to Users > Your Profile and uncheck "Show Toolbar when viewing site."</p>

<h2>Screen Options and Help Tabs</h2>

<p>At the top right of almost every dashboard page, you will find two tabs that most people never notice: <strong>Screen Options</strong> and <strong>Help</strong>.</p>

<ul>
  <li><strong>Screen Options</strong> — lets you customize what is displayed on the current page. On the Posts list, for example, you can choose which columns to show (author, categories, tags, date, etc.) and how many posts to display per page. On the Dashboard home, you can toggle widgets. I use this all the time to clean up screens and show only the information I care about.</li>
  <li><strong>Help</strong> — opens a brief explanation of the current page. WordPress's built-in help documentation is actually decent, though I find it a bit sparse for complete beginners.</li>
</ul>

<h2>Dashboard Tips and Tricks</h2>

<p>After a decade of living inside the WordPress dashboard, here are some tips that will make your life easier:</p>

<h3>Keyboard Shortcuts</h3>

<p>WordPress has built-in keyboard shortcuts for comment moderation. Go to Users > Your Profile and enable "Keyboard Shortcuts" to unlock them. In the Comments screen, you can then use j/k to navigate between comments, a to approve, s for spam, d for delete, and more. If you get a lot of comments, these shortcuts are a massive time-saver.</p>

<h3>Collapse the Sidebar</h3>

<p>At the bottom of the left sidebar, there is a small "Collapse menu" link. Click it and the sidebar shrinks to just icons, giving you more screen real estate for the content area. Click any icon to expand the submenu temporarily. I keep my sidebar collapsed most of the time — I know what each icon means by now, and the extra space is nice.</p>

<h3>Use the Block Editor's Distraction-Free Mode</h3>

<p>When you are writing a post in the block editor, click the three-dot menu in the top right and select "Distraction free." This hides all the sidebars and toolbars, leaving just you and your content. I use this every time I write — it makes a huge difference for focus.</p>

<h3>Check Site Health Regularly</h3>

<p>The <strong>Tools > Site Health</strong> page runs automated checks on your WordPress installation. It will flag things like outdated PHP versions, inactive plugins, missing modules, and security recommendations. I check this page once a month or so. It has caught issues I would not have noticed otherwise — like a plugin that was silently throwing errors in the background.</p>

<h3>Set a Custom Dashboard Color Scheme</h3>

<p>Go to Users > Your Profile and you will find a row of color schemes. The default is a dark gray/blue scheme, but you can switch to other options like "Sunrise" (orange/red), "Ocean" (green/blue), or "Coffee" (brown tones). Purely cosmetic, but if you manage multiple WordPress sites, using different color schemes for each one can help you instantly know which site you are working on. I use the default for live sites and "Sunrise" for staging sites so I never accidentally make changes on the wrong site.</p>

<h3>Bookmark Your Most-Used Pages</h3>

<p>Instead of navigating through the sidebar every time, bookmark the pages you visit most. For me, that is:</p>

<ul>
  <li><strong>yourdomain.com/wp-admin/edit.php</strong> — the All Posts screen</li>
  <li><strong>yourdomain.com/wp-admin/post-new.php</strong> — create a new post</li>
  <li><strong>yourdomain.com/wp-admin/plugins.php</strong> — manage plugins</li>
  <li><strong>yourdomain.com/wp-admin/update-core.php</strong> — check for updates</li>
</ul>

<h2>What Plugins Add to the Dashboard</h2>

<p>Once you start installing plugins, your dashboard will start to change. Many plugins add their own menu items to the left sidebar, their own widgets to the dashboard home, and their own settings pages. For example:</p>

<ul>
  <li><strong>Rank Math / Yoast SEO</strong> — adds a dedicated SEO menu with settings, redirections, search console integration, and more.</li>
  <li><strong>WooCommerce</strong> — adds several menu items including Products, Orders, Customers, and Analytics. It basically turns your dashboard into an e-commerce management system.</li>
  <li><strong>Wordfence</strong> — adds a security menu with firewall settings, malware scanning, and login security options.</li>
  <li><strong>WPForms</strong> — adds a Forms menu where you create and manage contact forms.</li>
</ul>

<p>This is why I recommend keeping your plugin count low. Each plugin you add makes the dashboard a little more cluttered. On one client site, I counted 14 extra menu items added by plugins — the sidebar was so long you had to scroll to see everything. After cleaning up unnecessary plugins, we got it down to a manageable 6 extra items.</p>

<h2>Mobile Dashboard Access</h2>

<p>The WordPress dashboard is responsive and works on mobile browsers, but the experience is... not great on a phone. Everything is technically accessible, but the small screen makes detailed work like editing posts or configuring settings cumbersome.</p>

<p>WordPress also has an official <strong>WordPress app</strong> (available for iOS and Android) that is actually pretty decent for basic tasks like writing and publishing posts, moderating comments, and checking stats. I use it occasionally to approve comments when I am away from my computer, but for any real work, I wait until I am at my desk.</p>

<h2>Security Tips for the Dashboard</h2>

<p>Your WordPress dashboard is the control room for your entire website. Protecting it should be a priority:</p>

<ul>
  <li><strong>Use a strong, unique password.</strong> I cannot stress this enough. Use a password manager and generate a random password of at least 20 characters. "admin123" or "password" will get your site hacked — it is not a matter of if, but when.</li>
  <li><strong>Change the default "admin" username.</strong> If you used "admin" as your username during installation, create a new administrator account with a different username, log in as the new account, and delete the old "admin" account. Attackers try "admin" first in every brute-force attempt.</li>
  <li><strong>Enable two-factor authentication.</strong> Plugins like <strong>WP 2FA</strong> or Wordfence's login security add an extra layer of protection. Even if someone gets your password, they cannot log in without the second factor.</li>
  <li><strong>Limit login attempts.</strong> Plugins like <strong>Limit Login Attempts Reloaded</strong> or Wordfence's built-in feature block IP addresses after too many failed login attempts, shutting down brute-force attacks.</li>
</ul>

<h2>Final Thoughts</h2>

<p>The WordPress dashboard can feel overwhelming when you first encounter it, but I promise it gets familiar fast. After a week or two of regular use, you will be navigating it without thinking twice. The key is to not get intimidated by all the options — you do not need to understand everything on day one.</p>

<p>Focus on the essentials first: <strong>Posts</strong> for writing, <strong>Pages</strong> for static content, <strong>Appearance</strong> for how your site looks, and <strong>Settings > Permalinks</strong> for your URL structure. Everything else can wait until you need it.</p>

<p>If you have not set up your WordPress site yet, head over to my <a href="/blog/how-to-make-a-wordpress-website">complete guide to building a WordPress website</a> to get started from scratch. And if you have just finished installing WordPress and found this guide helpful, the next step is to start creating content — which is, after all, the whole point of having a website.</p>

<p>Feel free to bookmark this page and come back whenever you need a reminder of where something lives in the dashboard. I still occasionally reference guides like this when a WordPress update moves things around — it happens more often than you might think.</p>
`;
