# ZeroToWP Automated Blog Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully automated blog content generation pipeline that creates high-quality WordPress tutorial/guide posts via AI, generates images, and publishes them to Convex DB on a schedule — matching the quality bar of go2thailand.com's pipeline.

**Architecture:** Vercel cron triggers a Next.js API route → AI generates SEO-optimized WordPress content with E-E-A-T signals → Gemini generates a header image → post is inserted into Convex DB via server-side mutation → site auto-updates via Convex reactivity. No translation needed. No GitHub commits needed (Convex is the store).

**Tech Stack:** Next.js 16 App Router, Convex (DB + mutations), Claude Haiku / GPT fallback (content), Gemini 3.1 Flash Image (images), Vercel Crons

**Key Differences from go2thailand pipeline:**
- Convex DB instead of GitHub API for storage
- App Router instead of Pages Router
- HTML content instead of Markdown (Convex posts use HTML)
- No translation pipeline needed
- WordPress/tech niche instead of travel

---

## File Structure

| File | Responsibility |
|------|---------------|
| `lib/pipeline/ai-provider.ts` | **Create** — Unified AI interface with Claude/GPT fallback + retry logic |
| `lib/pipeline/content-generator.ts` | **Create** — WordPress blog post generation with E-E-A-T prompts |
| `lib/pipeline/image-generator.ts` | **Create** — Blog header image generation via Gemini 3.1 |
| `lib/pipeline/topic-queue.ts` | **Create** — Topic selection + duplicate detection via Convex |
| `content/topic-queue.json` | **Create** — Priority queue of WordPress topics with SEO data |
| `app/api/cron/generate-blog/route.ts` | **Create** — App Router cron endpoint |
| `convex/posts.ts` | **Modify** — Add `createFromPipeline` internal mutation |
| `convex/media.ts` | **Modify or Create** — Add `generateUploadUrl` + image storage |
| `vercel.json` | **Create** — Cron schedule config |

---

### Task 1: AI Provider Layer

**Files:**
- Create: `lib/pipeline/ai-provider.ts`

- [ ] **Step 1: Create AI provider with Claude primary + GPT fallback**

```typescript
// lib/pipeline/ai-provider.ts

const AI_TIMEOUT_MS = 120_000;
const MAX_RETRIES = 2;

interface AIOptions {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

interface AIResponse {
  content: string;
  model: string;
  tokensUsed?: number;
}

async function callClaude(options: AIOptions): Promise<AIResponse> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: options.maxTokens || 16384,
      temperature: options.temperature ?? 0.5,
      system: options.systemPrompt,
      messages: [{ role: 'user', content: options.userPrompt }],
    }),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`Claude API error: ${res.status}`);
  const data = await res.json();
  return {
    content: data.content[0].text,
    model: 'claude-haiku',
    tokensUsed: data.usage?.output_tokens,
  };
}

async function callOpenAI(options: AIOptions): Promise<AIResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY not set');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: options.maxTokens || 16384,
      temperature: options.temperature ?? 0.5,
      messages: [
        { role: 'system', content: options.systemPrompt },
        { role: 'user', content: options.userPrompt },
      ],
    }),
    signal: AbortSignal.timeout(AI_TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`OpenAI API error: ${res.status}`);
  const data = await res.json();
  return {
    content: data.choices[0].message.content,
    model: 'gpt-4o-mini',
    tokensUsed: data.usage?.completion_tokens,
  };
}

export async function generateContent(options: AIOptions): Promise<AIResponse> {
  const providers = [
    ...(process.env.ANTHROPIC_API_KEY ? [callClaude] : []),
    ...(process.env.OPENAI_API_KEY ? [callOpenAI] : []),
  ];

  if (providers.length === 0) throw new Error('No AI API keys configured');

  for (const provider of providers) {
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        return await provider(options);
      } catch (err) {
        console.error(`AI attempt ${attempt + 1} failed:`, (err as Error).message);
        if (attempt < MAX_RETRIES) await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  throw new Error('All AI providers failed after retries');
}
```

- [ ] **Step 2: Verify the file compiles**

Run: `cd /home/marvin/Projecten/zerotowordpress && npx tsc --noEmit lib/pipeline/ai-provider.ts 2>&1 || echo "Check for type errors"`

- [ ] **Step 3: Commit**

```bash
cd /home/marvin/Projecten/zerotowordpress
git add lib/pipeline/ai-provider.ts
git commit -m "feat: add AI provider layer with Claude/GPT fallback"
```

