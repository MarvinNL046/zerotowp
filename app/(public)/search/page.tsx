import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import SearchInput from "./search-input";

export const metadata: Metadata = {
  title: "Search",
  description: "Search WordPress tutorials, reviews, and guides on ZeroToWP.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  const results = query.length >= 2
    ? await fetchQuery(api.search.searchContent, { query, limit: 50 })
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Search</h1>

      <SearchInput initialQuery={query} />

      {query.length >= 2 && (
        <p className="text-sm text-slate-500 mb-8">
          {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
        </p>
      )}

      {query.length >= 2 && results.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-slate-500 mb-2">
            No results found for &ldquo;{query}&rdquo;
          </p>
          <p className="text-sm text-slate-400">
            Try a different search term or browse our{" "}
            <Link href="/blog" className="text-orange-600 hover:underline">
              articles
            </Link>{" "}
            and{" "}
            <Link href="/reviews" className="text-orange-600 hover:underline">
              reviews
            </Link>
            .
          </p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((result) => (
            <Link
              key={`${result.type}-${result.slug}`}
              href={`/${result.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-orange-200 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-orange-600">
                    {result.title}
                  </h2>
                  {result.excerpt && (
                    <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                      {result.excerpt}
                    </p>
                  )}
                </div>
                <span className="shrink-0 inline-flex items-center rounded-full bg-orange-100 border border-orange-200 px-2.5 py-0.5 text-xs font-semibold text-orange-700 capitalize">
                  {result.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {query.length > 0 && query.length < 2 && (
        <p className="text-sm text-slate-400 mt-4">
          Please enter at least 2 characters to search.
        </p>
      )}
    </div>
  );
}
