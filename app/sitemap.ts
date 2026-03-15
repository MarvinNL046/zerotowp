import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://zerotowp.com";

  const [posts, reviews] = await Promise.all([
    fetchQuery(api.posts.listPublished, {}),
    fetchQuery(api.reviews.listPublished, {}),
  ]);

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/reviews`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/start-here`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/wordpress-hosting`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/wordpress-plugins`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/wordpress-themes`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/wordpress-seo`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/wordpress-speed`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/wordpress-security`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/tutorials`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/how-we-test`, lastModified: new Date(), priority: 0.5 },
    { url: `${baseUrl}/affiliate-disclosure`, lastModified: new Date(), priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), priority: 0.3 },
  ];

  const postPages = posts.map((post: any) => ({
    url: `${baseUrl}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    priority: post.clusterRole === "pillar" ? 0.9 : 0.7,
  }));

  const reviewPages = reviews.map((review: any) => ({
    url: `${baseUrl}/${review.slug}`,
    lastModified: new Date(review.updatedAt),
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...reviewPages];
}
