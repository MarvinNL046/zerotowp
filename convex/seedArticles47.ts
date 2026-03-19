import { internalMutation } from "./_generated/server";

// ─── Supporting: File Manager Plugin Review ───────────────────────────────────

export const seedFileManagerReview = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "file-manager-review";

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
      title: "File Manager Plugin Review: Convenient but Handle With Care",
      excerpt:
        "WP File Manager puts FTP-style file access right in your WordPress dashboard. I explain what it does, who should use it, and why you need to be careful about security before installing it.",
      content: fileManagerReviewContent,
      category: "plugins",
      tags: [
        "file manager",
        "wp file manager",
        "wordpress file manager",
        "wordpress plugins",
        "ftp alternative",
        "manage files wordpress",
        "wordpress security",
      ],
      seoTitle:
        "WP File Manager Plugin Review 2026 — Features, Security Risks & Alternatives",
      seoDescription:
        "WP File Manager lets you browse, edit, and upload files from WordPress without FTP. Here's an honest review of its features, security history, and who should actually use it.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing File Manager review article:", existing._id);
      return {
        message: "Updated existing File Manager review article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new File Manager review article:", postId);
      return {
        message: "Created new File Manager review article",
        id: postId,
      };
    }
  },
});

const fileManagerReviewContent = `
<img src="/images/blog/file-manager-review.webp" alt="WP File Manager plugin page on WordPress.org showing 700,000+ active installations and 4.7-star rating" />

<p>There's a moment every WordPress beginner hits: you need to edit a file — maybe a configuration file, a broken theme template, or a plugin file that needs a small tweak — and you realize you have no idea how to access it. FTP clients like FileZilla exist, but they come with a learning curve and credentials you may not have ready. That's the gap <strong>WP File Manager</strong> fills.</p>

<p>I've used this plugin on my own sites and seen it used on client sites. It's genuinely useful in the right situation. But I'd be doing you a disservice if I didn't lead with the security reality: this plugin has a documented history of critical vulnerabilities, including one that allowed unauthenticated remote code execution and affected over 700,000 sites in 2020. That doesn't mean you shouldn't use it — but it means you should go in with your eyes open.</p>

<h2>What Is WP File Manager?</h2>

<p><a href="https://wordpress.org/plugins/wp-file-manager/" target="_blank" rel="noopener noreferrer nofollow">WP File Manager</a> (plugin slug: <code>wp-file-manager</code>) is a WordPress plugin that gives you a full file manager interface directly inside your WordPress admin dashboard. Think of it as a browser-based version of your hosting control panel's file manager, but accessible from WordPress itself without needing to log into cPanel or configure an FTP client.</p>

<p>The plugin is built on the <a href="https://elFinder.github.io/" target="_blank" rel="noopener noreferrer nofollow">elFinder</a> open-source file manager library — the same library that powers file managers in many hosting control panels. It has 700,000+ active installs and a 4.7/5 rating from over 1,400 reviews on WordPress.org as of 2026.</p>

<img src="/screenshots/plugin-wp-file-manager.webp" alt="WP File Manager plugin page on WordPress.org showing installation stats, rating, and plugin description" />

<h2>Key Features</h2>

<h3>Browse, Upload, Edit, and Delete Files</h3>

<p>The core feature is a full file browser covering your entire WordPress installation. You can navigate folders, upload files via drag-and-drop, create new files and folders, rename items, move files between directories, and delete what you don't need — all without leaving the WordPress admin.</p>

<h3>Built-In Code Editor</h3>

<p>Double-click any PHP, CSS, JS, or HTML file and it opens in a code editor with syntax highlighting. This is genuinely useful for small, targeted edits like adjusting a theme's <code>functions.php</code> or tweaking a plugin's configuration. It's not a replacement for a proper IDE, but for quick fixes it beats downloading, editing, and re-uploading.</p>

<h3>Archive Support</h3>

<p>You can create zip archives directly from the file manager, compress folders for download, and extract zip files you've uploaded. This is handy for bulk uploads — upload a zip, extract in place, done — without needing shell access.</p>

<h3>No FTP Required</h3>

<p>This is the main selling point. If you're on shared hosting without easy SSH access, or you're managing a client site and don't have FTP credentials handy, WP File Manager gives you a workable alternative. For tasks like uploading a manually downloaded plugin or editing a config file, it's genuinely convenient.</p>

<h3>Multi-File Operations</h3>

<p>Select multiple files at once for bulk copy, move, delete, or compress operations. Drag and drop works across folders. The interface is responsive enough to use on tablets too.</p>

<h3>Free vs. Pro</h3>

<table>
<thead>
<tr>
<th>Feature</th>
<th>Free</th>
<th>Pro (File Manager Pro)</th>
</tr>
</thead>
<tbody>
<tr>
<td>Full file browser &amp; operations</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Built-in code editor</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Archive (zip/extract)</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Drag-and-drop upload</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Role-based folder access</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Private folders per user</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Frontend shortcode access</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Cloud storage (Google Drive, Dropbox, S3)</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>File type restrictions</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Email notifications</td>
<td>No</td>
<td>Yes</td>
</tr>
</tbody>
</table>

<p>The free version covers everything a solo WordPress administrator needs. The Pro version at <a href="https://filemanagerpro.io/" target="_blank" rel="noopener noreferrer nofollow">filemanagerpro.io</a> adds value mainly if you're managing a multi-user site and need to control which users can access which folders.</p>

<h2>The Security Problem You Need to Know About</h2>

<p>I won't bury this. In September 2020, a critical vulnerability (CVE-2020-25213) in versions 6.0–6.8 of WP File Manager allowed completely unauthenticated attackers to upload files and execute arbitrary code. No login required. Over 700,000 sites were exposed, and the vulnerability was actively exploited in the wild within days of discovery. Attackers used it to install backdoors, deface sites, and steal data.</p>

<p>The vulnerability was patched in version 6.9, released the same day it went public. But it remains one of the most significant WordPress plugin vulnerabilities in recent memory, and it's worth understanding why it happened: the plugin included the elFinder library with a file (<code>connector.minimal.php.dist</code>) that was renamed to <code>.php</code> during installation, making it directly executable without any access control.</p>

<p>More recently, version 7.2.1 was flagged by Wordfence for sensitive information exposure via backup filenames. This is a lower severity issue, but it shows that the security posture of this plugin warrants ongoing attention.</p>

<p><strong>Practical takeaways:</strong></p>
<ul>
<li>Always keep WP File Manager updated. Version 8.0.2 (current as of 2026) has no known critical vulnerabilities.</li>
<li>Use a security plugin like <a href="/best-security-plugins/">Wordfence or Solid Security</a> to monitor for suspicious file changes.</li>
<li>If you don't actively need it day-to-day, consider deactivating (not just closing the browser tab — actually deactivating) the plugin when you're not using it.</li>
<li>On high-traffic or e-commerce sites where a breach would be catastrophic, weigh whether the convenience is worth the exposure.</li>
</ul>

<h2>Pros and Cons</h2>

<p><strong>Pros</strong></p>
<ul>
<li>Eliminates the need for FTP or cPanel access for common file tasks</li>
<li>Clean, intuitive interface — very little learning curve</li>
<li>Built-in code editor with syntax highlighting</li>
<li>Archive support (zip/extract) without shell access</li>
<li>Free version covers everything most admins need</li>
<li>700,000+ installs and 4.7/5 rating — well-maintained plugin</li>
</ul>

<p><strong>Cons</strong></p>
<ul>
<li>History of critical security vulnerabilities — the 2020 RCE was severe</li>
<li>Any plugin with filesystem access is an attractive target for attackers</li>
<li>Not suitable for sites where multiple non-admin users need controlled file access (use Pro for that)</li>
<li>A misclick in the file manager can break your site just as effectively as a bad SSH command</li>
<li>No version control — if you overwrite something, it's gone unless you have a backup</li>
</ul>

<h2>Who Should Use WP File Manager?</h2>

<p><strong>Good fit:</strong> Solo WordPress admins on shared hosting who occasionally need to edit files, upload manually downloaded plugins, or fix a theme file without setting up FTP. If you're managing a personal site or a handful of client sites and you trust yourself not to accidentally delete critical files, it's a legitimate convenience tool.</p>

<p><strong>Not a good fit:</strong> High-traffic sites, WooCommerce stores processing real transactions, sites with sensitive user data, or any site where you have a reliable FTP workflow already in place. Also avoid if you're not disciplined about keeping plugins updated — a stale version of this plugin is a meaningful security liability.</p>

<h2>Alternatives</h2>

<h3>FTP Clients (FileZilla, Cyberduck)</h3>

<p><a href="https://filezilla-project.org/" target="_blank" rel="noopener noreferrer nofollow">FileZilla</a> is free, mature, and the gold standard for FTP access. The initial setup takes 10–15 minutes, but once configured you have direct access to all your files without running any additional software on your server. For sites where security is a priority, this is the safer approach — there's no attack surface on the WordPress side.</p>

<h3>cPanel File Manager</h3>

<p>If your host provides cPanel, you already have a fully-featured file manager at <code>yourdomain.com/cpanel</code> (or similar). It requires no plugin, runs outside WordPress, and is maintained by your hosting provider. I'd generally prefer this over WP File Manager for anything beyond quick edits.</p>

<h3>WordPress Theme/Plugin Editors</h3>

<p>WordPress has built-in theme and plugin file editors under <strong>Appearance → Theme File Editor</strong> and <strong>Plugins → Plugin File Editor</strong>. They're limited to theme and plugin files only, but for editing a <code>functions.php</code> or reviewing a plugin's code, they work fine without needing a third-party plugin.</p>

<h3>SSH / WP-CLI</h3>

<p>If your host supports SSH access, <a href="https://wp-cli.org/" target="_blank" rel="noopener noreferrer nofollow">WP-CLI</a> gives you powerful command-line control over WordPress — plugin management, database operations, file operations, and much more. Steeper learning curve, but the right tool for power users.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is WP File Manager safe to use in 2026?</h3>

<p>The current version (8.0.2) has no known critical vulnerabilities. The dangerous 2020 RCE vulnerability was patched long ago. That said, any plugin with direct filesystem access carries inherent risk. Keep it updated, pair it with a security plugin, and consider deactivating it when not actively in use.</p>

<h3>Does WP File Manager replace FTP?</h3>

<p>For many everyday tasks — uploading files, editing configs, managing archives — yes, it's a practical FTP alternative. But it doesn't give you the speed or reliability of a dedicated FTP client for large file transfers, and it adds server-side risk that FTP doesn't. For occasional tasks it's fine; for heavy file management, use a proper FTP client.</p>

<h3>Is the free version enough?</h3>

<p>For a single-admin WordPress site, yes. The free version gives you everything you need: full file browsing, drag-and-drop uploads, code editing, and archive management. The Pro version is only worth it if you need role-based folder access for multiple users or cloud storage integration.</p>

<h3>What's the best alternative to WP File Manager?</h3>

<p>For most sites, your hosting control panel's built-in file manager (cPanel, DirectAdmin, etc.) is the best no-plugin alternative. For heavy use, FileZilla is the FTP client I'd recommend. If you want another WordPress plugin option, <a href="https://wordpress.org/plugins/file-manager-advanced/" target="_blank" rel="noopener noreferrer nofollow">Advanced File Manager</a> is a solid alternative with a similar feature set.</p>

<h2>My Verdict</h2>

<p>WP File Manager is a well-made plugin that solves a real problem: it makes file management accessible to WordPress users who don't have FTP set up. For a personal site or low-stakes project, it's a reasonable tool to have in your toolkit. For anything where security matters — and that's most sites — go in with clear eyes about its vulnerability history, keep it updated religiously, and seriously consider whether your hosting control panel's file manager wouldn't serve you just as well without the added attack surface.</p>

<p>If you're building out your WordPress toolkit, also check out my guides on the <a href="/best-security-plugins/">best WordPress security plugins</a> and <a href="/must-have-wordpress-plugins/">must-have WordPress plugins</a> to make sure your site is covered on all fronts.</p>

<hr />

<p><small>Sources: <a href="https://wordpress.org/plugins/wp-file-manager/" target="_blank" rel="noopener noreferrer nofollow">WordPress.org — WP File Manager</a> · <a href="https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-plugins/wp-file-manager/file-manager-721-sensitive-information-exposure-via-backup-filenames" target="_blank" rel="noopener noreferrer nofollow">Wordfence — File Manager 7.2.1 Vulnerability</a> · <a href="https://unit42.paloaltonetworks.com/cve-2020-25213/" target="_blank" rel="noopener noreferrer nofollow">Palo Alto Unit 42 — CVE-2020-25213</a></small></p>
`;
