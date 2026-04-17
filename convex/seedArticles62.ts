import { internalMutation } from "./_generated/server";

export const seedWordPress70CompleteGuide = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-7-0-complete-guide";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "tutorials"))
      .first();

    if (!cluster) {
      return {
        message: "Cluster 'tutorials' not found. Seed the tutorials cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "WordPress 7.0: Everything You Need to Know About the 2026 Release",
      excerpt:
        "WordPress 7.0 is the biggest release in years — real-time collaboration, the Abilities API for AI, and expanded Block Bindings. Here is the confirmed timeline, the feature list, and exactly how to prepare your site.",
      content: wordpress70CompleteGuideContent,
      category: "tutorials",
      tags: [
        "wordpress 7.0",
        "wordpress 7.0 release date",
        "wordpress 7.0 features",
        "wordpress 2026",
        "gutenberg 22",
        "wordpress interactivity api",
        "block bindings wordpress",
      ],
      seoTitle: "WordPress 7.0 Guide: Features, Release Date & Prep (2026)",
      seoDescription:
        "WordPress 7.0 features, the real 2026 release date after the delay, what's deprecated, and a full preparation checklist for site owners and developers.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing WordPress 7.0 complete guide article",
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
      message: "Created new WordPress 7.0 complete guide article",
      id: postId,
    };
  },
});

