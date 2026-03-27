import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Full affiliate disclosure for ZeroToWP. How we earn money and how it affects (and does not affect) our content.",
  alternates: { canonical: "https://zerotowp.com/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Affiliate Disclosure</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          Transparency matters to us. Here is how ZeroToWP earns money and what
          that means for you as a reader.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">How We Earn Money</h2>
        <p className="text-slate-600 mb-6">
          Some of the links on ZeroToWP are affiliate links. This means that if you
          click on a link and make a purchase, we may receive a small commission at no
          additional cost to you. These commissions help us keep the site running and allow
          us to continue creating free, high-quality content.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">FTC Disclosure</h2>
        <p className="text-slate-600 mb-6">
          In accordance with the Federal Trade Commission (FTC) guidelines, we disclose that
          ZeroToWP has financial relationships with some of the products and services
          mentioned on this site. ZeroToWP may be compensated if consumers choose to
          use the links provided in our content and generate sales for the mentioned companies.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          What This Means for Our Content
        </h2>
        <p className="text-slate-600 mb-6">
          Our affiliate relationships do not influence our editorial content, reviews, or
          recommendations. We only recommend products and services that we have personally
          tested and believe provide genuine value to our readers. We frequently recommend
          free alternatives over paid products when we believe they are the better choice.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Your Trust Comes First</h2>
        <p className="text-slate-600 mb-6">
          We would rather lose an affiliate commission than mislead our readers. If a product
          is not good, we will say so — even if saying so costs us money. Our long-term
          success depends on your trust, and we take that responsibility seriously.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Questions?</h2>
        <p className="text-slate-600">
          If you have any questions about our affiliate relationships or how we make money,
          feel free to reach out. We are happy to be transparent about every aspect of how
          this site operates.
        </p>
      </div>
    </div>
  );
}
