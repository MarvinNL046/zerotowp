# Zero To WordPress Hero Illustration Refinement

## Goal

Refine the homepage hero illustration so it feels clearly WordPress-specific and premium, without reading like a fake analytics dashboard. The existing hero copy and overall two-column hero structure can stay, but the right-side visual should shift from "metrics UI" to "WordPress creation scene."

## Approved Direction

- Overall style: editorial collage
- Primary visual anchor: a large WordPress editor/browser scene
- Supporting human element: a subtle abstract silhouette, not a detailed person
- Avoid: fake KPI cards, fake dashboard widgets, analytics-style bars, or generic SaaS metrics

## Visual Intent

The hero should feel like "launching a WordPress site" rather than "monitoring a dashboard."

The illustration should communicate:
- active WordPress building
- editorial polish
- warmth and momentum
- a human behind the work, but only as a subtle presence

## Composition

- Keep the left column focused on copy and CTA buttons.
- Rebuild the right column around one dominant browser/editor frame.
- Use light collage layering around that frame:
  - one floating publish/status pill
  - one secondary lightweight utility card or modal
  - one abstract silhouette shape partially overlapping the scene
- Keep the number of visual elements low. The browser/editor frame must remain the focal point.

## WordPress Scene

The main scene should resemble a WordPress/Gutenberg editing environment rather than analytics software.

Preferred signals:
- a browser chrome or app frame
- a left navigation rail or admin-like structure
- content blocks or page-building regions
- a publish or launch action

Avoid:
- fake charts
- progress bars as dominant content
- KPI tiles
- dense UI mosaics that look invented

## Abstract Creator Figure

- The figure should be subtle and stylized.
- It should read more like a silhouette or abstract maker-presence than an illustrated character.
- No facial detail is needed.
- The figure can overlap the bottom or side of the browser scene to make the hero feel more human and less mechanical.

## Styling

- Preserve the warm orange/amber palette already established in the hero.
- Keep charcoal/slate depth for contrast.
- Use soft glass, blur, and layered cards sparingly.
- The right side should feel premium and composed, not busy.

## Non-Goals

- Do not redesign the hero copy.
- Do not redesign the rest of the homepage.
- Do not introduce a fully detailed character illustration.
- Do not add animation dependencies or heavy frontend libraries.

## Implementation Notes

- Update only the hero illustration portion in `app/(public)/page.tsx`.
- Keep the current hero text unless later copy feedback changes it.
- Reduce the number of decorative cards if needed to protect clarity.
- Prioritize silhouette, editor structure, and composition over UI density.

## Acceptance Criteria

- The hero no longer reads as a fake dashboard or analytics panel.
- The right-side illustration clearly suggests WordPress editing/building.
- The silhouette is present but understated.
- The scene feels more editorial and premium than technical or infographic-like.
- Mobile and desktop layouts still feel balanced and readable.