const wordpress70CompleteGuideContent = `
<p>I have been tracking WordPress 7.0 since the delay announcement on March 31, 2026, refreshing the Make WordPress Core blog almost daily. This is the biggest WordPress release in roughly eight years — the milestone that officially closes Phase 3 of Gutenberg — and I wanted to know exactly what to expect before updating my own sites and client installs.</p>

<p>This guide is the short version of everything I have pieced together from wordpress.org/news, make.wordpress.org/core, and the Gutenberg GitHub repo. Last updated <strong>April 17, 2026</strong>. If you are new to WordPress in general, start with my pillar guide on <a href="/how-to-make-a-wordpress-website/">how to make a WordPress website</a> first.</p>

<img src="/images/blog/wordpress-7-0-complete-guide.webp" alt="WordPress 7.0 complete guide hero: features, release date, and preparation checklist for 2026" />

<h2>TL;DR: WordPress 7.0 Key Dates and Features</h2>

<ul>
<li><strong>Original target date:</strong> April 9, 2026</li>
<li><strong>Status (April 17, 2026):</strong> delayed — revised schedule expected by April 22</li>
<li><strong>New ETA:</strong> mid-to-late May 2026 (release lead Matias Ventura described it as "weeks, not months")</li>
<li><strong>Headline features:</strong> real-time collaboration (opt-in), Abilities API for AI, DataViews in wp-admin, Pattern Overrides for custom blocks, Interactivity API maturity</li>
<li><strong>Minimum PHP:</strong> 7.4 — PHP 8.3+ strongly recommended</li>
<li><strong>Biggest risk:</strong> plugins using legacy metaboxes will disable the new real-time collaboration feature</li>
</ul>

<h2>WordPress 7.0 Release Date and Why It Was Delayed</h2>

<p>WordPress 7.0 was originally scheduled for <strong>April 9, 2026</strong>, with Beta 1 on February 19 and Release Candidate 1 on March 19. Then on March 31, 2026, release lead Matias Ventura posted <a href="https://make.wordpress.org/core/2026/03/31/extending-the-7-0-cycle/" target="_blank" rel="nofollow noopener noreferrer">Extending the 7.0 Cycle</a> on Make WordPress Core and confirmed the release would slip.</p>

<p>The reason is the new real-time collaboration feature. The original architecture stored sync data in <code>post_meta</code> on an internal <code>wp_sync_storage</code> post type, which disabled WordPress's persistent post caches whenever a user had the editor open. Matt Mullenweg pushed to revisit a dedicated collaboration database table before shipping.</p>

<blockquote>
<p>"Matt has expressed a preference to revisit the custom table and ensure adequate time is given to come up with the best design possible from the start." — Matias Ventura, Make WordPress Core, March 31, 2026</p>
</blockquote>

<p>Pre-release versions were paused through April 17, 2026, and a revised schedule will be published by April 22. Informal signals from the release squad point to a final release around mid-to-late May.</p>

<h2>Confirmed Major Features in WordPress 7.0</h2>

<h3>1. Real-Time Collaboration (Opt-In)</h3>

<p>This is the marquee feature and the reason for the delay. WordPress 7.0 brings Google-Docs-style co-editing into the block editor, backed by full inline commenting, Notes on specific blocks, and presence indicators.</p>

<p>Important caveats confirmed in the delay post:</p>

<ul>
<li>it ships as <strong>opt-in</strong>, not default-enabled</li>
<li>it uses <strong>HTTP polling</strong> for maximum compatibility (no WebSocket infrastructure required)</li>
<li>it is <strong>disabled when metabox-based plugins are active</strong> on the screen — plugin authors were given this cycle to migrate to modern Gutenberg APIs</li>
</ul>

<h3>2. The Abilities API for AI Integration</h3>

<p>The Abilities API is a provider-agnostic framework in core for registering AI capabilities — text generation, summarization, translation, alt-text generation, code generation from prompts. A new Connectors screen lets admins configure LLM providers (OpenAI, Anthropic, local models) without installing a bespoke plugin per vendor.</p>

<p>If you are already exposing WordPress to AI agents, this stacks cleanly with the MCP approach I cover in my <a href="/wordpress-claude-ai-mcp-connector/">WordPress Claude AI MCP connector guide</a>. The Abilities API is for capabilities WordPress itself exposes to models, while MCP is how external agents talk back to WordPress.</p>

<h3>3. DataViews Replaces List Tables</h3>

<p>The classic <code>WP_List_Table</code> admin screens (Posts, Pages, Media, Users) are being replaced by DataViews — a modern React-based interface with saved views, bulk actions, grid/list toggle, and filters. Plugin authors who extended <code>WP_List_Table</code> will need to migrate, though a compatibility shim keeps most screens working during the transition.</p>

<h3>4. Pattern Overrides Expand to Custom Blocks</h3>

<p>In WordPress 6.9, Pattern Overrides only worked on a hardcoded set of core blocks. In 7.0, <a href="https://make.wordpress.org/core/2026/03/16/pattern-overrides-in-wp-7-0-support-for-custom-blocks/" target="_blank" rel="nofollow noopener noreferrer">any block attribute that supports Block Bindings also supports Pattern Overrides</a>. Custom blocks opt in through the <code>block_bindings_supported_attributes</code> filter on the server side.</p>

<p>Two rendering paths are supported: dynamic blocks get bound values passed into <code>render_callback()</code>, and static blocks get attributes rewritten via the HTML API without needing custom code.</p>

<h3>5. Interactivity API Maturity</h3>

<p>Gutenberg 22.x hardened the Interactivity API during the 7.0 cycle. The notable additions:</p>

<ul>
<li>a new <code>watch()</code> function for side effects</li>
<li>server-side <code>state.url</code> population (so you no longer need to rehydrate it on the client)</li>
<li><code>state.navigation</code> is now <strong>deprecated</strong> in favor of <code>state.url</code></li>
<li>the <code>data-wp-each</code> directive is production-ready for reactive lists</li>
</ul>

<h3>6. Performance and Admin Polish</h3>

<p>Expected improvements include lazy-loading the block inserter, faster REST responses on posts queries, and a cleaner Command Palette in wp-admin. None of these are headline features, but cumulatively the admin feels noticeably faster.</p>

<h2>What's Being Deprecated in WordPress 7.0</h2>

<p>Developers, this is the section you care about. Based on current dev notes and deprecation warnings already shipping in Gutenberg 22.x:</p>

<ul>
<li><strong>Legacy metabox patterns</strong> that rely on <code>add_meta_box()</code> without Gutenberg integration disable real-time collaboration on the screen</li>
<li><strong><code>state.navigation</code></strong> in the Interactivity API — use <code>state.url</code> instead</li>
<li><strong><code>WP_List_Table</code></strong> extensions — still functional via shim, but flagged for future removal in 7.2 or later</li>
<li><strong>PHP 7.3 and below</strong> — WordPress 7.0 requires PHP 7.4 minimum; PHP 8.3 or newer is the recommended baseline</li>
<li><strong>Older block.json schemas</strong> missing the <code>apiVersion: 3</code> declaration — still work but throw console warnings</li>
</ul>

<h2>Preparation Checklist: What to Do Before Updating</h2>

<p>I always run this exact checklist on staging before pushing any major WordPress update to production. For 7.0 specifically:</p>

<ol>
<li><strong>Full backup.</strong> Files plus database. Store off-server. If you are on <a href="https://wpengine.com/" target="_blank" rel="nofollow noopener noreferrer">WP Engine</a>, <a href="https://kinsta.com/" target="_blank" rel="nofollow noopener noreferrer">Kinsta</a>, or <a href="https://www.cloudways.com/" target="_blank" rel="nofollow noopener noreferrer">Cloudways</a>, use their one-click backup before anything else. <em>Affiliate note: these are managed hosts I use on client sites because they automate this step.</em></li>
<li><strong>Clone to staging.</strong> Every managed host listed above offers one-click staging. Never test 7.0 on a live site first.</li>
<li><strong>Check PHP version.</strong> Confirm you are on PHP 8.1 or newer. PHP 8.3+ is the sweet spot for 7.0 performance.</li>
<li><strong>Audit plugins.</strong> Log into staging, update all plugins, then watch the WordPress admin for "deprecation" or "compatibility" notices. Any plugin still using raw metaboxes is a red flag.</li>
<li><strong>Test your theme.</strong> Classic themes still work, but block themes get the full benefit of 7.0. If you use a custom theme, confirm block.json is at apiVersion 3.</li>
<li><strong>Run the upgrade on staging.</strong> Update to 7.0 on staging, walk through every critical user flow (checkout, contact form, login, the block editor itself).</li>
<li><strong>Check site speed.</strong> Before and after. My guide on <a href="/improve-wordpress-seo/">improving WordPress SEO</a> covers the Core Web Vitals side of this.</li>
<li><strong>Decide on real-time collaboration.</strong> It is opt-in, so you can skip it at first. I recommend leaving it off until after your first successful 7.0 deploy.</li>
<li><strong>Schedule the production update.</strong> Low-traffic window. Tell clients. Have a rollback plan.</li>
</ol>

<h2>What WordPress 7.0 Means for AI Agents and MCP</h2>

<p>The Abilities API is a quiet game-changer for the AI-plus-WordPress ecosystem. Until now, every AI plugin shipped its own provider integration. With the Abilities API, core exposes a single registry of "what this site can do" — and AI agents discover those abilities through a consistent interface.</p>

<p>If you are already connecting external agents via Model Context Protocol, follow my <a href="/wordpress-claude-ai-mcp-connector/">WordPress Claude AI MCP connector</a> guide — the MCP server layer sits nicely on top of the new Abilities registry in 7.0. I expect MCP-aware AI plugins to start exposing their abilities through the core API within the first few weeks after release.</p>

<h2>Should You Update Immediately?</h2>

<p>My rule of thumb is simple:</p>

<ul>
<li><strong>Hobby site or personal blog:</strong> update within the first week. The feature wins outweigh the risk.</li>
<li><strong>Small business site:</strong> wait for 7.0.1 (usually 2 to 3 weeks after the main release). Point releases clean up the inevitable edge cases.</li>
<li><strong>Revenue-critical site (WooCommerce, membership, booking):</strong> wait 4 to 6 weeks. Let plugin authors ship their compatibility updates. Test on staging first, always.</li>
<li><strong>Agency or multisite:</strong> wait for 7.0.2 and confirm every critical plugin has a 7.0-compatible release.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>When is WordPress 7.0 releasing?</h3>
<p>It was originally scheduled for April 9, 2026. After the March 31 delay announcement, the revised ETA is mid-to-late May 2026. The core team will publish the exact new date by April 22, 2026.</p>

<h3>Will WordPress 7.0 break my site?</h3>
<p>Probably not, if you are already on WordPress 6.8 or 6.9 with PHP 8.1 or newer. The biggest compatibility risk is with plugins that still use legacy metaboxes — these will disable the new real-time collaboration feature but will not crash your site. Always test on staging first.</p>

<h3>What's new in WordPress 7.0?</h3>
<p>The headline features are real-time collaboration in the block editor, the Abilities API for AI integration, DataViews replacing the classic admin list tables, Pattern Overrides for custom blocks, and a matured Interactivity API. It is the largest release since Gutenberg Phase 1.</p>

<h3>Should I update to WordPress 7.0 immediately?</h3>
<p>If it is a hobby site, yes, within the first week. For business or e-commerce sites, wait at least 2 to 4 weeks until 7.0.1 ships. Major WordPress releases always have a small number of edge-case fixes in the first point release.</p>

<h3>Do I need to change my PHP version for WordPress 7.0?</h3>
<p>The minimum is PHP 7.4, but PHP 8.3 or newer is strongly recommended for performance. If you are still on PHP 8.0 or below, upgrade your PHP version before upgrading WordPress.</p>

<h3>Will my plugins work with WordPress 7.0?</h3>
<p>Most well-maintained plugins will. Plugins relying on <code>WP_List_Table</code> extensions still work through a compatibility shim, but you should check plugin changelogs for "WordPress 7.0 compatible" notes. Plugins with legacy metaboxes are the main risk and will prevent real-time collaboration from activating on affected screens.</p>

<h3>Does WordPress 7.0 require a new theme?</h3>
<p>No. Classic themes still function. Block themes benefit most from the new features (DataViews, Pattern Overrides, Interactivity API improvements), so if you are planning a redesign, now is a good moment to move to a block theme.</p>

<h2>Primary Sources</h2>

<ul>
<li><a href="https://make.wordpress.org/core/7-0/" target="_blank" rel="nofollow noopener noreferrer">Make WordPress Core: WordPress 7.0 release page</a></li>
<li><a href="https://make.wordpress.org/core/2026/03/31/extending-the-7-0-cycle/" target="_blank" rel="nofollow noopener noreferrer">Make WordPress Core: Extending the 7.0 Cycle (delay announcement)</a></li>
<li><a href="https://make.wordpress.org/core/2026/03/16/pattern-overrides-in-wp-7-0-support-for-custom-blocks/" target="_blank" rel="nofollow noopener noreferrer">Make WordPress Core: Pattern Overrides in WP 7.0 — support for custom blocks</a></li>
<li><a href="https://make.wordpress.org/core/2026/02/12/wordpress-7-0-release-party-schedule/" target="_blank" rel="nofollow noopener noreferrer">Make WordPress Core: WordPress 7.0 Release Party Schedule</a></li>
<li><a href="https://developer.wordpress.org/news/2026/04/whats-new-for-developers-april-2026/" target="_blank" rel="nofollow noopener noreferrer">WordPress Developer Blog: What's new for developers (April 2026)</a></li>
<li><a href="https://wordpress.org/about/roadmap/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org Roadmap</a></li>
</ul>
`;
