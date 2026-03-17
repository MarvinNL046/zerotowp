import Link from "next/link";

interface PostCardProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    publishedAt?: number;
    featuredImageUrl?: string;
  };
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/${post.slug}`} className="group block h-full">
      <article className="h-full flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 hover:border-orange-200">
        {/* Image — always present, adds pop and makes scanning easy */}
        <div className="relative overflow-hidden">
          {post.featuredImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.featuredImageUrl}
              alt={post.title}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-48 w-full bg-gradient-to-br from-orange-50 via-orange-100 to-amber-100" />
          )}
          {/* Category badge — overlaid on image for visual hierarchy */}
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-slate-700 capitalize shadow-sm">
            {post.category}
          </span>
        </div>

        {/* Content area — clear hierarchy: title > excerpt > date */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Title — largest, boldest element. Tight letter-spacing for pro look */}
          <h3 className="text-[15px] font-bold leading-snug tracking-tight text-slate-900 group-hover:text-[#f97316] transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt — smaller, muted, supporting text */}
          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          {/* Date — smallest, most muted. Anchors the bottom */}
          {post.publishedAt && (
            <time
              dateTime={new Date(post.publishedAt).toISOString()}
              className="text-xs text-slate-400 mt-auto pt-2 border-t border-slate-100"
            >
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>
      </article>
    </Link>
  );
}
