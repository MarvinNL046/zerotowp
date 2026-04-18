import { internalMutation } from "./_generated/server";

export const seedWooCommerceReviewsCve20264664 = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "customer-reviews-woocommerce-cve-2026-4664-auth-bypass";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-security"))
      .first();

    if (!cluster) {
      return {
        message: "Cluster 'wordpress-security' not found. Seed the security cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "Customer Reviews for WooCommerce Auth Bypass (CVE-2026-4664): Patch Now",
      excerpt:
        "CVE-2026-4664 lets unauthenticated attackers post reviews on any WooCommerce product through the Customer Reviews plugin. Update to 5.104.0 today.",
      content: wooCommerceReviewsCve20264664Content,
      category: "news",
      tags: [
        "cve 2026 4664",
        "customer reviews woocommerce vulnerability",
        "woocommerce security",
        "wordpress plugin auth bypass",
        "woocommerce plugin patch",
        "wordpress security april 2026",
      ],
      seoTitle: "CVE-2026-4664: WooCommerce Reviews Auth Bypass Patched",
      seoDescription:
        "CVE-2026-4664: Customer Reviews for WooCommerce up to 5.103.0 lets unauthenticated users post reviews. Update to 5.104.0 now. Here is how.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing Customer Reviews for WooCommerce CVE-2026-4664 article",
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
      message: "Created new Customer Reviews for WooCommerce CVE-2026-4664 article",
      id: postId,
    };
  },
});

