"use client";

interface SeoPreviewProps {
  title: string;
  slug: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
  urlPrefix?: string;
}

export function SeoPreview({
  title,
  slug,
  description,
  seoTitle,
  seoDescription,
  urlPrefix = "/blog/",
}: SeoPreviewProps) {
  const displayTitle = seoTitle || title || "Post title will appear here";
  const rawDescription = seoDescription || description || "Your post description will appear here.";
  const displayDescription = rawDescription.slice(0, 160);
  const displayUrl = `zerotowp.com${urlPrefix}${slug || "post-slug"}`;

  return (
    <div className="rounded-lg border p-4 bg-white max-w-[600px]">
      <p className="text-xs text-muted-foreground mb-2 font-medium uppercase tracking-wide">
        Google Search Preview
      </p>
      <div className="space-y-1">
        <p className="text-sm text-green-700 truncate">{displayUrl}</p>
        <p className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight line-clamp-1 font-normal">
          {displayTitle}
        </p>
        <p className="text-sm text-[#545454] line-clamp-2">{displayDescription}</p>
      </div>
    </div>
  );
}
