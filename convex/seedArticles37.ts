import { internalMutation } from "./_generated/server";

// ============================================================
// Article 1: How to Remove Malware from WordPress
// ============================================================

export const seedRemoveMalware = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "remove-malware-wordpress";

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

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Remove Malware from WordPress (Emergency Step-by-Step Guide)",
      excerpt:
        "Your WordPress site got hacked — don't panic. I've cleaned malware from more sites than I can count over the past 20 years, and most infections can be fixed in an afternoon. Here's exactly what to do, step by step.",
      content: removeMalwareContent,
      category: "security",
      tags: [
        "malware removal",
        "wordpress hacked",
        "wordpress security",
        "wordfence",
        "sucuri",
        "malcare",
        "site cleanup",
        "malware scan",
      ],
      seoTitle: "How to Remove Malware from WordPress (2026 Emergency Guide)",
      seoDescription:
        "WordPress site hacked? Don't panic. Step-by-step guide to finding and removing malware, restoring your site, and preventing future infections. Tested on hundreds of sites.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing malware removal article:", existing._id);
      return {
        message: "Updated existing malware removal article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new malware removal article:", postId);
      return {
        message: "Created new malware removal article",
        id: postId,
      };
    }
  },
});

const removeMalwareContent = `
<p>Take a deep breath. I know you're probably reading this because something is very wrong with your WordPress site right now — maybe it's redirecting visitors to sketchy websites, maybe Google is showing a big red warning page, or maybe your hosting provider just suspended your account with a vague email about "malicious content detected." I've been there. Over the past 20 years of working with WordPress, I've cleaned malware from hundreds of sites, ranging from small personal blogs to WooCommerce stores processing thousands of orders a month. The vast majority of infections can be completely fixed, and your site can be back to normal within a few hours. The key is to stay calm, follow a systematic process, and not make any panicked decisions that could make things worse.</p>

<p>Here's the reality that nobody tells you when you're in crisis mode: most WordPress malware infections follow predictable patterns. Attackers use automated bots to scan for known vulnerabilities in outdated plugins, weak passwords, or misconfigured file permissions. They inject their code into specific files, create backdoors in specific directories, and modify specific database entries. Once you understand these patterns — and I'm going to walk you through all of them — removing malware becomes a methodical process rather than a terrifying mystery. Let's get your site clean.</p>

<h2>Signs Your WordPress Site Has Been Hacked</h2>

<p>Before you start removing anything, it's worth confirming that you're actually dealing with malware and not a different issue like a plugin conflict or a hosting problem. Here are the telltale signs I look for when a client contacts me in a panic, and most hacked sites exhibit at least two or three of these symptoms simultaneously.</p>

<p><strong>Unexpected redirects</strong> are the most common and most obvious symptom. Your visitors click a link to your site from Google and end up on a casino, pharmacy, or adult website instead. Sometimes the redirect only happens for search engine visitors (the malware checks the referrer header), so you might not notice it when visiting your own site directly. If someone reports this, check by Googling your site name and clicking the result. <strong>New admin users</strong> you didn't create are a dead giveaway — go to <strong>Users → All Users</strong> in your WordPress dashboard and look for any accounts you don't recognize, especially those with administrator privileges. I once found a site with 14 fake admin accounts, all created within the same hour at 3 AM.</p>

<p><strong>Modified core files</strong> often show up as strange PHP files in your root directory or in <code>wp-includes</code> with names like <code>wp-tmp.php</code>, <code>wp-feed.php</code>, or random strings of characters. <strong>Google Search Console warnings</strong> or a red "This site may be hacked" label in search results mean Google has already detected the infection — this is urgent because every day your site stays flagged, you're losing organic traffic and SEO authority. <strong>Slow performance</strong> can indicate that your server is being used for cryptocurrency mining or sending spam emails. And speaking of spam, if your hosting provider emails you about outgoing spam — that's malware using your site as a relay. Take all of these signs seriously; even one warrants a full investigation.</p>

<h2>Step-by-Step Malware Removal Process</h2>

<h3>Step 1: Put Your Site in Maintenance Mode</h3>

<p>First things first: stop the bleeding. You need to prevent visitors from seeing the hacked version of your site, and more importantly, prevent the malware from spreading to their browsers. If you can still access your WordPress dashboard, install and activate a maintenance mode plugin like <strong>SeedProd</strong> or <strong>WP Maintenance Mode</strong> and turn it on immediately. If you can't access the dashboard, ask your hosting provider to put up a maintenance page — most hosts can do this from their end within minutes. Some hosts, like SiteGround and Bluehost, have a "temporary disable" feature in the control panel that effectively takes your site offline while you work on it.</p>

<p><strong>Important:</strong> Do NOT delete your entire site at this point. I know it's tempting to just nuke everything and start over, but you need the infected files for analysis, and deleting them might remove evidence you need to find the entry point. If your hosting provider suspended your account, contact their support team and explain that you're actively working on cleaning the infection — they'll usually give you temporary access to your files and database while you work.</p>

<h3>Step 2: Scan Your Site for Malware</h3>

<p>Now you need to find exactly what's infected and where. I recommend running two different scanners because no single tool catches everything — they each have different detection signatures and methods. Start with <strong>Wordfence</strong> if you can access your WordPress dashboard. Install it from <strong>Plugins → Add New</strong>, activate it, and go to <strong>Wordfence → Scan</strong>. Click <strong>Start New Scan</strong> and let it run a full scan. Wordfence compares your WordPress core files, themes, and plugins against the official repository versions and flags any modifications. It also checks for known malware signatures, suspicious code patterns, and backdoors. The scan usually takes 5-15 minutes depending on your site size.</p>

<p>For an external scan, use <strong>Sucuri SiteCheck</strong> at <a href="https://sitecheck.sucuri.net/" target="_blank" rel="noopener">sitecheck.sucuri.net</a>. Enter your domain and it'll scan your site's frontend for malware, blacklisting status, website errors, and outdated software. SiteCheck is useful because it scans from the outside (like a visitor would see), so it catches redirect-based malware that might not show up in a server-side scan. Between Wordfence's deep file inspection and Sucuri's external analysis, you'll have a comprehensive picture of what you're dealing with. Make a note of every flagged file and issue — you'll need this list for the cleanup phase.</p>

<p><strong>Pro tip:</strong> If you can't install Wordfence because the dashboard is inaccessible, download your entire site via FTP/SFTP and scan the files locally with <a href="https://www.clamav.net/" target="_blank" rel="noopener">ClamAV</a> (free, open-source antivirus). It won't catch WordPress-specific threats as well as Wordfence, but it'll find the most common malware patterns.</p>

<h3>Step 3: Restore from a Clean Backup (If Available)</h3>

<p>If you have a recent backup from before the infection started, this is by far the fastest and most reliable path to a clean site. Restoring from backup eliminates all malicious files, database modifications, and backdoors in one step — it's like a factory reset for your WordPress installation. Check your hosting control panel for automatic backups (most managed hosts keep 7-30 days of daily backups), or check if you had a backup plugin like <strong>UpdraftPlus</strong> or <strong>BlogVault</strong> running. If you've been following <a href="/wordpress-backup-guide/">my WordPress backup guide</a>, you should have a clean copy available.</p>

<p>Here's the critical question: <strong>how do you know which backup is clean?</strong> You need to figure out approximately when the infection started. Check your scan results for file modification dates, look at when suspicious admin accounts were created, and review your access logs if your host provides them. Restore a backup from at least a few days before the earliest sign of compromise. After restoring, immediately update WordPress, all plugins, and all themes before doing anything else — the vulnerability that let the attacker in the first time is probably still there in the restored version.</p>

<p><strong>Warning:</strong> After restoring a backup, change ALL your passwords before making the site live again. The attacker may have captured your credentials, and restoring files doesn't change passwords. I'll cover this in detail in Step 5.</p>

<h3>Step 4: Manual Cleanup (If No Clean Backup Exists)</h3>

<p>No backup? Don't worry — I've cleaned plenty of sites manually, and while it takes longer, the results are just as good. Here's the systematic approach I use, in order of priority. Start by <strong>deleting any files flagged by your malware scan</strong>. Common locations for injected malware include the root directory (look for PHP files that shouldn't be there), <code>wp-includes</code> (WordPress never stores random PHP files here), and <code>wp-content/uploads</code> (PHP files in your uploads directory are almost always malicious — legitimate uploads are images, PDFs, and similar media files). If you find files with names like <code>wp-tmp.php</code>, <code>wp-vcd.php</code>, <code>class.theme-modules.php</code>, or anything with base64-encoded content, delete them immediately.</p>

<p>Next, <strong>reinstall WordPress core files</strong>. Download a fresh copy of your WordPress version from <a href="https://wordpress.org/download/" target="_blank" rel="noopener">wordpress.org</a>, extract it, and upload the <code>wp-admin</code> and <code>wp-includes</code> directories to your server, overwriting the existing files. This replaces any modified core files with clean originals. Do NOT overwrite <code>wp-config.php</code> or the <code>wp-content</code> directory — those contain your site's configuration and content respectively.</p>

<p>Now <strong>check wp-config.php carefully</strong>. Open it in a text editor and look for anything that doesn't belong. Legitimate wp-config.php contains database credentials, authentication keys, table prefix, and debug settings — nothing else. If you see any <code>eval()</code>, <code>base64_decode()</code>, <code>preg_replace</code> with the <code>/e</code> modifier, or <code>@include</code> statements pointing to strange files, remove those lines. While you're in there, regenerate your WordPress security keys by visiting the <a href="https://api.wordpress.org/secret-key/1.1/salt/" target="_blank" rel="noopener">WordPress salt generator</a> and replacing the existing keys in wp-config.php. This invalidates all existing login sessions, including any the attacker might be using. For more on securing this critical file, see my guide on <a href="/wordpress-file-permissions/">WordPress file permissions</a>.</p>

<p>Finally, <strong>check your database</strong>. Go to <strong>Users → All Users</strong> and delete any accounts you don't recognize. Then check your active theme's <code>functions.php</code> file — this is a favorite injection point because it runs on every page load. Look for encoded code blocks, <code>eval()</code> statements, or functions you didn't write. If your theme is from the WordPress repository or a reputable theme shop, download a fresh copy and compare the files. I also recommend checking <strong>Settings → General</strong> to make sure your site URL hasn't been changed, and <strong>Settings → Reading</strong> to verify your homepage settings are correct.</p>

<h3>Step 5: Change ALL Passwords</h3>

<p>This step is absolutely non-negotiable, and I mean <em>all</em> passwords. I've seen sites get reinfected within hours because the site owner only changed their WordPress password and forgot about FTP, database, or hosting panel credentials. Here's the complete list: your <strong>WordPress admin password</strong> (and force a password reset for all other WordPress user accounts while you're at it), your <strong>FTP/SFTP password</strong>, your <strong>database password</strong> (update it in wp-config.php after changing it in your hosting panel), your <strong>hosting control panel password</strong> (cPanel, Plesk, or whatever your host uses), and your <strong>email password</strong> for any accounts associated with the site. Use a password manager like <strong>Bitwarden</strong> or <strong>1Password</strong> to generate strong, unique passwords for each one — at least 16 characters with mixed case, numbers, and symbols.</p>

<p><strong>Pro tip:</strong> While changing passwords, check your <strong>FTP accounts</strong> in your hosting panel. Attackers sometimes create additional FTP accounts to maintain access even after you change the main password. Delete any FTP accounts you don't recognize. This is one of those details that 90% of malware removal guides skip, and it's the reason many sites get reinfected. For more password security practices, check out my <a href="/wordpress-login-security/">WordPress login security guide</a>.</p>

<h3>Step 6: Update Everything</h3>

<p>The malware got in through a vulnerability, and if you don't patch that vulnerability, you'll be right back where you started. Go to <strong>Dashboard → Updates</strong> and update everything: WordPress core, every plugin, and every theme. If you have any plugins or themes you're not actively using, delete them entirely — not just deactivate, <em>delete</em>. Inactive plugins and themes still have their files on your server, and if those files contain vulnerabilities, attackers can exploit them even though the plugin isn't active. I've seen sites hacked through themes that were installed but never activated.</p>

<p>After updating, review your plugin list with fresh eyes. Do you actually need every plugin that's installed? Every plugin is a potential attack surface. If a plugin hasn't been updated by its developer in over a year, consider replacing it with a maintained alternative. This is also a good time to install a <a href="/best-security-plugins/">proper security plugin</a> if you didn't have one before — it's the single most important thing you can do to prevent future infections.</p>

<h3>Step 7: Install a Security Plugin</h3>

<p>If you don't already have a security plugin running, install one immediately. At minimum, you need a Web Application Firewall (WAF), malware scanning, and login protection. I cover all the options in detail in my <a href="/best-security-plugins/">best WordPress security plugins</a> guide, but the short version is: <strong>Wordfence</strong> is my top free pick (you already have it installed if you used it for scanning), and <strong>Sucuri</strong> is my premium pick because of their cloud-based firewall. Enable the firewall, schedule automatic malware scans, and turn on login attempt limiting. This isn't optional — running WordPress without a security plugin in 2026 is like leaving your front door wide open.</p>

<img src="/screenshots/malcare-homepage.webp" alt="MalCare WordPress security plugin homepage showing features like automatic malware scanning, one-click removal, and real-time firewall protection" />

<p>Another excellent option is <strong>MalCare</strong>, which specializes in malware detection and offers one-click cleanup on their paid plans. If you've been through a malware nightmare and want the peace of mind that comes with knowing an expert service is constantly monitoring your site, MalCare is worth the investment. Their scanner runs on their own servers rather than yours, so it doesn't slow down your site — a common complaint with other security plugins. For a comprehensive approach to keeping your site secure going forward, follow my <a href="/wordpress-security-complete-guide/">complete WordPress security guide</a>.</p>

<h3>Step 8: Request a Google Review (If Your Site Was Flagged)</h3>

<p>If Google was showing a "This site may be hacked" or "This site may harm your computer" warning for your domain, you need to request a review after cleanup. Go to <a href="https://search.google.com/search-console" target="_blank" rel="noopener">Google Search Console</a> (you need to have your site verified — if you haven't done this yet, do it now). Navigate to <strong>Security & Manual Actions → Security issues</strong>. You should see the specific issues Google detected. Click <strong>Request Review</strong> and write a brief description of what happened and what you did to fix it. Be specific: mention that you removed malware, updated all software, changed all passwords, and installed security monitoring. Google typically reviews and lifts the warning within 1-3 business days, though I've seen it take up to a week during busy periods.</p>

<p><strong>Important:</strong> Don't request a review until you're absolutely certain the site is clean. If Google re-scans and still finds malware, the review process takes longer the second time, and repeated failed reviews can delay removal significantly. Run one more scan with Wordfence and Sucuri SiteCheck before submitting your request. Also check that your <a href="/wordpress-security-guide/">overall security setup</a> is solid so Google can see you've taken comprehensive measures.</p>

<h2>When to Hire a Professional</h2>

<p>Look, I'm all for DIY — this entire site is built on the premise that you can handle WordPress yourself. But there are situations where hiring a professional malware removal service is the smart call, and I'd be doing you a disservice if I didn't acknowledge that. If you've followed every step above and your site keeps getting reinfected, there's likely a well-hidden backdoor that you're missing. If you're running a business site or WooCommerce store and every hour of downtime is costing you real money, the $200-400 for professional cleanup pays for itself in avoided lost revenue. And if the thought of editing wp-config.php or connecting via SFTP makes you break into a cold sweat, there's no shame in calling in an expert.</p>

<p><strong>Sucuri</strong> offers a professional website cleanup service starting at $229/year, which includes malware removal, blacklist removal, and ongoing monitoring with their cloud-based firewall. It's the service I recommend most often because you're not just paying for a one-time cleanup — you get continuous protection for the entire year. <strong>MalCare</strong> offers one-click malware removal in their paid plans (starting at $149/year), and it's genuinely one-click — their system identifies and removes the malware automatically. For sites that are severely compromised or where manual cleanup hasn't worked, <strong>Wordfence</strong> also offers a professional site cleaning service. Whichever service you choose, make sure they also identify the entry point and patch the vulnerability, not just remove the malware symptoms.</p>

<h2>Prevent Future Infections</h2>

<p>Once your site is clean, the last thing you want is to go through this nightmare again. The good news is that preventing WordPress malware is much easier than removing it. Keep WordPress core, plugins, and themes updated at all times — enable auto-updates for minor releases and check for updates weekly. Use strong, unique passwords for every account and enable two-factor authentication on all admin accounts (see my <a href="/wordpress-login-security/">login security guide</a>). Install a reputable security plugin with a firewall and automated scanning. Set up regular automated backups so you always have a clean copy to restore from. And follow the complete hardening checklist in my <a href="/wordpress-security-complete-guide/">WordPress security guide</a> — it covers everything from <a href="/wordpress-file-permissions/">file permissions</a> to database security to HTTP headers.</p>

<p>The single best piece of advice I can give you: <strong>treat security as ongoing maintenance, not a one-time setup.</strong> The WordPress ecosystem moves fast, new vulnerabilities are discovered regularly, and attackers are constantly evolving their methods. Spending 15 minutes a week checking for updates, reviewing your security logs, and verifying your backups is infinitely easier than spending an entire weekend cleaning up a malware infection. Trust me — I've done both more times than I'd like to admit.</p>

<h2>Frequently Asked Questions</h2>

<h3>How much does it cost to remove malware from WordPress?</h3>

<p>You can do it yourself for free using the steps in this guide and free tools like Wordfence and Sucuri SiteCheck. If you prefer professional help, expect to pay between $149-400 depending on the service. Sucuri charges $229/year which includes cleanup plus ongoing protection, MalCare offers automated removal starting at $149/year, and Wordfence has a one-time cleanup service. For most site owners with moderate technical confidence, the DIY route works perfectly well — the malware patterns are well-documented and the tools are excellent.</p>

<h3>Will removing malware fix my Google rankings?</h3>

<p>Yes, but not instantly. Once you clean your site and Google lifts the security warning (typically 1-3 business days after requesting review), your rankings should start recovering. However, if your site was flagged for an extended period, some ranking positions may take weeks to fully recover because Google reduces crawl frequency for flagged sites. The sooner you fix the infection and request a review, the faster the recovery. In my experience, most sites return to their pre-hack rankings within 2-4 weeks after cleanup.</p>

<h3>Can malware spread from my WordPress site to visitors' computers?</h3>

<p>It depends on the type of malware. Simple redirect malware just sends visitors to another site, which is annoying but doesn't directly infect their computers. However, some more sophisticated malware injects scripts that attempt to download malicious payloads to visitors' browsers through drive-by downloads. This is why putting your site in maintenance mode immediately is so important — you're not just protecting your reputation, you're protecting your visitors. It's also why Google takes hacked sites so seriously and shows those prominent warning pages.</p>

<h3>Should I reinstall WordPress from scratch instead of cleaning the infection?</h3>

<p>A complete reinstall is the nuclear option, and while it guarantees a clean starting point, it's usually overkill unless the infection is extremely severe or deeply embedded in the database. If you're considering it, make sure you export your content (posts, pages, comments) using WordPress's built-in export tool first, then do a fresh install and reimport. You'll lose your plugin settings and customizations, but your actual content will be preserved. For most infections, the step-by-step cleanup process I've outlined above is sufficient and preserves all your settings and configurations. I've only recommended a full reinstall maybe 5 times out of hundreds of cleanups.</p>
`;

