import { internalMutation } from "./_generated/server";

// ─────────────────────────────────────────────
// Article 1: WordPress Security — The Complete Guide (PILLAR)
// ─────────────────────────────────────────────

export const seedSecurityCompleteGuide = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-security-complete-guide";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-security"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-security' not found. Seed the security cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-security':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "WordPress Security — The Complete Guide to Protecting Your Site",
      excerpt:
        "After 20 years of building WordPress sites, I've cleaned up more hacked sites than I care to remember. Most of those hacks were completely preventable. This is everything I know about keeping WordPress secure — no fear-mongering, just practical steps that actually work.",
      content: securityCompleteGuideContent,
      category: "security",
      tags: [
        "wordpress security",
        "website security",
        "wordpress firewall",
        "ssl",
        "malware",
        "login security",
        "security plugins",
        "wordpress hardening",
      ],
      seoTitle:
        "WordPress Security: The Complete Guide (2026)",
      seoDescription:
        "The complete WordPress security guide. SSL, firewalls, login protection, malware scanning, backups, and file permissions — practical steps from 20 years of experience.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "pillar" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing security guide:", existing._id);
      return {
        message: "Updated existing security guide",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new security guide:", postId);
      return {
        message: "Created new security guide",
        id: postId,
      };
    }
  },
});

