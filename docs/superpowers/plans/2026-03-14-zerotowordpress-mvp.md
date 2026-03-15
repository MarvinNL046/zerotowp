# ZeroToWordPress MVP Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a WordPress tutorial niche authority site with blog, reviews, deals, start-here guides, and an admin CMS — all powered by Next.js, Convex, Clerk, and shadcn/ui.

**Architecture:** Monolith Next.js app with public SSR pages and a Clerk-protected admin panel. Convex serves as both database and CMS backend. Content is organized into topic authority clusters for SEO with contextual internal linking components.

**Tech Stack:** Next.js (App Router), Convex, Clerk, Tailwind CSS, shadcn/ui, Novel editor, Resend, Vercel

**Spec:** `docs/superpowers/specs/2026-03-14-zerotowordpress-mvp-design.md`

---

## File Structure

```
zerotowordpress/
├── app/
│   ├── layout.tsx                          # Root layout (ClerkProvider + ConvexProvider)
│   ├── globals.css                         # Tailwind globals
│   ├── (public)/
│   │   ├── layout.tsx                      # Public layout (header + footer)
│   │   ├── page.tsx                        # Homepage
│   │   ├── blog/
│   │   │   ├── page.tsx                    # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Individual post
│   │   ├── reviews/
│   │   │   ├── page.tsx                    # Reviews listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Individual review
│   │   ├── deals/
│   │   │   └── page.tsx                    # Deals listing
│   │   ├── start-here/
│   │   │   ├── page.tsx                    # Start-here hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # Guide step
│   │   └── category/
│   │       └── [slug]/
│   │           └── page.tsx                # Category filter
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx                  # Admin layout (sidebar nav)
│   │       ├── page.tsx                    # Dashboard
│   │       ├── posts/
│   │       │   ├── page.tsx                # Posts list
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx        # Post editor
│   │       ├── reviews/
│   │       │   ├── page.tsx                # Reviews list
│   │       │   └── [id]/
│   │       │       └── edit/
│   │       │           └── page.tsx        # Review editor
│   │       ├── deals/
│   │       │   └── page.tsx                # Deals manager
│   │       ├── pages/
│   │       │   └── page.tsx                # Pages manager
│   │       ├── clusters/
│   │       │   └── page.tsx                # Cluster overview
│   │       ├── subscribers/
│   │       │   └── page.tsx                # Subscribers view
│   │       └── media/
│   │           └── page.tsx                # Media library
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── page.tsx                    # Clerk sign-in page
│   │   └── sign-up/[[...sign-up]]/
│   │       └── page.tsx                    # Clerk sign-up page
│   ├── not-found.tsx                       # Custom 404 page
│   └── sitemap.ts                          # Dynamic sitemap
├── middleware.ts                            # Clerk middleware (protect /admin)
├── components/
│   ├── ui/                                 # shadcn/ui components (installed via CLI)
│   ├── layout/
│   │   ├── header.tsx                      # Public site header
│   │   ├── footer.tsx                      # Public site footer
│   │   ├── admin-sidebar.tsx               # Admin sidebar nav
│   │   └── newsletter-form.tsx             # Email signup form
│   ├── blog/
│   │   ├── post-card.tsx                   # Post preview card
│   │   ├── post-content.tsx                # Rich text renderer
│   │   └── category-filter.tsx             # Category filter tabs
│   ├── reviews/
│   │   ├── review-card.tsx                 # Review preview card
│   │   └── rating-display.tsx              # Star rating component
│   ├── deals/
│   │   ├── deal-card.tsx                   # Deal card with CTA
│   │   └── deals-sidebar.tsx               # Sidebar deals widget
│   ├── seo/
│   │   ├── cluster-nav.tsx                 # Contextual cluster navigation
│   │   ├── learning-path.tsx               # Sequential step navigation
│   │   └── related-content.tsx             # Auto-scored related posts
│   └── admin/
│       ├── post-form.tsx                   # Post create/edit form with Novel
│       ├── review-form.tsx                 # Review create/edit form
│       ├── deal-form.tsx                   # Deal create/edit form
│       ├── media-upload.tsx                # File upload component
│       └── seo-preview.tsx                 # Google snippet preview
├── convex/
│   ├── schema.ts                           # Full database schema
│   ├── posts.ts                            # Post queries & mutations
│   ├── reviews.ts                          # Review queries & mutations
│   ├── deals.ts                            # Deal queries & mutations
│   ├── pages.ts                            # Page queries & mutations
│   ├── clusters.ts                         # Cluster queries & mutations
│   ├── subscribers.ts                      # Subscriber mutations + Resend action
│   ├── media.ts                            # Media/file storage queries & mutations
│   ├── storage.ts                          # Storage URL helper queries
│   └── seed.ts                             # Seed data for development
├── lib/
│   ├── utils.ts                            # cn() helper and shared utilities
│   └── related-content-scorer.ts           # Scoring algorithm for RelatedContent
├── convex.json                             # Convex project config
├── .env.local                              # Environment variables (not committed)
└── package.json
```

---

## Chunk 1: Project Setup & Infrastructure

### Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`, `postcss.config.mjs`

- [ ] **Step 1: Create Next.js project**

Run:
```bash
cd /home/marvin/Projecten/zerotowordpress
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

When prompted, accept defaults. Use `--src-dir=false` to keep `app/` at root level.

- [ ] **Step 2: Verify it runs**

Run: `npm run dev`
Expected: Dev server starts on localhost:3000

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: initialize Next.js project with Tailwind"
```

