"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface LearningPathProps {
  clusterId: string;
  currentSlug: string;
}

export default function LearningPath({ clusterId, currentSlug }: LearningPathProps) {
  const posts = useQuery(api.posts.getByCluster, {
    clusterId: clusterId as Id<"clusters">,
  });

  if (!posts) return null;

  const steps = posts
    .filter((p: { category: string }) => p.category === "start-here")
    .sort(
      (a: { learningPathOrder?: number }, b: { learningPathOrder?: number }) =>
        (a.learningPathOrder ?? 0) - (b.learningPathOrder ?? 0),
    );

  if (steps.length === 0) return null;

  const currentIndex = steps.findIndex(
    (s: { slug: string }) => s.slug === currentSlug,
  );

  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const nextStep = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  return (
    <div className="border border-orange-200 rounded-xl p-6 mb-8">
      {/* Step indicators */}
      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        {steps.map(
          (step: { slug: string; title: string; learningPathOrder?: number }, index: number) => {
            const isCurrent = step.slug === currentSlug;
            const stepNumber = index + 1;

            return (
              <span key={step.slug} className="flex items-center gap-2">
                {index > 0 && <span className="text-slate-400">→</span>}
                {isCurrent ? (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1 font-semibold text-white">
                    <span>Step {stepNumber}</span>
                  </span>
                ) : (
                  <Link
                    href={`/${step.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1 text-slate-600 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                  >
                    Step {stepNumber}
                  </Link>
                )}
              </span>
            );
          },
        )}
      </div>

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between gap-4">
        <div>
          {prevStep && (
            <Link
              href={`/${prevStep.slug}`}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 hover:underline"
            >
              ← Previous: {prevStep.title}
            </Link>
          )}
        </div>
        <div>
          {nextStep && (
            <Link
              href={`/${nextStep.slug}`}
              className="text-sm font-medium text-slate-600 hover:text-orange-600 hover:underline"
            >
              Next: {nextStep.title} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