const securityCompleteGuideContent = `
<p>Let me start with a confession: in 2009, I had three WordPress sites hacked in a single weekend. All three were running outdated plugins, shared the same weak admin password, and were hosted on a bargain-basement shared host that apparently thought "server security" meant putting a padlock emoji in their marketing materials. It took me two full days to clean up the mess — removing backdoors, restoring databases, explaining to Google why my sites were temporarily serving pharmaceutical ads. That weekend cost me about $2,000 in lost affiliate revenue and roughly ten years off my life expectancy.</p>

<p>The thing is, every single one of those hacks was preventable. Not with expensive enterprise security tools or a dedicated DevOps team — just with basic hygiene that takes maybe 30 minutes to set up properly. After 20 years of building and maintaining WordPress sites, I've learned that WordPress security isn't complicated. It's just a checklist of sensible practices that most people skip because they assume "it won't happen to me." Spoiler: it will, eventually, if you don't take precautions.</p>

<p>This guide is everything I know about keeping WordPress secure. No fear-mongering, no upselling you on security products you don't need. Just the practical steps that actually prevent the vast majority of WordPress attacks. If you follow even half of what's in this article, you'll be more secure than 90% of WordPress sites on the internet.</p>

<h2>WordPress Security Reality Check</h2>

<p>Here's something the security plugin companies don't want you to know: <strong>WordPress core is actually very secure.</strong> It has a dedicated security team, receives regular patches, and undergoes constant auditing. The vast majority of WordPress hacks — we're talking north of 95% — come from three sources: outdated plugins and themes, weak passwords, and poor hosting environments. That's it. WordPress itself isn't the problem. The stuff people bolt onto WordPress, and the way they manage it, is the problem.</p>

<p>I've cleaned up probably 50+ hacked WordPress sites over the years, either for clients or fellow developers who called me in a panic. In almost every case, the root cause was one of those three things. Sometimes it was a premium theme from a sketchy marketplace that hadn't been updated in two years. Sometimes it was an admin account with the password "admin123" (yes, really, in 2024). And sometimes it was a shared hosting account with 47 other sites, one of which got compromised and provided a backdoor to all the others. The point is: you don't need to become a cybersecurity expert. You just need to stop making the mistakes that make you an easy target.</p>

<h2>The Security Stack: What You Actually Need</h2>

<p>I think of WordPress security as a stack — multiple layers that work together. No single layer is enough on its own, but together they make your site extremely difficult to compromise. Here's the stack I use on every site I build, and what each layer does.</p>

<h3>SSL/HTTPS — Your Foundation</h3>

<p>SSL encrypts the connection between your visitors and your server. Without it, passwords, form data, and personal information travel across the internet in plain text — which is exactly as dangerous as it sounds. Google also uses HTTPS as a ranking factor, and Chrome shows a "Not Secure" warning on sites without SSL. There's literally no reason not to have it in 2026, especially since it's free. I cover the complete setup process, including fixing mixed content issues, in my <a href="/setup-ssl-wordpress/">guide to setting up SSL on WordPress</a>.</p>

<h3>Firewall — Your First Line of Defense</h3>

<p>A web application firewall (WAF) sits between your site and incoming traffic, filtering out malicious requests before they ever reach WordPress. This blocks the vast majority of automated attacks — SQL injection attempts, cross-site scripting, brute force login attacks, and all the other garbage that bots throw at WordPress sites 24/7. I've written a detailed breakdown of the best options in my <a href="/best-wordpress-firewall-plugins/">WordPress firewall plugins comparison</a>, but the short version is: Wordfence is excellent and free for most sites.</p>

<h3>Login Protection</h3>

<p>Your login page is the front door to your site, and bots hammer it constantly. You need strong passwords (obviously), two-factor authentication, and rate limiting on login attempts at minimum. Moving your login URL from the default <code>/wp-admin/</code> adds another layer. I'll cover login hardening in detail in my <a href="/wordpress-login-security/">WordPress login security guide</a> — it's one of the highest-impact security improvements you can make in under 10 minutes.</p>

<h3>Malware Scanning</h3>

<p>Even with prevention measures in place, you need a way to detect if something slips through. A malware scanner checks your WordPress files against known clean versions and flags anything suspicious. Wordfence includes a solid free scanner, or you can use Sucuri's SiteCheck for a quick external scan. For the full walkthrough on what to do if you find malware, see my <a href="/remove-malware-wordpress/">guide to removing malware from WordPress</a>.</p>

<h3>Backups — Your Safety Net</h3>

<p>Backups aren't technically a security measure, but they're your nuclear option when everything else fails. If your site gets compromised beyond what you can clean up, a recent backup lets you restore to a known-good state in minutes instead of days. I cannot overstate how important this is. I've seen site owners lose months of work because they assumed their host was handling backups (most don't, or they keep them for only 24-48 hours). My <a href="/wordpress-backup-guide/">WordPress backup guide</a> covers both plugin-based and server-level backup strategies.</p>

<h3>File Permissions</h3>

<p>Correct file permissions prevent attackers from modifying your WordPress files even if they find a vulnerability to exploit. This is one of those things that takes five minutes to set up correctly and can prevent a minor vulnerability from becoming a full-blown compromise. Check my <a href="/wordpress-file-permissions/">WordPress file permissions guide</a> for the exact permission values you should use.</p>

<h2>The WordPress Security Checklist</h2>

<p>I keep this checklist pinned in my project management tool and run through it for every new site I launch. These 15 items cover the fundamentals — do all of them, and you've eliminated the attack surface that catches 95% of WordPress sites.</p>

<ol>
<li><strong>Install an SSL certificate</strong> — free from your host or Let's Encrypt, takes 5 minutes, absolutely non-negotiable in 2026.</li>
<li><strong>Keep WordPress core updated</strong> — enable auto-updates for minor releases, and apply major updates within a week of release after checking compatibility.</li>
<li><strong>Keep all plugins updated</strong> — outdated plugins are the #1 attack vector; set a weekly reminder to check for updates if you don't enable auto-updates.</li>
<li><strong>Keep your theme updated</strong> — yes, themes get security patches too; this is easy to forget because theme updates can sometimes break customizations.</li>
<li><strong>Delete unused plugins and themes</strong> — deactivated plugins can still be exploited if they have vulnerabilities; delete anything you're not actively using.</li>
<li><strong>Use strong, unique passwords</strong> — minimum 16 characters, generated by a password manager; never reuse passwords across sites.</li>
<li><strong>Enable two-factor authentication</strong> — use an app-based TOTP method (Google Authenticator, Authy) rather than SMS, which can be intercepted.</li>
<li><strong>Limit login attempts</strong> — block IP addresses after 3-5 failed login attempts; Wordfence and Limit Login Attempts Reloaded both handle this well.</li>
<li><strong>Change the default admin username</strong> — "admin" is the first username every brute force bot tries; create a new administrator account with a unique name and delete the original.</li>
<li><strong>Install a web application firewall</strong> — Wordfence (free) for most sites, or a DNS-level WAF like Cloudflare or Sucuri for high-traffic sites.</li>
<li><strong>Set correct file permissions</strong> — directories at 755, files at 644, wp-config.php at 600 or 640.</li>
<li><strong>Disable file editing in the dashboard</strong> — add <code>define('DISALLOW_FILE_EDIT', true);</code> to wp-config.php to prevent code editing via the admin panel.</li>
<li><strong>Set up automated backups</strong> — daily database backups and weekly full-site backups stored off-server (cloud storage or separate server).</li>
<li><strong>Use a reputable hosting provider</strong> — good hosts include server-level firewalls, malware scanning, automatic updates, and proper isolation between accounts.</li>
<li><strong>Monitor your site regularly</strong> — set up uptime monitoring (UptimeRobot is free) and Google Search Console alerts so you know immediately if something goes wrong.</li>
</ol>

<p><strong>Pro tip:</strong> Print this checklist out and tape it next to your monitor. Seriously. I know it sounds old-school, but having it visible means you'll actually reference it. I keep a laminated copy at my desk and check it every time I launch a new site or take on a new client project.</p>

<h2>Security Plugins Compared</h2>

<p>There are dozens of WordPress security plugins, but three dominate the market for good reason. Here's how they stack up based on my experience using all three across multiple sites over several years.</p>

<table>
<thead>
<tr>
<th>Feature</th>
<th>Wordfence</th>
<th>Sucuri</th>
<th>Solid Security (iThemes)</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Firewall type</strong></td>
<td>Application-level (endpoint)</td>
<td>Cloud-based (DNS-level)</td>
<td>Application-level</td>
</tr>
<tr>
<td><strong>Free version</strong></td>
<td>Yes — excellent</td>
<td>Yes — limited (scanner only)</td>
<td>Yes — decent</td>
</tr>
<tr>
<td><strong>Premium price</strong></td>
<td>$149/year</td>
<td>$229/year (firewall included)</td>
<td>$99/year</td>
</tr>
<tr>
<td><strong>Malware scanner</strong></td>
<td>Built-in, thorough</td>
<td>Remote scanner (free) + server-side (paid)</td>
<td>Basic file change detection</td>
</tr>
<tr>
<td><strong>Brute force protection</strong></td>
<td>Yes — excellent</td>
<td>Yes — via firewall</td>
<td>Yes — good</td>
</tr>
<tr>
<td><strong>Two-factor auth</strong></td>
<td>Yes (free)</td>
<td>No (use separate plugin)</td>
<td>Yes (free)</td>
</tr>
<tr>
<td><strong>Performance impact</strong></td>
<td>Moderate (runs on your server)</td>
<td>Minimal (cloud-based)</td>
<td>Light</td>
</tr>
<tr>
<td><strong>Best for</strong></td>
<td>Most WordPress sites</td>
<td>High-traffic sites, agencies</td>
<td>Budget-conscious users</td>
</tr>
</tbody>
</table>

<p><strong>My honest recommendation:</strong> For most people reading this guide, <strong>Wordfence free</strong> is the right choice. It gives you a firewall, malware scanner, login security, and two-factor authentication at zero cost. The free version's firewall rules are delayed by 30 days compared to premium, but that's a perfectly acceptable trade-off for most sites. I run Wordfence free on my personal projects and Wordfence Premium on client sites where I want real-time threat intelligence.</p>

<p>If you're running a high-traffic site or managing multiple client sites, Sucuri's cloud-based firewall is worth considering because it filters traffic before it even reaches your server — which means your server resources aren't spent processing malicious requests. The downside is the price tag and the fact that their free version is essentially just a remote scanner without the firewall.</p>

<p>Solid Security (formerly iThemes Security) is fine, but honestly, I think Wordfence does everything it does and does it better. The only scenario where I'd pick Solid Security is if a client specifically requests it or if you need the Pro version's features like scheduled malware scanning on a tighter budget. For a deeper comparison of firewall-specific features, check out my <a href="/best-wordpress-firewall-plugins/">firewall plugins guide</a>.</p>

<img src="/screenshots/wordfence-firewall.webp" alt="Wordfence Security plugin page on WordPress.org showing firewall, malware scan, and login security features" />

<p>That's the Wordfence plugin page on WordPress.org — over 5 million active installations and a 4.7-star rating. It's the security plugin I recommend to virtually everyone, and for good reason. The free version alone covers about 90% of what most sites need.</p>

<h2>Common Mistakes I See Over and Over</h2>

<p>After two decades in the WordPress world, certain patterns keep repeating. Here are the mistakes I see most often — and I'll admit I've made a few of these myself early on.</p>

<p><strong>Installing too many security plugins.</strong> This is counterproductive and causes more problems than it solves. Two firewalls will conflict with each other, cause false positives, and slow your site to a crawl. Pick one security suite — Wordfence or Sucuri — and stick with it. Don't layer three different security plugins thinking more is better. It's not.</p>

<p><strong>Ignoring updates for weeks or months.</strong> I get it — updating plugins feels risky, especially if something broke the last time you updated. But running outdated plugins is far riskier than the occasional update hiccup. The solution isn't to avoid updates; it's to have a backup before you update, so you can roll back if something breaks. Take five minutes every week to update everything. It's the single most impactful security habit you can develop.</p>

<p><strong>Using "admin" as a username.</strong> This one seems obvious, but I still encounter it on at least half the sites I audit. Every brute force bot in existence starts with "admin" as the username. Change it. Create a new administrator account with a unique name, log in with it, and delete the original "admin" account. Takes two minutes.</p>

<p><strong>Not having backups.</strong> I cannot stress this enough. A backup is your insurance policy. Without it, a hack could mean losing everything — your content, your settings, your customizations. I've had clients come to me in tears because their site was hacked and they had no backup. Don't be that person. Set up <a href="/wordpress-backup-guide/">automated backups</a> today. Right now. Before you forget. For the full list of security plugins and tools I rely on, see our <a href="/tools">recommended toolkit</a>.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is WordPress secure?</h3>
<p>Yes, WordPress core is very secure. It has a dedicated security team and receives regular patches. The vast majority of hacks target outdated plugins, weak passwords, and poor hosting — not WordPress itself. If you keep everything updated, use strong passwords, and follow basic security practices, WordPress is as secure as any other platform. The reason WordPress gets a reputation for being "insecure" is simply because it powers 43% of the web, making it the biggest target.</p>

<h3>Do I need a security plugin?</h3>
<p>Strictly speaking, no — you could handle everything manually with server configuration, .htaccess rules, and careful monitoring. But practically, yes, a security plugin makes everything dramatically easier. Wordfence free gives you a firewall, malware scanner, login protection, and two-factor authentication in one package. Trying to replicate all of that manually would take hours of configuration and ongoing maintenance. For 99% of people, a good security plugin is the smart choice.</p>

<h3>What should I do if my WordPress site gets hacked?</h3>
<p>Don't panic — I know that's easy to say and hard to do, but panicking leads to mistakes. First, take your site offline or put it in maintenance mode to prevent further damage. Second, change all passwords immediately: WordPress admin, hosting account, FTP, database. Third, scan for malware using Wordfence or Sucuri SiteCheck. Fourth, restore from a clean backup if you have one. If you don't have a backup, you'll need to manually clean the infection — check my <a href="/remove-malware-wordpress/">malware removal guide</a> for step-by-step instructions. Finally, figure out how the hack happened and fix the vulnerability so it doesn't happen again.</p>

<h3>How often should I update WordPress and plugins?</h3>
<p>I check for updates at least once a week. For WordPress minor releases (like 6.4.1 to 6.4.2), I enable auto-updates because these are security patches. For major releases (like 6.4 to 6.5), I wait 3-5 days to see if any compatibility issues surface, then update after taking a backup. For plugins, I update weekly — always after confirming I have a fresh backup. The sweet spot is being prompt without being reckless.</p>

<h3>Is free hosting secure enough for WordPress?</h3>
<p>Honestly, no. Free hosting typically means shared resources with minimal security measures, no server-level firewalls, outdated PHP versions, and zero support when something goes wrong. You don't need expensive hosting — $3-5/month from a reputable provider like Hostinger or SiteGround gives you server-level security, free SSL, automatic backups, and proper account isolation. That's a tiny investment to protect your site. I wrote a full breakdown of what to look for in my <a href="/how-to-choose-wordpress-hosting/">hosting guide</a>.</p>
`;

