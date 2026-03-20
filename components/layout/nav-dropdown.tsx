"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface DropdownLink {
  label: string;
  href: string;
  desc: string;
}

export default function NavDropdown({
  label,
  links,
}: {
  label: string;
  links: DropdownLink[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  function handleEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-slate-500 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 active:bg-slate-100 transition-all duration-150"
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        role="menu"
      >
        {links.map(({ label: linkLabel, href, desc }) => (
          <Link
            key={href}
            href={href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 hover:bg-slate-50 transition-colors"
          >
            <span className="block text-sm font-medium text-slate-900">
              {linkLabel}
            </span>
            <span className="block text-xs text-slate-500 mt-0.5">
              {desc}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
