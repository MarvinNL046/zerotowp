import { ImageResponse } from "next/og";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const runtime = "edge";
export const alt = "ZeroToWP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let title = "ZeroToWP";
  let category = "";

  try {
    const post = await fetchQuery(api.posts.getBySlug, { slug });
    if (post) {
      title = post.title || title;
      category = post.category || "";
    } else {
      const review = await fetchQuery(api.reviews.getBySlug, { slug });
      if (review) {
        title = review.title || title;
        category = review.category || "";
      }
    }
  } catch {
    // Fall back to defaults if the query fails at edge runtime
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 80px",
          background:
            "linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.8)",
            marginBottom: 20,
          }}
        >
          ZeroToWP
        </div>
        {category && (
          <div
            style={{
              fontSize: 16,
              color: "white",
              background: "rgba(255,255,255,0.2)",
              padding: "4px 12px",
              borderRadius: 6,
              marginBottom: 20,
              textTransform: "capitalize",
            }}
          >
            {category}
          </div>
        )}
        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.2,
            maxWidth: "90%",
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size }
  );
}
