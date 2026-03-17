import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ZeroToWP",
  description:
    "How ZeroToWP collects, uses, and protects your personal data. Covers analytics, newsletters, comments, third-party services, GDPR rights, and data retention policies.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: March 2026</p>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          At ZeroToWP (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we take your privacy
          seriously. This Privacy Policy explains what personal data we collect, why we collect it,
          how we use it, and what rights you have regarding your data. This policy applies to all
          visitors and users of zerotowp.com.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          1. Data We Collect
        </h2>
        <p className="text-slate-600 mb-4">
          We collect the minimum amount of data necessary to operate our site and provide a good
          experience. The data we collect falls into the following categories:
        </p>
        <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
          Information You Provide Directly
        </h3>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Newsletter signups:</strong> your email address when you subscribe to our
            mailing list.
          </li>
          <li>
            <strong>Comments:</strong> your name and email address when you leave a comment on an
            article.
          </li>
          <li>
            <strong>Account registration:</strong> your name and email address if you create an
            account through our authentication provider.
          </li>
          <li>
            <strong>Contact messages:</strong> any information you include when you email us
            directly.
          </li>
        </ul>
        <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
          Information Collected Automatically
        </h3>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Analytics data:</strong> pages visited, time spent on pages, referring URLs,
            browser type, device type, and approximate geographic location (country/city level)
            through Google Analytics.
          </li>
          <li>
            <strong>Cookies:</strong> small text files stored on your device to remember
            preferences and track usage. See our{" "}
            <a href="/cookie-policy" className="text-orange-500 hover:text-orange-600 underline">
              Cookie Policy
            </a>{" "}
            for full details.
          </li>
          <li>
            <strong>Server logs:</strong> IP addresses, request timestamps, and page URLs are
            logged by our hosting provider as part of standard web server operations.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          2. How We Use Your Data
        </h2>
        <p className="text-slate-600 mb-4">We use the data we collect to:</p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>Send you newsletters and WordPress tips if you have opted in.</li>
          <li>Display your comments on articles you have engaged with.</li>
          <li>
            Analyze site traffic and user behavior to improve our content, site structure, and
            user experience.
          </li>
          <li>Maintain the security and performance of our site.</li>
          <li>Respond to your questions or feedback when you contact us.</li>
        </ul>
        <p className="text-slate-600 mb-4">
          We do not sell, rent, or trade your personal data to third parties. We never use your
          data for purposes other than those described here.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          3. Third-Party Services
        </h2>
        <p className="text-slate-600 mb-4">
          We rely on a small number of trusted third-party services to operate our site. Each of
          these services may process some of your data as described below:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Google Analytics</strong> — collects anonymized usage data to help us
            understand how visitors interact with our site. Google may set cookies on your device.
            See{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Google&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Clerk</strong> — handles user authentication and account management. If you
            create an account, Clerk processes your name and email address. See{" "}
            <a
              href="https://clerk.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Clerk&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Convex</strong> — our backend database where comments, newsletter
            subscriptions, and other site data are stored. See{" "}
            <a
              href="https://www.convex.dev/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Convex&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Vercel</strong> — hosts our website and may process server logs including IP
            addresses. See{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Vercel&apos;s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Resend</strong> — delivers our newsletter emails. Your email address is shared
            with Resend solely for email delivery purposes. See{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Resend&apos;s Privacy Policy
            </a>
            .
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">4. Cookies</h2>
        <p className="text-slate-600 mb-4">
          Our site uses cookies to function properly and to help us understand how you use it. We
          use the following types of cookies:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Performance cookies:</strong> set by Google Analytics to track page views and
            site usage patterns.
          </li>
          <li>
            <strong>Functional cookies:</strong> set by Clerk for authentication sessions, and by
            our site to remember your preferences (such as dismissing a popup or completing a
            newsletter signup).
          </li>
        </ul>
        <p className="text-slate-600 mb-4">
          For a complete list of cookies we use, including their providers, purposes, and
          durations, please see our{" "}
          <a href="/cookie-policy" className="text-orange-500 hover:text-orange-600 underline">
            Cookie Policy
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          5. Data Retention
        </h2>
        <p className="text-slate-600 mb-4">We retain your data for the following periods:</p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Newsletter email addresses:</strong> until you unsubscribe. You can
            unsubscribe at any time using the link in every email we send.
          </li>
          <li>
            <strong>Comment data:</strong> for as long as the article exists on our site, so that
            the conversation remains available to other readers.
          </li>
          <li>
            <strong>Account data:</strong> until you delete your account or request deletion.
          </li>
          <li>
            <strong>Analytics data:</strong> retained by Google Analytics according to their
            default retention settings (14 months).
          </li>
          <li>
            <strong>Server logs:</strong> retained by Vercel for up to 30 days.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          6. Your Rights Under GDPR
        </h2>
        <p className="text-slate-600 mb-4">
          If you are located in the European Economic Area (EEA), you have the following rights
          regarding your personal data:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <strong>Right of access:</strong> you can request a copy of all personal data we hold
            about you.
          </li>
          <li>
            <strong>Right to rectification:</strong> you can ask us to correct any inaccurate or
            incomplete data.
          </li>
          <li>
            <strong>Right to erasure:</strong> you can request that we delete your personal data.
            We will comply unless we have a legitimate legal reason to retain it.
          </li>
          <li>
            <strong>Right to data portability:</strong> you can request your data in a structured,
            commonly used, machine-readable format.
          </li>
          <li>
            <strong>Right to object:</strong> you can object to the processing of your personal
            data for certain purposes, including direct marketing.
          </li>
          <li>
            <strong>Right to restrict processing:</strong> you can ask us to limit how we use your
            data while a complaint or request is being resolved.
          </li>
        </ul>
        <p className="text-slate-600 mb-4">
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            info@staycoolairco.nl
          </a>
          . We will respond to your request within 30 days.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          7. Children&apos;s Privacy
        </h2>
        <p className="text-slate-600 mb-4">
          ZeroToWP is not directed at children under the age of 16. We do not knowingly collect
          personal data from children under 16. If you are a parent or guardian and believe your
          child has provided us with personal data, please contact us at{" "}
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            info@staycoolairco.nl
          </a>{" "}
          and we will promptly delete the data.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          8. Changes to This Policy
        </h2>
        <p className="text-slate-600 mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices
          or for legal, regulatory, or operational reasons. When we make significant changes, we
          will update the &quot;Last updated&quot; date at the top of this page. We encourage you
          to review this page periodically.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">9. Contact Us</h2>
        <p className="text-slate-600">
          If you have any questions or concerns about this Privacy Policy or how we handle your
          data, you can reach us at:{" "}
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
