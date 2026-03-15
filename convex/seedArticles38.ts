import { internalMutation } from "./_generated/server";

// ─── PILLAR: WordPress Tutorials Hub Page ──────────────────────────────────────

export const seedTutorialsPillar = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-tutorials-guide";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "tutorials"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'tutorials' not found. Seed the tutorials cluster first.",
      };
    }

    console.log("Found cluster 'tutorials':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "WordPress Tutorials — Everything You Need to Learn WordPress",
      excerpt:
        "A complete collection of step-by-step WordPress tutorials. From speeding up your site to setting up an online store — all in one place.",
      content: tutorialsPillarContent,
      category: "tutorials",
      tags: [
        "wordpress tutorials",
        "wordpress guide",
        "learn wordpress",
        "wordpress for beginners",
      ],
      seoTitle: "WordPress Tutorials 2026 — Step-by-Step Guides for Beginners",
      seoDescription:
        "Free WordPress tutorials covering speed, backups, security, WooCommerce, blogging, and email. Practical step-by-step guides you can follow today.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "pillar" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing tutorials pillar:", existing._id);
      return {
        message: "Updated existing tutorials pillar",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new tutorials pillar:", postId);
      return {
        message: "Created new tutorials pillar",
        id: postId,
      };
    }
  },
});

