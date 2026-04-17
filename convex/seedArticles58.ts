import { internalMutation } from "./_generated/server";

export const seedConnectAiAgentsWordPressMcp = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "connect-ai-agents-to-wordpress-mcp-setup";

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
      title:
        "How to Connect AI Agents to WordPress: Complete MCP Setup Guide (2026)",
      excerpt:
        "A practical walkthrough of connecting Claude Desktop (or any MCP client) to WordPress using the official WordPress MCP Adapter, with real config, auth, and security notes.",
      content: connectAiAgentsWordPressMcpContent,
      category: "tutorials",
      tags: [
        "wordpress mcp",
        "mcp server wordpress",
        "connect claude to wordpress",
        "ai agents wordpress",
        "automattic mcp",
        "model context protocol",
        "wordpress ai",
      ],
      seoTitle: "WordPress MCP Setup: Connect Claude & AI Agents (2026 Guide)",
      seoDescription:
        "Connect AI agents to WordPress using MCP. Step-by-step setup for the official WordPress MCP Adapter with Claude Desktop config, auth, and security tips.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing WordPress MCP setup article",
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
      message: "Created new WordPress MCP setup article",
      id: postId,
    };
  },
});

const connectAiAgentsWordPressMcpContent = `
<p>The first time I tried to connect Claude Desktop to my WordPress site, I did it the wrong way. I pasted the REST API URL into a config file, crossed my fingers, and watched Claude return a very polite error. It took me about an hour of reading GitHub issues to realize that WordPress and MCP actually speak through a specific adapter now — not through the REST API directly — and that the pieces landed in a very different order than the early tutorials suggested.</p>

<p>This guide is the version I wish I had that afternoon. It walks through connecting AI agents to WordPress using the <strong>official WordPress MCP Adapter</strong>, with real config, real authentication, and honest notes on what still does not work yet. Last updated <strong>April 17, 2026</strong>, against mcp-adapter v0.5.0, WordPress 6.9, and the MCP spec as of February 2026.</p>

<p>If you are new to the general idea, start with my <a href="/wordpress-claude-ai-mcp-connector/">WordPress Claude AI MCP connector overview</a>, then come back here for the technical setup. Related reading: <a href="/best-wordpress-ai-chatbot-plugins/">best WordPress AI chatbot plugins</a> and <a href="/best-wordpress-ai-internal-link-plugins/">best WordPress AI internal link plugins</a>.</p>

<img src="/images/blog/connect-ai-agents-to-wordpress-mcp-setup.webp" alt="Connect AI agents to WordPress using the official MCP Adapter and Claude Desktop" />

<h2>TL;DR: Quick Answer</h2>

<ul>
<li><strong>What you need:</strong> WordPress 6.9+, the <code>wordpress/mcp-adapter</code> plugin, and an MCP client (Claude Desktop, Cursor, VS Code, or Claude Code).</li>
<li><strong>Two transports:</strong> STDIO for local dev via WP-CLI, HTTP for remote sites via the <code>@automattic/mcp-wordpress-remote</code> proxy.</li>
<li><strong>Auth:</strong> WordPress Application Passwords for HTTP, local user for STDIO. WordPress.com uses OAuth 2.1 with PKCE.</li>
<li><strong>Config file:</strong> <code>claude_desktop_config.json</code> — edit via Claude menu → Settings → Developer.</li>
<li><strong>Biggest gotcha:</strong> only abilities flagged <code>meta.mcp.public</code> are exposed. The plugin ships with a safe default set; you add the rest.</li>
</ul>

<h2>What Is MCP and Why Does It Matter for WordPress?</h2>

<p>The <strong>Model Context Protocol (MCP)</strong> is an open standard Anthropic released in late 2024 that lets AI clients like Claude call external tools in a consistent way. Instead of every app inventing its own plugin format, MCP defines a shared interface for tools, resources, and prompts.</p>

<p>For WordPress, MCP matters because it is the first serious path toward an AI agent that can genuinely operate your site — create posts, update settings, read analytics, fix SEO metadata — without you building a custom integration for every single action. The heavy lifting has been done in WordPress 6.9's <strong>Abilities API</strong>, which exposes core and plugin capabilities as typed, discoverable functions. The MCP Adapter simply translates those abilities into MCP tools.</p>

<p>So the stack in 2026 looks like this:</p>

<ol>
<li><strong>WordPress core or a plugin</strong> registers an <em>Ability</em> (e.g. "create a post", "list users").</li>
<li>The <strong>MCP Adapter</strong> exposes abilities marked <code>meta.mcp.public</code> as MCP tools.</li>
<li>An <strong>MCP client</strong> (Claude Desktop, Cursor) discovers those tools and lets the LLM call them.</li>
</ol>

<h2>Which WordPress MCP Server Should You Use?</h2>

<p>Three valid options in 2026, and it is worth picking deliberately:</p>

<table>
<thead>
<tr>
<th>Option</th>
<th>Best for</th>
<th>Auth</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://github.com/WordPress/mcp-adapter" target="_blank" rel="nofollow noopener noreferrer">WordPress/mcp-adapter</a> (official)</td>
<td>Self-hosted WordPress sites running 6.9+</td>
<td>Application Passwords or local user</td>
</tr>
<tr>
<td><a href="https://developer.wordpress.com/docs/mcp/" target="_blank" rel="nofollow noopener noreferrer">WordPress.com built-in MCP</a></td>
<td>WordPress.com hosted sites (no install needed)</td>
<td>OAuth 2.1 with PKCE</td>
</tr>
<tr>
<td><a href="https://developer.woocommerce.com/docs/features/mcp/" target="_blank" rel="nofollow noopener noreferrer">WooCommerce MCP</a></td>
<td>Stores needing product, order, and customer tools</td>
<td>Application Passwords</td>
</tr>
</tbody>
</table>

<p>The old <code>Automattic/wordpress-mcp</code> repository was archived in January 2026 and now redirects to <a href="https://github.com/WordPress/mcp-adapter" target="_blank" rel="nofollow noopener noreferrer">WordPress/mcp-adapter</a>. If you are starting fresh, ignore the archived repo completely.</p>

<h2>Step 1: Install the WordPress MCP Adapter</h2>

<p>You have two install paths. Composer is cleaner for production; downloading the release ZIP is easier for one-off testing.</p>

<h3>Option A: Composer (recommended)</h3>

<p>From your WordPress root:</p>

<pre><code>composer require wordpress/mcp-adapter</code></pre>

<p>If you are still on WordPress 6.8, the Abilities API is not in core yet and you need both packages:</p>

<pre><code>composer require wordpress/abilities-api wordpress/mcp-adapter</code></pre>

<h3>Option B: Install as a plugin ZIP</h3>

<ol>
<li>Grab the latest release from <a href="https://github.com/WordPress/mcp-adapter/releases" target="_blank" rel="nofollow noopener noreferrer">github.com/WordPress/mcp-adapter/releases</a> (v0.5.0 as of April 15, 2026).</li>
<li>In <strong>Plugins → Add New → Upload Plugin</strong>, upload the ZIP.</li>
<li>Activate it. A default MCP server named <code>mcp-adapter-default-server</code> is registered automatically.</li>
</ol>

<p>After activation, confirm the endpoint is live by visiting:</p>

<pre><code>https://your-site.com/wp-json/mcp/mcp-adapter-default-server</code></pre>

<p>You should get a JSON response describing the server. If you get a 404, flush permalinks (<strong>Settings → Permalinks → Save Changes</strong>) and try again.</p>

<h2>Step 2: Create a WordPress Application Password</h2>

<p>For HTTP transport (which you almost certainly want for remote sites), the adapter authenticates against WordPress Application Passwords rather than your main login.</p>

<ol>
<li>Go to <strong>Users → Profile</strong>.</li>
<li>Scroll to <strong>Application Passwords</strong>.</li>
<li>Enter a name like <code>Claude MCP</code> and click <strong>Add New Application Password</strong>.</li>
<li>Copy the generated password immediately — it is shown once.</li>
</ol>

<p>Treat this password like an API token: anyone with it can act as your user. If this is a production site, consider creating a dedicated WordPress user with the minimum role needed (Editor, not Administrator, if you never need plugin management).</p>

<h2>Step 3: Configure Claude Desktop</h2>

<p>On macOS, open Claude Desktop → <strong>Claude menu → Settings → Developer → Edit Config</strong>. On Windows, the file lives at <code>%APPDATA%\\Claude\\claude_desktop_config.json</code>.</p>

<h3>HTTP transport (remote or production sites)</h3>

<p>This is the config I run. It uses the official proxy package so Claude Desktop can talk to your WordPress HTTP endpoint:</p>

<pre><code>{
  "mcpServers": {
    "wordpress": {
      "command": "npx",
      "args": ["-y", "@automattic/mcp-wordpress-remote@latest"],
      "env": {
        "WP_API_URL": "https://your-site.com/wp-json/mcp/mcp-adapter-default-server",
        "WP_API_USERNAME": "marvin",
        "WP_API_PASSWORD": "xxxx xxxx xxxx xxxx xxxx xxxx"
      }
    }
  }
}</code></pre>

<p>The password format with spaces is how WordPress generates it — paste it exactly as shown.</p>

<h3>STDIO transport (local development with WP-CLI)</h3>

<p>If you are running WordPress locally and have WP-CLI installed, you can skip the HTTP layer entirely:</p>

<pre><code>{
  "mcpServers": {
    "wordpress-local": {
      "command": "wp",
      "args": [
        "--path=/Users/marvin/Sites/mysite",
        "mcp-adapter",
        "serve",
        "--server=mcp-adapter-default-server",
        "--user=admin"
      ]
    }
  }
}</code></pre>

<p>STDIO is faster and skips Application Password management, but it only works where you can run <code>wp</code> on the same machine as Claude Desktop.</p>

<h2>Step 4: Restart Claude Desktop and Verify</h2>

<p>After saving the config, fully quit and reopen Claude Desktop. The config is only read on startup.</p>

<p>Once it restarts, you should see a tools icon in the message input. Click it to confirm <code>wordpress</code> is listed with tools like <code>create_post</code>, <code>list_posts</code>, and <code>get_site_settings</code>. Ask Claude something concrete:</p>

<blockquote><em>"List my 5 most recent WordPress posts and tell me which ones are missing a featured image."</em></blockquote>

<p>If Claude runs the tool and returns real post titles from your site, the connection works. If it says it cannot find the tool, check the Developer log in Claude Desktop — 90% of the time it is either a typo in <code>WP_API_URL</code> or a stale Node cache (run <code>npx clear-npx-cache</code> and retry).</p>

<img src="/images/blog/connect-ai-agents-to-wordpress-mcp-setup-2.webp" alt="Claude Desktop showing the WordPress MCP server connected with available tools" />

<h2>Step 5: Expose More Abilities (Optional)</h2>

<p>By default the adapter only exposes abilities that are explicitly marked <code>meta.mcp.public</code>. This is deliberate — it prevents a plugin from silently exposing a destructive action to every connected AI client. To add your own abilities to the MCP server, register them in a small mu-plugin:</p>

<pre><code>add_action('abilities_api_init', function () {
  wp_register_ability('my-site/summarize-comments', [
    'label'               =&gt; 'Summarize recent comments',
    'description'         =&gt; 'Returns a short summary of the last N approved comments.',
    'meta'                =&gt; ['mcp' =&gt; ['public' =&gt; true]],
    'execute_callback'    =&gt; 'my_site_summarize_comments',
    'permission_callback' =&gt; fn () =&gt; current_user_can('moderate_comments'),
  ]);
});</code></pre>

<p>Restart Claude Desktop and the new tool appears automatically. This is where MCP gets genuinely interesting — you can expose business logic, not just CRUD.</p>

<h2>Security Considerations You Should Not Skip</h2>

<p>MCP is powerful, which is another way of saying it can cause real damage if you configure it carelessly. Four rules I apply to every site I connect:</p>

<ol>
<li><strong>Use a least-privilege user.</strong> Do not connect Claude with your main admin account. Create a dedicated user with just the role the agent needs.</li>
<li><strong>Scope abilities tightly.</strong> Every ability you mark <code>public</code> is a function an AI can call without asking you again. Audit this list the same way you would audit plugin permissions.</li>
<li><strong>Always use HTTPS.</strong> The HTTP transport sends your Application Password on every request. On a non-HTTPS site, that password is effectively public.</li>
<li><strong>Log everything in staging first.</strong> Before pointing an MCP client at production, run it against a staging clone. Watch what tools the model actually reaches for — you will be surprised.</li>
</ol>

<p>For a broader hardening baseline, use my <a href="/wordpress-security-complete-guide/">WordPress security guide</a> and lock down <a href="/wordpress-login-security/">WordPress login security</a> before you ever enable MCP on a production site.</p>

<h2>Common Errors and Fixes</h2>

<h3>"MCP server failed to start"</h3>
<p>Usually a Node path issue on Windows or an outdated <code>npx</code> cache. Run <code>npx clear-npx-cache</code>, then restart Claude Desktop. If you use nvm, make sure Claude Desktop launches from a shell that has the right Node version on its PATH.</p>

<h3>"401 Unauthorized" when Claude calls a tool</h3>
<p>The Application Password is wrong, expired, or tied to a user that was deleted. Regenerate it under <strong>Users → Profile</strong> and update the env block in <code>claude_desktop_config.json</code>.</p>

<h3>"Tool not found" after registering an ability</h3>
<p>You forgot <code>meta.mcp.public =&gt; true</code>, or the <code>abilities_api_init</code> hook fired before your plugin loaded. Move the registration into a mu-plugin or hook it on <code>plugins_loaded</code> with priority 20.</p>

<h3>404 at the MCP endpoint</h3>
<p>Pretty permalinks are disabled, or you upgraded from an earlier version without flushing rewrite rules. Visit <strong>Settings → Permalinks</strong> and click Save.</p>

<h3>Claude returns generic answers instead of calling tools</h3>
<p>The model sometimes needs an explicit nudge. Phrase your request around the data, not the action: <em>"Using the WordPress tools, fetch my 10 most recent posts"</em> works more reliably than <em>"Show me my posts"</em>.</p>

<h2>Pairing MCP With AI Plugins You Already Use</h2>

<p><em>Affiliate note:</em> the links below are affiliate links. The picks are the ones I actually use.</p>

<p>MCP is great for operating WordPress from outside. For work that lives inside the WordPress editor itself, I still run two specific plugins:</p>

<ul>
<li><a href="https://meowapps.com/plugin/ai-engine-pro/" target="_blank" rel="nofollow noopener noreferrer">AI Engine Pro</a> — in-editor chat, bulk content tools, and a clean way to expose a site chatbot. Works alongside MCP without conflicts.</li>
<li><a href="https://rankmath.com/wordpress/plugin/seo-suite/" target="_blank" rel="nofollow noopener noreferrer">Rank Math AI</a> — for on-page SEO suggestions the MCP agent can then apply via the admin. See my <a href="/improve-wordpress-seo/">WordPress SEO guide</a> for how these fit together.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>Do I need WordPress.com or will WordPress.org work?</h3>
<p>Both work, but the path differs. WordPress.com has a built-in MCP server with OAuth 2.1 — nothing to install. Self-hosted WordPress.org sites install the <code>wordpress/mcp-adapter</code> plugin and authenticate with Application Passwords.</p>

<h3>Which AI clients can connect to WordPress MCP?</h3>
<p>Any MCP-compatible client, including Claude Desktop, Claude Code, Cursor, VS Code with the MCP extension, and custom clients built on the MCP SDK. The adapter is client-agnostic.</p>

<h3>Is the old Automattic/wordpress-mcp plugin still maintained?</h3>
<p>No. That repository was archived in January 2026. Migrate to <a href="https://github.com/WordPress/mcp-adapter" target="_blank" rel="nofollow noopener noreferrer">WordPress/mcp-adapter</a>, which is now the canonical plugin.</p>

<h3>Can Claude publish posts automatically or do I have to approve each action?</h3>
<p>By default Claude Desktop prompts you to approve each tool call. You can enable "Always allow" per tool, but I would not do that for <code>create_post</code> or <code>update_settings</code> on a production site.</p>

<h3>Does MCP work with WooCommerce?</h3>
<p>Yes. WooCommerce ships its own MCP integration for product, order, and customer tools. You can install both <code>wordpress/mcp-adapter</code> and the WooCommerce MCP integration side by side.</p>

<h3>What does this cost?</h3>
<p>The MCP Adapter is GPL-licensed and free. You only pay for the Claude Desktop subscription (or whichever client you use) and for your existing WordPress hosting. No Automattic subscription is required for self-hosted sites.</p>

<h3>Is it safe to expose my site to an AI agent?</h3>
<p>Safe is the wrong word — it is <em>controllable</em>. You decide which abilities are exposed, which user role the agent runs as, and which transport (STDIO, HTTP, HTTPS) it uses. Treat MCP like giving an assistant their own staff account: you would not hand over your admin password, and you should not here either.</p>

<h2>Primary Sources Used</h2>

<ul>
<li><a href="https://github.com/WordPress/mcp-adapter" target="_blank" rel="nofollow noopener noreferrer">WordPress/mcp-adapter on GitHub (official plugin)</a></li>
<li><a href="https://developer.wordpress.org/news/2026/02/from-abilities-to-ai-agents-introducing-the-wordpress-mcp-adapter/" target="_blank" rel="nofollow noopener noreferrer">WordPress Developer Blog: Introducing the WordPress MCP Adapter (Feb 4, 2026)</a></li>
<li><a href="https://developer.wordpress.com/docs/mcp/" target="_blank" rel="nofollow noopener noreferrer">WordPress.com Developer Docs: MCP integration</a></li>
<li><a href="https://modelcontextprotocol.io/" target="_blank" rel="nofollow noopener noreferrer">Model Context Protocol official spec</a></li>
<li><a href="https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop" target="_blank" rel="nofollow noopener noreferrer">Anthropic: Getting started with local MCP servers on Claude Desktop</a></li>
<li><a href="https://developer.woocommerce.com/docs/features/mcp/" target="_blank" rel="nofollow noopener noreferrer">WooCommerce Developer Docs: MCP integration</a></li>
</ul>
`;
