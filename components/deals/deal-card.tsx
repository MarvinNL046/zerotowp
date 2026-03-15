import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DealCardProps {
  deal: {
    title: string;
    provider: string;
    discountPercentage: number;
    couponCode?: string;
    affiliateLink: string;
    logoUrl?: string;
  };
}

export default function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5">
      <CardHeader className="gap-3">
        {/* Provider name */}
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {deal.provider}
        </p>

        {/* Discount badge + optional logo */}
        <div className="flex items-center gap-3">
          {deal.logoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={deal.logoUrl}
              alt={`${deal.provider} logo`}
              className="h-8 w-8 rounded object-contain"
            />
          )}
          <span className="inline-block rounded-lg bg-[#f97316] px-3 py-1 text-2xl font-extrabold text-white shadow-sm">
            {deal.discountPercentage}% OFF
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold leading-snug text-slate-900">{deal.title}</h3>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1 justify-between">
        {/* Coupon code */}
        {deal.couponCode && (
          <div className="rounded-lg border border-dashed border-orange-300 bg-orange-50 px-4 py-3 text-center">
            <p className="text-xs font-medium text-orange-600 mb-0.5">Coupon code</p>
            <p className="font-mono text-sm font-bold tracking-widest text-[#f97316]">
              {deal.couponCode}
            </p>
          </div>
        )}

        {/* CTA */}
        <a
          href={deal.affiliateLink}
          target="_blank"
          rel="noopener nofollow sponsored"
          className="block w-full rounded-lg bg-[#f97316] px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-orange-500 transition-colors shadow-sm hover:shadow-md"
        >
          Get This Deal &rarr;
        </a>
      </CardContent>
    </Card>
  );
}
