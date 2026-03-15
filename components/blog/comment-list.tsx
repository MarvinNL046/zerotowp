"use client";

import { Id } from "@/convex/_generated/dataModel";

interface Comment {
  _id: Id<"comments">;
  postSlug: string;
  parentId?: Id<"comments">;
  authorName: string;
  content: string;
  createdAt: number;
}

interface CommentListProps {
  comments: Comment[];
  onReply: (comment: { id: Id<"comments">; authorName: string }) => void;
}

function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function CommentItem({
  comment,
  replies,
  onReply,
  isReply = false,
}: {
  comment: Comment;
  replies: Comment[];
  onReply: CommentListProps["onReply"];
  isReply?: boolean;
}) {
  return (
    <div className={isReply ? "ml-8 sm:ml-12 border-l-2 border-orange-200 pl-4 sm:pl-6" : ""}>
      <div className="flex gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-semibold">
          {getInitials(comment.authorName)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-slate-900 text-sm">
              {comment.authorName}
            </span>
            <span className="text-xs text-slate-400">
              {getRelativeTime(comment.createdAt)}
            </span>
          </div>

          {/* Content */}
          <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>

          {/* Reply button (only for top-level comments) */}
          {!isReply && (
            <button
              onClick={() =>
                onReply({ id: comment._id, authorName: comment.authorName })
              }
              className="mt-2 text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors"
            >
              Reply
            </button>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              replies={[]}
              onReply={onReply}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentList({ comments, onReply }: CommentListProps) {
  const topLevel = comments.filter((c) => !c.parentId);
  const repliesByParent = new Map<string, Comment[]>();

  for (const c of comments) {
    if (c.parentId) {
      const existing = repliesByParent.get(c.parentId) || [];
      existing.push(c);
      repliesByParent.set(c.parentId, existing);
    }
  }

  if (topLevel.length === 0) {
    return (
      <p className="text-sm text-slate-500 italic py-4">
        No comments yet. Be the first!
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {topLevel.map((comment) => (
        <div key={comment._id}>
          <CommentItem
            comment={comment}
            replies={repliesByParent.get(comment._id) || []}
            onReply={onReply}
          />
          <div className="mt-6 border-b border-slate-100" />
        </div>
      ))}
    </div>
  );
}
