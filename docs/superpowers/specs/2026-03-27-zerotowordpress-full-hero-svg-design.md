# Zero To WordPress Full Hero SVG Design

## Goal

Replace the current homepage hero illustration approach with a single cohesive SVG scene, following the successful pattern used in Zero To Wander. The new hero should stop feeling like assembled fake product UI and instead read as one premium WordPress-specific illustration with the copy layered on top.

## Approved Direction

- Use a dedicated `public/hero-wordpress.svg` asset as the primary visual foundation of the hero.
- Remove the current right-column HTML collage/dashboard illustration approach.
- Keep the existing WordPress hero copy and CTA structure unless later copy feedback changes it.
- Base the overall composition on the Zero To Wander hero pattern:
  - full visual scene
  - overlay gradients
  - text layered over the scene

## Reference

The design direction should follow the structure and visual logic of:

- `zerotowander/public/hero-nomad.svg`
- `zerotowander/components/home/hero-section.tsx`

What should carry over from that reference:
- one unified illustration instead of many separate UI fragments
- clear atmosphere and depth
- a strong silhouette-based scene
- premium, calm composition

What should not be copied literally:
- the travel/mountain subject matter
- the exact color palette
- the nomad-specific layout or copy

## New Visual Concept

The new SVG should depict a WordPress creation scene rather than analytics software.

The illustration should suggest:
- a creator working on a WordPress site
- a monitor or laptop showing a WordPress editor or page-building interface
- a subtle abstract human silhouette
- a grounded environment or surface so the illustration feels composed, not floating

The scene should feel illustrative first and interface-like second.

## Composition

The hero becomes a full-scene section rather than a text-left / fake-dashboard-right split.

Structure:
- background SVG fills the hero area
- one or two soft gradient overlays improve text legibility
- copy remains in the foreground
- hero content stays constrained inside the existing site shell/max-width

The text should sit comfortably over the image, not compete with it.

## SVG Content Requirements

`hero-wordpress.svg` should include:
- a warm WordPress-appropriate background using amber, orange, cream, slate, and deep charcoal tones
- layered depth, similar to the Zero To Wander scene
- a monitor or laptop with a recognizable WordPress-style editor interface
- a subtle silhouette or abstract figure
- enough negative space to keep the heading and CTA readable

The SVG should avoid:
- charts
- KPI cards
- analytics bars
- fake SaaS widgets
- dense collage fragments made to imitate UI complexity

## Layout Requirements

- The homepage hero should still support the existing badge, headline, body text, CTA buttons, and supporting chips.
- The implementation may keep the hero content aligned left if that works best for readability.
- The full section should feel like one integrated marketing moment rather than two separate halves.
- Mobile must still work cleanly: the SVG should crop gracefully and the copy must stay readable.

## Implementation Notes

- Create `public/hero-wordpress.svg`.
- Update `app/(public)/page.tsx` hero structure to use the SVG as a full hero visual layer, likely via `next/image` or a standard image approach consistent with the repo.
- Remove the current handcrafted editor/dashboard illustration markup from the hero.
- Preserve the rest of the homepage unchanged.
- Preserve accessibility with meaningful alt text for the SVG image.

## Suggested Scene Content

The WordPress scene should likely include:
- a desk or grounded foreground plane
- a monitor/laptop frame
- a simplified WordPress editor canvas
- an understated human silhouette seated or positioned near the screen
- subtle decorative background geometry for atmosphere

This should feel composed like an illustration poster, not like product marketing UI.

## Non-Goals

- Do not redesign the full homepage.
- Do not rebuild the hero as a complex interactive component.
- Do not introduce animation libraries.
- Do not add a literal detailed character illustration.
- Do not reintroduce separate floating dashboard cards as the main concept.

## Acceptance Criteria

- The hero no longer reads like fake product UI or a dashboard mockup.
- The hero reads as one cohesive illustration.
- The scene feels clearly WordPress-specific.
- The scene feels closer in quality and coherence to Zero To Wander’s hero than the current implementation.
- The text remains readable across desktop and mobile.
