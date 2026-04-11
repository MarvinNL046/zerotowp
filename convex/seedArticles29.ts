import { internalMutation } from "./_generated/server";

export const seedWordPressBackupGuide = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-backup-guide";

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
      title: "How to Backup Your WordPress Site (3 Methods, Step by Step)",
      excerpt:
        "I lost a client's entire website once because nobody set up backups. It was a $15,000 WooCommerce store, gone overnight after a botched plugin update. That was the day I learned that WordPress backups aren't optional. Here's exactly how to protect your site.",
      content: wordPressBackupGuideContent,
      category: "tutorials",
      tags: [
        "wordpress backup",
        "updraftplus",
        "backup plugin",
        "website backup",
        "wordpress security",
        "database backup",
        "restore wordpress",
        "backwpup",
      ],
      seoTitle: "How to Backup Your WordPress Site (2026 Step-by-Step Guide)",
      seoDescription:
        "Learn how to backup your WordPress site with UpdraftPlus, hosting tools, or manual methods. Step-by-step instructions for complete WordPress backups and restores.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing WordPress backup guide:", existing._id);
      return {
        message: "Updated existing WordPress backup guide",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new WordPress backup guide:", postId);
      return {
        message: "Created new WordPress backup guide",
        id: postId,
      };
    }
  },
});

