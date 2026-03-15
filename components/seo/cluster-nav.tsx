"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface ClusterNavProps {
  clusterId: string;
  currentSlug: string;
  contentType: "post" | "review";
}

export default function ClusterNav({ clusterId, currentSlug, contentType }: ClusterNavProps) {
  const data = useQuery(api.clusters.getWithContent, {
    id: clusterId as Id<"clusters">,
  });

  if (!data) return null;

  const { cluster, posts, reviews } = data;
  const siblings = contentType === "post" ? posts : reviews;

  if (siblings.length <= 1) return null;

  // Find the pillar post in the posts list if pillarPostId is set
  const pillarPost =
    cluster.pillarPostId != null
      ? posts.find((p: { _id: string; title: string; slug: string }) => p._id === cluster.pillarPostId)
      : null;

  return (
    <section className="bg-orange-50 rounded-xl p-6 mt-10">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">More in this series</h2>

      {pillarPost && contentType === "post" && pillarPost.slug !== currentSlug && (
        <div className="mb-4">
          <Link
            href={`/${pillarPost.slug}`}
            className="text-sm font-medium text-orange-600 hover:text-orange-700 hover:underline"
          >
            ← Main Guide: {pillarPost.title}
          </Link>
        </div>
      )}

      <ul className="space-y-2">
        {siblings.map((item: { _id: string; slug: string; title: string }) => {
          const isCurrent = item.slug === currentSlug;
          const href = `/${item.slug}`;

          return (
            <li key={item._id} className="text-sm">
              {isCurrent ? (
                <span className="font-bold text-slate-900">{item.title}</span>
              ) : (
                <Link
                  href={href}
                  className="text-orange-600 hover:text-orange-700 hover:underline"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
