import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import DealCard from "@/components/deals/deal-card";

export const metadata: Metadata = {
  title: "Deals",
  alternates: { canonical: "https://zerotowp.com/deals" },
};

export default async function DealsPage() {
  const deals = await fetchQuery(api.deals.listActive);

  // Group deals by category
  const grouped = deals.reduce<Record<string, Doc<"deals">[]>>((acc: Record<string, Doc<"deals">[]>, deal: Doc<"deals">) => {
    const key = deal.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(deal);
    return acc;
  }, {});

  const categories = Object.keys(grouped).sort();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Deals</h1>
        <p className="text-slate-600">The best discounts on WordPress hosting, plugins, and themes.</p>
      </div>

      {categories.length === 0 ? (
        <p className="text-slate-500 text-center py-16">No active deals right now. Check back soon!</p>
      ) : (
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category}>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 capitalize">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {grouped[category].map((deal: Doc<"deals">) => (
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
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
