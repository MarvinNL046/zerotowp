import Link from "next/link";

const CATEGORIES = [
  { label: "All", href: "/blog", value: undefined },
  { label: "Tutorials", href: "/blog?category=tutorials", value: "tutorials" },
  { label: "Beginner's Guide", href: "/blog?category=beginners-guide", value: "beginners-guide" },
  { label: "Plugins", href: "/blog?category=plugins", value: "plugins" },
  { label: "Themes", href: "/blog?category=themes", value: "themes" },
  { label: "Hosting", href: "/blog?category=hosting", value: "hosting" },
];

interface CategoryFilterProps {
  activeCategory?: string;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = cat.value === activeCategory || (cat.value === undefined && activeCategory === undefined);
        return (
          <Link
            key={cat.label}
            href={cat.href}
            className={
              isActive
                ? "px-4 py-2 rounded-full text-sm font-medium bg-orange-500 text-white"
                : "px-4 py-2 rounded-full text-sm font-medium border border-slate-300 text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
            }
          >
            {cat.label}
          </Link>
        );
      })}
    </div>
  );
}
