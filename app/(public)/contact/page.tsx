import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact — ZeroToWP",
  description:
    "Get in touch with the ZeroToWP team. Questions, suggestions, corrections, or partnership inquiries — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          Got a question, suggestion, or spotted an error? I&apos;d love to hear
          from you.
        </p>

        {/* Email card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mt-0 mb-2">
            Email
          </h2>
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-lg text-orange-500 hover:text-orange-600 font-medium no-underline"
          >
            info@staycoolairco.nl
          </a>
          <p className="text-sm text-slate-500 mt-2 mb-0">
            I typically respond within 1-2 business days.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          What You Can Contact Me About
        </h2>
        <ul className="text-slate-600 space-y-2">
          <li>
            <strong>Corrections</strong> — Found a mistake or outdated
            information? Let me know and I&apos;ll fix it quickly.
          </li>
          <li>
            <strong>Partnership inquiries</strong> — Interested in working
            together? Reach out with details about your proposal.
          </li>
          <li>
            <strong>Content suggestions</strong> — Have a topic you&apos;d like
            me to cover? I&apos;m always looking for ideas.
          </li>
          <li>
            <strong>Technical issues</strong> — Something broken on the site?
            Please include the URL and a brief description of the problem.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          Find Me Online
        </h2>
        <p className="text-slate-600">
          You can also find me on{" "}
          <a
            href="https://github.com/MarvinNL046"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            GitHub
          </a>
          , where I share code and contribute to open-source projects.
        </p>

        {/* Note box */}
        <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 mt-8">
          <p className="text-slate-700 font-medium mt-0 mb-2">
            Looking for WordPress help?
          </p>
          <p className="text-slate-600 mb-4">
            Before reaching out, please check our guides first — you&apos;ll
            probably find the answer faster.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/start-here"
              className="inline-flex items-center rounded-lg bg-white border border-orange-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 transition-colors no-underline"
            >
              Start Here Guide
            </Link>
            <Link
              href="/wordpress-hosting"
              className="inline-flex items-center rounded-lg bg-white border border-orange-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 transition-colors no-underline"
            >
              Hosting Guide
            </Link>
            <Link
              href="/wordpress-seo"
              className="inline-flex items-center rounded-lg bg-white border border-orange-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-orange-100 transition-colors no-underline"
            >
              SEO Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