// ─────────────────────────────────────────────
// Article 2: How to Set Up SSL/HTTPS on WordPress
// ─────────────────────────────────────────────

export const seedSetupSSL = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "setup-ssl-wordpress";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-security"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-security' not found. Seed the security cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-security':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "How to Set Up SSL/HTTPS on WordPress (Free & Easy)",
      excerpt:
        "SSL used to be optional. It's not anymore — Google penalizes sites without it, and Chrome slaps a 'Not Secure' warning on every page. The good news? It's free and takes about 10 minutes. Here's exactly how to set it up, plus how to fix the mixed content issues that trip up almost everyone.",
      content: setupSSLContent,
      category: "security",
      tags: [
        "ssl",
        "https",
        "wordpress ssl",
        "lets encrypt",
        "really simple ssl",
        "cloudflare ssl",
        "mixed content",
        "website security",
      ],
      seoTitle:
        "How to Set Up SSL/HTTPS on WordPress (Free — 2026 Guide)",
      seoDescription:
        "Set up free SSL on WordPress in 10 minutes. Three methods: hosting provider SSL, Cloudflare, and Let's Encrypt. Plus how to fix mixed content warnings.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing SSL guide:", existing._id);
      return {
        message: "Updated existing SSL guide",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new SSL guide:", postId);
      return {
        message: "Created new SSL guide",
        id: postId,
      };
    }
  },
});

