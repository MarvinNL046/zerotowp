import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/convex-provider";
import { ClerkProviderLazy } from "@/components/clerk-provider-lazy";
import "./globals.css";
import Script from "next/script";
import { CookieConsent } from "@/components/cookie-consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://zerotowp.com"),
  title: {
    default: "ZeroToWP — Build Your First WordPress Site",
    template: "%s | ZeroToWP",
  },
  description:
    "Step-by-step WordPress tutorials, plugin reviews, hosting deals, and beginner guides. Start your WordPress journey today.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ZeroToWP",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RJHC6KHK4F" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RJHC6KHK4F');
            `,
          }}
        />
        <Script id="google-consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_personalization: 'denied',
              ad_user_data: 'denied',
              wait_for_update: 500
            });
            var cc = localStorage.getItem('cookie-consent');
            if (cc === 'accepted') {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
                ad_storage: 'granted',
                ad_personalization: 'granted',
                ad_user_data: 'granted'
              });
            }
          `}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="8nHJ9xpZVf5eh3wdebkQkQ"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9667530069853985"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <meta name="google-adsense-account" content="ca-pub-9667530069853985" />
      </head>
      <body className="antialiased">
        <ClerkProviderLazy>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProviderLazy>
        <CookieConsent />
      </body>
    </html>
  );
}
