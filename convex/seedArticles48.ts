import { internalMutation } from "./_generated/server";

// ─── Supporting: Autoptimize Plugin Review ────────────────────────────────────

export const seedAutoptimizeReview = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "autoptimize-review";

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
      title: "Autoptimize Review: Free Speed Plugin That Actually Works",
      excerpt:
        "Autoptimize minifies and combines your CSS, JavaScript, and HTML to make your WordPress site load faster. I cover what it does, how it compares to WP Rocket and LiteSpeed Cache, and whether the free version is enough.",
      content: autoptimizeReviewContent,
      category: "plugins",
      tags: [
        "autoptimize",
        "wordpress speed",
        "minify css js",
        "page speed optimization",
        "wordpress performance",
        "wordpress plugins",
        "critical css",
      ],
      seoTitle:
        "Autoptimize Review 2026 — Free WordPress Speed Plugin Features & Comparison",
      seoDescription:
        "Autoptimize minifies CSS, JS, and HTML to speed up your WordPress site. Honest review of features, free vs. paid, and how it stacks up against WP Rocket and LiteSpeed Cache.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing Autoptimize review article:", existing._id);
      return {
        message: "Updated existing Autoptimize review article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new Autoptimize review article:", postId);
      return {
        message: "Created new Autoptimize review article",
        id: postId,
      };
    }
  },
});

