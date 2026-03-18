import type { ThemeInfo, PluginInfo, HostingInfo } from "./types";
import { KNOWN_THEMES } from "./known-themes";
import { KNOWN_PLUGINS, PLUGIN_SIGNATURES } from "./known-plugins";
import { matchHosting } from "./known-hosts";

// ─── WordPress Detection ────────────────────────────────────────────────────

export function detectWordPress(html: string): {
  isWordPress: boolean;
  version: string | null;
} {
  // 1. Check meta generator tag for version
  const generatorMatch = html.match(
    /<meta[^>]+name=["']generator["'][^>]+content=["']WordPress\s*([\d.]*)/i,
  );
  if (generatorMatch) {
    return {
      isWordPress: true,
      version: generatorMatch[1] || null,
    };
  }

  // 2. Check for wp-content in links/scripts
  if (/wp-content\//i.test(html)) {
    return { isWordPress: true, version: null };
  }

  // 3. Check for wp-includes
  if (/wp-includes\//i.test(html)) {
    return { isWordPress: true, version: null };
  }

  // 4. Check for wp-json API link
  if (/\/wp-json\//i.test(html)) {
    return { isWordPress: true, version: null };
  }

  return { isWordPress: false, version: null };
}

// ─── Theme Detection ────────────────────────────────────────────────────────

export function detectTheme(html: string): ThemeInfo | null {
  // Extract theme slug from wp-content/themes/[slug]/
  const themeMatches = html.matchAll(
    /wp-content\/themes\/([a-zA-Z0-9_-]+)\//gi,
  );

  const slugs = new Set<string>();
  for (const match of themeMatches) {
    const slug = match[1].toLowerCase();
    // Skip common false positives
    if (slug === "flavor") continue;
    slugs.add(slug);
  }

  if (slugs.size === 0) return null;

  // Use the first detected slug (most likely the active theme)
  const slug = [...slugs][0];
  const known = KNOWN_THEMES[slug];

  if (known) {
    return {
      slug,
      name: known.name,
      isFree: known.isFree,
      wpOrgUrl: known.wpOrgUrl,
      officialUrl: known.officialUrl,
      ourReviewUrl: known.ourReviewUrl,
    };
  }

  // Unknown theme — still return what we found
  return {
    slug,
    name: formatSlugAsName(slug),
    isFree: true, // assume free if unknown
    wpOrgUrl: `https://wordpress.org/themes/${slug}/`,
    officialUrl: null,
    ourReviewUrl: null,
  };
}

// ─── Plugin Detection ───────────────────────────────────────────────────────

export function detectPlugins(html: string): PluginInfo[] {
  const detected = new Map<string, PluginInfo>();

  // 1. Parse wp-content/plugins/[slug]/ paths
  const pluginMatches = html.matchAll(
    /wp-content\/plugins\/([a-zA-Z0-9_-]+)\//gi,
  );
  for (const match of pluginMatches) {
    const slug = match[1].toLowerCase();
    if (detected.has(slug)) continue;

    const known = KNOWN_PLUGINS[slug];
    detected.set(slug, {
      slug,
      name: known?.name ?? formatSlugAsName(slug),
      wpOrgUrl: known?.wpOrgUrl ?? `https://wordpress.org/plugins/${slug}/`,
      ourArticleUrl: known?.ourArticleUrl ?? null,
    });
  }

  // 2. Check HTML signatures for plugins that may not expose wp-content paths
  for (const sig of PLUGIN_SIGNATURES) {
    if (detected.has(sig.slug)) continue;
    if (sig.pattern.test(html)) {
      const known = KNOWN_PLUGINS[sig.slug];
      detected.set(sig.slug, {
        slug: sig.slug,
        name: known?.name ?? formatSlugAsName(sig.slug),
        wpOrgUrl: known?.wpOrgUrl ?? `https://wordpress.org/plugins/${sig.slug}/`,
        ourArticleUrl: known?.ourArticleUrl ?? null,
      });
    }
  }

  return [...detected.values()];
}

// ─── Hosting Detection ──────────────────────────────────────────────────────

export function detectHosting(
  headers: Record<string, string>,
): HostingInfo | null {
  return matchHosting(headers);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSlugAsName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
