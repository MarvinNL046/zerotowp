# ZeroToWP Public Homepage Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh the ZeroToWP public homepage and shared public design system so the site feels like a stronger affiliate/tutorial hub without changing the existing content architecture, Convex flows, ads, or public route structure.

**Architecture:** Keep the existing App Router structure and Convex-powered homepage queries intact. Redesign the public homepage, header, footer, newsletter capture, and visual tokens with CSS-first changes and small focused component updates, then verify in local dev and with a lean homepage smoke test.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Convex, Clerk, Lucide React, Playwright.

---

## File Map

- Modify: `app/(public)/page.tsx`
- Modify: `app/globals.css`
- Modify: `components/layout/header.tsx`
- Modify: `components/layout/footer.tsx`
- Modify: `components/layout/newsletter-form.tsx`
- Modify: `components/layout/nav-dropdown.tsx`
- Modify: `components/layout/mobile-nav.tsx`
- Modify: `components/layout/search.tsx`
- Optional modify: `components/blog/post-card.tsx`
- Optional modify: `components/reviews/review-card.tsx`
- Modify: `package.json`
- Create: `playwright.config.ts`
- Create: `tests/public-homepage.spec.ts`

### Task 1: Add a lean homepage smoke-test harness

**Files:**
- Modify: `package.json`
- Create: `playwright.config.ts`
- Create: `tests/public-homepage.spec.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { test, expect } from "@playwright/test";

test("homepage presents the upgraded tutorial funnel", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /learn wordpress faster with step-by-step tutorials that actually convert/i,
    }),
  ).toBeVisible();

  await expect(page.getByRole("link", { name: /start here/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /where do you want to start/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /popular wordpress guides/i })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /latest articles/i })).toBeVisible();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/public-homepage.spec.ts`

Expected: FAIL because the current homepage does not use the new hero copy or the upgraded section headings yet.

- [ ] **Step 3: Add the test runner setup**

```ts
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:3002",
    headless: true,
  },
});
```

```json
// package.json
{
  "scripts": {
    "test:e2e": "playwright test"
  }
}
```

- [ ] **Step 4: Run the test again to confirm the failure is now meaningful**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: FAIL on the new homepage assertions, not on missing tooling.

- [ ] **Step 5: Commit**

```bash
git add package.json playwright.config.ts tests/public-homepage.spec.ts
git commit -m "test: add public homepage smoke coverage"
```

### Task 2: Refresh global tokens and public shell styling

**Files:**
- Modify: `app/globals.css`
- Modify: `components/layout/header.tsx`
- Modify: `components/layout/footer.tsx`
- Modify: `components/layout/nav-dropdown.tsx`
- Modify: `components/layout/mobile-nav.tsx`
- Modify: `components/layout/search.tsx`
- Modify: `components/layout/newsletter-form.tsx`

- [ ] **Step 1: Write the next failing test expectation**

Extend the homepage smoke test with shell expectations:

```ts
await expect(page.getByRole("banner")).toBeVisible();
await expect(page.getByRole("contentinfo")).toBeVisible();
await expect(page.getByPlaceholder(/your@email.com/i)).toBeVisible();
```

- [ ] **Step 2: Run the test to verify it fails for the new shell expectations if needed**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: FAIL until the refreshed public shell is in place.

- [ ] **Step 3: Implement the minimal shell refresh**

Use `app/globals.css` to introduce a stronger orange/amber/slate design system, better radii, softer shadows, and more deliberate surfaces:

```css
:root {
  --background: #fffaf5;
  --foreground: #0f172a;
  --primary: #f97316;
  --accent: #fff1e8;
  --muted: #f8fafc;
  --border: #e7e5e4;
}
```

Update the public shell components so they feel more premium and conversion-oriented:

- header gets clearer CTA hierarchy and less generic chrome
- dropdowns and mobile nav inherit the same surfaces and contrast
- search feels integrated, not bolted on
- footer becomes more editorial/trust-oriented
- newsletter form looks intentional inside both homepage and footer contexts

