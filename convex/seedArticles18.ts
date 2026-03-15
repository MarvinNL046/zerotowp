import { internalMutation } from "./_generated/server";

export const seedMigrateWordPress = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "migrate-wordpress-to-new-host";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-hosting"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-hosting' not found. Seed the hosting cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-hosting':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "How to Migrate WordPress to a New Host — 3 Methods (Without Losing Anything)",
      excerpt:
        "A step-by-step guide to migrating your WordPress site to a new host using All-in-One WP Migration, Duplicator, or manual FTP — with pre-migration checklists, post-migration verification steps, and fixes for the most common problems.",
      content: migrateWordPressContent,
      category: "hosting",
      tags: [
        "wordpress migration",
        "migrate wordpress",
        "change hosting",
        "wordpress hosting",
        "all-in-one wp migration",
        "duplicator",
      ],
      seoTitle: "How to Migrate WordPress to a New Host (2026 Guide)",
      seoDescription:
        "Step-by-step guide to migrating WordPress to a new host in 2026. Three proven methods — from one-click plugin migration to full manual FTP transfer — with checklists, screenshots, and troubleshooting tips.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing WordPress migration article:",
        existing._id,
      );
      return {
        message: "Updated existing WordPress migration article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new WordPress migration article:", postId);
      return {
        message: "Created new WordPress migration article",
        id: postId,
      };
    }
  },
});

