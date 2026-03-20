import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = process.env.CONVEX_URL;

const client = new ConvexHttpClient(CONVEX_URL);

const content = `<img src="/screenshots/glossary-data-layer.webp" alt="Google Tag Manager developer documentation showing the data layer concept" class="glossary-screenshot" />

<h2>What Is the Data Layer?</h2>
<p>The data layer is a <strong>JavaScript array</strong> that acts as a temporary storage layer between your website and Google Tag Manager (GTM). When GTM loads on a page, it creates the <code>dataLayer</code> array automatically. Your website — or a WordPress plugin — then pushes structured key-value pairs into that array so GTM can read them and use them in tags, triggers, and variables.</p>
<p>The standard syntax looks like this:</p>
<pre><code>window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  'event': 'formSubmission',
  'formId': 'contact-form-1'
});</code></pre>
<p>The <code>window.dataLayer = window.dataLayer || []</code> line safely initializes the array if it does not exist yet. The <code>push()</code> method then appends a new object without overwriting any data that is already in the array. When GTM sees the special <code>event</code> key, it logs a distinct event that you can use to fire a Custom Event trigger. All other keys — like <code>formId</code> above — become accessible through Data Layer Variables in your GTM container.</p>
<p>On a WordPress site, plugins handle the heavy lifting. <strong>GTM4WP</strong> (Google Tag Manager for WordPress) is the most widely used plugin for this purpose. It automatically pushes rich page metadata into the data layer on every page load: post type, page title, categories, tags, author name, publication date, logged-in status, and user role. For WooCommerce stores, it adds the full set of GA4 ecommerce events — <code>view_item</code>, <code>add_to_cart</code>, <code>begin_checkout</code>, and <code>purchase</code> — complete with product IDs, names, prices, and quantities.</p>

<h2>Data Layer in Practice</h2>
<p><strong>GTM4WP</strong> remains the standard WordPress plugin for populating the data layer. After you install the plugin and paste your GTM container ID, it starts outputting a <code>dataLayer</code> object on every page. Inside GTM, you create <strong>Data Layer Variables</strong> that reference specific keys (for example, <code>pagePostType</code> or <code>pagePostAuthor</code>), then use those variables in triggers or as parameters inside your GA4 event tags.</p>
<p>For ecommerce, GTM4WP maps WooCommerce actions to the GA4 ecommerce data layer schema. When a customer adds a product to their cart, the plugin fires a <code>dataLayer.push()</code> with the <code>add_to_cart</code> event and all required product parameters. You do not need to write any custom JavaScript — the plugin handles the mapping between WooCommerce hooks and GTM events.</p>
<p>You can also push <strong>custom data layer variables</strong> using a small code snippet in your theme's <code>functions.php</code> or with a plugin like Code Snippets, giving you full control over what data GTM can access.</p>

<h2>Why It Matters</h2>
<p>Without a data layer, you would have to scrape information directly from the page HTML — a brittle approach that breaks whenever the design changes. The data layer decouples your tracking from your template code, making your analytics setup more reliable and easier to maintain. If you plan to install Google Analytics through GTM, understanding the data layer is essential — it is the mechanism that delivers your WordPress site's context to every tag you configure.</p>`;

const entry = {
  term: "Data Layer",
  slug: "data-layer",
  shortDefinition:
    "A JavaScript array (dataLayer) that temporarily stores structured page and user data so Google Tag Manager can read it and pass it to analytics tags, triggers, and variables.",
  content,
  relatedTerms: ["admin-ajax", "hook", "javascript"],
  relatedArticles: ["install-google-analytics-wordpress", "gtm4wp-review"],
  category: "technical",
};

const result = await client.mutation(api.glossary.create, entry);
console.log("Created:", result);
