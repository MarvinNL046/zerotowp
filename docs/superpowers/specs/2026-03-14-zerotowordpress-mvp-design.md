# ZeroToWordPress — MVP Design Spec

**Date:** 2026-03-14
**Status:** Approved
**Domain:** zerotowordpress.com
**Inspiration:** wpbeginner.com

---

## Overview

ZeroToWordPress is a niche authority site targeting complete WordPress beginners. It combines educational blog content with affiliate marketing (hosting, plugins, themes) and display ads. The site is built as a modern Next.js application with a custom CMS powered by Convex.

### Target Audience
Complete beginners who have never built a website before.

### Language
English — international audience.

### Revenue Model
- Primary: Affiliate marketing (hosting, themes, plugins)
- Secondary: Display ads (Google AdSense)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Hosting | Vercel |
| Database | Convex |
| Auth | Clerk |
| Styling | Tailwind CSS + shadcn/ui |
| Rich text editor | Novel (built on TipTap, provides a pre-built editor UI) |
| Email | Resend + Convex (subscriber storage) |
| Images | Convex File Storage |

---

## Architecture

Monolith — single Next.js app containing both the public site and admin panel.

```
zerotowordpress/
├── app/
│   ├── (public)/          # Blog, deals, reviews, start-here
│   │   ├── blog/
│   │   ├── deals/
│   │   ├── reviews/
│   │   └── start-here/
│   └── (admin)/           # CMS panel (Clerk-protected)
│       └── admin/
├── convex/                # Database schema, queries, mutations
├── components/            # Shared UI components (shadcn/ui)
└── lib/                   # Utilities, helpers
```

### Visual Style
Friendly & Bright — light nav, warm orange accent color, emoji usage, soft borders. Approachable and welcoming for beginners, but modern and professional. Think WPBeginner but updated.

---

## Data Model (Convex)

> **Note:** Convex automatically provides `_id` and `_creationTime` on all documents. Fields marked (optional) use `v.optional()` in the schema.

### Posts
Blog articles, tutorials, and guides. This includes "Start Here" guide steps — they are Posts with `category: "start-here"` and a `learningPathOrder` value.

- `title: string`
- `slug: string` (unique, indexed)
- `excerpt: string`
- `content: string` (rich text/HTML from Novel editor)
- `category: string` (enum: tutorials, beginners-guide, plugins, themes, hosting, start-here)
- `tags: string[]`
- `featuredImage: Id<"_storage">` (optional)
- `status: string` (enum: draft, published) (indexed)
- `publishedAt: number` (optional, timestamp — set on first publish)
- `updatedAt: number`
- `author: string` (Clerk user ID)
- `authorName: string` (denormalized from Clerk for display)
- `seoTitle: string` (optional override)
- `seoDescription: string` (optional override)
- `clusterId: Id<"clusters">` (optional — which topic cluster)
- `clusterRole: string` (optional, enum: pillar, supporting, related)
- `learningPathOrder: number` (optional — sequential position within its cluster, scoped per cluster)
- `relatedPosts: Id<"posts">[]` (manual internal link suggestions — supplements auto-scored `<RelatedContent>`)

**Indexes:** `by_slug`, `by_status`, `by_category`, `by_clusterId`

### Reviews
Plugin, theme, and hosting reviews with ratings. Reviews participate in clusters independently from Posts — a cluster's `pillarPostId` always points to a Post, and Reviews are always "supporting" within their cluster.

- `title: string`
- `slug: string` (unique, indexed)
- `excerpt: string`
- `content: string`
- `rating: number` (1-5)
- `pros: string[]`
- `cons: string[]`
- `affiliateLink: string`
- `affiliateLabel: string`
- `productName: string`
- `productImage: Id<"_storage">` (optional)
- `category: string` (enum: hosting, plugins, themes)
- `tags: string[]`
- `status: string` (enum: draft, published) (indexed)
- `publishedAt: number` (optional)
- `updatedAt: number`
- `author: string` (Clerk user ID)
- `authorName: string`
- `seoTitle: string` (optional)
- `seoDescription: string` (optional)
- `clusterId: Id<"clusters">` (optional)

