/**
 * Reserved slugs that cannot be used for content.
 * These conflict with static routes in the Next.js app.
 * Used by CMS validation to prevent routing collisions.
 */
export const RESERVED_SLUGS = [
  "blog",
  "deals",
  "wordpress-hosting",
  "wordpress-plugins",
  "wordpress-themes",
  "wordpress-seo",
  "wordpress-speed",
  "wordpress-security",
  "about",
  "contact",
  "start-here",
  "category",
  "how-we-test",
  "affiliate-disclosure",
  "recommended-stack",
  "editorial-policy",
  "admin",
  "sign-in",
  "sign-up",
  "api",
  "sitemap.xml",
] as const;

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.includes(slug as (typeof RESERVED_SLUGS)[number]);
}
