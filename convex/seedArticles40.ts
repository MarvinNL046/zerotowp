import { internalMutation } from "./_generated/server";

// ─── Supporting: Best Email Marketing Plugins for WordPress ─────────────────

export const seedBestEmailMarketingPlugins = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "best-email-marketing-plugins";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-plugins"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-plugins' not found. Seed the wordpress-plugins cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-plugins':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "Best Email Marketing Plugins for WordPress (2026)",
      excerpt:
        "Growing your email list is the smartest thing you can do for your WordPress site. I have tested dozens of email marketing plugins over the years — these 5 are the ones I actually recommend.",
      content: bestEmailMarketingPluginsContent,
      category: "plugins",
      tags: [
        "email marketing",
        "wordpress plugins",
        "mailchimp",
        "brevo",
        "convertkit",
        "optinmonster",
        "mailerlite",
        "email list",
        "newsletter",
        "email capture",
      ],
      seoTitle: "5 Best Email Marketing Plugins for WordPress (2026)",
      seoDescription:
        "The 5 best email marketing plugins for WordPress compared. Covers Brevo, Mailchimp, Kit (ConvertKit), OptinMonster, and MailerLite with real pricing and install data.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing email marketing plugins article:",
        existing._id
      );
      return {
        message: "Updated existing email marketing plugins article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new email marketing plugins article:", postId);
      return {
        message: "Created new email marketing plugins article",
        id: postId,
      };
    }
  },
});

