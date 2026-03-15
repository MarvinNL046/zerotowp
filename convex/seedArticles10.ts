import { internalMutation } from "./_generated/server";

export const seedBestContactFormPlugins = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "best-contact-form-plugins";

    // 1. Find the "wordpress-plugins" cluster
    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-plugins"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-plugins' not found. Run seedArticles7:seedPluginsPillar first.",
      };
    }

    console.log("Found cluster 'wordpress-plugins':", cluster._id);

    // 2. Check if the post already exists
    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "Best Contact Form Plugins for WordPress in 2026 — My Top 5 Picks",
      excerpt:
        "I've tested every major WordPress contact form plugin over the past decade. Here are my 5 picks — from free beginner options to powerful premium solutions.",
      content: bestContactFormPluginsContent,
      category: "plugins",
      tags: [
        "contact form",
        "form plugin",
        "wpforms",
        "contact form 7",
        "ninja forms",
        "gravity forms",
        "wordpress forms",
      ],
      seoTitle:
        "Best WordPress Contact Form Plugins 2026 — 5 Options Compared",
      seoDescription:
        "I've tested every major WordPress contact form plugin over the past decade. Here are my 5 picks — from free beginner options to powerful premium solutions.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing best contact form plugins article:",
        existing._id
      );
      return {
        message: "Updated existing best contact form plugins article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log(
        "Created new best contact form plugins article:",
        postId
      );
      return {
        message: "Created new best contact form plugins article",
        id: postId,
      };
    }
  },
});

