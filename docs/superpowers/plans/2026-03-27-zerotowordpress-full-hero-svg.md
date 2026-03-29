# Zero To WordPress Full Hero SVG Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current handcrafted homepage hero illustration with a single cohesive `hero-wordpress.svg` scene and wire the homepage hero to use it as the primary visual layer.

**Architecture:** Build one static SVG asset in `public/` that carries the full WordPress scene, mirroring the successful Zero To Wander hero pattern. Update the homepage hero to render that SVG as a full-scene background layer with text and CTA content over it, removing the current right-column collage markup entirely.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, `next/image`, shell-based integration check with `curl`, file-scoped ESLint.

---

### Task 1: Turn the Existing Hero Check into a Failing SVG Check

**Files:**
- Modify: `scripts/check-hero-illustration.sh`

- [ ] **Step 1: Update the check to assert the new SVG direction**

```bash
#!/usr/bin/env bash
set -euo pipefail

html="$(curl -fsS http://localhost:3000)"

echo "$html" | grep -F "/hero-wordpress.svg" >/dev/null
echo "$html" | grep -F "Illustrated WordPress workspace scene with a creator silhouette and editor screen." >/dev/null

if echo "$html" | grep -F "WordPress editor scene" >/dev/null; then
  echo "Old handcrafted hero illustration still present" >&2
  exit 1
fi
```

- [ ] **Step 2: Run the check before implementation**

Run: `bash scripts/check-hero-illustration.sh`
Expected: FAIL because the current hero still uses the handcrafted HTML illustration rather than the new SVG.

### Task 2: Add the New Hero SVG Asset

**Files:**
- Create: `public/hero-wordpress.svg`

- [ ] **Step 1: Create the SVG scene**

```svg
<svg ...>
  <!-- background atmosphere -->
  <!-- grounded desk/foreground plane -->
  <!-- monitor or laptop with WordPress-like editor -->
  <!-- subtle silhouette -->
</svg>
```

- [ ] **Step 2: Keep the SVG coherent and lightweight**

Requirements:
- one unified scene
- warm amber/orange/cream/slate palette
- no analytics charts or dashboard widgets
- enough negative space for overlaid copy

### Task 3: Rebuild the Hero to Use the SVG as the Primary Visual

**Files:**
- Modify: `app/(public)/page.tsx`

- [ ] **Step 1: Import `Image` from `next/image`**

```tsx
import Image from "next/image";
```

- [ ] **Step 2: Replace the current right-column illustration markup with a full-scene image layer**

```tsx
<section className="relative min-h-[80vh] overflow-hidden">
  <Image
    src="/hero-wordpress.svg"
    alt="Illustrated WordPress workspace scene with a creator silhouette and editor screen."
    fill
    priority
    sizes="100vw"
    className="object-cover object-center"
  />
</section>
```

- [ ] **Step 3: Add overlay gradients for readability**

```tsx
<div className="absolute inset-0 bg-[linear-gradient(...)]" />
<div className="absolute inset-0 bg-[radial-gradient(...)]" />
```

- [ ] **Step 4: Keep hero copy and CTAs in the foreground**

```tsx
<div className="relative mx-auto max-w-6xl ...">
  {/* existing badge, headline, body, buttons, supporting chips */}
</div>
```

- [ ] **Step 5: Remove the handcrafted editor/dashboard block completely**

Result:
- no `role="img"` hero collage container
- no HTML-built faux UI cards
- no silhouette built from `div`s

### Task 4: Verify the New Full-SVG Hero

**Files:**
- Verify: `scripts/check-hero-illustration.sh`
- Verify: `app/(public)/page.tsx`
- Verify: `public/hero-wordpress.svg`

- [ ] **Step 1: Run the updated integration check**

Run: `bash scripts/check-hero-illustration.sh`
Expected: PASS

- [ ] **Step 2: Run file-scoped lint**

Run: `npx eslint app/'(public)'/page.tsx`
Expected: PASS

- [ ] **Step 3: Inspect the change scope**

Run: `git diff -- app/'(public)'/page.tsx public/hero-wordpress.svg scripts/check-hero-illustration.sh`
Expected: only the hero asset, hero structure, and verification script changed
