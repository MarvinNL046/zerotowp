export type ScoredItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  type: "post" | "review";
  url: string;
  score: number;
};

type ContentItem = {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  clusterId?: string;
  category: string;
  tags: string[];
};

export function scoreRelatedContent(
  current: ContentItem,
  candidates: ContentItem[],
  manualRelated: string[],
  maxResults: number = 4,
): ScoredItem[] {
  return candidates
    .filter((c) => c._id !== current._id)
    .map((candidate) => {
      let score = 0;
      if (manualRelated.includes(candidate._id)) score += 100;
      if (current.clusterId && candidate.clusterId === current.clusterId) score += 50;
      if (candidate.category === current.category) score += 20;
      const sharedTags = candidate.tags.filter((t) => current.tags.includes(t));
      score += sharedTags.length * 10;
      return {
        id: candidate._id,
        slug: candidate.slug,
        title: candidate.title,
        excerpt: candidate.excerpt,
        type: "post" as const,
        url: `/${candidate.slug}`,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}