const setupSSLContent = `
<p>Back in 2015, I had a client call me in a panic because his website suddenly had a big red "Not Secure" warning in the browser bar. He thought he'd been hacked. He hadn't — Google Chrome had just started flagging sites without SSL certificates, and his site was one of millions that got caught out. I spent 20 minutes setting up a free SSL certificate and another 10 fixing mixed content issues. Total cost: $0. His stress level before the call: approximately infinite.</p>

<p>The point of that story is this: SSL isn't optional anymore, and it hasn't been for years. Google uses HTTPS as a ranking factor (it's minor, but it's real). Chrome, Firefox, and Safari all show security warnings on non-HTTPS pages. And beyond SEO and browser warnings, SSL encrypts the data traveling between your visitors and your server — which means passwords, credit card numbers, and personal information can't be intercepted in transit. Every WordPress site needs SSL. Full stop.</p>

<p>The good news is that SSL is free in 2026. You have multiple ways to set it up, and none of them require technical expertise. In this guide, I'll walk you through three methods — from easiest to most technical — and then show you how to fix the mixed content issues that almost everyone runs into afterward.</p>

<h2>What Is SSL and Why Every Site Needs It</h2>

<p>SSL (Secure Sockets Layer) — technically its modern version is called TLS (Transport Layer Security), but everyone still says SSL — creates an encrypted connection between your visitor's browser and your web server. When SSL is active, your site URL changes from <code>http://</code> to <code>https://</code>, and browsers show a padlock icon in the address bar. Without it, any data your visitors enter — login credentials, contact form messages, payment details — travels across the internet as plain text that anyone on the same network could theoretically intercept.</p>

<p>Beyond the security benefits, SSL directly impacts your site in three practical ways. First, <strong>Google confirmed that HTTPS is a ranking signal</strong> back in 2014, and it's become increasingly important since. You won't jump 10 positions just by adding SSL, but all else being equal, the HTTPS version of a page will outrank the HTTP version. Second, <strong>browsers actively warn visitors</strong> about non-HTTPS sites. Chrome shows "Not Secure" in the address bar, which tanks your credibility and conversion rate. Third, <strong>many modern WordPress features require HTTPS</strong>, including service workers, HTTP/2, and the latest APIs. Running without SSL in 2026 is like running a shop with the door wide open — technically you can do it, but why would you?</p>

<h2>Method 1: Free SSL From Your Hosting Provider (Easiest)</h2>

<p>This is the method I recommend for 90% of people because it's the fastest and requires zero technical knowledge. Almost every reputable hosting provider now includes free SSL certificates as part of their standard plans. They handle the installation, renewal, and configuration — you just need to flip a switch.</p>

<h3>SiteGround</h3>

<p>SiteGround includes free Let's Encrypt SSL on all plans and actually enables it automatically for new sites. If yours isn't active for some reason, log into your SiteGround dashboard, go to <strong>Websites &gt; Site Tools &gt; Security &gt; SSL Manager</strong>. Select your domain from the dropdown, choose <strong>Let's Encrypt</strong> as the SSL type, and click <strong>Get</strong>. It activates within a few minutes. Then toggle the <strong>HTTPS Enforce</strong> option to make sure all traffic gets redirected from HTTP to HTTPS. SiteGround will automatically renew the certificate every 90 days — you never have to think about it again.</p>

<h3>Hostinger</h3>

<p>Hostinger also includes free SSL on all their hosting plans. From your Hostinger dashboard, go to <strong>Websites &gt; Manage &gt; Security &gt; SSL</strong>. You'll see an option to install a free SSL certificate. Click <strong>Install SSL</strong>, wait a minute or two for it to activate, and you're done. Like SiteGround, Hostinger handles automatic renewal. If you're starting fresh and haven't picked a host yet, I compare the best options in my <a href="/how-to-choose-wordpress-hosting/">WordPress hosting guide</a>.</p>

<h3>Bluehost</h3>

<p>Bluehost has a slightly more buried process, which is my one annoyance with them. Log into your Bluehost dashboard, click <strong>My Sites</strong>, then select <strong>Manage Site</strong> for the site you want to secure. Go to the <strong>Security</strong> tab and toggle the <strong>Free SSL Certificate</strong> switch to ON. It can take up to 24 hours to fully propagate, though in my experience it's usually done within an hour. If the toggle isn't appearing, contact Bluehost support — sometimes it needs to be enabled on their end first, especially on legacy plans.</p>

<p><strong>Pro tip:</strong> After enabling SSL through your host, go to <strong>WordPress Dashboard &gt; Settings &gt; General</strong> and make sure both your "WordPress Address (URL)" and "Site Address (URL)" fields start with <code>https://</code> instead of <code>http://</code>. This is a step that a surprising number of tutorials skip, and skipping it causes all sorts of redirect loops and mixed content headaches.</p>

<h2>Method 2: Cloudflare Free SSL</h2>

<p>If your host doesn't include free SSL, or if you want the additional performance and security benefits of a CDN, Cloudflare's free plan includes SSL. This is also a great option if you're already using Cloudflare for DNS or caching — which I recommend regardless, since their free tier is genuinely excellent.</p>

<img src="/screenshots/cloudflare-ssl.webp" alt="Cloudflare SSL page showing free SSL/TLS certificates with features for protecting users and data" />

<p>That's Cloudflare's SSL page — free TLS certificates with automatic renewal and zero configuration on your server. Their free plan also gives you a CDN, DDoS protection, and basic firewall rules. It's an absurd amount of value for $0.</p>

<p>Here's how to set it up. First, create a free Cloudflare account at cloudflare.com and add your domain. Cloudflare will scan your existing DNS records and ask you to update your domain's nameservers to point to Cloudflare's nameservers — this is how Cloudflare sits between your visitors and your server. Once your nameservers are updated (this can take a few hours to propagate), go to <strong>SSL/TLS</strong> in your Cloudflare dashboard and set the encryption mode to <strong>Full (Strict)</strong> if your origin server already has an SSL certificate, or <strong>Flexible</strong> if it doesn't. I strongly recommend Full (Strict) when possible, as Flexible mode means the connection between Cloudflare and your server is unencrypted — which is better than nothing but not ideal.</p>

<p>Then enable <strong>Always Use HTTPS</strong> under <strong>SSL/TLS &gt; Edge Certificates</strong> to automatically redirect all HTTP requests to HTTPS. Finally, turn on <strong>Automatic HTTPS Rewrites</strong> to fix mixed content issues at the Cloudflare level. If you're setting up Cloudflare for the first time, I have a full walkthrough in my <a href="/setup-cloudflare-cdn-wordpress/">Cloudflare CDN setup guide</a>.</p>

<h2>Method 3: Let's Encrypt Manual Install (VPS Users)</h2>

<p>If you're running WordPress on a VPS (DigitalOcean, Linode, Vultr, Hetzner) without a control panel, you'll need to install the SSL certificate yourself using Certbot — the official Let's Encrypt client. This is the most technical method, but it's still straightforward if you're comfortable with the command line.</p>

<img src="/screenshots/letsencrypt-homepage.webp" alt="Let's Encrypt homepage showing their mission to provide free TLS certificates to more than 700 million websites" />

<p>Let's Encrypt is a nonprofit certificate authority that has issued free TLS certificates to over 700 million websites. It's the backbone of free SSL on the internet, and it's what most hosting providers use behind the scenes for their "free SSL" offerings.</p>

<p>SSH into your server and install Certbot. On Ubuntu/Debian, run: <code>sudo apt update && sudo apt install certbot python3-certbot-nginx</code> (replace <code>nginx</code> with <code>apache</code> if you're using Apache). Then run <code>sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com</code> and follow the prompts. Certbot will automatically configure your web server to use the new certificate and set up a cron job for automatic renewal every 90 days. Test the renewal with <code>sudo certbot renew --dry-run</code> to make sure it works.</p>

<p><strong>Important:</strong> If you're on a VPS and not comfortable with command-line server management, I'd recommend either using a control panel like RunCloud or Ploi (which handle SSL automatically), or switching to managed hosting where the provider handles this for you. There's no shame in letting experts handle server security — it's what they're paid to do.</p>

<h2>Fixing Mixed Content After Enabling SSL</h2>

<p>This is the part that trips up almost everyone, and it's the #1 reason people think their SSL "isn't working" after installation. Mixed content happens when your site loads over HTTPS but some resources — images, scripts, stylesheets — are still being loaded over HTTP. Browsers flag this as insecure, and you'll see a warning instead of a clean padlock.</p>

<p>The most common cause is hardcoded HTTP URLs in your content. Maybe you inserted images years ago when your site was still on HTTP, or a plugin is enqueuing scripts with <code>http://</code> prefixes. The simplest fix is to install the <strong>Really Simple Security</strong> plugin (formerly Really Simple SSL).</p>

<img src="/screenshots/really-simple-ssl-plugin.webp" alt="Really Simple Security plugin on WordPress.org showing SSL enforcement, hardening, and vulnerability detection features" />

<p>Really Simple Security has over 5 million active installations, and it's earned that popularity because it genuinely works. Install it, activate it, and it will automatically detect your SSL certificate, update your WordPress URLs, and fix mixed content issues by rewriting HTTP URLs to HTTPS on the fly. For most sites, this is all you need to do. One click, problem solved.</p>

<p>If you prefer not to add another plugin (which I respect — every plugin adds overhead), you can fix mixed content manually. The best approach is to use the <strong>Better Search Replace</strong> plugin to do a find-and-replace in your database: search for <code>http://yourdomain.com</code> and replace with <code>https://yourdomain.com</code>. Run a dry run first to see how many replacements it'll make, then execute it for real. After that, deactivate and delete Better Search Replace — it's a utility plugin you only need once. Also check your theme's settings and any hardcoded URLs in widgets, custom CSS, or header/footer scripts.</p>

<p><strong>Warning:</strong> Before running any database find-and-replace, take a backup. I've seen people accidentally replace URLs in serialized data and break their entire site. Better Search Replace handles serialized data correctly, but backups are non-negotiable. Check my <a href="/wordpress-backup-guide/">backup guide</a> if you don't have a backup system in place.</p>

<h2>Verifying Your SSL Is Working Correctly</h2>

<p>After setting up SSL and fixing mixed content, you want to verify everything is actually working. Here's my three-step verification process that I run on every site.</p>

<p><strong>Step 1: Check the padlock.</strong> Visit your site in Chrome (or any browser) and look at the address bar. You should see a padlock icon next to your URL. Click it — it should say "Connection is secure." If you see a warning triangle or "Not Secure" text, you still have mixed content issues. Open your browser's developer tools (F12), go to the Console tab, and look for mixed content warnings. They'll tell you exactly which resources are still loading over HTTP.</p>

<p><strong>Step 2: Run an SSL Labs test.</strong> Go to <a href="https://www.ssllabs.com/ssltest/" target="_blank" rel="noopener">SSL Labs</a> and enter your domain. It runs a comprehensive test of your SSL configuration and gives you a grade from A+ to F. You want at least an A. If you get a B or lower, the report will tell you what needs fixing — usually it's about enabling HSTS or disabling outdated TLS versions. Most hosting providers score an A or A+ out of the box.</p>

<p><strong>Step 3: Test the redirect.</strong> Type <code>http://yourdomain.com</code> (without the S) into your browser. It should automatically redirect to <code>https://yourdomain.com</code>. If it doesn't redirect, your HTTP-to-HTTPS redirect isn't configured. Your hosting provider's SSL settings usually have a toggle for this, or you can add a redirect rule to your .htaccess file. If you're using Cloudflare, enable "Always Use HTTPS" in the dashboard.</p>

<p>Once all three checks pass, you're done. Your site is serving over a secure encrypted connection, search engines will reward you for it, and your visitors won't see any scary warnings. The whole process — from enabling SSL to verifying it — should take about 10-15 minutes for most sites.</p>

<h2>Frequently Asked Questions</h2>

<h3>Does SSL slow down my website?</h3>
<p>No — in fact, SSL can make your site faster. HTTPS is required for HTTP/2, which is a major performance improvement over HTTP/1.1 thanks to multiplexing, header compression, and server push. The encryption overhead is negligible on modern hardware. I've benchmarked dozens of sites before and after enabling SSL, and the performance difference is either undetectable or slightly faster with HTTPS. This is a myth from the early 2000s that refuses to die.</p>

<h3>Do I need to buy an SSL certificate?</h3>
<p>No. Free SSL certificates from Let's Encrypt (which is what most hosts provide) are functionally identical to paid certificates for the vast majority of websites. Paid certificates (like those from DigiCert or Comodo) are only necessary if you need Organization Validation (OV) or Extended Validation (EV) certificates — which is relevant for banks and large enterprises, not WordPress blogs or small business sites. Save your money.</p>

<h3>Will switching to HTTPS affect my SEO rankings?</h3>
<p>Switching to HTTPS is a net positive for SEO. Google has confirmed HTTPS as a ranking signal, and sites without it are at a disadvantage. The key is to set up proper 301 redirects from HTTP to HTTPS so you don't lose link equity. If you use the methods in this guide, the redirects are handled automatically. I've migrated dozens of sites to HTTPS and never seen a negative impact on rankings — only neutral or slightly positive.</p>

<h3>My host says SSL is included, but my site still shows "Not Secure" — what's wrong?</h3>
<p>This almost always means the SSL certificate is installed on the server, but your WordPress site is still configured to use HTTP URLs. Go to <strong>Settings &gt; General</strong> in your WordPress dashboard and make sure both URL fields start with <code>https://</code>. If they already do, you likely have mixed content issues — some resources (images, scripts, fonts) are still loading over HTTP. Install Really Simple Security to fix this automatically, or use Better Search Replace to update your database URLs as I described above. If the certificate genuinely isn't installed, contact your host's support team — they'll enable it in a few minutes.</p>
`;

