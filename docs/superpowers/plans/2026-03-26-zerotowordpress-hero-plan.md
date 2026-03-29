# Zero To WordPress Hero Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current hero on `app/(public)/page.tsx` with the illustrative WordPress dashboard scene described in the approved spec while leaving the rest of the homepage untouched.

**Architecture:** App Router server-rendered page, hero composed of semantic `<section>` wrapping text, CTA column, and layered decorative divs; no new routes or metadata updates required.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, existing Lucide icons, next/link, shared data modules; no new dependencies.

---

### Task 1: Refactor the Hero Section in `app/(public)/page.tsx`

**Files:**
- Modify: `app/(public)/page.tsx`

- [ ] **Step 1: Replace the existing hero `<section>` markup with the new layout**

```tsx
<section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 sm:py-20 lg:py-24">
  <div className="pointer-events-none absolute left-[-10%] top-0 h-64 w-64 rounded-full bg-orange-200 opacity-40 blur-3xl" aria-hidden />
  <div className="pointer-events-none absolute right-[-8%] bottom-0 h-72 w-72 rounded-full bg-yellow-100 opacity-40 blur-3xl" aria-hidden />
  <div className="relative max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
    <div className="space-y-6 lg:space-y-8">
      <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-orange-600">
        WordPress Launch Desk
      </span>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
        Launch WP Sites Fast
      </h1>
      <p className="text-lg text-slate-600">
        Practical workflows for WordPress creators who need reliable launches, not guesswork.
      </p>
      <p className="text-base text-slate-500 max-w-2xl">
        Sheets, dashboards, and ops all in one place—follow the guides that pair sleek design with performance and SEO.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/start-here" className="inline-flex items-center justify-center rounded-full bg-[#f97316] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f97316]">
          Start a WordPress Project
        </Link>
        <Link href="/wordpress-hosting" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:border-orange-300 hover:text-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400">
          Compare Hosting & Tools
        </Link>
      </div>
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
        70+ WordPress tutorials, reviews, and checklists
      </p>
    </div>
```

- [ ] **Step 2: Build the illustration column using stacked cards and faux dashboard widgets**

```tsx
    <div className="relative">
      <div className="rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.15)] p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Live Dashboard
          </span>
        </div>
        <div className="space-y-3">
          <div className="h-3 rounded-full bg-slate-100" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-16 rounded-2xl bg-slate-900/90" />
            <div className="h-16 rounded-2xl bg-slate-900/60" />
            <div className="h-16 rounded-2xl bg-slate-900/40" />
          </div>
          <div className="h-24 rounded-[1.5rem] bg-gradient-to-br from-slate-900 to-slate-800" aria-hidden>
            <div className="mt-3 flex items-center justify-between px-4">
              <p className="text-xs font-semibold text-slate-200">Theme Launch</p>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">FAST</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-6 right-6 h-16 w-16 rounded-full bg-[#f97316] opacity-60 blur-xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-6 left-6 h-12 w-12 rounded-full border border-white/30 bg-white/30" aria-hidden />
      <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-orange-600">
        Publish
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Remove any unused icon imports and ensure ESLint passes**
- [ ] **Step 4: Run `npm run lint` to verify formatting and types**
- [ ] **Step 5: Run `npm run test` if applicable (should pass unchanged)**
- [ ] **Step 6: `git status -sb` to confirm only hero changes exist**

***
Plan complete and saved to `docs/superpowers/plans/2026-03-26-zerotowordpress-hero-plan.md`. Two execution options:

1. Subagent-Driven (recommended) - I dispatch a fresh subagent per task, review between tasks, fast iteration
2. Inline Execution - Execute tasks in this session using executing-plans, batch execution with checkpoints for review

Which approach would you like?"
