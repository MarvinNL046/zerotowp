import { internalMutation } from "./_generated/server";

export const seedOptimizeWordPressForAiSearch = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "optimize-wordpress-for-ai-search-geo";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-seo"))
      .first();

    if (!cluster) {
      return {
        message: "Cluster 'wordpress-seo' not found. Seed the SEO cluster first.",
      };
    }

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Optimize WordPress for AI Search: GEO Guide for 2026",
      excerpt:
        "Learn how to optimize WordPress for AI search with GEO (Generative Engine Optimization). Real schema.org code, llms.txt setup, and tactics that get your site cited by ChatGPT and Perplexity.",
      content: optimizeWordPressForAiSearchContent,
      category: "seo",
      tags: [
        "geo wordpress",
        "generative engine optimization",
        "optimize wordpress for chatgpt",
        "ai search seo",
        "aeo wordpress",
        "perplexity seo",
        "llms.txt wordpress",
      ],
      seoTitle: "GEO WordPress: Optimize for AI Search (2026 Guide)",
      seoDescription:
        "GEO WordPress AI search optimization guide: schema markup, llms.txt, and 8 real tactics to get your site cited by ChatGPT, Perplexity, and Google AI.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      return {
        message: "Updated existing Optimize WordPress for AI Search article",
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
      message: "Created new Optimize WordPress for AI Search article",
      id: postId,
    };
  },
});

