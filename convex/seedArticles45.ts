import { internalMutation } from "./_generated/server";

// ─── Pillar: Common WordPress Errors and How to Fix Them ─────────────────────

export const seedCommonWordPressErrors = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "common-wordpress-errors";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-errors' not found. Seed the wordpress-errors cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-errors':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "Common WordPress Errors and How to Fix Them (Complete Guide)",
      excerpt:
        "WordPress errors are frustrating but rarely fatal. I cover the 11 most common WordPress errors with quick-fix solutions for each one — based on years of troubleshooting real sites.",
      content: commonWordPressErrorsContent,
      category: "errors",
      tags: [
        "wordpress errors",
        "wordpress troubleshooting",
        "white screen of death",
        "database connection error",
        "500 internal server error",
        "memory exhausted",
        "too many redirects",
        "wordpress fix",
        "wordpress problems",
        "wordpress debug",
      ],
      seoTitle:
        "Common WordPress Errors and How to Fix Them (2026 Guide)",
      seoDescription:
        "11 most common WordPress errors with step-by-step fixes. White Screen of Death, database errors, 500 errors, memory limits, redirects, and more.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "pillar" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing common errors article:", existing._id);
      return {
        message: "Updated existing common errors article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new common errors article:", postId);
      return {
        message: "Created new common errors article",
        id: postId,
      };
    }
  },
});

const commonWordPressErrorsContent = `
<p>Nothing kills your motivation faster than a WordPress error. You are working on a post, tweaking a setting, or installing a plugin — and suddenly your site shows a cryptic message instead of your content. I have been building WordPress sites for over a decade, and I have seen every error on this list more times than I can count.</p>

<p>The good news? Most WordPress errors have straightforward fixes. You rarely need a developer. You just need to know what the error means and where to look. This guide covers the 11 most common WordPress errors I encounter, with a quick explanation and a link to the detailed fix for each one.</p>

<img src="/screenshots/wordpress-org-common-errors.webp" alt="WordPress.org support page listing common WordPress errors" />

<p>Before you start troubleshooting any error, do two things: <strong>make a backup</strong> of your site (or confirm your host has automatic backups), and <strong>enable WP_DEBUG</strong> by adding <code>define('WP_DEBUG', true);</code> to your <code>wp-config.php</code> file. This will show you more specific error messages that make diagnosis much faster.</p>

<h2>1. White Screen of Death (WSoD)</h2>

<p>The White Screen of Death is exactly what it sounds like — your site shows a completely blank white page with no error message. It is one of the most common and most frustrating WordPress errors because it gives you zero information about what went wrong.</p>

<p>The usual suspects are a <strong>plugin conflict</strong>, a <strong>broken theme</strong>, or a <strong>PHP memory limit</strong> that has been exceeded. In most cases, the last thing you installed or updated is the culprit.</p>

<p><strong>Quick fix:</strong> Enable WP_DEBUG to see the actual error. If you cannot access your dashboard, use FTP to rename the <code>/wp-content/plugins/</code> folder to disable all plugins at once. Then rename it back and reactivate plugins one by one to find the culprit.</p>

<p>I wrote a complete walkthrough with every method I use: <a href="/fix-white-screen-of-death/">How to Fix the White Screen of Death</a>.</p>

<h2>2. Error Establishing a Database Connection</h2>

<p>This error means WordPress cannot connect to your MySQL database. Without that connection, your site cannot load any content — no pages, no posts, nothing. You will see a plain white page with the text "Error establishing a database connection."</p>

<p>The most common cause is <strong>incorrect database credentials</strong> in your <code>wp-config.php</code> file. This often happens after a host migration, a password change, or when your hosting provider moves your database to a different server. Less commonly, your database could be corrupted or your database server could be down.</p>

<p><strong>Quick fix:</strong> Open <code>wp-config.php</code> and verify that <code>DB_NAME</code>, <code>DB_USER</code>, <code>DB_PASSWORD</code>, and <code>DB_HOST</code> are all correct. You can find the correct values in your hosting control panel. If the credentials are correct, try repairing the database by adding <code>define('WP_ALLOW_REPAIR', true);</code> to <code>wp-config.php</code> and visiting <code>yourdomain.com/wp-admin/maint/repair.php</code>.</p>

<p>Full step-by-step instructions: <a href="/fix-error-establishing-database-connection/">How to Fix "Error Establishing a Database Connection"</a>.</p>

<h2>3. 500 Internal Server Error</h2>

<p>The 500 Internal Server Error is a catch-all HTTP error that means something went wrong on the server, but the server cannot tell you exactly what. In WordPress, this is usually caused by a <strong>corrupted .htaccess file</strong>, a <strong>PHP memory limit</strong>, or a <strong>plugin or theme conflict</strong>.</p>

<p>What makes this error tricky is that the server log is the only place with useful details. Your browser just shows "500 Internal Server Error" or "There has been a critical error on this website."</p>

<p><strong>Quick fix:</strong> Connect via FTP and rename your <code>.htaccess</code> file to <code>.htaccess_backup</code>. Then go to <strong>Settings &rarr; Permalinks</strong> in your WordPress dashboard and click "Save Changes" — this regenerates a fresh .htaccess file. If that does not work, try increasing the PHP memory limit or disabling plugins via FTP.</p>

<p>Detailed walkthrough: <a href="/fix-500-internal-server-error/">How to Fix the 500 Internal Server Error</a>.</p>

<h2>4. WordPress Memory Exhausted Error</h2>

<p>This error displays the message: <code>Fatal error: Allowed memory size of 67108864 bytes exhausted</code> (the number varies). It means a PHP script tried to use more memory than your server allows. This commonly happens when you activate a resource-heavy plugin, upload a large image, or run an import.</p>

<p>WordPress sets a default memory limit of 40MB for regular tasks and 256MB for admin tasks. Most shared hosting plans set PHP memory to 64MB or 128MB, which can be too low for complex sites.</p>

<p><strong>Quick fix:</strong> Add this line to your <code>wp-config.php</code> file, just above the line that says "That's all, stop editing!":</p>

<pre><code>define('WP_MEMORY_LIMIT', '256M');</code></pre>

<p>Complete guide with multiple methods: <a href="/fix-wordpress-memory-exhausted-error/">How to Fix WordPress Memory Exhausted Error</a>.</p>

<h2>5. Too Many Redirects Error</h2>

<p>When your browser shows "ERR_TOO_MANY_REDIRECTS" or "This page isn't working — redirected you too many times," it means your site is stuck in a redirect loop. Page A redirects to page B, which redirects back to page A, and so on forever.</p>

<p>The most common causes are <strong>misconfigured WordPress URL settings</strong> (the WordPress Address and Site Address do not match), an <strong>SSL/HTTPS conflict</strong>, a <strong>faulty .htaccess</strong> rule, or a <strong>Cloudflare SSL mode</strong> mismatch.</p>

<p><strong>Quick fix:</strong> Clear your browser cookies for your domain first. If that does not help, check your WordPress URL settings in the database using phpMyAdmin. Look in the <code>wp_options</code> table for <code>siteurl</code> and <code>home</code> — they should match and both use the same protocol (http or https).</p>

<p>Full troubleshooting guide: <a href="/fix-too-many-redirects/">How to Fix Too Many Redirects Error</a>.</p>

<h2>6. Connection Timed Out Error</h2>

<p>A "connection timed out" error means your server took too long to respond. The browser waited (usually 30 seconds) and gave up. This is different from a 500 error — the server is not crashing, it is just too slow or overloaded to respond.</p>

<p>Common causes include <strong>insufficient PHP memory</strong>, <strong>server overload</strong> from traffic spikes, <strong>heavy plugins</strong> running long database queries, or a <strong>shared hosting plan</strong> with limited resources.</p>

<p><strong>Quick fix:</strong> Deactivate all plugins via FTP and reactivate them one by one. Increase the PHP memory limit. If the issue persists, check with your host — your site may have outgrown shared hosting. Consider upgrading to a <a href="/managed-wordpress-hosting/">managed WordPress host</a> with better resources.</p>

<h2>7. 403 Forbidden Error</h2>

<p>A 403 Forbidden error means the server understands your request but refuses to let you access the resource. In WordPress, this usually comes from <strong>incorrect file permissions</strong>, a <strong>misconfigured .htaccess file</strong>, or a <strong>security plugin</strong> that is blocking your IP address.</p>

<p>WordPress requires specific file permissions to function: directories should be set to <strong>755</strong> and files to <strong>644</strong>. The <code>wp-config.php</code> file should be <strong>600</strong> or <strong>640</strong> for extra security.</p>

<p><strong>Quick fix:</strong> Connect via FTP and check that your file permissions are correct. Rename <code>.htaccess</code> to see if a bad rewrite rule is the cause. If you use a security plugin, check its logs to see if your IP was accidentally blocked. You can also temporarily deactivate the security plugin by renaming its folder via FTP.</p>

<h2>8. 404 Not Found Error</h2>

<p>A 404 error means the page was not found. In WordPress, this most commonly happens when your <strong>permalink structure is broken</strong>. You might see 404 errors on all pages except the homepage after a migration or a plugin update.</p>

<p><strong>Quick fix:</strong> Go to <strong>Settings &rarr; Permalinks</strong> in your WordPress dashboard and click "Save Changes" without changing anything. This regenerates your rewrite rules. If that does not work, check your <code>.htaccess</code> file — it should contain the default WordPress rewrite rules. If the file is empty or missing, WordPress cannot route requests to the correct pages.</p>

<h2>9. Syntax Error</h2>

<p>A syntax error looks like: <code>Parse error: syntax error, unexpected '}' in /home/user/public_html/wp-content/themes/mytheme/functions.php on line 23</code>. This happens when you (or a plugin) add incorrectly formatted PHP code. Missing semicolons, unclosed brackets, and typos in function names are the usual culprits.</p>

<p>The error message tells you the exact file and line number, which makes this one of the easier errors to fix.</p>

<p><strong>Quick fix:</strong> Connect via FTP, open the file mentioned in the error, and go to the line number shown. Fix the syntax issue (missing semicolon, extra bracket, etc.). If you are not comfortable editing PHP, restore the file from a backup. If the error is in a plugin file, rename the plugin folder to deactivate it.</p>

<h2>10. Mixed Content Error</h2>

<p>After switching your site from HTTP to HTTPS, you might see a "Not Secure" warning in the browser even though you have an SSL certificate. This happens when your page loads over HTTPS but some resources (images, scripts, stylesheets) still load over HTTP. Browsers call this "mixed content."</p>

<p><strong>Quick fix:</strong> Update your WordPress Address and Site Address in <strong>Settings &rarr; General</strong> to use <code>https://</code>. Then use a plugin like <strong>Better Search Replace</strong> to find all instances of <code>http://yourdomain.com</code> in your database and replace them with <code>https://yourdomain.com</code>. Check your theme files for any hardcoded HTTP URLs. If you use a <a href="/setup-cloudflare-cdn-wordpress/">CDN like Cloudflare</a>, make sure it is set to "Full (Strict)" SSL mode.</p>

<h2>11. Stuck in Maintenance Mode</h2>

<p>When WordPress runs an update, it creates a temporary <code>.maintenance</code> file in your site root. This file displays the "Briefly unavailable for scheduled maintenance" message. If an update fails or gets interrupted, this file stays in place and your site remains stuck in maintenance mode.</p>

<p><strong>Quick fix:</strong> Connect to your site via FTP and look for a file called <code>.maintenance</code> in the root directory (same level as <code>wp-config.php</code>). Delete it. Your site will immediately come back online. Then re-run whatever update was interrupted — go to <strong>Dashboard &rarr; Updates</strong> and try again.</p>

<h2>General Troubleshooting Checklist</h2>

<p>No matter which error you are facing, these steps will help you narrow down the cause:</p>

<ol>
<li><strong>Enable WP_DEBUG</strong> — Add <code>define('WP_DEBUG', true);</code> and <code>define('WP_DEBUG_LOG', true);</code> to <code>wp-config.php</code>. Check <code>/wp-content/debug.log</code> for specific error messages.</li>
<li><strong>Deactivate all plugins</strong> — Rename the <code>/wp-content/plugins/</code> folder via FTP. If the error disappears, reactivate plugins one by one to find the culprit.</li>
<li><strong>Switch to a default theme</strong> — Rename your theme folder so WordPress falls back to Twenty Twenty-Four (or whatever default theme is installed).</li>
<li><strong>Check your .htaccess file</strong> — Rename it and let WordPress regenerate it by saving your permalink settings.</li>
<li><strong>Increase PHP memory</strong> — Add <code>define('WP_MEMORY_LIMIT', '256M');</code> to <code>wp-config.php</code>.</li>
<li><strong>Check server error logs</strong> — Your hosting control panel (cPanel, Plesk, etc.) should have an "Error Log" section with detailed information.</li>
<li><strong>Restore from backup</strong> — If nothing works and you have a recent backup, restore it. This is why I always recommend having a solid <a href="/wordpress-backup-guide/">WordPress backup strategy</a>.</li>
</ol>

<h2>Prevention Is Better Than Cure</h2>

<p>Most WordPress errors are preventable. Here is what I do on every site I manage:</p>

<ul>
<li><strong>Keep everything updated</strong> — WordPress core, themes, and plugins. Outdated software is the #1 cause of errors and security issues.</li>
<li><strong>Use quality plugins</strong> — Stick with well-maintained plugins from reputable developers. Check the <a href="/best-wordpress-plugins/">best WordPress plugins</a> for my recommendations.</li>
<li><strong>Set up automatic backups</strong> — Use a backup plugin or choose a host that includes daily backups. My <a href="/wordpress-backup-guide/">backup guide</a> walks you through the setup.</li>
<li><strong>Use a staging environment</strong> — Test plugin updates and theme changes on a staging site before pushing to production. Most <a href="/managed-wordpress-hosting/">managed hosts</a> include one-click staging.</li>
<li><strong>Monitor your site</strong> — Use a free uptime monitoring tool so you know immediately if your site goes down.</li>
</ul>

<p>WordPress errors are a fact of life, but they do not have to ruin your day. Bookmark this page, and the next time something breaks, you will have a fix ready in minutes.</p>
`;

