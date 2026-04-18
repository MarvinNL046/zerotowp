import { internalMutation } from "./_generated/server";

export const seedWordPress694SecurityCleanup = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-6-9-4-security-cleanup-april-2026";

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
      title: "WordPress 6.9.4 Released: The Emergency Security Cleanup for 6.9.2 and 6.9.3",
      excerpt:
        "WordPress 6.9.4 shipped on March 11, 2026 to finish the security patches that 6.9.2 and 6.9.3 failed to fully apply. Here is what it fixes, why it matters, and how to update safely.",
      content: wordpress694SecurityCleanupContent,
      category: "news",
      tags: [
        "wordpress 6.9.4",
        "wordpress security update",
        "wordpress maintenance release",
        "pclzip path traversal",
        "getid3 xxe",
        "wordpress notes authorization bypass",
        "wordpress security 2026",
      ],
      seoTitle: "WordPress 6.9.4: Emergency Security Release (March 2026)",
      seoDescription:
        "WordPress 6.9.4 finishes the security fixes missed in 6.9.2 and 6.9.3. Update now: PclZip, getID3 XXE, and Notes authorization bypass. Here is how.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing WordPress 6.9.4 security release article",
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
      message: "Created new WordPress 6.9.4 security release article",
      id: postId,
    };
  },
});