const wordPressBackupGuideContent = `
<p>I'm going to tell you about the worst day of my WordPress career. Back in 2014, a client called me in a panic at 11 PM. Their WooCommerce store — a $15,000 build with thousands of products, custom integrations, and two years of order history — was completely gone. A plugin update had corrupted the database, and the hosting company's "daily backups" turned out to be nothing more than a marketing checkbox they never actually configured. We lost everything. Every product listing, every customer record, every order. I had to rebuild from scratch, and it cost my client weeks of downtime and thousands in lost revenue.</p>

<p>That was the day I made a rule I've never broken since: <strong>every WordPress site I touch gets a proper backup system on day one, before anything else.</strong> Not tomorrow. Not "when we get around to it." Day one. If you're reading this and your site doesn't have backups right now, stop everything and set this up today. I mean it. Everything else can wait.</p>

<h2>What a Complete WordPress Backup Includes</h2>

<p>Before we dive into the how, you need to understand what actually makes up your WordPress site. A lot of beginners think "backup" means copying a few files, but a WordPress site is actually two things working together, and you need both of them to restore your site properly.</p>

<p>First, there's the <strong>WordPress database</strong> — this is where all your content lives. Every blog post, every page, every comment, every WooCommerce order, every user account, all your plugin settings, your theme customizer options — it's all stored in a MySQL database. Lose this, and you lose all your content. Second, there's the <strong>file system</strong> — this includes WordPress core files, your <code>wp-content</code> folder (which contains your themes, plugins, and uploads like images and PDFs), and your <code>wp-config.php</code> configuration file. You need both the database AND the files to do a complete restore. A backup that only covers one of these is only half a backup, and I've seen people learn this the hard way.</p>

<p><strong>Pro tip:</strong> The <code>wp-content/uploads</code> folder is often the largest part of your backup. If you've been running a site for years with lots of images, this folder alone can be several gigabytes. Keep this in mind when choosing your backup storage — you'll need enough space.</p>

<h2>Method 1: UpdraftPlus (Easiest and Free)</h2>

<p>Honestly, if you're a beginner and you want the simplest, most reliable backup solution, <strong>UpdraftPlus is the one I recommend to everyone</strong>. I've installed it on hundreds of sites over the years, and it just works. It's free, it's been around forever, it has over 3 million active installations, and the restore process is genuinely foolproof. There are fancier options out there, but none that match UpdraftPlus's combination of reliability and simplicity for a free plugin.</p>

<img src="/screenshots/updraftplus-plugin.webp" alt="UpdraftPlus backup plugin page on WordPress.org showing 3+ million active installations and 4.8 star rating" />

<p>Here's exactly how to set it up, step by step:</p>

<h3>Step 1: Install UpdraftPlus</h3>

<p>Go to your WordPress dashboard and navigate to <strong>Plugins &rarr; Add New</strong>. Search for "UpdraftPlus" — it'll be the first result (look for the orange arrow logo). Click <strong>Install Now</strong>, then <strong>Activate</strong>. Once activated, you'll see a new <strong>Settings &rarr; UpdraftPlus Backups</strong> menu item in your dashboard sidebar. Click it to open the main UpdraftPlus dashboard.</p>

<h3>Step 2: Configure Your Remote Storage</h3>

<p>This is the most important part. Click the <strong>Settings</strong> tab at the top of the UpdraftPlus page. Here you'll see options for scheduling (we'll get to that) and remote storage. Under "Choose your remote storage," you'll see icons for Google Drive, Dropbox, Amazon S3, and others. I recommend <strong>Google Drive</strong> for most people — it's free (15 GB), reliable, and easy to connect. Click the Google Drive icon, then follow the authentication prompts to connect your Google account. UpdraftPlus will walk you through the OAuth process.</p>

<p><strong>Warning:</strong> Never store your backups only on the same server as your website. If the server dies, you lose both your site AND your backups. That's like keeping your spare house key inside the house. Always use remote storage — Google Drive, Dropbox, or Amazon S3.</p>

<h3>Step 3: Set Your Backup Schedule</h3>

<p>Still in the Settings tab, set your backup frequency. For the <strong>Files backup schedule</strong>, I recommend weekly for most sites and daily for active blogs or WooCommerce stores. For the <strong>Database backup schedule</strong>, set it to daily — databases are small and change frequently. Set "retain this many scheduled backups" to at least 3, so you always have multiple restore points. Click <strong>Save Changes</strong> at the bottom.</p>

<h3>Step 4: Run Your First Backup</h3>

<p>Go back to the <strong>Backup / Restore</strong> tab and click the big blue <strong>Backup Now</strong> button. A popup will appear with checkboxes — make sure both "Include your database in the backup" and "Include your files in the backup" are checked. Also check "Send this backup to remote storage." Click <strong>Backup Now</strong> and watch the progress bar. Your first backup might take a few minutes depending on your site size. Once it's done, verify the backup appears in both UpdraftPlus and your Google Drive folder.</p>

<p><strong>Pro tip:</strong> After your first backup, go into your Google Drive and actually look at the backup files. You should see several zip files (for plugins, themes, uploads, and others) plus a database file. If you see them there, congratulations — you're protected. If you don't, something went wrong with the remote storage connection and you need to fix it before you forget.</p>

<h2>Method 2: Your Hosting Provider's Built-in Backups</h2>

<p>Most quality <a href="/how-to-choose-wordpress-hosting/">WordPress hosting providers</a> include some form of automatic backup in their plans. This is your second safety net, and honestly, it's one of the reasons I always tell beginners to pick a reputable host over the cheapest option available. Here's what the major hosts offer:</p>

<img src="/screenshots/backwpup-plugin.webp" alt="BackWPup plugin page on WordPress.org - another popular WordPress backup and restore plugin" />

<table>
<thead>
<tr>
<th>Hosting Provider</th>
<th>Backup Frequency</th>
<th>Retention</th>
<th>One-Click Restore</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SiteGround</strong></td>
<td>Daily automatic</td>
<td>30 days</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Hostinger</strong></td>
<td>Daily/weekly</td>
<td>7-30 days</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Bluehost</strong></td>
<td>Daily (via CodeGuard on higher plans)</td>
<td>30 days</td>
<td>Yes</td>
</tr>
<tr>
<td><strong>Cloudways</strong></td>
<td>On-demand + scheduled</td>
<td>Configurable</td>
<td>Yes</td>
</tr>
</tbody>
</table>

<p><strong>SiteGround</strong> is probably the best in this department — their daily backups are automatic on all plans, stored separately from your server, and the restore process takes literally two clicks in the Site Tools panel. Go to <strong>Site Tools &rarr; Security &rarr; Backups</strong>, pick a date, and hit Restore. I've done this dozens of times for clients and it works flawlessly. <strong>Hostinger</strong> offers similar functionality through their hPanel under <strong>Files &rarr; Backups</strong>.</p>

<p>However, here's something most tutorials won't tell you: <strong>don't rely solely on your host's backups.</strong> I've seen hosting companies lose backup data, change their backup policies without notice, or have their backup systems fail silently. Your host's backup is a convenient safety net, but it should always be paired with your own independent backup via UpdraftPlus or a similar plugin. Two backup systems are infinitely better than one.</p>

<h2>Method 3: Manual Backup via cPanel and phpMyAdmin</h2>

<p>If you're a developer or you just want to understand what's happening under the hood, you can do a manual backup through cPanel. This is also useful when you're about to do something risky — like a major WordPress version update or a server migration — and you want a guaranteed clean snapshot. I still do manual backups before every major operation, even with automated backups running.</p>

<h3>Backing Up Your Files</h3>

<p>Log into cPanel (usually at <code>yourdomain.com/cpanel</code> or through your host's dashboard). Open the <strong>File Manager</strong> and navigate to your <code>public_html</code> directory (or whatever your WordPress root directory is). Select all files and folders, right-click, and choose <strong>Compress</strong>. Pick ZIP format, give it a descriptive name like <code>backup-2026-03-15.zip</code>, and compress. Then download the ZIP file to your local computer. This gives you a complete copy of all your WordPress files.</p>

<h3>Backing Up Your Database</h3>

<p>Still in cPanel, open <strong>phpMyAdmin</strong>. In the left sidebar, click on your WordPress database (it usually has "wp" in the name — check your <code>wp-config.php</code> file for the exact name if you're not sure). Click the <strong>Export</strong> tab at the top. Select "Quick" export method and "SQL" format, then click <strong>Go</strong>. A <code>.sql</code> file will download. Store this file alongside your ZIP backup.</p>

<p><strong>Pro tip:</strong> If you want a cleaner export, use the "Custom" export method instead of "Quick." This lets you add <code>DROP TABLE</code> statements (which makes restoring cleaner) and choose compression (gzip makes the file much smaller). I always use Custom export for production backups.</p>

<p><strong>Warning:</strong> Manual backups are only useful if you actually remember to do them. This is why I recommend UpdraftPlus as your primary backup method — it runs on autopilot. Think of manual backups as your "belt and suspenders" approach before risky operations, not your daily strategy.</p>

<h2>Backup Schedule Recommendations</h2>

<p>Not every site needs the same backup schedule. Over the years, I've settled on these recommendations based on how active a site is:</p>

<table>
<thead>
<tr>
<th>Site Type</th>
<th>Database Backup</th>
<th>Files Backup</th>
<th>Keep How Many</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>WooCommerce / membership site</strong></td>
<td>Every 4-8 hours</td>
<td>Daily</td>
<td>14+ copies</td>
</tr>
<tr>
<td><strong>Active blog</strong> (posts multiple times/week)</td>
<td>Daily</td>
<td>Daily</td>
<td>7-14 copies</td>
</tr>
<tr>
<td><strong>Regular blog</strong> (weekly posts)</td>
<td>Daily</td>
<td>Weekly</td>
<td>5-7 copies</td>
</tr>
<tr>
<td><strong>Static / brochure site</strong></td>
<td>Weekly</td>
<td>Weekly</td>
<td>3-5 copies</td>
</tr>
</tbody>
</table>

<p>The key insight is that your <strong>database changes far more frequently</strong> than your files. Every new comment, every WooCommerce order, every settings change goes into the database. Your files only change when you upload new media, install plugins, or update themes. So it makes sense to back up the database more often. For a WooCommerce store, losing even a few hours of orders can be a nightmare — I've seen store owners lose entire days of sales data because their backup schedule wasn't aggressive enough.</p>

<p><strong>Pro tip:</strong> UpdraftPlus lets you set different schedules for files and database. Use this. There's no reason to back up 5 GB of uploads every day if they haven't changed since last week.</p>

<h2>Where to Store Your Backups</h2>

<p>I mentioned this earlier, but it's worth hammering home: <strong>never store backups only on the same server as your website.</strong> I've seen this mistake so many times it hurts. Your server's hard drive fails, and you lose both the site and the backup in one shot. Here are the best remote storage options I recommend, ranked by how practical they are for most people:</p>

<img src="/screenshots/jetpack-backup-plugin.webp" alt="Jetpack plugin page on WordPress.org showing security, backup, speed and growth features" />

<p><strong>Google Drive</strong> — My top pick for most people. You get 15 GB free with any Google account, it integrates directly with UpdraftPlus, and you probably already have a Google account. For a typical blog, 15 GB is more than enough for several weeks of backups. If you need more space, Google One plans start at a couple of dollars per month for 100 GB.</p>

<p><strong>Dropbox</strong> — Another solid free option with 2 GB of free storage (less than Google Drive, but fine for small sites). The UpdraftPlus integration works well, and Dropbox has excellent file versioning so you can recover older versions of backup files. I use Dropbox for a few client sites where the client already had a Dropbox Business account.</p>

<p><strong>Amazon S3</strong> — The professional choice. It's incredibly cheap (a few cents per GB per month), virtually unlimited in capacity, and extremely reliable (99.999999999% durability — that's eleven 9s). The downside is that it's more complex to set up than Google Drive. I use S3 for high-value client sites and WooCommerce stores where losing data isn't an option. If you're running a serious <a href="/cost-to-build-wordpress-site/">business site</a>, S3 is worth the extra setup effort.</p>

<p><strong>The 3-2-1 rule:</strong> For critical sites, I follow the 3-2-1 backup rule: keep <strong>3</strong> copies of your data, on <strong>2</strong> different types of storage, with <strong>1</strong> copy offsite. In practice, that means UpdraftPlus backing up to Google Drive (copy 1 offsite), your host's daily backup (copy 2 on server), and an occasional manual download to your local computer (copy 3 different media). Overkill for a personal blog? Maybe. But when you're running a <a href="/how-to-make-a-wordpress-website/">business website</a>, you'll sleep better knowing your data is safe in three places.</p>

<h2>How to Restore from a Backup</h2>

<p>Having backups is only half the equation — you also need to know how to restore them when disaster strikes. The good news is that UpdraftPlus makes the restore process almost embarrassingly simple. Here's exactly what to do:</p>

<p>Go to <strong>Settings &rarr; UpdraftPlus Backups</strong> in your WordPress dashboard. Scroll down to the <strong>Existing Backups</strong> section. You'll see a list of all your backups with dates. Find the backup you want to restore from and click the <strong>Restore</strong> button next to it. UpdraftPlus will ask you which components to restore — you can choose from Plugins, Themes, Uploads, Other files, and Database. For a complete restore, check all of them. Click <strong>Next</strong>, then <strong>Restore</strong>.</p>

<p>UpdraftPlus will download the backup files from your remote storage (if they're not already on the server), unpack them, and restore everything. The process usually takes a few minutes. When it's done, you'll see a success message. Log back into your site and verify everything looks correct — check your homepage, a few posts, your <a href="/must-have-plugins-new-site/">plugins page</a>, and your theme settings.</p>

<p><strong>Warning:</strong> If your WordPress dashboard is completely inaccessible (white screen of death, database connection error, etc.), you can still restore by manually uploading the UpdraftPlus plugin and backup files via FTP or cPanel File Manager. Install a fresh WordPress, activate UpdraftPlus, upload your backup files to <code>/wp-content/updraft/</code>, and then use the UpdraftPlus dashboard to detect and restore them. I've done this procedure more times than I'd like to admit, and it works every time.</p>

<p><strong>Pro tip:</strong> Test your backup restoration at least once. Don't wait until disaster strikes to find out if your backups actually work. Set up a <a href="/how-to-install-wordpress">staging site</a> or local WordPress installation, restore a backup to it, and verify everything functions correctly. I do this quarterly for all my important sites. A backup you've never tested is a backup you can't trust. For more hands-on guides like this one, explore our <a href="/tutorials">WordPress tutorials</a> section.</p>

<h2>Common Backup Mistakes to Avoid</h2>

<p>After managing backups on hundreds of WordPress sites, I've seen every mistake in the book. Here are the ones that catch people most often:</p>

<ul>
<li><strong>Only backing up files, not the database</strong> — Your content lives in the database. Files without a database give you an empty WordPress shell.</li>
<li><strong>Storing backups only on the web server</strong> — Server dies, backups die with it. Always use remote storage.</li>
<li><strong>Never testing restores</strong> — A backup file that's corrupted or incomplete is worthless. Test your restores.</li>
<li><strong>Keeping only one backup</strong> — If your latest backup captured a hacked site, you need an older clean backup to fall back on. Keep at least 3-5 copies.</li>
<li><strong>Backing up but not monitoring</strong> — UpdraftPlus can send email notifications when backups complete or fail. Enable these. I've had backup jobs silently fail for weeks because nobody was monitoring them.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>How often should I backup my WordPress site?</h3>
<p>It depends on how often your content changes. For most blogs, daily database backups and weekly file backups are sufficient. For WooCommerce stores or membership sites where data changes constantly, back up the database every 4-8 hours and files daily. The question to ask yourself is: "How much data can I afford to lose?" If losing a day's worth of orders would be devastating, you need more frequent backups.</p>

<h3>Is UpdraftPlus really free?</h3>
<p>Yes, the core plugin is completely free and includes everything most sites need: scheduled backups, remote storage to Google Drive or Dropbox, and one-click restore. The premium version adds features like incremental backups, more storage options (OneDrive, Azure, SFTP), automatic pre-update backups, and migration tools. Honestly, the free version is more than enough for most WordPress sites. I only recommend premium for WooCommerce stores or sites that need incremental backups to save server resources.</p>

<h3>Can I backup my WordPress site without a plugin?</h3>
<p>Yes, using the manual method through cPanel and phpMyAdmin that I described above. You can also use WP-CLI commands (<code>wp db export</code> for the database) or write a custom bash script if you're comfortable with the command line. However, for most people, a plugin like UpdraftPlus is far more practical because it automates the process and handles both files and database in one click. Manual backups are great as an additional layer, but they shouldn't be your only backup strategy because you'll inevitably forget.</p>

<h3>What's the difference between a backup and a staging site?</h3>
<p>A backup is a snapshot of your site at a specific point in time that you store for recovery purposes. A staging site is a live copy of your site where you can test changes before pushing them to production. They serve different purposes: backups protect against data loss, while staging sites protect against bad updates or code changes. Ideally, you should have both. Many <a href="/how-to-choose-wordpress-hosting/">quality hosts</a> offer one-click staging as part of their plans.</p>

<h3>My site got hacked — can I restore from a backup to fix it?</h3>
<p>Yes, but with an important caveat: you need to restore from a backup that was created <em>before</em> the hack occurred. This is why keeping multiple backup copies over several weeks is crucial. If your only backup is from yesterday and the hack happened three days ago, that backup is also compromised. After restoring a clean backup, immediately update all your passwords, update WordPress core and all <a href="/best-security-plugins/">security plugins</a>, scan for remaining malware, and patch whatever vulnerability the hacker exploited in the first place.</p>
`;