---

### Task 2: Install and configure Convex

**Files:**
- Create: `convex/schema.ts`, `convex.json`
- Modify: `package.json`, `app/layout.tsx`

- [ ] **Step 1: Install Convex**

Run: `npm install convex`

- [ ] **Step 2: Initialize Convex project**

Run: `npx convex init`

This creates `convex/` directory and `convex.json`. It should also add `NEXT_PUBLIC_CONVEX_URL` to your `.env.local`. **Verify** that `.env.local` contains `NEXT_PUBLIC_CONVEX_URL=https://...convex.cloud` — if not, add it manually from the Convex dashboard.

- [ ] **Step 3: Create the full database schema**

Create `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(), // tutorials, beginners-guide, plugins, themes, hosting, start-here
    tags: v.array(v.string()),
    featuredImage: v.optional(v.id("_storage")),
    status: v.string(), // draft, published
    publishedAt: v.optional(v.number()),
    updatedAt: v.number(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
    clusterRole: v.optional(v.string()), // pillar, supporting, related
    learningPathOrder: v.optional(v.number()),
    relatedPosts: v.optional(v.array(v.id("posts"))),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_clusterId", ["clusterId"]),

  reviews: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    rating: v.number(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    affiliateLink: v.string(),
    affiliateLabel: v.string(),
    productName: v.string(),
    productImage: v.optional(v.id("_storage")),
    category: v.string(), // hosting, plugins, themes
    tags: v.array(v.string()),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    updatedAt: v.number(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_clusterId", ["clusterId"]),

  deals: defineTable({
    title: v.string(),
    description: v.string(),
    provider: v.string(),
    category: v.string(), // hosting, plugins, themes
    discountPercentage: v.number(),
    couponCode: v.optional(v.string()),
    affiliateLink: v.string(),
    logo: v.optional(v.id("_storage")),
    isActive: v.boolean(),
    expiresAt: v.optional(v.number()),
    sortOrder: v.number(),
  })
    .index("by_isActive", ["isActive"]),

  pages: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    status: v.string(),
  })
    .index("by_slug", ["slug"]),

  clusters: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.string(),
    pillarPostId: v.optional(v.id("posts")),
    sortOrder: v.number(),
  })
    .index("by_slug", ["slug"]),

  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
    source: v.string(),
  })
    .index("by_email", ["email"]),

  media: defineTable({
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    alt: v.string(),
    caption: v.optional(v.string()),
  }),
});
```

- [ ] **Step 4: Create ConvexClientProvider**

Create `components/convex-provider.tsx`:

```typescript
"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
```

- [ ] **Step 5: Update root layout to wrap with ConvexClientProvider**

Update `app/layout.tsx` to import and wrap children with `<ConvexClientProvider>`.

- [ ] **Step 6: Deploy schema to Convex dev**

Run: `npx convex dev`

Expected: Schema deploys successfully, generates types in `convex/_generated/`.

- [ ] **Step 7: Commit**

```bash
git add convex/ components/convex-provider.tsx app/layout.tsx package.json package-lock.json
git commit -m "feat: add Convex with full database schema"
```

---

### Task 3: Install and configure Clerk

**Files:**
- Create: `middleware.ts`
- Modify: `app/layout.tsx`, `package.json`

- [ ] **Step 1: Install Clerk**

Run: `npm install @clerk/nextjs`

- [ ] **Step 2: Add Clerk environment variables**

Add to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

(Get keys from Clerk dashboard after creating a project)

- [ ] **Step 3: Create middleware to protect admin routes**

Create `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
```

- [ ] **Step 4: Create Clerk sign-in and sign-up pages**

Create `app/(auth)/sign-in/[[...sign-in]]/page.tsx`:

```typescript
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
```

Create `app/(auth)/sign-up/[[...sign-up]]/page.tsx`:

```typescript
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp />
    </div>
  );
}
```

These pages are required because `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` points here. Without them, auth redirects would 404.

- [ ] **Step 5: Wrap root layout with ClerkProvider**

Update `app/layout.tsx`:

```typescript
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/convex-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add middleware.ts app/layout.tsx package.json package-lock.json
git commit -m "feat: add Clerk auth with admin route protection"
```

---

### Task 4: Install shadcn/ui and core components

**Files:**
- Create: `components/ui/*`, `lib/utils.ts`

- [ ] **Step 1: Initialize shadcn/ui**

Run: `npx shadcn@latest init`

Select: New York style, Zinc base color, CSS variables.

- [ ] **Step 2: Install essential components**

Run:
```bash
npx shadcn@latest add button card input textarea label select badge tabs dialog dropdown-menu separator sheet table toast avatar
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/ lib/utils.ts components.json tailwind.config.ts
git commit -m "feat: add shadcn/ui with core components"
```

---

### Task 5: Install Novel editor and Resend

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install Novel and Resend**

Run: `npm install novel resend`

- [ ] **Step 2: Add Resend environment variable**

Add to `.env.local`:
```
RESEND_API_KEY=re_...
```

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: add Novel editor and Resend dependencies"
```

---

## Chunk 2: Convex Backend (Queries & Mutations)

### Task 6: Posts queries and mutations

**Files:**
- Create: `convex/posts.ts`

- [ ] **Step 1: Create posts backend**

Create `convex/posts.ts`:

```typescript
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Public: list published posts, optionally filtered
export const listPublished = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("posts")
      .withIndex("by_status", (q) => q.eq("status", "published"));

    const posts = await q.order("desc").collect();

    let filtered = posts;
    if (args.category) {
      filtered = posts.filter((p) => p.category === args.category);
    }

    if (args.limit) {
      filtered = filtered.slice(0, args.limit);
    }

    return filtered;
  },
});