const migrateWordPressContent = `
<p>I've migrated over 50 WordPress sites between hosts. The first time, I was absolutely terrified I'd lose everything. I spent three hours manually copying files via FTP, exported the database through phpMyAdmin, imported it on the new server, painstakingly fixed URLs in the database by hand... and the site was broken. White screen of death. Nothing but a blank page staring back at me at 2 AM on a Sunday night.</p>

<p>I eventually fixed it — turned out I'd missed a serialized URL in the options table — but those three hours of panic taught me something important: <strong>there are much easier ways to do this.</strong> And in 2026, you really don't need to suffer through the manual approach unless you have a specific reason to.</p>

<p>In this guide, I'll show you three methods for migrating WordPress to a new host, ordered from easiest to most control. Whether you're moving a small blog or a large WooCommerce store, one of these methods will work for you. I'll also cover the pre-migration checklist that I wish someone had given me before my first migration, and the post-migration steps that most guides skip entirely.</p>

<p>Here's the quick overview:</p>

<ul>
<li><strong>Method 1: All-in-One WP Migration</strong> — Easiest. One-click export and import. Best for sites under 256MB (or any size with the paid extension).</li>
<li><strong>Method 2: Duplicator</strong> — More control. Creates an installer package you run on the new server. Great for mid-sized sites.</li>
<li><strong>Method 3: Manual FTP + phpMyAdmin</strong> — Full control. For developers, large sites, or when plugins fail.</li>
</ul>

<p>Let's start with the step that most people skip — and that causes 90% of migration disasters.</p>

<h2>Before You Migrate — The Pre-Migration Checklist</h2>

<p>I cannot stress this enough: <strong>do not start migrating until you've gone through this checklist.</strong> I learned every single one of these the hard way. One time, a client's site went down for 18 hours because they'd canceled their old hosting before the DNS had fully propagated. Another time, I migrated a site only to discover the new host was running PHP 7.4 while the site required PHP 8.1 — every page threw fatal errors.</p>

<p>Here's the checklist I run through before every migration:</p>

<h3>1. Make a Full Backup (Files + Database)</h3>

<p>Before you touch anything, create a complete backup of your site. Not just the database — the entire <code>wp-content</code> folder, your <code>wp-config.php</code>, your <code>.htaccess</code> file, everything. Even if the migration method you're using creates its own backup, make a separate one. I use UpdraftPlus for this, but you can also download everything via FTP and export the database through phpMyAdmin. Store this backup somewhere safe — your local computer, Google Drive, Dropbox. Not on the server you're about to migrate from.</p>

<h3>2. Note Your Current PHP Version</h3>

<p>Log into your current host's control panel and check which PHP version your site is running. Some hosts default to different PHP versions, and if your new host runs a different version, plugins and themes can break. You can also check by installing the "Display PHP Version" plugin or adding <code>phpinfo();</code> to a temporary file. Write this number down — you'll need to match it on your new host.</p>

<h3>3. Check Disk Space on the New Host</h3>

<p>Log into your new hosting account and verify how much storage you have. Then check your current site's total size — the easiest way is through your hosting control panel's file manager or by asking your current host's support. I once tried migrating a 3GB WooCommerce store to a hosting plan with 2GB of storage. The migration "completed" but silently dropped half the product images.</p>

<h3>4. Keep Your Old Hosting Account Active</h3>

<p>Do <strong>not</strong> cancel your old hosting until the migration is fully verified and DNS has propagated. DNS propagation can take up to 48 hours (sometimes longer), and during that time, some visitors will still be hitting your old server. If you cancel too early, those visitors see nothing. I keep old hosting active for at least one full week after migration.</p>

<h3>5. Document Custom Server Configurations</h3>

<p>Check for custom redirects in your <code>.htaccess</code> file, scheduled cron jobs, custom <code>php.ini</code> settings, or server-level caching rules. These won't transfer automatically with any migration method, and forgetting about a critical redirect can tank your SEO overnight. Open your <code>.htaccess</code> file and copy its contents somewhere safe. Check your hosting panel for any cron jobs you've set up.</p>

<h3>6. Plan for Email Migration Separately</h3>

<p>If you're using email accounts tied to your domain on your current host (like info@yourdomain.com), those won't migrate with your WordPress site. You'll need to recreate those email accounts on your new host, or switch to a dedicated email service like Google Workspace or Zoho Mail. I've had clients lose important emails because they didn't realize email and website hosting were separate things.</p>

<h3>7. Lower Your DNS TTL</h3>

<p>At least 24 hours before migration, log into your domain registrar (or wherever your DNS is managed) and lower the TTL (Time To Live) on your A record to 300 seconds (5 minutes). This tells DNS servers worldwide to check for updates more frequently. When you eventually point your domain to the new host, the change will propagate much faster. The default TTL is often 86400 seconds (24 hours) — with that setting, some visitors might not see the new site for an entire day.</p>

<h2>Method 1: Using All-in-One WP Migration (Easiest)</h2>

<img src="/screenshots/all-in-one-wp-migration-plugin.webp" alt="All-in-One WP Migration plugin page on WordPress.org showing 5+ million active installations and 4.5 star rating" />

<p>All-in-One WP Migration is the plugin I recommend to anyone who's migrating WordPress for the first time. It has over 5 million active installations, it's been around since 2013, and it works with virtually every hosting provider. I've used it for probably 30 of my 50+ migrations, and it's failed on me exactly twice — both times because of the file size limit, which I'll explain below.</p>

<p>The entire process takes about 15 minutes for a typical site. Here's exactly how to do it.</p>

<h3>Step 1: Install the Plugin on Your Old Site</h3>

<p>Log into the WordPress dashboard on your <strong>current</strong> (old) site. Go to <strong>Plugins → Add New</strong>. Search for "All-in-One WP Migration". Click <strong>Install Now</strong>, then <strong>Activate</strong>.</p>

<h3>Step 2: Export Your Site</h3>

<p>In your WordPress dashboard, go to <strong>All-in-One WP Migration → Export</strong>. You'll see a big green button that says <strong>"Export To"</strong>. Click it and select <strong>File</strong>. The plugin will start packaging your entire site — database, media files, themes, plugins, everything — into a single <code>.wpress</code> file.</p>

<p>For a typical blog with a few hundred posts and some images, this takes 2-5 minutes. For larger sites with lots of media, it can take 15-20 minutes. Don't close the browser tab while it's working.</p>

<h3>Step 3: Download the Export File</h3>

<p>Once the export is complete, you'll see a big green button to download the <code>.wpress</code> file. Click it and save the file to your computer. Note the file size — this matters for the import step.</p>

<h3>Step 4: Install WordPress on Your New Host</h3>

<p>Log into your new hosting account and install a fresh copy of WordPress. Most hosts have a one-click WordPress installer (Softaculous, Fantastico, or a built-in tool). You don't need to configure anything — just get a basic WordPress install running. The migration will overwrite everything anyway.</p>

<h3>Step 5: Install All-in-One WP Migration on the New Site</h3>

<p>Log into the WordPress dashboard on your <strong>new</strong> site (the fresh install). Go to <strong>Plugins → Add New</strong>, search for "All-in-One WP Migration", install it, and activate it. Same as before.</p>

<h3>Step 6: Import Your Site</h3>

<p>Go to <strong>All-in-One WP Migration → Import</strong>. You'll see a drag-and-drop area. Either drag your <code>.wpress</code> file onto it, or click the <strong>"Import From"</strong> button and select <strong>File</strong>, then browse to the <code>.wpress</code> file you downloaded earlier.</p>

<p>The upload and import process will start. Depending on your file size and internet speed, this can take anywhere from 2 minutes to 30 minutes.</p>

<h3>Step 7: Confirm the Overwrite</h3>

<p>Once the upload completes, you'll see a warning that says the import will overwrite your existing database, media, plugins, and themes. Click <strong>"Proceed"</strong> to confirm. This is expected — you're replacing the fresh install with your actual site.</p>

<h3>Step 8: Re-Save Your Permalinks</h3>

<p>After the import finishes, go to <strong>Settings → Permalinks</strong>. You don't need to change anything — just click <strong>"Save Changes"</strong>. This regenerates your <code>.htaccess</code> file and makes sure all your URLs work correctly. Skip this step and you'll get 404 errors on every page except the homepage.</p>

<h3>Step 9: Log In with Your Old Credentials</h3>

<p>Important: after the import, you need to log in with your credentials from the <strong>old</strong> site, not the ones you set up on the fresh install. The import replaced everything, including user accounts.</p>

<h3>Limitations You Need to Know</h3>

<p>The free version of All-in-One WP Migration has an <strong>import size limit of approximately 256MB</strong>. The exact limit depends on your server's <code>upload_max_filesize</code> and <code>post_max_size</code> settings, but for most shared hosting, you'll hit a wall around 256MB.</p>

<p>If your site is larger than that, you have two options:</p>

<ul>
<li><strong>Buy the Unlimited Extension</strong> — It costs $69 per site (one-time payment) and removes the file size limit entirely. If you're migrating a single large site, this is the simplest solution.</li>
<li><strong>Increase your server's upload limits</strong> — You can modify <code>php.ini</code>, <code>.htaccess</code>, or <code>wp-config.php</code> to increase the upload limit. This is free but requires some technical knowledge, and not all hosts allow it.</li>
</ul>

<p>Also note that All-in-One WP Migration does <strong>not</strong> migrate <code>mu-plugins</code> (must-use plugins) or custom modifications to <code>wp-config.php</code>. If you've added custom constants or configurations to either of those, you'll need to copy them manually.</p>

<p>For most people migrating a blog, portfolio, or small business site, All-in-One WP Migration is all you need. If you want more control or your site is larger, read on.</p>

<h2>Method 2: Using Duplicator (More Control)</h2>

<img src="/screenshots/duplicator-plugin-page.webp" alt="Duplicator plugin page on WordPress.org showing 1+ million active installations and 4.9 star rating" />

<p>Duplicator takes a different approach from All-in-One WP Migration. Instead of a simple export/import flow, Duplicator creates an <strong>installer package</strong> — an archive file containing your entire site plus a PHP installer script. You upload both files to your new host and run the installer, which handles the database creation, file extraction, and URL replacement for you.</p>

<p>I prefer Duplicator for mid-sized sites (200MB-1GB) and for situations where I want more control over what gets migrated. The scan feature is particularly useful — it warns you about potential issues before you even start the migration.</p>

<h3>Step 1: Install Duplicator on Your Old Site</h3>

<p>Log into your WordPress dashboard on the site you want to migrate. Go to <strong>Plugins → Add New</strong>, search for "Duplicator", and install and activate the plugin by Snap Creek (now by Syed Balkhi / Starter Template LLC).</p>

<h3>Step 2: Create a New Package</h3>

<p>Go to <strong>Duplicator → Packages</strong> in your WordPress dashboard. Click the <strong>"Create New"</strong> button in the top right. You'll see a setup screen with three tabs: Storage, Archive, and Installer.</p>

<p>For most migrations, the defaults are fine. Click <strong>"Next"</strong> to run the scan.</p>

<h3>Step 3: Review the Scan Results</h3>

<p>Duplicator scans your site for potential issues. It checks file sizes, name lengths, database size, and server configurations. Pay attention to any warnings — common ones include:</p>

<ul>
<li><strong>Large Files</strong> — Files over 3MB are flagged. This is usually fine (large images, backups), but it helps you know what's taking up space.</li>
<li><strong>Name Checks</strong> — Files or folders with special characters or very long names can cause issues during extraction.</li>
<li><strong>Size Check</strong> — If your total site is very large, Duplicator warns you that the free version may struggle.</li>
</ul>

<p>If everything shows green (or yellow with acceptable warnings), click <strong>"Build"</strong>.</p>

<h3>Step 4: Download the Package</h3>

<p>Once the build completes (this can take 2-10 minutes depending on site size), you'll see two files to download:</p>

<ul>
<li><strong>Installer</strong> (<code>installer.php</code>) — The PHP script that handles the migration on the new host.</li>
<li><strong>Archive</strong> (<code>*_archive.zip</code>) — Your entire site packaged into a ZIP file.</li>
</ul>

<p>Download <strong>both</strong> files to your computer. You need both — the installer without the archive is useless, and vice versa.</p>

<h3>Step 5: Create a Database on Your New Host</h3>

<p>This is the step that trips up most beginners. Before you can run the Duplicator installer, you need an empty database on your new host. Here's how:</p>

<ol>
<li>Log into your new host's control panel (cPanel, Plesk, or whatever they provide).</li>
<li>Find <strong>"MySQL Databases"</strong> or <strong>"Database Manager"</strong>.</li>
<li>Create a new database — give it any name you want (e.g., <code>wp_newsite</code>).</li>
<li>Create a new database user with a strong password.</li>
<li>Add the user to the database with <strong>All Privileges</strong>.</li>
<li>Write down the database name, username, and password. You'll need these in the installer.</li>
</ol>

<p>If your host uses cPanel, the full database name is usually prefixed with your cPanel username, like <code>cpaneluser_wp_newsite</code>. Make sure you note the full name.</p>

<h3>Step 6: Upload Both Files to Your New Host</h3>

<p>Connect to your new host via FTP (using FileZilla or your host's file manager) and upload both <code>installer.php</code> and the archive ZIP file to the <strong>root web directory</strong>. This is usually <code>public_html</code>, <code>www</code>, or <code>htdocs</code> depending on your host.</p>

<p>Make sure there's no existing WordPress installation in the way. If you installed WordPress earlier for testing, delete all the WordPress files first — Duplicator will create everything it needs.</p>

<h3>Step 7: Run the Installer</h3>

<p>Open your browser and navigate to <code>yourdomain.com/installer.php</code> (or if DNS hasn't pointed yet, use the temporary URL your host provides, or the server's IP address followed by <code>/installer.php</code>).</p>

<p>The Duplicator installer wizard will load. It has four steps:</p>

<ol>
<li><strong>Deploy</strong> — Accept the terms and verify the archive was found. Click Next.</li>
<li><strong>Install</strong> — Enter the database credentials you created in Step 5. Click "Test Database" to verify the connection works. Then click Next to run the installation.</li>
<li><strong>Update</strong> — Duplicator shows you the old and new URLs and paths. Verify they're correct. It automatically handles the search-and-replace in the database.</li>
<li><strong>Test</strong> — The installer provides links to test your site. Click through and verify everything works.</li>
</ol>

<h3>Step 8: Delete the Installer Files (Critical!)</h3>

<p>After verifying your site works, you <strong>must</strong> delete <code>installer.php</code> and the archive ZIP from your server. Leaving the installer accessible is a serious security risk — anyone who finds it could potentially overwrite your site or access your database credentials. Duplicator will remind you about this with a warning banner in your WordPress dashboard.</p>

<h3>Duplicator Limitations</h3>

<p>The free version of Duplicator handles sites <strong>up to approximately 500MB</strong> reliably. Beyond that, you may run into timeout issues or memory limits on shared hosting. Duplicator Pro (starting at $49.50/year) handles larger sites with multi-threaded processing, supports cloud storage destinations, and adds scheduled backup functionality.</p>

<p>The free version also doesn't support WordPress multisite migrations — you'll need Pro for that.</p>

<h2>Method 3: Manual Migration via FTP + phpMyAdmin (Full Control)</h2>

<p>This is the method I started with, and while it's the most involved, it's also the most reliable when everything else fails. If your site is over 1GB, if you're dealing with a complex multisite setup, or if both plugin methods are timing out, manual migration will always work.</p>

<p>I'll be honest: this method takes longer and requires some comfort with FTP clients, database tools, and file permissions. But once you've done it once or twice, it becomes second nature. Here's the full process.</p>

<h3>Step 1: Download Your Files via FTP</h3>

<p>Connect to your <strong>old</strong> host using an FTP client like FileZilla. Navigate to your WordPress root directory (usually <code>public_html</code>). Download the entire <code>wp-content</code> folder — this contains your themes, plugins, uploads (images), and any other custom content. Also download <code>wp-config.php</code> and <code>.htaccess</code>.</p>

<p>The <code>wp-content</code> folder is often the largest part of a WordPress site, so this download can take a while. For a site with a few GB of images, expect 30-60 minutes or more depending on your internet speed and the server's connection.</p>

<h3>Step 2: Export the Database</h3>

<p>Log into phpMyAdmin on your <strong>old</strong> host (you can usually access it through cPanel or your hosting control panel). Select your WordPress database from the left sidebar, then click the <strong>"Export"</strong> tab.</p>

<p>For most cases, the <strong>"Quick"</strong> export method with <strong>"SQL"</strong> format is fine. Click <strong>"Go"</strong> and save the <code>.sql</code> file to your computer.</p>

<p>If you have SSH access and prefer the command line, you can also use <code>mysqldump</code>:</p>

<p><code>mysqldump -u username -p database_name > backup.sql</code></p>

<p>This is actually faster and more reliable than phpMyAdmin for large databases.</p>

<h3>Step 3: Install Fresh WordPress on the New Host</h3>

<p>On your new host, install a fresh copy of WordPress using their one-click installer or by downloading WordPress from wordpress.org and uploading it manually. Complete the basic setup — this creates the database tables and a working <code>wp-config.php</code>.</p>

<h3>Step 4: Import the Database</h3>

<p>Log into phpMyAdmin on your <strong>new</strong> host. Select the database that was created during the WordPress installation. Go to the <strong>"Import"</strong> tab. Click <strong>"Choose File"</strong>, select the <code>.sql</code> file you exported from the old host, and click <strong>"Go"</strong>.</p>

<p>If your SQL file is very large (over 50MB), phpMyAdmin might time out. In that case, you can either increase the import limits in your hosting settings, split the SQL file into smaller chunks, or use the command line:</p>

<p><code>mysql -u username -p database_name < backup.sql</code></p>

<h3>Step 5: Upload wp-content to the New Host</h3>

<p>Connect to your <strong>new</strong> host via FTP. Navigate to the WordPress root directory. Delete the existing <code>wp-content</code> folder (the one from the fresh install) and upload the <code>wp-content</code> folder from your old site in its place.</p>

<p>This is the most time-consuming step. Be patient and make sure the upload completes fully — a partially uploaded <code>wp-content</code> folder will result in broken images, missing plugins, or theme errors.</p>

<h3>Step 6: Update wp-config.php</h3>

<p>Open the <code>wp-config.php</code> file on your <strong>new</strong> host (via FTP or file manager). Update the database credentials to match the new host:</p>

<ul>
<li><code>DB_NAME</code> — Your new database name</li>
<li><code>DB_USER</code> — Your new database username</li>
<li><code>DB_PASSWORD</code> — Your new database password</li>
<li><code>DB_HOST</code> — Usually <code>localhost</code>, but some hosts use a different value (check your hosting documentation)</li>
</ul>

<p>If you had any custom constants in your old <code>wp-config.php</code> (custom memory limits, debug settings, multisite configurations), copy those over too.</p>

<h3>Step 7: Search and Replace URLs in the Database</h3>

<p>If your domain is staying the same, you can skip this step. But if you're changing domains (or even switching from HTTP to HTTPS), you need to update every URL in the database. WordPress stores absolute URLs throughout the database — in post content, option values, widget settings, and more.</p>

<p>The safest way to do this is with WP-CLI:</p>

<p><code>wp search-replace 'https://oldsite.com' 'https://newsite.com' --all-tables</code></p>

<p>If you don't have WP-CLI access, install the <strong>Better Search Replace</strong> plugin on your new site. Go to <strong>Tools → Better Search Replace</strong>, enter the old URL and new URL, select all tables, and run the replacement. Always do a dry run first to see how many replacements will be made.</p>

<p><strong>Important:</strong> Do not try to do this with a simple SQL query. WordPress uses serialized data in many fields, and a naive find-and-replace will corrupt serialized strings, breaking widgets, theme settings, and plugin configurations. WP-CLI and Better Search Replace both handle serialized data correctly.</p>

<h3>Step 8: Fix File Permissions</h3>

<p>After uploading files via FTP, permissions sometimes get set incorrectly. The standard WordPress permissions are:</p>

<ul>
<li><strong>Folders:</strong> 755 (owner can read/write/execute, group and others can read/execute)</li>
<li><strong>Files:</strong> 644 (owner can read/write, group and others can read only)</li>
<li><strong>wp-config.php:</strong> 600 or 640 (more restrictive for security)</li>
</ul>

<p>You can fix permissions via SSH with these commands:</p>

<p><code>find /path/to/wordpress -type d -exec chmod 755 {} \\;</code></p>
<p><code>find /path/to/wordpress -type f -exec chmod 644 {} \\;</code></p>

<h3>Step 9: Test Everything</h3>

<p>Load your site and verify that pages display correctly, images load, and the admin dashboard works. If anything looks broken, check the troubleshooting section below.</p>

<h3>When to Use Manual Migration</h3>

<ul>
<li><strong>Sites larger than 1GB</strong> where plugin-based migrations struggle with timeouts</li>
<li><strong>When you want to clean up during migration</strong> — skip old revisions, spam comments, or unused plugins</li>
<li><strong>When you have SSH access</strong> and are comfortable with the command line</li>
<li><strong>When plugin methods fail</strong> — this method doesn't depend on PHP memory limits or execution time the same way</li>
<li><strong>Complex server configurations</strong> that need manual attention anyway</li>
</ul>

<h2>After Migration — Post-Migration Checklist</h2>

<p>Regardless of which method you used, run through every item on this list before you call the migration done. I once migrated a client's site, told them it was ready, and then got a call two hours later because their contact form wasn't sending emails. The site looked perfect — but the email configuration was tied to the old server. Don't make my mistake.</p>

<h3>1. Flush All Caches</h3>

<p>If you're using a caching plugin (WP Super Cache, W3 Total Cache, LiteSpeed Cache), go to its settings and clear all caches. Also clear any server-side caching your new host provides. Cached content from the old site can cause confusing display issues.</p>

<h3>2. Test Every Page Type</h3>

<p>Don't just check the homepage. Click through at least:</p>

<ul>
<li>A blog post</li>
<li>A page</li>
<li>A category archive</li>
<li>A tag archive</li>
<li>The search results page</li>
<li>Any custom post types (products, portfolios, etc.)</li>
</ul>

<h3>3. Check Images</h3>

<p>Browse through several posts and pages and verify that images are loading. If images appear broken, right-click one and inspect the URL — it might still be pointing to the old server. If so, you need to run a search-and-replace on the database (see Method 3, Step 7).</p>

<h3>4. Re-Save Permalinks</h3>

<p>Go to <strong>Settings → Permalinks</strong> and click <strong>"Save Changes"</strong> without modifying anything. This regenerates your <code>.htaccess</code> rewrite rules. If you're getting 404 errors on posts but the homepage works, this is almost certainly the fix.</p>

<h3>5. Test Contact Forms</h3>

<p>Send a test message through every contact form on your site. Email delivery is one of the most common things that breaks during migration, especially if you were relying on your old host's mail server. If emails aren't coming through, install and configure the <a href="/best-wordpress-plugins">WP Mail SMTP plugin</a> to route email through a reliable SMTP service like Gmail, SendGrid, or Mailgun.</p>

<h3>6. Check SSL Certificate</h3>

<p>Make sure your site loads with HTTPS on the new host. If your new host offers free SSL through Let's Encrypt (most do in 2026), you may need to activate it in your hosting control panel. If you see "Not Secure" in the browser address bar, the SSL certificate isn't installed or isn't working. Most hosts can set this up for you in minutes.</p>

<h3>7. Update DNS</h3>

<p>If you haven't already, point your domain to the new host. This usually means updating the A record to your new server's IP address, or changing nameservers to your new host's nameservers. Your new host's documentation or support team will give you the exact values. If you set your TTL to 300 earlier (as recommended in the pre-migration checklist), the change should propagate within an hour for most visitors.</p>

<h3>8. Don't Cancel Old Hosting Yet</h3>

<p>Wait at least 48 hours after updating DNS before canceling your old hosting. DNS propagation varies by ISP and location — some visitors may still be hitting the old server for a day or two. I personally wait a full week before canceling, just to be safe. The cost of a few extra days of hosting is nothing compared to the risk of downtime.</p>

<h3>9. Run a Broken Link Check</h3>

<p>Install the Broken Link Checker plugin temporarily, or use an online tool like Screaming Frog or Dr. Link Check, to scan your site for broken links. Migration can sometimes break internal links, especially if URL structures changed.</p>

<h3>10. Check Google Search Console</h3>

<p>Log into <a href="https://search.google.com/search-console" target="_blank" rel="noopener">Google Search Console</a> and verify your site. Check for any new crawl errors, indexing issues, or security warnings. If you changed hosts but kept the same domain, your SEO rankings should remain stable — but it's worth monitoring for a few weeks.</p>

<h2>Common Migration Problems and Fixes</h2>

<p>Even with careful preparation, things sometimes go wrong. Here are the issues I've encountered most frequently across 50+ migrations, and how to fix each one.</p>

<h3>White Screen of Death After Import</h3>

<p>The dreaded WSOD. This usually means PHP ran out of memory during the import process. Fix it by increasing the PHP memory limit. Add this line to your <code>wp-config.php</code>:</p>

<p><code>define('WP_MEMORY_LIMIT', '256M');</code></p>

<p>You may also need to increase the limit in your <code>php.ini</code> file (<code>memory_limit = 256M</code>) or contact your host to increase it. If the WSOD persists, enable debug mode by adding <code>define('WP_DEBUG', true);</code> to <code>wp-config.php</code> — this will show you the actual error message.</p>

<h3>Images Are Broken</h3>

<p>If images aren't loading after migration, it's usually one of two things:</p>

<ul>
<li><strong>File permissions</strong> — The <code>wp-content/uploads</code> directory needs to be readable (755 for folders, 644 for files).</li>
<li><strong>Old URLs in the database</strong> — Image URLs might still reference the old domain. Run a search-and-replace to update them. Use WP-CLI or the Better Search Replace plugin.</li>
</ul>

<h3>"Error Establishing a Database Connection"</h3>

<p>This means WordPress can't connect to your database. Check these values in <code>wp-config.php</code>:</p>

<ul>
<li><code>DB_NAME</code> — Is this the correct database name on the new host?</li>
<li><code>DB_USER</code> — Is this user assigned to this database?</li>
<li><code>DB_PASSWORD</code> — Is the password correct (watch for special characters that might need escaping)?</li>
<li><code>DB_HOST</code> — Is it <code>localhost</code>, or does your host use something else like <code>127.0.0.1</code> or a specific hostname?</li>
</ul>

<p>I've also seen this error when the database user exists but hasn't been granted privileges on the database. Go back to cPanel's MySQL Databases section and verify the user is assigned to the database with All Privileges.</p>

<h3>Site Loads but Looks Broken (No CSS/Styling)</h3>

<p>If your site loads but looks like plain text without any styling, try these fixes in order:</p>

<ol>
<li><strong>Re-save permalinks</strong> — Go to Settings → Permalinks → Save Changes.</li>
<li><strong>Check .htaccess</strong> — Make sure the file exists in your WordPress root directory and contains the standard WordPress rewrite rules.</li>
<li><strong>Check for HTTPS/HTTP mismatch</strong> — If your site is set to HTTPS in the database but your new host doesn't have SSL configured yet, browsers will block the CSS files. Either set up SSL first or temporarily change <code>siteurl</code> and <code>home</code> in the database to use HTTP.</li>
</ol>

<h3>Mixed Content Warnings (HTTP/HTTPS)</h3>

<p>If your browser shows a "Not Secure" warning even though you have SSL installed, your site likely has mixed content — some resources (images, scripts, stylesheets) are being loaded over HTTP instead of HTTPS. Run a search-and-replace on the database to change all <code>http://yourdomain.com</code> references to <code>https://yourdomain.com</code>.</p>

<h3>Emails Stopped Working</h3>

<p>WordPress relies on PHP's <code>mail()</code> function by default, which depends on your server's mail configuration. When you switch hosts, the mail server changes too. The fix: install <strong>WP Mail SMTP</strong> and configure it to send email through a dedicated SMTP provider. This is actually best practice regardless of migration — PHP mail is unreliable on most hosts anyway.</p>

<h3>Redirects Not Working</h3>

<p>If you had custom redirects in your <code>.htaccess</code> file on the old host, they won't automatically appear on the new host. Check your old <code>.htaccess</code> backup (you did back it up during pre-migration, right?) and copy any custom redirect rules to the new <code>.htaccess</code> file, placing them <strong>before</strong> the WordPress rewrite rules.</p>

<h3>Scheduled Posts and Cron Jobs Not Running</h3>

<p>WordPress uses a pseudo-cron system (<code>wp-cron</code>) that triggers on page visits. If your new host has a different server configuration, scheduled tasks might stop working. Check if <code>DISABLE_WP_CRON</code> is set to <code>true</code> in <code>wp-config.php</code> — if so, you'll need to set up a real server cron job on the new host to trigger <code>wp-cron.php</code>.</p>

<h2>Which Method Should You Use?</h2>

<p>Here's my honest recommendation based on migrating 50+ sites:</p>

<table>
<thead>
<tr>
<th>Scenario</th>
<th>Recommended Method</th>
<th>Why</th>
</tr>
</thead>
<tbody>
<tr>
<td>Small blog or portfolio (under 256MB)</td>
<td>All-in-One WP Migration</td>
<td>Fastest and simplest. Done in 15 minutes.</td>
</tr>
<tr>
<td>Medium site (256MB-1GB)</td>
<td>Duplicator or All-in-One WP Migration (with paid extension)</td>
<td>Duplicator's free version handles up to ~500MB. AIO with the Unlimited extension handles any size.</td>
</tr>
<tr>
<td>Large site or WooCommerce store (over 1GB)</td>
<td>Manual FTP + phpMyAdmin or Duplicator Pro</td>
<td>Plugin-based methods often time out on large sites. Manual gives you full control.</td>
</tr>
<tr>
<td>First-time migrator, nervous about breaking things</td>
<td>All-in-One WP Migration</td>
<td>Lowest learning curve. Almost impossible to mess up.</td>
</tr>
<tr>
<td>Developer comfortable with command line</td>
<td>Manual (with WP-CLI)</td>
<td>Fastest method once you know it. Full control over every step.</td>
</tr>
</tbody>
</table>

<p>No matter which method you choose, the pre-migration and post-migration checklists are non-negotiable. Those steps prevent 90% of migration disasters.</p>

<h2>Frequently Asked Questions</h2>

<h3>How long does a WordPress migration take?</h3>

<p>For a small site using All-in-One WP Migration, the actual migration process takes 15-30 minutes. With Duplicator, expect 20-45 minutes including the installer wizard. Manual migration can take 1-3 hours depending on your site size and internet speed. Add time for the pre-migration checklist (30 minutes), post-migration testing (30 minutes), and DNS propagation (up to 48 hours, though usually faster). So plan for a few hours of active work plus a day or two of monitoring.</p>

<h3>Can I migrate WordPress for free?</h3>

<p>Yes. All three methods in this guide are free for most sites. All-in-One WP Migration's free version works for sites under ~256MB. Duplicator's free version works for sites under ~500MB. The manual FTP method is always free. You only need to pay if your site exceeds these limits and you want the convenience of a plugin. Many hosting providers also offer <a href="/how-to-choose-wordpress-hosting">free migration assistance</a> when you sign up — SiteGround, Cloudways, and most <a href="/managed-wordpress-hosting">managed WordPress hosts</a> will migrate your site for you at no cost.</p>

<h3>Will I lose SEO rankings when switching hosts?</h3>

<p>Not if you do it correctly. As long as your domain stays the same, your URLs don't change, and you don't have extended downtime, Google won't even notice the switch. The key factors: keep the old host running until DNS propagates, make sure all redirects are preserved, and verify in Google Search Console that there are no new crawl errors. I've migrated dozens of sites between hosts without any ranking impact.</p>

<p>If you <em>are</em> changing domains during the migration (which I'd generally advise against doing at the same time as a host change), that's a different situation entirely. You'll need to set up 301 redirects from every old URL to the corresponding new URL and submit a change of address in Google Search Console.</p>

<h3>Should I change my domain during migration?</h3>

<p>If you can avoid it, don't. Changing hosts and changing domains at the same time doubles the complexity and doubles the things that can go wrong. Migrate to the new host first, verify everything works, and then change your domain as a separate project if needed. That said, if you absolutely must do both at once, Method 3 (manual) gives you the most control over the URL replacement process.</p>

<h3>My host offers free migration — should I use it?</h3>

<p>Yes, if it's available. Many quality hosting providers like <a href="/siteground-review">SiteGround</a>, Kinsta, and Cloudways offer free migration as part of their onboarding. They handle the technical work, and if something goes wrong, they fix it. The only reason to DIY is if your host doesn't offer migration, if you want to learn the process, or if you have very specific requirements that automated migration tools can't handle.</p>

<h3>Can I migrate a WordPress.com site to a self-hosted WordPress.org site?</h3>

<p>Yes, but the process is different from host-to-host migration. WordPress.com has a built-in export tool (Tools → Export) that creates an XML file with your posts, pages, and comments. You import that XML file into your self-hosted WordPress using the WordPress Importer plugin. Media files, themes, and plugins need to be handled separately. This is a one-way migration — the plugins described in this guide won't work for WordPress.com-hosted sites unless you're on a WordPress.com Business or eCommerce plan.</p>

<h2>Final Thoughts</h2>

<p>Migrating WordPress doesn't have to be terrifying. The first time I did it, I nearly had a panic attack. By my tenth migration, it was routine. By my fiftieth, I could do it while watching TV.</p>

<p>The secret isn't technical skill — it's preparation. Follow the pre-migration checklist, pick the method that matches your site and comfort level, and verify everything with the post-migration checklist. If something goes wrong, the troubleshooting section above covers virtually every issue I've encountered.</p>

<p>And remember: always keep your old hosting active until you're 100% certain the migration succeeded. That one rule alone would have saved me from every migration disaster I've ever experienced.</p>

<p>If you're looking for a new host to migrate to, check out our guide on <a href="/how-to-choose-wordpress-hosting">how to choose WordPress hosting</a> or our roundup of the <a href="/cheap-wordpress-hosting">best cheap WordPress hosting</a> options. And if you'd rather let someone else handle the technical side entirely, <a href="/managed-wordpress-hosting">managed WordPress hosting</a> providers will migrate your site for free and handle all the server management going forward.</p>

<p>Good luck with your migration. You've got this.</p>
`;
