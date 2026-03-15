"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

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

  if (submitted) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-medium text-green-800">
          Thank you! Your comment is awaiting moderation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-3 text-sm text-green-700 underline hover:text-green-900"
        >
          Leave another comment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Policy notice */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 leading-relaxed">
        Thanks for choosing to leave a comment. Please keep in mind that all
        comments are moderated according to our comment policy, and your email
        address will <strong>NOT</strong> be published. Please Do{" "}
        <strong>NOT</strong> use keywords in the name field. Let&apos;s have a
        personal and meaningful conversation.
      </div>

      {/* Reply indicator */}
      {replyTo && (
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>
            Replying to <strong>{replyTo.authorName}</strong>
          </span>
          <button
            type="button"
            onClick={onCancelReply}
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Name and Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="comment-name" className="sr-only">
            Your Real Name
          </label>
          <input
            id="comment-name"
            type="text"
            placeholder="Your Real Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
        <div>
          <label htmlFor="comment-email" className="sr-only">
            Email Address
          </label>
          <input
            id="comment-email"
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20"
          />
        </div>
      </div>

      {/* Comment textarea */}
      <div>
        <label htmlFor="comment-content" className="sr-only">
          Your Comment
        </label>
        <textarea
          id="comment-content"
          placeholder="Your Comment..."
          required
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 resize-y"
        />
      </div>

      {/* Notify checkbox */}
      <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-600">
        <input
          type="checkbox"
          checked={notifyOnReply}
          onChange={(e) => setNotifyOnReply(e.target.checked)}
          className="rounded border-slate-300 text-orange-500 focus:ring-orange-400"
        />
        Notify me of followup comments via e-mail.
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
