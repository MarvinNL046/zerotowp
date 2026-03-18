import type { ThemeInfo, PluginInfo, HostingInfo, PlatformInfo } from "./types";
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

// ─── Platform Detection (non-WordPress) ────────────────────────────────────

const PLATFORM_SIGNATURES: Array<{
  name: string;
  slug: string;
  url: string;
  icon: string;
  description: string;
  patterns: RegExp[];
}> = [
  {
    name: "Shopify",
    slug: "shopify",
    url: "https://www.shopify.com/",
    icon: "🛒",
    description: "E-commerce platform for online stores. Not WordPress-based.",
    patterns: [/cdn\.shopify\.com/i, /Shopify\.theme/i, /myshopify\.com/i, /<meta[^>]+name=["']shopify/i],
  },
  {
    name: "Wix",
    slug: "wix",
    url: "https://www.wix.com/",
    icon: "🎨",
    description: "Website builder with drag-and-drop editor. Not WordPress-based.",
    patterns: [/wix\.com/i, /wixsite\.com/i, /X-Wix/i, /wix-code/i, /_wix_browser_sess/i],
  },
  {
    name: "Squarespace",
    slug: "squarespace",
    url: "https://www.squarespace.com/",
    icon: "◼️",
    description: "Website builder known for beautiful templates. Not WordPress-based.",
    patterns: [/squarespace\.com/i, /static\.squarespace/i, /sqsp/i, /<meta[^>]+generator["'][^>]*Squarespace/i],
  },
  {
    name: "Webflow",
    slug: "webflow",
    url: "https://webflow.com/",
    icon: "🌊",
    description: "Visual web design tool with CMS capabilities. Not WordPress-based.",
    patterns: [/webflow\.com/i, /assets\.website-files\.com/i, /<html[^>]+data-wf-domain/i],
  },
  {
    name: "Ghost",
    slug: "ghost",
    url: "https://ghost.org/",
    icon: "👻",
    description: "Open-source publishing platform focused on blogging. Not WordPress-based.",
    patterns: [/<meta[^>]+generator["'][^>]*Ghost/i, /ghost-(?:portal|search)/i, /content\/images\//i],
  },
  {
    name: "Drupal",
    slug: "drupal",
    url: "https://www.drupal.org/",
    icon: "💧",
    description: "Open-source CMS popular for enterprise sites. Not WordPress-based.",
    patterns: [/<meta[^>]+generator["'][^>]*Drupal/i, /sites\/default\/files/i, /drupal\.js/i],
  },
  {
    name: "Joomla",
    slug: "joomla",
    url: "https://www.joomla.org/",
    icon: "🔷",
    description: "Open-source CMS with a large extension ecosystem. Not WordPress-based.",
    patterns: [/<meta[^>]+generator["'][^>]*Joomla/i, /\/media\/jui\//i, /\/components\/com_/i],
  },
  {
    name: "HubSpot CMS",
    slug: "hubspot",
    url: "https://www.hubspot.com/products/cms",
    icon: "🟠",
    description: "Marketing-focused CMS by HubSpot. Not WordPress-based.",
    patterns: [/hs-scripts\.com/i, /hsforms\.com/i, /hubs\.ly/i, /<meta[^>]+generator["'][^>]*HubSpot/i],
  },
  {
    name: "Framer",
    slug: "framer",
    url: "https://www.framer.com/",
    icon: "🖼️",
    description: "Design-to-website tool with animations. Not WordPress-based.",
    patterns: [/framer\.com/i, /framerusercontent\.com/i, /<meta[^>]+generator["'][^>]*Framer/i],
  },
  {
    name: "Next.js",
    slug: "nextjs",
    url: "https://nextjs.org/",
    icon: "▲",
    description: "React framework for production websites. A developer tool, not a traditional CMS.",
    patterns: [/__next/i, /_next\/static/i, /<meta[^>]+generator["'][^>]*Next\.js/i],
  },
  {
    name: "Gatsby",
    slug: "gatsby",
    url: "https://www.gatsbyjs.com/",
    icon: "💜",
    description: "React-based static site generator. A developer tool, not a traditional CMS.",
    patterns: [/<meta[^>]+generator["'][^>]*Gatsby/i, /gatsby-image/i, /___gatsby/i],
  },
  {
    name: "Weebly",
    slug: "weebly",
    url: "https://www.weebly.com/",
    icon: "🔵",
    description: "Simple website builder by Square. Not WordPress-based.",
    patterns: [/weebly\.com/i, /editmysite\.com/i],
  },
  {
    name: "GoDaddy Website Builder",
    slug: "godaddy",
    url: "https://www.godaddy.com/websites/website-builder",
    icon: "🟢",
    description: "Website builder by GoDaddy. Not WordPress-based.",
    patterns: [/godaddysites\.com/i, /img\.secureserver\.net/i],
  },
];

export function detectPlatform(html: string, headers: Record<string, string>): PlatformInfo | null {
  const combined = html + " " + Object.entries(headers).map(([k, v]) => `${k}: ${v}`).join(" ");

  for (const platform of PLATFORM_SIGNATURES) {
    for (const pattern of platform.patterns) {
      if (pattern.test(combined)) {
        return {
          name: platform.name,
          slug: platform.slug,
          url: platform.url,
          icon: platform.icon,
          description: platform.description,
        };
      }
    }
  }

  return null;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatSlugAsName(slug: string): string {
  return slug
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
