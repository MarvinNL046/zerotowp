import { generateHeadingId } from "./table-of-contents";

interface PostContentProps {
  content: string;
}

function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, inner) => {
    // If the tag already has an id attribute, leave it as-is
    if (/\bid\s*=/i.test(attrs)) return match;
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = generateHeadingId(text);
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}

export default function PostContent({ content }: PostContentProps) {
  const processedContent = addHeadingIds(content);

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-orange-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md prose-img:border prose-img:border-slate-200 prose-strong:text-slate-900 prose-li:marker:text-orange-500"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
}
