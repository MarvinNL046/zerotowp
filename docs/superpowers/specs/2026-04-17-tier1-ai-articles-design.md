# Tier 1 AI Articles — Design Spec

**Date:** 2026-04-17
**Status:** Approved — ready for implementation
**Motivation:** ZeroToWordPress traffic dropped to ~0. SERP research (see previous session) shows the WordPress+AI keyword intersection has low competition and high intent. These 5 articles target trending, low-competition keywords where the site can realistically rank.

## The 5 Articles

| # | Title | Slug | File | Cluster | Role |
|---|---|---|---|---|---|
| 1 | How to Connect AI Agents to WordPress (MCP Setup Guide) | `connect-ai-agents-to-wordpress-mcp-setup` | `seedArticles58.ts` | tutorials | supporting |
| 2 | How to Build a WordPress Website with AI in 2026 | `build-wordpress-website-with-ai` | `seedArticles59.ts` | tutorials | pillar |
| 3 | How to Optimize WordPress for AI Search (GEO Guide) | `optimize-wordpress-for-ai-search-geo` | `seedArticles60.ts` | wordpress-seo | supporting |
| 4 | Best AI Plugins for WordPress in 2026 | `best-ai-plugins-wordpress-2026` | `seedArticles61.ts` | tutorials | supporting |
| 5 | WordPress 7.0: Everything You Need to Know | `wordpress-7-0-complete-guide` | `seedArticles62.ts` | tutorials | supporting |

## Quality Bar (EEAT + SEO)

**Experience (E):**
- Opening hook: personal anecdote within first 100 words ("When I first tried connecting Claude to my WordPress site...")
- "I tested this on..." moments sprinkled throughout
- Real commands, real error messages, real screenshots

**Expertise (E):**
- Concrete versioned info (plugin version X.Y, WordPress 6.9.4, MCP spec Feb 2026)
- Edge cases and trade-offs explicit
- Code blocks with actual working JSON/config

**Authoritativeness (A):**
- Cite official sources (docs.anthropic.com, wordpress.org, woocommerce.com)
- 3-5 internal links to existing ZeroToWP pillars
- ZeroToAIAgents cross-links where relevant (per existing pattern)

**Trust (T):**
- "Last updated April 17, 2026" in intro paragraph
- Honest downsides section ("What doesn't work yet")
- Affiliate disclosure inline for plugin recommendations: `<em>Affiliate note:</em>`

**SEO:**
- Primary keyword in H1, first 100 words, slug, one H2
- LSI/semantic keywords: MCP, AI agents, GEO, AEO, generative engine optimization, WordPress MCP server, etc.
- PAA questions as H2s
- FAQ section (FAQPage schema-compatible)
- Meta description <155 chars
- Word count: 1600-2500 (no padding — per user preference)
- Internal links: 3-5 per article

## Article Structure Template

```
1. H1 (target keyword + modifier)
2. Intro paragraph with personal hook + date anchor
3. TL;DR / Quick Answer box (<ul> with 4-6 bullets)
4. What is [topic]? — context section
5. Why it matters in 2026 — relevance
6. Step-by-step HOW-TO / listicle items
7. Common mistakes / What doesn't work
8. [For #4] Plugin table: name, best for, pricing, WP.org link
9. FAQ section (5-7 PAA-sourced questions)
10. Primary sources (external links, rel="nofollow noopener noreferrer")
11. Internal links block at bottom
```

## Affiliate Strategy

User requirement: **"houdt altijd rekening met affiliate opties"**

- Every external product link uses `rel="nofollow noopener noreferrer"`
- For Article #4 (AI plugin roundup): dedicate "Best for" and pricing rows to each plugin so affiliate links have clear click-context
- Plugins/services to prioritize as affiliate opportunities:
  - AI Engine Pro (meowapps.com)
  - Rank Math Pro (rankmath.com)
  - Elementor AI (elementor.com)
  - GetGenie (getgenie.ai)
  - Divi AI (elegantthemes.com)
  - AIOSEO Pro (aioseo.com)
  - Bertha.ai
  - WP Rocket (for speed cross-sell)
- Placeholder format: use plain product URLs for now; user can swap to tracked URLs later
- Add `<p class="affiliate-disclosure">` block above recommendations where appropriate

## Screenshot Plan (Playwright + Chrome)

Follow `feedback_screenshots.md` memory: English only, no scrollbars, dismiss consent banners first.

**Per-article targets:**

| Article | Screenshots |
|---|---|
| #1 MCP | Claude Desktop config JSON, MCP server response inside Claude, WordPress admin with AI-created post |
| #2 Build w/ AI | AI prompt flow, Elementor AI interface, live WordPress site result |
| #3 GEO | Schema.org markup, Perplexity showing citation, Rank Math AI-overview setting |
| #4 AI Plugins | Plugin dashboard per tool (3-4 key ones), comparison table screenshot |
| #5 WP 7.0 | Gutenberg new feature demo, changelog highlight, WP.org download page |

**Save location:** `/public/images/blog/<slug>/` or `/public/images/blog/<slug>-<step>.webp`

**Format:** WebP, max 1600px wide, compressed.

## Convex Seed Pattern

Copy the pattern from `seedArticles57.ts`:

```ts
import { internalMutation } from "./_generated/server";

export const seed<Name> = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "<slug>";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "<cluster-slug>"))
      .first();

    if (!cluster) return { message: "Cluster not found." };

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "...",
      excerpt: "...",
      content: <htmlConstant>,
      category: "<category>",
      tags: [...],
      seoTitle: "...",
      seoDescription: "...",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return { message: "Updated", id: existing._id };
    }

    const postId = await ctx.db.insert("posts", {
      ...fields,
      slug,
      status: "published",
      publishedAt: now,
    });

    return { message: "Created", id: postId };
  },
});

const <name>Content = `<html>...</html>`;
```

## Execution Plan

1. Dispatch 5 subagents in parallel — each writes one article + captures screenshots + creates the seed file
2. After all return: run `npx convex run seedArticlesNN:<functionName>` for each to publish
3. Verify on live site (dev server)
4. Commit to git with message describing the batch
5. Update memory with affiliate-link learnings if anything surprising surfaces

## Out of Scope

- Redirect rules for old slugs (handle separately if user wants `/build-your-first-wordpress-website` redirected)
- Linking from existing posts to these new ones (do in a follow-up pass)
- Actual tracked affiliate URLs (user will add tracking IDs later)
- Dutch translations (user confirmed English only for this batch)
