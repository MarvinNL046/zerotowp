import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trademark Disclaimer — ZeroToWP",
  description:
    "ZeroToWP trademark disclaimer. We are an independent WordPress education site and are not affiliated with or endorsed by the WordPress Foundation.",
  alternates: { canonical: "https://zerotowp.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Trademark Disclaimer</h1>

      <div className="prose prose-neutral max-w-none">
        <p>
          WordPress&reg; is a registered trademark of the WordPress Foundation.
          ZeroToWP is an independent educational website that publishes
          tutorials, guides, comparisons, and recommendations related to
          WordPress.
        </p>

        <p>
          We are not affiliated with, endorsed by, sponsored by, or owned by
          the WordPress Foundation. Any use of the WordPress name on this
          website is for identification and descriptive purposes only and does
          not imply any official association or endorsement.
        </p>
      </div>
    </main>
  );
}