// ─── Supporting: How to Fix the White Screen of Death ────────────────────────

export const seedWhiteScreenOfDeath = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "fix-white-screen-of-death";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-errors' not found. Seed the wordpress-errors cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Fix the WordPress White Screen of Death (Step by Step)",
      excerpt:
        "Your WordPress site shows a blank white page — no error, no clue. I walk through every method I use to fix the White Screen of Death, from enabling debug mode to disabling plugins via FTP.",
      content: whiteScreenContent,
      category: "errors",
      tags: [
        "white screen of death",
        "wsod",
        "wordpress blank page",
        "wordpress white screen",
        "wordpress errors",
        "wp_debug",
        "plugin conflict",
        "php memory limit",
      ],
      seoTitle:
        "How to Fix the WordPress White Screen of Death (2026)",
      seoDescription:
        "Step-by-step guide to fix the WordPress White Screen of Death. Covers WP_DEBUG, plugin conflicts, theme issues, PHP memory limits, and more.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing white screen article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      return {
        message: "Created new white screen article",
        id: postId,
      };
    }
  },
});

const whiteScreenContent = `
<p>You load your WordPress site and see... nothing. A completely blank white page. No error message, no helpful hint, just white. Welcome to the WordPress White Screen of Death (WSoD) — one of the most common and most infuriating WordPress errors you will ever encounter.</p>

<p>I have fixed the White Screen of Death on hundreds of sites over the years. The first time it happened to me back in 2008, I panicked and thought I had lost everything. I had not. Your content is safe in the database — the white screen just means PHP hit an error it cannot recover from, and WordPress cannot render anything.</p>

<p>Let me walk you through every fix I use, starting with the fastest methods.</p>

<img src="/screenshots/wordpress-debugging-page.webp" alt="WordPress debugging documentation page showing WP_DEBUG instructions" />

<h2>What Causes the White Screen of Death?</h2>

<p>The White Screen of Death happens when a PHP process fails silently. The four most common causes are:</p>

<ul>
<li><strong>Plugin conflict</strong> — A plugin crashes, has a bug, or conflicts with another plugin or your PHP version. This is the cause about 70% of the time in my experience.</li>
<li><strong>Theme issue</strong> — Your theme has a PHP error, typically in <code>functions.php</code> or a template file.</li>
<li><strong>PHP memory limit exceeded</strong> — A script tried to use more memory than the server allows, and PHP silently dies.</li>
<li><strong>PHP errors in custom code</strong> — If you (or someone) added custom code to <code>functions.php</code> or a custom plugin, a syntax error or runtime error can cause the white screen.</li>
</ul>

<p>The good news is that all four causes have reliable fixes. Let us work through them.</p>

<h2>Step 1: Enable WP_DEBUG to See the Actual Error</h2>

<p>The white screen shows nothing because WordPress hides PHP errors by default in production. The first thing you should do is turn on debugging so you can see what is actually going wrong.</p>

<p>Connect to your site via FTP (I use <a href="https://filezilla-project.org/" target="_blank" rel="noopener">FileZilla</a>) or your hosting file manager. Open <code>wp-config.php</code> — it is in the root directory of your WordPress installation.</p>

<p>Find this line:</p>

<pre><code>define('WP_DEBUG', false);</code></pre>

<p>Replace it with:</p>

<pre><code>define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', true);</code></pre>

<p>Save the file and reload your site. Now instead of a white screen, you should see a specific PHP error message. This message tells you exactly which file and line number caused the problem. If you see something like <code>Fatal error in /wp-content/plugins/some-plugin/file.php on line 42</code>, you know the plugin "some-plugin" is the culprit.</p>

<p>If the error points to a plugin, skip to Step 2. If it points to your theme, skip to Step 3. If you still see a white screen even with WP_DEBUG on, continue to Step 2.</p>

<h2>Step 2: Disable All Plugins via FTP</h2>

<p>If you cannot access your WordPress dashboard (which is usually the case with WSoD), you need to disable plugins manually. Here is how:</p>

<ol>
<li>Connect to your site via FTP or your hosting file manager.</li>
<li>Navigate to <code>/wp-content/</code>.</li>
<li>Find the <code>plugins</code> folder.</li>
<li>Rename it to <code>plugins-disabled</code>.</li>
</ol>

<p>Now reload your site. If the white screen is gone, you have confirmed that a plugin is the problem. Here is how to find which one:</p>

<ol>
<li>Rename <code>plugins-disabled</code> back to <code>plugins</code>.</li>
<li>Inside the <code>plugins</code> folder, rename each plugin subfolder one at a time (e.g., rename <code>contact-form-7</code> to <code>contact-form-7-disabled</code>).</li>
<li>After renaming each plugin, reload your site.</li>
<li>When the site comes back, the last plugin you renamed is the culprit.</li>
</ol>

<p>Once you identify the problematic plugin, you have three options: <strong>delete it</strong> and find an alternative, <strong>contact the plugin developer</strong> to report the bug, or <strong>wait for an update</strong> that fixes the issue. Do not just reactivate a plugin that crashes your site — it will crash again.</p>

<h2>Step 3: Switch to a Default Theme</h2>

<p>If disabling all plugins did not fix the white screen, your theme is likely the problem. Here is how to switch themes without dashboard access:</p>

<ol>
<li>Connect via FTP and navigate to <code>/wp-content/themes/</code>.</li>
<li>Rename your active theme folder (e.g., rename <code>astra</code> to <code>astra-disabled</code>).</li>
<li>Make sure a default WordPress theme is present in the <code>themes</code> folder (like <code>twentytwentyfour</code>). If it is not there, <a href="https://wordpress.org/themes/twentytwentyfour/" target="_blank" rel="noopener">download it from WordPress.org</a> and upload it.</li>
<li>WordPress will automatically fall back to the default theme.</li>
</ol>

<p>If your site loads with the default theme, the issue is in your theme. Check if a theme update is available. If you recently edited the theme's <code>functions.php</code> file, the code you added likely has an error — revert it.</p>

<h2>Step 4: Increase the PHP Memory Limit</h2>

<p>If both plugins and theme are fine, you might be hitting the PHP memory limit. WordPress tries to use more memory than the server allows, and PHP silently dies instead of showing an error.</p>

<p>Add this to <code>wp-config.php</code>, just above the "That's all, stop editing!" comment:</p>

<pre><code>define('WP_MEMORY_LIMIT', '256M');</code></pre>

<p>If that does not work, try editing your <code>.htaccess</code> file and adding:</p>

<pre><code>php_value memory_limit 256M</code></pre>

<p>Or create/edit a <code>php.ini</code> file in your WordPress root directory:</p>

<pre><code>memory_limit = 256M</code></pre>

<p>Some hosting providers do not allow you to change the memory limit yourself. If none of these methods work, contact your host and ask them to increase it. If you are on a cheap shared hosting plan, this is a good reason to consider upgrading — see my <a href="/how-to-choose-wordpress-hosting/">hosting comparison guide</a> for better options.</p>

<p>For a deeper dive into memory issues, read my dedicated guide: <a href="/fix-wordpress-memory-exhausted-error/">How to Fix WordPress Memory Exhausted Error</a>.</p>

<h2>Step 5: Check for Corrupted Core Files</h2>

<p>In rare cases, the White Screen of Death is caused by corrupted WordPress core files. This can happen after a failed update, a server crash, or a hacking incident.</p>

<ol>
<li>Download a fresh copy of WordPress from <a href="https://wordpress.org/download/" target="_blank" rel="noopener">wordpress.org</a>.</li>
<li>Extract the ZIP file on your computer.</li>
<li>Upload the <code>wp-admin</code> and <code>wp-includes</code> folders to your server via FTP, overwriting the existing folders.</li>
<li><strong>Do NOT upload the <code>wp-content</code> folder</strong> — that contains your themes, plugins, and uploads.</li>
</ol>

<p>This replaces all core files with clean versions without touching your content or settings.</p>

<h2>Step 6: Check PHP Version Compatibility</h2>

<p>If your host recently upgraded PHP (say from PHP 7.4 to PHP 8.2), some older plugins or themes might not be compatible with the new version. This can trigger fatal errors that cause the white screen.</p>

<p>Most hosts let you change the PHP version from the control panel:</p>

<ol>
<li>Log in to your hosting control panel (cPanel, Plesk, or your host's custom panel).</li>
<li>Look for "PHP Version" or "PHP Selector" or "MultiPHP Manager".</li>
<li>Temporarily switch to a lower PHP version (e.g., PHP 8.0 instead of 8.2).</li>
<li>Reload your site.</li>
</ol>

<p>If the site comes back, one of your plugins or your theme is not compatible with the newer PHP version. Update your plugins and theme, then try switching back to the newer PHP version.</p>

<h2>Step 7: Increase PHP Text Processing Limits</h2>

<p>On some sites (especially those with very long posts or complex page builder layouts), the white screen can be caused by PHP hitting its recursion or backtrack limits during text processing.</p>

<p>Add these lines to your <code>.htaccess</code> file:</p>

<pre><code>php_value pcre.recursion_limit 20000000
php_value pcre.backtrack_limit 10000000</code></pre>

<p>This is a less common fix, but I have seen it solve the WSoD on sites using page builders like Elementor or Divi with very long, complex page layouts.</p>

<h2>Still Stuck? Here Is What to Do</h2>

<p>If none of the above steps fixed the white screen, here are your remaining options:</p>

<ul>
<li><strong>Check the server error log.</strong> In cPanel, go to <strong>Errors</strong> or <strong>Error Log</strong>. This log often has the exact PHP error that is causing the problem.</li>
<li><strong>Contact your hosting provider.</strong> They can check server-side logs and configurations that you cannot access. Good hosts will help you troubleshoot.</li>
<li><strong>Restore from backup.</strong> If you have a recent backup (and you should — see my <a href="/wordpress-backup-guide/">backup guide</a>), restoring to a point before the error started is often the fastest solution.</li>
</ul>

<h2>Preventing the White Screen in the Future</h2>

<p>After fixing the WSoD, take these steps to prevent it from happening again:</p>

<ul>
<li><strong>Keep everything updated</strong> — Outdated plugins are the #1 cause of the white screen.</li>
<li><strong>Test updates on staging first</strong> — Most managed hosts include a staging environment. Use it.</li>
<li><strong>Use quality plugins only</strong> — Check the <a href="/best-wordpress-plugins/">best WordPress plugins</a> for my tested recommendations.</li>
<li><strong>Set up automated backups</strong> — So you can always restore quickly if something goes wrong.</li>
<li><strong>Never edit theme files directly</strong> — Use a child theme instead, so updates do not overwrite your changes.</li>
</ul>

<p>The White Screen of Death sounds dramatic, but it is almost always fixable in under 15 minutes. The key is staying calm, working through the steps methodically, and not making changes you cannot undo. Your content is safe — you just need to get WordPress rendering again.</p>

<p>For more troubleshooting guides, see my complete list of <a href="/common-wordpress-errors/">common WordPress errors</a>.</p>
`;

