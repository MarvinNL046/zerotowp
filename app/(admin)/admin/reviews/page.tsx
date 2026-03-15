"use client";

import Link from "next/link";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

function RatingStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-muted-foreground">{rating}/5</span>
    </span>
  );
}

export default function AdminReviewsPage() {
  const reviews = useQuery(api.reviews.listAll);
  const removeReview = useMutation(api.reviews.remove);

  async function handleDelete(id: Id<"reviews">) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    await removeReview({ id });
  }

  if (reviews === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading reviews...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reviews</h1>
        <Button render={<Link href="/admin/reviews/new/edit" />}>
          <Plus className="h-4 w-4 mr-2" />
          New Review
        </Button>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No reviews yet.</p>
          <div className="mt-4">
            <Button
              variant="outline"
              render={<Link href="/admin/reviews/new/edit" />}
            >
              Create your first review
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review: Doc<"reviews">) => (
                <TableRow key={review._id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{review.productName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {review.title}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <RatingStars rating={review.rating} />
                  </TableCell>
                  <TableCell>
                    <span className="capitalize">{review.category}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        review.status === "published" ? "default" : "secondary"
                      }
                    >
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {review.publishedAt
                      ? new Date(review.publishedAt).toLocaleDateString()
                      : new Date(review.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        render={
                          <Link href={`/admin/reviews/${review._id}/edit`} />
                        }
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
