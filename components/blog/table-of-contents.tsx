interface Heading {
  level: 2 | 3;
  text: string;
  id: string;
}

export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "") // strip any inner HTML tags
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([23])[^>]*>([\s\S]*?)<\/h\2>/gi;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const level = parseInt(match[1], 10) as 2 | 3;
    // Strip inner HTML tags to get plain text
    const text = match[2].replace(/<[^>]+>/g, "").trim();
    if (text) {
      headings.push({ level, text, id: generateHeadingId(text) });
    }
  }

  return headings;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const headings = extractHeadings(content);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="border-l-4 border-orange-500 bg-slate-50 rounded p-5 mb-8"
    >
      <p className="text-lg font-bold text-slate-900 mb-3">In This Article</p>
      <ol className="space-y-1.5 text-sm">
        {headings.map((heading, index) => (
          <li
            key={index}
            className={heading.level === 3 ? "pl-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              className="text-slate-700 hover:text-orange-600 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