- [ ] **Step 4: Run the smoke test again**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: partial progress; shell assertions pass, hero/content assertions still fail.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css components/layout/header.tsx components/layout/footer.tsx components/layout/nav-dropdown.tsx components/layout/mobile-nav.tsx components/layout/search.tsx components/layout/newsletter-form.tsx
git commit -m "feat: refresh public shell styling"
```

### Task 3: Rebuild the homepage funnel while preserving current data sources

**Files:**
- Modify: `app/(public)/page.tsx`

- [ ] **Step 1: Write the failing content expectation**

Lock the intended funnel copy in the smoke test:

```ts
await expect(page.getByText(/compare hosting, plugins, themes, and seo tools with less guesswork/i)).toBeVisible();
await expect(page.getByRole("link", { name: /compare hosting/i })).toBeVisible();
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: FAIL because the old homepage still uses the previous hero and section flow.

- [ ] **Step 3: Implement the homepage refresh**

Keep these existing data calls intact:

```ts
const posts = await fetchQuery(api.posts.listPublished, { limit: 6 });
const reviews = await fetchQuery(api.reviews.listPublished, { limit: 3 });
```

Rebuild the page into this flow:

- hero with stronger authority-led copy and CTA pair
- guided topic grid framed as a “where do you want to start?” decision step
- upgraded popular guides strip
- ad slot retained in the existing mid-page area
- latest articles section using the current `PostCard`
- buyer-intent reviews section using the current `reviews` data
- stronger newsletter / recurring engagement block

- [ ] **Step 4: Run the smoke test again**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: PASS for hero, CTA, guided-entry, popular guides, latest articles, and shell assertions.

- [ ] **Step 5: Commit**

```bash
git add 'app/(public)/page.tsx'
git commit -m "feat: redesign the public homepage funnel"
```

### Task 4: Tighten card presentation without breaking shared usage

**Files:**
- Optional modify: `components/blog/post-card.tsx`
- Optional modify: `components/reviews/review-card.tsx`

- [ ] **Step 1: Write a failing visual expectation only if the homepage still feels inconsistent**

Add one more smoke assertion:

```ts
await expect(page.getByRole("link", { name: /read review/i }).first()).toBeVisible();
```

- [ ] **Step 2: Run the test**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: Either PASS already, or expose card-level consistency issues on the refreshed homepage.

- [ ] **Step 3: Make only the minimal shared-card styling changes needed**

Allowed adjustments:

- stronger category badges
- tighter image treatment
- better spacing and hover polish
- more consistent CTA affordance

Not allowed:

- changing slug logic
- changing shared data shape
- adding homepage-only assumptions that would break article or review listings elsewhere

- [ ] **Step 4: Re-run the homepage smoke test**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: PASS, with cards visually aligned to the new homepage shell.

- [ ] **Step 5: Commit**

```bash
git add components/blog/post-card.tsx components/reviews/review-card.tsx
git commit -m "feat: align shared cards with refreshed public design"
```

### Task 5: Final verification

**Files:**
- Modify: touched files as needed

- [ ] **Step 1: Run lint**

Run: `npm run lint`

Expected: PASS with no blocking errors.

- [ ] **Step 2: Run the homepage smoke test**

Run: `npm run test:e2e -- tests/public-homepage.spec.ts`

Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 4: Manually inspect the live dev page**

Open: `http://localhost:3002`

Confirm:

- hero feels stronger and more intentional
- topic clusters are easier to choose from
- popular guides and latest articles scan better
- ad placement still fits naturally
- footer/newsletter feel integrated
- mobile nav still works

- [ ] **Step 5: Commit**

```bash
git add app/(public)/page.tsx app/globals.css components/layout/header.tsx components/layout/footer.tsx components/layout/newsletter-form.tsx components/layout/nav-dropdown.tsx components/layout/mobile-nav.tsx components/layout/search.tsx components/blog/post-card.tsx components/reviews/review-card.tsx package.json playwright.config.ts tests/public-homepage.spec.ts
git commit -m "feat: refresh zerotowp public homepage and design system"
```
