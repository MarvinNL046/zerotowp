import { internalMutation } from "./_generated/server";

// ─── Supporting: Backuply Plugin Review ─────────────────────────────────────

export const seedBackuplyReview = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "backuply-review";

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
      title: "Backuply Review: Is It Worth It? (2026)",
      excerpt:
        "Honest review of Backuply — WordPress backup plugin with cloud storage, one-click restore, and migration tools.",
      content: backuplyReviewContent,
      category: "plugins",
      tags: ["wordpress", "plugins", "backup", "migration"],
      seoTitle: "Backuply Review (2026): Features, Pricing & Alternatives",
      seoDescription:
        "Honest Backuply review for WordPress. Backup, restore, and migrate — features, pricing, pros and cons, and alternatives.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing Backuply review article:", existing._id);
      return {
        message: "Updated existing Backuply review article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new Backuply review article:", postId);
      return {
        message: "Created new Backuply review article",
        id: postId,
      };
    }
  },
});

const backuplyReviewContent = `
<img src="/images/blog/backuply-review.webp" alt="Backuply plugin page on WordPress.org showing backup, restore, migrate and clone features" />

<p>Backups are one of those things you never think about — until your site goes down and you wish you had one. Backuply is a WordPress backup plugin by Softaculous that promises simple backups with cloud storage, one-click restore, and site migration. It's trusted by over 700,000 WordPress sites and has a 4.5-star rating on WordPress.org.</p>

<p>I've tested quite a few backup plugins over the years. Here's an honest look at what Backuply does well, where it falls short, and whether it deserves a spot on your site.</p>

<h2>What Is Backuply?</h2>

<p><a href="https://wordpress.org/plugins/backuply/" target="_blank" rel="noopener noreferrer nofollow">Backuply</a> is a free WordPress plugin that creates full backups of your website — files and database — and lets you restore or migrate them with a single click. It's developed by Softaculous, the company behind the one-click installer that ships with most cPanel hosting providers. That background in server-level tooling shows in how the plugin handles backups under the hood.</p>

<p>The free version covers local backups, FTP, and Google Drive. The premium version adds scheduled automatic backups, more cloud storage destinations (Dropbox, OneDrive, Amazon S3, and more), and website cloning.</p>

<h2>Key Features</h2>

<h3>One-Click Backup and Restore</h3>

<p>Backuply keeps things simple. You click a button, the plugin creates a tar archive of your entire WordPress installation including the database, and you can restore it just as easily. No complicated multi-step wizards or confusing configuration screens. The backup history is sorted by date with the most recent first, making it easy to find what you need.</p>

<h3>Cloud Storage Integration</h3>

<p>The free version supports local backups, FTP, and Google Drive. The pro version adds FTPS, SFTP, Dropbox, Microsoft OneDrive, Amazon S3, WebDAV, and S3-compatible storage like DigitalOcean Spaces, Vultr Object Storage, and Cloudflare R2. That's a solid range of destinations — more than many competitors offer at this price point.</p>

<h3>Smart Retry Mechanism</h3>

<p>This is one of Backuply's standout features. If a backup fails partway through — because of a server timeout, memory limit, or a momentary hosting hiccup — the plugin picks up where it left off instead of starting over. On shared hosting where resources are tight, this alone can be the difference between a backup that completes and one that fails every time.</p>

<h3>Site Migration</h3>

<p>Since Backuply creates a complete tar archive of your WordPress install, you can use it to migrate your site to a different host or domain. Download the backup, upload it to the new server, and restore. It's not as polished as a dedicated migration tool, but it gets the job done without needing a separate plugin.</p>

<h3>Selective Backups</h3>

<p>The pro version lets you choose between full backups, files-only backups, or database-only backups. Database-only backups are especially useful for sites where the content changes frequently but the media files don't — they're smaller and faster to create.</p>

<h3>WP-CLI Support</h3>

<p>If you manage sites from the command line, Backuply supports WP-CLI commands for creating and managing backups. This is a nice touch for developers and agencies managing multiple sites.</p>

<h2>Free vs. Premium</h2>

<table>
<thead>
<tr>
<th>Feature</th>
<th>Free</th>
<th>Pro</th>
</tr>
</thead>
<tbody>
<tr>
<td>Local backups</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>FTP backup</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Google Drive</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Scheduled automatic backups</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Dropbox, OneDrive, Amazon S3</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>SFTP, FTPS, WebDAV</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>S3-compatible storage</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Selective backups (files/DB only)</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Website cloning</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Priority support</td>
<td>No</td>
<td>Yes</td>
</tr>
</tbody>
</table>

<p>Pricing starts at <strong>$18/year</strong> for Backuply Cloud (1 site, 10GB cloud storage, auto backups — no pro plugin needed), <strong>$39/year</strong> for Personal (1 site, all pro features), <strong>$69/year</strong> for Professional (5 sites), and <strong>$249/year</strong> for Business (unlimited sites, 100GB cloud storage).</p>

<h2>Pros and Cons</h2>

<h3>Pros</h3>

<ul>
<li>Clean, simple interface — no bloated dashboards or unnecessary complexity</li>
<li>Smart retry mechanism handles shared hosting limitations well</li>
<li>Free version includes Google Drive backup, which most competitors lock behind a paywall</li>
<li>Wide range of cloud storage options in the pro version</li>
<li>Affordable pricing — the $18/year Cloud plan is one of the cheapest automatic backup solutions available</li>
<li>Built by Softaculous, a company with deep server-level experience</li>
</ul>

<h3>Cons</h3>

<ul>
<li>Free version doesn't include automatic scheduled backups — you have to trigger them manually</li>
<li>No automatic backup rotation in the free tier, so you need to manually delete old backups</li>
<li>The migration feature works but isn't as user-friendly as dedicated migration plugins</li>
<li>Fewer tutorials and community resources compared to bigger backup plugins like UpdraftPlus</li>
<li>No real-time or incremental backups — every backup is a full snapshot</li>
</ul>

<h2>Who Should Use Backuply?</h2>

<p><strong>Good fit:</strong> Budget-conscious site owners who want a reliable backup solution with cloud storage. The free version with Google Drive is hard to beat for personal blogs and small sites. The $18/year Cloud plan is ideal if you just want automatic backups without dealing with pro plugin features. Agencies managing multiple sites will appreciate the WP-CLI support and the unlimited Business plan.</p>

<p><strong>Not a good fit:</strong> Large sites that need incremental or real-time backups, or site owners who want a set-it-and-forget-it free solution (you'll need pro for scheduled backups). If migration is your primary need, a dedicated tool like <a href="/all-in-one-wp-migration-review">All-in-One WP Migration</a> is more polished for that specific task.</p>

<h2>Best Alternatives</h2>

<p>If Backuply doesn't quite fit your needs, here are two solid alternatives worth considering:</p>

<ul>
<li><strong><a href="/wpvivid-review">WPvivid</a></strong> — Offers free scheduled backups and free cloud storage destinations that Backuply locks behind pro. A strong choice if you want more features without paying.</li>
<li><strong><a href="/all-in-one-wp-migration-review">All-in-One WP Migration</a></strong> — The go-to plugin for site migration specifically. If moving your site is the primary goal rather than ongoing backups, this is the better tool.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Is Backuply free?</h3>

<p>Yes, the core plugin is free on WordPress.org. The free version includes local backups, FTP, and Google Drive as backup destinations. You only need the paid version for automatic scheduling, additional cloud storage services, and selective backups.</p>

<h3>Is Backuply safe to use?</h3>

<p>Backuply is developed by Softaculous, a well-established company in the hosting industry. The plugin has a 4.5-star rating from 128 reviews on WordPress.org and is actively maintained (last updated February 2026). It creates standard tar archives, so your backups aren't locked into a proprietary format.</p>

<h3>Can Backuply migrate my WordPress site?</h3>

<p>Yes. Backuply creates a full archive of your WordPress files and database that you can restore on a different server or domain. The pro version also includes a cloning feature for creating duplicate sites. For straightforward migrations it works fine, though dedicated migration plugins offer more automation.</p>

<h3>How does Backuply compare to UpdraftPlus?</h3>

<p>UpdraftPlus offers free scheduled backups and more cloud destinations in its free tier, making it more feature-rich at the free level. Backuply's advantage is its simplicity, smaller footprint, and the smart retry mechanism that handles unreliable hosting better. Backuply's pro pricing is also significantly lower than UpdraftPlus Premium.</p>

<h3>Does Backuply work with multisite?</h3>

<p>Backuply supports standard WordPress installations. For multisite networks, you'll want to check the plugin's documentation for your specific setup, as support may vary depending on your network configuration and hosting environment.</p>

<hr />

<p><small>Sources: <a href="https://wordpress.org/plugins/backuply/" target="_blank" rel="noopener noreferrer nofollow">WordPress.org — Backuply</a> · <a href="https://backuply.com/pricing/" target="_blank" rel="noopener noreferrer nofollow">Backuply — Pricing</a></small></p>
`;