const optimizeWordPressForAiSearchContent = `
<p>A strange thing happened a few months ago: one of my smaller WordPress posts started showing up as a cited source inside <strong>Perplexity</strong> answers before it even cracked the top 30 on Google. I was not prepared for that. Traditional SEO said the page was not ready. AI search engines disagreed.</p>

<p>That is the core idea behind <strong>GEO (Generative Engine Optimization)</strong>. The goal is not only to rank blue links on Google. It is to become one of the sources that ChatGPT, Perplexity, Google AI Overviews, and Claude use when they answer a user's question. For WordPress sites, this is actually good news, because WordPress already gives you most of the tools you need.</p>

<p>This guide was last updated on <strong>April 17, 2026</strong>. If you want the broader SEO foundation first, read my guide on <a href="/improve-wordpress-seo/">how to improve WordPress SEO</a>, then layer GEO on top. You can also pair this with the <a href="/best-wordpress-ai-content-optimization-plugins/">best WordPress AI content optimization plugins</a> and my <a href="/add-seo-keywords-wordpress/">guide on adding SEO keywords in WordPress</a>.</p>

<img src="/images/blog/optimize-wordpress-for-ai-search-geo.webp" alt="Optimize WordPress for AI search with GEO (Generative Engine Optimization)" />

<h2>TL;DR: GEO for WordPress in 2026</h2>

<ul>
<li><strong>GEO</strong> = optimizing to be <em>cited</em> by AI answer engines (ChatGPT, Perplexity, Google AI Overviews), not just ranked.</li>
<li>Add complete <strong>JSON-LD schema</strong>: Article, FAQPage, Product, Review, Organization.</li>
<li>Publish an <strong>llms.txt</strong> file so LLMs find your best pages fast.</li>
<li>Write in <strong>citation-friendly</strong> blocks: clear claims, dated facts, concise answers.</li>
<li>Strengthen <strong>author E-E-A-T</strong>: bylines, author pages, sameAs links.</li>
<li>Use <strong>Rank Math</strong> or <strong>AIOSEO</strong> — both added AI search features in 2026.</li>
</ul>

<h2>What Is GEO (Generative Engine Optimization)?</h2>

<p>GEO is the practice of structuring your content, metadata, and site signals so that Large Language Models (LLMs) understand your page well enough to <strong>cite it inside a generated answer</strong>. The term was formalized in a 2023 academic paper, and by 2026 it has become the shorthand for "SEO adapted for AI search."</p>

<p>Three terms get mixed up constantly, so here is the clean version:</p>

<table>
<thead>
<tr>
<th>Acronym</th>
<th>Target</th>
<th>Success looks like</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SEO</strong></td>
<td>Classic search engines (Google, Bing)</td>
<td>Ranking in the 10 blue links</td>
</tr>
<tr>
<td><strong>AEO</strong> (Answer Engine Optimization)</td>
<td>Direct answer boxes and featured snippets</td>
<td>Being the "position zero" answer</td>
</tr>
<tr>
<td><strong>GEO</strong> (Generative Engine Optimization)</td>
<td>AI chat and answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude)</td>
<td>Being cited as a source inside the AI answer</td>
</tr>
</tbody>
</table>

<p>AEO and GEO overlap, but GEO is broader. AEO is mostly about answer formatting. GEO is about <strong>the entire site signal stack</strong> — schema, entities, authorship, source quality, llms.txt — that makes an LLM confident enough to cite you.</p>

<h2>Why GEO Matters in 2026</h2>

<p>The traffic pattern has genuinely changed. According to BrightEdge's 2026 data, Google AI Overviews appear on roughly 48% of tracked queries, compared to about 31% a year earlier. ChatGPT handles more than one billion searches per month. Perplexity crossed 100 million monthly active users. That is not a curiosity anymore — it is a measurable slice of your potential audience.</p>

<p>What makes GEO interesting is that being cited inside an AI answer earns meaningful <em>click-through</em>, not just impressions. Users actively tap citation sources to verify what the model told them. If your WordPress site is the source, you inherit that trust.</p>

<p>For small and mid-size WordPress sites this is an opportunity. LLMs do not care about your domain rating the way Google's link graph does. They care about <strong>clarity, structure, and verifiable claims</strong>. That levels the playing field more than traditional SEO ever did.</p>

<h2>8 Practical WordPress GEO Tactics</h2>

<h3>1. Add Complete JSON-LD Schema Markup</h3>

<p>Schema.org markup in JSON-LD is the single most important GEO signal on WordPress. It turns your page into structured data that LLMs can extract facts from without guessing. Every major AI answer engine crawls and indexes JSON-LD.</p>

<p>At minimum, publish <strong>Article</strong> schema on every post. Here is a real example you can adapt:</p>

<pre><code>&lt;script type="application/ld+json"&gt;
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Optimize WordPress for AI Search",
  "datePublished": "2026-04-17",
  "dateModified": "2026-04-17",
  "author": {
    "@type": "Person",
    "name": "Marvin",
    "url": "https://zerotowordpress.com/about/",
    "sameAs": [
      "https://twitter.com/marvin",
      "https://www.linkedin.com/in/marvin"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "ZeroToWordPress",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zerotowordpress.com/logo.png"
    }
  }
}
&lt;/script&gt;</code></pre>

<p><a href="/best-seo-plugins/">Rank Math and AIOSEO</a> both generate this automatically. If you want finer control or product-specific markup, <a href="https://wpschema.com/" target="_blank" rel="nofollow noopener noreferrer">Schema Pro</a> is a solid add-on for Review, HowTo, Recipe, and Product types.</p>

<h3>2. Use FAQPage Schema on Every Guide</h3>

<p>FAQ schema is the cheapest GEO win on WordPress. LLMs love FAQ blocks because the question-answer pairing is unambiguous. Here is a compact FAQPage JSON-LD pattern:</p>

<pre><code>{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is GEO?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "GEO is Generative Engine Optimization — structuring content so AI engines like ChatGPT and Perplexity cite your page in answers."
    }
  }]
}</code></pre>

<p>Rank Math's FAQ block and AIOSEO's FAQ module generate this automatically from H3 questions. If you write H3 headings that end in a question mark (as I do in every guide), the schema is basically free.</p>

<h3>3. Publish an llms.txt File</h3>

<p>The llms.txt standard was proposed by Jeremy Howard in late 2024 and gained broad adoption through 2025. It is a Markdown file at <code>yourdomain.com/llms.txt</code> that lists your most important pages so LLMs can index them efficiently without parsing every piece of HTML.</p>

<p>A minimal llms.txt looks like this:</p>

<pre><code># ZeroToWordPress

> WordPress tutorials, SEO guides, and plugin reviews for beginners.

## Guides
- [Improve WordPress SEO](https://zerotowordpress.com/improve-wordpress-seo/): Complete 2026 SEO checklist.
- [WordPress Slug SEO](https://zerotowordpress.com/wordpress-slug-seo/): How to write clean URLs.
- [Optimize WordPress for AI Search](https://zerotowordpress.com/optimize-wordpress-for-ai-search-geo/): GEO guide.

## Reviews
- [Hostinger Review](https://zerotowordpress.com/hostinger-review/): Honest hosting review.
- [Astra Theme Review](https://zerotowordpress.com/astra-theme-review/): Theme review.</code></pre>

<p>In 2026, <strong>AIOSEO</strong>, <strong>Yoast SEO</strong>, and <strong>Rank Math</strong> all ship llms.txt generators. In AIOSEO, go to <em>All in One SEO → Sitemaps → LLMs.txt</em> and toggle it on. Yoast added the feature in its free plugin in mid-2025. If you prefer a dedicated plugin, the free <strong>Website LLMs.txt</strong> plugin in the WordPress.org directory also works well.</p>

<img src="/images/blog/optimize-wordpress-for-ai-search-geo-2.webp" alt="Example of an llms.txt file for a WordPress site" />

<h3>4. Write Citation-Friendly Content Blocks</h3>

<p>Generative engines prefer content they can quote in one sentence without distortion. The patterns I see cited most often across my own sites:</p>

<ul>
<li>Open each section with a <strong>direct claim</strong>, not a buildup.</li>
<li>Put the numeric fact and its source in the same sentence.</li>
<li>Use <strong>bulleted lists</strong> for enumerations (plugins, steps, rules).</li>
<li>Use <strong>tables</strong> for comparisons (GEO vs SEO vs AEO above).</li>
<li>Anchor dates explicitly ("As of April 2026..."), because LLMs often cite recency.</li>
</ul>

<p>Padded, flowery prose gets skipped. Concise, structured answers get cited.</p>

<h3>5. Build Entity-Level Topical Authority</h3>

<p>LLMs understand entities, not just keywords. If your WordPress site has 20 strong posts about WordPress SEO, all interlinked and consistent in voice, you become an <em>entity</em> associated with that topic in the model's embedding space. One loose post on a random topic does not do this.</p>

<p>The practical move: build topical clusters. Pick a pillar (for example <a href="/wordpress-seo-guide/">WordPress SEO</a>), then write 10-15 supporting guides that all link back to it. I use this approach on ZeroToWordPress and on my sister site, and the citation rate in AI answers climbs noticeably once a cluster hits critical mass.</p>

<h3>6. Target Long-Tail Semantic Questions</h3>

<p>AI users type full questions, not keywords. "Best WordPress plugin" is a Google query. "Which WordPress SEO plugin generates llms.txt for free in 2026?" is an AI query. Your article should answer both, but the H3 subheadings should reflect the semantic, conversational version.</p>

<p>Pull these questions from real sources: People Also Ask boxes, Perplexity's "Related" panel, Reddit threads, and the "Ask AI" follow-ups in Google SERPs. Then answer them in two or three sentences directly under the H3.</p>

<h3>7. Strengthen Author E-E-A-T Signals</h3>

<p>LLMs weight sources by perceived authority. That means:</p>

<ul>
<li><strong>Byline every post</strong> — no anonymous content.</li>
<li>Link each byline to a real <strong>author archive page</strong> with bio, photo, and credentials.</li>
<li>Add <code>sameAs</code> links in Person schema pointing at LinkedIn, X, GitHub, or industry profiles.</li>
<li>Show "Last updated" dates inside the article (not just in metadata).</li>
<li>Cite primary sources with <code>rel="nofollow noopener noreferrer"</code> so your outbound linking looks deliberate.</li>
</ul>

<p>None of this is new SEO advice. The difference in 2026 is that LLMs explicitly parse these signals when deciding whose answer to quote.</p>

<h3>8. Use a WordPress SEO Plugin With AI Search Features</h3>

<p>As of 2026, both major WordPress SEO plugins shipped GEO-focused features:</p>

<ul>
<li><strong><a href="https://rankmath.com/" target="_blank" rel="nofollow noopener noreferrer">Rank Math Pro</a></strong> — adds llms.txt support, an AI search traffic tracker that shows visits from AI platforms, and Content AI with 40+ tools for generating citation-ready briefs. <em>Affiliate note: I use Rank Math on ZeroToWordPress.</em></li>
<li><strong><a href="https://aioseo.com/" target="_blank" rel="nofollow noopener noreferrer">AIOSEO Pro</a></strong> — ships an AI Keyword Report that tracks whether your content appears in ChatGPT and Gemini answers, plus a one-click llms.txt generator.</li>
<li><strong><a href="https://wpschema.com/" target="_blank" rel="nofollow noopener noreferrer">Schema Pro</a></strong> — fills schema types the big plugins skip (Review, HowTo, VideoObject, Recipe).</li>
</ul>

<p>If I were starting a new WordPress site today and wanted to rank in AI search, I would run Rank Math Pro or AIOSEO Pro as the core plugin and add Schema Pro only if my niche needs Product or Recipe markup.</p>

<img src="/images/blog/optimize-wordpress-for-ai-search-geo-3.webp" alt="Rank Math AI search traffic tracker interface" />

<h2>How to Verify If ChatGPT or Perplexity Cites Your Site</h2>

<p>You do not have to guess. There are four ways to check directly:</p>

<ol>
<li><strong>Ask the chatbot.</strong> In Perplexity or ChatGPT, ask a question your article answers. If your domain appears as a cited source in the sidebar or inline footnote, you are in.</li>
<li><strong>Check referrer traffic in Google Analytics 4.</strong> Filter for <code>chat.openai.com</code>, <code>perplexity.ai</code>, <code>gemini.google.com</code>, and <code>claude.ai</code>. Any sessions from those referrers are AI citation clicks.</li>
<li><strong>Use AIOSEO's AI Keyword Report</strong> if you run that plugin. It pulls citation data directly.</li>
<li><strong>Check server logs</strong> for LLM crawler user agents: <code>GPTBot</code>, <code>ClaudeBot</code>, <code>PerplexityBot</code>, <code>Google-Extended</code>. If they are hitting the page, that is the precondition for citation.</li>
</ol>

<h2>Common GEO Mistakes to Avoid</h2>

<ul>
<li><strong>Blocking LLM crawlers in robots.txt.</strong> Some guides suggest blocking <code>GPTBot</code> for copyright reasons. That is fine if it is a deliberate policy — just know it also kills GEO completely.</li>
<li><strong>Thin FAQ blocks.</strong> Three one-line questions with generic answers is not a FAQPage. Write real answers, two to four sentences each.</li>
<li><strong>Schema in the footer instead of the head.</strong> Place JSON-LD inside <code>&lt;head&gt;</code> or early in <code>&lt;body&gt;</code>, not after the closing content.</li>
<li><strong>AI-generated filler without editing.</strong> LLMs recognize their own slop patterns and tend to downweight them.</li>
<li><strong>Skipping dateModified.</strong> Without it, AI engines default to <em>datePublished</em> and may treat your page as stale.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>What is GEO?</h3>
<p>GEO stands for <strong>Generative Engine Optimization</strong>. It is the practice of structuring your content, schema, and site signals so AI answer engines like ChatGPT, Perplexity, Claude, and Google AI Overviews cite your page when they answer user questions.</p>

<h3>How is GEO different from SEO?</h3>
<p>SEO aims at ranking blue links on Google. GEO aims at being quoted inside an AI-generated answer. The tactics overlap (schema, E-E-A-T, clean URLs, internal links), but GEO adds emphasis on structured data quality, citation-friendly writing, and signals like llms.txt that classic SEO does not require.</p>

<h3>Does WordPress need an llms.txt file?</h3>
<p>It is not mandatory, but adding one is a low-effort win. Rank Math, AIOSEO, and Yoast SEO all generate llms.txt automatically in 2026. Turn it on in your SEO plugin's settings and forget about it.</p>

<h3>Which WordPress SEO plugin is best for GEO?</h3>
<p>Both Rank Math Pro and AIOSEO Pro ship GEO features in 2026. Rank Math has stronger Content AI tooling; AIOSEO has a better built-in AI citation tracker. Pick either — do not run both at the same time.</p>

<h3>Do I need to block GPTBot or ClaudeBot?</h3>
<p>Only if you have a specific business reason (copyright, licensing, competitive concerns). Blocking them means your site cannot be cited by that AI engine. For most WordPress publishers, leaving them enabled is the correct choice.</p>

<h3>How long does GEO take to show results?</h3>
<p>Faster than classic SEO, in my experience. New pages with strong schema and clear formatting can start appearing in Perplexity citations within two to four weeks — sometimes before they rank on Google. Google AI Overviews follow traditional ranking signals more, so they take longer.</p>

<h3>Can I use AI to write GEO-optimized content?</h3>
<p>Yes, but only if you edit. Raw AI output gets recognized and downweighted. Use AI for research, outline, and first drafts; then add your own examples, data, opinions, and voice before publishing.</p>

<h2>Primary Sources Used</h2>

<ul>
<li><a href="https://schema.org/" target="_blank" rel="nofollow noopener noreferrer">Schema.org: official vocabulary and types</a></li>
<li><a href="https://developers.google.com/search/docs/appearance/structured-data/faqpage" target="_blank" rel="nofollow noopener noreferrer">Google Search Central: FAQPage structured data</a></li>
<li><a href="https://llmstxt.org/" target="_blank" rel="nofollow noopener noreferrer">llmstxt.org: the llms.txt standard proposal</a></li>
<li><a href="https://wordpress.org/plugins/website-llms-txt/" target="_blank" rel="nofollow noopener noreferrer">WordPress.org: Website LLMs.txt plugin</a></li>
<li><a href="https://rankmath.com/kb/llms-txt/" target="_blank" rel="nofollow noopener noreferrer">Rank Math: llms.txt documentation</a></li>
<li><a href="https://aioseo.com/features/llms-txt/" target="_blank" rel="nofollow noopener noreferrer">AIOSEO: llms.txt generator</a></li>
<li><a href="https://yoast.com/features/llms-txt/" target="_blank" rel="nofollow noopener noreferrer">Yoast SEO: llms.txt feature</a></li>
</ul>

<p>Once your schema and llms.txt are in place, revisit the fundamentals. A strong <a href="/wordpress-slug-seo/">URL slug strategy</a>, a tidy <a href="/wordpress-seo-checklist/">WordPress SEO checklist</a>, and a pillar page built around <a href="/keyword-research-beginners/">keyword research for beginners</a> still do most of the heavy lifting. GEO is the layer you add <em>on top</em> of a solid SEO foundation, not a replacement for it.</p>
`;