// ============================================================
// Article 2: WordPress Login Security
// ============================================================

export const seedLoginSecurity = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-login-security";

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

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "WordPress Login Security — How to Stop Brute Force Attacks",
      excerpt:
        "Your WordPress login page gets attacked dozens of times every day, whether you know it or not. I've been hardening login pages for over a decade, and these 8 measures will shut down brute force attacks completely.",
      content: loginSecurityContent,
      category: "security",
      tags: [
        "login security",
        "brute force",
        "two-factor authentication",
        "wordpress security",
        "limit login attempts",
        "recaptcha",
        "xml-rpc",
        "wp-login",
      ],
      seoTitle: "WordPress Login Security: 8 Ways to Stop Brute Force Attacks (2026)",
      seoDescription:
        "Protect your WordPress login page from brute force attacks with these 8 proven measures. Covers 2FA, login limiting, reCAPTCHA, hiding wp-login, and more.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing login security article:", existing._id);
      return {
        message: "Updated existing login security article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new login security article:", postId);
      return {
        message: "Created new login security article",
        id: postId,
      };
    }
  },
});

const loginSecurityContent = `
<p>Here's something that will probably alarm you if you've never looked at your server logs: your WordPress login page is under attack right now. Not hypothetically, not "might be someday" — right now. Automated bots crawl the internet 24/7 looking for WordPress sites, and when they find one, they start hammering the login page with common username and password combinations. It's called a brute force attack, and it's the most common type of attack against WordPress sites by a massive margin. I've been building and securing WordPress sites since 2006, and I've watched these attacks evolve from a few dozen attempts per day to thousands of attempts per hour on popular sites.</p>

<p>The good news is that brute force attacks are also the easiest to stop. Unlike sophisticated zero-day exploits that require advanced security measures, brute force protection comes down to a handful of straightforward changes that any WordPress site owner can implement in under an hour. I'm going to walk you through the 8 most effective login security measures, ranked from "everyone should do this immediately" to "nice extra layer for advanced users." By the end of this guide, your login page will be essentially impenetrable to automated attacks. Let's also establish upfront that this is one piece of a larger security strategy — for the full picture, check out my <a href="/wordpress-security-complete-guide/">complete WordPress security guide</a>.</p>

<h2>What Are Brute Force Attacks?</h2>

<p>A brute force attack is exactly what it sounds like: an attacker (usually an automated bot, not an actual person) tries to guess your login credentials by systematically attempting thousands of username and password combinations. The bot visits your <code>wp-login.php</code> page and submits login forms over and over — "admin / password123", "admin / 123456", "admin / wordpress", "admin / letmein" — cycling through massive dictionaries of common passwords and known credential leaks. Modern brute force bots can try hundreds of combinations per minute, and they don't get tired or bored. If your password is weak or your username is predictable, it's not a question of <em>if</em> they'll get in — it's <em>when</em>.</p>

<p>What makes brute force attacks particularly dangerous for WordPress is that <code>wp-login.php</code> is always at the same URL by default, WordPress doesn't limit login attempts out of the box, and the default admin username during installation is literally "admin." It's like putting your front door at a publicly known address, removing the lock, and taping a note that says "the key is under the mat." Let's fix all of that.</p>

<h2>8 Essential Login Security Measures</h2>

<h3>#1: Never Use "admin" as Your Username</h3>

<p>This is the lowest-hanging fruit and the single most common mistake I see. When WordPress installs, it suggests "admin" as the default username, and a staggering number of site owners just accept it. Every brute force bot starts with "admin" as the username — it's the first thing they try. By using a different username, you immediately force the attacker to guess both your username AND your password, which exponentially increases the difficulty. If you already have "admin" as your username, create a new administrator account with a unique name, log in with the new account, and delete the old "admin" account (WordPress will ask you to transfer the posts to the new account — do that).</p>

<p><strong>Pro tip:</strong> Don't use your domain name, your first name, or "administrator" either — bots try those too. Choose something that isn't publicly visible on your site. And while you're at it, go to <strong>Settings → General</strong> and make sure your admin username isn't displayed as the author name on blog posts. Set a separate display name under <strong>Users → Your Profile</strong>. Bots scrape author archives for valid usernames.</p>

<h3>#2: Use Strong Passwords (and a Password Manager)</h3>

<p>I know you've heard this a thousand times, but I'm going to say it again because weak passwords are still responsible for the majority of successful brute force attacks. "Strong" doesn't mean "your dog's name with a 1 at the end" — it means at least 16 characters, randomly generated, with upper and lowercase letters, numbers, and symbols. Something like <code>kX9#mP2$vL5nQ8@w</code> that no human would ever guess and no dictionary attack would ever contain. The only way to manage passwords like this is with a password manager — I use and recommend <strong>Bitwarden</strong> (free and open-source) or <strong>1Password</strong> (paid but excellent).</p>

<p>Here's something most people don't do but absolutely should: check whether your existing passwords have been exposed in data breaches. Head over to <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener">Have I Been Pwned</a> and enter the email addresses associated with your WordPress accounts. If any show up in known breaches, change those passwords immediately — and not just on WordPress, but everywhere you used the same password. Credential stuffing attacks (where bots try email/password combinations leaked from other sites) are increasingly common, and they work disturbingly well because people reuse passwords across services.</p>

<img src="/screenshots/haveibeenpwned.webp" alt="Have I Been Pwned website showing a search field where you can check if your email address has been compromised in a data breach" />

<h3>#3: Enable Two-Factor Authentication (2FA)</h3>

<p>Two-factor authentication is the single most effective measure against brute force attacks, full stop. Even if an attacker somehow guesses your password (or obtains it from a data breach), they can't log in without the second factor — typically a 6-digit code from an authenticator app on your phone. It transforms your login from "something you know" to "something you know + something you have," and it's the same technology that protects your bank account and email. I consider 2FA non-negotiable for any WordPress site that matters.</p>

<p>The best free plugin for WordPress 2FA is <strong>WP 2FA</strong> by Melapress. Install it from <strong>Plugins → Add New</strong>, activate it, and the setup wizard will walk you through generating a QR code that you scan with your authenticator app (I recommend <strong>Google Authenticator</strong> or <strong>Authy</strong>). Make sure you save the backup codes somewhere safe — if you lose your phone and don't have backup codes, you'll be locked out of your own site. Another solid option is the 2FA feature built into <strong>Wordfence</strong>, which you might already have installed as part of your <a href="/best-security-plugins/">security plugin setup</a>. Whichever plugin you choose, enable 2FA for ALL administrator and editor accounts, not just your own.</p>

<h3>#4: Limit Login Attempts</h3>

<p>By default, WordPress allows unlimited login attempts. An attacker can try 10,000 passwords in a row, and WordPress will happily process every single one. This is, frankly, insane, and it's the first thing I change on every new WordPress installation. <strong>Limit Login Attempts Reloaded</strong> is the go-to plugin for this — it's been around for years, has over 2.5 million active installations, and does exactly what the name says. After a configured number of failed login attempts (I set it to 3), the plugin locks out that IP address for a specified duration (I use 20 minutes for the first lockout, 24 hours after repeated lockouts).</p>

<img src="/screenshots/limit-login-attempts-plugin.webp" alt="Limit Login Attempts Reloaded plugin page on WordPress.org, showing brute force protection and firewall features by WPChef" />

<p>Here's how to set it up: install <strong>Limit Login Attempts Reloaded</strong> from <strong>Plugins → Add New</strong>, activate it, and go to <strong>Settings → Limit Login Attempts</strong>. Under the <strong>App Settings</strong> tab, set <strong>allowed retries</strong> to 3, <strong>normal lockout duration</strong> to 20 minutes, <strong>max lockouts</strong> to 3, and <strong>long lockout duration</strong> to 24 hours. Enable the <strong>email notification</strong> so you get alerted when lockouts occur — this tells you that attacks are being blocked. Under the <strong>Logs</strong> tab, you can see a history of all blocked attempts, which is both informative and slightly terrifying when you see how many bots are hitting your site. If your security plugin (like Wordfence or Sucuri) already includes login limiting, you don't need a separate plugin — just make sure the feature is enabled and configured.</p>

<h3>#5: Add reCAPTCHA to Your Login Page</h3>

<p>reCAPTCHA adds another layer that specifically targets automated bots. Google's reCAPTCHA v3 is invisible to legitimate users — it runs in the background and assigns a risk score based on user behavior. Bots fail this check almost universally because they don't exhibit human browsing patterns. When you combine reCAPTCHA with login attempt limiting, you've essentially created a two-layer defense: bots need to beat the CAPTCHA first, and even if some slip through, they get locked out after 3 failed attempts.</p>

<img src="/screenshots/google-recaptcha.webp" alt="Google reCAPTCHA about page showing bot protection and online fraud prevention features" />

<p>To add reCAPTCHA to your WordPress login page, you first need to register your site at <a href="https://www.google.com/recaptcha/admin" target="_blank" rel="noopener">Google's reCAPTCHA admin console</a>. Choose <strong>reCAPTCHA v3</strong>, add your domain, and you'll receive a <strong>Site Key</strong> and <strong>Secret Key</strong>. Then install a plugin like <strong>Advanced Google reCAPTCHA</strong> (free) or use the reCAPTCHA feature built into Wordfence. Paste your keys into the plugin settings, enable it for the login page, registration page, and password reset page, and you're done. The entire process takes about 5 minutes, and the protection it provides against automated attacks is substantial. This is part of the <a href="/wordpress-security-guide/">security hardening</a> that I recommend for every site.</p>

<h3>#6: Change Your wp-login URL</h3>

<p>Every WordPress site has its login page at <code>/wp-login.php</code> or <code>/wp-admin/</code>. Every brute force bot knows this. By changing the login URL to something custom — like <code>/my-secret-login/</code> or <code>/dashboard-access/</code> — you eliminate the vast majority of automated attacks because the bots simply can't find your login page. It's security through obscurity, which shouldn't be your only defense, but it's a remarkably effective one when layered with other measures.</p>

<p>The easiest way to do this is with the <strong>WPS Hide Login</strong> plugin. Install it, activate it, and go to <strong>Settings → WPS Hide Login</strong>. Enter your new login URL (make it something memorable to you but not easily guessable — avoid <code>/login</code>, <code>/signin</code>, or <code>/admin</code>). The plugin also lets you set a redirect URL for anyone who tries to access the default <code>wp-login.php</code> — I usually set this to a 404 page. <strong>Warning:</strong> Make sure you bookmark your new login URL before activating. If you forget it, you'll need to deactivate the plugin via FTP (rename the plugin folder in <code>wp-content/plugins</code>) to regain access. I've gotten more than a few emergency emails from site owners who forgot their custom login URL — don't be that person.</p>

<h3>#7: Disable XML-RPC</h3>

<p>XML-RPC is a WordPress feature that allows external applications to communicate with your site. It was originally designed for mobile apps and remote publishing tools, but it's been largely superseded by the REST API since WordPress 4.7. The problem is that XML-RPC includes a method called <code>system.multicall</code> that lets an attacker test hundreds of passwords in a single request — completely bypassing login attempt limiting. One HTTP request can contain 500 password attempts, and most login limiting plugins don't catch this because the attempts come through XML-RPC rather than the login form.</p>

<p>If you're not using the WordPress mobile app, Jetpack, or any other service that relies on XML-RPC (most modern plugins use the REST API instead), disable it. The easiest method is to add this filter to your theme's <code>functions.php</code> or a custom plugin: <code>add_filter('xmlrpc_enabled', '__return_false');</code>. Alternatively, most security plugins like Wordfence and Sucuri include a toggle to disable XML-RPC. You can also block it at the server level by adding this to your <code>.htaccess</code> file:</p>

<pre><code>&lt;Files xmlrpc.php&gt;
  Order Deny,Allow
  Deny from all
&lt;/Files&gt;</code></pre>

<p>The .htaccess method is my preferred approach because it blocks the request at the server level before PHP even processes it, saving server resources. If you later need XML-RPC for a specific purpose, you can whitelist specific IP addresses within the block.</p>

<h3>#8: IP Whitelist for wp-admin (Advanced Users)</h3>

<p>This is the nuclear option for login security, and it's only practical if you have a static IP address (or a small number of known IPs). By restricting access to <code>wp-admin</code> and <code>wp-login.php</code> to specific IP addresses, you make it physically impossible for anyone else to even reach your login page. Add this to your <code>.htaccess</code> file in the <code>wp-admin</code> directory:</p>

<pre><code>&lt;Files wp-login.php&gt;
  Order Deny,Allow
  Deny from all
  Allow from 123.456.789.0
  Allow from 98.765.432.1
&lt;/Files&gt;</code></pre>

<p>Replace the IP addresses with your actual IPs (Google "what is my IP" to find yours). You can add multiple <code>Allow from</code> lines for different locations or team members. <strong>Warning:</strong> If your ISP gives you a dynamic IP (which most residential connections do), this will lock you out every time your IP changes. This technique is best suited for businesses with static office IPs, or for sites managed through a VPN with a fixed exit IP. If you do get locked out, you'll need to edit the <code>.htaccess</code> file via FTP to regain access. For most site owners, measures #1 through #7 provide more than enough protection without the maintenance overhead of IP whitelisting.</p>

<h2>Frequently Asked Questions</h2>

<h3>How do I know if my site is being brute-force attacked right now?</h3>

<p>Install <strong>Limit Login Attempts Reloaded</strong> or check your existing security plugin's logs. Both Wordfence and Sucuri show failed login attempts in their dashboards. If you see dozens or hundreds of failed login attempts from different IP addresses, that's a brute force attack in progress. Don't panic — it just means bots are probing your site, which happens to literally every WordPress site on the internet. If you've implemented the measures in this guide, those attempts are being blocked effectively. The attacks only become a problem if they succeed.</p>

<h3>Can brute force attacks slow down my website?</h3>

<p>Yes, absolutely. Each login attempt generates a PHP request and a database query on your server. When bots are sending hundreds or thousands of attempts per hour, that's significant server load — especially on shared hosting where resources are limited. This is another reason why limiting login attempts and disabling XML-RPC are so important: they reduce the processing load from these attacks. If you're experiencing unexplained slow performance, check your security logs for excessive login attempts. A web application firewall (like Wordfence's or Cloudflare's) can block these requests before they even reach your server.</p>

<h3>Is two-factor authentication enough by itself?</h3>

<p>2FA alone provides excellent protection against unauthorized access — it's probably the single highest-impact measure on this list. But I still recommend implementing the other measures too, for two reasons. First, defense in depth: if one layer fails (maybe a future vulnerability bypasses 2FA), you have other layers still protecting you. Second, resource protection: even unsuccessful brute force attempts consume server resources. Limiting login attempts and adding reCAPTCHA stop the attacks from reaching the 2FA check, reducing unnecessary load on your server. Think of it like locking your door (2FA), hiding your address (custom login URL), and hiring a guard (login limiting) — each layer serves a different purpose.</p>

<h3>What should I do if I'm already locked out of my WordPress site?</h3>

<p>If a login limiting plugin locked you out (you exceeded the failed attempts), wait for the lockout period to expire (usually 20 minutes to 24 hours depending on settings). If you need access urgently, connect to your site via FTP/SFTP and navigate to <code>wp-content/plugins</code>. Rename the login-limiting plugin's folder (e.g., rename <code>limit-login-attempts-reloaded</code> to <code>limit-login-attempts-reloaded-disabled</code>). This deactivates the plugin and removes the lockout. Log in, rename the folder back, and adjust your settings if needed. If you've forgotten a custom login URL from WPS Hide Login, use the same FTP folder-renaming technique on that plugin. If you've been genuinely hacked and locked out, follow my <a href="/remove-malware-wordpress/">malware removal guide</a> for recovery steps.</p>
`;