// Public: get single post by slug
export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Public: get posts by cluster
export const getByCluster = query({
  args: { clusterId: v.id("clusters") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", args.clusterId))
      .filter((q) => q.eq(q.field("status"), "published"))
      .collect();
  },
});

// Admin: list all posts (including drafts)
export const listAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("posts").order("desc").collect();
  },
});

// Admin: get single post by ID
export const getById = query({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Admin: create post
export const create = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    featuredImage: v.optional(v.id("_storage")),
    status: v.string(),
    author: v.string(),
    authorName: v.string(),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
    clusterRole: v.optional(v.string()),
    learningPathOrder: v.optional(v.number()),
    relatedPosts: v.optional(v.array(v.id("posts"))),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("posts", {
      ...args,
      publishedAt: args.status === "published" ? now : undefined,
      updatedAt: now,
    });
  },
});

// Admin: update post
export const update = mutation({
  args: {
    id: v.id("posts"),
    title: v.optional(v.string()),
    slug: v.optional(v.string()),
    excerpt: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    featuredImage: v.optional(v.id("_storage")),
    status: v.optional(v.string()),
    seoTitle: v.optional(v.string()),
    seoDescription: v.optional(v.string()),
    clusterId: v.optional(v.id("clusters")),
    clusterRole: v.optional(v.string()),
    learningPathOrder: v.optional(v.number()),
    relatedPosts: v.optional(v.array(v.id("posts"))),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Post not found");

    // Filter out undefined values to avoid unintentionally unsetting fields
    const updates: Record<string, unknown> = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v !== undefined)
    );
    updates.updatedAt = Date.now();

    // Set publishedAt on first publish
    if (fields.status === "published" && !existing.publishedAt) {
      updates.publishedAt = Date.now();
    }

    await ctx.db.patch(id, updates);
  },
});