// ─────────────────────────────────────────────
// Article 3: Best WordPress Firewall Plugins
// ─────────────────────────────────────────────

export const seedFirewallPlugins = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "best-wordpress-firewall-plugins";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-security"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-security' not found. Seed the security cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-security':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "Best WordPress Firewall Plugins in 2026 (Compared)",
      excerpt:
        "A web application firewall is your site's first line of defense against hackers, bots, and automated attacks. After testing dozens of firewall solutions over the years, I've narrowed it down to 5 that actually work. Here's how they compare — and which one I recommend for different situations.",
      content: firewallPluginsContent,
      category: "security",
      tags: [
        "wordpress firewall",
        "waf",
        "wordfence",
        "sucuri",
        "cloudflare waf",
        "ninjafirewall",
        "shield security",
        "website security",
      ],
      seoTitle:
        "Best WordPress Firewall Plugins in 2026 (5 Compared)",
      seoDescription:
        "Compare the 5 best WordPress firewall plugins: Wordfence, Sucuri, Cloudflare WAF, NinjaFirewall, and Shield Security. Free and paid options with honest recommendations.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing firewall plugins article:", existing._id);
      return {
        message: "Updated existing firewall plugins article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new firewall plugins article:", postId);
      return {
        message: "Created new firewall plugins article",
        id: postId,
      };
    }
  },
});

