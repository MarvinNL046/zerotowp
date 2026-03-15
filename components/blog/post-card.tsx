import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5">
        {/* Featured image or placeholder gradient */}
        {post.featuredImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.featuredImageUrl}
            alt={post.title}
            className="h-44 w-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="h-44 w-full bg-gradient-to-br from-orange-100 to-amber-200 rounded-t-xl" />
        )}

        <CardHeader className="gap-2">
          {/* Category badge */}
          <span className="inline-block w-fit rounded-full bg-orange-100 border border-orange-200 px-3 py-0.5 text-xs font-semibold text-orange-700 capitalize">
            {post.category}
          </span>

          {/* Title */}
          <CardTitle className="text-base font-bold leading-snug group-hover:text-[#f97316] transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>

        {post.publishedAt && (
          <CardFooter>
            <time
              dateTime={new Date(post.publishedAt).toISOString()}
              className="text-xs text-muted-foreground"
            >
              {formatDate(post.publishedAt)}
            </time>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
