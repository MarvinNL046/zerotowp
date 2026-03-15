"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import DealCard from "./deal-card";

export default function DealsSidebar() {
  const deals = useQuery(api.deals.listActive);

  if (!deals || deals.length === 0) return null;

  const topDeals = deals.slice(0, 3);

  return (
    <aside className="flex flex-col gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Current Deals
      </h3>
      {topDeals.map((deal: Doc<"deals">) => (
        <DealCard
          key={deal._id}
          deal={{
            title: deal.title,
            provider: deal.provider,
            discountPercentage: deal.discountPercentage,
            couponCode: deal.couponCode,
            affiliateLink: deal.affiliateLink,
          }}
        />
      ))}
    </aside>
  );
}