const bestEmailMarketingPluginsContent = `
<img src="/images/blog/best-email-marketing-plugins.webp" alt="Best email marketing plugins for WordPress" />

<p>If there is one thing I wish someone had told me when I launched my first WordPress site back in 2006, it is this: <strong>start building your email list on day one</strong>. Social media algorithms change, Google updates can tank your traffic overnight, but your email list? That is yours. Nobody can take it away from you. After 20 years of building WordPress sites, I have tested more email marketing tools and plugins than I can count. Some were brilliant. Most were forgettable. These 5 are the ones I keep coming back to — and they cover every use case from sending newsletters to capturing subscribers with smart popups.</p>

<h2>Quick Comparison Table</h2>

<p>Here is the full picture at a glance. I will go into detail on each tool below, but this table should help you narrow down your options fast:</p>

<table>
  <thead>
    <tr>
      <th>Plugin</th>
      <th>Best For</th>
      <th>Free Tier</th>
      <th>Active Installs</th>
      <th>Starting Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Brevo</strong></td>
      <td>All-in-one email + SMS</td>
      <td>300 emails/day</td>
      <td>100,000+</td>
      <td>$9/mo</td>
    </tr>
    <tr>
      <td><strong>Mailchimp (MC4WP)</strong></td>
      <td>Beginners, blog newsletters</td>
      <td>500 contacts</td>
      <td>2,000,000+</td>
      <td>$13/mo</td>
    </tr>
    <tr>
      <td><strong>Kit (ConvertKit)</strong></td>
      <td>Creators, bloggers, course sellers</td>
      <td>10,000 subscribers</td>
      <td>40,000+</td>
      <td>$25/mo</td>
    </tr>
    <tr>
      <td><strong>OptinMonster</strong></td>
      <td>Email capture (popups, forms)</td>
      <td>No free tier</td>
      <td>1,000,000+</td>
      <td>$7/mo</td>
    </tr>
    <tr>
      <td><strong>MailerLite</strong></td>
      <td>Clean, simple newsletters</td>
      <td>1,000 subscribers</td>
      <td>100,000+</td>
      <td>$10/mo</td>
    </tr>
  </tbody>
</table>

<p><strong>Pro tip:</strong> You do not have to pick just one. I often pair a sending tool (Brevo, Mailchimp, or MailerLite) with a capture tool (OptinMonster) for the best results. The sending tool handles your newsletter; the capture tool gets people on your list in the first place.</p>

<h2>1. Brevo (Formerly Sendinblue) — Best Free Tier for Sending</h2>

<img src="/screenshots/brevo-email-service.webp" alt="Brevo email marketing platform homepage" />

<p>Brevo has been my go-to recommendation for beginners who want to start sending emails without spending a dime. Their WordPress plugin has over 100,000 active installs and the free plan gives you <strong>300 emails per day</strong> — that is 9,000 emails a month — with unlimited contacts. Read that again: unlimited contacts. Most competitors cap your contact count on free plans, but Brevo caps sends instead. For a new WordPress site with a growing list, that is a much better deal.</p>

<p>I started recommending Brevo (back when it was still called Sendinblue) to client projects around 2019. What won me over was the all-in-one approach. You get email campaigns, transactional emails, SMS marketing, and even a simple CRM — all from one dashboard. The WordPress plugin lets you add signup forms to your site and syncs subscribers directly to your Brevo account. It also handles your transactional emails (password resets, order confirmations) which means you can replace a separate SMTP plugin too. If you are just getting started with <a href="/wordpress-email-setup/">WordPress email setup</a>, Brevo is hands down the easiest path.</p>

<p><strong>What I like:</strong> 300 free emails/day with unlimited contacts, built-in SMTP relay, drag-and-drop email builder, SMS marketing included. <strong>What I don't:</strong> The email builder can feel sluggish, and the free plan puts a small Brevo logo in your emails. Paid plans start at $9/month to remove branding and unlock more sends.</p>

<h2>2. Mailchimp for WordPress (MC4WP) — Most Popular Integration</h2>

<img src="/screenshots/mc4wp-plugin.webp" alt="MC4WP Mailchimp for WordPress plugin page" />

<p>Mailchimp barely needs an introduction — it is the email marketing platform most people think of first. But here is the thing: Mailchimp's own WordPress plugin is clunky. The one you actually want is <strong>MC4WP: Mailchimp for WordPress</strong>, built by Dutch developer Danny van Kooten. With over 2 million active installs and a 4.8-star rating from nearly 1,500 reviews, it is the best-rated Mailchimp integration by a mile. I have used it on at least a dozen projects and it just works.</p>

<p>MC4WP connects your WordPress site to your Mailchimp account and lets you create lightweight, customizable signup forms. It integrates with practically everything: <a href="/best-contact-form-plugins/">contact form plugins</a> like Contact Form 7 and WPForms, WooCommerce checkouts, comment forms, and even registration pages. You write the form HTML yourself (or use their form builder), which means the forms load fast and look exactly how you want them to. No bloated JavaScript, no slow iframes.</p>

<p>Mailchimp's free plan gives you up to <strong>500 contacts</strong> and 1,000 sends per month. That used to be 2,000 contacts — they cut it in 2022, which annoyed a lot of people, myself included. But for a brand new site, 500 contacts is still enough to get started. Once you outgrow the free tier, paid plans start at $13/month. Honestly, if you are already using Mailchimp for your newsletter, MC4WP is a no-brainer. If you are starting from scratch, I would look at Brevo or MailerLite first — they offer more on their free plans.</p>

<h2>3. Kit (Formerly ConvertKit) — Built for Creators</h2>

<img src="/screenshots/convertkit-homepage.webp" alt="Kit (formerly ConvertKit) WordPress plugin page" />

<p>Kit — which you might still know as ConvertKit — is the email platform I recommend to anyone who creates content for a living. Bloggers, YouTubers, podcasters, course creators, newsletter writers. Kit was designed specifically for this audience, and it shows. Their free plan is incredibly generous: up to <strong>10,000 subscribers</strong> with unlimited landing pages and forms. That is not a typo. You can build a serious audience before paying a cent.</p>

<p>The WordPress plugin connects your site to your Kit account and lets you embed forms, tag subscribers based on which page they signed up from, and even display targeted content to different subscriber segments. I have been using Kit for a personal project since 2021, and the tagging and automation system is best in class. You can create visual automation flows — "if someone signs up from this post, send them this email sequence" — without touching code. The landing page builder is also surprisingly good if you need a quick opt-in page without installing yet another plugin.</p>

<p><strong>What I like:</strong> The most generous free plan in the business (10K subscribers), excellent automation, creator-focused features like paid newsletters and digital product sales. <strong>What I don't:</strong> The WordPress plugin is fairly basic — it just embeds forms. The real power is in the Kit dashboard. Paid plans start at $25/month when you need advanced automations or to remove Kit branding.</p>

<h2>4. OptinMonster — Best for Email Capture</h2>

<img src="/screenshots/optinmonster-homepage.webp" alt="OptinMonster homepage showing conversion optimization tools" />

<p>Here is where I need to be clear: <strong>OptinMonster does not send emails</strong>. It captures them. OptinMonster is a conversion optimization tool that creates popups, slide-ins, floating bars, fullscreen welcome mats, and other attention-grabbing forms to get visitors on your email list. You then connect it to your email service (Mailchimp, Brevo, Kit, whatever you use) and OptinMonster pushes new subscribers there automatically.</p>

<p>Now here is where it gets interesting. I was skeptical about popups for years — I thought they were annoying and would drive visitors away. Then I installed OptinMonster on a client's WooCommerce site in 2020, set up an exit-intent popup offering a 10% discount code, and watched their email signups triple in two weeks. Exit-intent technology detects when someone is about to leave your site and shows the popup at exactly the right moment. It is genuinely effective, and OptinMonster's implementation is the best I have used.</p>

<p>OptinMonster comes with over 700 pre-built templates, A/B testing, page-level targeting (show different popups on different pages), and geolocation targeting. The biggest downside? There is no free plan. Pricing starts at $7/month billed annually for the Basic plan, which covers one site. The Pro plan ($29/month) unlocks exit-intent technology and is where the real value lies. If you are serious about growing your list fast, pairing OptinMonster with any of the other tools on this list is the most effective combo I know. It works alongside everything in our <a href="/best-wordpress-plugins/">best WordPress plugins</a> roundup.</p>

<h2>5. MailerLite — Cleanest Interface, Great Free Plan</h2>

<p>MailerLite is the underdog on this list, and honestly, it deserves more attention than it gets. The interface is the cleanest and most intuitive of any email marketing tool I have used — and I have used them all. If Mailchimp feels cluttered to you (it does to me these days), MailerLite will feel like a breath of fresh air. Their WordPress plugin has over 100,000 active installs and lets you embed signup forms and manage subscribers directly from your WordPress dashboard.</p>

<p>The free plan gives you up to <strong>1,000 subscribers</strong> and 12,000 emails per month. That is more generous than Mailchimp's free tier. You also get access to the drag-and-drop email editor, landing pages, and basic automations — features that competitors lock behind paid plans. I set up MailerLite for a friend's food blog last year, and she was sending beautiful newsletters within 30 minutes of creating her account. No technical skills needed.</p>

<p><strong>What I like:</strong> Beautiful, clean interface that beginners love, generous free plan, excellent drag-and-drop email builder, landing pages included for free. <strong>What I don't:</strong> The WordPress plugin could use more polish — it has a 3-star rating on WordPress.org, mostly because of occasional sync issues. The email service itself is excellent, though. Paid plans start at $10/month for up to 500 subscribers with unlimited emails and advanced automations.</p>

<h2>How to Choose the Right Plugin</h2>

<p>After years of testing these tools across different projects, my advice is simple. If you are brand new and want the easiest setup with the most free sends, <strong>start with Brevo</strong>. If you are a content creator or blogger building an audience, <strong>go with Kit</strong> — that 10,000 subscriber free tier is unbeatable. If you already use Mailchimp, <strong>install MC4WP</strong> and be done with it. And if your main goal is capturing more emails from existing traffic, <strong>add OptinMonster</strong> on top of whatever sending tool you pick. The best email marketing setup is usually two tools working together: one to capture, one to send.</p>

<p>One more thing most tutorials will not tell you: make sure your WordPress site is actually sending emails reliably before you worry about marketing. A broken contact form or missing password-reset email will cost you subscribers too. Check out our <a href="/wordpress-email-setup/">WordPress email setup guide</a> to make sure your transactional emails are working first.</p>

<h2>Frequently Asked Questions</h2>

<h3>Do I need a separate email marketing plugin, or can WordPress send newsletters on its own?</h3>

<p>WordPress can send basic emails (like password resets and comment notifications), but it is not built for newsletters or marketing campaigns. You need a dedicated email marketing service — Brevo, Mailchimp, Kit, or MailerLite — to send bulk emails reliably. Without one, your emails will land in spam or not arrive at all. The WordPress plugins listed above connect your site to these services so you can add signup forms and sync subscribers automatically.</p>

<h3>Which email marketing plugin has the best free plan?</h3>

<p>It depends on what matters most to you. <strong>Kit (ConvertKit)</strong> has the most generous subscriber limit at 10,000 free subscribers. <strong>Brevo</strong> offers 300 emails per day with unlimited contacts, which is great if you have a big list but send infrequently. <strong>MailerLite</strong> gives you 1,000 subscribers and 12,000 monthly emails on the free plan. Mailchimp's free tier (500 contacts) is the most limited of the bunch.</p>

<h3>Can I use OptinMonster without an email marketing service?</h3>

<p>Technically yes — OptinMonster can collect emails and store them in its own dashboard. But that defeats the purpose. You want those emails flowing into a real email marketing service so you can send campaigns, automations, and newsletters. I always pair OptinMonster with a sending tool like Brevo or Kit. OptinMonster captures the emails; the email service does the actual marketing.</p>

<h3>Will email marketing plugins slow down my WordPress site?</h3>

<p>Most of these plugins are lightweight and will not noticeably affect your page speed. MC4WP is especially lean — it loads minimal JavaScript. OptinMonster loads its assets from a CDN, so the impact is small. The one thing to watch out for is loading too many popup or form plugins at once. Pick one capture tool and one sending tool. You do not need five different form plugins competing for attention on the same page.</p>
`;
