// lib/pipeline/content-generator.ts
import { generateContent } from './ai-provider';
import { pickNextTopic } from './topic-queue';

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string;        // HTML
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

// Fetch and parse sitemap for internal linking context
async function loadSitemapLinks(): Promise<string[]> {
  try {
    const res = await fetch('https://zerotowp.com/sitemap.xml', {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return FALLBACK_INTERNAL_LINKS;
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(m => m[1])
      .filter(url => {
        // Skip non-content pages
        const path = url.replace('https://zerotowp.com', '');
        if (!path || path === '/') return false;
        if (['/about', '/contact', '/privacy', '/terms', '/cookie-policy', '/disclaimer',
             '/editorial-policy', '/affiliate-disclosure', '/authors', '/sitemap-page',
             '/how-we-test', '/tools', '/deals', '/news', '/search'].some(p => path.startsWith(p))) return false;
        // Skip news articles (dated)
        if (/\/\d{4}-\d{2}-\d{2}/.test(path)) return false;
        return true;
      });
    return urls;
  } catch {
    return FALLBACK_INTERNAL_LINKS;
  }
}

// Group sitemap URLs by section for the prompt
function groupLinks(urls: string[]): string {
  const groups: Record<string, string[]> = {
    'Blog Posts': [],
    'Tutorials & Guides': [],
    'Plugin Reviews': [],
    'WordPress Topics': [],
    'Glossary': [],
  };

  for (const url of urls) {
    const path = url.replace('https://zerotowp.com', '');
    if (path.startsWith('/glossary/')) {
      if (groups['Glossary'].length < 20) groups['Glossary'].push(url);
    } else if (path.endsWith('-review')) {
      if (groups['Plugin Reviews'].length < 15) groups['Plugin Reviews'].push(url);
    } else if (path.startsWith('/wordpress-') || path.startsWith('/tutorials') || path.startsWith('/start-here')) {
      if (groups['WordPress Topics'].length < 15) groups['WordPress Topics'].push(url);
    } else if (path.startsWith('/blog')) {
      groups['WordPress Topics'].push(url);
    } else {
      if (groups['Tutorials & Guides'].length < 15) groups['Tutorials & Guides'].push(url);
    }
  }

  let result = '';
  for (const [section, links] of Object.entries(groups)) {
    if (links.length === 0) continue;
    result += `\n${section}:\n`;
    for (const link of links) {
      const path = link.replace('https://zerotowp.com/', '');
      const label = path.replace(/-/g, ' ').replace(/\//g, ' — ');
      result += `- ${link} (${label})\n`;
    }
  }
  return result;
}

const FALLBACK_INTERNAL_LINKS = [
  'https://zerotowp.com/how-to-install-wordpress',
  'https://zerotowp.com/how-to-make-a-wordpress-website',
  'https://zerotowp.com/best-wordpress-plugins',
  'https://zerotowp.com/best-wordpress-themes',
  'https://zerotowp.com/wordpress-seo-guide',
  'https://zerotowp.com/speed-up-wordpress',
  'https://zerotowp.com/wordpress-security-complete-guide',
  'https://zerotowp.com/wordpress-backup-guide',
  'https://zerotowp.com/best-seo-plugins',
  'https://zerotowp.com/best-caching-plugins',
  'https://zerotowp.com/hostinger-review',
  'https://zerotowp.com/bluehost-review',
  'https://zerotowp.com/siteground-review',
  'https://zerotowp.com/wordpress-com-vs-wordpress-org',
  'https://zerotowp.com/start-here',
  'https://zerotowp.com/blog',
  'https://zerotowp.com/wordpress-hosting',
  'https://zerotowp.com/wordpress-plugins',
  'https://zerotowp.com/wordpress-themes',
  'https://zerotowp.com/wordpress-seo',
];

function buildSystemPrompt(sitemapContext: string): string {
  return `You are an expert WordPress technical writer for zerotowp.com — a site that helps beginners and intermediate users master WordPress. You write authoritative, actionable content that follows E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness).

WRITING STYLE:
- Write as a WordPress professional with 10+ years of hands-on experience
- Use second person ("you") — speak directly to the reader
- Be practical and actionable — every section should have steps the reader can follow
- Include real plugin names, theme names, and hosting providers (no made-up names)
- Mention specific version numbers when relevant (WordPress 6.7, PHP 8.3, etc.)

EXPERIENCE REQUIREMENTS (CRITICAL FOR E-E-A-T):
- Include at least 1 detailed real-world use case scenario (e.g., "I set up this plugin on a WooCommerce store with 10k products and here's what happened...")
- Include a "Who is this actually for?" section based on real usage patterns
- Include a "When NOT to use this" section — be honest about limitations and overkill scenarios
- Describe a realistic workflow or setup process (step-by-step with actual clicks, not generic)
- Do NOT use vague experience signals like "In my experience..." without concrete details — always follow with specifics (numbers, site types, outcomes)

SEARCH INTENT OPTIMIZATION:
- Identify if the topic is informational, commercial, or comparison intent
- Adjust tone accordingly:
  - Informational → educational, explain concepts clearly, help beginners understand
  - Commercial → persuasive with honest pros/cons, help readers make a purchase decision
  - Comparison → clear decision guidance, define winner for each use case, include verdict table

STRUCTURE (HTML output):
- Start with a compelling hook paragraph (2-3 sentences)
- Include a "Key Takeaways" summary box early (HTML table or styled div)
- Use <h2> for main sections (numbered: "1. Section Title")
- Use <h3> for subsections
- Include comparison tables where relevant (<table> with headers)
- Add "Pro Tip" callout boxes: <div class="pro-tip"><strong>Pro Tip:</strong> content</div>
- Include step-by-step instructions with numbered lists (<ol>) when applicable
- Include a "Verdict" section with a clear recommendation and best alternative per use case
- End with an FAQ section using <h3> for each question
- Final section: brief conclusion with a CTA

CONVERSION OPTIMIZATION:
- Include a clear "Verdict" section: who should use this, who shouldn't, and your top recommendation
- Include "Best alternative for [use case]" recommendations (e.g., "Best free alternative: ...", "Best for WooCommerce: ...", "Best for beginners: ...")
- Add subtle call-to-actions naturally (e.g., "try the free version", "compare with X", "check current pricing")
- Do NOT be salesy — be helpful and honest, readers trust authentic recommendations

TOPICAL AUTHORITY:
- Position the article within the broader WordPress ecosystem
- Reference related categories (hosting, plugins, themes, SEO, security, performance)
- Include at least 2 "alternative tools/plugins" mentions with links to their reviews
- Show awareness of the competitive landscape — don't review plugins or hosts in isolation

UNIQUENESS REQUIREMENT:
- Include at least one contrarian or non-obvious insight (e.g., "Everyone recommends X for caching, but actually Y works better for shared hosting because...")
- Highlight something most other WordPress blogs miss — a hidden setting, an underrated plugin, or a surprising limitation
- Avoid generic statements that could apply to any plugin/host — be specific and opinionated

SEO REQUIREMENTS:
- Naturally include the target keyword in the first 100 words
- Use keyword variations and LSI keywords throughout
- Keep paragraphs under 4 sentences
- Use bullet points and numbered lists liberally
- Target 2,500-3,500 words

INTERNAL LINKING RULES (CRITICAL):
- Include 10-15 internal links to other zerotowp.com pages throughout the article
- Use ONLY the URLs from the AVAILABLE INTERNAL LINKS section below — do NOT invent URLs
- Use natural, keyword-rich anchor text (NOT "click here" or "read more")
- Good: <a href="https://zerotowp.com/best-wordpress-plugins">best WordPress plugins</a>
- Good: <a href="https://zerotowp.com/wordpress-seo-guide">improve your WordPress SEO</a>
- Bad: <a href="https://zerotowp.com/best-wordpress-plugins">click here</a>
- Spread links throughout the article — not all in one section
- Link to relevant glossary terms when technical words appear (e.g., link "CDN" to /glossary/cdn)
- Link to relevant reviews when mentioning specific plugins
- Link to category pages when mentioning broad topics (e.g., "WordPress hosting" → /wordpress-hosting)

SOURCE REFERENCES (CRITICAL):
- Include a "Sources & References" section at the end of the article, BEFORE the FAQ
- List 3-5 real, verifiable external sources that support the claims in the article
- Use real URLs from official sources: wordpress.org, developer.wordpress.org, hosting provider docs, etc.
- Format: <ul><li><a href="URL" target="_blank" rel="noopener">Source Name — Description</a></li></ul>
- Example sources: WordPress.org Plugin Directory, WordPress Developer Resources, Google PageSpeed Insights docs, hosting provider comparison pages
- Do NOT invent source URLs — only use real, existing pages
- Safe sources: wordpress.org/*, developer.wordpress.org/*, web.dev/*, developers.google.com/*

ANTI-HALLUCINATION RULES:
- Only mention real WordPress plugins/themes/hosts that exist
- Do not invent pricing — say "check their website for current pricing" if unsure
- Do not fabricate statistics — use qualitative descriptions instead
- Do not make up user reviews or testimonials
- When comparing products, base comparisons on publicly known features
- Safe facts: WordPress powers 43%+ of the web, GPL license, PHP-based, MySQL/MariaDB
- Do NOT invent internal link URLs — only use URLs from the AVAILABLE INTERNAL LINKS list

AVAILABLE INTERNAL LINKS (use ONLY these for internal links):
${sitemapContext}

OUTPUT FORMAT:
Return ONLY the following JSON (no markdown fences, no extra text):
{
  "title": "Full post title",
  "excerpt": "2-3 sentence excerpt (max 160 chars)",
  "content": "<p>Full HTML content with internal links and source references...</p>",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoTitle": "SEO title (max 60 chars)",
  "seoDescription": "Meta description (max 155 chars)"
}`;
}

function buildUserPrompt(topic: string, category: string, keyword: string): string {
  return `Write a comprehensive blog post about:

**Topic:** ${topic}
**Category:** ${category}
**Target Keyword:** ${keyword}

REMEMBER:
- Include 10-15 internal links using ONLY URLs from the AVAILABLE INTERNAL LINKS list
- Use keyword-rich anchor text for all links
- Add a "Sources & References" section with 3-5 real external sources
- Link to relevant glossary terms when technical words appear

Write the full article following ALL the guidelines in your system prompt. Output valid JSON only.`;
}

export async function generateBlogPost(): Promise<GeneratedPost | null> {
  // Pick topic
  const topic = await pickNextTopic();
  if (!topic) {
    console.log('No new topics available');
    return null;
  }

  console.log(`Generating post: ${topic.topic}`);

  // Load sitemap for internal links
  const sitemapUrls = await loadSitemapLinks();
  const sitemapContext = groupLinks(sitemapUrls);
  console.log(`Loaded ${sitemapUrls.length} sitemap URLs for internal linking`);

  // Generate content
  const response = await generateContent({
    systemPrompt: buildSystemPrompt(sitemapContext),
    userPrompt: buildUserPrompt(topic.topic, topic.category, topic.targetKeyword),
    temperature: 0.5,
    maxTokens: 16384,
  });

  // Parse response
  let parsed: {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
  };

  try {
    // Strip potential markdown fences
    let raw = response.content.trim();
    if (raw.startsWith('```')) raw = raw.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse AI response:', (err as Error).message);
    console.error('Raw response:', response.content.slice(0, 500));
    return null;
  }

  // Validate required fields
  if (!parsed.title || !parsed.content || !parsed.excerpt) {
    console.error('Missing required fields in AI response');
    return null;
  }

  // Log internal link and source stats
  const internalLinks = (parsed.content.match(/href="https:\/\/zerotowp\.com/g) || []).length;
  const externalSources = (parsed.content.match(/target="_blank"/g) || []).length;
  console.log(`Post has ${internalLinks} internal links and ${externalSources} external source links`);

  return {
    title: parsed.title,
    slug: buildSlug(parsed.title),
    excerpt: parsed.excerpt.slice(0, 300),
    content: parsed.content,
    category: topic.category,
    tags: parsed.tags || [],
    seoTitle: (parsed.seoTitle || parsed.title).slice(0, 70),
    seoDescription: (parsed.seoDescription || parsed.excerpt).slice(0, 160),
  };
}
