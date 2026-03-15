const BASE_URL = "https://zerotowp.com";

// ─── ArticleSchema ────────────────────────────────────────────────────────────

interface ArticleSchemaProps {
  title: string;
  description: string;
  slug: string;
  publishedAt?: string | number;
  updatedAt?: string | number;
  authorName: string;
  image?: string;
}

export function ArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName,
  image,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}/${slug}`,
    image: image || `${BASE_URL}/images/blog/${slug}.webp`,
    ...(publishedAt && { datePublished: new Date(publishedAt).toISOString() }),
    ...(updatedAt && { dateModified: new Date(updatedAt).toISOString() }),
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "ZeroToWP",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── ReviewSchema ─────────────────────────────────────────────────────────────

interface ReviewSchemaProps extends ArticleSchemaProps {
  rating: number;
  productName: string;
}

export function ReviewSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  authorName,
  rating,
  productName,
}: ReviewSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    headline: title,
    description,
    url: `${BASE_URL}/${slug}`,
    ...(publishedAt && { datePublished: new Date(publishedAt).toISOString() }),
    ...(updatedAt && { dateModified: new Date(updatedAt).toISOString() }),
    author: { "@type": "Person", name: authorName },
    publisher: {
      "@type": "Organization",
      name: "ZeroToWP",
      url: BASE_URL,
    },
    itemReviewed: { "@type": "SoftwareApplication", name: productName },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── BreadcrumbSchema ─────────────────────────────────────────────────────────

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url?: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQSchema ────────────────────────────────────────────────────────────────

interface FAQSchemaProps {
  questions: Array<{ question: string; answer: string }>;
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebSiteSchema ────────────────────────────────────────────────────────────

export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ZeroToWP",
    url: BASE_URL,
    description:
      "Free step-by-step WordPress tutorials, hosting reviews, plugin guides, and SEO tips for beginners.",
    publisher: {
      "@type": "Organization",
      name: "ZeroToWP",
      url: BASE_URL,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