---

### Task 2: Topic Queue

**Files:**
- Create: `content/topic-queue.json`
- Create: `lib/pipeline/topic-queue.ts`

- [ ] **Step 1: Create topic queue JSON with 30+ WordPress topics**

```json
// content/topic-queue.json
{
  "topics": [
    {
      "topic": "How to Install WordPress: Complete Beginner Guide (2026)",
      "category": "tutorials",
      "targetKeyword": "how to install wordpress",
      "searchVolume": 40500,
      "priority": 1
    },
    {
      "topic": "Best WordPress Hosting Providers Compared (2026)",
      "category": "hosting",
      "targetKeyword": "best wordpress hosting",
      "searchVolume": 33100,
      "priority": 1
    },
    {
      "topic": "WordPress vs Squarespace vs Wix: Which Website Builder Is Best?",
      "category": "beginners-guide",
      "targetKeyword": "wordpress vs squarespace vs wix",
      "searchVolume": 22200,
      "priority": 2
    },
    {
      "topic": "15 Must-Have WordPress Plugins for Every Website",
      "category": "plugins",
      "targetKeyword": "must have wordpress plugins",
      "searchVolume": 18100,
      "priority": 2
    },
    {
      "topic": "How to Speed Up WordPress: 20 Proven Tips",
      "category": "tutorials",
      "targetKeyword": "speed up wordpress",
      "searchVolume": 14800,
      "priority": 2
    },
    {
      "topic": "WordPress Security Guide: Protect Your Site from Hackers",
      "category": "tutorials",
      "targetKeyword": "wordpress security guide",
      "searchVolume": 12100,
      "priority": 3
    },
    {
      "topic": "Best Free WordPress Themes in 2026 (Expert Picks)",
      "category": "themes",
      "targetKeyword": "best free wordpress themes",
      "searchVolume": 27100,
      "priority": 2
    },
    {
      "topic": "How to Start a WordPress Blog and Make Money",
      "category": "tutorials",
      "targetKeyword": "start wordpress blog make money",
      "searchVolume": 22000,
      "priority": 1
    },
    {
      "topic": "WooCommerce Setup Guide: Build Your Online Store Step by Step",
      "category": "tutorials",
      "targetKeyword": "woocommerce setup guide",
      "searchVolume": 14400,
      "priority": 3
    },
    {
      "topic": "WordPress SEO: The Complete Guide to Ranking Higher",
      "category": "tutorials",
      "targetKeyword": "wordpress seo guide",
      "searchVolume": 18000,
      "priority": 2
    },
    {
      "topic": "How to Choose the Right WordPress Theme for Your Niche",
      "category": "themes",
      "targetKeyword": "choose wordpress theme",
      "searchVolume": 9900,
      "priority": 3
    },
    {
      "topic": "WordPress.com vs WordPress.org: What's the Real Difference?",
      "category": "beginners-guide",
      "targetKeyword": "wordpress.com vs wordpress.org",
      "searchVolume": 27100,
      "priority": 2
    },
    {
      "topic": "How to Create a Landing Page in WordPress (No Code)",
      "category": "tutorials",
      "targetKeyword": "create landing page wordpress",
      "searchVolume": 8100,
      "priority": 3
    },
    {
      "topic": "Best WordPress Page Builders Compared: Elementor vs Divi vs Gutenberg",
      "category": "plugins",
      "targetKeyword": "best wordpress page builder",
      "searchVolume": 22200,
      "priority": 2
    },
    {
      "topic": "How to Migrate Your Website to WordPress (Step by Step)",
      "category": "tutorials",
      "targetKeyword": "migrate website to wordpress",
      "searchVolume": 6600,
      "priority": 3
    },
    {
      "topic": "WordPress Backup Guide: Never Lose Your Site Again",
      "category": "tutorials",
      "targetKeyword": "wordpress backup guide",
      "searchVolume": 8800,
      "priority": 3
    },
    {
      "topic": "Managed WordPress Hosting vs Shared Hosting: Which Is Worth It?",
      "category": "hosting",
      "targetKeyword": "managed vs shared wordpress hosting",
      "searchVolume": 5400,
      "priority": 3
    },
    {
      "topic": "How to Fix the Most Common WordPress Errors",
      "category": "tutorials",
      "targetKeyword": "common wordpress errors fix",
      "searchVolume": 12100,
      "priority": 3
    },
    {
      "topic": "Best WordPress Caching Plugins for Faster Load Times",
      "category": "plugins",
      "targetKeyword": "best wordpress caching plugin",
      "searchVolume": 9900,
      "priority": 3
    },
    {
      "topic": "How to Add Google Analytics to WordPress (2026)",
      "category": "tutorials",
      "targetKeyword": "add google analytics wordpress",
      "searchVolume": 14800,
      "priority": 3
    },
    {
      "topic": "Yoast vs Rank Math vs AIOSEO: Best WordPress SEO Plugin",
      "category": "plugins",
      "targetKeyword": "yoast vs rank math",
      "searchVolume": 18000,
      "priority": 2
    },
    {
      "topic": "How to Make Your WordPress Site GDPR Compliant",
      "category": "tutorials",
      "targetKeyword": "wordpress gdpr compliance",
      "searchVolume": 5400,
      "priority": 4
    },
    {
      "topic": "WordPress Multisite: When and How to Use It",
      "category": "tutorials",
      "targetKeyword": "wordpress multisite guide",
      "searchVolume": 4400,
      "priority": 4
    },
    {
      "topic": "How to Create a Membership Site with WordPress",
      "category": "tutorials",
      "targetKeyword": "wordpress membership site",
      "searchVolume": 6600,
      "priority": 4
    },
    {
      "topic": "Cloudways vs SiteGround vs Hostinger: WordPress Hosting Showdown",
      "category": "hosting",
      "targetKeyword": "cloudways vs siteground vs hostinger",
      "searchVolume": 8100,
      "priority": 2
    },
    {
      "topic": "The Complete Guide to WordPress Gutenberg Block Editor",
      "category": "tutorials",
      "targetKeyword": "wordpress gutenberg guide",
      "searchVolume": 9900,
      "priority": 3
    },
    {
      "topic": "How to Set Up WordPress Email (SMTP) the Right Way",
      "category": "tutorials",
      "targetKeyword": "wordpress smtp email setup",
      "searchVolume": 5400,
      "priority": 4
    },
    {
      "topic": "Best WordPress Contact Form Plugins (Free & Paid)",
      "category": "plugins",
      "targetKeyword": "best wordpress contact form plugin",
      "searchVolume": 12100,
      "priority": 3
    },
    {
      "topic": "How to Optimize Images in WordPress for Faster Loading",
      "category": "tutorials",
      "targetKeyword": "optimize images wordpress",
      "searchVolume": 8100,
      "priority": 3
    },
    {
      "topic": "WordPress Child Themes Explained: Why and How to Create One",
      "category": "tutorials",
      "targetKeyword": "wordpress child theme",
      "searchVolume": 9900,
      "priority": 4
    }
  ]
}
```

