import Link from "next/link";
import { scoreRelatedContent, ScoredItem } from "@/lib/related-content-scorer";

interface ContentItem {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  clusterId?: string;
  category: string;
  tags: string[];
}

interface RelatedContentProps {
  currentId: string;
  currentClusterId?: string;
  currentCategory: string;
  currentTags: string[];
  manualRelatedIds: string[];
  allPosts: ContentItem[];
  allReviews: ContentItem[];
}

export default function RelatedContent({
  currentId,
  currentClusterId,
  currentCategory,
  currentTags,
  manualRelatedIds,
  allPosts,
  allReviews,
}: RelatedContentProps) {
  const current: ContentItem = {
    _id: currentId,
    slug: "",
    title: "",
    excerpt: "",
    clusterId: currentClusterId,
    category: currentCategory,
    tags: currentTags,
  };

  const allCandidates = [...allPosts, ...allReviews];
  const related = scoreRelatedContent(current, allCandidates, manualRelatedIds, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold text-slate-800 mb-6">You might also like</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {related.map((item: ScoredItem) => (
          <Link
            key={item.id}
            href={item.url}
            className="block rounded-xl border border-slate-200 p-5 hover:border-orange-300 hover:shadow-sm transition-all"
          >
            <span className="inline-block rounded-full border border-orange-400 px-2.5 py-0.5 text-xs font-medium text-orange-500 capitalize mb-2">
              {item.type}
            </span>
            <h3 className="font-semibold text-slate-900 leading-snug mb-1">{item.title}</h3>
            <p className="text-sm text-slate-500 line-clamp-2">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
