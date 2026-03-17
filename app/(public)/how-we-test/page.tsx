import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Test — ZeroToWP",
  description:
    "Our testing methodology explained. Learn how we evaluate WordPress hosting, plugins, themes, and tools before recommending them.",
  alternates: { canonical: "https://zerotowp.com/how-we-test" },
};

export default function HowWeTestPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">How We Test</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          We take our reviews seriously. Every product on ZeroToWP is evaluated using
          a consistent, hands-on testing process. Here is how it works.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Hosting Reviews</h2>
        <p className="text-slate-600 mb-4">
          For every hosting provider, we sign up for a real account, install WordPress, and
          monitor the site over a period of at least 30 days. We measure:
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Server response time (TTFB) using multiple testing tools</li>
          <li>Uptime over the monitoring period</li>
          <li>WordPress installation and setup experience</li>
          <li>Customer support responsiveness and quality</li>
          <li>Value for money at renewal pricing, not just introductory rates</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Plugin Reviews</h2>
        <p className="text-slate-600 mb-4">
          We install every plugin on a test WordPress site and use it as a real user would.
          We evaluate:
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Ease of setup and configuration</li>
          <li>Feature completeness compared to alternatives</li>
          <li>Performance impact on page load times</li>
          <li>Compatibility with popular themes and other plugins</li>
          <li>Quality of documentation and support</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Theme Reviews</h2>
        <p className="text-slate-600 mb-4">
          We build a complete demo site with each theme to assess:
        </p>
        <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
          <li>Design quality and mobile responsiveness</li>
          <li>Customization options and ease of use</li>
          <li>Page speed with default and optimized configurations</li>
          <li>Code quality and WordPress coding standards compliance</li>
          <li>Update frequency and developer support</li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Our Rating System</h2>
        <p className="text-slate-600 mb-6">
          We rate products on a scale of 1 to 5, with half-point increments. Our ratings
          reflect the overall experience for a beginner WordPress user. A product can be
          technically excellent but still score lower if it is difficult to set up or poorly
          documented.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">Independence</h2>
        <p className="text-slate-600">
          Affiliate partnerships never influence our ratings or recommendations. We frequently
          give low scores to products with high affiliate payouts and recommend free
          alternatives when they are genuinely better. Our reputation depends on trust, and
          we do not compromise it.
        </p>
      </div>
    </div>
  );
}
