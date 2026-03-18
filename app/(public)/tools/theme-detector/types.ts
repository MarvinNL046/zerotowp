export type ThemeInfo = {
  slug: string;
  name: string;
  isFree: boolean;
  wpOrgUrl: string | null;
  officialUrl: string | null;
  ourReviewUrl: string | null;
};

export type PluginInfo = {
  slug: string;
  name: string;
  wpOrgUrl: string | null;
  ourArticleUrl: string | null;
};

export type HostingInfo = {
  provider: string;
  confidence: "high" | "medium";
  ourReviewUrl: string | null;
};

export type DetectionResult = {
  url: string;
  isWordPress: boolean;
  wpVersion: string | null;
  theme: ThemeInfo | null;
  plugins: PluginInfo[];
  hosting: HostingInfo | null;
  error: string | null;
};
