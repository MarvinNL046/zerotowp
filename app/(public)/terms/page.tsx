import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using ZeroToWP.com. Covers intellectual property, user content, affiliate links, liability limitations, and your rights under Dutch law.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: March 2026</p>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          Welcome to ZeroToWP. By accessing and using zerotowp.com (&quot;the Site&quot;), you
          agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with
          any part of these Terms, please do not use the Site.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-slate-600 mb-4">
          By using this Site, you confirm that you are at least 16 years of age and that you agree
          to comply with and be bound by these Terms. If you are using the Site on behalf of an
          organization, you represent that you have authority to bind that organization to these
          Terms.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          2. Description of Service
        </h2>
        <p className="text-slate-600 mb-4">
          ZeroToWP is a free educational website that provides WordPress tutorials, guides,
          product reviews, comparisons, and recommendations. Our goal is to help beginners build
          and manage their WordPress sites with confidence. We do not charge for access to our
          content.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          3. Intellectual Property
        </h2>
        <p className="text-slate-600 mb-4">
          All content on this Site — including articles, guides, reviews, images, graphics, logos,
          and code — is the intellectual property of ZeroToWP unless otherwise noted. You may not
          reproduce, distribute, or republish our content without prior written permission.
        </p>
        <p className="text-slate-600 mb-4">
          You are welcome to share our content on social media or link to our articles from your
          own website, provided that you give proper attribution by linking back to the original
          article on zerotowp.com. Brief quotations for the purpose of review or commentary are
          permitted under fair use, provided that full credit is given.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          4. User-Generated Content
        </h2>
        <p className="text-slate-600 mb-4">
          Our Site allows users to leave comments on articles. By submitting a comment, you grant
          ZeroToWP a non-exclusive, royalty-free, perpetual license to display, reproduce, and
          distribute your comment as part of the Site.
        </p>
        <p className="text-slate-600 mb-4">
          You are solely responsible for the content of your comments. Comments must not contain
          spam, hate speech, harassment, personal attacks, illegal content, or promotional material
          unrelated to the article topic. We reserve the right to moderate, edit, or remove any
          comment at our discretion without prior notice.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          5. Affiliate Links Disclosure
        </h2>
        <p className="text-slate-600 mb-4">
          Some links on this Site are affiliate links. This means that if you click on a link and
          make a purchase, we may earn a small commission at no additional cost to you. These
          commissions help us keep the Site running and continue producing free content.
        </p>
        <p className="text-slate-600 mb-4">
          Affiliate relationships never influence our editorial content, product ratings, or
          recommendations. We only recommend products and services we have personally tested and
          believe provide genuine value. For full details, see our{" "}
          <a
            href="/affiliate-disclosure"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            Affiliate Disclosure
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          6. Disclaimer of Warranties
        </h2>
        <p className="text-slate-600 mb-4">
          All content on this Site is provided for informational and educational purposes only. We
          make every effort to ensure accuracy, but we do not guarantee that all information is
          complete, current, or error-free.
        </p>
        <p className="text-slate-600 mb-4">
          The Site is provided &quot;as is&quot; and &quot;as available&quot; without warranties of
          any kind, whether express or implied. We do not warrant that the Site will be
          uninterrupted, secure, or free of errors. Any reliance you place on the information on
          this Site is at your own risk.
        </p>
        <p className="text-slate-600 mb-4">
          WordPress configurations, plugin behavior, and hosting environments vary. Results you
          achieve by following our guides may differ from what we describe. Always create backups
          before making changes to your WordPress site.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          7. Limitation of Liability
        </h2>
        <p className="text-slate-600 mb-4">
          To the fullest extent permitted by law, ZeroToWP and its owner, Marvin, shall not be
          liable for any indirect, incidental, special, consequential, or punitive damages
          resulting from your use of or inability to use the Site or any content on it. This
          includes, but is not limited to, damages for loss of data, revenue, or profits, even if
          we have been advised of the possibility of such damages.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          8. External Links
        </h2>
        <p className="text-slate-600 mb-4">
          Our Site contains links to third-party websites, products, and services. These links are
          provided for your convenience and reference. We do not control, endorse, or assume
          responsibility for the content, privacy policies, or practices of any third-party sites.
          Visiting external links is at your own risk, and we encourage you to review the terms
          and privacy policies of any site you visit.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          9. Governing Law
        </h2>
        <p className="text-slate-600 mb-4">
          These Terms are governed by and construed in accordance with the laws of the Netherlands.
          Any disputes arising from or relating to these Terms or your use of the Site shall be
          subject to the exclusive jurisdiction of the courts of the Netherlands.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          10. Changes to These Terms
        </h2>
        <p className="text-slate-600 mb-4">
          We reserve the right to modify these Terms at any time. When we make changes, we will
          update the &quot;Last updated&quot; date at the top of this page. Your continued use of
          the Site after any changes constitutes acceptance of the revised Terms. We encourage you
          to review this page periodically.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">11. Contact Us</h2>
        <p className="text-slate-600">
          If you have any questions about these Terms, please contact us at:{" "}
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            info@staycoolairco.nl
          </a>
        </p>
        <p className="text-slate-600 mt-4">
          ZeroToWP
          <br />
          Operated by Marvin
          <br />
          The Netherlands
        </p>
      </div>
    </div>
  );
}
