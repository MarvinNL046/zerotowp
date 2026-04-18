import { internalMutation } from "./_generated/server";

export const seedSmartSlider3ProBackdoor = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "smart-slider-3-pro-backdoor-attack-april-2026";

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
      title:
        "Smart Slider 3 Pro Hit by Supply-Chain Attack: What WordPress Users Must Do Now",
      excerpt:
        "A poisoned Smart Slider 3 Pro update (v3.5.1.35) shipped a full remote access toolkit on April 7, 2026. Here is exactly how to check if your site was compromised and what to do next.",
      content: smartSlider3ProBackdoorContent,
      category: "news",
      tags: [
        "smart slider 3 pro backdoor",
        "smart slider hack",
        "nextend compromised",
        "wordpress supply chain attack",
        "smart slider 3.5.1.35 malware",
        "wordpress security 2026",
      ],
      seoTitle: "Smart Slider 3 Pro Backdoor Attack (April 2026)",
      seoDescription:
        "Smart Slider 3 Pro v3.5.1.35 shipped a backdoor on April 7, 2026. Check your version, scan for IoCs, and follow the recovery steps now.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing Smart Slider 3 Pro backdoor article",
        id: existing._id,
      };
    }

    const postId = await ctx.db.insert("posts", {
      ...fields,
      slug,
      status: "published",
      publishedAt: now,
    });

    return {
      message: "Created new Smart Slider 3 Pro backdoor article",
      id: postId,
    };
  },
});

