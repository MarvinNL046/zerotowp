# WordPress Theme & Plugin Detector — Design Spec

**Date:** 2026-03-18
**Status:** Approved
**Route:** `/tools/theme-detector`

## Overview

A free interactive tool that detects the WordPress theme, visible plugins, and hosting provider of any website. Users enter a URL, the tool fetches and parses the site's HTML and HTTP headers server-side, then displays results with a shareable URL.

**Goal:** Attract natural backlinks from WordPress bloggers and forums who share results or reference the tool in their content.

## User Flow

1. User visits `/tools/theme-detector` (or arrives via `?url=example.com`)
2. Enters a URL in the input field, clicks "Detect"
3. Server Action fetches the target site's HTML + headers (5s timeout, proper User-Agent)
4. Results appear below the input with a shareable URL updated in the address bar
5. If `?url=` query param is present on page load, scan runs automatically

## Detection Logic

### WordPress Detection (in order)
1. `wp-content/` in any link/script src → confirmed WordPress
2. `<meta name="generator" content="WordPress X.X">` → confirmed + version
3. `/wp-includes/` in any link/script src → confirmed WordPress
4. `/wp-json/` link in `<head>` → confirmed WordPress
5. None of the above → "This does not appear to be a WordPress site"

### Theme Detection
- Parse all `href` and `src` attributes for `wp-content/themes/[name]/`
- Extract theme name from the path segment
- Match against a hardcoded list of ~50 popular themes with metadata:
  - Display name, free/premium flag, wordpress.org URL (if free), official site URL
  - Link to our review if we have one (Astra, GeneratePress, Kadence, Hello Elementor, etc.)
- If theme not in our list: show raw slug name + link to wordpress.org/themes/[slug]

### Plugin Detection
- Parse all `href` and `src` attributes for `wp-content/plugins/[name]/`
- Also check for known plugin signatures in HTML:
  - `class="wpcf7"` → Contact Form 7
  - `class="elementor"` → Elementor
  - `id="woocommerce"` or `.woocommerce` → WooCommerce
  - `yoast-schema` or `yoast-seo` → Yoast SEO
  - `rank-math` → Rank Math
- Deduplicate by plugin slug
- Match against hardcoded list of ~100 popular plugins with display names
- Show count with disclaimer: "X plugins detected (only plugins visible in the page source)"

### Hosting Detection (via HTTP headers)
Parse response headers for hosting signatures:
- `server: cloudflare` → Cloudflare (CDN/proxy, not hosting)
- `x-kinsta-cache` → Kinsta
- `x-powered-by: W3 Total Cache` → W3TC detected
- `server: nginx` + `x-sucuri-id` → Sucuri WAF
- `x-github-request-id` → GitHub Pages
- `server: Starter` or `x-siteground` → SiteGround
- `x-hacker` → WordPress.com/Automattic
- `wpe-backend` → WP Engine
- `x-flywheel` → Flywheel
- Link to our hosting review if we have one

## Architecture

### Files

```
app/(public)/tools/theme-detector/
  page.tsx          — Server component with metadata + SEO
  detector-form.tsx — Client component ("use client") with form + results
  actions.ts        — Server Action: fetchAndParse(url)
  detect.ts         — Pure functions: parseTheme, parsePlugins, parseHosting
  known-themes.ts   — Hardcoded popular themes list with metadata
  known-plugins.ts  — Hardcoded popular plugins list with display names
  known-hosts.ts    — Hardcoded hosting header signatures
```

### Server Action (`actions.ts`)

```typescript
"use server"
async function detectSite(url: string): Promise<DetectionResult> {
  // 1. Normalize URL (add https:// if missing)
  // 2. Fetch with 5s timeout, User-Agent: "ZeroToWP Theme Detector Bot"
  // 3. Get both response body (HTML) and headers
  // 4. Run detection functions
  // 5. Return structured result
}
```

### Data Types

```typescript
type DetectionResult = {
  url: string;
  isWordPress: boolean;
  wpVersion: string | null;
  theme: {
    slug: string;
    name: string;
    isFree: boolean;
    wpOrgUrl: string | null;
    officialUrl: string | null;
    ourReviewUrl: string | null;
  } | null;
  plugins: Array<{
    slug: string;
    name: string;
    wpOrgUrl: string | null;
    ourArticleUrl: string | null;
  }>;
  hosting: {
    provider: string;
    confidence: "high" | "medium";
    ourReviewUrl: string | null;
  } | null;
  error: string | null;
};
```

## UI Design

### Input Section
- Large URL input field with placeholder "Enter any website URL..."
- Orange "Detect Theme" button
- Loading state: spinner + "Analyzing site..." text
- Error state: red message below input

### Results Section (only shown after scan)
1. **Site Badge** — URL + "WordPress Detected ✓" or "Not a WordPress site ✗"
2. **Theme Card** — Large card with theme name, free/premium badge, description if known, links to wordpress.org and our review
3. **Plugins List** — Grid of plugin cards with names and links, count badge + transparency note
4. **Hosting Badge** — Provider name + confidence level + link to our review
5. **Share Button** — Copies the shareable URL to clipboard
6. **CTA Section** — "Want to use [theme name]? Read our guide" → links to our content

### Shareable URL
- Format: `/tools/theme-detector?url=example.com`
- URL updates via `window.history.replaceState` after scan (no page reload)
- When `?url=` is present on load, auto-trigger the scan

## SEO

- **Title:** "WordPress Theme Detector — Find Any Site's Theme & Plugins | ZeroToWP"
- **Description:** "Free tool to detect which WordPress theme, plugins, and hosting any website uses. Enter a URL and get instant results."
- **Target keywords:** "wordpress theme detector", "what wordpress theme is that", "detect wordpress theme", "wordpress theme checker"
- **Schema:** WebApplication schema markup

## Error Handling

- Invalid URL → "Please enter a valid URL"
- Timeout (>5s) → "This site took too long to respond. It may be blocking automated requests."
- Non-WordPress site → Show friendly message, suggest they try a different URL
- Fetch error → "Could not reach this site. Please check the URL and try again."
- Site blocks requests → "This site blocks automated requests. We could not analyze it."

## What We Don't Build (YAGNI)

- No database storage of scan results
- No rate limiting (add later if abused)
- No user accounts or history
- No API endpoint (just the UI)
- No browser extension
- No bulk scanning
- No screenshot/thumbnail of the scanned site