// ─── Supporting: How to Fix Error Establishing a Database Connection ─────────

export const seedDatabaseConnectionError = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "fix-error-establishing-database-connection";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-errors' not found. Seed the wordpress-errors cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Fix \"Error Establishing a Database Connection\" in WordPress",
      excerpt:
        "Seeing \"Error establishing a database connection\" on your WordPress site? I walk through every cause and fix — from wrong credentials in wp-config.php to corrupted databases and server issues.",
      content: databaseConnectionContent,
      category: "errors",
      tags: [
        "database connection error",
        "wordpress database",
        "wp-config.php",
        "mysql",
        "database repair",
        "wordpress errors",
        "phpmyadmin",
        "database credentials",
      ],
      seoTitle:
        "How to Fix \"Error Establishing a Database Connection\" in WordPress (2026)",
      seoDescription:
        "Step-by-step guide to fix the WordPress database connection error. Check wp-config.php credentials, repair your database, and get your site back online.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing database connection error article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      return {
        message: "Created new database connection error article",
        id: postId,
      };
    }
  },
});

const databaseConnectionContent = `
<p>There is something uniquely panic-inducing about opening your WordPress site and seeing nothing but the words "Error establishing a database connection" on a blank page. No header, no content, no sidebar — just that one devastating line. I have seen this error dozens of times on client sites, and the first time it happened to me, I thought my entire site was gone.</p>

<p>It was not. And yours is not gone either. This error simply means WordPress cannot talk to the MySQL database where all your content lives. The content is still there — WordPress just cannot reach it. Let me show you how to fix it.</p>

<img src="/screenshots/wordpress-requirements-page.webp" alt="WordPress requirements page showing database server requirements" />

<h2>What Causes This Error?</h2>

<p>WordPress needs a database to store everything — posts, pages, comments, settings, user accounts. Every time someone visits your site, WordPress connects to MySQL, pulls the data, and builds the page. When that connection fails, WordPress has nothing to display.</p>

<p>The four most common causes are:</p>

<ol>
<li><strong>Wrong database credentials in wp-config.php</strong> — This is the cause about 80% of the time. Someone changed a password, the host migrated the database, or the credentials were entered incorrectly.</li>
<li><strong>Corrupted database</strong> — Tables can become corrupted after a server crash, a failed update, or a hosting issue.</li>
<li><strong>Database server is down</strong> — The MySQL server on your host is overloaded or temporarily offline.</li>
<li><strong>Corrupted WordPress files</strong> — In rare cases, core WordPress files that handle the database connection are corrupted.</li>
</ol>

<h2>Step 1: Check Your wp-config.php Credentials</h2>

<p>This is the fix 8 out of 10 times. Open your <code>wp-config.php</code> file (in the root of your WordPress installation) via FTP or your hosting file manager. Look for these four lines:</p>

<pre><code>define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_database_username');
define('DB_PASSWORD', 'your_database_password');
define('DB_HOST', 'localhost');</code></pre>

<p>Each of these values must match exactly what your hosting account has configured. Here is how to verify them:</p>

<ol>
<li>Log in to your hosting control panel (cPanel, Plesk, etc.).</li>
<li>Find the <strong>MySQL Databases</strong> section.</li>
<li>Check that the database name listed in <code>DB_NAME</code> exists.</li>
<li>Check that the database user listed in <code>DB_USER</code> exists and is assigned to that database.</li>
<li>If you are unsure about the password, you can reset it in the control panel and update <code>DB_PASSWORD</code> in wp-config.php.</li>
</ol>

<p><strong>Common gotcha: DB_HOST.</strong> Most hosts use <code>localhost</code>, but some (like certain GoDaddy plans) use a specific hostname like <code>dbserver123.hosting.com</code>. Check your host's documentation or ask their support team if you are unsure.</p>

<p>After updating the credentials, save the file and reload your site. If it works, you are done.</p>

<h2>Step 2: Test the Database Connection Manually</h2>

<p>If you are not sure whether the credentials are correct, you can test the connection with a simple PHP script. Create a file called <code>testdb.php</code> in your WordPress root directory with this content:</p>

<pre><code>&lt;?php
$link = mysqli_connect('DB_HOST_VALUE', 'DB_USER_VALUE', 'DB_PASSWORD_VALUE', 'DB_NAME_VALUE');
if (!$link) {
    die('Connection failed: ' . mysqli_connect_error());
} else {
    echo 'Connected successfully!';
}
mysqli_close($link);
?&gt;</code></pre>

<p>Replace the placeholder values with your actual database credentials from wp-config.php. Upload the file and visit <code>yourdomain.com/testdb.php</code> in your browser.</p>

<ul>
<li>If you see "Connected successfully!" — the credentials are fine, and the issue is elsewhere.</li>
<li>If you see "Connection failed" — the credentials are wrong, or the database server is down.</li>
</ul>

<p><strong>Important:</strong> Delete <code>testdb.php</code> immediately after testing. Leaving it on your server is a security risk.</p>

<h2>Step 3: Repair the Database</h2>

<p>If your credentials are correct but the error persists, your database might be corrupted. WordPress has a built-in repair tool. Add this line to <code>wp-config.php</code>:</p>

<pre><code>define('WP_ALLOW_REPAIR', true);</code></pre>

<p>Then visit: <code>https://yourdomain.com/wp-admin/maint/repair.php</code></p>

<p>You will see two options:</p>

<ul>
<li><strong>Repair Database</strong> — Fixes corrupted tables.</li>
<li><strong>Repair and Optimize Database</strong> — Fixes corrupted tables and optimizes them for better performance. This takes longer but is more thorough.</li>
</ul>

<p>Click "Repair and Optimize Database" and wait for it to complete. You will see a status report for each table.</p>

<p><strong>Important:</strong> Remove the <code>WP_ALLOW_REPAIR</code> line from wp-config.php after you are done. This page does not require authentication, so leaving it enabled is a security risk.</p>

<h2>Step 4: Repair via phpMyAdmin</h2>

<p>If the WordPress repair tool does not work (or you cannot access it), you can repair database tables directly in phpMyAdmin:</p>

<ol>
<li>Log in to your hosting control panel and open <strong>phpMyAdmin</strong>.</li>
<li>Select your WordPress database from the left sidebar.</li>
<li>Click <strong>Check All</strong> to select all tables.</li>
<li>From the "With selected" dropdown, choose <strong>Repair table</strong>.</li>
</ol>

<p>phpMyAdmin will attempt to repair each table and show you the results. Look for any tables marked as "corrupted" — those were the problem.</p>

<p>While you are in phpMyAdmin, you can also check that the <code>wp_options</code> table contains the correct <code>siteurl</code> and <code>home</code> values. Browse the <code>wp_options</code> table and look for these two rows — they should contain your site's URL.</p>

<h2>Step 5: Check if the Database Server Is Down</h2>

<p>If your credentials are correct and the database is not corrupted, the MySQL server itself might be down or overloaded. This is especially common on shared hosting during traffic spikes.</p>

<p>To check:</p>

<ul>
<li><strong>Try accessing phpMyAdmin</strong> — If phpMyAdmin also fails to connect, the database server is likely down.</li>
<li><strong>Check your host's status page</strong> — Most hosting providers have a status page showing known issues.</li>
<li><strong>Contact your host</strong> — Ask them if the MySQL server is experiencing issues.</li>
</ul>

<p>If the database server is down, there is nothing you can do except wait for your host to fix it. If this happens frequently, it is a sign that your host is overselling their servers. Consider moving to a more reliable provider — see my <a href="/how-to-choose-wordpress-hosting/">hosting comparison guide</a> for recommendations.</p>

<h2>Step 6: Check for Corrupted WordPress Files</h2>

<p>In rare cases, the files that handle the database connection (<code>wp-includes/wp-db.php</code> or related files) can become corrupted. To fix this:</p>

<ol>
<li>Download a fresh copy of WordPress from <a href="https://wordpress.org/download/" target="_blank" rel="noopener">wordpress.org</a>.</li>
<li>Extract the ZIP file on your computer.</li>
<li>Upload the <code>wp-admin</code> and <code>wp-includes</code> folders to your server via FTP, overwriting the existing ones.</li>
<li><strong>Do NOT overwrite <code>wp-content</code></strong> — that folder contains your themes, plugins, and uploads.</li>
<li><strong>Do NOT overwrite <code>wp-config.php</code></strong> — that file contains your database credentials and settings.</li>
</ol>

<h2>Step 7: Check if Only the Admin Area Is Affected</h2>

<p>Sometimes the front-end of your site works fine, but the admin area (<code>/wp-admin/</code>) shows the database connection error. This usually means your database is functional but certain tables (specifically <code>wp_options</code> or <code>wp_users</code>) are corrupted.</p>

<p>Use the database repair methods from Steps 3 and 4 above, paying special attention to the <code>wp_options</code> and <code>wp_usermeta</code> tables.</p>

<h2>Preventing This Error in the Future</h2>

<p>Once your site is back online, take these preventive steps:</p>

<ul>
<li><strong>Set up automated backups</strong> — Both files and database. My <a href="/wordpress-backup-guide/">WordPress backup guide</a> shows you how.</li>
<li><strong>Keep your database optimized</strong> — Use a plugin or cron job to clean up post revisions, spam comments, and transient data regularly. See my <a href="/wordpress-database-optimization/">database optimization guide</a> for details.</li>
<li><strong>Never change database credentials without updating wp-config.php</strong> — This sounds obvious, but it is the most common cause of this error.</li>
<li><strong>Choose reliable hosting</strong> — Database server downtime is a hosting problem. Quality hosts have redundant database servers with failover. If yours does not, it might be time to <a href="/migrate-wordpress-to-new-host/">migrate to a better host</a>.</li>
<li><strong>Keep WordPress and plugins updated</strong> — Failed updates can corrupt database tables.</li>
</ul>

<p>The "Error establishing a database connection" message is scary, but the fix is almost always straightforward. In most cases, it takes less than 10 minutes. Your content is safe — you just need to reconnect WordPress to it.</p>

<p>For more troubleshooting help, see my complete guide to <a href="/common-wordpress-errors/">common WordPress errors</a>.</p>
`;

