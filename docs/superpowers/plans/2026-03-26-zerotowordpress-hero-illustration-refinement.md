# Zero To WordPress Hero Illustration Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current fake-dashboard-style hero illustration with an editorial collage centered on a WordPress editor scene plus a subtle abstract creator silhouette.

**Architecture:** Keep the existing homepage hero copy and layout intact while rebuilding only the right-side illustration in `app/(public)/page.tsx`. Add a lightweight integration check that exercises the rendered homepage HTML on the local dev server so the new scene is validated by output rather than by file contents alone.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, local shell verification with `curl`, file-scoped ESLint.

---

### Task 1: Add a Failing Integration Check for the Refined Hero

**Files:**
- Create: `scripts/check-hero-illustration.sh`

- [ ] **Step 1: Write the failing check script**

```bash
#!/usr/bin/env bash
set -euo pipefail

html="$(curl -fsS http://localhost:3000)"

echo "$html" | grep -F "WordPress editor scene" >/dev/null
echo "$html" | grep -F "Abstract creator silhouette" >/dev/null
echo "$html" | grep -F "fake dashboard" >/dev/null && exit 1
```

- [ ] **Step 2: Run the script to verify it fails before implementation**

Run: `bash scripts/check-hero-illustration.sh`
Expected: FAIL because the current hero markup does not yet expose the refined illustration labels.

### Task 2: Rebuild the Hero Illustration Around a WordPress Scene

**Files:**
- Modify: `app/(public)/page.tsx`

- [ ] **Step 1: Add non-visual labels to the illustration container so the integration check can verify the new scene**

```tsx
<div aria-label="WordPress editor scene" role="img">
  ...
  <div className="sr-only">Abstract creator silhouette</div>
</div>
```

- [ ] **Step 2: Replace the right-side illustration markup**

```tsx
<div className="relative mx-auto w-full max-w-[34rem]">
  {/* one main browser/editor frame */}
  {/* one small floating utility card */}
  {/* one publish pill */}
  {/* one subtle abstract silhouette */}
</div>
```

- [ ] **Step 3: Keep the scene WordPress-specific**

```tsx
{/* include browser chrome, admin rail, block-editor-like content regions, and a publish affordance */}
```

- [ ] **Step 4: Remove analytics-style visuals**

```tsx
{/* remove fake KPI tiles, progress bars, and dense dashboard mosaics */}
```

### Task 3: Verify the Refined Hero

**Files:**
- Verify: `scripts/check-hero-illustration.sh`
- Verify: `app/(public)/page.tsx`

- [ ] **Step 1: Run the integration check to verify it now passes**

Run: `bash scripts/check-hero-illustration.sh`
Expected: PASS

- [ ] **Step 2: Run file-scoped lint**

Run: `npx eslint app/'(public)'/page.tsx`
Expected: PASS

- [ ] **Step 3: Inspect the diff scope**

Run: `git diff -- app/'(public)'/page.tsx scripts/check-hero-illustration.sh`
Expected: only hero illustration and its verification script changed
