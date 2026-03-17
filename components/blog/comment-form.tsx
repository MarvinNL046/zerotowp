"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CheckCircle, Loader2 } from "lucide-react";

interface CommentFormProps {
  postSlug: string;
  replyTo?: { id: Id<"comments">; authorName: string } | null;
  onCancelReply?: () => void;
}

export default function CommentForm({
  postSlug,
  replyTo,
  onCancelReply,
}: CommentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [notifyOnReply, setNotifyOnReply] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const createComment = useMutation(api.comments.create);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      await createComment({
        postSlug,
        parentId: replyTo?.id,
        authorName: name.trim(),
        authorEmail: email.trim(),
        content: content.trim(),
        notifyOnReply,
      });
      setSubmitted(true);
      setName("");
      setEmail("");
      setContent("");
      setNotifyOnReply(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Success state — micro-interaction with icon + message
  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
        <p className="font-semibold text-green-800 text-lg">
          Thank you!
        </p>
        <p className="text-sm text-green-600 mt-1">
          Your comment is awaiting moderation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-4 text-sm font-medium text-green-700 hover:text-green-900 transition-colors"
        >
          Leave another comment &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Policy notice */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-500 leading-relaxed">
        Thanks for choosing to leave a comment. All comments are moderated, and
        your email address will <strong className="text-slate-600">NOT</strong> be
        published. Please do <strong className="text-slate-600">NOT</strong> use
        keywords in the name field.
      </div>

      {/* Reply indicator */}
      {replyTo && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-600">
            Replying to <strong>{replyTo.authorName}</strong>
          </span>
          <button
            type="button"
            onClick={onCancelReply}
            className="text-orange-500 hover:text-orange-600 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Name and Email — side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="comment-name" className="block text-xs font-medium text-slate-500 mb-1.5">
            Your Real Name
          </label>
          <input
            id="comment-name"
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="comment-email" className="block text-xs font-medium text-slate-500 mb-1.5">
            Email Address
          </label>
          <input
            id="comment-email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 transition-all duration-200"
          />
        </div>
      </div>

      {/* Comment textarea */}
      <div>
        <label htmlFor="comment-content" className="block text-xs font-medium text-slate-500 mb-1.5">
          Your Comment
        </label>
        <textarea
          id="comment-content"
          placeholder="Share your thoughts..."
          required
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 resize-y transition-all duration-200"
        />
      </div>

      {/* Notify checkbox */}
      <label className="flex items-center gap-2.5 cursor-pointer text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <input
          type="checkbox"
          checked={notifyOnReply}
          onChange={(e) => setNotifyOnReply(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400 transition-colors"
        />
        Notify me of followup comments via e-mail
      </label>

      {/* Submit — proper button states: default, hover, active, disabled/loading */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 rounded-xl bg-[#f97316] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-500 hover:shadow-md hover:shadow-orange-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-200"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Posting...
          </>
        ) : (
          "Post Comment"
        )}
      </button>
    </form>
  );
}