const firewallPluginsContent = `
<p>A few years ago, I set up a fresh WordPress site on a new domain and didn't bother installing any security measures — I figured I'd get to it later since the site had no traffic and no content yet. Within 48 hours, my server access logs showed over 3,000 brute force login attempts and dozens of probes looking for known plugin vulnerabilities. The site had zero visitors, zero backlinks, and zero Google presence — but the bots found it anyway. That's the reality of running a WordPress site in 2026: automated attacks start hitting your site almost immediately, and without a firewall, every single one of those requests reaches your server and gets processed by WordPress.</p>

<p>A web application firewall (WAF) sits between incoming traffic and your WordPress installation, analyzing every request and blocking anything that looks malicious before it reaches your site. As I explain in my <a href="/best-security-plugins">best security plugins</a> roundup, a WAF is your first line of defense against the overwhelming majority of WordPress attacks — brute force attempts, SQL injection, cross-site scripting (XSS), file inclusion exploits, and all the other automated garbage that bots throw at WordPress sites around the clock. In this guide, I'm comparing the five firewall solutions I've actually used and tested, with honest opinions about what each one does well and where it falls short.</p>

<h2>DNS-Level vs. Application-Level Firewalls: What's the Difference?</h2>

<p>Before diving into the plugins, you need to understand the two types of WordPress firewalls, because this distinction matters more than most people realize. An <strong>application-level firewall</strong> (also called an endpoint firewall) is a WordPress plugin that runs on your server. It loads alongside WordPress and inspects every request after it reaches your server but before WordPress processes it. Wordfence and NinjaFirewall are application-level firewalls. The advantage is that they can do deep inspection of WordPress-specific requests. The disadvantage is that malicious traffic still hits your server and consumes resources.</p>

<p>A <strong>DNS-level firewall</strong> (also called a cloud-based or reverse proxy firewall) sits between your visitors and your server, filtering traffic before it ever reaches your hosting. Cloudflare WAF and Sucuri Firewall are DNS-level firewalls. You point your domain's DNS to their servers, and they proxy all traffic, blocking the bad stuff and only forwarding legitimate requests to your origin server. The advantage is that attack traffic never touches your server, which means better performance under attack and lower server resource usage. The disadvantage is that DNS-level firewalls have less visibility into WordPress-specific logic, and the good ones tend to cost more.</p>

<p>In my experience, application-level firewalls are the right choice for most WordPress sites because they're easier to set up, cheaper (or free), and provide excellent protection. DNS-level firewalls become worthwhile when you're dealing with high traffic, DDoS attacks, or when you're managing multiple client sites and need centralized protection.</p>

<h2>Firewall Comparison Table</h2>

<table>
<thead>
<tr>
<th>Plugin</th>
<th>Firewall Type</th>
<th>Free Version</th>
<th>Premium Price</th>
<th>Brute Force Protection</th>
<th>Real-Time IP Blocking</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Wordfence</strong></td>
<td>Application-level</td>
<td>Yes (excellent)</td>
<td>$149/year</td>
<td>Yes</td>
<td>Premium only (30-day delay on free)</td>
</tr>
<tr>
<td><strong>Sucuri Firewall</strong></td>
<td>DNS-level (cloud)</td>
<td>Scanner only (no WAF)</td>
<td>$229/year</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Cloudflare WAF</strong></td>
<td>DNS-level (cloud)</td>
<td>Yes (basic rules)</td>
<td>$25/month (Pro)</td>
<td>Yes (via rules)</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>NinjaFirewall</strong></td>
<td>Application-level</td>
<td>Yes (solid)</td>
<td>$69/year</td>
<td>Yes</td>
<td>Yes (free)</td>
</tr>
<tr>
<td><strong>Shield Security</strong></td>
<td>Application-level</td>
<td>Yes (good)</td>
<td>$99/year</td>
<td>Yes</td>
<td>Yes (premium)</td>
</tr>
</tbody>
</table>

<h2>1. Wordfence — The Best Free Firewall for Most Sites</h2>

<img src="/screenshots/wordfence-firewall.webp" alt="Wordfence Security plugin page on WordPress.org showing firewall, malware scanning, and login security" />

<p>Wordfence is the security plugin I install on virtually every WordPress site I build, and its firewall is the primary reason why. With over 5 million active installations, it's the most popular WordPress security plugin by a massive margin — and that popularity feeds directly into its effectiveness, because Wordfence uses data from its entire network to identify and block emerging threats.</p>

<p>The free version includes a fully functional web application firewall that blocks SQL injection, XSS, file inclusion, and directory traversal attacks. It also includes brute force login protection with rate limiting and IP blocking (for more on protecting your login page, see our <a href="/wordpress-login-security">WordPress login security guide</a>), a malware scanner that compares your WordPress files against known-clean versions, and two-factor authentication. The main limitation of the free version is that firewall rules are delayed by 30 days compared to premium — meaning when a new vulnerability is discovered, premium users get the protective rule immediately while free users get it a month later. For most sites, that 30-day delay is an acceptable trade-off for a $0 price tag.</p>

<p>Wordfence Premium ($149/year) adds real-time firewall rules, country-based blocking, real-time IP blocklist, and premium support. I run it on all my client sites and it's worth every penny for the real-time threat intelligence alone. But honestly, the free version is so good that I recommend it to anyone who asks me about WordPress security. It's the single best value in the WordPress security space.</p>

<p><strong>Best for:</strong> Everyone. Seriously. Unless you have a specific reason to use something else, start with Wordfence free. You can always upgrade later.</p>

<h2>2. Sucuri Firewall — Best Cloud-Based WAF for High-Traffic Sites</h2>

<p>Sucuri takes a fundamentally different approach from Wordfence. Instead of running on your server, Sucuri's firewall operates as a cloud-based reverse proxy. You change your DNS to point to Sucuri's servers, and all traffic passes through their network before reaching your hosting. Malicious requests get blocked at the Sucuri level, which means they never consume your server's resources. This is a significant advantage when you're dealing with DDoS attacks or massive bot traffic — your server doesn't even know the attacks are happening.</p>

<p>The catch is that Sucuri's free plugin only includes a remote malware scanner — the actual firewall is a paid product starting at $229/year (which includes malware cleanup if you do get hacked). That's a meaningful price increase over Wordfence, and for most small-to-medium WordPress sites, it's hard to justify. Where Sucuri earns its price tag is on high-traffic sites, sites that are frequently targeted by DDoS attacks, or agency environments where you need centralized security management across multiple domains.</p>

<p>I've used Sucuri on a handful of client sites that were experiencing persistent attacks — one was a political blog that was getting DDoSed weekly, another was an e-commerce site that attracted a lot of scraping bots. In both cases, Sucuri handled the attacks seamlessly without the origin server breaking a sweat. The dashboard is clean, the CDN included with the firewall plan is decent, and the malware cleanup guarantee provides peace of mind. But for my personal sites and smaller client projects, Wordfence free does everything I need.</p>

<p><strong>Best for:</strong> High-traffic sites, sites under frequent attack, and agencies managing multiple client sites who need a centralized cloud-based solution.</p>

<h2>3. Cloudflare WAF — Best for Combined CDN + Firewall</h2>

<p>If you're already using Cloudflare for DNS and CDN (which I recommend — their free plan is incredible), you get some basic firewall protection included at no extra cost. The free Cloudflare plan includes rate limiting, bot fight mode, and the ability to create up to 5 custom firewall rules. These rules are surprisingly powerful — you can block by country, IP range, user agent, URI path, or any combination of these. I use Cloudflare's free firewall rules on every site I manage, even alongside Wordfence, because they operate at the DNS level and block traffic before it reaches my server.</p>

<p>The Cloudflare Pro plan ($25/month) adds the real WAF with managed rulesets — including OWASP core rules and Cloudflare's own threat intelligence. This is where Cloudflare's firewall gets genuinely serious. The Pro WAF includes protection against the OWASP Top 10 vulnerabilities, automatic threat scoring, and managed rules that update automatically as new threats emerge. For $25/month, it's actually cheaper than Sucuri and includes a much better CDN.</p>

<p>The main limitation is that Cloudflare's WAF isn't WordPress-specific the way Wordfence or Sucuri are. It doesn't understand WordPress at an application level — it's a general-purpose WAF that happens to work well with WordPress. You won't get WordPress-specific malware scanning or file integrity checks from Cloudflare. That's why I recommend running Cloudflare alongside Wordfence rather than as a replacement — Cloudflare handles the network-level protection while Wordfence handles the WordPress-specific stuff. It's a powerful combination.</p>

<p><strong>Best for:</strong> Anyone already using Cloudflare who wants DNS-level protection without paying Sucuri prices. The free tier adds meaningful protection; the Pro plan is a genuine enterprise-grade WAF at a reasonable price.</p>

<h2>4. NinjaFirewall — The Lightweight Power User Choice</h2>

<p>NinjaFirewall is the security plugin I recommend to people who want serious protection without the resource overhead of Wordfence. While Wordfence is a full security suite — firewall, scanner, login protection, 2FA, all in one — NinjaFirewall focuses specifically on being an excellent firewall and does so with remarkably low resource usage. It loads before WordPress and most other plugins, which means it can block malicious requests earlier in the request lifecycle.</p>

<p>The free version includes a solid WAF with auto-updating security rules, brute force protection, real-time IP blocking (something Wordfence reserves for premium), file integrity monitoring, and detailed logging. It also includes protection against file upload vulnerabilities and PHP backdoors, which are among the most common attack vectors in the WordPress ecosystem. The admin interface is more technical than Wordfence — it's clearly built for people who understand what firewall rules actually do — but the default configuration is excellent and works great out of the box.</p>

<p>NinjaFirewall Pro ($69/year) adds web-based file editor detection, centralized logging, and some additional rule sets. At $69/year versus Wordfence's $149/year, it's notably cheaper for a premium license. The trade-off is that you don't get a malware scanner or two-factor authentication — NinjaFirewall is strictly a firewall plugin. If you want those features, you'll need to pair it with separate plugins for scanning (like Sucuri's free scanner) and 2FA (like WP 2FA).</p>

<p><strong>Best for:</strong> Performance-conscious users who want a dedicated, lightweight firewall without the overhead of a full security suite. Pairs well with other specialized security tools.</p>

<h2>5. Shield Security — The Balanced Middle Ground</h2>

<p>Shield Security (formerly WordPress Simple Firewall) occupies an interesting middle ground between Wordfence's comprehensive-but-heavy approach and NinjaFirewall's focused-but-minimal approach. It includes a firewall, login protection, bot detection, comment spam filtering, and user session management. The unique selling point is its "Security Admin" feature, which prevents other administrators from disabling security settings — useful if you're a developer managing a site for a client who has a habit of "fixing" things they shouldn't touch.</p>

<p>The free version is genuinely capable. It includes the firewall with automatic IP blocking, brute force protection, two-factor authentication, login cooldown periods, and a basic audit log. The bot detection system is particularly clever — it analyzes user behavior patterns to distinguish legitimate visitors from bots, rather than relying solely on IP reputation. In my testing, it caught several automated attacks that purely IP-based systems missed.</p>

<p>Shield Security Pro ($99/year) adds traffic rate limiting, advanced bot blocking, import/export of settings across sites, and priority support. It's priced between NinjaFirewall Pro and Wordfence Premium, which feels about right for what you get. My main criticism of Shield Security is that the interface can be overwhelming — there are a lot of settings pages, and the plugin occasionally feels like it's trying to do too many things. Wordfence's interface is cleaner and more intuitive, despite being equally feature-rich.</p>

<p><strong>Best for:</strong> Developers and agencies who want a full security suite at a lower price point than Wordfence Premium, especially if the Security Admin feature is important for managing client sites.</p>

<h2>My Recommendation</h2>

<p>Here's my honest, no-nonsense recommendation after years of testing and deploying these firewalls across dozens of sites.</p>

<p><strong>For most WordPress sites:</strong> Install <strong>Wordfence free</strong>. It's the best overall security solution at any price, and it happens to be free. The firewall is excellent, the malware scanner catches real threats, and the brute force protection works out of the box. You'll be more secure than 90% of WordPress sites with zero investment. If you want real-time threat intelligence and the peace of mind that comes with it, upgrade to Wordfence Premium — it's $149/year well spent.</p>

<p><strong>For high-traffic or frequently attacked sites:</strong> Use <strong>Cloudflare Pro + Wordfence free</strong>. This gives you DNS-level protection (blocking attacks before they reach your server) plus WordPress-specific protection on the endpoint. It costs $25/month for Cloudflare Pro, which is less than Sucuri and includes a world-class CDN. If budget allows or you're managing multiple sites, Sucuri Firewall is also excellent in this role.</p>

<p><strong>For performance-obsessed users:</strong> Try <strong>NinjaFirewall</strong>. It's the lightest firewall plugin I've tested, and the free version includes features (like real-time IP blocking) that Wordfence charges for. You'll need separate plugins for malware scanning and 2FA, but if keeping your site fast is the priority, NinjaFirewall is the way to go.</p>

<p>Whatever you choose, the most important thing is to actually install and configure a firewall. An imperfect firewall that's actually running is infinitely better than a "perfect" security setup that you keep meaning to get around to. A firewall pairs well with <a href="/setup-ssl-wordpress">a properly configured SSL certificate</a> to form your site's core defense layer. Pick one from this list, install it today, and move on to the other items in my <a href="/wordpress-security-complete-guide/">WordPress security checklist</a>. Your future self will thank you the first time you check your firewall logs and see thousands of blocked attacks that would have otherwise hit your site directly.</p>

<h2>Frequently Asked Questions</h2>

<h3>Can I use two firewall plugins at the same time?</h3>
<p>No — running two application-level firewalls (like Wordfence and NinjaFirewall simultaneously) will cause conflicts, false positives, and performance issues. Pick one and stick with it. The exception is combining an application-level firewall with a DNS-level service — for example, Wordfence plus Cloudflare works great because they operate at different layers. Wordfence handles WordPress-specific protection while Cloudflare handles network-level filtering. Just don't run two plugins that both try to do the same thing on your server.</p>

<h3>Is a free firewall good enough, or do I need premium?</h3>
<p>For most WordPress sites — blogs, small business sites, portfolio sites, modest e-commerce stores — a free firewall is absolutely sufficient. Wordfence free and NinjaFirewall free both provide excellent protection against the vast majority of attacks. Premium versions add convenience features and real-time threat intelligence, which are valuable but not essential. The 30-day rule delay on Wordfence free, for example, means you're slightly more vulnerable to brand-new exploits, but the odds of being targeted by a zero-day are much lower than being targeted by a known exploit that the free version already blocks.</p>

<h3>Will a firewall plugin slow down my site?</h3>
<p>Application-level firewalls do add some overhead because they process every request on your server. In my benchmarks, Wordfence adds about 20-50ms to the time-to-first-byte (TTFB) on a typical WordPress site. NinjaFirewall is lighter at roughly 10-30ms. For context, most visitors won't notice anything under 100ms, and the security benefit vastly outweighs a 30ms delay. DNS-level firewalls like Cloudflare and Sucuri have zero impact on your server performance — in fact, they typically improve it because their CDN caches your content closer to visitors. If performance is your top concern, NinjaFirewall or Cloudflare's free tier are the lightest options.</p>

<h3>Do I need a firewall if my hosting provider has one?</h3>
<p>Good hosting providers (like SiteGround, Cloudways, and Kinsta) include server-level firewalls that provide basic protection. However, these are general-purpose firewalls — they block common network attacks but don't understand WordPress-specific vulnerabilities. A WordPress-specific WAF like Wordfence adds a layer of protection that's tailored to the WordPress ecosystem: it knows about vulnerable plugin versions, WordPress-specific attack patterns, and common wp-admin exploits. Think of your host's firewall as the lock on your front door and a WordPress WAF as the security system inside the house. Both serve different purposes, and you want both.</p>
`;
