import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = process.env.CONVEX_URL;

const client = new ConvexHttpClient(CONVEX_URL);

const content = `<img src="/screenshots/glossary-open-graph.webp" alt="The Open Graph protocol official specification at ogp.me" class="glossary-screenshot" />

<h2>What Is Open Graph?</h2>
<p>Open Graph (OG) is a protocol that controls how your web pages appear when someone shares them on Facebook, LinkedIn, Twitter, WhatsApp, Slack, and other platforms. Without it, social networks have to guess which title, image, and description to display — and they often guess wrong.</p>
<p>Facebook introduced the Open Graph protocol in 2010, building on existing standards like Dublin Core and RDFa. The specification lives at <a href="https://ogp.me/" target="_blank" rel="noopener">ogp.me</a> and defines a set of <code>&lt;meta&gt;</code> tags you place inside the <code>&lt;head&gt;</code> section of your HTML. When a social platform's crawler fetches your URL, it reads these tags to generate the rich preview card users see in their feeds.</p>
<p>Four meta tags are <strong>required</strong> by the protocol:</p>
<ul>
<li><code>og:title</code> — The headline shown on the preview card.</li>
<li><code>og:type</code> — The content type (e.g. <code>article</code>, <code>website</code>, <code>video.movie</code>).</li>
<li><code>og:image</code> — The URL of the image displayed in the card. For best results, use a 1200 &times; 630 pixel image.</li>
<li><code>og:url</code> — The canonical URL of the page.</li>
</ul>
<p>Two optional but strongly recommended tags round out most implementations: <code>og:description</code> (a one-to-two sentence summary) and <code>og:site_name</code> (your website's name).</p>

<h2>Open Graph in Practice</h2>
<p>On WordPress, you rarely add Open Graph tags by hand. SEO plugins like <strong>Yoast SEO</strong> and <strong>Rank Math</strong> automatically generate all required OG tags for every post and page, pulling from your SEO title, meta description, and featured image. Both plugins also let you override the social title and image per post if you want the shared version to differ from the search engine version.</p>
<p><strong>Twitter Cards</strong> work similarly but use their own tags (<code>twitter:card</code>, <code>twitter:title</code>, <code>twitter:image</code>). Twitter will fall back to Open Graph tags when its own are missing, so most SEO plugins output both sets automatically.</p>
<p>After setting your tags, use <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener">Facebook's Sharing Debugger</a> to preview exactly what Facebook will display and force it to re-scrape a page after changes. LinkedIn has its own <a href="https://www.linkedin.com/post-inspector/" target="_blank" rel="noopener">Post Inspector</a> for the same purpose.</p>
<p>Without Open Graph tags, platforms often pull the wrong image (a sidebar ad or logo), truncate the title, or show no description at all — making your shared links look unprofessional and reducing click-through rates.</p>

<h2>Why It Matters</h2>
<p>Every time someone shares your content on social media or in a group chat, Open Graph tags determine whether that link looks compelling or broken. A well-configured OG image and title can significantly increase the number of clicks your shared posts receive. Since WordPress SEO plugins handle this automatically, there is almost no reason to leave it unconfigured.</p>

<p><strong>Sources:</strong> <a href="https://ogp.me/" target="_blank" rel="noopener">The Open Graph protocol — ogp.me</a> · <a href="https://www.wpbeginner.com/wp-themes/how-to-add-facebook-open-graph-meta-data-in-wordpress-themes/" target="_blank" rel="noopener">WPBeginner — Open Graph in WordPress</a></p>`;

const entry = {
  term: "Open Graph",
  slug: "open-graph",
  shortDefinition:
    "A protocol created by Facebook that controls how your pages appear when shared on social media and messaging apps — defining the title, image, and description shown in link preview cards.",
  content,
  relatedTerms: ["seo", "meta-description", "featured-image"],
  relatedArticles: [
    "best-wordpress-seo-plugins",
    "is-wordpress-good-for-seo",
  ],
  category: "seo",
};

const result = await client.mutation(api.glossary.create, entry);
console.log("Created:", result);
