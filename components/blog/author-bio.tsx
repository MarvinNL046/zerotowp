import Link from "next/link";

interface AuthorBioProps {
  authorName: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function AuthorBio({ authorName }: AuthorBioProps) {
  const initials = getInitials(authorName);

  return (
    <div className="bg-slate-50 rounded-xl p-6 flex items-start gap-4 mt-10">
      {/* Avatar */}
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
        <span className="text-orange-600 font-bold text-lg">{initials}</span>
      </div>

      {/* Bio text */}
      <div>
        <p className="font-bold text-slate-900 mb-1">Written by {authorName}</p>
        <p className="text-sm text-slate-600 mb-2">
          Our team tests and reviews WordPress products to help beginners make confident choices.
        </p>
        <Link
          href="/about"
          className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
        >
          Learn more about our team →
        </Link>
      </div>
    </div>
  );
}
