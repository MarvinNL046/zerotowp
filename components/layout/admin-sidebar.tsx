"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FileText,
  Star,
  Tag,
  File,
  Network,
  Users,
  Image,
  MessageSquare,
} from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/deals", label: "Deals", icon: Tag },
  { href: "/admin/pages", label: "Pages", icon: File },
  { href: "/admin/clusters", label: "Clusters", icon: Network },
  { href: "/admin/comments", label: "Comments", icon: MessageSquare },
  { href: "/admin/subscribers", label: "Subscribers", icon: Users },
  { href: "/admin/media", label: "Media", icon: Image },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-[240px] min-h-screen border-l bg-muted/50 fixed left-0 top-0 h-full">
      <div className="p-4 border-b">
        <span className="text-lg font-bold">ZTW Admin</span>
      </div>
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`inline-flex h-8 w-full items-center justify-start gap-2 rounded-lg px-2.5 text-sm font-medium transition-all hover:bg-muted hover:text-foreground${isActive ? " bg-accent text-accent-foreground" : ""}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <UserButton />
      </div>
    </aside>
  );
}
