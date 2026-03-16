import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy — ZeroToWP",
  description:
    "Learn about ZeroToWP's editorial standards, how we test products, and our commitment to honest, independent recommendations.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Editorial Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: March 2026</p>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          Trust is earned. This page explains how we create content, how we test and rate
          products, and the principles that guide every article we publish on ZeroToWP.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          1. Our Editorial Standards
        </h2>
        <p className="text-slate-600 mb-4">
          Every piece of content we publish must meet three criteria before it goes live:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Accuracy:</strong> all facts, instructions, and claims are verified. When we
            say a plugin has a particular feature or a hosting plan costs a certain amount, we
            confirm it at the time of writing.
          </li>
          <li>
            <strong>First-hand experience:</strong> we do not write about tools we have not used.
            Our tutorials are based on things we have actually done, and our reviews are based on
            products we have actually installed and tested.
          </li>
          <li>
            <strong>Clarity:</strong> WordPress can be intimidating for beginners. We write in
            plain language, explain technical terms when they come up, and include screenshots and
            step-by-step instructions wherever possible.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          2. How We Test Products
        </h2>
        <p className="text-slate-600 mb-4">
          When we review a WordPress plugin, theme, or hosting provider, we follow a consistent
          testing process:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            We install the product on a real WordPress site — not a demo or sandbox environment.
          </li>
          <li>
            We configure it the way a typical user would, following the product&apos;s own
            documentation.
          </li>
          <li>
            We use it for a meaningful period — not just a quick click-through. For hosting, this
            means running actual sites. For plugins, this means using them in real-world scenarios.
          </li>
          <li>
            We test key functionality, note any issues or limitations, and take screenshots to
            document our experience.
          </li>
          <li>
            Where relevant, we run performance benchmarks (page load times, server response times)
            using industry-standard tools.
          </li>
        </ul>
        <p className="text-slate-600 mb-4">
          For a more detailed look at our testing methodology, see our{" "}
          <a href="/how-we-test" className="text-orange-500 hover:text-orange-600 underline">
            How We Test
          </a>{" "}
          page.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          3. How We Rate Products
        </h2>
        <p className="text-slate-600 mb-4">
          Our product ratings are based on five equally weighted criteria:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Ease of use:</strong> how intuitive is the setup process and day-to-day
            interface? Can a beginner figure it out without watching tutorials?
          </li>
          <li>
            <strong>Performance:</strong> does it do its job well without slowing down your site?
            Is it reliable under real-world conditions?
          </li>
          <li>
            <strong>Features:</strong> does it offer the functionality users actually need? Are
            the features well-implemented or just checkbox items?
          </li>
          <li>
            <strong>Value for money:</strong> is the pricing fair for what you get? How does it
            compare to alternatives at the same price point?
          </li>
          <li>
            <strong>Support:</strong> how responsive and helpful is the support team? Is
            documentation available and well-maintained?
          </li>
        </ul>
        <p className="text-slate-600 mb-4">
          Each criterion is scored individually, and the final rating is an average of all five
          scores. We do not round up to make products look better than they are.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          4. Affiliate Relationships
        </h2>
        <p className="text-slate-600 mb-4">
          We earn commissions through affiliate links to some of the products we review and
          recommend. This is how we fund the site and keep our content free.
        </p>
        <p className="text-slate-600 mb-4">
          Here is what we want to be absolutely clear about:{" "}
          <strong>
            affiliate commissions never influence our ratings, rankings, or recommendations.
          </strong>{" "}
          A product with a generous affiliate program will receive a low score if it does not
          perform well. A product with no affiliate program will receive a high score if it
          deserves one.
        </p>
        <p className="text-slate-600 mb-4">
          We only recommend products we would use on our own sites. If we would not install it on
          a site we care about, we will not recommend it to you — regardless of the commission.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          5. Corrections Policy
        </h2>
        <p className="text-slate-600 mb-4">
          We strive for accuracy, but mistakes happen. When we discover an error — whether we
          catch it ourselves or a reader points it out — we correct it promptly. For significant
          corrections, we add a note at the top or bottom of the article explaining what was
          changed and when.
        </p>
        <p className="text-slate-600 mb-4">
          If you spot an error in any of our content, please let us know at{" "}
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            info@staycoolairco.nl
          </a>
          . We take every report seriously and will investigate promptly.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          6. Editorial Independence
        </h2>
        <p className="text-slate-600 mb-4">
          ZeroToWP is an independent publication. We are not owned by, affiliated with, or
          financially controlled by any hosting company, plugin developer, theme shop, or other
          WordPress-related business.
        </p>
        <p className="text-slate-600 mb-4">
          No company can pay for a favorable review. No sponsor can influence our editorial
          direction. Our recommendations are based solely on our own research, testing, and
          experience.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          7. Author Expertise
        </h2>
        <p className="text-slate-600 mb-4">
          All content on ZeroToWP is written by people with real, hands-on WordPress experience.
          We have collectively built dozens of WordPress sites, tested hundreds of plugins and
          themes, and navigated the full range of WordPress challenges — from initial setup to
          complex migrations and performance optimization.
        </p>
        <p className="text-slate-600 mb-4">
          We do not outsource content to writers who lack experience with the topics they cover.
          When we write about a tool, we have used it. When we describe a workflow, we have done
          it.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          8. Update Frequency
        </h2>
        <p className="text-slate-600 mb-4">
          The WordPress ecosystem moves quickly. Plugins release new versions, hosting providers
          change their plans, and best practices evolve. To keep our content reliable, we review
          and update our articles at least once a year — and more frequently for fast-changing
          topics like hosting reviews and security guides.
        </p>
        <p className="text-slate-600 mb-4">
          Each article displays a &quot;last updated&quot; date so you always know how current the
          information is. If a product undergoes a major change between updates, we prioritize
          refreshing that content immediately.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">9. Contact Us</h2>
        <p className="text-slate-600 mb-4">
          We welcome feedback, corrections, suggestions, and questions about our editorial
          process. You can reach us at:{" "}
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            info@staycoolairco.nl
          </a>
        </p>
        <p className="text-slate-600">
          Transparency is not just a section on a page for us — it is how we operate. If something
          on this site does not meet the standards described above, we want to hear about it.
        </p>
      </div>
    </div>
  );
}