// ─── Supporting: How to Fix the 500 Internal Server Error ────────────────────

export const seedInternalServerError = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "fix-500-internal-server-error";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-errors' not found. Seed the wordpress-errors cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Fix the 500 Internal Server Error in WordPress",
      excerpt:
        "The 500 Internal Server Error tells you nothing useful — just that something broke. I walk through the most common causes and the exact steps to fix each one, from .htaccess to plugin conflicts.",
      content: internalServerErrorContent,
      category: "errors",
      tags: [
        "500 internal server error",
        "http 500",
        "server error",
        "wordpress errors",
        ".htaccess",
        "php memory limit",
        "plugin conflict",
        "wordpress troubleshooting",
      ],
      seoTitle:
        "How to Fix the 500 Internal Server Error in WordPress (2026)",
      seoDescription:
        "Step-by-step guide to fix the WordPress 500 Internal Server Error. Covers .htaccess, PHP memory, plugin conflicts, and corrupted core files.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing 500 error article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      return {
        message: "Created new 500 error article",
        id: postId,
      };
    }
  },
});

const internalServerErrorContent = `
<p>Few things are more frustrating than the 500 Internal Server Error. It is the server's way of saying "something went wrong, but I have no idea what." No helpful error message, no stack trace, no pointer to the file that broke — just a generic error page. I have fixed this error more times than I can count, and the good news is that the cause is almost always one of four things.</p>

<p>Let me walk you through each potential cause and the exact steps to fix it.</p>

<img src="/screenshots/wordpress-debug-advanced.webp" alt="WordPress advanced debugging documentation page" />

<h2>What Causes the 500 Internal Server Error?</h2>

<p>The 500 error is a server-side HTTP error code. It means the web server (Apache or Nginx) encountered a condition it could not handle. In WordPress, the most common causes are:</p>

<ol>
<li><strong>Corrupted .htaccess file</strong> — By far the most common cause. Bad rewrite rules or conflicting directives in .htaccess crash Apache.</li>
<li><strong>PHP memory limit exceeded</strong> — A script uses more memory than allowed, and PHP dies with a 500 error instead of a proper message.</li>
<li><strong>Plugin or theme conflict</strong> — A buggy plugin or theme causes a PHP fatal error that the server cannot recover from.</li>
<li><strong>Corrupted WordPress core files</strong> — A failed update, a file permission issue, or a hacking incident can corrupt essential files.</li>
</ol>

<h2>Step 1: Check the .htaccess File</h2>

<p>This is where I always start because it is the cause about half the time. The <code>.htaccess</code> file controls how Apache handles URL rewrites, redirects, and other server rules. When a plugin or a manual edit adds bad rules, it crashes the server.</p>

<ol>
<li>Connect to your site via FTP (I use FileZilla) or your hosting file manager.</li>
<li>In your WordPress root directory, find the <code>.htaccess</code> file. Note: it is a hidden file, so make sure your FTP client shows hidden files (in FileZilla: <strong>Server &rarr; Force showing hidden files</strong>).</li>
<li>Rename <code>.htaccess</code> to <code>.htaccess_backup</code>.</li>
<li>Create a new <code>.htaccess</code> file with the default WordPress rewrite rules:</li>
</ol>

<pre><code># BEGIN WordPress
&lt;IfModule mod_rewrite.c&gt;
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
&lt;/IfModule&gt;
# END WordPress</code></pre>

<p>Save the file and reload your site. If the error is gone, the old .htaccess had bad rules. You can also regenerate .htaccess from WordPress: go to <strong>Settings &rarr; Permalinks</strong> and click "Save Changes."</p>

<p>If the error persists, restore your backup by renaming <code>.htaccess_backup</code> back to <code>.htaccess</code> and move on to the next step.</p>

<h2>Step 2: Increase the PHP Memory Limit</h2>

<p>If a PHP script runs out of memory, the server may respond with a 500 error. This is especially common on shared hosting plans with low memory limits (64MB or 128MB).</p>

<p>Try increasing the memory limit using one of these methods:</p>

<p><strong>Method 1: wp-config.php</strong> (recommended)</p>
<p>Add this line above the "That's all, stop editing!" comment:</p>

<pre><code>define('WP_MEMORY_LIMIT', '256M');</code></pre>

<p><strong>Method 2: .htaccess</strong></p>
<p>Add this line at the top of your .htaccess file:</p>

<pre><code>php_value memory_limit 256M</code></pre>

<p><strong>Method 3: php.ini</strong></p>
<p>Create or edit a <code>php.ini</code> file in your WordPress root:</p>

<pre><code>memory_limit = 256M</code></pre>

<p>Not all hosts support all methods. If one does not work, try the next. For a complete walkthrough, see my <a href="/fix-wordpress-memory-exhausted-error/">memory exhausted error guide</a>.</p>

<h2>Step 3: Disable All Plugins</h2>

<p>A plugin conflict is one of the most common causes of the 500 error. If you can access the WordPress dashboard, go to <strong>Plugins &rarr; Installed Plugins</strong>, select all plugins, and choose "Deactivate" from the bulk actions dropdown.</p>

<p>If you cannot access the dashboard (more likely), disable plugins via FTP:</p>

<ol>
<li>Navigate to <code>/wp-content/</code>.</li>
<li>Rename the <code>plugins</code> folder to <code>plugins-disabled</code>.</li>
<li>Reload your site.</li>
</ol>

<p>If the error disappears, a plugin is the culprit. Rename the folder back to <code>plugins</code> and reactivate plugins one by one from the dashboard. Test your site after each activation. When the 500 error returns, you have found the problematic plugin.</p>

<p>Common plugins that cause 500 errors include caching plugins (when they write bad .htaccess rules), security plugins (when they add complex server rules), and page builders (when they exceed memory limits).</p>

<h2>Step 4: Switch to a Default Theme</h2>

<p>If disabling plugins did not help, your theme might be the problem. Rename your active theme folder via FTP:</p>

<ol>
<li>Navigate to <code>/wp-content/themes/</code>.</li>
<li>Rename your active theme folder (e.g., <code>my-theme</code> to <code>my-theme-disabled</code>).</li>
<li>WordPress will fall back to a default theme (like Twenty Twenty-Four).</li>
</ol>

<p>If the site loads with the default theme, your theme has a bug. Check for available updates or contact the theme developer.</p>

<h2>Step 5: Re-upload WordPress Core Files</h2>

<p>If none of the above steps worked, your core WordPress files might be corrupted. This can happen after a failed update, a server crash, or a security breach.</p>

<ol>
<li>Download a fresh copy of WordPress from <a href="https://wordpress.org/download/" target="_blank" rel="noopener">wordpress.org</a>.</li>
<li>Extract the ZIP on your computer.</li>
<li>Upload the <code>wp-admin</code> and <code>wp-includes</code> folders to your server, overwriting the existing ones.</li>
<li><strong>Do NOT upload <code>wp-content</code></strong> (that is your content) or <strong><code>wp-config.php</code></strong> (that is your configuration).</li>
</ol>

<p>This gives you clean core files without affecting your content, themes, plugins, or settings.</p>

<h2>Step 6: Check File Permissions</h2>

<p>Incorrect file permissions can trigger 500 errors. WordPress requires specific permissions to function properly:</p>

<ul>
<li><strong>Directories:</strong> 755 (<code>rwxr-xr-x</code>)</li>
<li><strong>Files:</strong> 644 (<code>rw-r--r--</code>)</li>
<li><strong>wp-config.php:</strong> 600 or 640 for extra security</li>
</ul>

<p>You can check and fix permissions via FTP. In FileZilla, right-click a file or folder and select "File permissions." Set directories to 755 and files to 644. If you have SSH access, you can fix all permissions at once:</p>

<pre><code>find /path/to/wordpress/ -type d -exec chmod 755 {} \\;
find /path/to/wordpress/ -type f -exec chmod 644 {} \\;</code></pre>

<h2>Step 7: Check Server Error Logs</h2>

<p>If you have tried everything and the 500 error persists, the server error log is your best friend. Unlike the generic error page, the log contains the specific PHP error that caused the problem.</p>

<ul>
<li><strong>cPanel:</strong> Go to <strong>Errors</strong> or <strong>Error Log</strong> in the Metrics section.</li>
<li><strong>Plesk:</strong> Go to <strong>Websites &amp; Domains &rarr; Logs</strong>.</li>
<li><strong>SSH:</strong> Check <code>/var/log/apache2/error.log</code> or <code>/var/log/nginx/error.log</code>.</li>
</ul>

<p>The log will show you the exact file, line number, and error message. This information makes fixing the problem much easier.</p>

<p>You can also enable WordPress debug logging by adding these lines to <code>wp-config.php</code>:</p>

<pre><code>define('WP_DEBUG', true);
define('WP_DEBUG_LOG', true);
define('WP_DEBUG_DISPLAY', false);</code></pre>

<p>After enabling this, reproduce the error and then check <code>/wp-content/debug.log</code> for the specific error message.</p>

<h2>When to Contact Your Host</h2>

<p>If none of the above fixes work, the issue might be on the server side — something you cannot fix yourself. Contact your hosting provider and tell them:</p>

<ul>
<li>You are seeing a 500 Internal Server Error.</li>
<li>You have already tried fixing .htaccess, increasing memory, disabling plugins, and switching themes.</li>
<li>Ask them to check the server error logs for the specific PHP error.</li>
</ul>

<p>Good hosting providers will investigate and fix server-side issues. If your host is unhelpful or this happens frequently, it might be time to <a href="/migrate-wordpress-to-new-host/">migrate to a better host</a>.</p>

<h2>Preventing 500 Errors</h2>

<ul>
<li><strong>Keep WordPress, themes, and plugins updated</strong> — Outdated software is the #1 cause of conflicts.</li>
<li><strong>Use a staging environment</strong> — Test updates before pushing to production.</li>
<li><strong>Do not edit .htaccess manually</strong> unless you know what you are doing.</li>
<li><strong>Set up monitoring</strong> — Use a free uptime tool to get alerted when your site goes down.</li>
<li><strong>Maintain regular backups</strong> — So you can restore quickly. See my <a href="/wordpress-backup-guide/">backup guide</a>.</li>
</ul>

<p>The 500 error is generic, but the fix almost never is. Work through these steps in order and you will find the cause. For more troubleshooting guides, check my <a href="/common-wordpress-errors/">complete list of common WordPress errors</a>.</p>
`;