- [ ] **Step 2: Create topic queue reader with duplicate detection**

```typescript
// lib/pipeline/topic-queue.ts
import fs from 'fs';
import path from 'path';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

interface Topic {
  topic: string;
  category: string;
  targetKeyword: string;
  searchVolume: number;
  priority: number;
}

const STOP_WORDS = new Set([
  'in', 'the', 'a', 'an', 'of', 'for', 'to', 'and', 'is', 'vs',
  'best', 'guide', 'how', 'your', 'you', 'with', 'from', 'what',
  '2026', '2025', 'top', 'complete', 'ultimate',
]);

function getSignificantWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w))
    .map(w => w.replace(/s$/, '')); // basic stemming
}

function isDuplicate(keyword: string, existingSlugs: string[]): boolean {
  const topicWords = getSignificantWords(keyword);
  if (topicWords.length === 0) return false;

  for (const slug of existingSlugs) {
    const slugSegments = slug.split('-').filter(s => s.length > 1 && !STOP_WORDS.has(s));
    const matches = topicWords.filter(w =>
      slugSegments.some(s => s === w || s.startsWith(w) || w.startsWith(s))
    );
    const ratio = matches.length / topicWords.length;

    if (topicWords.length <= 2 && ratio === 1) return true;
    if (topicWords.length >= 3 && ratio >= 0.85) return true;
    if (topicWords.length >= 4 && matches.length >= 4 && ratio >= 0.5) return true;
  }
  return false;
}

export async function pickNextTopic(): Promise<Topic | null> {
  // Read topic queue
  const queuePath = path.join(process.cwd(), 'content', 'topic-queue.json');
  const queue: { topics: Topic[] } = JSON.parse(fs.readFileSync(queuePath, 'utf8'));

  // Get existing slugs from Convex
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const existingPosts = await client.query(api.posts.listPublished, {});
  const existingSlugs = existingPosts.map((p: { slug: string }) => p.slug);

  // Sort by priority (asc) then search volume (desc)
  const sorted = [...queue.topics].sort((a, b) =>
    a.priority !== b.priority ? a.priority - b.priority : b.searchVolume - a.searchVolume
  );

  // Find first non-duplicate topic
  for (const topic of sorted) {
    if (!isDuplicate(topic.targetKeyword, existingSlugs)) {
      return topic;
    }
  }

  return null; // All topics published
}
```

