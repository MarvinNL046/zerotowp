import type { Metadata } from "next";
import { ConvexClientProvider } from "@/components/convex-provider";
import { ClerkProviderLazy } from "@/components/clerk-provider-lazy";
import "./globals.css";

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
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="8nHJ9xpZVf5eh3wdebkQkQ"
          async
          defer
        />
      </head>
      <body className="antialiased">
        <ClerkProviderLazy>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProviderLazy>
      </body>
    </html>
  );
}