// ─── Supporting: How to Fix WordPress Memory Exhausted Error ─────────────────

export const seedMemoryExhaustedError = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "fix-wordpress-memory-exhausted-error";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-errors' not found. Seed the wordpress-errors cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Fix the WordPress Memory Exhausted Error",
      excerpt:
        "Seeing \"Fatal error: Allowed memory size of X bytes exhausted\"? I explain why this happens and show you 4 ways to increase the WordPress memory limit — with exact code snippets for each method.",
      content: memoryExhaustedContent,
      category: "errors",
      tags: [
        "memory exhausted",
        "php memory limit",
        "wp_memory_limit",
        "wordpress errors",
        "fatal error",
        "wp-config.php",
        "php.ini",
        "wordpress memory",
      ],
      seoTitle:
        "How to Fix the WordPress Memory Exhausted Error (2026)",
      seoDescription:
        "Fix the WordPress \"Allowed memory size exhausted\" error. 4 methods to increase PHP memory: wp-config.php, .htaccess, php.ini, and hosting panel.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing memory exhausted article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      return {
        message: "Created new memory exhausted article",
        id: postId,
      };
    }
  },
});

const memoryExhaustedContent = `
<p>You are working on your WordPress site — maybe uploading an image, installing a plugin, or just loading a page — and suddenly you see this:</p>

<pre><code>Fatal error: Allowed memory size of 67108864 bytes exhausted (tried to allocate 2097152 bytes) in /home/user/public_html/wp-includes/class-wpdb.php on line 2154</code></pre>

<p>That number — 67108864 bytes — translates to 64MB of PHP memory. Your site tried to use more than that, and PHP refused. The page crashes and shows this error instead of your content.</p>

<p>I have seen this error on sites of all sizes. It is especially common on shared hosting plans that set low memory limits. The fix is almost always the same: increase the memory limit. Let me show you exactly how.</p>

<img src="/screenshots/php-memory-limit-docs.webp" alt="PHP documentation page showing memory_limit configuration" />

<h2>What Is the PHP Memory Limit?</h2>

<p>Every PHP script that runs on your server has a maximum amount of memory (RAM) it is allowed to use. This limit exists to prevent a single buggy script from consuming all available server memory and crashing the entire server.</p>

<p>WordPress sets its own internal memory limits:</p>

<ul>
<li><strong>Front-end:</strong> 40MB by default (defined by <code>WP_MEMORY_LIMIT</code>)</li>
<li><strong>Admin area:</strong> 256MB by default (defined by <code>WP_MAX_MEMORY_LIMIT</code>)</li>
</ul>

<p>However, your hosting provider also sets a PHP memory limit at the server level. If the server limit is lower than what WordPress needs (for example, 64MB on a cheap shared host), the server limit wins and WordPress crashes.</p>

<h2>Why Does This Error Happen?</h2>

<p>The memory exhausted error typically occurs when:</p>

<ul>
<li><strong>A resource-heavy plugin loads</strong> — Page builders, WooCommerce, and backup plugins use significant memory.</li>
<li><strong>You upload large images</strong> — WordPress generates multiple sizes of each image, which uses memory.</li>
<li><strong>You import content</strong> — Importing a large XML file or database can exceed the limit.</li>
<li><strong>Multiple plugins conflict</strong> — Each plugin adds to memory usage. When you have 20+ active plugins, the total can exceed the limit.</li>
<li><strong>Your theme is complex</strong> — Themes with lots of options, custom widgets, and built-in features use more memory.</li>
</ul>

<h2>Method 1: Increase WP_MEMORY_LIMIT in wp-config.php (Recommended)</h2>

<p>This is the fastest and most reliable method. It tells WordPress to request more memory from PHP.</p>

<ol>
<li>Connect to your site via FTP or your hosting file manager.</li>
<li>Open <code>wp-config.php</code> in the root directory of your WordPress installation.</li>
<li>Find the line that says: <code>/* That's all, stop editing! Happy publishing. */</code></li>
<li>Add these lines <strong>just above</strong> that comment:</li>
</ol>

<pre><code>define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');</code></pre>

<p><code>WP_MEMORY_LIMIT</code> sets the front-end memory limit. <code>WP_MAX_MEMORY_LIMIT</code> sets the admin area limit. For most sites, 256M is plenty. WooCommerce stores or sites with many plugins might need 512M.</p>

<p>Save the file and reload your site. If the error is gone, you are done.</p>

<p><strong>Note:</strong> This method only works if your hosting provider allows WordPress to use that much memory. Some shared hosts cap PHP memory at 128MB regardless of what you put in wp-config.php. If this method does not work, try Method 2 or contact your host.</p>

<h2>Method 2: Increase the PHP Memory Limit in .htaccess</h2>

<p>If the wp-config.php method did not work, you can try setting the PHP memory limit directly in <code>.htaccess</code>. This method works on Apache servers (which most shared hosts use).</p>

<ol>
<li>Open the <code>.htaccess</code> file in your WordPress root directory.</li>
<li>Add this line at the very top of the file, before the WordPress rewrite rules:</li>
</ol>

<pre><code>php_value memory_limit 256M</code></pre>

<p>Save and reload your site. If you see a 500 Internal Server Error after adding this, your host does not allow <code>php_value</code> overrides in .htaccess. Remove the line and try Method 3.</p>

<h2>Method 3: Create or Edit php.ini</h2>

<p>Some hosts read PHP settings from a <code>php.ini</code> file in your WordPress root directory. If your host supports this method:</p>

<ol>
<li>Check if a <code>php.ini</code> file already exists in your WordPress root. If it does, open it. If not, create a new file called <code>php.ini</code>.</li>
<li>Add this line:</li>
</ol>

<pre><code>memory_limit = 256M</code></pre>

<p>Some hosts use <code>.user.ini</code> instead of <code>php.ini</code>. If <code>php.ini</code> does not work, try creating <code>.user.ini</code> with the same content.</p>

<p>Save the file and wait a few minutes (some hosts cache PHP settings). Then reload your site.</p>

<h2>Method 4: Increase Memory via Your Hosting Control Panel</h2>

<p>Many hosting providers let you change PHP settings directly from their control panel. This is the most reliable method because it changes the server-level setting.</p>

<p><strong>cPanel (most shared hosts):</strong></p>
<ol>
<li>Log in to cPanel.</li>
<li>Look for <strong>"MultiPHP INI Editor"</strong> or <strong>"PHP Configuration"</strong>.</li>
<li>Select your domain.</li>
<li>Find the <code>memory_limit</code> setting.</li>
<li>Change it to <code>256M</code> (or higher if available).</li>
<li>Click "Apply" or "Save."</li>
</ol>

<p><strong>Plesk:</strong></p>
<ol>
<li>Go to <strong>Websites &amp; Domains</strong>.</li>
<li>Click <strong>PHP Settings</strong>.</li>
<li>Find <code>memory_limit</code> and set it to <code>256M</code>.</li>
<li>Click "OK" or "Apply."</li>
</ol>

<h2>How to Check Your Current Memory Limit</h2>

<p>Want to verify what your current PHP memory limit is? Go to <strong>Tools &rarr; Site Health</strong> in your WordPress dashboard, then click the <strong>Info</strong> tab. Expand the <strong>Server</strong> section and look for "PHP memory limit." This shows you the effective limit — the actual amount of memory PHP is allowed to use.</p>

<p>You can also check by creating a simple PHP file. Create <code>phpinfo.php</code> in your WordPress root:</p>

<pre><code>&lt;?php phpinfo(); ?&gt;</code></pre>

<p>Visit <code>yourdomain.com/phpinfo.php</code> and search for "memory_limit" on the page. <strong>Delete this file immediately after checking</strong> — it exposes sensitive server information.</p>

<h2>What If Increasing Memory Does Not Fix It?</h2>

<p>If you have increased the memory limit to 256M or higher and still see the error, the problem is not the limit — something on your site is using an abnormal amount of memory. Here is what to check:</p>

<ul>
<li><strong>Deactivate plugins one by one</strong> — Find out which plugin is consuming all the memory. Start with the heaviest ones: page builders, WooCommerce, backup plugins, and analytics plugins.</li>
<li><strong>Switch to a default theme</strong> — Complex themes can use 50MB+ of memory on their own.</li>
<li><strong>Check for infinite loops</strong> — A plugin or theme might have a coding bug that creates an infinite loop, consuming all available memory.</li>
<li><strong>Optimize your images</strong> — If you upload very large images (5000x3000 pixels), WordPress tries to generate multiple sizes and can run out of memory. Resize images before uploading, or use an <a href="/best-image-optimization-plugins/">image optimization plugin</a>.</li>
</ul>

<h2>Recommended Memory Settings</h2>

<table>
<thead>
<tr><th>Site Type</th><th>Recommended WP_MEMORY_LIMIT</th></tr>
</thead>
<tbody>
<tr><td>Simple blog (few plugins)</td><td>128M</td></tr>
<tr><td>Business site (10-15 plugins)</td><td>256M</td></tr>
<tr><td>WooCommerce store</td><td>512M</td></tr>
<tr><td>Membership site / LMS</td><td>512M</td></tr>
<tr><td>Heavy page builder usage</td><td>512M</td></tr>
</tbody>
</table>

<p>If your hosting plan does not allow memory limits above 128MB, you are on a plan that is too small for your site. Consider upgrading to a host with more resources — my <a href="/how-to-choose-wordpress-hosting/">hosting guide</a> covers the best options at every price point.</p>

<p>The memory exhausted error is one of the most common WordPress errors, but it is also one of the easiest to fix. Add one line to wp-config.php and you are usually back in business. For more fixes, see my complete guide to <a href="/common-wordpress-errors/">common WordPress errors</a>.</p>
`;

