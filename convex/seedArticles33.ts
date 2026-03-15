import { internalMutation } from "./_generated/server";

export const seedWordPressEmailSetup = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-email-setup";

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
      title: "How to Set Up Email for Your WordPress Site (Stop Emails Going to Spam)",
      excerpt:
        "Your WordPress emails are probably going to spam right now. I've fixed this on hundreds of sites, and it takes about 10 minutes. Here's exactly how to set up SMTP so your contact forms, password resets, and notifications actually reach the inbox.",
      content: wordPressEmailSetupContent,
      category: "tutorials",
      tags: [
        "wordpress email",
        "smtp",
        "wp mail smtp",
        "fluentsmtp",
        "brevo",
        "email deliverability",
        "wordpress tutorial",
        "contact form emails",
      ],
      seoTitle:
        "How to Set Up Email for Your WordPress Site (2026 Fix)",
      seoDescription:
        "WordPress emails going to spam? Fix it in 10 minutes with SMTP. Step-by-step guide using WP Mail SMTP and Brevo to ensure your emails reach the inbox.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing email setup article:", existing._id);
      return {
        message: "Updated existing email setup article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new email setup article:", postId);
      return {
        message: "Created new email setup article",
        id: postId,
      };
    }
  },
});

const wordPressEmailSetupContent = `
<p>Let me tell you something that took me way too long to figure out when I started building WordPress sites back in 2006: <strong>WordPress email is broken by default.</strong> Not "kind of broken" or "occasionally unreliable" — genuinely, fundamentally broken. Out of the box, WordPress uses PHP's built-in <code>mail()</code> function to send emails, and on most hosting providers, those emails either land in the spam folder, get silently dropped, or never leave the server at all.</p>

<p>I learned this the hard way when a client called me furious because they'd been missing contact form submissions for <em>weeks</em>. Their potential customers were filling out forms, clicking submit, getting a "thank you" message — and the emails were vanishing into thin air. Password reset emails? Gone. WooCommerce order confirmations? Spam folder. New user registration notifications? Never delivered. The site looked like it was working perfectly, but behind the scenes, it was hemorrhaging leads and frustrating visitors.</p>

<p>The good news is that fixing this takes about 10 minutes. You need an SMTP plugin and a free email sending service, and once you've set them up, your emails will be authenticated, trusted by email providers, and consistently delivered to the inbox. I've done this on hundreds of WordPress sites, and I'm going to walk you through the exact process right now.</p>

<h2>Why WordPress Emails Go to Spam (The Real Problem)</h2>

<p>Here's the technical explanation in plain English: when WordPress sends an email using PHP <code>mail()</code>, it's essentially sending an unsigned, unauthenticated message from your web server. Think of it like mailing a letter with no return address — the post office (Gmail, Outlook, Yahoo) has no way to verify that it's actually coming from your domain. So they either dump it in spam or reject it outright. This is by far the most common <a href="/how-to-make-a-wordpress-website/">WordPress setup mistake</a> I see beginners make, because nobody tells you about it during installation.</p>

<p>SMTP (Simple Mail Transfer Protocol) solves this by routing your WordPress emails through a proper email service that authenticates every message. Instead of your web server pretending to be an email server, your emails get sent through a dedicated provider like Brevo, SendLayer, or Gmail's SMTP servers — services that have established reputations with inbox providers. It's the difference between shouting into the void and handing a stamped, addressed letter to a trusted courier. The inbox providers see the authentication (SPF, DKIM, and DMARC records) and think "okay, this is legitimate" instead of "this looks like spam, trash it."</p>

<h2>Method 1: WP Mail SMTP + Brevo (My Recommended Setup)</h2>

<p>I've tested every major SMTP plugin and email service combination over the years, and for most WordPress sites, the winning combo is <strong>WP Mail SMTP</strong> paired with <strong>Brevo</strong> (formerly Sendinblue). WP Mail SMTP has over 4 million active installations and a 4.8-star rating for a reason — it's the most battle-tested option available. Brevo gives you 300 free emails per day, which is more than enough for any blog or small business site. Here's exactly how to set it up.</p>

<img src="/screenshots/wp-mail-smtp-plugin.webp" alt="WP Mail SMTP plugin on the WordPress.org plugin directory, showing 4+ million active installations and a 4.8-star rating" />

<h3>Step 1: Install WP Mail SMTP</h3>

<p>From your WordPress dashboard, go to <strong>Plugins → Add New</strong> and search for "WP Mail SMTP". It's the one by WPForms with millions of installs — you can't miss it. Click <strong>Install Now</strong>, then <strong>Activate</strong>. The plugin will immediately launch a setup wizard, but I'm going to walk you through the manual setup because I think it's important to understand what each setting does. You can skip the wizard by clicking the "Go back to the Dashboard" link at the bottom.</p>

<h3>Step 2: Create a Free Brevo Account</h3>

<p>Head over to <a href="https://www.brevo.com/" target="_blank" rel="noopener">Brevo.com</a> and sign up for a free account. You don't need a credit card — the free tier gives you 300 emails per day, which handles contact form submissions, password resets, WooCommerce order emails, and comment notifications with plenty of headroom. During signup, Brevo will ask you to verify your email address and provide some basic information about your business. Complete those steps to get to your dashboard.</p>

<img src="/screenshots/brevo-email-service.webp" alt="Brevo homepage showing their email marketing and automation platform with a free signup option" />

<h3>Step 3: Get Your Brevo API Key</h3>

<p>Once you're in the Brevo dashboard, navigate to the top-right menu and click on <strong>SMTP & API</strong> (or go to Settings → Keys → API Keys). Click the <strong>Generate a new API key</strong> button. Give it a name like "WordPress Site" so you can identify it later. <strong>Copy this API key immediately</strong> — Brevo only shows it once. If you lose it, you'll need to generate a new one. I always paste mine into a temporary note before doing anything else.</p>

<p><strong>Pro tip:</strong> While you're in Brevo, go to <strong>Settings → Senders & IPs → Senders</strong> and add the email address you want WordPress to send from (like info@yourdomain.com or hello@yourdomain.com). This needs to match what you'll configure in WP Mail SMTP.</p>

<h3>Step 4: Configure WP Mail SMTP</h3>

<p>Back in WordPress, go to <strong>WP Mail SMTP → Settings</strong>. Here's exactly what to enter:</p>

<ul>
<li><strong>From Email:</strong> Enter the email address you added as a sender in Brevo (e.g., info@yourdomain.com)</li>
<li><strong>Force From Email:</strong> Check this box — it ensures ALL WordPress emails use this address, even if a plugin tries to override it</li>
<li><strong>From Name:</strong> Enter your site name or your name (e.g., "ZeroToWP" or "Marvin")</li>
<li><strong>Force From Name:</strong> Check this box too</li>
<li><strong>Mailer:</strong> Select <strong>Brevo (formerly Sendinblue)</strong></li>
<li><strong>API Key:</strong> Paste the API key you copied from Brevo</li>
</ul>

<p>Click <strong>Save Settings</strong>. That's the configuration done — seriously, that's all there is to it. No port numbers, no encryption settings, no hostname configuration. The API-based approach bypasses all of that complexity, which is exactly why I recommend it over the "Other SMTP" option.</p>

<h3>Step 5: Send a Test Email</h3>

<p>Go to <strong>WP Mail SMTP → Email Test</strong>. Enter your personal email address and click <strong>Send Test</strong>. Within 30 seconds, you should receive a test email. Check your inbox first, then check your spam folder just to make sure. If it landed in your inbox — congratulations, your WordPress email is fixed. If it hit spam, you likely need to set up SPF and DKIM records (more on that in a moment).</p>

<p><strong>Warning:</strong> If the test email fails entirely, double-check that you pasted the full API key (they're long) and that you verified the sender email in Brevo. These are the two most common mistakes I see.</p>

<h2>Method 2: FluentSMTP (The 100% Free Alternative)</h2>

<p>If you're the kind of person who avoids plugins with premium upsells — and honestly, I respect that — then <strong>FluentSMTP</strong> is your answer. It's built by the same team behind FluentCRM and Fluent Forms, it's completely free with no pro version or paid tiers, and it supports all the same email services that WP Mail SMTP does. I've used it on several client sites where budget was a concern, and it works beautifully.</p>

<img src="/screenshots/fluentsmtp-plugin.webp" alt="FluentSMTP plugin on WordPress.org showing support for Amazon SES, SendGrid, MailGun, Postmark, Google, and other SMTP providers" />

<p>The setup process is nearly identical to what I described above. Install FluentSMTP from <strong>Plugins → Add New</strong>, activate it, and you'll see a new <strong>FluentSMTP</strong> menu item in your dashboard. Choose your connection type (Brevo, SendGrid, Amazon SES, Gmail, or generic SMTP), enter your API credentials, and save. FluentSMTP also has a built-in email logging feature in the free version, which WP Mail SMTP reserves for their paid tier — so you get email logs out of the box without paying a cent.</p>

<p>The one downside? FluentSMTP has a smaller user base (around 50,000+ active installs vs. WP Mail SMTP's 4+ million), which means fewer tutorials and community support threads. But for a straightforward SMTP setup, it works just as well. Honestly, if I were starting a new site today on a tight budget, I'd seriously consider FluentSMTP over WP Mail SMTP purely because the email logging is free.</p>

<h2>Which SMTP Service Should You Choose?</h2>

<p>The plugin is just the bridge — the real work is done by the email sending service. Here's my honest breakdown of the best options based on what I've used across dozens of WordPress sites:</p>

<table>
<thead>
<tr>
<th>Service</th>
<th>Free Tier</th>
<th>Best For</th>
<th>My Take</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Brevo</strong></td>
<td>300 emails/day</td>
<td>Most WordPress sites</td>
<td>My #1 pick. Generous free tier, dead simple API setup, reliable deliverability.</td>
</tr>
<tr>
<td><strong>SendLayer</strong></td>
<td>200 emails (trial)</td>
<td>WP Mail SMTP users</td>
<td>Made by the same team as WP Mail SMTP. Great integration, but limited free trial.</td>
</tr>
<tr>
<td><strong>Gmail SMTP</strong></td>
<td>500 emails/day</td>
<td>Personal blogs</td>
<td>Uses your Google account. The OAuth setup is more involved, but works well for small sites.</td>
</tr>
<tr>
<td><strong>Amazon SES</strong></td>
<td>62,000/month (with EC2)</td>
<td>High-volume sites</td>
<td>Incredibly cheap at scale ($0.10/1,000 emails), but setup requires AWS knowledge.</td>
</tr>
</tbody>
</table>

<p>For 90% of WordPress sites — blogs, small business sites, portfolios, even small WooCommerce stores — <strong>Brevo's free tier is more than enough</strong>. You'd need to send more than 300 emails in a single day before hitting the limit, and most WordPress sites send fewer than 50 emails per day (contact forms, notifications, password resets, etc.). If you're running a high-traffic WooCommerce store sending hundreds of order confirmations daily, then look at Amazon SES or upgrade to Brevo's paid plans. For everything else, start with the free tier and upgrade only when you actually need to.</p>

<h2>Test Your Emails (Don't Skip This)</h2>

<p>After setup, always verify that your emails are properly authenticated. Here's my quick testing checklist that I run on every WordPress site I configure:</p>

<ol>
<li><strong>Send a test email</strong> through WP Mail SMTP or FluentSMTP's built-in test feature. Confirm it arrives in your inbox (not spam).</li>
<li><strong>Submit your own contact form.</strong> If you're using <a href="/best-contact-form-plugins/">a contact form plugin</a>, fill it out and confirm you receive the notification email.</li>
<li><strong>Trigger a password reset.</strong> Go to the WordPress login page, click "Lost your password?", and check that the reset email arrives.</li>
<li><strong>Check your SPF and DKIM records.</strong> Send a test email to <a href="https://www.mail-tester.com" target="_blank" rel="noopener">mail-tester.com</a> and aim for a score of 9 or 10 out of 10. If your score is low, you'll need to add DNS records for your domain — Brevo's documentation walks you through this step by step.</li>
</ol>

<p><strong>Pro tip:</strong> If you're using Brevo, they'll prompt you to verify your domain by adding a DNS record. <strong>Do this.</strong> It takes 5 minutes in your domain registrar or hosting control panel, and it's the single biggest factor in whether your emails land in the inbox or spam. Without domain verification, your emails will show "sent via brevo.com" instead of your own domain, which looks unprofessional and triggers spam filters.</p>

<h2>Frequently Asked Questions</h2>

<h3>Do I need an SMTP plugin if my hosting provider already sends emails?</h3>

<p>Yes, absolutely. Even if your hosting provider's PHP <code>mail()</code> function technically works, the emails aren't authenticated. They'll have a much higher chance of landing in spam compared to properly configured SMTP emails. I've seen this on every major host — <a href="/bluehost-review/">Bluehost</a>, <a href="/siteground-review/">SiteGround</a>, <a href="/hostinger-review/">Hostinger</a> — none of them configure authenticated email sending out of the box. An SMTP plugin is one of the <a href="/must-have-plugins-new-site/">first plugins I install on every new WordPress site</a>.</p>

<h3>Will this work with WooCommerce order emails?</h3>

<p>Yes. WP Mail SMTP and FluentSMTP intercept <em>all</em> emails sent by WordPress, including WooCommerce order confirmations, shipping notifications, and customer account emails. Once you've configured SMTP, every email from your site goes through your chosen provider — no extra WooCommerce-specific setup needed. If you're running an online store, this is especially critical because failed order emails directly cost you money and customer trust.</p>

<h3>What if I'm sending more than 300 emails per day?</h3>

<p>If your site consistently sends more than 300 emails daily, you've outgrown Brevo's free tier. At that point, I'd recommend either upgrading to Brevo's Starter plan (around $9/month for 5,000 emails) or switching to Amazon SES if you're comfortable with AWS. For most blogs, business sites, and even small WooCommerce shops, you'll never come close to 300/day — but it's worth monitoring your usage through Brevo's dashboard to see where you stand.</p>

<h3>Can I use my Gmail account as the SMTP provider?</h3>

<p>You can, but I don't recommend it for business sites. Gmail SMTP works great for personal blogs, but the OAuth2 setup process is more involved (you need to create a Google Cloud project and configure credentials), and if your Gmail account gets suspended for any reason, your entire WordPress email flow breaks. For anything beyond a personal hobby blog, use a dedicated transactional email service like Brevo. It's free, it's designed for this purpose, and it doesn't tie your site's email to your personal Google account. If you're building your site from scratch, check out my <a href="/how-to-make-a-wordpress-website/">complete WordPress setup guide</a> for more foundational tips like this.</p>
`;
