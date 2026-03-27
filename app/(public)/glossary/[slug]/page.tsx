import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema-markup";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = await fetchQuery(api.glossary.getBySlug, { slug });

  if (!term) {
    return { title: "Term Not Found" };
  }

  // Truncate description to 155 chars max on word boundary
  let description = term.shortDefinition;
  if (description.length > 155) {
    description = description.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  }

  return {
    title: `What Is ${term.term}? — WordPress Glossary`,
    description,
    alternates: {
      canonical: `https://zerotowp.com/glossary/${slug}`,
    },
  };
}

function DefinedTermSchema({
  term,
  definition,
  slug,
}: {
  term: string;
  definition: string;
  slug: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term,
    description: definition,
    url: `https://zerotowp.com/glossary/${slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "WordPress Glossary",
      url: "https://zerotowp.com/glossary",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { slug } = await params;
  const term = await fetchQuery(api.glossary.getBySlug, { slug });

  if (!term) {
    notFound();
  }

  // Fetch related terms data
  const allTerms = term.relatedTerms.length > 0
    ? await fetchQuery(api.glossary.listAll, {})
    : [];
  const relatedTerms = allTerms.filter((t) =>
    term.relatedTerms.includes(t.slug)
  );

  // Fetch related articles data
  const allPosts = term.relatedArticles.length > 0
    ? await fetchQuery(api.posts.listPublished, {})
    : [];
  const relatedArticles = allPosts.filter((p: any) =>
    term.relatedArticles.includes(p.slug)
  );

  return (
    <>
      <DefinedTermSchema
        term={term.term}
        definition={term.shortDefinition}
        slug={term.slug}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zerotowp.com" },
          { name: "Glossary", url: "https://zerotowp.com/glossary" },
          { name: term.term },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Glossary", href: "/glossary" },
            { label: term.term },
          ]}
        />

        {/* Term heading */}
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          {term.term}
        </h1>

        {/* Short definition highlight box */}
        <div className="rounded-xl border-l-4 border-orange-400 bg-orange-50 p-6 mb-10">
          <p className="text-sm font-semibold text-orange-700 uppercase tracking-wider mb-1">
            Quick Definition
          </p>
          <p className="text-lg text-slate-800 leading-relaxed">
            {term.shortDefinition}
          </p>
        </div>

        {/* Full content */}
        <div
          className="prose prose-slate prose-headings:text-slate-900 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: term.content }}
        />

        {/* Related Terms */}
        {relatedTerms.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Related Terms
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedTerms.map((related) => (
                <Link
                  key={related._id}
                  href={`/glossary/${related.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-slate-900 group-hover:text-[#f97316] transition-colors">
                    {related.term}
                  </span>
                  <span className="text-sm text-slate-500 line-clamp-1">
                    {related.shortDefinition}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedArticles.map((article: any) => (
                <Link
                  key={article._id}
                  href={`/${article.slug}`}
                  className="group flex flex-col gap-1 rounded-xl border border-slate-200 bg-white p-4 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <span className="font-semibold text-slate-900 group-hover:text-[#f97316] transition-colors">
                    {article.title}
                  </span>
                  <span className="text-sm text-slate-500 line-clamp-2">
                    {article.excerpt}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to glossary */}
        <div className="pt-6 border-t border-slate-200">
          <Link
            href="/glossary"
            className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
          >
            &larr; Back to WordPress Glossary
          </Link>
        </div>
      </div>
    </>
  );
}