const autoptimizeReviewContent = `
<img src="/images/blog/autoptimize-review.webp" alt="Autoptimize plugin page on WordPress.org showing 1 million+ active installations and 4.7-star rating" />

<p>If your WordPress site loads slowly and you're not ready to pay for a premium caching plugin, Autoptimize is probably the first plugin you should install. It does one thing well: it takes all the CSS, JavaScript, and HTML your site outputs, strips out unnecessary whitespace and comments, and serves it in fewer, smaller files. The result is a measurably faster page load without spending a cent.</p>

<p>I've run Autoptimize on several sites over the years. It's not magic — on a badly configured server it won't overcome fundamental hosting issues — but on a decent host it will move the needle on your PageSpeed Insights score. Here's what you need to know.</p>

<h2>What Is Autoptimize?</h2>

<p><a href="https://wordpress.org/plugins/autoptimize/" target="_blank" rel="noopener noreferrer nofollow">Autoptimize</a> is a free WordPress plugin developed by Frank Goossens under the Optimizing Matters banner. It aggregates, minifies, and caches your site's CSS, JavaScript, and HTML output. "Minify" means removing whitespace, comments, and redundant characters. "Aggregate" means combining multiple separate files into one, which reduces the number of HTTP requests a browser has to make.</p>

<p>The plugin has been around since 2009, is actively maintained, and as of 2026 has over 1 million active installs with a 4.7/5 rating from 1,400+ reviews. That kind of longevity in the WordPress ecosystem means it has been stress-tested across a huge variety of themes, hosts, and configurations.</p>

<img src="/screenshots/plugin-autoptimize.webp" alt="Autoptimize plugin page on WordPress.org showing active installations, rating, and plugin description" />

<h2>Key Features</h2>

<h3>CSS and JavaScript Optimization</h3>

<p>This is the core of Autoptimize. It can aggregate all your stylesheets into a single file, minify it, and inject it in the page head. For JavaScript, it can combine scripts, minify them, move them to the footer (so they don't block rendering), and defer or async-load them. Each option is individually toggleable — you don't have to enable everything at once, which matters because aggressive JS optimization is the most likely source of conflicts.</p>

<h3>HTML Minification</h3>

<p>Autoptimize can also strip whitespace from the HTML itself. This is a smaller win than CSS/JS optimization but adds up on large pages with complex templates.</p>

<h3>Image Optimization and Lazy Load</h3>

<p>The plugin includes basic image lazy loading (images below the fold load only when the user scrolls to them) and can serve images in WebP or AVIF formats. For deeper image optimization — compression, resizing — you'd combine it with a dedicated image plugin like ShortPixel or Imagify.</p>

<h3>Critical CSS</h3>

<p>Critical CSS is the CSS needed to render the visible part of the page (above the fold) without waiting for the full stylesheet. Autoptimize can inline critical CSS manually if you provide the rules yourself, or automatically via the paid Critical CSS service. Getting this right meaningfully improves Largest Contentful Paint (LCP) scores.</p>

<h3>Google Fonts Optimization</h3>

<p>The plugin can combine multiple Google Fonts requests into one, or remove Google Fonts entirely if you're hosting fonts locally. Fewer third-party requests means faster load times and better privacy scores.</p>

<h3>CDN Support</h3>

<p>Autoptimize can rewrite static asset URLs to point to a CDN domain. If you're using Cloudflare or a custom CDN, this lets assets be served from the edge rather than your origin server.</p>

<h2>Free vs. Premium (Critical CSS Service)</h2>

<table>
<thead>
<tr>
<th>Feature</th>
<th>Free</th>
<th>Autoptimize Pro ($23/yr)</th>
</tr>
</thead>
<tbody>
<tr>
<td>CSS/JS/HTML minification</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Script aggregation &amp; deferral</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Image lazy loading</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Google Fonts optimization</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>CDN rewriting</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Automatic critical CSS generation</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Image CDN (global delivery)</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Page caching</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Extra "booster" performance rules</td>
<td>No</td>
<td>Yes</td>
</tr>
</tbody>
</table>

<p>The free version covers everything most WordPress sites need for meaningful speed improvements. The $23/year Pro subscription adds value mainly through the automatic critical CSS service — generating critical CSS manually is tedious and error-prone, so if LCP scores matter to you, the Pro tier is worth considering.</p>

<h2>Pros and Cons</h2>

<p><strong>Pros</strong></p>
<ul>
<li>Free and genuinely effective — moves the needle on PageSpeed scores without spending anything</li>
<li>Granular controls: you can enable CSS optimization without touching JS, or vice versa</li>
<li>Exclusion lists let you skip specific scripts or styles that break with minification</li>
<li>Actively maintained with a 15+ year track record</li>
<li>Lightweight — doesn't add bloat to your admin</li>
<li>Works well as a companion to caching plugins</li>
</ul>

<p><strong>Cons</strong></p>
<ul>
<li>Aggressive JS optimization can break plugins — requires troubleshooting exclusions</li>
<li>No built-in page caching (the free version is purely a code optimization tool)</li>
<li>Critical CSS requires manual input or the paid Pro tier</li>
<li>Not as beginner-friendly as all-in-one solutions like WP Rocket</li>
<li>Image optimization is basic compared to dedicated image plugins</li>
</ul>

<h2>How It Compares</h2>

<h3>Autoptimize vs. WP Rocket</h3>

<p><a href="/wp-rocket-review/">WP Rocket</a> ($59/yr) is an all-in-one performance plugin that handles page caching, code optimization, lazy loading, database cleanup, and more from a single clean interface. It's easier to configure correctly on the first try. Autoptimize is free but narrower — it handles code minification well but lacks page caching and requires more manual tuning. The practical answer: if you're on a budget, run Autoptimize + a free caching plugin like W3 Total Cache. If you want a set-it-and-forget-it solution and don't mind paying, WP Rocket delivers a better experience.</p>

<h3>Autoptimize vs. LiteSpeed Cache</h3>

<p>LiteSpeed Cache is free and includes both page caching and code optimization — making it a more direct competitor to WP Rocket than to Autoptimize. The catch: LiteSpeed Cache requires a LiteSpeed or OpenLiteSpeed server to use full-page caching. If your host runs Apache or Nginx, you lose the caching features and are left with a code optimizer. On LiteSpeed hosting (Hostinger, A2 Hosting, etc.), LiteSpeed Cache is the better choice over Autoptimize. On other hosts, Autoptimize + a caching plugin is a solid free stack.</p>

<h2>Who Should Use Autoptimize?</h2>

<p><strong>Good fit:</strong> WordPress site owners on shared hosting who want to improve page speed without paying for a premium plugin. Also a good fit as a complementary tool on top of a caching plugin — for example, running Autoptimize for CSS/JS minification alongside WP Super Cache for page caching.</p>

<p><strong>Not a good fit:</strong> Beginners who want a true one-click setup with no troubleshooting. If you're on LiteSpeed hosting, LiteSpeed Cache covers more ground for free. If you're running WooCommerce at scale and performance is critical, WP Rocket's additional features and support may justify the cost.</p>

<h2>Frequently Asked Questions</h2>

<h3>Does Autoptimize include page caching?</h3>

<p>No. The free version minifies and aggregates CSS, JS, and HTML but does not cache full pages. To get page caching, pair it with a dedicated plugin like W3 Total Cache, WP Super Cache, or WP Fastest Cache. Or use WP Rocket, which bundles both.</p>

<h3>Will Autoptimize break my site?</h3>

<p>It can, particularly if you enable JavaScript optimization without adding exclusions for scripts that conflict. The safest approach: enable CSS optimization first, test, then enable JS optimization and test again. Use the exclusion list to skip any scripts that cause issues. Most problems are solvable — it just takes some troubleshooting.</p>

<h3>Is Autoptimize Pro worth $23/year?</h3>

<p>If you want automatic critical CSS generation without doing it manually, yes. Critical CSS has a meaningful impact on LCP scores, and generating it by hand for every page template is tedious. The image CDN and page caching extras are useful too. For a personal blog where performance is secondary to content, the free version is sufficient.</p>

<h3>Can I use Autoptimize with WP Rocket?</h3>

<p>Yes, but you should disable duplicate features. If you have WP Rocket handling JS/CSS optimization, disable those same options in Autoptimize to avoid conflicts. Some users run them together with WP Rocket handling caching and Autoptimize handling specific optimization tasks, but generally WP Rocket alone is sufficient.</p>

<hr />

<p><small>Sources: <a href="https://wordpress.org/plugins/autoptimize/" target="_blank" rel="noopener noreferrer nofollow">WordPress.org — Autoptimize</a> · <a href="https://optimizingmatters.com/" target="_blank" rel="noopener noreferrer nofollow">Optimizing Matters (plugin author)</a></small></p>
`;