const smartSlider3ProBackdoorContent = `
<h1>Smart Slider 3 Pro Hit by Supply-Chain Attack: What WordPress Users Must Do Now</h1>

<p><strong>If you use Smart Slider 3 Pro and your site auto-updated between April 7 and April 8, 2026, read this now.</strong> The update you received was not from Nextend — it was a fully weaponized backdoor pushed through Nextend's own update infrastructure. Any site running <strong>Smart Slider 3 Pro v3.5.1.35</strong> should be treated as compromised until proven otherwise.</p>

<p><em>Last updated April 18, 2026.</em> This is the second WordPress supply-chain attack inside a single week, and Smart Slider 3 is installed on 800,000+ sites across its free and Pro editions.</p>

<img src="/images/blog/smart-slider-3-pro-backdoor-attack-april-2026.webp" alt="Smart Slider 3 Pro backdoor attack April 2026 WordPress supply chain compromise" />

<h2>TL;DR</h2>

<ul>
<li><strong>What happened:</strong> Nextend's update delivery infrastructure was compromised and a poisoned build of Smart Slider 3 Pro v3.5.1.35 shipped to customers on April 7, 2026.</li>
<li><strong>Who is affected:</strong> Only the <strong>Pro</strong> version of Smart Slider 3 on WordPress. The free version on WordPress.org was <strong>not</strong> compromised. Joomla Pro users are also affected.</li>
<li><strong>How to check:</strong> Open <strong>Plugins → Installed Plugins</strong> and look at Smart Slider 3 Pro. If you see <code>3.5.1.35</code>, assume breach. <code>3.5.1.36</code> or later is the clean patch.</li>
<li><strong>Immediate action:</strong> Update to 3.5.1.36 or later, then hunt for indicators of compromise (rogue admins, suspicious files in <code>wp-content/mu-plugins</code> and <code>wp-includes</code>, unknown <code>wp_options</code> rows).</li>
<li><strong>If compromised:</strong> Rebuild from a pre-April-7 backup. Rotate every credential. A plugin update alone will not remove the backdoor.</li>
</ul>

<p class="affiliate-disclosure"><em>Affiliate note:</em> some of the security tool links in this post are affiliate links. I only recommend tools I would install on my own sites.</p>

<h2>Attack Timeline</h2>

<p>Here is the consolidated timeline based on reporting from <a href="https://thehackernews.com/2026/04/backdoored-smart-slider-3-pro-update.html" target="_blank" rel="nofollow noopener noreferrer">The Hacker News</a>, <a href="https://patchstack.com/articles/critical-supply-chain-compromise-in-smart-slider-3-pro-full-malware-analysis/" target="_blank" rel="nofollow noopener noreferrer">Patchstack's malware analysis</a>, and <a href="https://smartslider.helpscoutdocs.com/article/2144-wordpress-security-advisory-smart-slider-3-pro-3-5-1-35-compromise" target="_blank" rel="nofollow noopener noreferrer">Nextend's own advisory</a>.</p>

<table>
<thead>
<tr>
<th>Date</th>
<th>Event</th>
</tr>
</thead>
<tbody>
<tr>
<td>April 5, 2026 (or earlier)</td>
<td>Last known clean state. Nextend recommends restoring server backups from this date if available.</td>
</tr>
<tr>
<td>April 7, 2026</td>
<td>Attacker pushes Smart Slider 3 Pro v3.5.1.35 through Nextend's compromised update channel. Every site that clicked "update" received a trojanized build.</td>
</tr>
<tr>
<td>April 7, 2026 (~6 hours later)</td>
<td>Compromise detected. Nextend shuts down its update servers and pulls the poisoned build.</td>
</tr>
<tr>
<td>April 9, 2026</td>
<td>Patchstack publishes its full malware analysis. Clean version 3.5.1.36 becomes available.</td>
</tr>
<tr>
<td>April 10, 2026</td>
<td>The Hacker News and other outlets break the story publicly.</td>
</tr>
</tbody>
</table>

<p>Nextend has not published exact UTC timestamps. The ~6-hour window figure is consistent across Patchstack, The Hacker News, and Hedgehog Security reporting, but treat it as an estimate.</p>

<h2>How the Attack Worked</h2>

<p>This was not a vulnerability in Smart Slider's code. It was a <strong>supply-chain attack</strong>: an unauthorized party gained access to Nextend's update delivery infrastructure and published an attacker-authored build through the legitimate channel. Every customer whose site auto-updated installed the backdoor themselves, trusting the official distribution system.</p>

<p>The payload is not a single PHP shell. According to <a href="https://patchstack.com/articles/critical-supply-chain-compromise-in-smart-slider-3-pro-full-malware-analysis/" target="_blank" rel="nofollow noopener noreferrer">Patchstack's analysis</a>, it is a staged RAT with multiple independent re-entry points, so removing one does not remove the others.</p>

<h3>What the RAT actually does</h3>

<ul>
<li><strong>Pre-auth shell.</strong> Executes OS commands when a request arrives with the <code>X-Cache-Status</code> header and a specific token value.</li>
<li><strong>PHP eval backdoor.</strong> Runs arbitrary PHP via a hidden <code>_chk</code> GET parameter, with fallback command chains if the primary path is blocked.</li>
<li><strong>Hidden admin.</strong> Creates a rogue admin (username pattern <code>wpsvc_*</code>, display name "WordPress Service") and hides it from the wp-admin Users list.</li>
<li><strong>Must-use plugin drop.</strong> <code>wp-content/mu-plugins/object-cache-helper.php</code> auto-loads on every request regardless of active plugins.</li>
<li><strong>Core-file injection.</strong> Drops <code>wp-includes/class-wp-locale-helper.php</code> and a <code>wp-includes/.cache_key</code> marker to survive plugin removal.</li>
<li><strong>Theme infection.</strong> Appends code referencing the option key <code>_wpc_ak</code> to the active theme's <code>functions.php</code>.</li>
<li><strong>C2 registration + credential exfil.</strong> On first run, POSTs to <code>wpjs1[.]com</code> (endpoint <code>/api/v3/register-agent</code>) with the site URL, a generated secret key, hostname, Smart Slider/WordPress/PHP versions, admin email, database name, server software, the rogue admin's <strong>plaintext username and password</strong>, and the full persistence inventory.</li>
</ul>

<h3>Indicators of compromise (sanitized)</h3>

<p>The following IoCs have been reported publicly. I am keeping the C2 domain defanged. Do not visit it from a browser without isolation.</p>

<ul>
<li>Files: <code>wp-content/mu-plugins/object-cache-helper.php</code>, <code>wp-includes/class-wp-locale-helper.php</code>, <code>wp-includes/.cache_key</code></li>
<li>Options table rows: <code>_wpc_ak</code> (24 hex character key), <code>_wpc_uid</code>, <code>_wpc_uinfo</code> (base64)</li>
<li>Rogue admin pattern: username <code>wpsvc_*</code>, email reported as <code>kiziltxt2[at]gmail[dot]com</code></li>
<li>C2 host: <code>wpjs1[.]com</code> — block at firewall and DNS</li>
<li>Trigger header: <code>X-Cache-Status</code> with a specific token value</li>
<li>Trigger GET parameter: <code>_chk</code></li>
</ul>

<h2>How to Check If You Were Affected</h2>

<p>Work through these checks in order. Any single positive means you should treat the site as compromised.</p>

<ol>
<li><strong>Check the plugin version.</strong> In <strong>Plugins → Installed Plugins</strong>: below <code>3.5.1.35</code> was never exposed, exactly <code>3.5.1.35</code> is poisoned, <code>3.5.1.36</code>+ is the clean patch. Updating <em>from</em> 3.5.1.35 to 3.5.1.36 does not remove the backdoor — it only stops new infections.</li>
<li><strong>Check your update log.</strong> In WP Activity Log or your host's audit trail, look for a Smart Slider 3 Pro update between April 7 and April 8, 2026.</li>
<li><strong>Look for unexpected files</strong> via SFTP: <code>wp-content/mu-plugins/object-cache-helper.php</code>, <code>wp-includes/class-wp-locale-helper.php</code>, <code>wp-includes/.cache_key</code>. None of these exist on a clean install.</li>
<li><strong>Grep the active theme's <code>functions.php</code></strong> for <code>_wpc_ak</code>.</li>
<li><strong>Audit user accounts.</strong> Query <code>wp_users</code> directly (the wp-admin list may be filtered) for <code>wpsvc_*</code> usernames, the email <code>kiziltxt2@gmail.com</code>, or display name "WordPress Service".</li>
<li><strong>Check the options table</strong> for <code>_wpc_ak</code>, <code>_wpc_uid</code>, <code>_wpc_uinfo</code>.</li>
<li><strong>Check outbound DNS</strong> for connections to <code>wpjs1.com</code>.</li>
<li><strong>Check cron jobs.</strong> Run <code>wp cron event list</code> and treat anything unfamiliar as suspect.</li>
</ol>

<h2>If You're Affected: Recovery Steps</h2>

<p>A plugin update does not remove a backdoor that has already written to your theme, mu-plugins, core files, options table, and user table. You need a full recovery.</p>

<ol>
<li><strong>Take the site offline</strong> (maintenance mode or host-level 503) so the attacker cannot keep operating while you clean up.</li>
<li><strong>Restore from a backup dated April 5, 2026 or earlier</strong> — Nextend's recommended path. A pre-breach restore beats manual cleanup.</li>
<li><strong>If no clean backup exists:</strong> remove the IoC files, purge the three <code>_wpc_*</code> options, delete rogue admins, and revert <code>functions.php</code>. Scan with at least two independent tools afterwards.</li>
<li><strong>Rotate every credential:</strong> WordPress admins, DB password, SFTP/SSH, hosting panel, and anything in <code>wp-config.php</code>.</li>
<li><strong>Regenerate auth keys and salts</strong> in <code>wp-config.php</code> using the <a href="https://api.wordpress.org/secret-key/1.1/salt/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org salt generator</a> — this invalidates every existing session.</li>
<li><strong>Reinstall Smart Slider 3 Pro</strong> cleanly at version 3.5.1.36 or later.</li>
<li><strong>Rotate API keys and webhooks</strong> — Stripe, Mailchimp, SMTP, CDN tokens. Assume anything stored in the database or <code>wp-config.php</code> is known to the attacker.</li>
<li><strong>Scan with a reputable scanner.</strong> <a href="https://www.wordfence.com/" target="_blank" rel="nofollow noopener noreferrer">Wordfence</a>, <a href="https://www.malcare.com/" target="_blank" rel="nofollow noopener noreferrer">MalCare</a>, and <a href="https://sucuri.net/" target="_blank" rel="nofollow noopener noreferrer">Sucuri</a> all have signatures for this campaign.</li>
<li><strong>Monitor for two weeks</strong> — re-scan daily and watch for new admin accounts or unexpected outbound traffic.</li>
</ol>

<h2>How Supply-Chain Attacks Bypass "Updated Plugin" Security</h2>

<p>For years the standard WordPress advice has been "keep plugins updated." That advice is still correct — most WordPress breaches start with an <em>out-of-date</em> plugin, not a poisoned one. But this incident exposes the edge case where fast updates actively hurt you.</p>

<p>In a supply-chain attack, malicious code arrives through the vendor's own trusted distribution channel. Your site cannot tell a legitimate update from a hijacked one, because both are served from the vendor's servers. WordPress does not currently enforce reproducible builds or independent signing for paid-plugin updates delivered outside WordPress.org, so trust is transitive — you trust Smart Slider, Smart Slider trusts its own update server, and a breached server means a breached site.</p>

<p>The practical takeaway is not "stop updating." It is "stop updating <em>instantly</em>." Staggering by 48 to 72 hours would have prevented almost every 3.5.1.35 infection, because the poisoned build was only live for about six hours.</p>

<h2>Preventing Future Supply-Chain Attacks</h2>

<p>You cannot stop a vendor being breached. You can shrink your blast radius when one is.</p>

<ul>
<li><strong>Stagger auto-updates.</strong> Disable auto-updates on premium plugins and apply them manually 48–72 hours after release, unless the update is an active security fix.</li>
<li><strong>Vulnerability intelligence feed.</strong> <a href="https://patchstack.com/" target="_blank" rel="nofollow noopener noreferrer">Patchstack</a> maintains a real-time WordPress vulnerability and supply-chain database.</li>
<li><strong>Firewall + malware scanner.</strong> <a href="https://www.wordfence.com/" target="_blank" rel="nofollow noopener noreferrer">Wordfence</a> catches many RAT-style post-exploitation behaviors even when the initial dropper is signed.</li>
<li><strong>Cleanup fallback.</strong> <a href="https://www.malcare.com/" target="_blank" rel="nofollow noopener noreferrer">MalCare</a> is built around automated one-click cleanup — useful at 2 AM.</li>
<li><strong>Platform-level WAF.</strong> <a href="https://sucuri.net/" target="_blank" rel="nofollow noopener noreferrer">Sucuri</a>'s WAF sits in front of the origin and can block IoC-matching requests before they hit PHP.</li>
<li><strong>Activity log.</strong> A plugin-update log lets you match your site against incident timelines quickly.</li>
<li><strong>Daily off-site backups.</strong> The single best recovery in this incident was "restore from April 5 or earlier" — only possible if you have that backup.</li>
</ul>

<p>For a broader baseline, work through my <a href="/wordpress-security-complete-guide/">WordPress security complete guide</a>, harden your <a href="/wordpress-login-security/">WordPress login</a>, and compare options in my <a href="/best-security-plugins/">best WordPress security plugins</a> roundup.</p>

<h2>Connection to the Essential Plugin Attack</h2>

<p>This is the <strong>second WordPress supply-chain attack inside a single week</strong>. Just days earlier, the same pattern played out with a different plugin — see my writeup of <a href="/essential-plugin-supply-chain-backdoor-attack/">the Essential Plugin supply-chain attack</a>. Two independent vendors, two compromised update channels, two RAT payloads with credential exfiltration. The through-line is that paid-plugin update infrastructure in the WordPress ecosystem largely lacks independent signing and reproducible-build verification. Plugin provenance — "where did this code really come from, and can I verify it?" — is going to be one of the defining WordPress security conversations of 2026.</p>

<h2>Frequently Asked Questions</h2>

<h3>Which Smart Slider version is affected?</h3>
<p>Only <strong>Smart Slider 3 Pro v3.5.1.35</strong> for WordPress and its Joomla counterpart. Anything below 3.5.1.35 was never exposed. Version 3.5.1.36 and later is the clean patch.</p>

<h3>Is the free Smart Slider 3 version affected?</h3>
<p>No. The free version is distributed through the WordPress.org plugin repository and uses a different delivery path. Nextend and independent analysts have confirmed the free build was not compromised.</p>

<h3>How long was the poisoned version live?</h3>
<p>About six hours on April 7, 2026. Nextend has not published exact UTC timestamps. If your site auto-updated Smart Slider 3 Pro during that window, treat it as compromised.</p>

<h3>How do I know if my site is actually compromised?</h3>
<p>Running 3.5.1.35 at any point is the strongest signal. Confirm with a file-level search for <code>object-cache-helper.php</code> in <code>wp-content/mu-plugins</code>, a grep of your theme's <code>functions.php</code> for <code>_wpc_ak</code>, and a <code>wp_users</code> query for <code>wpsvc_*</code> usernames. Any one of those means breach.</p>

<h3>Will updating to 3.5.1.36 remove the backdoor?</h3>
<p>No. The backdoor writes to files and database rows outside the Smart Slider plugin directory. Updating stops new malicious code from arriving, but you still have to do the cleanup or restore from a pre-April-7 backup.</p>

<h3>Should I switch away from Smart Slider?</h3>
<p>Not automatically. Nextend's response — shutting down update servers, releasing a clean patch, and publishing an advisory — has been reasonable. The real lesson is about your own update policy, not this specific vendor.</p>

<h3>Was data exfiltrated from my site?</h3>
<p>If you ran 3.5.1.35, assume yes. The malware POSTs admin credentials, database name, site metadata, and a generated backdoor key to an external C2 on first run. Rotate every credential stored on the site.</p>

<h2>Primary Sources</h2>

<ul>
<li><a href="https://thehackernews.com/2026/04/backdoored-smart-slider-3-pro-update.html" target="_blank" rel="nofollow noopener noreferrer">The Hacker News — Backdoored Smart Slider 3 Pro Update Distributed via Compromised Nextend Servers</a></li>
<li><a href="https://patchstack.com/articles/critical-supply-chain-compromise-in-smart-slider-3-pro-full-malware-analysis/" target="_blank" rel="nofollow noopener noreferrer">Patchstack — Critical Supply Chain Compromise in Smart Slider 3 Pro: Full Malware Analysis</a></li>
<li><a href="https://smartslider.helpscoutdocs.com/article/2144-wordpress-security-advisory-smart-slider-3-pro-3-5-1-35-compromise" target="_blank" rel="nofollow noopener noreferrer">Nextend — WordPress security advisory: Smart Slider 3 Pro 3.5.1.35 compromise</a></li>
<li><a href="https://www.hedgehogsecurity.co.uk/blog/smart-slider-wordpress-supply-chain-attack-april-2026" target="_blank" rel="nofollow noopener noreferrer">Hedgehog Security — Smart Slider 3 WordPress Supply Chain Attack April 2026</a></li>
<li><a href="https://raxis.com/blog/smart-slider-3-pro-wordpress-joomla-plugin-supply-chain-compromise" target="_blank" rel="nofollow noopener noreferrer">Raxis — Smart Slider 3 Pro WordPress/Joomla Plugin Compromise</a></li>
<li><a href="https://api.wordpress.org/secret-key/1.1/salt/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org — Secret key / salt generator</a></li>
</ul>
`;
