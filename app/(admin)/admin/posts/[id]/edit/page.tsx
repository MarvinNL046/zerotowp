"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { PostForm } from "@/components/admin/post-form";

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;

  if (id === "new") {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">New Post</h1>
        <PostForm />
      </div>
    );
  }

  return <EditExistingPost id={id as Id<"posts">} />;
}

function EditExistingPost({ id }: { id: Id<"posts"> }) {
  const post = useQuery(api.posts.getById, { id });

  if (post === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading post...
      </div>
    );
  }

  if (post === null) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Post not found.
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
