import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ZeroToWP — Free WordPress Tutorials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
            marginBottom: 24,
          }}
        >
          zerotowp.com
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.15,
            maxWidth: "90%",
            marginBottom: 24,
          }}
        >
          ZeroToWP
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.85)",
            maxWidth: "70%",
            lineHeight: 1.4,
          }}
        >
          Free step-by-step WordPress tutorials for beginners.
        </div>
      </div>
    ),
    { ...size }
  );
}
