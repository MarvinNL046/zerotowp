"use client";

import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState(true);

  if (headings.length < 2) return null;

  // Number only the H2s
  let h2Counter = 0;

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Update URL hash without jumping
      window.history.pushState(null, "", `#${id}`);
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className="border-l-4 border-orange-500 bg-slate-50 rounded p-5 mb-8"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left"
        aria-expanded={isExpanded}
      >
        <span className="text-lg font-bold text-slate-900">In This Article</span>
        <svg
          className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <ol className="space-y-1.5 text-sm mt-3">
          {headings.map((heading, index) => {
            if (heading.level === 2) {
              h2Counter++;
            }
            return (
              <li
                key={index}
                className={heading.level === 3 ? "pl-8" : ""}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => handleClick(e, heading.id)}
                  className="text-slate-700 hover:text-orange-600 transition-colors"
                >
                  {heading.level === 2 && (
                    <span className="text-orange-500 font-medium mr-1.5">
                      {h2Counter}.
                    </span>
                  )}
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}