const wordpress694SecurityCleanupContent = `
<p><strong>WordPress 6.9.4 is the release that fixes what 6.9.2 and 6.9.3 failed to fully patch.</strong> It landed on March 11, 2026, one day after the emergency 6.9.2 security release, after the WordPress Security Team discovered that not all of the previous fixes were fully applied. If you are on any 6.9.x branch, this is the version you need to be on.</p>

<p><em>Last updated April 18, 2026.</em> Every fact here is cross-referenced with the official announcement on wordpress.org/news, the HelpHub version page, and the WordPress VIP advisory. CVE numbers not confirmed at a primary source are flagged as pending.</p>

<img src="/images/blog/wordpress-6-9-4-security-cleanup-april-2026.webp" alt="WordPress 6.9.4 emergency security release March 11 2026 PclZip getID3 Notes authorization bypass" />

<h2>TL;DR: What You Need to Know</h2>

<ul>
<li><strong>Release date:</strong> March 11, 2026, released by John Blackbourn.</li>
<li><strong>Why it exists:</strong> 6.9.2 (March 10) and 6.9.3 (March 10) shipped security fixes that were not fully applied. 6.9.4 finishes the job.</li>
<li><strong>What it patches:</strong> PclZip path traversal, an authorization bypass in the Notes feature, and an XXE in the external getID3 library.</li>
<li><strong>Who should update:</strong> Everyone running any 6.9.x version. WordPress only actively supports the most recent release, so moving to 6.9.4 is the safe path.</li>
<li><strong>How:</strong> Dashboard &rarr; Updates &rarr; Update Now, WP-CLI <code>wp core update</code>, or let background auto-updates roll it out.</li>
</ul>

<h2>What WordPress 6.9.4 Actually Fixes</h2>

<p>The official release note from John Blackbourn is blunt: 6.9.2 addressed 10 security issues, 6.9.3 fixed a template-loading regression that 6.9.2 introduced, but after shipping the Security Team discovered that <em>not all</em> of those fixes were fully applied. 6.9.4 contains the additional fixes required to close the gaps.</p>

<p>Three issues are explicitly called out in the 6.9.4 announcement:</p>

<table>
<thead>
<tr>
<th>Issue</th>
<th>Component</th>
<th>Reported by</th>
<th>CVE</th>
</tr>
</thead>
<tbody>
<tr>
<td>Path traversal</td>
<td>PclZip (archive extraction, <code>/wp-admin/includes/file.php</code>)</td>
<td>Francesco Carlucci and kaminuma (independently)</td>
<td>Pending CVE</td>
</tr>
<tr>
<td>Authorization bypass</td>
<td>Notes feature (REST comments controller)</td>
<td>kaminuma</td>
<td>CVE-2026-3906 (CVSS 4.3, medium)</td>
</tr>
<tr>
<td>XXE (XML External Entity)</td>
<td>External getID3 library (<code>/wp-includes/ID3/getid3.lib.php</code>)</td>
<td>Youssef Achtatal</td>
<td>Pending CVE</td>
</tr>
</tbody>
</table>

<p>The HelpHub version page also thanks Thomas Kr&auml;ftner for responsible disclosure related to this cleanup cycle. The <code>List of files revised</code> section confirms the three files touched:</p>

<ul>
<li><code>/wp-admin/includes/file.php</code> (PclZip path traversal)</li>
<li><code>/wp-includes/ID3/getid3.lib.php</code> (getID3 XXE)</li>
<li><code>/wp-includes/rest-api/endpoints/class-wp-rest-comments-controller.php</code> (Notes authorization bypass)</li>
</ul>

<p>No npm/Composer packages were revised in 6.9.4. The WordPress security team also coordinated with James Heinrich, the maintainer of getID3, to publish a fixed upstream version on GitHub.</p>

<h3>About CVE-2026-3906 specifically</h3>

<p>Of the three fixes, only the Notes authorization bypass has a publicly detailed CVE at the time of writing. <strong>CVE-2026-3906</strong> affects WordPress 6.9 through 6.9.1 (partially fixed in 6.9.2/6.9.3, completed in 6.9.4), classified as <strong>CWE-862 Missing Authorization</strong>, CVSS v3.1 base score <strong>4.3 (medium)</strong>. The REST comments controller did not verify the <code>edit_post</code> capability, so an authenticated subscriber-level user could create Notes on any post. Public CVE assignments for the PclZip traversal and the getID3 XXE were still pending at time of writing.</p>

<h2>Why This Release Matters Right Now</h2>

<p>March and April 2026 have been a rough stretch for the WordPress ecosystem. Within a few weeks site owners have had to respond to three separate waves:</p>

<ol>
<li>WordPress core released three versions in 24 hours (6.9.2, 6.9.3 and 6.9.4) after the initial security fixes broke sites and then turned out to be incomplete.</li>
<li>A massive supply-chain compromise forced WordPress.org to close all 31 plugins from the Essential Plugin author in early April &mdash; see my deep-dive on the <a href="/essential-plugin-supply-chain-backdoor-attack/">Essential Plugin supply-chain backdoor attack</a>.</li>
<li>A second supply-chain incident hit the commercial <a href="/smart-slider-3-pro-backdoor-attack-april-2026/">Smart Slider 3 Pro backdoor</a>, affecting paid Nextend users.</li>
</ol>

<p>In that context, 6.9.4 is not just a maintenance release. It is the <em>foundation</em>. If your core install is still on 6.9, 6.9.1, 6.9.2 or 6.9.3 while attackers are already hunting plugin backdoors on production sites, you are stacking risk. Close the core gap first, then deal with the plugin audit.</p>

<h2>How to Update to WordPress 6.9.4 Safely</h2>

<p>For most sites this is a one-click update. For high-traffic or ecommerce sites I still recommend a deliberate process.</p>

<h3>Step 1 &mdash; Back up before you touch anything</h3>

<p>Every update checklist starts the same way. Take a full backup (files + database) and verify it downloads cleanly before you click Update.</p>

<p><em>Affiliate note:</em> I use <a href="https://updraftplus.com/" target="_blank" rel="nofollow noopener noreferrer">UpdraftPlus</a> for scheduled and pre-update backups on WordPress. The free version is enough for most sites; Premium adds incremental backups and better offsite storage.</p>

<h3>Step 2 &mdash; Update from the Dashboard</h3>

<p>Log in, go to <strong>Dashboard &rarr; Updates</strong>, and click <strong>Update to 6.9.4</strong>. If your host or your site has automatic background updates enabled, 6.9.4 should already be installing itself &mdash; check your WordPress admin footer or the Site Health tool to confirm.</p>

<h3>Step 3 &mdash; Or use WP-CLI</h3>

<p>On managed servers and staging environments, WP-CLI is faster and less error-prone:</p>

<pre><code>wp core update --version=6.9.4
wp core update-db
wp core verify-checksums</code></pre>

<p><code>verify-checksums</code> compares your installed core files with the signed manifest from WordPress.org. If any file has been tampered with (for example by an earlier plugin compromise), you will see it here.</p>

<h3>Step 4 &mdash; Test on staging and keep a monitor running</h3>

<p>For WooCommerce, membership, and high-traffic sites, clone to staging, apply 6.9.4 there, and click through checkout or login before touching production. 6.9.4 is a targeted security patch (three files), so breakage is unlikely, but a 10-minute staging pass has saved me more than one bad morning.</p>

<p><em>Affiliate note:</em> For ongoing vulnerability monitoring I recommend <a href="https://patchstack.com/" target="_blank" rel="nofollow noopener noreferrer">Patchstack</a> or <a href="https://www.wordfence.com/" target="_blank" rel="nofollow noopener noreferrer">Wordfence</a>. Patchstack ships virtual patches faster for plugin CVEs; Wordfence has the strongest malware scanner in the free tier. See my <a href="/wordpress-security-complete-guide/">WordPress security complete guide</a> for the full hardening stack.</p>

<h2>Who Built This Release</h2>

<p>WordPress 6.9.4 was released by <strong>John Blackbourn</strong> (johnbillion), who also led the 6.9.2 security release the day before. The 6.9.2 contributor list &mdash; which rolled directly into 6.9.4 because 6.9.4 finishes that work &mdash; credits Dennis Snell, Alex Concha, Jon Surrell, Isabel Brison, Peter Wilson, Jonathan Desrosiers, Jb Audras, Luis Herranz, Aaron Jorbin, Weston Ruter and Dominik Schilling, alongside the external security researchers credited above. The WordPress security team also coordinated the upstream getID3 patch with maintainer James Heinrich. The official 6.9.4 post does not publish a dedicated 6.9.4-only contributor list.</p>

<h2>What About WordPress 7.0?</h2>

<p>7.0 is still in release-candidate territory. RC1 dropped on March 24, 2026 and RC2 on March 26, 2026. The official release has slipped from the original early-2026 target &mdash; see my <a href="/wordpress-7-0-complete-guide/">WordPress 7.0 complete guide</a> for what changed, what is still landing, and when to actually expect the stable build.</p>

<p>In the meantime, <strong>6.9.x is the active maintenance branch</strong> and 6.9.4 is the current secure version. Do not wait for 7.0 before you apply today's security fixes.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is WordPress 6.9.4 safe to auto-update?</h3>
<p>Yes. The whole reason 6.9.4 exists is that 6.9.2 shipped incomplete fixes, and the point of 6.9.4 is to close those gaps. It only touches three files, and automatic background updates are the recommended delivery channel for security releases. If you manage multiple sites and have auto-updates on, 6.9.4 has likely already rolled out.</p>

<h3>Will WordPress 6.9.4 break my plugins or theme?</h3>
<p>Very unlikely. 6.9.4 is a targeted security patch &mdash; not a feature release. It edits three files: the file-handling helper, the getID3 library, and the REST comments controller. Unless a plugin is doing something unusual with those surfaces, compatibility should be unchanged from 6.9.</p>

<h3>Do I need to update immediately, or can I wait?</h3>
<p>Update immediately. The security team explicitly calls this out: "Because this is a security release, it is recommended that you update your sites immediately." With the April 2026 plugin supply-chain wave in play, you want every known core hole closed.</p>

<h3>How do I know if I am already on 6.9.4?</h3>
<p>Log in to WordPress and look at the footer of any admin page &mdash; it prints the version. You can also go to <strong>Tools &rarr; Site Health &rarr; Info &rarr; WordPress</strong>, or run <code>wp core version</code> on the command line. If it says 6.9.4, you are current.</p>

<h3>What happened to 6.9.2 and 6.9.3? Should I skip them?</h3>
<p>Effectively, yes. 6.9.2 was the emergency security release that shipped partial fixes and caused a template-loading regression on some sites. 6.9.3 was the same-day bug-fix release for that regression, plus a beta 4 cut. 6.9.4 is the correct landing spot. If you are on 6.9.2 or 6.9.3, go straight to 6.9.4.</p>

<h3>Is 6.9.4 the last release before 7.0?</h3>
<p>Possibly, but there is no guarantee. WordPress ships minor maintenance releases when they are needed. Until 7.0 hits stable, expect more point releases if another security issue surfaces.</p>

<h3>Can I delay 6.9.4 if my last update broke my site?</h3>
<p>Briefly, yes &mdash; apply 6.9.4 on staging, reproduce your workflow, then push to production. Do not sit on 6.9.0&ndash;6.9.3 indefinitely. See <a href="/how-to-make-a-wordpress-website/">how to make a WordPress website</a> for a cleaner staging setup.</p>

<h2>Primary Sources</h2>

<ul>
<li><a href="https://wordpress.org/news/2026/03/wordpress-6-9-4-release/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org News: WordPress 6.9.4 Release (March 11, 2026)</a></li>
<li><a href="https://wordpress.org/documentation/wordpress-version/version-6-9-4/" target="_blank" rel="nofollow noopener noreferrer">WordPress HelpHub: Version 6.9.4 (changelog and files revised)</a></li>
<li><a href="https://wordpress.org/news/2026/03/wordpress-6-9-2-release/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org News: WordPress 6.9.2 Release (contributor list and original 10-issue advisory)</a></li>
<li><a href="https://freshysites.com/resources/wordpress-security-bulletin-wordpress-core-vulnerability-cve-2026-3906/" target="_blank" rel="nofollow noopener noreferrer">Freshy Security Bulletin: CVE-2026-3906 (Notes authorization bypass, CVSS 4.3)</a></li>
<li><a href="https://github.com/JamesHeinrich/getID3/releases" target="_blank" rel="nofollow noopener noreferrer">James Heinrich: upstream getID3 patched release</a></li>
</ul>
`;
