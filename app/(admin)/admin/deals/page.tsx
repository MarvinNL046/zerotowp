"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { DealForm } from "@/components/admin/deal-form";
import { Pencil, Trash2, Plus, X } from "lucide-react";

export default function DealsAdminPage() {
  const deals = useQuery(api.deals.listAll);
  const removeDeal = useMutation(api.deals.remove);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDeal, setEditingDeal] = useState<Doc<"deals"> | undefined>(
    undefined
  );
  const [deletingId, setDeletingId] = useState<Id<"deals"> | null>(null);

  function openNew() {
    setEditingDeal(undefined);
    setDialogOpen(true);
  }

  function openEdit(deal: Doc<"deals">) {
    setEditingDeal(deal);
    setDialogOpen(true);
  }

  async function handleDelete(id: Id<"deals">) {
    if (!confirm("Delete this deal?")) return;
    setDeletingId(id);
    try {
      await removeDeal({ id });
    } finally {
      setDeletingId(null);
    }
  }

  if (deals === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading deals...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Deals</h1>
        <Button onClick={openNew}>
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </div>

      {deals.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No deals yet. Create your first deal.
        </p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Provider</th>
                <th className="text-left px-4 py-3 font-medium">Title</th>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-left px-4 py-3 font-medium">Discount %</th>
                <th className="text-left px-4 py-3 font-medium">Active</th>
                <th className="text-left px-4 py-3 font-medium">Sort</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deals.map((deal: Doc<"deals">) => (
                <tr key={deal._id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">{deal.provider}</td>
                  <td className="px-4 py-3 text-muted-foreground">{deal.title}</td>
                  <td className="px-4 py-3 capitalize">{deal.category}</td>
                  <td className="px-4 py-3">{deal.discountPercentage}%</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        deal.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {deal.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">{deal.sortOrder}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openEdit(deal)}
                        title="Edit"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(deal._id)}
                        disabled={deletingId === deal._id}
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
          <Dialog.Popup className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-lg font-semibold">
                {editingDeal ? "Edit Deal" : "New Deal"}
              </Dialog.Title>
              <Dialog.Close
                className="rounded-lg p-1 hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <DealForm
              deal={editingDeal}
              onSave={() => setDialogOpen(false)}
            />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