// Admin: delete post
export const remove = mutation({
  args: { id: v.id("posts") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
```

- [ ] **Step 2: Run Convex dev to verify schema compiles**

Run: `npx convex dev`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add convex/posts.ts
git commit -m "feat: add posts queries and mutations"
```

---

### Task 7: Reviews queries and mutations

**Files:**
- Create: `convex/reviews.ts`

- [ ] **Step 1: Create reviews backend**

Create `convex/reviews.ts` following the same pattern as posts.ts but with review-specific fields (rating, pros, cons, affiliateLink, affiliateLabel, productName, productImage). **Must include all of these queries/mutations:** `listPublished` (required by sitemap and reviews listing), `getBySlug`, `getByCluster`, `listAll`, `getById`, `create`, `update` (with the same undefined-filtering pattern as posts), `remove`.

**Important:** The `update` mutation must filter out undefined values before calling `db.patch`, same as the posts `update` mutation. Copy that pattern.

- [ ] **Step 2: Verify with Convex dev**

Run: `npx convex dev`

- [ ] **Step 3: Commit**

```bash
git add convex/reviews.ts
git commit -m "feat: add reviews queries and mutations"
```

---

### Task 8: Deals, Pages, Clusters, Subscribers, Media backends

**Files:**
- Create: `convex/deals.ts`, `convex/pages.ts`, `convex/clusters.ts`, `convex/subscribers.ts`, `convex/media.ts`

- [ ] **Step 1: Create deals.ts**

Queries: `listActive` (filtered by isActive, ordered by sortOrder), `listAll`, `getById`.
Mutations: `create`, `update`, `remove`.

- [ ] **Step 2: Create pages.ts**

Queries: `getBySlug`, `listAll`.
Mutations: `create`, `update`, `remove`.

- [ ] **Step 3: Create clusters.ts**

Queries: `list` (ordered by sortOrder), `getBySlug`, `getById`, `getWithContent` (returns cluster + its posts + reviews).
Mutations: `create`, `update`, `remove`.

The `getWithContent` query is important — it fetches a cluster and all posts/reviews belonging to it:

```typescript
export const getWithContent = query({
  args: { id: v.id("clusters") },
  handler: async (ctx, args) => {
    const cluster = await ctx.db.get(args.id);
    if (!cluster) return null;

    const posts = await ctx.db
      .query("posts")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", args.id))
      .collect();

    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_clusterId", (q) => q.eq("clusterId", args.id))
      .collect();

    return { ...cluster, posts, reviews };
  },
});
```

- [ ] **Step 4: Create subscribers.ts**

Queries: `list`.
Mutations: `subscribe` (with duplicate email check), `remove`.
Actions: `subscribeAndEmail` (calls subscribe mutation + sends welcome email via Resend).

**Important:** Convex mutations cannot make external HTTP calls. Sending email via Resend requires a Convex `action` (which can perform side effects). The flow is: action calls mutation to save subscriber, then calls Resend API.

```typescript
import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { api } from "./_generated/api";

export const subscribe = mutation({
  args: {
    email: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) return { id: existing._id, isNew: false };

    const id = await ctx.db.insert("subscribers", {
      email: args.email,
      subscribedAt: Date.now(),
      source: args.source,
    });
    return { id, isNew: true };
  },
});

// Action: can make external HTTP calls (Resend)
export const subscribeAndEmail = action({
  args: {
    email: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.runMutation(api.subscribers.subscribe, args);

    if (result.isNew) {
      // Send welcome email via Resend
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ZeroToWordPress <hello@zerotowordpress.com>",
          to: args.email,
          subject: "Welcome to ZeroToWordPress! 🚀",
          html: "<h1>Welcome!</h1><p>Thanks for subscribing. We'll help you build your first WordPress site.</p>",
        }),
      });
    }

    return result;
  },
});
```

**Note:** The newsletter form component (Task 14) should call `subscribeAndEmail` action (not the `subscribe` mutation) to trigger the welcome email.

- [ ] **Step 5: Create media.ts and storage.ts**

Create `convex/media.ts`:

Queries: `list` (returns all media with serving URLs).
Mutations: `generateUploadUrl` (using `ctx.storage.generateUploadUrl()`), `saveMedia`, `remove` (also deletes from storage).

```typescript
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const saveMedia = mutation({
  args: {
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    alt: v.string(),
    caption: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("media", args);
  },
});

export const list = query({
  handler: async (ctx) => {
    const media = await ctx.db.query("media").order("desc").collect();
    return Promise.all(
      media.map(async (m) => ({
        ...m,
        url: await ctx.storage.getUrl(m.storageId),
      }))
    );
  },
});
```

Create `convex/storage.ts` — helper query to convert storage IDs to serving URLs. Used by all public pages that display images (featured images, product images, deal logos):

```typescript
import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
```

**Important:** All public pages displaying images from Convex storage (PostCard, ReviewCard, DealCard, etc.) must either:
- Fetch the URL server-side via `fetchQuery(api.storage.getUrl, { storageId })`, or
- Use `useQuery(api.storage.getUrl, { storageId })` in client components.
The `storageId` alone is NOT a displayable URL.

- [ ] **Step 6: Verify all with Convex dev**

Run: `npx convex dev`

- [ ] **Step 7: Commit**

```bash
git add convex/deals.ts convex/pages.ts convex/clusters.ts convex/subscribers.ts convex/media.ts
git commit -m "feat: add deals, pages, clusters, subscribers, media backends"
```

---

## Chunk 3: Admin Panel

### Task 9: Admin layout and dashboard

**Files:**
- Create: `app/(admin)/admin/layout.tsx`, `app/(admin)/admin/page.tsx`, `components/layout/admin-sidebar.tsx`

- [ ] **Step 1: Create admin sidebar**

Create `components/layout/admin-sidebar.tsx` — a vertical sidebar with links to all admin sections: Dashboard, Posts, Reviews, Deals, Pages, Clusters, Subscribers, Media. Use shadcn/ui `Button` variant="ghost" for nav items. Include Clerk `<UserButton />` at bottom.

- [ ] **Step 2: Create admin layout**

Create `app/(admin)/admin/layout.tsx` — wraps children with the admin sidebar. Uses a flex layout: sidebar (fixed 240px) + main content area with padding.

- [ ] **Step 3: Create admin dashboard**

Create `app/(admin)/admin/page.tsx` — shows counts of posts, reviews, deals, subscribers using `useQuery` from Convex. Simple stat cards using shadcn/ui `Card`.

- [ ] **Step 4: Verify admin routes are protected**

Navigate to `/admin` while logged out → should redirect to Clerk sign-in.
Navigate to `/admin` while logged in → should show dashboard.

- [ ] **Step 5: Commit**

```bash
git add app/\(admin\)/ components/layout/admin-sidebar.tsx
git commit -m "feat: add admin layout with sidebar and dashboard"
```

---

### Task 10: Post editor (admin)

**Files:**
- Create: `app/(admin)/admin/posts/page.tsx`, `app/(admin)/admin/posts/[id]/edit/page.tsx`, `components/admin/post-form.tsx`, `components/admin/seo-preview.tsx`

- [ ] **Step 1: Create SEO preview component**

Create `components/admin/seo-preview.tsx` — renders a Google-style search result preview showing the title (or seoTitle override), URL, and description (or seoDescription override). Accepts `title`, `slug`, `description`, `seoTitle?`, `seoDescription?` as props.

- [ ] **Step 2: Create post form component**

Create `components/admin/post-form.tsx` — the main post editor form. Uses:
- shadcn/ui `Input` for title, slug (auto-generated from title)
- shadcn/ui `Select` for category and status
- shadcn/ui `Input` for tags (comma-separated)
- Novel editor for content (rich text)
- `Select` for cluster assignment and cluster role
- `Input` for learningPathOrder (number, shown only when category is "start-here")
- `SeoPreview` component at the bottom
- Optional seoTitle/seoDescription override inputs
- Save button calling Convex `posts.create` or `posts.update` mutation

Slug auto-generation: lowercase the title, replace spaces with hyphens, remove special characters.

- [ ] **Step 3: Create posts list page**

Create `app/(admin)/admin/posts/page.tsx` — table of all posts (title, category, status, date) with a "New Post" button. Uses `useQuery(api.posts.listAll)`. Each row links to the edit page. Include a delete button with confirmation dialog.

- [ ] **Step 4: Create post edit page**

Create `app/(admin)/admin/posts/[id]/edit/page.tsx` — wraps `PostForm` with the post data loaded by ID. For new posts, use a special `/admin/posts/new/edit` route with empty form (check if `id === "new"`).

- [ ] **Step 5: Test creating and editing a post**

Manually test: create a post via admin, verify it appears in the list, edit it, change status to published.

- [ ] **Step 6: Commit**

```bash
git add app/\(admin\)/admin/posts/ components/admin/post-form.tsx components/admin/seo-preview.tsx
git commit -m "feat: add post editor with Novel, SEO preview"
```

---

### Task 11: Review editor (admin)

**Files:**
- Create: `app/(admin)/admin/reviews/page.tsx`, `app/(admin)/admin/reviews/[id]/edit/page.tsx`, `components/admin/review-form.tsx`

- [ ] **Step 1: Create review form component**

Create `components/admin/review-form.tsx` — similar to post form but with review-specific fields: rating (1-5 number input), pros (dynamic list of inputs, add/remove), cons (same), productName, affiliateLink, affiliateLabel. Uses Novel for content body. Includes SEO preview.

- [ ] **Step 2: Create reviews list and edit pages**

Same pattern as posts: list page with table + "New Review" button, edit page wrapping ReviewForm.

- [ ] **Step 3: Commit**

```bash
git add app/\(admin\)/admin/reviews/ components/admin/review-form.tsx
git commit -m "feat: add review editor with rating, pros/cons"
```

---

### Task 12: Deals manager (admin)

**Files:**
- Create: `app/(admin)/admin/deals/page.tsx`, `components/admin/deal-form.tsx`

- [ ] **Step 1: Create deal form component**

Create `components/admin/deal-form.tsx` — inline form within a dialog. Fields: title, provider, category, discountPercentage, couponCode, affiliateLink, isActive toggle, expiresAt date picker, sortOrder.

- [ ] **Step 2: Create deals list page**

Create `app/(admin)/admin/deals/page.tsx` — table of all deals with inline editing. "New Deal" button opens dialog with DealForm. Each row has edit/delete actions. Drag-and-drop reordering for sortOrder (or simple number input for MVP).

- [ ] **Step 3: Commit**

```bash
git add app/\(admin\)/admin/deals/ components/admin/deal-form.tsx
git commit -m "feat: add deals manager"
```

---

### Task 13: Pages, Clusters, Subscribers, Media admin pages

**Files:**
- Create: `app/(admin)/admin/pages/page.tsx`, `app/(admin)/admin/clusters/page.tsx`, `app/(admin)/admin/subscribers/page.tsx`, `app/(admin)/admin/media/page.tsx`, `components/admin/media-upload.tsx`

- [ ] **Step 1: Create pages manager**

Simple list + editor for static pages (About, Privacy, Terms). Uses Novel for content editing.

- [ ] **Step 2: Create cluster overview**

List of clusters showing name, pillar post, and count of supporting posts/reviews. "New Cluster" dialog. Edit cluster to set pillar post (select from published posts). Shows all content in each cluster.

- [ ] **Step 3: Create subscribers view**

Table of subscribers (email, date, source). "Export CSV" button that generates and downloads a CSV file.

- [ ] **Step 4: Create media library**

Create `components/admin/media-upload.tsx` — uses Convex file upload flow: call `generateUploadUrl`, POST file to the URL, save metadata with `saveMedia` mutation.

Create `app/(admin)/admin/media/page.tsx` — grid of uploaded images with alt text. Upload button opens file picker. Click image to copy URL or edit alt text.

- [ ] **Step 5: Commit**

```bash
git add app/\(admin\)/admin/pages/ app/\(admin\)/admin/clusters/ app/\(admin\)/admin/subscribers/ app/\(admin\)/admin/media/ components/admin/media-upload.tsx
git commit -m "feat: add pages, clusters, subscribers, media admin"
```

---

## Chunk 4: Public Site Layout & Homepage

### Task 14: Public layout (header + footer)

**Files:**
- Create: `components/layout/header.tsx`, `components/layout/footer.tsx`, `app/(public)/layout.tsx`

- [ ] **Step 1: Create header component**

Create `components/layout/header.tsx` — sticky top nav with:
- Logo: "🚀 ZeroToWordPress" (orange accent on "ZeroTo")
- Nav links: Tutorials, Reviews, Deals, Start Here (orange CTA button)
- Mobile: hamburger menu using shadcn/ui `Sheet`

Style: white background, warm orange (#f97316) accent, border-bottom, friendly & bright.

- [ ] **Step 2: Create footer component**

Create `components/layout/footer.tsx` — footer with:
- Column 1: Logo + tagline "Helping beginners build their first WordPress site"
- Column 2: Quick links (Blog, Reviews, Deals, Start Here)
- Column 3: Categories (Tutorials, Plugins, Themes, Hosting)
- Column 4: Newsletter signup form
- Bottom bar: © 2026 ZeroToWordPress

- [ ] **Step 3: Create newsletter form component**

Create `components/layout/newsletter-form.tsx` — `"use client"` component with email input + subscribe button. Calls `subscribers.subscribeAndEmail` **action** (not the mutation directly) via `useAction` from `convex/react`. Shows success toast. Accepts `source` prop for tracking.

- [ ] **Step 4: Create public layout**

Create `app/(public)/layout.tsx` — wraps children with Header + main + Footer.

- [ ] **Step 5: Commit**

```bash
git add components/layout/ app/\(public\)/layout.tsx
git commit -m "feat: add public layout with header, footer, newsletter"
```

---

### Task 15: Homepage

**Files:**
- Create: `app/(public)/page.tsx`

- [ ] **Step 1: Create PostCard component**

Create `components/blog/post-card.tsx` — card showing featured image (or placeholder gradient), category badge, title, excerpt (truncated), date. Links to `/blog/[slug]`. For featured images from Convex storage, resolve the URL server-side and pass as a prop, or use a placeholder gradient if no image.

- [ ] **Step 2: Create DealCard component**

Create `components/deals/deal-card.tsx` — card showing provider logo (or name), discount percentage badge, title, coupon code (if any), orange CTA button "Get Deal →" linking to affiliate URL.

- [ ] **Step 3: Create homepage**

Create `app/(public)/page.tsx` — server component using `fetchQuery` from `convex/nextjs`.

Sections:
1. **Hero**: "👋 New to WordPress?" headline, subtext, orange CTA "Start Your Journey →" linking to /start-here
2. **Latest Posts**: Grid of 6 latest published posts using `PostCard` component
3. **Featured Deals**: 3 active deals in a horizontal row using `DealCard` component
4. **Category Quick Links**: Cards for each category (Tutorials, Plugins, Themes, Hosting) with emoji icons

Uses `fetchQuery(api.posts.listPublished, { limit: 6 })` and `fetchQuery(api.deals.listActive, { limit: 3 })`.

For any posts/deals with storage-based images, resolve URLs via `fetchQuery(api.storage.getUrl, { storageId })` in the server component before passing to child components.

- [ ] **Step 4: Commit**

```bash
git add app/\(public\)/page.tsx components/blog/post-card.tsx components/deals/deal-card.tsx
git commit -m "feat: add homepage with hero, latest posts, deals"
```

---

## Chunk 5: Public Content Pages

### Task 16: Blog listing and post pages

**Files:**
- Create: `app/(public)/blog/page.tsx`, `app/(public)/blog/[slug]/page.tsx`, `components/blog/post-content.tsx`, `components/blog/category-filter.tsx`

- [ ] **Step 1: Create category filter component**

Create `components/blog/category-filter.tsx` — horizontal row of category tabs (All, Tutorials, Beginner's Guide, Plugins, Themes, Hosting). Uses shadcn/ui `Tabs` or styled links. Filters posts by category.

- [ ] **Step 2: Create blog listing page**

Create `app/(public)/blog/page.tsx` — SSR page using `fetchQuery`. Shows CategoryFilter at top, then grid of PostCards. Supports `?category=` query param for filtering.

Generate metadata: title "Blog — ZeroToWordPress", description.

- [ ] **Step 3: Create post content renderer**

Create `components/blog/post-content.tsx` — renders HTML content safely. Uses `dangerouslySetInnerHTML` with appropriate Tailwind prose classes (`prose prose-lg`).

**Important — Novel editor content format:** Novel's default output is ProseMirror JSON, not HTML. When saving content in the post form (Task 10), use Novel's `onUpdate` callback which provides both JSON and HTML. Store the **HTML** version in the `content` field so it can be rendered directly. Alternatively, use Novel's built-in HTML serializer: `import { generateHTML } from "@tiptap/html"`. The post form should handle this conversion on save.

- [ ] **Step 4: Create individual post page**

Create `app/(public)/blog/[slug]/page.tsx` — SSR page using `fetchQuery(api.posts.getBySlug)`.

Layout:
- Title, category badge, author, date
- Featured image
- Content (via PostContent component)
- ClusterNav (placeholder for now — just a div)
- RelatedContent (placeholder for now)
- Deals sidebar (right column on desktop, below on mobile)

Generate dynamic metadata from post title + seoTitle/seoDescription overrides.

**Canonical URL handling:** For posts with `category: "start-here"`, the canonical URL is `/start-here/[slug]` (not `/blog/[slug]`). Add `alternates: { canonical: ... }` to the metadata:
```typescript
alternates: {
  canonical: post.category === "start-here"
    ? `https://zerotowordpress.com/start-here/${post.slug}`
    : `https://zerotowordpress.com/blog/${post.slug}`,
},
```

**404 handling:** If `fetchQuery` returns `null` (slug not found), call `notFound()` from `next/navigation`.

Use `generateStaticParams` to pre-render all published post slugs.

- [ ] **Step 5: Create deals sidebar component**

Create `components/deals/deals-sidebar.tsx` — vertical stack of 3 compact deal cards. Fetches active deals. Shown on blog post pages.

- [ ] **Step 6: Commit**

```bash
git add app/\(public\)/blog/ components/blog/ components/deals/deals-sidebar.tsx
git commit -m "feat: add blog listing and post pages with deals sidebar"
```

---

### Task 17: Reviews pages

**Files:**
- Create: `app/(public)/reviews/page.tsx`, `app/(public)/reviews/[slug]/page.tsx`, `components/reviews/review-card.tsx`, `components/reviews/rating-display.tsx`

- [ ] **Step 1: Create rating display component**

Create `components/reviews/rating-display.tsx` — renders 1-5 star rating with filled/empty stars. Accepts `rating: number` prop. Uses orange color (#f97316) for filled stars.

- [ ] **Step 2: Create review card component**

Create `components/reviews/review-card.tsx` — card showing product image, product name, rating stars, excerpt, category badge. Links to `/reviews/[slug]`.

- [ ] **Step 3: Create reviews listing page**

Create `app/(public)/reviews/page.tsx` — SSR page. Category filter (Hosting, Plugins, Themes) + grid of ReviewCards.

- [ ] **Step 4: Create individual review page**

Create `app/(public)/reviews/[slug]/page.tsx` — SSR page showing:
- Product name + image
- Rating (large, prominent)
- Pros/Cons in green/red lists
- Full review content
- Affiliate CTA box: "Get [productName]" button + coupon code (if available)
- ClusterNav placeholder
- RelatedContent placeholder

- [ ] **Step 5: Commit**

```bash
git add app/\(public\)/reviews/ components/reviews/
git commit -m "feat: add reviews listing and detail pages"
```

---

### Task 18: Deals page

**Files:**
- Create: `app/(public)/deals/page.tsx`

- [ ] **Step 1: Create deals listing page**

Create `app/(public)/deals/page.tsx` — SSR page showing all active deals. Grid of large DealCards grouped by category. Each card shows:
- Provider logo/name
- Discount percentage (big, bold)
- Description
- Coupon code (copyable)
- "Get This Deal →" CTA button (affiliate link, target="_blank", rel="noopener nofollow")

- [ ] **Step 2: Commit**

```bash
git add app/\(public\)/deals/
git commit -m "feat: add deals listing page"
```

---

### Task 19: Start Here pages

**Files:**
- Create: `app/(public)/start-here/page.tsx`, `app/(public)/start-here/[slug]/page.tsx`

- [ ] **Step 1: Create Start Here hub page**

Create `app/(public)/start-here/page.tsx` — the pillar page. Shows:
- Hero: "🚀 Start Your WordPress Journey" + description
- Numbered list of guide steps (fetched from posts with `category: "start-here"`, ordered by `learningPathOrder`)
- Each step shows: number, title, excerpt, "Read Guide →" link

Uses `fetchQuery(api.posts.listPublished, { category: "start-here" })`, then sorts by `learningPathOrder`.

- [ ] **Step 2: Create individual guide step page**

Create `app/(public)/start-here/[slug]/page.tsx` — same as blog post page but includes LearningPath component (placeholder for now) showing prev/next steps.

- [ ] **Step 3: Commit**

```bash
git add app/\(public\)/start-here/
git commit -m "feat: add start-here hub and guide step pages"
```

---

### Task 20: Category pages

**Files:**
- Create: `app/(public)/category/[slug]/page.tsx`

- [ ] **Step 1: Create category page**

Create `app/(public)/category/[slug]/page.tsx` — SSR page using `fetchQuery(api.posts.listPublished, { category: slug })`. Shows category name as heading + grid of PostCards. Dynamic metadata with category name.

- [ ] **Step 2: Commit**

```bash
git add app/\(public\)/category/
git commit -m "feat: add category filter pages"
```

---

## Chunk 6: SEO & Cluster Components

### Task 21: ClusterNav component

**Files:**
- Create: `components/seo/cluster-nav.tsx`

- [ ] **Step 1: Create ClusterNav component**

Create `components/seo/cluster-nav.tsx` — a **`"use client"` component** that displays "More in this series" navigation for posts/reviews within the same cluster.

Props: `clusterId: Id<"clusters">`, `currentSlug: string`, `contentType: "post" | "review"`

Uses `useQuery(api.clusters.getWithContent, { id: clusterId })`. This must be a client component because the parent page is a server component using `fetchQuery`, and `useQuery` is a React hook that only works in client components. The trade-off is that ClusterNav renders client-side (not SSR'd), but the navigation links are still crawlable because search engines execute JavaScript.

Renders:
- Section title: "📚 More in this series"
- Link to pillar post: "← [Pillar Title] (Main Guide)"
- List of sibling posts/reviews in the cluster (highlighting current, linking others)
- Styled with soft orange background, rounded corners, consistent with Friendly & Bright theme

- [ ] **Step 2: Wire ClusterNav into blog post and review pages**

Update `app/(public)/blog/[slug]/page.tsx` and `app/(public)/reviews/[slug]/page.tsx` — replace placeholder divs with `<ClusterNav>` when the post/review has a `clusterId`.

- [ ] **Step 3: Commit**

```bash
git add components/seo/cluster-nav.tsx app/\(public\)/blog/\[slug\]/ app/\(public\)/reviews/\[slug\]/
git commit -m "feat: add ClusterNav contextual navigation"
```

---

### Task 22: LearningPath component

**Files:**
- Create: `components/seo/learning-path.tsx`

- [ ] **Step 1: Create LearningPath component**

Create `components/seo/learning-path.tsx` — a **`"use client"` component** for sequential step navigation for start-here content.

Props: `clusterId: Id<"clusters">`, `currentSlug: string`

Uses `useQuery(api.posts.getByCluster, { clusterId })` then filters for `category: "start-here"` and sorts by `learningPathOrder`. Client component for the same reason as ClusterNav.

Renders:
- Numbered steps: "Step 1 → Step 2 → **Step 3 (current)** → Step 4"
- Each step is a link except current (bold/highlighted)
- Prev/Next buttons at the bottom: "← Previous: [title]" / "Next: [title] →"
- Styled as a horizontal progress bar with orange highlighting

- [ ] **Step 2: Wire LearningPath into start-here pages**

Update `app/(public)/start-here/[slug]/page.tsx` — add LearningPath above and below content.

- [ ] **Step 3: Commit**

```bash
git add components/seo/learning-path.tsx app/\(public\)/start-here/\[slug\]/
git commit -m "feat: add LearningPath sequential navigation"
```

---

### Task 23: RelatedContent component

**Files:**
- Create: `components/seo/related-content.tsx`, `lib/related-content-scorer.ts`

- [ ] **Step 1: Create scoring algorithm**

Create `lib/related-content-scorer.ts`:

```typescript
type ScoredItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  type: "post" | "review";
  url: string;
  score: number;
};

type ContentItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  clusterId?: string;
  category: string;
  tags: string[];
};

export function scoreRelatedContent(
  current: ContentItem,
  candidates: ContentItem[],
  manualRelated: string[], // IDs of manually linked posts
  maxResults: number = 4,
): ScoredItem[] {
  return candidates
    .filter((c) => c._id !== current._id)
    .map((candidate) => {
      let score = 0;

      // Manual related: highest priority
      if (manualRelated.includes(candidate._id)) score += 100;

      // Same cluster: high score
      if (current.clusterId && candidate.clusterId === current.clusterId) score += 50;

      // Same category: medium score
      if (candidate.category === current.category) score += 20;

      // Tag overlap: 10 points per shared tag
      const sharedTags = candidate.tags.filter((t) => current.tags.includes(t));
      score += sharedTags.length * 10;

      return {
        id: candidate._id,
        slug: candidate.slug,
        title: candidate.title,
        excerpt: candidate.excerpt,
        type: "post" as const, // caller sets this
        url: `/blog/${candidate.slug}`,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
```

- [ ] **Step 2: Create RelatedContent component**

Create `components/seo/related-content.tsx` — fetches all published posts, scores them, and displays top 4 as cards.

Props: `currentPost`, `allPosts`, `allReviews`

Renders:
- Section title: "📖 You might also like"
- Grid of 4 related post/review cards (compact: title + excerpt + category badge)
- Links to `/blog/[slug]` or `/reviews/[slug]`

- [ ] **Step 3: Wire RelatedContent into post and review pages**

Update blog post and review pages to pass required data and render RelatedContent.

- [ ] **Step 4: Commit**

```bash
git add components/seo/related-content.tsx lib/related-content-scorer.ts app/\(public\)/blog/\[slug\]/ app/\(public\)/reviews/\[slug\]/
git commit -m "feat: add RelatedContent with scoring algorithm"
```

---

### Task 24: Sitemap and SEO metadata

**Files:**
- Create: `app/sitemap.ts`

- [ ] **Step 1: Create dynamic sitemap**

Create `app/sitemap.ts`:

```typescript
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zerotowordpress.com";

  const [posts, reviews] = await Promise.all([
    fetchQuery(api.posts.listPublished, {}),
    fetchQuery(api.reviews.listPublished, {}),
  ]);

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/start-here`, lastModified: new Date(), priority: 0.9 },
  ];

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    priority: post.clusterRole === "pillar" ? 0.9 : 0.7,
  }));

  const reviewPages = reviews.map((review) => ({
    url: `${baseUrl}/reviews/${review.slug}`,
    lastModified: new Date(review.updatedAt),
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...reviewPages];
}
```

- [ ] **Step 2: Create custom 404 page**

Create `app/not-found.tsx`:

```typescript
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Page not found. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/" className="rounded-lg bg-orange-500 px-6 py-3 text-white hover:bg-orange-600">
          Go Home
        </Link>
        <Link href="/start-here" className="rounded-lg border px-6 py-3 hover:bg-muted">
          Start Here
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts app/not-found.tsx
git commit -m "feat: add dynamic sitemap and 404 page"
```

---

## Chunk 7: Seed Data & Final Polish

### Task 25: Seed data for development

**Files:**
- Create: `convex/seed.ts`

- [ ] **Step 1: Create seed script**

Create `convex/seed.ts` — a Convex mutation that populates the database with sample content:
- 2 clusters: "Getting Started", "WordPress Hosting"
- 4 posts: pillar + 2 supporting for Getting Started, 1 for Hosting
- 2 reviews: Bluehost, SiteGround
- 3 deals: Bluehost, SiteGround, WP Engine
- Set up cluster relationships and relatedPosts links

This is a Convex `internalMutation` that can be run from the Convex dashboard.

- [ ] **Step 2: Run seed**

Run seed from Convex dashboard or via: `npx convex run seed:seed`

- [ ] **Step 3: Commit**

```bash
git add convex/seed.ts
git commit -m "feat: add seed data for development"
```

---

### Task 26: Environment setup documentation

**Files:**
- Create: `.env.example`

- [ ] **Step 1: Create .env.example**

Create `.env.example` with all required environment variables (without actual values):

```
# Convex
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOY_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Resend
RESEND_API_KEY=
```

- [ ] **Step 2: Update .gitignore**

Ensure `.env.local` is in `.gitignore` (Next.js default includes it).

- [ ] **Step 3: Commit**

```bash
git add .env.example .gitignore
git commit -m "feat: add environment variable template"
```

---

### Task 27: Verify full flow end-to-end

- [ ] **Step 1: Start dev servers**

Run `npx convex dev` in one terminal and `npm run dev` in another.

- [ ] **Step 2: Test admin flow**

1. Sign in via Clerk
2. Create a cluster "Getting Started"
3. Create a pillar post with `category: "start-here"`, assign to cluster
4. Create 2 supporting posts, assign to same cluster
5. Create a review
6. Create a deal
7. Upload media

- [ ] **Step 3: Test public flow**

1. Homepage shows latest posts and deals
2. Blog listing shows posts with category filter
3. Individual post shows content, ClusterNav, RelatedContent
4. Reviews listing and detail pages work
5. Deals page shows active deals
6. Start Here hub shows guide steps in order
7. Start Here individual pages show LearningPath
8. Newsletter signup works
9. Sitemap generates correctly at /sitemap.xml

- [ ] **Step 4: Fix any issues found**

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: resolve issues found in end-to-end testing"
```
