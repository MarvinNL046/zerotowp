import { internalMutation } from "./_generated/server";

export const seedWordPressClaudeMCP = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "wordpress-claude-ai-mcp-connector";

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "How to Connect WordPress to Claude AI With the MCP Connector (2026 Guide)",
      slug,
      excerpt:
        "WordPress now has an official Claude connector. Instead of clicking through menus, you can manage your site with plain English. Here's how to set it up and 5 practical ways to use it.",
      content: articleContent,
      category: "tutorials",
      tags: [
        "wordpress ai",
        "claude ai",
        "mcp connector",
        "wordpress automation",
        "ai tools",
        "wordpress tutorial",
        "model context protocol",
      ],
      seoTitle:
        "How to Connect WordPress to Claude AI (MCP Connector Guide 2026)",
      seoDescription:
        "Learn how to connect your WordPress site to Claude AI using the official MCP connector. Step-by-step setup guide with 5 practical use cases for content, SEO, and reporting.",
      author: "marvin",
      authorName: "Marvin",
      status: "published" as const,
      publishedAt: now,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing article:", existing._id);
      return { message: "Updated", id: existing._id };
    }

    const id = await ctx.db.insert("posts", fields);
    console.log("Created new article:", id);
    return { message: "Created", id };
  },
});

const articleContent = `
<p>If you use WordPress, this might be one of the biggest workflow upgrades you'll see this year.</p>

<p>Instead of opening your WordPress dashboard and spending the next 30 minutes clicking through posts, pages, plugins, and settings — you can now open Claude and say: <em>"Show me my latest posts, compare my site to a competitor, and create a report I can send to a client."</em></p>

<p>And it actually does it.</p>

<p>WordPress now has an official <strong>Claude connector</strong> built on the <a href="https://modelcontextprotocol.io/" target="_blank" rel="noopener">Model Context Protocol (MCP)</a> — and I think most people are seriously underestimating how big this is. This is the beginning of a completely different way to work with your website.</p>

<p>If you want a broader view of where Claude fits in the AI coding-agent landscape, ZeroToAIAgents has a strong <a href="https://zerotoaiagents.com/reviews/claude-code" target="_blank" rel="noopener">Claude Code review</a> plus an <a href="https://zerotoaiagents.com/guides/ai-coding-agent-statistics" target="_blank" rel="noopener">AI coding agent statistics guide</a> that puts the current adoption and workflow trends into context.</p>

<img src="/screenshots/wordpress-mcp-docs-2026.webp" alt="WordPress.com MCP documentation page showing how to connect WordPress to Claude AI" />

<h2>What Is the WordPress MCP Connector?</h2>

<p>MCP (Model Context Protocol) is a standard that lets AI tools like Claude directly interact with external services. Think of it as a bridge between your WordPress site and Claude.</p>

<p>Once connected, you can:</p>

<ul>
<li>Ask questions about your site in plain English</li>
<li>Generate landing pages, forms, and content</li>
<li>Create SEO reports and accessibility audits</li>
<li>Compare your site to competitors</li>
<li>Manage content across multiple WordPress sites</li>
</ul>

<p>No code. No plugins to configure. Just a conversation.</p>

<h2>How to Set It Up (3 Simple Steps)</h2>

<p>The setup is easier than most people expect. You don't need to be technical — this takes about 5 minutes.</p>

<h3>Step 1: Install Claude Desktop</h3>

<p>Download <a href="https://claude.ai/download" target="_blank" rel="noopener">Claude Desktop</a> for Mac or Windows. Install it and sign in with your Anthropic account.</p>

<img src="/screenshots/claude-desktop-download-2026.webp" alt="Claude Desktop download page showing macOS and Windows options" />

<p>Claude has a free plan that's enough to test this out. If you end up using it heavily, you may want to upgrade to Pro or Max later.</p>

<h3>Step 2: Enable MCP on WordPress.com</h3>

<p>Log in to your <a href="https://wordpress.com" target="_blank" rel="noopener">WordPress.com</a> account and open your profile. On the left side, you'll see an option called <strong>MCP</strong>. Click it and <strong>enable MCP tool access</strong>.</p>

<p>That's the switch that allows WordPress to talk to Claude.</p>

<p><strong>Note:</strong> This currently works with WordPress.com hosted sites. If you're running self-hosted WordPress, you'll need a plugin that supports MCP — check the <a href="https://developer.wordpress.com/docs/mcp/" target="_blank" rel="noopener">WordPress MCP documentation</a> for updates. For a full technical walkthrough of connecting Claude Desktop (or any MCP client) to WordPress through the official adapter, see my <a href="/connect-ai-agents-to-wordpress-mcp-setup/">complete MCP setup guide for AI agents and WordPress</a>.</p>

<h3>Step 3: Connect in Claude</h3>

<p>Open Claude Desktop, go to <strong>Settings → Connectors</strong>, browse the available connectors, search for <strong>WordPress.com</strong>, and click Connect. Approve the connection — and you're done.</p>

<p>Your WordPress site is now linked to Claude. You can start interacting with your website in simple English.</p>

<h2>5 Practical Ways to Use It Right Now</h2>

<p>Here's where it gets interesting. These are real use cases you can try today.</p>

<h3>1. Ask Questions About Your Site</h3>

<p>This sounds basic, but it's genuinely useful. You can say things like:</p>

<ul>
<li><em>"What content was published this week?"</em></li>
<li><em>"Show me all draft posts"</em></li>
<li><em>"What changes were made to the site in the last 30 days?"</em></li>
</ul>

<p>If you manage multiple sites or work with clients, this saves real time. Instead of clicking through the dashboard trying to find what changed, you just ask.</p>

<h3>2. SEO Competitor Analysis</h3>

<p>This is where things get strategic. You can ask Claude to compare your site to a competitor and suggest an SEO plan:</p>

<p><em>"Compare my site to [competitor URL] and identify content gaps I should fill."</em></p>

<p>Claude will analyze your existing content, compare it to the competitor, and suggest topics you're missing. Whether you're a freelancer, agency owner, or small business — that's incredibly valuable insight you'd normally pay for.</p>

<p>Want to take your <a href="/wordpress-seo-guide">WordPress SEO</a> even further? Combine this with a solid <a href="/best-seo-plugins">SEO plugin</a> and you've got a powerful workflow.</p>

<h3>3. Generate Landing Pages</h3>

<p>Instead of starting from scratch with a page builder, you can say:</p>

<p><em>"Create a landing page for my spring sale with a hero section, three product features, testimonials, and a call to action."</em></p>

<p>Claude generates a complete page — not just rough copy, but an actual structured page you can publish. This is especially useful if you're <a href="/start-a-blog">starting a new blog</a> and need pages fast.</p>

<h3>4. Build Forms and CTAs</h3>

<p>Need a contact form? A newsletter signup? A promotional banner across multiple sites?</p>

<p><em>"Create a contact form with name, email, and message fields."</em></p>

<p>Claude doesn't just write the copy — it wires the form into your site's existing systems. And if you manage multiple WordPress sites, you can coordinate promotions across all of them from a single conversation.</p>

<p>This is also where the distinction between a simple AI assistant and a real coding agent starts to matter. If you're comparing those approaches in more depth, the <a href="https://zerotoaiagents.com/reviews/claude-code" target="_blank" rel="noopener">Claude Code review on ZeroToAIAgents</a> is worth reading after this tutorial.</p>

<h3>5. Generate Client Reports</h3>

<p>If you build or manage WordPress sites for clients, this might be the most valuable use case. You can ask Claude to:</p>

<ul>
<li>Create an SEO performance report as a PDF</li>
<li>Run an accessibility audit with actionable fixes</li>
<li>Summarize all site activity (changes, new content, who did what)</li>
</ul>

<p>The hard part of client reporting has never been getting the data — it's turning data into something clear and professional. Claude handles that formatting for you, complete with charts and structured sections.</p>

<h2>What's Coming Next</h2>

<p>Right now, the connector is mostly about <strong>reading and generating</strong> — asking questions, creating content, and building reports. But what's coming is even more interesting.</p>

<p>The next phase will let you <strong>directly edit your site through Claude</strong>. Update pages, change settings, manage plugins — all through conversation.</p>

<p>Once that becomes normal, WordPress stops being a dashboard you click through. It becomes a conversation you have.</p>

<h2>Who Is This For?</h2>

<p>This connector is especially useful if you:</p>

<ul>
<li><strong>Manage multiple WordPress sites</strong> — coordinate content and campaigns from one place</li>
<li><strong>Work with clients</strong> — generate professional reports without the manual formatting</li>
<li><strong>Create content regularly</strong> — speed up page and post creation</li>
<li><strong>Want better SEO insights</strong> — get AI-powered competitor analysis without expensive tools</li>
<li><strong>Are a beginner</strong> — interact with WordPress without learning the dashboard first</li>
</ul>

<p>If you're still getting started with WordPress, check out our <a href="/how-to-make-a-wordpress-website">complete guide to building a WordPress website</a> — the MCP connector makes the whole process even smoother.</p>

<h2>Bottom Line</h2>

<p>The WordPress MCP connector isn't replacing WordPress. It's making WordPress <strong>easier to use</strong>.</p>

<p>Even in this early version, the practical value is real — from quick site check-ins to full SEO reports. And once direct editing arrives, this becomes a completely new way to manage your website.</p>

<p>It takes 5 minutes to set up. There's nothing technical involved. And it gives you a completely new interface for working with your site.</p>

<p>If you use WordPress, this is absolutely worth trying.</p>
`.trim();