**Indexes:** `by_slug`, `by_status`, `by_category`, `by_clusterId`

### Deals
Affiliate discount codes and promotions.

- `title: string`
- `description: string`
- `provider: string` (e.g., "Bluehost", "SiteGround")
- `category: string` (enum: hosting, plugins, themes)
- `discountPercentage: number`
- `couponCode: string` (optional — some deals are link-only)
- `affiliateLink: string`
- `logo: Id<"_storage">` (optional)
- `isActive: boolean` (indexed)
- `expiresAt: number` (optional timestamp)
- `sortOrder: number`

**Indexes:** `by_isActive`

### Pages
Static pages (About, Privacy, Terms, etc.). Note: "Start Here" content lives in Posts with `category: "start-here"`, not in this table. This table is for non-content pages only.

- `title: string`
- `slug: string` (unique, indexed)
- `content: string`
- `status: string` (enum: draft, published)

**Indexes:** `by_slug`

### Clusters
Topic authority clusters for SEO.

- `name: string` (e.g., "WordPress Hosting", "Getting Started")
- `slug: string` (unique, indexed)
- `description: string`
- `pillarPostId: Id<"posts">` (the hub/pillar page — always a Post)
- `sortOrder: number`

**Indexes:** `by_slug`

### Subscribers
Newsletter email capture.

- `email: string` (unique, indexed)
- `subscribedAt: number`
- `source: string` (e.g., "homepage", "blog-sidebar", "start-here")

**Indexes:** `by_email`

### Media
Image assets via Convex file storage.

- `storageId: Id<"_storage">`
- `filename: string`
- `mimeType: string`
- `alt: string`
- `caption: string` (optional)

---

## Cluster Architecture

### Cluster: "Getting Started"
- **Pillar:** "How to Make a WordPress Website (Complete Guide)"
- **Supporting:** "How to Choose a Domain Name" (`learningPathOrder: 1`)
- **Supporting:** "How to Install WordPress" (`learningPathOrder: 2`)
- **Supporting:** "WordPress.com vs WordPress.org" (`learningPathOrder: 3`)
- All supporting posts have `category: "start-here"` and render with `<LearningPath>`

### Cluster: "WordPress Hosting"
- **Pillar:** "How to Choose WordPress Hosting" (Post)
- **Supporting:** "Bluehost Review" (Review with `clusterId` pointing here)
- **Supporting:** "SiteGround Review" (Review)
- **Cross-cluster:** Links to Getting Started cluster posts and Deals page

### Cluster: "WordPress Plugins"
- **Pillar:** "Must-Have WordPress Plugins"
- **Supporting:** "Best Contact Form Plugins"
- **Supporting:** "Best SEO Plugins"
- **Cross-cluster:** Links to Reviews and Themes cluster

### Cluster: "WordPress Themes"
- **Pillar:** "How to Choose a WordPress Theme"
- **Supporting:** "Best Free Themes"
- **Supporting:** "Best Blog Themes"
- **Cross-cluster:** Links to Plugins and Getting Started cluster

### Linking Components

1. **`<ClusterNav>`** — Contextual sibling/parent navigation per cluster. Shows "More in this series" with links to other posts/reviews in the same cluster, plus a link back to the pillar page. Driven by querying all content with the same `clusterId`.

2. **`<LearningPath>`** — Sequential step navigation for posts with `category: "start-here"`. Numbered steps with current highlight, prev/next arrows. Driven by `learningPathOrder` within the post's cluster.

3. **`<RelatedContent>`** — Auto-scored related articles at the bottom of every post/review. Scoring based on: same cluster (highest), shared tags, same category. Manual `relatedPosts` are shown first, then auto-scored results fill remaining slots.

Cross-cluster linking is handled via `relatedPosts` (manual) and `<RelatedContent>` auto-scoring (which can surface content from other clusters via tag overlap). No separate `<CrossClusterBridge>` component needed for MVP — the auto-scorer handles it.

