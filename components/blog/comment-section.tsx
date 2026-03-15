"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import CommentList from "./comment-list";
import CommentForm from "./comment-form";

interface CommentSectionProps {
  postSlug: string;
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const comments = useQuery(api.comments.listApproved, { postSlug });
  const [replyTo, setReplyTo] = useState<{
    id: Id<"comments">;
    authorName: string;
  } | null>(null);

  const commentCount = comments?.length ?? 0;

  return (
    <section className="mt-12 pt-10 border-t border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-8">
        {commentCount > 0
          ? `${commentCount} Comment${commentCount !== 1 ? "s" : ""}`
          : "Leave A Reply"}
      </h2>

      {/* Comment list */}
      {comments !== undefined && (
        <CommentList comments={comments} onReply={setReplyTo} />
      )}

      {/* Comment form */}
      <div className={commentCount > 0 ? "mt-10" : ""}>
        {commentCount > 0 && (
          <h3 className="text-lg font-semibold text-slate-900 mb-5">
            Leave A Reply
          </h3>
        )}
        <CommentForm
          postSlug={postSlug}
          replyTo={replyTo}
          onCancelReply={() => setReplyTo(null)}
        />
      </div>
    </section>
  );
}
