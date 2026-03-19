import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = process.env.CONVEX_URL;

const client = new ConvexHttpClient(CONVEX_URL);

const content = `<img src="/screenshots/glossary-full-site-editing.webp" alt="WordPress Full Site Editing documentation on developer.wordpress.org" class="glossary-screenshot" /><h2>What Is Full Site Editing?</h2><p>Full Site Editing (FSE) is a collection of WordPress features that extend the block editor beyond posts and pages to cover your entire website. Instead of editing headers in PHP files, footers in widget areas, and colors in the Customizer, FSE brings everything into one visual interface called the <strong>Site Editor</strong>.</p><p>FSE was first introduced in <strong>WordPress 5.8</strong> (July 2021) and reached a stable, production-ready state in <strong>WordPress 5.9</strong> (January 2022) with the launch of the Twenty Twenty-Two block theme. Each major release since has refined the experience — by 2026, the default WordPress theme (Twenty Twenty-Five) is itself a block theme, signaling that FSE is now the standard way to build WordPress sites.</p><h2>How FSE Works</h2><p>FSE is built on four core components:</p><ul><li><strong>Site Editor</strong> — Found under Appearance &gt; Editor, this is the visual canvas where you design templates and template parts for every page type on your site.</li><li><strong>Templates</strong> — Files that define the layout for pages like the homepage, single post, archive, 404, and search results. You can create and edit these visually without touching code.</li><li><strong>Template Parts</strong> — Reusable sections (header, footer, sidebar) that can be shared across multiple templates. Edit the header once and it updates everywhere.</li><li><strong>Global Styles</strong> — A centralized panel (the paintbrush icon in the Site Editor) where you set site-wide colors, typography, spacing, and block defaults using a <code>theme.json</code> configuration file under the hood.</li></ul><h2>Block Themes vs. Classic Themes</h2><p>FSE only works with <strong>block themes</strong>. A block theme uses HTML template files and <code>theme.json</code> instead of PHP templates and <code>functions.php</code>. Popular block themes include Twenty Twenty-Five (free, bundled with WordPress), Ollie, and Kadence.</p><p><strong>Classic themes</strong> — like Astra or GeneratePress in their traditional form — still use the older Customizer for design changes. They cannot use the Site Editor. Some theme developers now offer hybrid or block-compatible versions of their themes to bridge this gap.</p><h2>Who Needs FSE?</h2><p>FSE is ideal if you want to build a custom-looking site without hiring a developer. You can design a unique header, create different layouts for blog posts vs. landing pages, and apply global design changes in minutes.</p><p>That said, classic themes are still a perfectly valid choice in 2026 — especially if you are using a mature theme with an ecosystem of child themes, starter templates, and plugin integrations you rely on. The Customizer is not going away anytime soon.</p><h2>Why It Matters</h2><p>FSE represents WordPress's answer to page builders like Elementor and Divi — a native, code-free way to design any part of your site. As block themes mature and the Site Editor improves, FSE is becoming the default expectation for new WordPress projects.</p><p><strong>Sources:</strong> <a href="https://developer.wordpress.org/block-editor/getting-started/full-site-editing/" target="_blank" rel="noopener">WordPress Developer Docs — Full Site Editing</a> · <a href="https://fullsiteediting.com/lessons/what-is-full-site-editing/" target="_blank" rel="noopener">fullsiteediting.com</a></p>`;

const entry = {
  term: "Full Site Editing",
  slug: "full-site-editing",
  shortDefinition:
    "A WordPress feature set that lets you design your entire website — headers, footers, templates, and more — using the block editor instead of code or the Customizer.",
  content,
  relatedTerms: ["gutenberg", "block-pattern", "theme"],
  relatedArticles: [
    "how-to-make-a-wordpress-website",
    "best-free-wordpress-themes",
    "create-wordpress-pages-posts",
  ],
  category: "design",
};

const result = await client.mutation(api.glossary.create, entry);
console.log("Created:", result);