### URL Discipline
One URL per piece of content, no duplicates. Clean structure from day 1:
- `/blog/[slug]` — all blog posts (including start-here posts, which also render at `/start-here/[slug]`)
- `/reviews/[slug]` — all reviews
- `/deals` — deals overview
- `/start-here` — pillar/hub page (renders the Getting Started cluster pillar post with `<LearningPath>`)
- `/start-here/[slug]` — individual guide steps (canonical URL for start-here posts)
- `/category/[slug]` — posts filtered by category

---

## Routes & Pages

### Public Routes

```
/                           → Homepage (featured posts, latest, deals highlight)
/blog                       → Blog overview (all posts, filterable by category)
/blog/[slug]                → Individual blog post
/reviews                    → Reviews overview
/reviews/[slug]             → Individual review (rating, pros/cons, affiliate CTA)
/deals                      → All active deals
/start-here                 → Pillar page: beginner learning path overview
/start-here/[slug]          → Individual guide step (canonical for start-here posts)
/category/[slug]            → Posts filtered by category
```

### Admin Routes (Clerk-protected)

```
/admin                      → Dashboard (content stats, recent drafts)
/admin/posts                → Manage posts (list, filter, create)
/admin/posts/[id]/edit      → Post editor (Novel + SEO preview)
/admin/reviews              → Manage reviews
/admin/reviews/[id]/edit    → Review editor
/admin/deals                → Manage deals
/admin/pages                → Manage static pages
/admin/clusters             → Cluster overview & linking management
/admin/subscribers          → View & export subscribers
/admin/media                → Media library
```

---

## Admin Panel Features

- **Novel editor** for posts/reviews with inline formatting, images, and embeds
- **Cluster manager** — list of clusters with their posts/reviews, drag & drop ordering
- **Deals manager** — CRUD with affiliate links, coupon codes, active/inactive toggle
- **Pages manager** — edit static pages (About, Privacy, Terms)
- **Subscribers view** — list with export to CSV for use in Resend
- **Media library** — upload via Convex file storage, browse with filename/type filtering
- **SEO preview** — live preview of title/description in Google-style snippet
- **Internal link suggester** — when writing a post, suggestions for internal links based on cluster membership and tags

---

## Public Site Features

- **SSR** for SEO on all public pages (using Convex `fetchQuery` in server components)
- **ClusterNav** on every post/review — "More in this series" navigation
- **LearningPath** on start-here pages — sequential steps with prev/next
- **RelatedContent** at bottom of every post/review — auto-scored + manual
- **Deals sidebar/banner** — affiliate CTAs on relevant pages
- **Responsive design** — mobile-first with Tailwind
- **Newsletter signup** — email capture via Convex mutation + Resend welcome email
- **Sitemap** — auto-generated from all published posts, reviews, and pages

### Search (deferred)
Full-text search is deferred to post-MVP. Convex does not have built-in full-text search, so this requires either a Convex text search index or an external search service (e.g., Algolia). For MVP, category filtering and the cluster navigation provide sufficient content discovery.

---

## Data Flow

```
Author writes post in Admin (Clerk auth)
  → Convex mutation saves to DB
  → Post gets clusterId + relatedPosts
  → Public site renders via SSR (Convex fetchQuery)
  → ClusterNav/RelatedContent are automatically generated from cluster data
  → Deals/affiliate links shown inline where relevant

Visitor reads article
  → SSR page via Vercel
  → ClusterNav shows siblings in cluster
  → LearningPath shows prev/next step (if start-here category)
  → RelatedContent shows auto-scored + manual related posts
  → Deals sidebar shows relevant affiliate offers
  → Newsletter CTA → Convex mutation + Resend welcome email

Visitor subscribes to newsletter
  → Convex mutation creates Subscriber document
  → Resend API sends welcome email
  → Admin can view/export subscribers
```

---

## Out of Scope (intentionally)

- Comments/community features
- Multi-language/i18n
- Video tutorials
- Free tools (theme detector, keyword generator, etc.)
- Training/courses section
- Own products
- Social login for visitors
- Full-text search (deferred to post-MVP)
- Sub-clusters / `parentClusterId` (add when cluster count warrants it)
- Content gap detection (add when enough content exists to analyze)
