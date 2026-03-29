# Zero To WordPress Hero Refresh Design

## Goal

Replace the current bright orange gradient hero with a premium, illustrative hero that matches the adventurous-but-practical tone we shipped on Zero To Wander. The new hero should spotlight WordPress creators, highlight “Launch WP sites fast,” keep the existing supporting content intact, and feel like a high-converting marketing moment.

## Requirements

- Single hero section only; the rest of the homepage (topic grid, guides, posts, etc.) stays untouched.
- Use the existing WordPress palette (orange/amber) but introduce deeper charcoal tones, glassy gradients, and layered panels to echo a workspace illustration.
- Hero copy: Title “Launch WP Sites Fast,” subheadline that directly references WordPress workflow, body copy that promises practical tutorials/tools, and two CTA buttons: primary (newsletter/guide) and secondary (start guide).
- Newsletter form remains in the trust section later; hero CTAs should link to `/start-here` and `/wordpress-hosting` (or newsletter anchor) the way Zero To Wander’s hero links to the starter kit/resources.
- Add subtle motion (Framer Motion slide/fade) if feasible without pulling in heavy client code—prefer CSS transitions or small client components already in place (e.g., motion wrappers, though this repo doesn’t currently use Framer Motion). No new dependencies required.
- Maintain accessibility: single `<h1>` for the hero, semantic `<p>` and `<button>`/`<a>` order, focus states on CTAs.
- Hero must work responsively from mobile to desktop with meaningful sizing (full viewport height, layered background shapes, CTA stacking behavior, text alignment). All text should remain readable on small screens.

## Visual Direction

- Background: keep the existing gradient stack but add layered geometric elements (floating screens, card outlines, subtle data charts) to suggest a WordPress control room. Use CSS gradients + SVG masks rather than data-heavy imagery.
- Illustration: introduce a stylized “creator desk” card by combining absolutely positioned divs with gradients, drop shadows, rounded corners, and a faux WordPress dashboard screenshot (simple rectangles representing blocks). Use `div` overlays for decorative elements (e.g., gear outlines, map points) to deliver the “illustrative scene” vibe mentioned.
- Typography: keep the current type system but increase contrast by deepening heading colors (e.g., `text-slate-900` for hero text). Keep hero CTA buttons in bold, rounded shapes with orange base color for primary.

## Layout

- Wrap hero in `section` with `min-h-[80vh]` and `py-16` to ensure breathing room.
- Place two columns: left column for text/copy/CTAs, right column for the illustrative scene (stacked cards and badges). On small screens, stack vertically with the illustration below the copy.
- Text column: include a “badge” label (“WordPress Launch Desk”) above the `<h1>`, hero `<p>` for subhead, and two CTA buttons grouped horizontally on desktop and stacked on mobile.
- Illustration column: build with relative/absolute layout utilising `div`s for background gradient, a “monitor” block, a “widget grid,” and a “floating pill button” that hints at plugin install or publish action. Add small accent circles to mimic motion.

## Implementation Notes

- edit `app/(public)/page.tsx` hero section only. Keep existing imports (Lucide icons, others) as needed; remove unused ones if the hero no longer uses them.
- Add `aria-hidden` elements for purely decorative shapes, keep markup lean.
- Use Tailwind utility classes already in the project; no new config required. Keep the `CLUSTERS` data untouched.
- Ensure hero buttons use `Link` from `next/link` with `href` to `/start-here` (primary) and `/wordpress-hosting` (secondary) while preserving `aria-label`s describing actions.
- Keep the `WebSiteSchema` component at the top unchanged; the hero sits below.

## Content Copy

- Title: `Launch WP Sites Fast`
- Subhead: `Practical workflows for WordPress creators who need reliable launches, not guesswork.`
- Body: `Sheets, dashboards, and ops all in one place—follow the guides that pair sleek design with performance and SEO.`
- Primary CTA: `Start a WordPress Project` (links to `/start-here`)
- Secondary CTA: `Compare Hosting & Tools` (links to `/wordpress-hosting`)
- Secondary text (optional): `70+ WordPress tutorials, reviews, and checklists` could remain as badge text or `span`.

## Approval Step

Once implemented, preview the hero locally to ensure layering works across breakpoints. No additional site routes or SEO metadata changes are required. 

**Next:** I’ll wait for your review of this spec before writing the implementation plan.