- [ ] **Step 3: Commit**

```bash
git add content/topic-queue.json lib/pipeline/topic-queue.ts
git commit -m "feat: add topic queue with 30 WordPress topics + duplicate detection"
```

---

### Task 3: Content Generator

**Files:**
- Create: `lib/pipeline/content-generator.ts`

- [ ] **Step 1: Create the content generator with E-E-A-T WordPress prompts**

```typescript
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
```

- [ ] **Step 2: Verify compilation**

Run: `cd /home/marvin/Projecten/zerotowordpress && npx tsc --noEmit lib/pipeline/content-generator.ts 2>&1 || echo "Check errors"`

- [ ] **Step 3: Commit**

```bash
git add lib/pipeline/content-generator.ts
git commit -m "feat: add WordPress content generator with E-E-A-T prompts"
```

---

### Task 4: Image Generator

**Files:**
- Create: `lib/pipeline/image-generator.ts`

- [ ] **Step 1: Create Gemini 3.1 image generator**

```typescript
// lib/pipeline/image-generator.ts

const CATEGORY_STYLES: Record<string, string> = {
  tutorials: 'clean desk setup with laptop showing WordPress dashboard, modern workspace, soft lighting',
  hosting: 'server room with blue lighting, modern data center, cloud computing concept',
  plugins: 'puzzle pieces connecting together, WordPress plugin icons, modular design concept',
  themes: 'beautiful website designs on multiple screens, modern web design showcase',
  'beginners-guide': 'person starting their journey, laptop with blank website, fresh start concept',
};

export async function generateBlogImage(
  title: string,
  category: string,
  slug: string
): Promise<{ base64: string; mimeType: string } | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('GEMINI_API_KEY not set, skipping image generation');
    return null;
  }

  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES.tutorials;

  const prompt = `Professional blog header image for a WordPress tutorial website. Topic: "${title}". Style: ${style}. Clean, modern, professional. No text, no watermarks, no logos. Landscape 16:9 ratio. Photorealistic with slight tech/digital aesthetic.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
        }),
        signal: AbortSignal.timeout(30_000),
      }
    );

    if (!res.ok) {
      console.error(`Gemini API error: ${res.status}`);
      return null;
    }

    const data = await res.json();
    for (const candidate of data.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          return {
            base64: part.inlineData.data,
            mimeType: part.inlineData.mimeType || 'image/webp',
          };
        }
      }
    }
    return null;
  } catch (err) {
    console.error('Image generation failed:', (err as Error).message);
    return null;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/pipeline/image-generator.ts
git commit -m "feat: add blog image generator via Gemini 3.1 Flash"
```

---

### Task 5: Convex Pipeline Mutation

**Files:**
- Modify: `convex/posts.ts` — add `createFromPipeline` internal mutation

- [ ] **Step 1: Read the existing `convex/posts.ts` to understand current mutations**

- [ ] **Step 2: Add `createFromPipeline` internal mutation**

Add this to the bottom of `convex/posts.ts`:

```typescript
import { internalMutation } from "./_generated/server";

export const createFromPipeline = internalMutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    seoTitle: v.string(),
    seoDescription: v.string(),
    featuredImage: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // Check for duplicate slug
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      console.log(`Post with slug "${args.slug}" already exists, skipping`);
      return existing._id;
    }

    const now = Date.now();
    const id = await ctx.db.insert("posts", {
      ...args,
      status: "published",
      publishedAt: now,
      updatedAt: now,
      author: "pipeline",
      authorName: "ZeroToWP Team",
    });

    console.log(`Created post: ${args.title} (${id})`);
    return id;
  },
});
```

- [ ] **Step 3: Push Convex schema**

Run: `cd /home/marvin/Projecten/zerotowordpress && npx convex dev --once`

- [ ] **Step 4: Commit**

```bash
git add convex/posts.ts
git commit -m "feat: add createFromPipeline internal mutation for blog pipeline"
```

---

### Task 6: Cron API Route

**Files:**
- Create: `app/api/cron/generate-blog/route.ts`

- [ ] **Step 1: Create App Router cron endpoint**

```typescript
// app/api/cron/generate-blog/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/lib/pipeline/content-generator';
import { generateBlogImage } from '@/lib/pipeline/image-generator';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

