"use server";

import type { DetectionResult } from "./types";
import { detectWordPress, detectTheme, detectPlugins, detectHosting, detectPlatform } from "./detect";

/**
 * Server Action: fetch a URL and detect WordPress theme, plugins, and hosting.
 */
export async function detectSite(rawUrl: string): Promise<DetectionResult> {
  // 1. Normalise URL
  let url = rawUrl.trim();
  if (!url) {
    return emptyResult(url, "Please enter a valid URL.");
  }

  // Add protocol if missing
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  // Validate URL
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return emptyResult(url, "Please enter a valid URL.");
  }

  // Only allow http(s) protocols
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return emptyResult(url, "Please enter a valid URL.");
  }

  // 2. Fetch with timeout
  let html: string;
  let headers: Record<string, string>;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent": "ZeroToWP Theme Detector Bot (https://zerotowp.com/tools/theme-detector)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      redirect: "follow",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return emptyResult(
        url,
        `Could not reach this site (HTTP ${response.status}). Please check the URL and try again.`,
      );
    }

    html = await response.text();

    // Convert headers to plain object
    headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return emptyResult(
        url,
        "This site took too long to respond. It may be blocking automated requests.",
      );
    }
    return emptyResult(
      url,
      "Could not reach this site. Please check the URL and try again.",
    );
  }

  // 3. Run detection
  const wp = detectWordPress(html);
  const theme = wp.isWordPress ? detectTheme(html) : null;
  const plugins = wp.isWordPress ? detectPlugins(html) : [];
  const hosting = detectHosting(headers);
  const platform = wp.isWordPress ? null : detectPlatform(html, headers);

  return {
    url: parsed.hostname,
    isWordPress: wp.isWordPress,
    wpVersion: wp.version,
    theme,
    plugins,
    hosting,
    platform,
    error: null,
  };
}

function emptyResult(url: string, error: string): DetectionResult {
  return {
    url,
    isWordPress: false,
    wpVersion: null,
    theme: null,
    plugins: [],
    hosting: null,
    platform: null,
    error,
  };
}
