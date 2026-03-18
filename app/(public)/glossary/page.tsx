import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema-markup";

export const metadata: Metadata = {
  title: "WordPress Glossary — 50+ Terms Explained Simply",
  description:
    "A beginner-friendly glossary of WordPress terms. Clear, jargon-free definitions for every concept you will encounter while building your site.",
  alternates: { canonical: "https://zerotowp.com/glossary" },
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default async function GlossaryPage() {
  const terms = await fetchQuery(api.glossary.listAll, {});

  // Group terms by first letter
  const grouped: Record<string, Doc<"glossary">[]> = {};
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    if (!grouped[letter]) {
      grouped[letter] = [];
    }
    grouped[letter].push(term);
  }

  const activeLetters = new Set(Object.keys(grouped));

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zerotowp.com" },
          { name: "Glossary" },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Glossary" },
          ]}
        />

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            WordPress Glossary
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Clear, jargon-free definitions for every WordPress term you will
            encounter. Jump to a letter or scroll through the full list.
          </p>
        </div>

        {/* Sticky A-Z navigation */}
        <nav className="sticky top-16 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 -mx-4 px-4 py-3 mb-10">
          <div className="flex flex-wrap justify-center gap-1">
            {ALPHABET.map((letter) => {
              const isActive = activeLetters.has(letter);
              return isActive ? (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-semibold text-slate-700 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                >
                  {letter}
                </a>
              ) : (
                <span
                  key={letter}
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-semibold text-slate-300"
                >
                  {letter}
                </span>
              );
            })}
          </div>
        </nav>

        {/* Terms grouped by letter */}
        {terms.length > 0 ? (
          <div className="flex flex-col gap-12">
            {ALPHABET.filter((letter) => grouped[letter]).map((letter) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 border-b-2 border-orange-400 pb-2 mb-6 inline-block">
                  {letter}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grouped[letter].map((term) => (
                    <Link
                      key={term._id}
                      href={`/glossary/${term.slug}`}
                      className="group flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-5 hover:border-orange-300 hover:shadow-md transition-all"
                    >
                      <h3 className="font-semibold text-slate-900 group-hover:text-[#f97316] transition-colors">
                        {term.term}
                      </h3>
                      <p className="text-sm text-slate-500 leading-snug line-clamp-2">
                        {term.shortDefinition}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-16">
            Glossary terms coming soon!
          </p>
        )}
      </div>
    </>
  );
}
