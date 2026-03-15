"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const STATUS_OPTIONS = ["draft", "published"];

interface PageFormState {
  title: string;
  slug: string;
  content: string;
  status: string;
}

const defaultForm: PageFormState = {
  title: "",
  slug: "",
  content: "",
  status: "draft",
};

export default function PagesAdminPage() {
  const pages = useQuery(api.pages.listAll);
  const createPage = useMutation(api.pages.create);
  const updatePage = useMutation(api.pages.update);
  const removePage = useMutation(api.pages.remove);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Doc<"pages"> | undefined>(
    undefined
  );
  const [form, setForm] = useState<PageFormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<Id<"pages"> | null>(null);

  function openNew() {
    setEditingPage(undefined);
    setForm(defaultForm);
    setError("");
    setDialogOpen(true);
  }

  function openEdit(page: Doc<"pages">) {
    setEditingPage(page);
    setForm({
      title: page.title,
      slug: page.slug,
      content: page.content,
      status: page.status,
    });
    setError("");
    setDialogOpen(true);
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }

    setSaving(true);
    try {
      if (editingPage) {
        await updatePage({
          id: editingPage._id,
          title: form.title.trim(),
          slug: form.slug.trim(),
          content: form.content,
          status: form.status,
        });
      } else {
        await createPage({
          title: form.title.trim(),
          slug: form.slug.trim(),
          content: form.content,
          status: form.status,
        });
      }
      setDialogOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save page.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: Id<"pages">) {
    if (!confirm("Delete this page?")) return;
    setDeletingId(id);
    try {
      await removePage({ id });
    } finally {
      setDeletingId(null);
    }
  }

  if (pages === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading pages...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pages</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          New Page
        </Button>
      </div>

      {pages.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No pages yet. Create your first page.
        </p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Title</th>
                <th className="text-left px-4 py-3 font-medium">Slug</th>
                <th className="text-left px-4 py-3 font-medium">Status</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pages.map((page: Doc<"pages">) => (
                <tr key={page._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{page.title}</td>
                  <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                    /{page.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        page.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEdit(page)}
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(page._id)}
                        disabled={deletingId === page._id}
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold">
                {editingPage ? "Edit Page" : "New Page"}
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

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="page-title">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="page-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Page title"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="page-slug">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  id="page-slug"
                  name="slug"
                  type="text"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="page-slug"
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 font-mono"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="page-status">
                  Status
                </label>
                <select
                  id="page-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium" htmlFor="page-content">
                  Content
                </label>
                <textarea
                  id="page-content"
                  name="content"
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Page content (HTML or markdown)..."
                  rows={8}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 resize-y font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : editingPage ? "Update Page" : "Create Page"}
                </Button>
              </div>
            </form>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