const wooCommerceReviewsCve20264664Content = `
<p><strong>CVE-2026-4664 is an authentication bypass in the "Customer Reviews for WooCommerce" plugin that lets anyone on the internet submit fake reviews on any product in your store.</strong> Disclosed April 13, 2026, it affects every version up to and including 5.103.0. The fix is in <strong>5.104.0</strong>. Roughly 80,000 stores run this plugin &mdash; update today.</p>

<p><em>Last updated April 18, 2026.</em> CVE number, version range and technical detail below are cross-referenced with NIST NVD, WP-Firewall and WPScan.</p>

<img src="/images/blog/customer-reviews-woocommerce-cve-2026-4664-auth-bypass.webp" alt="CVE-2026-4664 Customer Reviews for WooCommerce authentication bypass update to 5.104.0" />

<h2>TL;DR: What You Need to Know</h2>

<ul>
<li><strong>CVE:</strong> CVE-2026-4664 (CWE-287 Improper Authentication).</li>
<li><strong>Affected versions:</strong> Customer Reviews for WooCommerce <strong>up to and including 5.103.0</strong>.</li>
<li><strong>Patched version:</strong> <strong>5.104.0</strong>.</li>
<li><strong>CVSS:</strong> 5.3 (medium) &mdash; but the real-world impact on a store's reputation and SEO is higher than the score implies.</li>
<li><strong>Impact:</strong> Unauthenticated attackers can submit, modify and inject product reviews on <em>any</em> product through the plugin's REST API.</li>
<li><strong>Action:</strong> Update to 5.104.0 from <strong>Plugins &rarr; Installed Plugins</strong>, or run <code>wp plugin update customer-reviews-woocommerce</code>.</li>
</ul>

<h2>What's the Vulnerability</h2>

<p>The flaw lives in the plugin's REST API endpoint <code>POST /ivole/v1/review</code>, which is meant to accept verified customer reviews coming back from a review-request email. The permission callback <code>create_review_permissions_check()</code> is supposed to verify that the caller supplied the correct secret token for the order being reviewed.</p>

<p>The callback reads the order's <code>ivole_secret_key</code> post-meta and compares it to the <code>key</code> parameter in the request using strict equality (<code>===</code>). What it does <em>not</em> check is whether the stored key is non-empty. For any order where no review reminder email has been sent, <code>ivole_secret_key</code> was never written, so <code>get_post_meta()</code> returns an empty string.</p>

<p>An attacker sends <code>key: ""</code> in the request body. Stored value empty. Submitted value empty. Strict comparison returns <code>true</code>. The permission check passes, and the review is accepted &mdash; on any product, as any display name, with any rating, with any message. No authentication, no rate limit, no tie back to the referenced order.</p>

<h3>What an attacker can do</h3>

<ul>
<li><strong>Reputation manipulation</strong> &mdash; flood a competitor with 1-star reviews or inflate their own store with fake praise.</li>
<li><strong>SEO spam</strong> &mdash; reviews can contain links, turning a trusted store into a distribution point for spam, gambling or malware sites.</li>
<li><strong>Phishing</strong> &mdash; crafted text can impersonate the store owner ("for a refund, contact support@malicious.example").</li>
<li><strong>Brand damage</strong> &mdash; arbitrary display names let attackers post under real customer or public-figure names.</li>
</ul>

<h2>Affected Versions</h2>

<table>
<thead>
<tr>
<th>Version range</th>
<th>Status</th>
<th>Notes</th>
</tr>
</thead>
<tbody>
<tr>
<td>5.0.0 &ndash; 5.103.0</td>
<td><strong>Vulnerable</strong></td>
<td>All versions in this range accept empty <code>key</code> values and bypass the permission check.</td>
</tr>
<tr>
<td>5.104.0</td>
<td><strong>Patched</strong></td>
<td>Adds a non-empty check on the stored secret before the strict comparison.</td>
</tr>
<tr>
<td>5.104.1 and later</td>
<td>Safe</td>
<td>Current stable branch at time of writing is already past 5.104.0. Any recent version is fine.</td>
</tr>
</tbody>
</table>

<p>The plugin had roughly <strong>80,000 active installations</strong> at the time the CVE was disclosed, per the WordPress.org plugin page. That is a large attack surface for a single-parameter bypass.</p>

<h2>How to Check if You're Vulnerable</h2>

<h3>From the WordPress dashboard</h3>

<ol>
<li>Log in to <strong>wp-admin</strong>.</li>
<li>Go to <strong>Plugins &rarr; Installed Plugins</strong>.</li>
<li>Find <em>Customer Reviews for WooCommerce</em>.</li>
<li>Read the version number directly under the plugin name.</li>
<li>If it is <strong>5.103.0 or lower</strong>, you are vulnerable.</li>
</ol>

<h3>From WP-CLI</h3>

<p>On servers where you have shell access, WP-CLI is faster and works across a fleet:</p>

<pre><code>wp plugin list --name=customer-reviews-woocommerce --fields=name,version,status,update</code></pre>

<p>If the output shows a version at or below 5.103.0, or <code>update</code> shows <code>available</code>, patch immediately.</p>

<h3>If you manage many sites</h3>

<p>Run the same WP-CLI command across your inventory. If you use <a href="https://patchstack.com/" target="_blank" rel="nofollow noopener noreferrer">Patchstack</a> or <a href="https://www.wordfence.com/" target="_blank" rel="nofollow noopener noreferrer">Wordfence</a>, CVE-2026-4664 should already be flagged in your dashboard. <em>(Affiliate links &mdash; I recommend both as part of my wider WordPress security stack.)</em></p>

<h2>How to Patch</h2>

<h3>Option 1 &mdash; Dashboard</h3>

<ol>
<li><strong>Back up first.</strong> Take a full file + database backup before touching anything on a production store.</li>
<li>Go to <strong>Plugins &rarr; Installed Plugins</strong>.</li>
<li>On the Customer Reviews for WooCommerce row, click <strong>Update Now</strong>.</li>
<li>Confirm the new version reads <strong>5.104.0 or higher</strong>.</li>
</ol>

<h3>Option 2 &mdash; WP-CLI</h3>

<pre><code>wp plugin update customer-reviews-woocommerce
wp plugin list --name=customer-reviews-woocommerce --fields=name,version,status</code></pre>

<p>The second command verifies the upgrade landed. For WooCommerce stores with heavy checkout traffic, apply on staging first, click through a review submission on a test product, then promote to production.</p>

<h3>Option 3 &mdash; Auto-updates</h3>

<p>If plugin auto-updates are enabled, 5.104.0 has likely already deployed. Confirm via the dashboard or WP-CLI. For any security-critical plugin I leave auto-updates on; the small regression risk is worth avoiding a patch gap during disclosure windows.</p>

<h2>If You Suspect Abuse</h2>

<p>If your store was on a vulnerable version after April 13, assume reviews <em>may</em> have been injected and audit.</p>

<ol>
<li><strong>List recent reviews.</strong> In <strong>Products &rarr; Reviews</strong>, sort by date and filter for entries posted since April 13, 2026.</li>
<li><strong>Look for non-customer patterns:</strong> reviews with no associated completed order, generic display names, near-identical text across products, links in the body, or bursts from the same time window.</li>
<li><strong>Cross-check against orders.</strong> A real submission should trace back to a completed order and its review request email. Reviews with no order link or an empty <code>ivole_secret_key</code> on the referenced order are suspicious.</li>
<li><strong>Rotate any API credentials</strong> as housekeeping. This CVE does not leak credentials, but incident cleanup is a good moment to rotate.</li>
<li><strong>Full malware scan</strong> with Wordfence or <a href="https://www.malcare.com/" target="_blank" rel="nofollow noopener noreferrer">MalCare</a> <em>(affiliate)</em> to confirm the attacker did not pivot from review injection into something deeper.</li>
</ol>

<p>Remove injected reviews before Google indexes them &mdash; the SEO spam angle is the most persistent downside here.</p>

<h2>Context: The April 2026 WordPress Security Wave</h2>

<p>This is the fourth major WordPress-ecosystem CVE I have covered this month:</p>

<ul>
<li><a href="/essential-plugin-supply-chain-backdoor-attack/">Essential Plugin supply-chain backdoor</a> &mdash; WordPress.org closed all 31 plugins from a single author in early April.</li>
<li><a href="/smart-slider-3-pro-backdoor-attack-april-2026/">Smart Slider 3 Pro backdoor</a> &mdash; a second supply-chain incident affecting paid Nextend customers.</li>
<li><a href="/wordpress-6-9-4-security-cleanup-april-2026/">WordPress 6.9.4 emergency security cleanup</a> &mdash; core shipped three releases in 24 hours to finish fixes 6.9.2/6.9.3 missed.</li>
<li><strong>CVE-2026-4664 (this post)</strong> &mdash; Customer Reviews for WooCommerce auth bypass.</li>
</ul>

<p>If you run a WooCommerce store, the pattern is clear: core is secure, but the plugin perimeter is where real risk lives. Audit your full stack this month.</p>

<h2>How to Prevent the Next One</h2>

<p>Single-plugin patches are reactive. A real security stack covers the gap between disclosure and patch:</p>

<ul>
<li><strong><a href="https://patchstack.com/" target="_blank" rel="nofollow noopener noreferrer">Patchstack</a></strong> <em>(affiliate)</em> &mdash; virtual patches for plugin CVEs, often deployed within hours of disclosure.</li>
<li><strong><a href="https://www.wordfence.com/" target="_blank" rel="nofollow noopener noreferrer">Wordfence</a></strong> <em>(affiliate)</em> &mdash; endpoint firewall and malware scanner with a strong free tier.</li>
<li><strong><a href="https://www.malcare.com/" target="_blank" rel="nofollow noopener noreferrer">MalCare</a></strong> <em>(affiliate)</em> &mdash; cloud malware detection with one-click cleanup.</li>
</ul>

<p>Plus auto-updates on for security-critical plugins, quarterly plugin audits, and offsite backups. See my <a href="/wordpress-security-complete-guide/">WordPress security complete guide</a> for the full hardening checklist. <em>Disclosure: Patchstack, Wordfence and MalCare links are affiliate links; they do not change the price you pay.</em></p>

<h2>Frequently Asked Questions</h2>

<h3>Is CVE-2026-4664 being exploited in the wild?</h3>
<p>Proof-of-concept details were published alongside the April 13, 2026 advisory, so assume opportunistic exploitation is possible. Because the endpoint is unauthenticated and the crafted payload is trivial (an empty <code>key</code> parameter), automated scanners can weaponize it quickly. Patch rather than wait for confirmed incidents.</p>

<h3>Do I need to do anything if I am already on 5.104.0 or higher?</h3>
<p>No action required. 5.104.0 is the fix. Anything newer is still safe. Confirm via <strong>Plugins &rarr; Installed Plugins</strong>.</p>

<h3>I do not send review reminder emails. Am I still vulnerable?</h3>
<p>Yes &mdash; in fact you may be <em>more</em> exposed. The bug relies on orders where the <code>ivole_secret_key</code> post-meta was never written. If you never send review emails, <em>every</em> order has an empty stored key, so every order is a valid attack path.</p>

<h3>Does disabling the plugin fix it?</h3>
<p>Yes. If for any reason you cannot update immediately, deactivate the plugin until you can patch. Deactivation removes the vulnerable REST route from the site.</p>

<h3>Will removing injected reviews undo the SEO damage?</h3>
<p>Mostly, over time. Once deleted, Google recrawls the product pages and the attacker text drops out of the index. Accelerate this with <strong>URL inspection &rarr; Request indexing</strong> in Google Search Console.</p>

<h3>Is there a CVSS v4.0 score?</h3>
<p>At time of publication only the CVSS v3.1 score (5.3 medium) was listed in NVD. CVSS v4.0 pending.</p>

<h2>Primary Sources</h2>

<ul>
<li><a href="https://nvd.nist.gov/vuln/detail/CVE-2026-4664" target="_blank" rel="nofollow noopener noreferrer">NIST NVD: CVE-2026-4664 (CVSS 5.3, CWE-287)</a></li>
<li><a href="https://wp-firewall.com/authentication-vulnerability-in-woocommerce-reviews-published-on-2026-04-13-cve-2026-4664-2/" target="_blank" rel="nofollow noopener noreferrer">WP-Firewall: Authentication Vulnerability in WooCommerce Reviews (CVE-2026-4664)</a></li>
<li><a href="https://managed-wp.com/blogs/authentication-vulnerability-in-woocommerce-reviews-cve20264664-2026-04-13" target="_blank" rel="nofollow noopener noreferrer">Managed-WP: Authentication Vulnerability in WooCommerce Reviews (April 13, 2026)</a></li>
<li><a href="https://wpscan.com/plugin/customer-reviews-woocommerce/" target="_blank" rel="nofollow noopener noreferrer">WPScan: Customer Reviews for WooCommerce vulnerability record</a></li>
<li><a href="https://wordpress.org/plugins/customer-reviews-woocommerce/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org: Customer Reviews for WooCommerce plugin page</a></li>
</ul>
`;
