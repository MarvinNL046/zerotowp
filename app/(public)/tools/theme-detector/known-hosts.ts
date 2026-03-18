import type { HostingInfo } from "./types";

type HostSignature = {
  header: string;
  value?: string | RegExp;
  provider: string;
  confidence: "high" | "medium";
  ourReviewUrl: string | null;
};

/**
 * HTTP header patterns that indicate a specific hosting provider or CDN.
 * Checked in order; first match wins.
 */
export const HOST_SIGNATURES: HostSignature[] = [
  // ── High-confidence matches (unique headers) ────────────────────────────
  {
    header: "x-kinsta-cache",
    provider: "Kinsta",
    confidence: "high",
    ourReviewUrl: "/managed-wordpress-hosting",
  },
  {
    header: "wpe-backend",
    provider: "WP Engine",
    confidence: "high",
    ourReviewUrl: "/managed-wordpress-hosting",
  },
  {
    header: "x-flywheel-cache",
    provider: "Flywheel",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-hacker",
    provider: "WordPress.com (Automattic)",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-pantheon-styx-hostname",
    provider: "Pantheon",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-pagely-id",
    provider: "Pagely",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-sucuri-id",
    provider: "Sucuri WAF",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-github-request-id",
    provider: "GitHub Pages",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-vercel-id",
    provider: "Vercel",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-netlify-request-id",
    provider: "Netlify",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-lw-cache",
    provider: "Liquid Web",
    confidence: "high",
    ourReviewUrl: null,
  },

  // ── Medium-confidence matches (shared/generic headers) ──────────────────
  {
    header: "server",
    value: /siteground/i,
    provider: "SiteGround",
    confidence: "medium",
    ourReviewUrl: "/siteground-review",
  },
  {
    header: "x-powered-by",
    value: /sg-optimizer/i,
    provider: "SiteGround",
    confidence: "medium",
    ourReviewUrl: "/siteground-review",
  },
  {
    header: "server",
    value: /cloudflare/i,
    provider: "Cloudflare (CDN/Proxy)",
    confidence: "medium",
    ourReviewUrl: "/setup-cloudflare-cdn-wordpress",
  },
  {
    header: "server",
    value: /automattic/i,
    provider: "WordPress.com (Automattic)",
    confidence: "high",
    ourReviewUrl: null,
  },
  {
    header: "x-powered-by",
    value: /bluehost/i,
    provider: "Bluehost",
    confidence: "medium",
    ourReviewUrl: "/bluehost-review",
  },
  {
    header: "server",
    value: /nginx.*godaddy|godaddy/i,
    provider: "GoDaddy",
    confidence: "medium",
    ourReviewUrl: null,
  },
  {
    header: "x-powered-by",
    value: /W3 Total Cache/i,
    provider: "Unknown (W3 Total Cache detected)",
    confidence: "medium",
    ourReviewUrl: null,
  },
];

/**
 * Detect hosting provider from HTTP response headers.
 * Returns the first matching provider or null.
 */
export function matchHosting(
  headers: Record<string, string>,
): HostingInfo | null {
  const normalised: Record<string, string> = {};
  for (const [key, val] of Object.entries(headers)) {
    normalised[key.toLowerCase()] = val;
  }

  for (const sig of HOST_SIGNATURES) {
    const headerVal = normalised[sig.header.toLowerCase()];
    if (headerVal === undefined) continue;

    if (sig.value === undefined) {
      // Header existence alone is the signal
      return {
        provider: sig.provider,
        confidence: sig.confidence,
        ourReviewUrl: sig.ourReviewUrl,
      };
    }

    if (sig.value instanceof RegExp) {
      if (sig.value.test(headerVal)) {
        return {
          provider: sig.provider,
          confidence: sig.confidence,
          ourReviewUrl: sig.ourReviewUrl,
        };
      }
    } else if (headerVal.toLowerCase().includes(sig.value.toLowerCase())) {
      return {
        provider: sig.provider,
        confidence: sig.confidence,
        ourReviewUrl: sig.ourReviewUrl,
      };
    }
  }

  return null;
}
