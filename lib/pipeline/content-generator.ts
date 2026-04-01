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

function buildSystemPrompt(): string {
  return `You are an expert WordPress technical writer for zerotowp.com — a site that helps beginners and intermediate users master WordPress. You write authoritative, actionable content that follows E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness).

WRITING STYLE:
- Write as a WordPress professional with 10+ years of hands-on experience
- Use second person ("you") — speak directly to the reader
- Be practical and actionable — every section should have steps the reader can follow
- Include real plugin names, theme names, and hosting providers (no made-up names)
- Mention specific version numbers when relevant (WordPress 6.7, PHP 8.3, etc.)
- Add personal experience signals: "In my experience...", "I've tested this on 50+ sites...", "After migrating dozens of sites..."

STRUCTURE (HTML output):
- Start with a compelling hook paragraph (2-3 sentences)
- Include a "Key Takeaways" summary box early (HTML table or styled div)
- Use <h2> for main sections (numbered: "1. Section Title")
- Use <h3> for subsections
- Include comparison tables where relevant (<table> with headers)
- Add "Pro Tip" callout boxes: <div class="pro-tip"><strong>Pro Tip:</strong> content</div>
- Include step-by-step instructions with numbered lists (<ol>) when applicable
- End with an FAQ section using <h3> for each question
- Final section: brief conclusion with a CTA

SEO REQUIREMENTS:
- Naturally include the target keyword in the first 100 words
- Use keyword variations and LSI keywords throughout
- Keep paragraphs under 4 sentences
- Use bullet points and numbered lists liberally
- Target 2,000-3,500 words

ANTI-HALLUCINATION RULES:
- Only mention real WordPress plugins/themes/hosts that exist
- Do not invent pricing — say "check their website for current pricing" if unsure
- Do not fabricate statistics — use qualitative descriptions instead
- Do not make up user reviews or testimonials
- When comparing products, base comparisons on publicly known features
- Safe facts: WordPress powers 43%+ of the web, GPL license, PHP-based, MySQL/MariaDB

OUTPUT FORMAT:
Return ONLY the following JSON (no markdown fences, no extra text):
{
  "title": "Full post title",
  "excerpt": "2-3 sentence excerpt (max 160 chars)",
  "content": "<p>Full HTML content...</p>",
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

  // Generate content
  const response = await generateContent({
    systemPrompt: buildSystemPrompt(),
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
