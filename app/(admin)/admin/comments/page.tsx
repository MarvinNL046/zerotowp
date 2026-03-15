"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Check, Trash2, Clock, CheckCircle } from "lucide-react";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommentsAdminPage() {
  const comments = useQuery(api.comments.listAll);
  const approveComment = useMutation(api.comments.approve);
  const removeComment = useMutation(api.comments.remove);

  const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");
  const [loadingId, setLoadingId] = useState<Id<"comments"> | null>(null);

  async function handleApprove(id: Id<"comments">) {
    setLoadingId(id);
    try {
      await approveComment({ id });
    } finally {
      setLoadingId(null);
    }
  }

  async function handleDelete(id: Id<"comments">) {
    if (!confirm("Delete this comment permanently?")) return;
    setLoadingId(id);
    try {
      await removeComment({ id });
    } finally {
      setLoadingId(null);
    }
  }

  if (comments === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading comments...
      </div>
    );
  }

  const filtered =
    filter === "all"
      ? comments
      : comments.filter((c) => c.status === filter);

  const pendingCount = comments.filter((c) => c.status === "pending").length;
  const approvedCount = comments.filter((c) => c.status === "approved").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Comments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {comments.length} total &middot; {pendingCount} pending &middot;{" "}
            {approvedCount} approved
          </p>
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
            >
              {f === "pending" && <Clock className="h-3.5 w-3.5" />}
              {f === "approved" && <CheckCircle className="h-3.5 w-3.5" />}
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === "pending" && pendingCount > 0 && (
                <span className="ml-1 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {pendingCount}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No {filter !== "all" ? filter : ""} comments yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((comment) => (
            <div
              key={comment._id}
              className={`rounded-xl border p-4 ${
                comment.status === "pending"
                  ? "border-orange-200 bg-orange-50/50"
                  : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                      {comment.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </div>
                    <div>
                      <span className="font-medium text-sm">
                        {comment.authorName}
                      </span>
                      <span className="text-muted-foreground text-xs ml-2">
                        {comment.authorEmail}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        comment.status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {comment.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 mb-2 whitespace-pre-wrap">
                    {comment.content}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>on: /{comment.postSlug}</span>
                    <span>&middot;</span>
                    <span>{formatDate(comment.createdAt)}</span>
                    {comment.parentId && (
                      <>
                        <span>&middot;</span>
                        <span className="text-blue-600">reply</span>
                      </>
                    )}
                    {comment.notifyOnReply && (
                      <>
                        <span>&middot;</span>
                        <span>wants notifications</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  {comment.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(comment._id)}
                      disabled={loadingId === comment._id}
                    >
                      <Check className="h-3.5 w-3.5" />
                      Approve
                    </Button>
                  )}
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(comment._id)}
                    disabled={loadingId === comment._id}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
