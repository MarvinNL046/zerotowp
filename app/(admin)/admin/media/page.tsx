"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

type MediaItem = Doc<"media"> & { url: string | null };
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MediaUpload } from "@/components/admin/media-upload";
import { Trash2, Copy, Check } from "lucide-react";

export default function MediaAdminPage() {
  const mediaItems = useQuery(api.media.list);
  const removeMedia = useMutation(api.media.remove);

  const [deletingId, setDeletingId] = useState<Id<"media"> | null>(null);
  const [copiedId, setCopiedId] = useState<Id<"media"> | null>(null);

  async function handleDelete(id: Id<"media">) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await removeMedia({ id });
    } finally {
      setDeletingId(null);
    }
  }

  async function handleCopyUrl(id: Id<"media">, url: string | null) {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  if (mediaItems === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading media...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {mediaItems.length} image{mediaItems.length !== 1 ? "s" : ""}
          </p>
        </div>
        <MediaUpload />
      </div>

      {mediaItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-border rounded-xl">
          <p className="text-muted-foreground mb-4">No images uploaded yet.</p>
          <MediaUpload />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mediaItems.map((item: MediaItem) => (
            <div
              key={item._id}
              className="group relative flex flex-col rounded-xl border border-border overflow-hidden bg-muted/30 hover:border-primary/50 transition-colors"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                {item.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.url}
                    alt={item.alt || item.filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                    No preview
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2 flex flex-col gap-1">
                <p
                  className="text-xs font-medium truncate"
                  title={item.filename}
                >
                  {item.filename}
                </p>
                {item.alt && (
                  <p
                    className="text-[10px] text-muted-foreground truncate"
                    title={item.alt}
                  >
                    {item.alt}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="px-2 pb-2 flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleCopyUrl(item._id, item.url)}
                  title="Copy URL"
                  className="flex-1"
                >
                  {copiedId === item._id ? (
                    <Check className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button
                  variant="destructive"
                  size="icon-sm"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  title="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