// ─── Supporting: How to Fix Too Many Redirects Error ─────────────────────────

export const seedTooManyRedirects = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "fix-too-many-redirects";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-errors"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-errors' not found. Seed the wordpress-errors cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Fix the \"Too Many Redirects\" Error in WordPress",
      excerpt:
        "Stuck in a redirect loop? I explain what causes ERR_TOO_MANY_REDIRECTS in WordPress and walk through 6 fixes — from clearing cookies to fixing SSL conflicts and .htaccess rules.",
      content: tooManyRedirectsContent,
      category: "errors",
      tags: [
        "too many redirects",
        "redirect loop",
        "err_too_many_redirects",
        "wordpress errors",
        "ssl redirect",
        "cloudflare ssl",
        ".htaccess",
        "wordpress url settings",
      ],
      seoTitle:
        "How to Fix \"Too Many Redirects\" in WordPress (2026)",
      seoDescription:
        "Fix the WordPress ERR_TOO_MANY_REDIRECTS error. Step-by-step guide covering cookies, URL settings, .htaccess, SSL conflicts, and Cloudflare configuration.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing too many redirects article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      return {
        message: "Created new too many redirects article",
        id: postId,
      };
    }
  },
});

const tooManyRedirectsContent = `
<p>You try to open your WordPress site and the browser shows "This page isn't working — yourdomain.com redirected you too many times" (or "ERR_TOO_MANY_REDIRECTS" in Chrome). Instead of loading your site, the browser detected an infinite loop: page A sends you to page B, which sends you back to page A, over and over until the browser gives up.</p>

<p>I first ran into this error years ago after switching a client's site from HTTP to HTTPS. The SSL certificate was installed, but the WordPress settings and the server configuration were fighting over which protocol to use — creating an endless redirect loop. It took me an hour to figure out back then. With this guide, you can fix it in 5 minutes.</p>

<img src="/screenshots/chrome-devtools-network.webp" alt="Chrome DevTools Network panel for inspecting redirect chains" />

<h2>What Causes the Too Many Redirects Error?</h2>

<p>A redirect loop happens when two or more redirect rules conflict with each other. The most common causes in WordPress are:</p>

<ol>
<li><strong>Misconfigured WordPress URL settings</strong> — The WordPress Address (URL) and Site Address (URL) in your settings do not match, or they use different protocols (one uses http://, the other uses https://).</li>
<li><strong>SSL/HTTPS conflict</strong> — Your server forces HTTPS, but WordPress is configured for HTTP (or vice versa). The server redirects to HTTPS, WordPress redirects to HTTP, and the loop begins.</li>
<li><strong>Faulty .htaccess rules</strong> — Manual redirect rules or rules added by plugins create a conflicting loop.</li>
<li><strong>Plugin conflict</strong> — A caching plugin, SSL plugin, or redirect plugin adds rules that conflict with your server configuration.</li>
<li><strong>Cloudflare SSL mode mismatch</strong> — If you use Cloudflare, the SSL mode must match your server configuration. Using "Flexible" when your server also forces HTTPS creates a redirect loop.</li>
<li><strong>Stale browser cookies</strong> — Old cookies can contain redirect information that creates a loop even after you have fixed the underlying issue.</li>
</ol>

<h2>Step 1: Clear Your Browser Cookies</h2>

<p>Before troubleshooting, clear your browser cookies for your domain. Old cookies sometimes contain redirect paths that create loops even after the server-side issue is fixed.</p>

<p><strong>In Chrome:</strong></p>
<ol>
<li>Click the padlock icon (or "Not Secure" text) in the address bar.</li>
<li>Click <strong>"Cookies and site data"</strong>.</li>
<li>Click <strong>"Manage on-device site data"</strong>.</li>
<li>Delete all cookies for your domain.</li>
</ol>

<p><strong>In Firefox:</strong></p>
<ol>
<li>Click the padlock icon in the address bar.</li>
<li>Click <strong>"Clear cookies and site data"</strong>.</li>
</ol>

<p>After clearing cookies, reload the page. If the error is gone, you had stale cookies. If the error persists, continue to the next step.</p>

<h2>Step 2: Check WordPress URL Settings</h2>

<p>The WordPress Address and Site Address must match. If they do not — for example, one uses <code>http://</code> and the other uses <code>https://</code>, or one includes <code>www.</code> and the other does not — WordPress creates a redirect loop.</p>

<p>If you can access your WordPress dashboard, go to <strong>Settings &rarr; General</strong>. Check the two URL fields:</p>

<ul>
<li><strong>WordPress Address (URL):</strong> <code>https://yourdomain.com</code></li>
<li><strong>Site Address (URL):</strong> <code>https://yourdomain.com</code></li>
</ul>

<p>Both fields should be identical — same protocol (http or https), same domain, and same www/non-www format.</p>

<p>If you <strong>cannot</strong> access the dashboard (because the redirect loop blocks it), you need to fix these values directly in the database:</p>

<ol>
<li>Log in to your hosting control panel and open <strong>phpMyAdmin</strong>.</li>
<li>Select your WordPress database from the left sidebar.</li>
<li>Open the <code>wp_options</code> table (the prefix might be different — check <code>wp-config.php</code> for <code>$table_prefix</code>).</li>
<li>Find the rows where <code>option_name</code> is <code>siteurl</code> and <code>home</code>.</li>
<li>Make sure both <code>option_value</code> fields are identical and use the correct protocol.</li>
</ol>

<p>Alternatively, you can force the URLs in <code>wp-config.php</code>. Add these lines above "That's all, stop editing!":</p>

<pre><code>define('WP_HOME', 'https://yourdomain.com');
define('WP_SITEURL', 'https://yourdomain.com');</code></pre>

<p>This overrides the database values. Replace <code>https://yourdomain.com</code> with your actual URL (including the correct protocol).</p>

<h2>Step 3: Reset Your .htaccess File</h2>

<p>A common cause of redirect loops is conflicting rules in the <code>.htaccess</code> file. A plugin might have added a redirect rule that conflicts with another redirect on the server.</p>

<ol>
<li>Connect to your site via FTP.</li>
<li>Rename <code>.htaccess</code> to <code>.htaccess_backup</code>.</li>
<li>Create a new <code>.htaccess</code> file with just the default WordPress rules:</li>
</ol>

<pre><code># BEGIN WordPress
&lt;IfModule mod_rewrite.c&gt;
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
RewriteRule ^index\\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
&lt;/IfModule&gt;
# END WordPress</code></pre>

<p>Save and reload your site. If the redirect loop is gone, the old .htaccess had conflicting rules. If you need HTTPS redirection, add it properly:</p>

<pre><code>RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]</code></pre>

<p>Place this <strong>above</strong> the WordPress rewrite rules. Do not add HTTP-to-HTTPS redirects if your hosting panel or Cloudflare already handles this — that is what creates the loop.</p>

<h2>Step 4: Fix Cloudflare SSL Settings</h2>

<p>If you use Cloudflare (and you should — see my <a href="/setup-cloudflare-cdn-wordpress/">Cloudflare setup guide</a>), the SSL mode must match your server configuration. This is one of the most common causes of redirect loops I see.</p>

<p><strong>The problem:</strong> Cloudflare's "Flexible" SSL mode means Cloudflare connects to your server over HTTP. If your server also has a rule to redirect HTTP to HTTPS, you get an infinite loop: Cloudflare sends HTTP &rarr; server redirects to HTTPS &rarr; Cloudflare receives HTTPS and sends HTTP again &rarr; server redirects again &rarr; infinite loop.</p>

<p><strong>The fix:</strong></p>

<ol>
<li>Log in to your <a href="https://dash.cloudflare.com/" target="_blank" rel="noopener">Cloudflare dashboard</a>.</li>
<li>Go to <strong>SSL/TLS &rarr; Overview</strong>.</li>
<li>Set the encryption mode to <strong>"Full"</strong> or <strong>"Full (Strict)"</strong>.</li>
</ol>

<ul>
<li><strong>Full:</strong> Cloudflare connects to your server over HTTPS but does not validate the certificate. Use this if you have a self-signed certificate.</li>
<li><strong>Full (Strict):</strong> Cloudflare connects over HTTPS and validates the certificate. Use this if you have a proper SSL certificate from your host (which you should). This is the recommended setting.</li>
</ul>

<p>After changing the SSL mode, go to <strong>SSL/TLS &rarr; Edge Certificates</strong> and make sure "Always Use HTTPS" is turned on. Then purge Cloudflare's cache: <strong>Caching &rarr; Configuration &rarr; Purge Everything</strong>.</p>

<h2>Step 5: Disable Plugins That Handle Redirects</h2>

<p>Several types of plugins can cause redirect loops:</p>

<ul>
<li><strong>SSL plugins</strong> (Really Simple SSL, WP Force SSL) — They add redirect rules that can conflict with your server's existing HTTPS redirect.</li>
<li><strong>Caching plugins</strong> (WP Super Cache, W3 Total Cache, LiteSpeed Cache) — They sometimes serve cached redirect responses.</li>
<li><strong>Redirect plugins</strong> (Redirection, Safe Redirect Manager) — They add custom redirect rules that can create loops.</li>
<li><strong>SEO plugins</strong> — Some SEO plugins add canonical redirects (www to non-www, etc.) that can conflict.</li>
</ul>

<p>If you can access the dashboard, deactivate these plugins one at a time and test after each deactivation. If you cannot access the dashboard, rename the plugin folders via FTP to disable them.</p>

<h2>Step 6: Check for Server-Level Redirects</h2>

<p>Sometimes the redirect loop is caused by a server-level configuration, not WordPress. This is common when:</p>

<ul>
<li>Your host forces HTTPS at the server level AND you have a redirect in .htaccess.</li>
<li>Your host forces www AND you have a redirect to non-www (or vice versa).</li>
<li>There is a redirect in an Nginx configuration file that conflicts with WordPress.</li>
</ul>

<p>To check, use a redirect checker tool like <a href="https://httpstatus.io/" target="_blank" rel="noopener">httpstatus.io</a>. Enter your URL and it will show you the entire redirect chain — exactly which URLs are redirecting to which, and which status codes they use (301, 302, etc.). This makes it easy to spot where the loop starts.</p>

<p>You can also check redirects using Chrome DevTools:</p>

<ol>
<li>Open Chrome DevTools (press <code>F12</code>).</li>
<li>Go to the <strong>Network</strong> tab.</li>
<li>Check <strong>"Preserve log"</strong> (so redirects are not cleared).</li>
<li>Reload the page.</li>
<li>Look at the list of requests. Each 301 or 302 response is a redirect. Click on each one to see the "Location" header, which shows where it redirects to.</li>
</ol>

<h2>Preventing Redirect Loops</h2>

<ul>
<li><strong>Use one method for HTTPS redirects.</strong> Pick either .htaccess OR your hosting panel OR Cloudflare — not all three. Multiple layers of HTTPS redirects are the #1 cause of this error.</li>
<li><strong>Keep WordPress URLs consistent.</strong> Make sure the WordPress Address and Site Address in Settings always match your actual domain and protocol.</li>
<li><strong>If using Cloudflare, use Full (Strict) SSL.</strong> Never use "Flexible" if your server has an SSL certificate — it will create a redirect loop.</li>
<li><strong>Test after making URL changes.</strong> After changing SSL settings, permalink structure, or domain configuration, always test in an incognito browser window (which has no cached cookies or redirects).</li>
</ul>

<p>The "Too Many Redirects" error is almost always a configuration mismatch — two systems disagreeing about where to send traffic. Once you identify which two rules are conflicting, the fix is straightforward. For more troubleshooting help, see my full guide to <a href="/common-wordpress-errors/">common WordPress errors</a>.</p>
`;
