import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "@/components/convex-provider";
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
    <ClerkProvider>
      <html lang="en">
        <head>
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="8nHJ9xpZVf5eh3wdebkQkQ"
            async
          />
        </head>
        <body className="antialiased">
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