export const maxDuration = 300; // 5 minutes

export async function POST(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Generate blog post
    const post = await generateBlogPost();
    if (!post) {
      return NextResponse.json({ message: 'No new topics available' }, { status: 200 });
    }

    // Generate image
    const image = await generateBlogImage(post.title, post.category, post.slug);

    // Store image in Convex if generated
    const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    let featuredImageId: string | undefined;

    if (image) {
      // Upload image to Convex storage
      const uploadUrl = await client.mutation(api.media.generateUploadUrl, {});
      const imageBuffer = Buffer.from(image.base64, 'base64');
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: { 'Content-Type': image.mimeType },
        body: imageBuffer,
      });
      if (uploadRes.ok) {
        const { storageId } = await uploadRes.json();
        featuredImageId = storageId;
      }
    }

    // Insert post into Convex via internal mutation
    // Note: internal mutations need to be called via scheduled function or action
    // For HTTP client, use a regular mutation or an action wrapper
    await client.mutation(api.posts.create, {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags,
      status: 'published',
      author: 'pipeline',
      authorName: 'ZeroToWP Team',
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      ...(featuredImageId ? { featuredImage: featuredImageId } : {}),
    });

    return NextResponse.json({
      success: true,
      title: post.title,
      slug: post.slug,
      category: post.category,
      hasImage: !!image,
    });
  } catch (error) {
    console.error('Blog generation failed:', error);
    return NextResponse.json(
      { error: 'Generation failed', details: (error as Error).message },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: Add media upload mutation if not exists**

Check if `convex/media.ts` has `generateUploadUrl`. If not, create:

```typescript
// convex/media.ts
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});
```

- [ ] **Step 3: Commit**

```bash
git add app/api/cron/generate-blog/route.ts convex/media.ts
git commit -m "feat: add cron endpoint for automated blog generation"
```

---

### Task 7: Vercel Cron Config

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create vercel.json with cron schedule**

```json
{
  "crons": [
    {
      "path": "/api/cron/generate-blog",
      "schedule": "0 6 * * 1,4"
    }
  ]
}
```

This runs Monday and Thursday at 6 AM UTC — 2 posts per week.

- [ ] **Step 2: Set environment variables on Vercel**

```bash
# Generate a random cron secret
CRON_SECRET=$(openssl rand -hex 32)
echo "$CRON_SECRET" | vercel env add CRON_SECRET production
# Also add: ANTHROPIC_API_KEY, GEMINI_API_KEY (or OPENAI_API_KEY)
```

- [ ] **Step 3: Commit and deploy**

```bash
git add vercel.json
git commit -m "feat: add Vercel cron schedule for blog generation (Mon+Thu 6AM)"
git push
```

---

### Task 8: Test Pipeline End-to-End

- [ ] **Step 1: Test locally with curl**

```bash
cd /home/marvin/Projecten/zerotowordpress
CRON_SECRET=test-secret npx next dev &
sleep 10
curl -X POST http://localhost:3000/api/cron/generate-blog \
  -H "Authorization: Bearer test-secret" \
  -H "Content-Type: application/json"
```

Expected: JSON response with `{ success: true, title: "...", slug: "..." }`

- [ ] **Step 2: Verify post in Convex dashboard**

Open: `https://dashboard.convex.dev/d/hearty-caterpillar-221`
Check the `posts` table for the newly created post.

- [ ] **Step 3: Verify post on site**

Navigate to `http://localhost:3000/blog` — new post should appear.

- [ ] **Step 4: Commit any fixes**

---

## Environment Variables Needed

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes (or OPENAI) | Claude AI for content |
| `OPENAI_API_KEY` | Fallback | GPT fallback |
| `GEMINI_API_KEY` | Optional | Blog header images |
| `CRON_SECRET` | Yes | Authenticate cron requests |
| `NEXT_PUBLIC_CONVEX_URL` | Yes (exists) | Convex database |
| `CONVEX_DEPLOYMENT` | Yes (exists) | Convex deployment |

## Post-Launch Monitoring

- Check Vercel Dashboard → Crons tab for execution logs
- Check Convex Dashboard → posts table for new entries
- First week: review generated posts manually for quality
- Adjust topic queue priorities based on what generates well
