# ZeroToWP Public Homepage Refresh Design

## Goal

Refresh the public marketing layer of `zerotowordpress` so the homepage and shared design system feel like a higher-converting affiliate/tutorial hub, while keeping the existing content architecture, Convex-backed data flows, public route structure, ads, and admin/auth systems intact.

## In Scope

- Redesign the public homepage at `app/(public)/page.tsx`.
- Refresh shared public-facing design tokens and visual system in `app/globals.css`.
- Update shared public shell components where necessary to support the new visual direction:
  - `components/layout/header.tsx`
  - `components/layout/footer.tsx`
  - `components/layout/newsletter-form.tsx`
  - optionally small supporting UI components directly involved in the homepage presentation
- Keep current homepage content sources:
  - published posts from Convex
  - published reviews from Convex
  - existing topic clusters and popular guide link structure
  - existing ad component usage

## Out of Scope

- No rebuild of article templates, review pages, admin pages, auth flows, or Convex schema.
- No change to public URL structure.
- No replacement of analytics, ads, or consent systems.
- No broad redesign of all content templates in this phase.

## Product Direction

The site should feel like a strong WordPress education and conversion hub, not a generic blog. The visual emphasis should be:

- higher trust
- clearer tutorial entry points
- stronger purchase/comparison intent
- better “start here” guidance for beginners
- more deliberate affiliate-style CTA hierarchy without becoming spammy

This means the page should help users quickly choose what to do next:

- start learning WordPress
- compare hosting
- find plugins/themes
- fix SEO, speed, or security issues
- explore the latest articles and reviews

## Visual Direction

- Tone: practical, authoritative, conversion-focused
- Style: modern, clean, high-clarity, slightly more energetic than the current site
- Visual language:
  - sharper section rhythm
  - more premium card surfaces
  - stronger CTA contrast
  - clearer hierarchy in hero and topic clusters
  - more intentional accent color usage
- Maintain scanability first; avoid heavy ornamental design that weakens reading flow

## Homepage Structure

The refreshed homepage should preserve the site’s current content intent, but reorganize the presentation into a stronger funnel:

1. Hero
   - Strong authority-led headline
   - Clear beginner value proposition
   - Primary CTA to start learning
   - Secondary CTA to compare hosting or explore best content
   - Supporting proof such as article/tutorial count or “trusted by beginners” style microcopy

2. Guided entry section
   - Strong “Where do you want to start?” framing
   - Topic cards for existing clusters
   - Better grouping and visual clarity for beginner intent

3. Popular guides
   - Elevated presentation
   - Faster scanning
   - Better click incentives

4. Monetization-aware content block
   - Keep ad placement, but integrate it more naturally in the page flow

5. Latest articles
   - Reuse existing published post query
   - Keep content freshness visible

6. Reviews or buyer-intent section
   - Reuse current reviews query if suitable
   - Frame around purchase/comparison decisions

7. Newsletter / recurring engagement
   - Make newsletter capture feel intentional and useful
   - Stronger reason to subscribe

8. Footer
   - Preserve navigational usefulness
   - Improve visual consistency with the new homepage

## Architecture

- Keep the existing App Router structure unchanged.
- Keep `app/(public)/layout.tsx` as the public wrapper, but allow styling adjustments through shared header/footer components.
- Keep server rendering for homepage data fetching via existing Convex queries.
- Prefer CSS-first visual changes and server components where possible.
- Use client behavior only where already required or where a small enhancement materially improves UX.

## Component Strategy

Where possible, keep component boundaries stable and update styling/markup in place rather than introducing broad new abstractions.

Likely touch points:

- `app/(public)/page.tsx`
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- `components/layout/newsletter-form.tsx`
- `components/blog/post-card.tsx` only if homepage card presentation needs small visual support changes that remain compatible elsewhere
- `components/reviews/review-card.tsx` only if homepage review presentation needs minor styling support

If a homepage-only visual wrapper is needed, create focused home-specific components instead of overloading global shared components.

## SEO and Content Safety

- Preserve existing metadata behavior unless a clear homepage improvement is needed.
- Do not weaken heading hierarchy.
- Keep internal linking strong from the homepage into tutorial and affiliate-intent clusters.
- Preserve indexability and current sitemap/robots patterns.

## Performance Constraints

- Avoid heavy client-side animation or large JS additions.
- Keep existing SSR behavior intact.
- Prefer gradients, borders, spacing, and typographic hierarchy over expensive effects.
- Any added imagery should be lightweight and justified.

## Risks

1. Shared component regressions affecting article pages
2. Visual overcorrection that harms readability on content-heavy layouts
3. CTA-heavy styling reducing perceived trust
4. Ad or newsletter blocks feeling bolted on instead of integrated

## Risk Controls

- Keep shared-component edits targeted
- Prioritize homepage-specific wrappers when visual needs diverge
- Verify article-adjacent components still render appropriately after shared styling changes
- Run lint/build and inspect the live dev homepage after the refresh

## Verification

- Confirm homepage still renders published posts and reviews from existing Convex queries
- Confirm header/footer remain functional on public pages
- Confirm ad block still renders in its intended slot
- Run project verification commands after implementation
- Manually inspect `http://localhost:3002`

## Notes

- Dev server confirmed running locally on `http://localhost:3002`
- This repository is a git repo, so the eventual code changes can be committed later if requested
