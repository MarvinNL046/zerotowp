import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import ReviewCard from "@/components/reviews/review-card";

export const metadata: Metadata = {
  title: "Reviews — ZeroToWP",
  alternates: { canonical: "https://zerotowp.com/reviews" },
};

const reviewImageMap: Record<string, string> = {
  "siteground-review": "/screenshots/siteground-wordpress-hosting.webp",
  "bluehost-review": "/screenshots/bluehost-wordpress-hosting.webp",
  "hostinger-review": "/screenshots/hostinger-wordpress-hosting.webp",
};

const CATEGORIES = [
  { label: "All", value: undefined, href: "/reviews" },
  { label: "Hosting", value: "hosting", href: "/reviews?category=hosting" },
  { label: "Plugins", value: "plugins", href: "/reviews?category=plugins" },
  { label: "Themes", value: "themes", href: "/reviews?category=themes" },
];

export default async function ReviewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const reviews = await fetchQuery(api.reviews.listPublished, { category });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Reviews</h1>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = cat.value === category || (cat.value === undefined && category === undefined);
            return (
              <Link
                key={cat.label}
                href={cat.href}
                className={
                  isActive
                    ? "px-4 py-2 rounded-full text-sm font-medium bg-orange-500 text-white"
                    : "px-4 py-2 rounded-full text-sm font-medium border border-slate-300 text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                }
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-slate-500 text-center py-16">No reviews found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review: Doc<"reviews">) => (
            <ReviewCard
              key={review._id}
              title={review.title}
              slug={review.slug}
              productName={review.productName}
              rating={review.rating}
              excerpt={review.excerpt}
              category={review.category}
              featuredImageUrl={reviewImageMap[review.slug]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
