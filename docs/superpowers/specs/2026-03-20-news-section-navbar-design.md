# News Section + Navbar Consolidation

> **Status:** Approved
> **Date:** 2026-03-20

## Goal

Add a dedicated `/news` page for WordPress news articles and consolidate the navbar from 7+ flat links into a cleaner structure with dropdown menus.

## Architecture

### Navbar (New)

```
News | Blog | WordPress ▾ | Resources ▾ | [Start Here →]
```

- **News** → `/news` (direct link)
- **Blog** → `/blog` (direct link)
- **WordPress ▾** → simple dropdown with links:
  - Hosting → `/wordpress-hosting`
  - Plugins → `/wordpress-plugins`
  - Themes → `/wordpress-themes`
  - SEO → `/wordpress-seo`
  - Speed → `/wordpress-speed`
  - Security → `/wordpress-security`
- **Resources ▾** → simple dropdown with links:
  - Tutorials → `/tutorials`
  - Glossary → `/glossary`
  - Reviews → `/reviews`
  - Tools → `/tools`
- **Start Here →** → `/start-here` (always visible, orange CTA button)

Desktop: horizontal bar, dropdowns on hover/click.
Mobile: hamburger menu with same grouping (collapsible sections).

### Dropdown Design

Simple list — no icons, no featured articles, no multi-column grid. Each item is:
- Link text (bold)
- Optional one-line description (text-sm text-slate-500)

Dropdown styling: white bg, rounded-xl, shadow-lg, border border-slate-200, max-width ~240px.

### `/news` Page

- Route: `app/(public)/news/page.tsx`
- Data: `posts.listPublished({ category: "news" })`
- Layout: hero section + PostCard grid (same pattern as `/blog`)
- SEO: title "WordPress News — Latest Updates & Releases | ZeroToWP"
- Individual articles: rendered by existing `[slug]/page.tsx` catch-all

### News Articles

- Stored in existing `posts` table with `category: "news"`
- Created via existing `posts:create` mutation
- Content structure: headline, byline, featured image, article body with H2 sections, sources section at bottom
- No schema changes needed

## Files to Create/Modify

### Create
- `app/(public)/news/page.tsx` — News listing page

### Modify
- `components/layout/header.tsx` — Replace flat nav with dropdown menus
- `components/layout/mobile-nav.tsx` — Update mobile nav with grouped structure
- `app/sitemap.ts` — Add `/news` to static pages

## Constraints

- No new Convex tables or schema changes
- No new dependencies (dropdowns built with CSS/Tailwind + minimal JS)
- Keep PageSpeed 99 mobile — no heavy dropdown libraries
- Dropdowns must be accessible (keyboard navigation, proper ARIA)
- Mobile menu must work with React Portal (existing pattern)

## Success Criteria

- `/news` page renders with news articles (or empty state)
- Navbar shows 4 items + Start Here button on desktop
- Dropdown menus open/close smoothly
- All existing links remain accessible
- Mobile menu reflects same structure
- Build passes, no regressions