const tutorialsPillarContent = `
<p>These are the tutorials I wish existed when I started with WordPress back in 2006. No abstract theory, no fluff paragraphs about "what is WordPress" — just practical, step-by-step guides that solve real problems. I've been building WordPress sites for over 20 years now, and every tutorial below comes from problems I've actually solved, mistakes I've actually made, and workflows I've actually tested on dozens of live sites.</p>

<p>Bookmark this page. It's the master list of every tutorial on ZeroToWP, organized by what you're trying to accomplish. I add new guides regularly, so check back often.</p>

<h2>Speed Up WordPress</h2>

<p>A slow site kills your traffic, your conversions, and your search rankings. Google confirmed page speed as a ranking factor years ago, and visitors are even less patient than Google — <strong>53% of mobile users leave a page that takes longer than 3 seconds to load</strong>. I've seen sites go from 6-second load times to under 2 seconds with the optimizations in this guide, and the traffic impact is almost immediate.</p>

<p>This tutorial walks you through 10 ranked optimizations — from the quick wins that take five minutes to the advanced techniques that squeeze out every last millisecond. You don't need to do all 10. Even the first three will make a noticeable difference.</p>

<p><a href="/speed-up-wordpress/">Read the full guide: Speed Up WordPress &rarr;</a></p>

<h2>Backup Your Site</h2>

<p>I learned this one the hard way. Back in 2011, a hosting provider I was using had a catastrophic disk failure. No backups on their end — and I hadn't set up my own. Three client sites, gone. I rebuilt them from the Wayback Machine and fragments of local files, and it took weeks. Never again.</p>

<p>This tutorial covers three backup methods: automated backups with UpdraftPlus (my recommendation for most people), hosting-level backups through your control panel, and manual FTP/database backups for when you want full control. You'll know exactly where your backups are and how to restore them.</p>

<p><a href="/wordpress-backup-guide/">Read the full guide: Backup Your WordPress Site &rarr;</a></p>

<h2>Secure Your Site</h2>

<p>WordPress powers over 40% of the web, which makes it the biggest target for hackers and bots. The good news? Most attacks are automated and opportunistic — they go after the easy targets with weak passwords, outdated plugins, and no firewall. If you do even the basics right, you're safer than 90% of WordPress sites out there.</p>

<p>This is a 12-step security checklist that covers everything from SSL and login hardening to file permissions and malware scanning. I use this exact checklist on every site I build, and I haven't had a single site compromised since 2012.</p>

<p><a href="/wordpress-security-guide/">Read the full guide: Secure Your WordPress Site &rarr;</a></p>

<h2>Create an Online Store</h2>

<p>WooCommerce powers millions of online stores, and for good reason — it's free, it's flexible, and it integrates with virtually every payment provider and shipping service. But setting it up from scratch can feel overwhelming if you've never done it before. Product pages, tax settings, shipping zones, payment gateways — there's a lot of moving parts.</p>

<p>This tutorial takes you from zero to your first live product in 8 clear steps. I built my first WooCommerce store in 2015, and I still use the same setup process today. You'll have a working store with payments enabled by the end of it.</p>

<p><a href="/create-online-store-wordpress/">Read the full guide: Create an Online Store with WordPress &rarr;</a></p>

<h2>Start a Blog</h2>

<p>Starting a blog is still one of the best ways to build an audience and create a real income online. I know that sounds like a cliche from 2010, but it's actually more true now than it was then — the tools are better, the audience is bigger, and the monetization options have exploded. My first blog was a disaster (terrible niche, no plan, generic content), but the second one became a legitimate income source within 8 months.</p>

<p>This guide covers the 7 steps from picking a profitable niche to publishing your first post. Not just the technical setup — the strategic decisions that determine whether your blog actually gets traffic or dies in obscurity like most blogs do.</p>

<p><a href="/start-a-blog/">Read the full guide: Start a WordPress Blog &rarr;</a></p>

<h2>Fix Email Delivery</h2>

<p>Here's something most WordPress tutorials don't mention: by default, WordPress sends emails through PHP's <code>mail()</code> function, which means your contact form submissions, order confirmations, and password reset emails are almost certainly landing in spam folders. I've talked to so many site owners who thought their contact form was broken — turns out, the emails were being sent, just straight into the spam abyss.</p>

<p>This tutorial shows you how to set up SMTP (Simple Mail Transfer Protocol) so your WordPress emails actually reach the inbox. It takes about 15 minutes and it's one of those fixes that makes you wonder why WordPress doesn't do this by default.</p>

<p><a href="/wordpress-email-setup/">Read the full guide: Fix WordPress Email Delivery &rarr;</a></p>

<h2>Where Should You Start?</h2>

<p><strong>If you already have a WordPress site:</strong> start with the <a href="/speed-up-wordpress/">speed optimization guide</a> or the <a href="/wordpress-security-guide/">security checklist</a>. These two make the biggest immediate impact on a live site. Speed directly affects your rankings and conversions, and security prevents the kind of disaster that can set you back months.</p>

<p><strong>If you're building something new:</strong> start with <a href="/start-a-blog/">Start a Blog</a> if you want to create content, or <a href="/create-online-store-wordpress/">Create an Online Store</a> if you're selling products. Both guides cover the full setup from scratch, including hosting and domain setup.</p>

<p>Either way, get your <a href="/wordpress-backup-guide/">backups configured</a> before you do anything else. Seriously. Future you will thank present you.</p>

<h2>More Learning Resources</h2>

<img src="/screenshots/learn-wordpress-org.webp" alt="Learn WordPress — the official free learning platform from WordPress.org with courses, lessons, and online workshops" width="1280" height="800" />

<p>Beyond the tutorials here on ZeroToWP, WordPress has an excellent official learning platform at <a href="https://learn.wordpress.org/" target="_blank" rel="noopener noreferrer">learn.wordpress.org</a>. It offers free courses, lessons, and online workshops covering everything from the basics to theme development. The <a href="https://developer.wordpress.org/documentation/" target="_blank" rel="noopener noreferrer">WordPress developer documentation</a> is also surprisingly good if you ever want to dig into the technical side.</p>

<p>If you're just getting started with WordPress itself — choosing hosting, installing WordPress, picking a theme — check out our <a href="/start-here/">Start Here</a> guide. For hosting comparisons and recommendations, head to <a href="/wordpress-hosting/">WordPress Hosting</a>. And if you want to know which plugins are worth installing, the <a href="/wordpress-plugins/">WordPress Plugins</a> hub has you covered.</p>

<h2>Frequently Asked Questions</h2>

<h3>Do I need any coding skills to follow these tutorials?</h3>
<p>Not at all. Every tutorial on ZeroToWP is written for non-developers. I explain where to click, what to type, and what each setting does. If you can use a web browser and follow numbered steps, you can follow these guides. I've been a developer for 20+ years, but I write these for the version of me that was just getting started.</p>

<h3>How long does it take to learn WordPress?</h3>
<p>You can build and launch a basic WordPress site in a single afternoon — that includes hosting setup, WordPress installation, and your first pages. Getting comfortable with the dashboard, plugins, and customization takes a week or two of regular use. Becoming truly proficient — knowing how to troubleshoot problems, optimize performance, handle security — takes a few months. These tutorials are designed to fast-track that process.</p>

<h3>Are these tutorials free?</h3>
<p>Every tutorial on ZeroToWP is 100% free to read. Some guides recommend tools or hosting that I've tested and trust — those include affiliate links, which means I earn a small commission if you sign up through them. This doesn't cost you anything extra and it's how I keep the site running. I only recommend things I actually use myself.</p>

<h3>How often do you add new tutorials?</h3>
<p>I publish new tutorials and update existing ones regularly. WordPress changes fast — plugins get updated, best practices evolve, hosting providers change their offerings. I treat these guides as living documents. If something changes, I update the guide. Bookmark this page and check back, or follow along on the site to catch new guides as they drop.</p>
`;
