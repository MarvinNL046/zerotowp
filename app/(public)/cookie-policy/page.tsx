import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy — ZeroToWP",
  description:
    "Learn about the cookies ZeroToWP uses — analytics, authentication, and preference cookies. See exactly what we track, why, and how to manage your cookie settings in any browser.",
};

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Cookie Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: March 2026</p>

      <div className="prose prose-slate max-w-none">
        <p className="text-lg text-slate-600 mb-8">
          This Cookie Policy explains what cookies are, which cookies zerotowp.com uses, why we
          use them, and how you can control them.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          1. What Are Cookies?
        </h2>
        <p className="text-slate-600 mb-4">
          Cookies are small text files that websites place on your device (computer, tablet, or
          phone) when you visit them. They are widely used to make websites work properly, improve
          performance, and provide information to site owners. Cookies can be &quot;session&quot;
          cookies, which are deleted when you close your browser, or &quot;persistent&quot; cookies,
          which remain on your device until they expire or you delete them.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          2. Cookies We Use
        </h2>
        <p className="text-slate-600 mb-4">
          Below is a complete list of cookies used on our site:
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm text-slate-600 border border-slate-200">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">
                  Cookie
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">
                  Provider
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">
                  Purpose
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">
                  Duration
                </th>
                <th className="px-4 py-3 font-semibold text-slate-900 border-b border-slate-200">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">_ga</td>
                <td className="px-4 py-3">Google Analytics</td>
                <td className="px-4 py-3">
                  Distinguishes unique visitors and tracks site usage across sessions
                </td>
                <td className="px-4 py-3">2 years</td>
                <td className="px-4 py-3">Performance</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs">_gid</td>
                <td className="px-4 py-3">Google Analytics</td>
                <td className="px-4 py-3">
                  Distinguishes unique visitors for daily analytics reporting
                </td>
                <td className="px-4 py-3">24 hours</td>
                <td className="px-4 py-3">Performance</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-4 py-3 font-mono text-xs">__clerk_db_jwt</td>
                <td className="px-4 py-3">Clerk</td>
                <td className="px-4 py-3">
                  Maintains your authenticated session so you stay logged in
                </td>
                <td className="px-4 py-3">Session</td>
                <td className="px-4 py-3">Functional</td>
              </tr>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <td className="px-4 py-3 font-mono text-xs">exit-popup-dismissed</td>
                <td className="px-4 py-3">ZeroToWP</td>
                <td className="px-4 py-3">
                  Remembers that you dismissed the exit-intent popup so it does not appear again
                </td>
                <td className="px-4 py-3">Session</td>
                <td className="px-4 py-3">Functional</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">ztw-subscribed</td>
                <td className="px-4 py-3">ZeroToWP</td>
                <td className="px-4 py-3">
                  Remembers that you have already subscribed to the newsletter so we do not show
                  the signup form again
                </td>
                <td className="px-4 py-3">Persistent</td>
                <td className="px-4 py-3">Functional</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          3. How to Manage Cookies
        </h2>
        <p className="text-slate-600 mb-4">
          Most web browsers allow you to control cookies through their settings. You can choose to
          block or delete cookies, though doing so may affect the functionality of our site (for
          example, you may need to log in again or see newsletter prompts you have already
          dismissed).
        </p>
        <p className="text-slate-600 mb-4">
          Here is how to manage cookies in the most common browsers:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Google Chrome — Manage cookies
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Mozilla Firefox — Enhanced Tracking Protection
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Safari — Manage cookies and website data
            </a>
          </li>
          <li>
            <a
              href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Microsoft Edge — Manage cookies
            </a>
          </li>
        </ul>
        <p className="text-slate-600 mb-4">
          To opt out of Google Analytics tracking specifically, you can install the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          4. Third-Party Cookies
        </h2>
        <p className="text-slate-600 mb-4">
          In addition to our own cookies, third-party services we use (Google Analytics and Clerk)
          may set their own cookies on your device. We do not have direct control over these
          cookies. Please refer to the respective privacy policies of these services for more
          information:
        </p>
        <ul className="text-slate-600 mb-4 list-disc pl-6 space-y-2">
          <li>
            <a
              href="https://policies.google.com/technologies/cookies"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Google — How Google uses cookies
            </a>
          </li>
          <li>
            <a
              href="https://clerk.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 hover:text-orange-600 underline"
            >
              Clerk — Privacy Policy
            </a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">
          5. Changes to This Policy
        </h2>
        <p className="text-slate-600 mb-4">
          We may update this Cookie Policy from time to time to reflect changes in the cookies we
          use or for other operational, legal, or regulatory reasons. When we make changes, we will
          update the &quot;Last updated&quot; date at the top of this page.
        </p>

        <h2 className="text-2xl font-semibold text-slate-900 mt-10 mb-4">6. Contact Us</h2>
        <p className="text-slate-600">
          If you have questions about our use of cookies, please contact us at:{" "}
          <a
            href="mailto:info@staycoolairco.nl"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            info@staycoolairco.nl
          </a>
        </p>
      </div>
    </div>
  );
}
