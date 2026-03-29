import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = process.env.CONVEX_URL;

const client = new ConvexHttpClient(CONVEX_URL);

const content = `<img src="/screenshots/glossary-localhost.webp" alt="LocalWP — the most popular local WordPress development tool" class="glossary-screenshot" />

<h2>What Is Localhost?</h2>
<p>Localhost is the default hostname that refers to <strong>your own computer</strong>. When you type <code>localhost</code> into a browser's address bar, you are telling the browser to connect to a server running on the same machine — not a remote web server on the internet. Behind the scenes, localhost resolves to the IP address <code>127.0.0.1</code> (IPv4) or <code>::1</code> (IPv6). This address is part of the <strong>loopback network interface</strong>, meaning any data sent to it loops straight back to your computer without ever hitting a network cable.</p>
<p>For WordPress developers, localhost is where the magic starts. Instead of buying hosting and uploading files every time you want to test a change, you install a <strong>local server stack</strong> — Apache or Nginx, PHP, and MySQL — on your own machine. Your computer becomes a miniature web server, and your WordPress site runs at an address like <code>http://localhost:8888</code> or <code>http://mysite.local</code>.</p>
<p>Several tools make this setup effortless:</p>
<ul>
<li><strong>LocalWP</strong> (formerly Local by Flywheel) — a one-click WordPress installer with built-in SSL, WP-CLI, and cloud backups. Free and available on Mac, Windows, and Linux.</li>
<li><strong>DevKinsta</strong> — Kinsta's free local development suite with one-click push to Kinsta staging servers.</li>
<li><strong>MAMP / MAMP PRO</strong> — a classic tool that bundles Apache, Nginx, PHP, and MySQL. Still popular on macOS.</li>
<li><strong>XAMPP</strong> — a cross-platform stack from Apache Friends that includes Apache, MariaDB, PHP, and Perl.</li>
</ul>
<p>Because everything runs locally, you do not need an internet connection to build or test your site.</p>

<h2>Localhost in Practice</h2>
<p>A typical local development workflow looks like this: you create a new site in LocalWP or DevKinsta, install your theme and plugins, build out pages, and test until everything works. When you are happy with the result, you push the site to a <strong>staging environment</strong> on your hosting provider for a final review. After approval, you deploy to the live <strong>production</strong> server.</p>
<p>Working on localhost has clear benefits. Pages load instantly because there is zero network latency. You pay nothing for hosting during development. And you can experiment freely — break things, reset the database, try a different theme — without any risk to a live website visitors can see.</p>

<h2>Why It Matters</h2>
<p>Whether you are building your first WordPress site or managing a client workflow, understanding localhost is foundational. It keeps your development fast, free, and safe. Nearly every professional WordPress developer starts a new project on localhost before it ever touches a live server.</p>`;

const entry = {
  term: "Localhost",
  slug: "localhost",
  shortDefinition:
    "A hostname (127.0.0.1) that points to your own computer, letting you run a local web server to build and test WordPress sites without hosting or an internet connection.",
  content,
  relatedTerms: ["staging-site", "debugging", "migration"],
  relatedArticles: ["speed-up-wordpress", "install-wordpress"],
  category: "technical",
};

const result = await client.mutation(api.glossary.create, entry);
console.log("Created:", result);
