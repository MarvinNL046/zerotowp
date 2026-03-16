import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import PostContent from "@/components/blog/post-content";
import ClusterNav from "@/components/seo/cluster-nav";
import LearningPath from "@/components/seo/learning-path";
import RatingDisplay from "@/components/reviews/rating-display";
import SocialShare from "@/components/blog/social-share";
import Sidebar from "@/components/layout/sidebar";
import Breadcrumbs from "@/components/seo/breadcrumbs";
import AuthorBio from "@/components/blog/author-bio";
import CommentSection from "@/components/blog/comment-section";
import TableOfContents from "@/components/blog/table-of-contents";
import RelatedContent from "@/components/seo/related-content";
import {
  ArticleSchema,
  ReviewSchema,
  BreadcrumbSchema,
} from "@/components/seo/schema-markup";

const categoryHubMap: Record<string, string> = {
  hosting: "/wordpress-hosting",
  plugins: "/wordpress-plugins",
  tutorials: "/start-here",
  "start-here": "/start-here",
  "beginners-guide": "/start-here",
};

function getCategoryHref(category: string): string {
  return categoryHubMap[category] ?? `/${category}`;
}

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getContent(slug: string) {
  const post = await fetchQuery(api.posts.getBySlug, { slug });
  if (post) return { type: "post" as const, data: post };

  const review = await fetchQuery(api.reviews.getBySlug, { slug });
  if (review) return { type: "review" as const, data: review };

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent(slug);

  if (!content) return { title: "Not Found" };

  const title = content.data.seoTitle || content.data.title;
  const description = content.data.seoDescription || content.data.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `https://zerotowp.com/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://zerotowp.com/${slug}`,
      type: "article",
      publishedTime: content.data.publishedAt
        ? new Date(content.data.publishedAt).toISOString()
        : undefined,
      modifiedTime: content.data.updatedAt
        ? new Date(content.data.updatedAt).toISOString()
        : undefined,
      images: [`/images/blog/${slug}.webp`],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [content, allPosts, allReviews] = await Promise.all([
    getContent(slug),
    fetchQuery(api.posts.listPublished, {}),
    fetchQuery(api.reviews.listPublished, {}),
  ]);

  if (!content) notFound();

  // Map to the shape RelatedContent expects
  const relatedPosts = allPosts.map((p) => ({
    _id: p._id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    clusterId: p.clusterId,
    category: p.category,
    tags: p.tags || [],
  }));

  const relatedReviews = allReviews.map((r) => ({
    _id: r._id,
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt || "",
    clusterId: r.clusterId,
    category: r.category,
    tags: r.tags || [],
  }));

  if (content.type === "review") {
    const review = content.data;
    const breadcrumbItems = [
      { label: "Home", href: "/" },
      { label: "Reviews", href: "/reviews" },
      { label: review.title },
    ];

    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ReviewSchema
          title={review.title}
          description={review.seoDescription || ""}
          slug={review.slug}
          publishedAt={review.publishedAt}
          updatedAt={review.updatedAt}
          authorName={review.authorName ?? "ZeroToWP"}
          rating={review.rating}
          productName={review.productName}
        />
        <BreadcrumbSchema
          items={[
            { name: "Home", url: "https://zerotowp.com" },
            { name: "Reviews", url: "https://zerotowp.com/reviews" },
            { name: review.title },
          ]}
        />
        <div className="flex gap-8">
          <article className="flex-1 min-w-0">
            <Breadcrumbs items={breadcrumbItems} />

            <header className="mb-8">
              <div className="flex items-center gap-3 mb-3 text-sm text-slate-500">
                <span className="inline-block rounded-full border border-orange-400 px-3 py-0.5 text-xs font-medium text-orange-500 capitalize">
                  {review.category}
                </span>
              </div>
              <p className="text-lg font-semibold text-slate-500 mb-1">{review.productName}</p>
              <h1 className="text-4xl font-bold text-slate-900 leading-tight mb-4">{review.title}</h1>
              <div className="flex items-center gap-3">
                <RatingDisplay rating={review.rating} />
                <span className="text-slate-500 text-sm">{review.rating} / 5</span>
              </div>
            </header>

            <SocialShare
              url={`https://zerotowp.com/${slug}`}
              title={review.title}
            />

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {review.pros.length > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                  <h2 className="font-semibold text-green-800 mb-3">Pros</h2>
                  <ul className="space-y-2">
                    {review.pros.map((pro: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-green-700">
                        <span className="mt-0.5 flex-shrink-0">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {review.cons.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h2 className="font-semibold text-red-800 mb-3">Cons</h2>
                  <ul className="space-y-2">
                    {review.cons.map((con: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                        <span className="mt-0.5 flex-shrink-0">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <TableOfContents content={review.content} />
            <PostContent content={review.content} />

            <AuthorBio authorName={review.authorName ?? "ZeroToWP Team"} />

            {/* Affiliate CTA */}
            <div className="mt-10 border border-orange-200 bg-orange-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 text-lg">
                  Ready to try {review.productName}?
                </p>
                {review.affiliateLabel && (
                  <p className="text-sm text-slate-600 mt-1">{review.affiliateLabel}</p>
                )}
              </div>
              <a
                href={review.affiliateLink}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="flex-shrink-0 inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-sm"
              >
                Get {review.productName} →
              </a>
            </div>

            {review.clusterId && (
              <ClusterNav clusterId={review.clusterId} currentSlug={review.slug} contentType="review" />
            )}

            <RelatedContent
              currentId={review._id}
              currentClusterId={review.clusterId}
              currentCategory={review.category}
              currentTags={review.tags || []}
              manualRelatedIds={[]}
              allPosts={relatedPosts}
              allReviews={relatedReviews}
            />

            <CommentSection postSlug={review.slug} />
          </article>

          <aside className="hidden lg:block w-80 shrink-0">
            <Sidebar />
          </aside>
        </div>
      </div>
    );
  }

  // Post rendering (including start-here guides)
  const post = content.data;
  const isStartHere = post.category === "start-here";

  const categoryLabel = isStartHere ? "Start Here" : formatCategoryLabel(post.category);
  const categoryHref = getCategoryHref(post.category);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryLabel, href: categoryHref },
    { label: post.title },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <ArticleSchema
        title={post.title}
        description={post.seoDescription || post.excerpt || ""}
        slug={post.slug}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        authorName={post.authorName || "ZeroToWP"}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://zerotowp.com" },
          { name: categoryLabel, url: `https://zerotowp.com${categoryHref}` },
          { name: post.title },
        ]}
      />
      <div className="flex gap-8">
        <article className="flex-1 min-w-0">
          <Breadcrumbs items={breadcrumbItems} />

          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4 text-sm text-slate-500">
              <span className="inline-block rounded-full border border-orange-400 px-3 py-0.5 text-xs font-medium text-orange-500 capitalize">
                {isStartHere ? "Start Here" : post.category}
              </span>
              {post.publishedAt && (
                <time dateTime={new Date(post.publishedAt).toISOString()}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              )}
              <span>by {post.authorName}</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">{post.title}</h1>
          </header>

          <SocialShare
            url={`https://zerotowp.com/${slug}`}
            title={post.title}
          />

          {isStartHere && post.clusterId && (
            <LearningPath clusterId={post.clusterId} currentSlug={post.slug} />
          )}

          <TableOfContents content={post.content} />
          <PostContent content={post.content} />

          {isStartHere && post.clusterId && (
            <LearningPath clusterId={post.clusterId} currentSlug={post.slug} />
          )}

          <AuthorBio authorName={post.authorName} />

          {post.clusterId && (
            <ClusterNav clusterId={post.clusterId} currentSlug={post.slug} contentType="post" />
          )}

          <RelatedContent
            currentId={post._id}
            currentClusterId={post.clusterId}
            currentCategory={post.category}
            currentTags={post.tags || []}
            manualRelatedIds={[]}
            allPosts={relatedPosts}
            allReviews={relatedReviews}
          />

          <CommentSection postSlug={post.slug} />
        </article>

        <aside className="hidden lg:block w-80 shrink-0">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
}
