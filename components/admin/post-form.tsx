"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SeoPreview } from "@/components/admin/seo-preview";
import { EditorRoot, EditorContent } from "novel";
import { toast } from "sonner";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface PostFormProps {
  post?: Doc<"posts">;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { user } = useUser();

  const clusters = useQuery(api.clusters.list);
  const createPost = useMutation(api.posts.create);
  const updatePost = useMutation(api.posts.update);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [category, setCategory] = useState(post?.category ?? "tutorials");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState(post?.status ?? "draft");
  const [content, setContent] = useState(post?.content ?? "");
  const [clusterId, setClusterId] = useState<string>(post?.clusterId ?? "");
  const [clusterRole, setClusterRole] = useState(post?.clusterRole ?? "");
  const [learningPathOrder, setLearningPathOrder] = useState<number | "">(
    post?.learningPathOrder ?? ""
  );
  const [seoTitle, setSeoTitle] = useState(post?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(
    post?.seoDescription ?? ""
  );
  const [saving, setSaving] = useState(false);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!post) {
      setSlug(slugify(value));
    }
  }

  async function handleSave() {
    if (!user) {
      toast.error("You must be signed in to save a post.");
      return;
    }

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug,
      excerpt,
      content,
      category,
      tags: tagsArray,
      status,
      author: user.id,
      authorName: user.fullName ?? user.username ?? user.id,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      clusterId: clusterId ? (clusterId as Id<"clusters">) : undefined,
      clusterRole: clusterId && clusterRole ? clusterRole : undefined,
      learningPathOrder:
        category === "start-here" && learningPathOrder !== ""
          ? Number(learningPathOrder)
          : undefined,
    };

    setSaving(true);

    try {
      if (post) {
        await updatePost({ id: post._id, ...payload });
        toast.success("Post updated successfully.");
      } else {
        const newId = await createPost(payload);
        toast.success("Post created successfully.");
        router.push(`/admin/posts/${newId}/edit`);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save post.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Title & Slug */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="post-slug"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short summary of the post..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Taxonomy */}
      <Card>
        <CardHeader>
          <CardTitle>Taxonomy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => { if (v !== null) setCategory(v); }}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tutorials">Tutorials</SelectItem>
                <SelectItem value="beginners-guide">Beginners Guide</SelectItem>
                <SelectItem value="plugins">Plugins</SelectItem>
                <SelectItem value="themes">Themes</SelectItem>
                <SelectItem value="hosting">Hosting</SelectItem>
                <SelectItem value="start-here">Start Here</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="wordpress, tutorial, plugins"
            />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={(v) => { if (v !== null) setStatus(v); }}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {category === "start-here" && (
            <div className="space-y-2">
              <Label htmlFor="learningPathOrder">Learning Path Order</Label>
              <Input
                id="learningPathOrder"
                type="number"
                min={1}
                value={learningPathOrder}
                onChange={(e) =>
                  setLearningPathOrder(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="1"
                className="w-24"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Novel editor — outputs HTML via editor.getHTML() */}
          <div className="border rounded-md min-h-[300px]">
            <EditorRoot>
              <EditorContent
                className="prose prose-sm max-w-none p-4 min-h-[300px] focus:outline-none"
                initialContent={
                  post?.content
                    ? undefined // JSON initialContent not supported for HTML; see fallback below
                    : undefined
                }
                onUpdate={({ editor }) => {
                  setContent(editor.getHTML());
                }}
              />
            </EditorRoot>
          </div>
          {/* Fallback textarea for pasting/editing raw HTML when needed */}
          <div className="mt-4 space-y-2">
            <Label htmlFor="contentHtml">Raw HTML (optional override)</Label>
            <Textarea
              id="contentHtml"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="<p>Post content HTML...</p>"
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Cluster */}
      <Card>
        <CardHeader>
          <CardTitle>Cluster</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Cluster (optional)</Label>
            <Select
              value={clusterId}
              onValueChange={(v) => {
                setClusterId(v ?? "");
                if (!v) setClusterRole("");
              }}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder="No cluster" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No cluster</SelectItem>
                {clusters?.map((c: Doc<"clusters">) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {clusterId && (
            <div className="space-y-2">
              <Label>Cluster Role</Label>
              <Select value={clusterRole} onValueChange={(v) => { if (v !== null) setClusterRole(v); }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pillar">Pillar</SelectItem>
                  <SelectItem value="supporting">Supporting</SelectItem>
                  <SelectItem value="related">Related</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader>
          <CardTitle>SEO</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="seoTitle">SEO Title (optional)</Label>
            <Input
              id="seoTitle"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder={title || "SEO title override"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="seoDescription">SEO Description (optional)</Label>
            <Textarea
              id="seoDescription"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder={excerpt || "SEO description override"}
              rows={3}
            />
          </div>
          <SeoPreview
            title={title}
            slug={slug}
            description={excerpt}
            seoTitle={seoTitle || undefined}
            seoDescription={seoDescription || undefined}
          />
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </div>
  );
}
