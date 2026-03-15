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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SeoPreview } from "@/components/admin/seo-preview";
import { Plus, Trash2 } from "lucide-react";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

interface ReviewFormProps {
  review?: Doc<"reviews">;
}

export function ReviewForm({ review }: ReviewFormProps) {
  const router = useRouter();
  const { user } = useUser();

  const clusters = useQuery(api.clusters.list);

  const createReview = useMutation(api.reviews.create);
  const updateReview = useMutation(api.reviews.update);

  const [title, setTitle] = useState(review?.title ?? "");
  const [slug, setSlug] = useState(review?.slug ?? "");
  const [productName, setProductName] = useState(review?.productName ?? "");
  const [rating, setRating] = useState<number>(review?.rating ?? 5);
  const [pros, setPros] = useState<string[]>(review?.pros ?? [""]);
  const [cons, setCons] = useState<string[]>(review?.cons ?? [""]);
  const [affiliateLink, setAffiliateLink] = useState(review?.affiliateLink ?? "");
  const [affiliateLabel, setAffiliateLabel] = useState(review?.affiliateLabel ?? "");
  const [excerpt, setExcerpt] = useState(review?.excerpt ?? "");
  const [content, setContent] = useState(review?.content ?? "");
  const [category, setCategory] = useState(review?.category ?? "hosting");
  const [tags, setTags] = useState(review?.tags?.join(", ") ?? "");
  const [status, setStatus] = useState(review?.status ?? "draft");
  const [clusterId, setClusterId] = useState<string>(review?.clusterId ?? "");
  const [seoTitle, setSeoTitle] = useState(review?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(review?.seoDescription ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!review) {
      setSlug(slugify(value));
    }
  }

  // Pros handlers
  function addPro() {
    setPros([...pros, ""]);
  }
  function removePro(index: number) {
    setPros(pros.filter((_, i) => i !== index));
  }
  function updatePro(index: number, value: string) {
    setPros(pros.map((p, i) => (i === index ? value : p)));
  }

  // Cons handlers
  function addCon() {
    setCons([...cons, ""]);
  }
  function removeCon(index: number) {
    setCons(cons.filter((_, i) => i !== index));
  }
  function updateCon(index: number, value: string) {
    setCons(cons.map((c, i) => (i === index ? value : c)));
  }

  async function handleSave() {
    if (!user) return;

    const tagsArray = tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean);

    const filteredPros = pros.filter(Boolean);
    const filteredCons = cons.filter(Boolean);

    const payload = {
      title,
      slug,
      productName,
      rating,
      pros: filteredPros,
      cons: filteredCons,
      affiliateLink,
      affiliateLabel,
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
    };

    setSaving(true);
    setError(null);

    try {
      if (review) {
        await updateReview({ id: review._id, ...payload });
      } else {
        const newId = await createReview(payload);
        router.push(`/admin/reviews/${newId}/edit`);
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save review");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Title & Slug */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Review title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="review-slug"
          />
        </div>
      </div>

      {/* Product Name */}
      <div className="space-y-2">
        <Label htmlFor="productName">Product Name</Label>
        <Input
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g. Bluehost"
        />
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label htmlFor="rating">Rating (1–5)</Label>
        <Input
          id="rating"
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-24"
        />
      </div>

      {/* Pros */}
      <div className="space-y-2">
        <Label>Pros</Label>
        <div className="space-y-2">
          {pros.map((pro, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={pro}
                onChange={(e) => updatePro(i, e.target.value)}
                placeholder={`Pro ${i + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePro(i)}
                disabled={pros.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addPro}>
          <Plus className="h-4 w-4 mr-1" />
          Add Pro
        </Button>
      </div>

      {/* Cons */}
      <div className="space-y-2">
        <Label>Cons</Label>
        <div className="space-y-2">
          {cons.map((con, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={con}
                onChange={(e) => updateCon(i, e.target.value)}
                placeholder={`Con ${i + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeCon(i)}
                disabled={cons.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addCon}>
          <Plus className="h-4 w-4 mr-1" />
          Add Con
        </Button>
      </div>

      {/* Affiliate */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="affiliateLink">Affiliate Link</Label>
          <Input
            id="affiliateLink"
            value={affiliateLink}
            onChange={(e) => setAffiliateLink(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="affiliateLabel">Affiliate Label</Label>
          <Input
            id="affiliateLabel"
            value={affiliateLabel}
            onChange={(e) => setAffiliateLabel(e.target.value)}
            placeholder="e.g. Get Bluehost"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary of the review..."
          rows={3}
        />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <Label htmlFor="content">Content (HTML)</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="<p>Full review content...</p>"
          rows={12}
          className="font-mono text-sm"
        />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(value) => {
            if (value) setCategory(value);
          }}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hosting">Hosting</SelectItem>
            <SelectItem value="plugins">Plugins</SelectItem>
            <SelectItem value="themes">Themes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="wordpress, hosting, review"
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={status}
          onValueChange={(value) => {
            if (value) setStatus(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cluster */}
      <div className="space-y-2">
        <Label>Cluster (optional)</Label>
        <Select
          value={clusterId}
          onValueChange={(value) => setClusterId(value ?? "")}
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

      {/* SEO */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">SEO</h3>
        <div className="space-y-2">
          <Label htmlFor="seoTitle">SEO Title</Label>
          <Input
            id="seoTitle"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            placeholder={title || "SEO title override"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="seoDescription">SEO Description</Label>
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
          description={excerpt}
          slug={slug}
          seoTitle={seoTitle}
          seoDescription={seoDescription}
          urlPrefix="/reviews/"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
          {error}
        </p>
      )}

      {/* Save */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : review ? "Update Review" : "Create Review"}
        </Button>
      </div>
    </div>
  );
}
