"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ReviewForm } from "@/components/admin/review-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface EditReviewPageProps {
  params: Promise<{ id: string }>;
}

function ExistingReviewEditor({ id }: { id: Id<"reviews"> }) {
  const review = useQuery(api.reviews.getById, { id });

  if (review === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading review...
      </div>
    );
  }

  if (review === null) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Review not found.
      </div>
    );
  }

  return <ReviewForm review={review} />;
}

export default function EditReviewPage({ params }: EditReviewPageProps) {
  const { id } = use(params);
  const isNew = id === "new";

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/admin/reviews" />}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Reviews
        </Button>
        <h1 className="text-2xl font-bold">
          {isNew ? "New Review" : "Edit Review"}
        </h1>
      </div>

      {isNew ? (
        <ReviewForm />
      ) : (
        <ExistingReviewEditor id={id as Id<"reviews">} />
      )}
    </div>
  );
}
