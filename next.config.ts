import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/divi-vs-elementor",
        destination: "/elementor-vs-divi",
        permanent: true,
      },
      {
        source: "/elementor-pro-vs-divi",
        destination: "/elementor-vs-divi",
        permanent: true,
      },
      {
        source: "/astra-wordpress-theme-review",
        destination: "/astra-theme-review",
        permanent: true,
      },
      {
        source: "/best-wordpress-cache-plugins",
        destination: "/best-caching-plugins",
        permanent: true,
      },
      {
        source: "/wordpress-security-checklist",
        destination: "/wordpress-security-guide",
        permanent: true,
      },
      {
        source: "/best-file-manager-plugin-for-wordpress",
        destination: "/file-manager-review",
        permanent: true,
      },
      {
        source: "/slug-seo-wordpress",
        destination: "/wordpress-slug-seo",
        permanent: true,
      },
      {
        source: "/wordpress-ai-chatbot-plugin",
        destination: "/best-wordpress-ai-chatbot-plugins",
        permanent: true,
      },
      {
        source: "/wordpress-ai-content-optimization-plugin",
        destination: "/best-wordpress-ai-content-optimization-plugins",
        permanent: true,
      },
      {
        source: "/wordpress-ai-internal-link-recommendation-plugin",
        destination: "/best-wordpress-ai-internal-link-plugins",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
