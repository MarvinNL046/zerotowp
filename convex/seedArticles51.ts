import { internalMutation } from "./_generated/server";

// ─── Supporting: Hello Dolly Plugin Review ──────────────────────────────────

export const seedHelloDollyReview = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "hello-dolly-review";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-plugins"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-plugins' not found. Seed the wordpress-plugins cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-plugins':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "Hello Dolly: The Story Behind WordPress's Most Famous Plugin",
      excerpt:
        "Hello Dolly ships with every WordPress installation. It displays random lyrics from the Louis Armstrong song. Here is why it exists and whether you should keep it.",
      content: helloDollyReviewContent,
      category: "plugins",
      tags: ["wordpress", "plugins", "hello-dolly", "history"],
      seoTitle: "Hello Dolly Plugin: The Story Behind WordPress's First Plugin",
      seoDescription:
        "What is the Hello Dolly plugin and why does it ship with WordPress? The history behind WordPress's most famous (and most deleted) plugin.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing Hello Dolly review article:", existing._id);
      return {
        message: "Updated existing Hello Dolly review article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new Hello Dolly review article:", postId);
      return {
        message: "Created new Hello Dolly review article",
        id: postId,
      };
    }
  },
});

const helloDollyReviewContent = `
<img src="/images/blog/hello-dolly-review.webp" alt="Hello Dolly plugin page on WordPress.org" />

<p>If you have ever installed WordPress, you have seen it sitting in your plugins list: <strong>Hello Dolly</strong>. It ships with every single WordPress installation on the planet. Most people ignore it. Many delete it immediately. But Hello Dolly has a story worth knowing — it is the very first WordPress plugin ever created, and it has been bundled with WordPress since 2004.</p>

<h2>What Is Hello Dolly?</h2>

<p><a href="https://wordpress.org/plugins/hello-dolly/" target="_blank" rel="noopener noreferrer nofollow">Hello Dolly</a> is a plugin written by Matt Mullenweg, co-founder of WordPress. When you activate it, a random lyric from Louis Armstrong's 1964 classic "Hello, Dolly!" appears in the upper-right corner of your WordPress admin dashboard. That is literally all it does.</p>

<p>No settings page. No configuration options. No premium version. Just a random song lyric on every admin page load. It is a single PHP file with fewer than 100 lines of code.</p>

<p>The plugin currently has over 600,000 active installations and a 4.4-star rating on WordPress.org — which is remarkable for something that does essentially nothing useful.</p>

<h2>The History</h2>

<p>Hello Dolly was released in May 2004 alongside WordPress 1.2, the version that introduced the plugin architecture. It was one of the first five plugins ever made for WordPress, and it served a very specific purpose: to show developers that writing a WordPress plugin could be simple.</p>

<p>The name is a play on "Hello, World!" — the classic first program that every programmer writes when learning a new language. Mullenweg wanted to capture that same feeling of excitement and possibility. As the plugin's description famously states, it "symbolizes the hope and enthusiasm of an entire generation summed up in two words sung most famously by Louis Armstrong."</p>

<p>When asked why Hello Dolly still ships with every WordPress installation after all these years, Mullenweg's answer was characteristically straightforward: "Because it's nice to have a plugin with every install, and it's funny and weird."</p>

<p>The connection to jazz runs deeper than just this plugin. Every major WordPress release is named after a jazz musician — from Miles Davis (WordPress 1.0) to the more recent releases. Hello Dolly fits right into that tradition. It is a love letter to jazz culture baked into the software itself.</p>

<h2>Should You Keep It or Delete It?</h2>

<p>The honest answer: <strong>delete it</strong>.</p>

<p>Hello Dolly does nothing to improve your website. It does not help with SEO, security, speed, or anything else that matters for running a WordPress site. It is a novelty — a charming one, but a novelty nonetheless.</p>

<p>Security experts generally recommend removing any plugin you are not actively using, and Hello Dolly is no exception. While the plugin itself is perfectly safe, unused plugins can become a hiding spot for malicious code if your site is ever compromised. Keeping your plugins list clean is just good WordPress hygiene.</p>

<p>That said, if you want to keep it activated for a small dose of jazz nostalgia every time you log in, it will not hurt anything. The plugin is extremely lightweight and has zero impact on your site's front-end performance.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is it safe to delete Hello Dolly?</h3>

<p>Yes, completely safe. Hello Dolly has no impact on your WordPress site's functionality. Deleting it will not break anything. You can remove it from Plugins > Installed Plugins just like any other plugin.</p>

<h3>Why does WordPress include Hello Dolly?</h3>

<p>It ships with WordPress for historical and sentimental reasons. It was one of the first plugins ever created, and it serves as a simple example of how WordPress plugins work. Matt Mullenweg has kept it in every release since 2004 as a tradition and a nod to the platform's origins.</p>

<h3>Does Hello Dolly affect my site's performance?</h3>

<p>No. Even when activated, the plugin only runs a single lightweight function that displays a line of text in the admin area. It does not load any scripts or styles on the front end of your site. Your visitors will never know it exists.</p>

<h3>Can I use Hello Dolly as a starting point for my own plugin?</h3>

<p>That is exactly what it was designed for. Hello Dolly is a clean, minimal example of a working WordPress plugin. If you are learning plugin development, reading its source code is a great first step. It demonstrates the basic structure — the plugin header, hooks, and a simple function — without any unnecessary complexity.</p>

<hr />

<p><small>Sources: <a href="https://wordpress.org/plugins/hello-dolly/" target="_blank" rel="noopener noreferrer nofollow">WordPress.org — Hello Dolly</a> · <a href="https://speckyboy.com/hello-dolly-matt-mullenweg/" target="_blank" rel="noopener noreferrer nofollow">Speckyboy — An Ode to Hello Dolly with Matt Mullenweg</a></small></p>
`;
