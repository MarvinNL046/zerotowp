"use client";

import { useState, useEffect, useTransition, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Globe,
  Palette,
  Plug,
  Server,
  Check,
  X,
  Copy,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { DetectionResult } from "./types";
import { detectSite } from "./actions";

export default function DetectorForm() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState(searchParams.get("url") ?? "");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);

  const runScan = useCallback(
    (targetUrl: string) => {
      if (!targetUrl.trim()) return;
      startTransition(async () => {
        const res = await detectSite(targetUrl);
        setResult(res);
        // Update URL bar without reload
        const shareUrl = `/tools/theme-detector?url=${encodeURIComponent(targetUrl.replace(/^https?:\/\//, ""))}`;
        window.history.replaceState(null, "", shareUrl);
      });
    },
    [startTransition],
  );

  // Auto-scan when ?url= param changes (initial load + client-side navigation)
  const urlParam = searchParams.get("url");
  useEffect(() => {
    if (urlParam) {
      setUrl(urlParam);
      runScan(urlParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParam]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runScan(url);
  }

  function copyShareUrl() {
    const shareUrl = `https://zerotowp.com/tools/theme-detector?url=${encodeURIComponent(url.replace(/^https?:\/\//, ""))}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      {/* ── Input Form ──────────────────────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter any website URL..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-base"
            disabled={isPending}
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !url.trim()}
          className={cn(
            "flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all text-base",
            isPending
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 active:bg-orange-700",
          )}
        >
          {isPending ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Detect Theme
            </>
          )}
        </button>
      </form>

      {/* ── Error ───────────────────────────────────────────────────────── */}
      {result?.error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{result.error}</p>
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────────────── */}
      {result && !result.error && (
        <div className="space-y-6">
          {/* Site badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="font-medium text-slate-900">{result.url}</span>
              {result.isWordPress ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  <Check className="w-3.5 h-3.5" />
                  WordPress{result.wpVersion ? ` ${result.wpVersion}` : ""}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  <X className="w-3.5 h-3.5" />
                  Not WordPress
                </span>
              )}
            </div>
            <button
              onClick={copyShareUrl}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-orange-600 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Share
                </>
              )}
            </button>
          </div>

          {!result.isWordPress && (
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              {result.platform ? (
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="text-4xl">{result.platform.icon}</span>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      This site uses{" "}
                      <a
                        href={result.platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-500 hover:text-orange-600"
                      >
                        {result.platform.name}
                      </a>
                    </p>
                    <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                      {result.platform.description}
                    </p>
                  </div>
                  <div className="border-t border-slate-100 pt-4 mt-1 w-full max-w-sm">
                    <p className="text-sm text-slate-600">
                      Interested in WordPress instead? It powers over 40% of all websites and gives you full control over your site.
                    </p>
                    <Link
                      href="/start-here"
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-orange-500 hover:text-orange-600"
                    >
                      Learn how to build a WordPress site
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-slate-600">
                    This does not appear to be a WordPress site, and we could not identify the platform.
                    Try a different URL, or check out our guide on{" "}
                    <Link
                      href="/start-here"
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      getting started with WordPress
                    </Link>
                    .
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Theme card */}
          {result.theme && (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200">
                <Palette className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Theme Detected
                </span>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {result.theme.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Slug: <code className="text-xs bg-slate-100 px-1.5 py-0.5 rounded">{result.theme.slug}</code>
                    </p>
                  </div>
                  <span
                    className={cn(
                      "inline-block rounded-full px-3 py-1 text-xs font-semibold",
                      result.theme.isFree
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700",
                    )}
                  >
                    {result.theme.isFree ? "Free" : "Premium"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  {result.theme.wpOrgUrl && (
                    <a
                      href={result.theme.wpOrgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
                    >
                      WordPress.org
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {result.theme.officialUrl && (
                    <a
                      href={result.theme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-orange-600 transition-colors"
                    >
                      Official Site
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {result.theme.ourReviewUrl && (
                    <Link
                      href={result.theme.ourReviewUrl}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      Read our review &rarr;
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Plugins grid */}
          {result.plugins.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200">
                <Plug className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Plugins Detected
                </span>
                <span className="ml-auto text-xs text-slate-500">
                  {result.plugins.length} plugin
                  {result.plugins.length !== 1 ? "s" : ""} found
                </span>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {result.plugins.map((plugin) => (
                    <div
                      key={plugin.slug}
                      className="flex items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5"
                    >
                      <span className="text-sm font-medium text-slate-800 truncate">
                        {plugin.name}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {plugin.ourArticleUrl && (
                          <Link
                            href={plugin.ourArticleUrl}
                            className="text-xs font-medium text-orange-500 hover:text-orange-600 transition-colors whitespace-nowrap"
                          >
                            Our guide
                          </Link>
                        )}
                        {plugin.wpOrgUrl && (
                          <a
                            href={plugin.wpOrgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                            title="View on WordPress.org"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Only plugins visible in the page source are shown. Many plugins
                  load assets conditionally and may not appear here.
                </p>
              </div>
            </div>
          )}

          {/* Hosting badge */}
          {result.hosting && (
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 border-b border-slate-200">
                <Server className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Hosting / Infrastructure
                </span>
              </div>
              <div className="p-5 flex flex-wrap items-center gap-3">
                <span className="text-base font-semibold text-slate-900">
                  {result.hosting.provider}
                </span>
                <span
                  className={cn(
                    "text-xs font-medium rounded-full px-2.5 py-0.5",
                    result.hosting.confidence === "high"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700",
                  )}
                >
                  {result.hosting.confidence === "high"
                    ? "High confidence"
                    : "Likely"}
                </span>
                {result.hosting.ourReviewUrl && (
                  <Link
                    href={result.hosting.ourReviewUrl}
                    className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors ml-auto"
                  >
                    Read our review &rarr;
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          {result.theme?.ourReviewUrl && (
            <div className="rounded-xl bg-orange-50 border border-orange-200 p-5 text-center">
              <p className="text-sm text-slate-700 mb-3">
                Want to use <strong>{result.theme.name}</strong> on your own site?
              </p>
              <Link
                href={result.theme.ourReviewUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors"
              >
                Read our {result.theme.name} guide &rarr;
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
