"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Trash2, Download } from "lucide-react";

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function SubscribersAdminPage() {
  const subscribers = useQuery(api.subscribers.list);
  const removeSubscriber = useMutation(api.subscribers.remove);

  const [deletingId, setDeletingId] = useState<Id<"subscribers"> | null>(null);

  async function handleDelete(id: Id<"subscribers">) {
    if (!confirm("Remove this subscriber?")) return;
    setDeletingId(id);
    try {
      await removeSubscriber({ id });
    } finally {
      setDeletingId(null);
    }
  }

  function handleExportCSV() {
    if (!subscribers || subscribers.length === 0) return;

    const headers = ["Email", "Date", "Source"];
    const rows = subscribers.map((s: Doc<"subscribers">) => [
      s.email,
      formatDate(s.subscribedAt),
      s.source,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row: string[]) =>
        row
          .map((cell: string) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (subscribers === undefined) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground">
        Loading subscribers...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Subscribers</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {subscribers.length} total subscriber{subscribers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleExportCSV}
          disabled={subscribers.length === 0}
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {subscribers.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">
          No subscribers yet.
        </p>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Date</th>
                <th className="text-left px-4 py-3 font-medium">Source</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((subscriber: Doc<"subscribers">) => (
                <tr
                  key={subscriber._id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">{subscriber.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(subscriber.subscribedAt)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {subscriber.source}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end">
                      <Button
                        variant="destructive"
                        size="icon-sm"
                        onClick={() => handleDelete(subscriber._id)}
                        disabled={deletingId === subscriber._id}
                        title="Remove subscriber"
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
    </div>
  );
}