const bestContactFormPluginsContent = `
<p>Every WordPress site needs a contact form. That's not an opinion — it's a fact I've learned the hard way over 10+ years of building WordPress sites for clients. I once had a freelance client who insisted on just putting his email address in the footer. "Why do I need a form? People can just email me." Within three months, spam bots had scraped that email address and he was getting over 200 junk emails a day. Pharmaceutical ads, phishing attempts, fake invoices — the works. We added a contact form, removed the visible email, and the spam stopped almost overnight.</p>

<p>Since then, I've installed and configured every major contact form plugin that exists. WPForms, Contact Form 7, Gravity Forms, Ninja Forms, Formidable Forms, Caldera Forms (rest in peace), JetPack forms, and a dozen others I've already forgotten. I've built simple "name and email" forms and complex multi-page application forms with conditional logic, file uploads, and payment integrations.</p>

<p>This article is my honest take on the five contact form plugins that are actually worth your time in 2026. No diplomatic fence-sitting. I'll tell you exactly which one I'd pick if I were starting from scratch, and why.</p>

<h2>Quick Comparison — Which Form Plugin Is Best?</h2>

<p>I know some of you just want the answer. Here's the summary before we dive deep:</p>

<table>
<thead>
<tr>
<th>Plugin</th>
<th>Best For</th>
<th>Price</th>
<th>Active Installs</th>
<th>Drag &amp; Drop</th>
<th>My Rating</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>WPForms</strong></td>
<td>Beginners (my #1 pick)</td>
<td>Free / $49.50/yr</td>
<td>6M+</td>
<td>Yes</td>
<td>5/5</td>
</tr>
<tr>
<td><strong>Contact Form 7</strong></td>
<td>Developers &amp; minimalists</td>
<td>Free</td>
<td>10M+</td>
<td>No</td>
<td>3.5/5</td>
</tr>
<tr>
<td><strong>Gravity Forms</strong></td>
<td>Businesses &amp; advanced forms</td>
<td>$59/yr</td>
<td>Premium only</td>
<td>Yes</td>
<td>4.5/5</td>
</tr>
<tr>
<td><strong>Ninja Forms</strong></td>
<td>Budget-friendly alternative</td>
<td>Free / $49/yr</td>
<td>600K+</td>
<td>Yes</td>
<td>4/5</td>
</tr>
<tr>
<td><strong>Formidable Forms</strong></td>
<td>Complex applications</td>
<td>Free / $39.50/yr</td>
<td>400K+</td>
<td>Yes</td>
<td>4/5</td>
</tr>
</tbody>
</table>

<p><strong>My recommendation:</strong> WPForms Lite for beginners (it's free and genuinely easy), Gravity Forms for businesses that need payment forms and conditional logic. If you're a developer who wants full control and doesn't mind getting your hands dirty, Contact Form 7 is still a solid choice — but it's not for everyone.</p>

<p>Now let me explain <em>why</em> I feel that way — with the kind of detail you won't find in most plugin comparison articles.</p>

<h2>Why Every WordPress Site Needs a Contact Form</h2>

<p>Before we compare plugins, let's talk about why you need a contact form at all. I touched on this in the intro with my client's spam horror story, but there are several reasons beyond just spam prevention:</p>

<ul>
<li><strong>Spam protection</strong> — Putting a raw email address on your website is like leaving your front door wide open. Spam bots crawl websites specifically looking for email addresses to harvest. A contact form hides your actual email while still letting real people reach you.</li>
<li><strong>Professionalism</strong> — A well-designed contact form looks more professional than a plain email link. It shows visitors you've put thought into the user experience and that you take inquiries seriously.</li>
<li><strong>Controlled information gathering</strong> — With a form, you decide what information you need. Name, email, phone number, project budget, timeline — you can require exactly the fields that help you respond effectively. No more back-and-forth emails asking for basic details.</li>
<li><strong>Lead qualification</strong> — With the right form plugin, you can add conditional logic to qualify leads before they even hit your inbox. "What's your budget?" with a dropdown can save you hours of conversations with people who can't afford your services.</li>
<li><strong>Record keeping</strong> — Most modern form plugins store submissions in your WordPress dashboard, giving you a searchable database of every inquiry. Email gets lost. Form submissions don't.</li>
</ul>

<p>I had another client — a wedding photographer — who resisted adding a contact form for years. She just had an email link. When she finally switched to a form with fields for wedding date, venue, and budget range, she told me it cut her email back-and-forth in half. She could immediately see which inquiries were worth pursuing and which weren't a fit. "Why didn't I do this five years ago?" she said. Good question.</p>

<p>If you're building a new WordPress site, a contact form should be one of the first things you set up — right after <a href="/how-to-install-wordpress">installing WordPress</a> and choosing your <a href="/must-have-plugins-new-site">essential plugins</a>.</p>

<h2>#1 WPForms — Best for Beginners (My Top Pick)</h2>

<img src="/screenshots/wpforms-plugin-page.webp" alt="WPForms plugin page in the WordPress directory showing 6 million+ active installations and drag-and-drop form builder interface" />

<p>WPForms is the contact form plugin I recommend to every beginner, and I don't say that lightly. I've tested dozens of form plugins over the years, and WPForms is the one that consistently gets the "this was actually easy" reaction from clients who've never built a form before.</p>

<p>It was created by Syed Balkhi — the same person behind WPBeginner, the largest WordPress resource site on the internet. That pedigree shows. Everything about WPForms is designed with beginners in mind, from the drag-and-drop builder to the 500+ pre-built templates that let you create a working contact form in under two minutes.</p>

<h3>Why It's My #1 Pick</h3>

<p>The drag-and-drop builder is genuinely the easiest I've used — and I've used them all. You pick a template (or start from scratch), drag fields where you want them, customize labels and placeholder text, and you're done. No shortcodes to memorize, no markup to write, no configuration files to edit. It just works.</p>

<p>The free Lite version is surprisingly capable. You get a contact form, suggestion form, newsletter signup form, and simple payment forms through Stripe. That covers probably 80% of what most small websites need. The 500+ templates mean you rarely have to build a form from scratch — there's almost always a template that's close to what you need.</p>

<h3>Free vs Premium</h3>

<p>WPForms Lite (free) includes:</p>
<ul>
<li>Drag-and-drop form builder</li>
<li>Pre-built form templates (contact, suggestion, newsletter signup)</li>
<li>Spam protection (reCAPTCHA, hCaptcha, custom CAPTCHA, Akismet)</li>
<li>Email notifications</li>
<li>Basic Stripe payments</li>
<li>Entry management in dashboard</li>
</ul>

<p>WPForms Premium (from $49.50/yr) adds:</p>
<ul>
<li>Conditional logic — show/hide fields based on user input</li>
<li>File uploads</li>
<li>Multi-page forms</li>
<li>Payment integrations (PayPal, Square, Authorize.net)</li>
<li>User registration forms</li>
<li>Post submissions (let users submit blog posts from the frontend)</li>
<li>Survey and poll features</li>
<li>Geolocation</li>
<li>500+ additional templates</li>
</ul>

<p>I built a client's entire booking inquiry form in under 10 minutes with WPForms. The form had fields for event type, date, guest count, budget range, and a file upload for inspiration photos. With conditional logic, it showed different follow-up questions depending on the event type — wedding inquiries got venue preference questions, corporate events got AV requirement questions. Try doing that with Contact Form 7. Actually, don't — you'll spend three hours reading documentation and still end up frustrated.</p>

<p class="pro-tip"><strong>Pro Tip:</strong> Start with the free Lite version. Seriously. You won't need Premium unless you want payment forms, file uploads, or multi-page forms. The free version handles basic contact forms perfectly, and you can always upgrade later without losing any data. I've seen too many people buy Premium on day one and never use half the features.</p>

<h3>Pros</h3>
<ul>
<li>Genuinely the easiest form builder I've ever used — my non-technical clients can manage their own forms</li>
<li>500+ templates cover almost every use case imaginable</li>
<li>6M+ active installs — massive community, tons of tutorials, rock-solid stability</li>
<li>Excellent spam protection built in (reCAPTCHA, hCaptcha, honeypot, Akismet)</li>
<li>Beautiful forms out of the box — no CSS tweaking needed</li>
<li>Lightweight — doesn't slow down your site</li>
</ul>

<h3>Cons</h3>
<ul>
<li>Advanced features require Premium — conditional logic, file uploads, and payment forms are paid</li>
<li>Premium pricing is per-site — gets expensive if you manage multiple sites</li>
<li>The free version doesn't include form abandonment tracking or advanced entry management</li>
</ul>

<h2>#2 Contact Form 7 — The OG (But Showing Its Age)</h2>

<img src="/screenshots/contact-form-7-plugin-page.webp" alt="Contact Form 7 plugin page in the WordPress directory showing 10 million+ active installations — the most installed contact form plugin ever" />

<p>Contact Form 7. Where do I even begin? This plugin has been around since 2007. It has over 10 million active installations — making it the most installed contact form plugin in WordPress history. It's completely free, with no premium version and no upsells. Just a pure, no-nonsense form plugin maintained by Takayuki Miyoshi, a Japanese developer who's been quietly keeping this thing running for nearly two decades.</p>

<p>I used Contact Form 7 exclusively from 2010 to 2016. Six years. Every client site, every personal project, every form I built. And it worked. It always worked. But then WPForms came along, and I never looked back.</p>

<h3>The Honest Assessment</h3>

<p>Contact Form 7 is like a manual transmission car — it works great if you know what you're doing, but most beginners should go automatic. There's no visual builder. You configure forms using a markup-like syntax with shortcode tags. Want to add a field? You write <code>[text* your-name]</code>. Want conditional logic? You install a third-party addon. Want to store form submissions in your dashboard? You install <em>another</em> third-party addon (Flamingo).</p>

<p>The strength of CF7 is its simplicity and its extensibility. It does one thing — render and process forms — and it does it well. The HTML output is clean, semantic, and easy to style. There's no bloat, no unnecessary JavaScript, no heavy admin UI. It loads fast because there's almost nothing to load.</p>

<h3>When to Use Contact Form 7</h3>
<ul>
<li>You're a developer who wants full control over form markup and styling</li>
<li>You need the lightest possible form plugin (minimal performance impact)</li>
<li>You only need basic contact forms — name, email, message, submit</li>
<li>You're comfortable with shortcode-style configuration</li>
<li>You don't need form submissions stored in WordPress (email notifications are enough)</li>
</ul>

<h3>When NOT to Use Contact Form 7</h3>
<ul>
<li>You're a beginner who wants a visual drag-and-drop builder</li>
<li>You need conditional logic, file uploads, or payment forms without hunting for third-party addons</li>
<li>You want form submissions stored and searchable in your WordPress dashboard</li>
<li>You're building complex multi-page forms</li>
<li>You want pre-built templates to speed up form creation</li>
</ul>

<p>Here's my honest take: Contact Form 7 is still a perfectly fine plugin in 2026. It's stable, it's free, and it works. But the world has moved on. When WPForms gives you a drag-and-drop builder, 500+ templates, built-in submission storage, and spam protection in its free version — all things CF7 doesn't have — it's hard to recommend CF7 to anyone who isn't a developer.</p>

<p>That said, if you're running CF7 on an existing site and everything works fine, there's no urgent reason to switch. Don't fix what isn't broken. But if you're starting fresh? Go with WPForms.</p>

<h3>Pros</h3>
<ul>
<li>100% free — no premium version, no upsells, no limitations</li>
<li>Incredibly lightweight — minimal performance impact</li>
<li>Clean HTML output — easy to style with custom CSS</li>
<li>Massive ecosystem of third-party addons and extensions</li>
<li>Nearly two decades of proven stability</li>
</ul>

<h3>Cons</h3>
<ul>
<li>No visual builder — configuration uses markup/shortcodes</li>
<li>No built-in submission storage — emails only (without Flamingo addon)</li>
<li>No templates — you build every form from scratch</li>
<li>Advanced features require third-party plugins that may or may not be maintained</li>
<li>Steeper learning curve for non-developers</li>
</ul>

<p class="pro-tip"><strong>Pro Tip:</strong> If you do use Contact Form 7, install the free Flamingo plugin alongside it. Flamingo stores all form submissions in your WordPress dashboard so you have a backup if emails get lost. I've seen too many people lose important inquiries because their email server ate the notification. Flamingo is a safety net every CF7 user needs.</p>

<h2>#3 Gravity Forms — Best Premium Option</h2>

<img src="/screenshots/gravity-forms-homepage.webp" alt="Gravity Forms homepage showing the premium WordPress form plugin trusted by companies like Yale, Google, Nike, and UNICEF" />

<p>Gravity Forms is the Rolls-Royce of WordPress form plugins. No free version, no freemium model — you pay from day one. And honestly? It's worth every penny for the right use case.</p>

<p>Trusted by Yale, Airbnb, Google, Nike, ESPN, and UNICEF — Gravity Forms is the plugin that agencies and serious businesses reach for when they need forms that do more than collect a name and email. Payment forms, multi-step wizards, conditional logic, user registration, surveys, quizzes, calculations — Gravity Forms does it all, and it does it exceptionally well.</p>

<h3>Why Businesses Choose Gravity Forms</h3>

<p>I use Gravity Forms on all my agency client sites. Not WPForms, not CF7 — Gravity Forms. And the reason is simple: the conditional logic alone has saved me hundreds of hours.</p>

<p>Here's a real example. I built a project inquiry form for a web design agency. The form started with "What type of project do you need?" with options like Website Redesign, New Website, E-commerce Store, and Maintenance. Based on the selection, completely different sets of follow-up questions appeared. Website Redesign asked for the current URL, what they didn't like about the current site, and their timeline. E-commerce Store asked about product count, payment gateway preferences, and shipping requirements. Each path ended with a budget range field and a file upload for any existing brand assets.</p>

<p>That kind of sophisticated conditional logic is where Gravity Forms shines. WPForms can do conditional logic too (in its Premium version), but Gravity Forms' implementation is more mature, more flexible, and supports deeper nesting.</p>

<h3>Key Features</h3>
<ul>
<li><strong>Conditional logic</strong> — Show, hide, or modify fields based on user input. The most powerful implementation of any WordPress form plugin.</li>
<li><strong>Payment forms</strong> — Native integrations with Stripe, PayPal, Square, and Authorize.net. Collect payments directly through your forms.</li>
<li><strong>File uploads</strong> — Multi-file uploads with type and size restrictions. Files can be stored on your server or connected cloud storage.</li>
<li><strong>User registration</strong> — Create WordPress user accounts through form submissions. Perfect for membership sites.</li>
<li><strong>Surveys and polls</strong> — Built-in survey fields with Likert scales, ranking, and rating options. Results are displayed in the dashboard with charts.</li>
<li><strong>Calculations</strong> — Create forms that calculate totals, quotes, or scores based on user input. I've used this for everything from BMI calculators to project cost estimators.</li>
<li><strong>Multi-page forms</strong> — Split long forms into pages with progress bars. Dramatically improves completion rates on complex forms.</li>
<li><strong>Webhooks and API</strong> — Send form data to any external service. Integrates with Zapier, Slack, CRMs, and pretty much anything with an API.</li>
</ul>

<h3>Pricing</h3>

<table>
<thead>
<tr>
<th>Plan</th>
<th>Price</th>
<th>Sites</th>
<th>Includes</th>
</tr>
</thead>
<tbody>
<tr>
<td>Basic License</td>
<td>$59/yr</td>
<td>1 site</td>
<td>Core plugin + basic addons</td>
</tr>
<tr>
<td>Pro License</td>
<td>$159/yr</td>
<td>3 sites</td>
<td>Core + most addons (Stripe, PayPal, etc.)</td>
</tr>
<tr>
<td>Elite License</td>
<td>$259/yr</td>
<td>Unlimited</td>
<td>Everything — all addons, priority support</td>
</tr>
</tbody>
</table>

<p>Yes, it's more expensive than WPForms. But if you need forms that handle payments, complex conditional logic, calculations, or user registration — Gravity Forms pays for itself with the time it saves you. I've watched developers spend 20+ hours trying to hack together payment functionality with free plugins when a $59 Gravity Forms license would have solved it in 30 minutes.</p>

<h3>Pros</h3>
<ul>
<li>The most powerful conditional logic of any WordPress form plugin</li>
<li>Native payment integrations that actually work reliably</li>
<li>Incredible developer ecosystem — hooks, filters, and API for everything</li>
<li>Rock-solid stability — trusted by enterprise organizations</li>
<li>Excellent documentation and support</li>
</ul>

<h3>Cons</h3>
<ul>
<li>No free version — you pay from day one</li>
<li>The admin UI feels slightly dated compared to WPForms (functional but not as polished)</li>
<li>Can feel overwhelming for simple contact forms — it's like using a sledgehammer to hang a picture</li>
<li>Annual license renewal required — if you don't renew, you keep the plugin but lose updates and support</li>
</ul>

<p class="pro-tip"><strong>Pro Tip:</strong> If you're an agency or freelancer managing multiple WordPress sites, the Elite License ($259/yr for unlimited sites) is the best deal in the WordPress form plugin space. I've used my Elite license on 30+ client sites over the years — that works out to less than $9 per site per year for the most powerful form plugin available.</p>

<h2>#4 Ninja Forms — Good Free Alternative</h2>

<img src="/screenshots/ninja-forms-plugin-page.webp" alt="Ninja Forms plugin page in the WordPress directory showing 600K+ active installations with a visual drag-and-drop form builder" />

<p>Ninja Forms has been around since 2011, and it occupies a solid middle ground between the simplicity of WPForms and the power of Gravity Forms. With 600K+ active installations, it's not as popular as the big players, but it has a loyal following — and for good reason.</p>

<h3>What Makes Ninja Forms Stand Out</h3>

<p>The free version is genuinely generous. You get a drag-and-drop form builder, unlimited forms, unlimited submissions, and conditional logic basics — all without paying a cent. That's more than WPForms Lite offers in the conditional logic department.</p>

<p>The builder interface is clean and intuitive. Not quite as polished as WPForms' builder, but still miles ahead of Contact Form 7's markup-based approach. You drag fields onto your form canvas, configure options in a sidebar panel, and preview the result in real time. It works well.</p>

<h3>Key Features (Free)</h3>
<ul>
<li>Drag-and-drop form builder</li>
<li>Unlimited forms and submissions</li>
<li>Submission storage in WordPress dashboard</li>
<li>Email notifications</li>
<li>reCAPTCHA and honeypot spam protection</li>
<li>Multi-part forms (basic)</li>
<li>10+ form templates</li>
</ul>

<h3>Premium Add-ons</h3>

<p>This is where Ninja Forms takes a different approach from WPForms and Gravity Forms. Instead of tiered annual plans, Ninja Forms sells individual add-ons. Need file uploads? Buy the File Uploads addon. Need PayPal integration? Buy the PayPal addon. Need conditional logic (advanced)? Buy that addon.</p>

<p>The a la carte model sounds great in theory — "only pay for what you need!" — but in practice, it can add up quickly. Three or four add-ons and you've exceeded the cost of a WPForms Premium license that includes everything. They do offer bundles (starting at $49/yr for a membership), but the individual pricing can catch you off guard if you're not paying attention.</p>

<h3>My Honest Take</h3>

<p>Ninja Forms is a solid plugin. I've used it on half a dozen client sites and it performs well. The free version is more generous than WPForms Lite in some respects (unlimited submissions, basic conditional logic). But the add-on pricing model means costs can spiral if you need more than the basics.</p>

<p>The UI is also showing its age a bit. WPForms has invested heavily in its builder interface over the past few years, and it shows — WPForms' builder just feels more modern and responsive. Ninja Forms works fine, but it doesn't spark the same "wow, this is nice" reaction.</p>

<h3>Pros</h3>
<ul>
<li>Generous free version — unlimited forms and submissions</li>
<li>A la carte add-on model means you only pay for features you need</li>
<li>Solid drag-and-drop builder</li>
<li>Been around since 2011 — proven and stable</li>
<li>Active community and decent documentation</li>
</ul>

<h3>Cons</h3>
<ul>
<li>Add-on costs can add up quickly — buying 3-4 add-ons exceeds competitors' all-inclusive plans</li>
<li>UI feels slightly dated compared to WPForms</li>
<li>Smaller ecosystem than WPForms or CF7</li>
<li>Fewer templates than WPForms (10+ vs 500+)</li>
</ul>

<h2>#5 Formidable Forms — For Complex Applications</h2>

<p>Formidable Forms is the plugin you reach for when you need to build something that's more web application than contact form. Calculators, directories, application forms, registrations with complex validation — that's Formidable's wheelhouse.</p>

<p>It has a free version on WordPress.org with 400K+ active installations and a drag-and-drop builder. The free version handles basic contact forms perfectly well. But the real power is in the Premium version (from $39.50/yr), which includes features like calculated fields, front-end data displays (views), and the ability to build genuinely complex applications without writing code.</p>

<h3>When Formidable Forms Is the Right Choice</h3>

<p>If you need to build something more like a web application than a contact form, Formidable Forms is your best bet. I once used it to build a real estate listing submission system where agents could submit properties through a frontend form, and the listings automatically appeared on the site with filtering by price, location, and property type. WPForms or Gravity Forms could have done parts of this, but Formidable's "Views" feature — which lets you display submitted data on the frontend — made it dramatically easier.</p>

<p>For straight-up contact forms? It's overkill. Use WPForms instead. Formidable is the specialist tool you bring in when general-purpose plugins can't cut it.</p>

<h3>Pros</h3>
<ul>
<li>Unmatched for complex form-based applications</li>
<li>Calculated fields for quotes, estimates, and scoring</li>
<li>Views feature for displaying submitted data on the frontend</li>
<li>Good free version for basic forms</li>
<li>Affordable Premium pricing starting at $39.50/yr</li>
</ul>

<h3>Cons</h3>
<ul>
<li>Overkill for simple contact forms</li>
<li>Steeper learning curve than WPForms or Ninja Forms</li>
<li>Smaller community and ecosystem</li>
<li>The power features are in Premium only</li>
</ul>

<h2>The Full Comparison</h2>

<p>Here's the detailed side-by-side comparison. Every cell is based on my hands-on experience, not copied from marketing pages.</p>

<table>
<thead>
<tr>
<th>Feature</th>
<th>WPForms</th>
<th>Contact Form 7</th>
<th>Gravity Forms</th>
<th>Ninja Forms</th>
</tr>
</thead>
<tbody>
<tr>
<td>Drag &amp; drop builder</td>
<td>Yes</td>
<td>No</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Free version</td>
<td>Yes</td>
<td>Yes (100%)</td>
<td>No</td>
<td>Yes</td>
</tr>
<tr>
<td>Templates</td>
<td>500+</td>
<td>None</td>
<td>40+</td>
<td>10+</td>
</tr>
<tr>
<td>Submission storage</td>
<td>Yes</td>
<td>No (email only)</td>
<td>Yes</td>
<td>Yes</td>
</tr>
<tr>
<td>Conditional logic</td>
<td>Premium</td>
<td>Plugin needed</td>
<td>Yes</td>
<td>Add-on</td>
</tr>
<tr>
<td>File uploads</td>
<td>Premium</td>
<td>Plugin needed</td>
<td>Yes</td>
<td>Add-on</td>
</tr>
<tr>
<td>Payment forms</td>
<td>Premium</td>
<td>No</td>
<td>Yes</td>
<td>Add-on</td>
</tr>
<tr>
<td>Multi-page forms</td>
<td>Premium</td>
<td>No</td>
<td>Yes</td>
<td>Add-on</td>
</tr>
<tr>
<td>Spam protection</td>
<td>reCAPTCHA + custom</td>
<td>reCAPTCHA</td>
<td>reCAPTCHA + Akismet</td>
<td>reCAPTCHA</td>
</tr>
<tr>
<td>Price (1 site)</td>
<td>Free / $49.50/yr</td>
<td>Free</td>
<td>$59/yr</td>
<td>Free / varies</td>
</tr>
<tr>
<td>Active installs</td>
<td>6M+</td>
<td>10M+</td>
<td>Premium only</td>
<td>600K+</td>
</tr>
</tbody>
</table>

<p>The table tells a clear story. WPForms offers the best balance of ease-of-use and features for most people. Contact Form 7 is the lightest and cheapest (completely free) but requires the most technical knowledge. Gravity Forms is the most powerful but costs money from day one. Ninja Forms is a solid middle ground but the add-on costs can surprise you.</p>

<h2>How to Install and Set Up Your First Contact Form</h2>

<img src="/screenshots/wordpress-plugin-install.webp" alt="WordPress admin plugin installation screen showing the Add New Plugin page where you can search for and install contact form plugins" />

<p>Let me walk you through setting up your first contact form using WPForms (since it's my top recommendation). The process is almost identical for the other plugins on this list.</p>

<h3>Step 1: Install the Plugin</h3>

<p>In your WordPress dashboard, go to <strong>Plugins → Add New</strong>. Search for "WPForms" and click <strong>Install Now</strong>, then <strong>Activate</strong>. If you need help with the basics, my <a href="/how-to-install-wordpress">WordPress installation guide</a> covers dashboard navigation in detail.</p>

<h3>Step 2: Create Your Form</h3>

<p>After activation, go to <strong>WPForms → Add New</strong>. You'll see a template library — select "Simple Contact Form." The builder opens with Name, Email, and Message fields already in place. You can drag additional fields from the left panel, rearrange them, and customize labels.</p>

<h3>Step 3: Configure Notifications</h3>

<p>Click the <strong>Settings → Notifications</strong> tab. By default, form submissions go to your WordPress admin email. You can add additional email addresses, customize the subject line, and include/exclude specific form fields in the notification email.</p>

<h3>Step 4: Add the Form to a Page</h3>

<p>Create a new page (or edit an existing one), add a WPForms block (or use the shortcode), and select your form. Publish the page, and you're done. Your contact form is live.</p>

<p>The entire process takes about 5 minutes. For a complete walkthrough of building your WordPress site from scratch, check out my <a href="/how-to-make-a-wordpress-website">complete guide to making a WordPress website</a>.</p>

<p class="pro-tip"><strong>Pro Tip:</strong> Always test your contact form after setting it up. Submit a test message yourself and verify you receive the notification email. I can't tell you how many times I've seen forms that were "set up" but never tested — and the site owner only found out the notifications weren't working when a frustrated customer called them directly.</p>

<h2>Frequently Asked Questions</h2>

<h3>What's the best free contact form plugin?</h3>

<p><strong>WPForms Lite.</strong> It gives you a drag-and-drop builder, pre-built templates, submission storage, and spam protection — all free. Contact Form 7 is also free, but it lacks a visual builder and doesn't store submissions in your dashboard. For most people, WPForms Lite offers the better experience by far.</p>

<h3>Is Contact Form 7 still good in 2026?</h3>

<p>For developers who want lightweight, minimal forms with full control over the markup — yes, it's still a solid choice. For beginners who want a visual builder and modern features — no, there are much better options now. CF7 hasn't fundamentally changed in years, and the competition has leap-frogged it in terms of user experience.</p>

<h3>Do I need a premium form plugin?</h3>

<p>Only if you need features like payment processing, file uploads, advanced conditional logic, or multi-page forms. For a basic contact form (name, email, message), the free version of WPForms or Ninja Forms is more than enough. Don't pay for features you won't use.</p>

<h3>Can form plugins slow down my site?</h3>

<p>The plugins on this list are all well-optimized and shouldn't noticeably impact your site speed. Contact Form 7 is the lightest of the bunch, followed by WPForms. Gravity Forms and Ninja Forms load slightly more assets but nothing that would concern you. If site speed is a priority (and it should be), check out my <a href="/wordpress-speed">WordPress speed optimization guide</a> for a complete optimization strategy.</p>

<h3>How do I prevent spam on my contact form?</h3>

<p>Use a three-layer approach: <strong>reCAPTCHA</strong> (or hCaptcha) as the first line of defense, a <strong>honeypot field</strong> (an invisible field that only bots fill out), and <strong>Akismet</strong> to catch anything that slips through. WPForms and Gravity Forms support all three out of the box. For Contact Form 7, you'll need to add the Akismet integration manually. For broader <a href="/wordpress-security">WordPress security</a> best practices, see my dedicated security guide.</p>

<h3>WPForms vs Gravity Forms — which should I choose?</h3>

<p><strong>WPForms for simple forms, Gravity Forms for complex ones.</strong> If you need a contact form, newsletter signup, or basic inquiry form — WPForms (even the free version) is the better choice. It's easier to use and cheaper. If you need payment forms, conditional logic wizards, calculated fields, surveys, or user registration — Gravity Forms is worth the investment. Think of it this way: WPForms is the Honda Civic (reliable, affordable, gets the job done), Gravity Forms is the BMW 5 Series (more powerful, more expensive, overkill for grocery runs).</p>

<h2>Final Thoughts</h2>

<p>I've been building WordPress sites for over a decade, and contact forms are one of those things that should be simple but somehow generate endless debate. "Which plugin is best?" "Is CF7 dead?" "Is Gravity Forms worth the money?" I've heard every question a hundred times.</p>

<p>Here's my honest summary after years of hands-on experience with all five of these plugins:</p>

<ul>
<li><strong>WPForms</strong> is the best choice for 90% of people. The free version handles basic forms beautifully, and Premium is worth it if you need more.</li>
<li><strong>Contact Form 7</strong> is a legacy choice. It works, it's free, and developers love it. But for everyone else, it's been surpassed.</li>
<li><strong>Gravity Forms</strong> is the premium powerhouse. If forms are a critical part of your business, it's worth every dollar.</li>
<li><strong>Ninja Forms</strong> is a solid alternative, especially if you only need one or two premium features.</li>
<li><strong>Formidable Forms</strong> is the specialist — reach for it when you need application-level forms.</li>
</ul>

<p>Whatever you choose, the most important thing is to actually have a contact form on your site. Don't put a raw email address in your footer and call it a day. Your future self — the one not drowning in spam — will thank you.</p>

<p>For more on building and optimizing your WordPress site, check out these related guides:</p>

<ul>
<li><a href="/best-wordpress-plugins">Best WordPress Plugins</a> — My complete plugin roundup across every category</li>
<li><a href="/must-have-plugins-new-site">12 Must-Have Plugins for New Sites</a> — The exact plugins I install on every new WordPress site</li>
<li><a href="/wordpress-plugins">WordPress Plugins Hub</a> — All my plugin guides in one place</li>
<li><a href="/best-seo-plugins">Best SEO Plugins</a> — Yoast vs Rank Math vs AIOSEO compared</li>
<li><a href="/how-to-make-a-wordpress-website">How to Make a WordPress Website</a> — Start from scratch</li>
<li><a href="/how-to-install-wordpress">How to Install WordPress</a> — Step-by-step installation</li>
<li><a href="/wordpress-hosting">WordPress Hosting Guide</a> — Choose the right foundation</li>
<li><a href="/wordpress-security">WordPress Security Guide</a> — Keep your site safe</li>
<li><a href="/wordpress-speed">WordPress Speed Optimization</a> — Make your site fast</li>
<li><a href="/start-here">Start Here</a> — My complete WordPress roadmap</li>
</ul>

<p>Happy form building!</p>
`;
