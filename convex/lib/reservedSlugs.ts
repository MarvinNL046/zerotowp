/**
 * Reserved slugs that cannot be used for content.
 * These conflict with static routes in the Next.js app.
 */
export const RESERVED_SLUGS = new Set([
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
  "sitemap",
]);

export function validateSlug(slug: string): void {
  if (RESERVED_SLUGS.has(slug)) {
    throw new Error(
      `The slug "${slug}" is reserved and cannot be used for content. ` +
        `It conflicts with a static route.`
    );
  }
}
