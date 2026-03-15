"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, X, ChevronDown, ChevronRight, FileText, Star } from "lucide-react";

interface ClusterFormState {
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
}

const defaultForm: ClusterFormState = {
  name: "",
  slug: "",
  description: "",
  sortOrder: 0,
};

function ClusterRow({
  cluster,
  onEdit,
  onDelete,
  deletingId,
}: {
  cluster: Doc<"clusters">;
  onEdit: (c: Doc<"clusters">) => void;
  onDelete: (id: Id<"clusters">) => void;
  deletingId: Id<"clusters"> | null;
}) {
  const [expanded, setExpanded] = useState(false);
  const content = useQuery(
    api.clusters.getWithContent,
    expanded ? { id: cluster._id } : "skip"
  );

  return (
    <>
      <tr className="hover:bg-muted/30 transition-colors">
        <td className="px-4 py-3">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors"
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 shrink-0" />
            ) : (
              <ChevronRight className="h-4 w-4 shrink-0" />
            )}
            {cluster.name}
          </button>
        </td>
        <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
          /{cluster.slug}
        </td>
        <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
          {cluster.description}
        </td>
        <td className="px-4 py-3 text-sm">{cluster.sortOrder}</td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onEdit(cluster)}
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="destructive"
              size="icon-sm"
              onClick={() => onDelete(cluster._id)}
              disabled={deletingId === cluster._id}
              title="Delete"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colSpan={5} className="px-4 pb-3 bg-muted/20">
            {content === undefined ? (
              <p className="text-xs text-muted-foreground py-2">Loading content...</p>
            ) : content === null ? (
              <p className="text-xs text-muted-foreground py-2">Cluster not found.</p>
            ) : (
              <div className="pt-2 pl-5 space-y-1">
                {content.posts.length === 0 && content.reviews.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No content in this cluster yet.</p>
                ) : (
                  <>
                    {content.posts.map((post: Doc<"posts">) => (
                      <div key={post._id} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3 shrink-0" />
                        <span className="font-medium text-foreground">{post.title}</span>
                        <span className="capitalize">({post.status})</span>
                        {post.clusterRole && (
                          <span className="bg-blue-100 text-blue-700 rounded px-1 py-0.5 text-[10px]">
                            {post.clusterRole}
                          </span>
                        )}
                      </div>
                    ))}
                    {content.reviews.map((review: Doc<"reviews">) => (
                      <div key={review._id} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 shrink-0" />
                        <span className="font-medium text-foreground">{review.title}</span>
                        <span className="capitalize">({review.status})</span>
                      </div>
                    ))}
                  </>
                )}
                <p className="text-[10px] text-muted-foreground pt-1">
                  {content.posts.length} post{content.posts.length !== 1 ? "s" : ""},{" "}
                  {content.reviews.length} review{content.reviews.length !== 1 ? "s" : ""}
                </p>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}

export default function ClustersAdminPage() {
  const clusters = useQuery(api.clusters.list);
  const createCluster = useMutation(api.clusters.create);
  const updateCluster = useMutation(api.clusters.update);
  const removeCluster = useMutation(api.clusters.remove);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCluster, setEditingCluster] = useState<Doc<"clusters"> | undefined>(undefined);
  const [form, setForm] = useState<ClusterFormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<Id<"clusters"> | null>(null);

  function openNew() {
    setEditingCluster(undefined);
    setForm(defaultForm);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(cluster: Doc<"clusters">) {
    setEditingCluster(cluster);
    setForm({
      name: cluster.name,
      slug: cluster.slug,
      description: cluster.description,
      sortOrder: cluster.sortOrder,
    });
    setError("");
    setDialogOpen(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value =
      e.target.name === "sortOrder" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.");
      return;
    }

    setSaving(true);
    try {
      if (editingCluster) {
        await updateCluster({
          id: editingCluster._id,
          name: form.name.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          sortOrder: Number(form.sortOrder),
        });
      } else {
        await createCluster({
          name: form.name.trim(),
          slug: form.slug.trim(),
          description: form.description.trim(),
          sortOrder: Number(form.sortOrder),
        });
      }
      setDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save cluster.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: Id<"clusters">) {
    if (!confirm("Delete this cluster? Posts/reviews in this cluster will lose their cluster assignment.")) return;
    setDeletingId(id);
    try {
      await removeCluster({ id });
    } finally {
      setDeletingId(null);
    }
  }

  if (clusters === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading clusters...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clusters</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          New Cluster
        </Button>
      </div>

      {clusters.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No clusters yet. Create your first content cluster.
        </p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Slug</th>
                <th className="text-left px-4 py-3 font-medium">Description</th>
                <th className="text-left px-4 py-3 font-medium">Sort</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {clusters.map((cluster: Doc<"clusters">) => (
                <ClusterRow
                  key={cluster._id}
                  cluster={cluster}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  deletingId={deletingId}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold">
                {editingCluster ? "Edit Cluster" : "New Cluster"}
              </Dialog.Title>
              <Dialog.Close
                className="rounded-lg p-1 hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="cluster-name">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cluster-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. WordPress Hosting"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium" htmlFor="cluster-slug">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cluster-slug"
                    name="slug"
                    type="text"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder="wordpress-hosting"
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 font-mono"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="cluster-description">
                  Description
                </label>
                <textarea
                  id="cluster-description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe this content cluster..."
                  rows={3}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="cluster-sort">
                  Sort Order
                </label>
                <input
                  id="cluster-sort"
                  name="sortOrder"
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={handleChange}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="submit" disabled={saving}>
                  {saving
                    ? "Saving..."
                    : editingCluster
                    ? "Update Cluster"
                    : "Create Cluster"}
                </Button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
