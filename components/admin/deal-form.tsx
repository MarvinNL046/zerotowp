"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";

interface DealFormProps {
  deal?: Doc<"deals">;
  onSave: () => void;
}

const CATEGORIES = [
  { value: "hosting", label: "Hosting" },
  { value: "plugins", label: "Plugins" },
  { value: "themes", label: "Themes" },
];

export function DealForm({ deal, onSave }: DealFormProps) {
  const createDeal = useMutation(api.deals.create);
  const updateDeal = useMutation(api.deals.update);

  const [title, setTitle] = useState(deal?.title ?? "");
  const [description, setDescription] = useState(deal?.description ?? "");
  const [provider, setProvider] = useState(deal?.provider ?? "");
  const [category, setCategory] = useState(deal?.category ?? "hosting");
  const [discountPercentage, setDiscountPercentage] = useState(
    deal?.discountPercentage ?? 0
  );
  const [couponCode, setCouponCode] = useState(deal?.couponCode ?? "");
  const [affiliateLink, setAffiliateLink] = useState(deal?.affiliateLink ?? "");
  const [isActive, setIsActive] = useState(deal?.isActive ?? true);
  const [sortOrder, setSortOrder] = useState(deal?.sortOrder ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !provider.trim() || !affiliateLink.trim()) {
      setError("Title, provider, and affiliate link are required.");
      return;
    }

    setSaving(true);
    try {
      if (deal) {
        await updateDeal({
          id: deal._id,
          title: title.trim(),
          description: description.trim(),
          provider: provider.trim(),
          category,
          discountPercentage: Number(discountPercentage),
          couponCode: couponCode.trim() || undefined,
          affiliateLink: affiliateLink.trim(),
          isActive,
          sortOrder: Number(sortOrder),
        });
      } else {
        await createDeal({
          title: title.trim(),
          description: description.trim(),
          provider: provider.trim(),
          category,
          discountPercentage: Number(discountPercentage),
          couponCode: couponCode.trim() || undefined,
          affiliateLink: affiliateLink.trim(),
          isActive,
          sortOrder: Number(sortOrder),
        });
      }
      onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save deal.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="deal-title">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="deal-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 70% off SiteGround"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="deal-provider">
            Provider <span className="text-red-500">*</span>
          </label>
          <input
            id="deal-provider"
            type="text"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="e.g. SiteGround"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="deal-description">
          Description
        </label>
        <textarea
          id="deal-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description of the deal..."
          rows={2}
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="deal-category">
            Category
          </label>
          <select
            id="deal-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="deal-discount">
            Discount %
          </label>
          <input
            id="deal-discount"
            type="number"
            min={0}
            max={100}
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="deal-coupon">
            Coupon Code <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            id="deal-coupon"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="e.g. SAVE70"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium" htmlFor="deal-sort">
            Sort Order
          </label>
          <input
            id="deal-sort"
            type="number"
            min={0}
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="deal-link">
          Affiliate Link <span className="text-red-500">*</span>
        </label>
        <input
          id="deal-link"
          type="url"
          value={affiliateLink}
          onChange={(e) => setAffiliateLink(e.target.value)}
          placeholder="https://..."
          className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={isActive}
          onClick={() => setIsActive((v) => !v)}
          className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-ring/50 ${
            isActive ? "bg-primary" : "bg-muted"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform ${
              isActive ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
        <label className="text-sm font-medium">Active</label>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : deal ? "Update Deal" : "Create Deal"}
        </Button>
      </div>
    </form>
  );
}