// ============================================================
// Article 3: WordPress File Permissions
// ============================================================

export const seedFilePermissions = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-file-permissions";

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

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "WordPress File Permissions — Security Best Practices Explained",
      excerpt:
        "Wrong file permissions are one of the most overlooked WordPress security holes. I've seen sites hacked because wp-config.php was world-readable. Here's exactly what every file and folder should be set to, and how to fix it.",
      content: filePermissionsContent,
      category: "security",
      tags: [
        "file permissions",
        "wordpress security",
        "chmod",
        "wp-config.php",
        "htaccess",
        "sftp",
        "server security",
        "file security",
      ],
      seoTitle: "WordPress File Permissions: The Complete Security Guide (2026)",
      seoDescription:
        "Set correct file permissions for WordPress: 755 for folders, 644 for files, 440 for wp-config.php. Step-by-step guide for FTP, SSH, and hosting file managers.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing file permissions article:", existing._id);
      return {
        message: "Updated existing file permissions article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new file permissions article:", postId);
      return {
        message: "Created new file permissions article",
        id: postId,
      };
    }
  },
});

const filePermissionsContent = `
<p>File permissions are one of those things that most WordPress site owners never think about — until something goes wrong. Either your site gets hacked because permissions were too loose, or a plugin can't write to a directory because permissions were too tight, or your hosting provider sends you a stern email about a "security misconfiguration." I've been dealing with Linux file permissions since the early 2000s, long before I started working with WordPress, and I can tell you that understanding this one concept will save you from a surprisingly large number of headaches. It's not complicated once you know what the numbers mean, and getting it right is one of the most impactful things you can do for your site's security.</p>

<p>Here's why it matters in plain terms: file permissions control who can read, modify, and execute files on your server. If permissions are too permissive, anyone — including malicious scripts — can modify your WordPress files, inject code, or read your database credentials from wp-config.php. If permissions are too restrictive, WordPress itself can't function properly because it can't write to the uploads directory, update plugins, or modify configuration files. Getting the balance right is essential, and thankfully, the correct settings are well-documented and rarely change. This guide will give you the exact numbers for every WordPress file and directory, plus three different methods to check and fix them.</p>

<h2>What Are File Permissions? (The 30-Second Explanation)</h2>

<p>Every file and directory on a Linux server (which is where the vast majority of WordPress sites live) has three sets of permissions that control access for three categories of users. The <strong>owner</strong> is the user account that created or owns the file. The <strong>group</strong> is a set of users who share access to the file. And <strong>public</strong> (also called "others" or "world") is everyone else — any process on the server, including web visitors and malicious scripts. For each category, there are three types of access: <strong>read</strong> (view the file contents), <strong>write</strong> (modify the file), and <strong>execute</strong> (run the file as a program, or for directories, access the contents).</p>

<p>These permissions are represented as a three-digit number where each digit ranges from 0 to 7. The first digit is the owner's permissions, the second is the group's, and the third is public's. Each digit is calculated by adding: <strong>4</strong> for read, <strong>2</strong> for write, and <strong>1</strong> for execute. So <strong>755</strong> means the owner can read+write+execute (4+2+1=7), while the group and public can only read+execute (4+0+1=5). And <strong>644</strong> means the owner can read+write (4+2=6), while group and public can only read (4+0+0=4). If you remember just these two numbers — <strong>755 for directories</strong> and <strong>644 for files</strong> — you've got the fundamentals covered for 95% of WordPress setups.</p>

<h2>Correct WordPress File Permissions</h2>

<p>After years of working with WordPress across every hosting environment imaginable, here are the exact permissions I set on every site. These follow WordPress.org's official recommendations and work correctly on all major hosts. I've documented these in a reference table because I know from experience that you'll want to bookmark this page and come back to it.</p>

<table>
<thead>
<tr>
<th>File / Directory</th>
<th>Permission</th>
<th>Notation</th>
<th>Why</th>
</tr>
</thead>
<tbody>
<tr>
<td>All directories</td>
<td><strong>755</strong></td>
<td>rwxr-xr-x</td>
<td>Owner can do everything; group and public can read and traverse but not modify</td>
</tr>
<tr>
<td>All files</td>
<td><strong>644</strong></td>
<td>rw-r--r--</td>
<td>Owner can read and write; group and public can only read</td>
</tr>
<tr>
<td><strong>wp-config.php</strong></td>
<td><strong>440</strong> or <strong>400</strong></td>
<td>r--r----- or r--------</td>
<td>Read-only, even for the owner. This file contains your database credentials — it should be as locked down as possible</td>
</tr>
<tr>
<td><strong>.htaccess</strong></td>
<td><strong>644</strong></td>
<td>rw-r--r--</td>
<td>WordPress needs to read it for permalinks and rewrite rules. Some plugins need write access during configuration</td>
</tr>
<tr>
<td><strong>wp-content/uploads/</strong></td>
<td><strong>755</strong></td>
<td>rwxr-xr-x</td>
<td>WordPress needs to write uploaded media files here. Standard directory permissions apply</td>
</tr>
</tbody>
</table>

<p>A few notes on these settings. The <strong>wp-config.php</strong> permission of <strong>440</strong> is more restrictive than the default 644, and that's intentional. This file contains your database username, password, and authentication keys — it's the most sensitive file in your entire WordPress installation. Setting it to 440 (or 400 for even tighter security) means it can be read but not modified through the web server. On some hosting environments, you might need 444 instead of 440 if the web server process runs as a different user than the file owner. If WordPress complains about not being able to read wp-config.php after setting it to 400, try 440 instead. Never leave it at 644 if you can avoid it — that's leaving your database credentials readable by any process on the server.</p>

<p>The <strong>wp-content/uploads</strong> directory is set to 755 like all other directories. Some guides recommend 775 or even 777 for uploads, but this is almost never necessary on a properly configured server. If your uploads are failing with 755, the issue is likely file ownership (the web server process doesn't own the directory), not permissions. Fix the ownership instead of loosening the permissions. Your hosting provider can help with this if needed.</p>

<h2>How to Check and Fix File Permissions</h2>

<h3>Method 1: Via FTP/SFTP Client (FileZilla)</h3>

<p>This is the most accessible method and the one I recommend for most site owners. Download and install <a href="https://filezilla-project.org/" target="_blank" rel="noopener">FileZilla</a> (free, open-source, works on Windows, Mac, and Linux) and connect to your server using the SFTP credentials from your hosting provider. Always use <strong>SFTP</strong> (not plain FTP) — SFTP encrypts the connection, while plain FTP sends your password in cleartext. Once connected, navigate to your WordPress root directory (usually <code>/public_html/</code> or <code>/var/www/html/</code>).</p>

<p>To check permissions on any file or directory, right-click it and select <strong>File Permissions</strong> (or <strong>File Attributes</strong> depending on your FileZilla version). You'll see the current numeric permission value and checkboxes for each permission type. To fix a single file, simply type the correct value (e.g., 644) in the numeric field and click OK. To fix permissions on a directory and everything inside it, right-click the directory, select <strong>File Permissions</strong>, enter the value, and check <strong>"Recurse into subdirectories."</strong> When recursing, select <strong>"Apply to files only"</strong> when setting 644 and <strong>"Apply to directories only"</strong> when setting 755. This is important — you don't want to set 644 on directories (that would remove the execute permission needed to access directory contents) or 755 on files (that would make them executable, which is unnecessary and a security risk for PHP files).</p>

<p><strong>Pro tip:</strong> After setting bulk permissions, go back and manually set wp-config.php to 440 or 400. The bulk operation would have set it to 644 along with all other files. This single file deserves special treatment because of the sensitive credentials it contains.</p>

<h3>Method 2: Via SSH Command Line</h3>

<p>If you have SSH access to your server (most VPS and managed hosting plans include this), the command line is the fastest way to fix permissions across your entire WordPress installation. Connect via SSH and navigate to your WordPress root directory, then run these two commands:</p>

<pre><code>find . -type d -exec chmod 755 {} \;
find . -type f -exec chmod 644 {} \;</code></pre>

<p>The first command finds all directories (<code>-type d</code>) and sets them to 755. The second finds all files (<code>-type f</code>) and sets them to 644. Together, they correct every permission in your WordPress installation in seconds. After running these two commands, secure wp-config.php separately:</p>

<pre><code>chmod 440 wp-config.php</code></pre>

<p>That's it — three commands and your entire WordPress installation has correct permissions. This is the method I use on every site I manage because it's fast, reliable, and leaves no room for error. If you're not comfortable with SSH, that's perfectly fine — the FileZilla method achieves exactly the same result, it just takes a bit longer. For a broader look at securing your WordPress installation, these permission fixes are one of many recommendations in my <a href="/wordpress-security-complete-guide/">complete WordPress security guide</a>.</p>

<h3>Method 3: Via Hosting File Manager</h3>

<p>Most hosting control panels (cPanel, Plesk, DirectAdmin) include a web-based file manager that lets you view and change file permissions without installing any software. In <strong>cPanel</strong>, go to <strong>Files → File Manager</strong>, navigate to your WordPress root directory, right-click any file or folder, and select <strong>Change Permissions</strong>. You'll see a dialog with checkboxes or a numeric input field. The downside of hosting file managers is that they usually only let you change permissions on individual files or directories — there's no "apply recursively to all files" option in most implementations. This makes them impractical for fixing an entire WordPress installation, but they're convenient for quick checks or adjusting a single file like wp-config.php.</p>

<p>If your hosting provider offers <strong>WP-CLI</strong> access (many managed WordPress hosts do), you can also use the <code>wp file permissions</code> commands through the hosting dashboard's terminal feature. But honestly, if you have terminal access, you might as well use the SSH method above — it's faster and gives you more control.</p>

<h2>Common Permission Mistakes (and Why They're Dangerous)</h2>

<p><strong>777 is never okay.</strong> I cannot stress this enough. Setting a file or directory to 777 means everyone — every user, every process, every script on the server — has full read, write, and execute access. On shared hosting, this means other users on the same server can read and modify your files. Even on a VPS where you're the only user, 777 means any compromised script or plugin can modify any file without restriction. I've seen hosting forums where the "solution" to upload or plugin installation problems is "just chmod 777 everything" — this is catastrophic security advice. If a plugin requires 777 to function, find a different plugin. If a directory needs 777 for uploads to work, the real problem is file ownership, not permissions.</p>

<p><strong>Leaving wp-config.php at 644</strong> is a very common oversight. Yes, 644 is the correct default for WordPress files, but wp-config.php isn't a normal file — it contains your database host, username, password, and secret authentication keys. With 644 permissions, any PHP script on your server can read this file. In a malware scenario, one of the first things an attacker's script does is read wp-config.php to obtain your database credentials, which they then use to inject malicious code directly into your database. Setting it to 440 or 400 significantly limits who can read this file. Some security plugins like <a href="/best-security-plugins/">Wordfence and Sucuri</a> will flag this in their security audits if it's set too permissively.</p>

<p><strong>Making PHP files executable (7xx)</strong> is unnecessary and creates risk. PHP files don't need the execute bit set to run — they're interpreted by the PHP engine, not executed directly by the operating system. When you set files to 755 instead of 644, you're adding execute permission for no functional benefit while creating a larger attack surface. If an attacker manages to upload a malicious PHP file, execute permission makes it easier to leverage. Always use 644 for files and 755 only for directories. This is a fundamental aspect of what I cover in my <a href="/wordpress-security-guide/">WordPress security hardening guide</a>.</p>

<h2>Disable File Editing from the WordPress Dashboard</h2>

<p>WordPress includes a built-in theme and plugin editor accessible at <strong>Appearance → Theme File Editor</strong> and <strong>Plugins → Plugin File Editor</strong>. This editor lets anyone with admin access modify PHP files directly from the browser. While convenient for quick tweaks, it's a massive security risk: if an attacker gains admin access to your WordPress dashboard (through a stolen password, a compromised plugin, or a session hijacking attack), they can immediately inject malicious code into your theme or plugin files without needing FTP or SSH access. This is one of the most commonly exploited post-authentication vulnerabilities in WordPress.</p>

<p>Disabling this editor is a one-line addition to wp-config.php. Open the file via SFTP or SSH and add this line anywhere above the <code>/* That's all, stop editing! */</code> comment:</p>

<pre><code>define('DISALLOW_FILE_EDIT', true);</code></pre>

<p>This removes the Theme Editor and Plugin Editor menu items entirely. If you ever need to edit a file, you can do it properly via SFTP or SSH, which provides a natural barrier that prevents quick-and-dirty modifications from the dashboard. I add this line to every WordPress site I set up, no exceptions. While you're editing wp-config.php, you might also consider adding <code>define('DISALLOW_FILE_MODS', true);</code> which goes further and prevents plugin and theme installations/updates from the dashboard entirely. This is more restrictive and requires you to manage all updates via FTP/SSH or WP-CLI, so it's best suited for production sites where stability is paramount and changes go through a proper deployment process. For more tips on hardening your WordPress installation beyond file permissions, check out my <a href="/wordpress-security-complete-guide/">complete security guide</a>.</p>

<p><strong>Pro tip:</strong> If you're working with a team and need to track who changed what, DISALLOW_FILE_EDIT also serves as a governance control. When all file changes must go through SFTP or Git, you have a clear audit trail of who modified which files and when. Combined with proper <a href="/wordpress-backup-guide/">automated backups</a>, this gives you both accountability and the ability to roll back any problematic change.</p>

<h2>Frequently Asked Questions</h2>

<h3>Will wrong file permissions break my WordPress site?</h3>

<p>It depends on which direction they're wrong. Permissions that are too loose (like 777) won't break functionality but create serious security vulnerabilities. Permissions that are too tight (like 400 on directories or 000 on files) will absolutely break things — WordPress won't be able to read files, serve pages, accept uploads, or install updates. The most common symptom of overly tight permissions is "white screen of death" or "permission denied" errors when uploading media, installing plugins, or updating WordPress. If this happens, use the SSH commands or FileZilla method above to reset to the standard 755/644 configuration and things should work immediately.</p>

<h3>Do I need to change file permissions after every WordPress update?</h3>

<p>No. WordPress updates preserve existing file permissions by default. When WordPress downloads and installs an update, the new files inherit the permissions of the directory they're placed in, which should already be correct. The only time you might need to recheck permissions is if you migrate to a new server, restore from a backup (some backup tools don't preserve permissions), or if your hosting provider changes their server configuration. I recommend running a quick permission check every few months as part of your regular site maintenance, or whenever something feels "off" with uploads or updates not working correctly.</p>

<h3>My hosting provider says I need 777 for uploads to work. Is that safe?</h3>

<p>No, and I'd seriously question that advice. No modern hosting environment should require 777 for WordPress uploads to function. The real issue is almost always file ownership: the web server process (usually running as <code>www-data</code> or <code>apache</code>) needs to own the uploads directory, or at least be in the same group as the file owner. Ask your hosting provider to fix the ownership instead of loosening permissions. The correct command is something like <code>chown -R www-data:www-data wp-content/uploads</code> (the exact username depends on your server configuration). If your host insists that 777 is necessary and won't fix the ownership, that's a red flag about their server configuration, and you might want to consider switching to a better host.</p>
`;
