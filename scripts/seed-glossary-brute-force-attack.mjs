import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = process.env.CONVEX_URL;

const client = new ConvexHttpClient(CONVEX_URL);

const content = `<h2>What Is a Brute Force Attack?</h2>
<p>A brute force attack is a trial-and-error method where an attacker systematically tries <strong>every possible combination</strong> of usernames and passwords until one works. There is no clever exploit involved — just raw, automated guessing at high speed. A bot might attempt thousands of login combinations per minute against your WordPress site's <code>wp-login.php</code> page, hoping to stumble on valid credentials.</p>
<p>Think of it like someone trying every key on a massive keyring against your front door lock. Given enough time and no countermeasures, they will eventually find the right one.</p>

<h2>How Brute Force Attacks Target WordPress</h2>
<p>WordPress is the most popular CMS on the web, which makes it the biggest target. Attackers don't even need to know your site exists — they run automated scans across millions of IP addresses looking for WordPress login pages. Here's what a typical attack looks like:</p>
<ol>
<li><strong>The bot finds your login page</strong> — usually at <code>yourdomain.com/wp-login.php</code> or <code>/wp-admin/</code>. These are the same for every WordPress installation, which makes them easy to locate.</li>
<li><strong>It starts guessing</strong> — the bot tries common username/password combinations: "admin" + "password123", "admin" + "admin", "admin" + your domain name. These credential lists are compiled from previous data breaches and leaked password databases.</li>
<li><strong>It scales up</strong> — modern botnets distribute the attack across thousands of IP addresses. Each IP tries a handful of combinations to stay under rate limits, but collectively they test millions of passwords.</li>
</ol>
<p>I check Wordfence logs across the sites I manage, and the numbers are staggering. Even small, obscure WordPress sites get hit with hundreds of brute force attempts per week. It's not personal — the bots don't know or care what your site is about. They're casting a wide net.</p>

<h2>Types of Brute Force Attacks</h2>
<ul>
<li><strong>Simple brute force</strong> — tries every possible character combination (aaa, aab, aac…). Effective against short passwords, impractical against long ones.</li>
<li><strong>Dictionary attack</strong> — uses a list of common passwords and words. Much faster than simple brute force because most people choose predictable passwords.</li>
<li><strong>Credential stuffing</strong> — uses username/password pairs leaked from other breached services. If you reused a password from a hacked forum, attackers will try it on your WordPress login.</li>
<li><strong>Reverse brute force</strong> — starts with a known common password (like "password1") and tries it against a large list of usernames. Particularly effective when "admin" is the username.</li>
</ul>

<h2>How to Protect Your WordPress Site</h2>
<p>The good news: brute force attacks are one of the easiest threats to defend against. A few straightforward measures make your site virtually immune.</p>

<h3>Use Strong, Unique Passwords</h3>
<p>This is the single most effective defense. A 16+ character password with mixed case, numbers, and symbols would take a brute force bot billions of years to crack. Use a password manager like <strong>1Password</strong> or <strong>Bitwarden</strong> to generate and store them. Never reuse passwords across sites — credential stuffing works precisely because people reuse passwords.</p>

<h3>Enable Two-Factor Authentication (2FA)</h3>
<p>Even if an attacker guesses your password, 2FA stops them cold. They'd also need access to your phone or authenticator app. Plugins like <a href="/best-security-plugins">Wordfence</a> include 2FA out of the box — it takes 30 seconds to set up and blocks virtually all brute force attacks.</p>

<h3>Limit Login Attempts</h3>
<p>By default, WordPress allows unlimited login attempts. That's an open invitation for bots. Install a security plugin that locks out IP addresses after a set number of failed attempts. Wordfence and <strong>Limit Login Attempts Reloaded</strong> both handle this automatically.</p>

<h3>Change the Default "admin" Username</h3>
<p>If your WordPress username is still "admin", change it today. Create a new administrator account with a unique username, log in with it, and delete the old "admin" account. Every brute force bot tries "admin" first — removing it eliminates half the equation.</p>

<h3>Use a Web Application Firewall (WAF)</h3>
<p>A WAF like <a href="/wordpress-security-complete-guide">Wordfence</a> or Cloudflare detects brute force patterns and blocks malicious IPs before they even reach your login page. Server-level protection is always better than application-level, because the request gets stopped earlier in the chain.</p>

<h2>Signs Your Site Is Under Attack</h2>
<p>How do you know if a brute force attack is happening right now? Watch for these signs:</p>
<ul>
<li><strong>Slow site performance</strong> — thousands of login requests per minute consume server resources, slowing your site for real visitors.</li>
<li><strong>Failed login notifications</strong> — if you have a security plugin, check its logs. Hundreds of failed attempts from different IPs is a clear signal.</li>
<li><strong>Locked out of your own account</strong> — if login protection is enabled, aggressive attacks can sometimes trigger lockouts on legitimate users too.</li>
<li><strong>Unusual server resource usage</strong> — your hosting control panel may show CPU or memory spikes that don't correlate with real traffic.</li>
</ul>

<h2>The Bottom Line</h2>
<p>Brute force attacks are unsophisticated but relentless. They succeed not because they're clever, but because too many WordPress site owners use weak passwords and skip basic security measures. A strong password, two-factor authentication, and a login limiter are all you need to make your site an unattractive target. The bots will move on to easier prey.</p>`;

const entry = {
  term: "Brute Force Attack",
  slug: "brute-force-attack",
  shortDefinition:
    "An automated attack method where bots systematically guess username and password combinations to break into your WordPress login page, often trying thousands of combinations per minute.",
  content,
  relatedTerms: ["firewall", "malware", "ssl"],
  relatedArticles: [
    "wordpress-security-complete-guide",
    "best-security-plugins",
    "wordpress-login-security",
  ],
  category: "security",
  publishedAt: Date.now(),
};

const result = await client.mutation(api.glossary.create, entry);
console.log("Created glossary term: brute-force-attack", result);
