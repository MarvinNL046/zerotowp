import Link from "next/link";
import RatingDisplay from "./rating-display";

interface ReviewCardProps {
  title: string;
  slug: string;
  productName: string;
  rating: number;
  excerpt: string;
  category: string;
  featuredImageUrl?: string;
}

export default function ReviewCard({ title, slug, productName, rating, excerpt, category, featuredImageUrl }: ReviewCardProps) {
  return (
    <Link href={`/${slug}`} className="group block h-full">
      <article className="h-full border border-slate-200 rounded-xl bg-white hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
        {/* Featured image */}
        {featuredImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={featuredImageUrl}
            alt={productName}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="h-44 w-full bg-gradient-to-br from-orange-100 to-amber-200" />
        )}

        <div className="p-6 flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="inline-block rounded-full bg-orange-100 border border-orange-200 px-3 py-0.5 text-xs font-semibold text-orange-700 capitalize">
              {category}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-500">{productName}</p>
          <RatingDisplay rating={rating} />
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-orange-500 transition-colors leading-snug">
            {title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{excerpt}</p>
          <span className="mt-auto text-sm font-semibold text-orange-500 group-hover:text-orange-600 transition-colors">
            Read Review &rarr;
          </span>
        </div>
      </article>
    </Link>
  );
}
