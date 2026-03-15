import { internalMutation } from "./_generated/server";

// ─── Supporting: How to Improve WordPress SEO ────────────────────────────────

export const seedImproveWordPressSeo = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "improve-wordpress-seo";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-seo"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-seo' not found. Run seedSeoCluster:seedSeoCluster first.",
      };
    }

    console.log("Found cluster 'wordpress-seo':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title: "How to Improve WordPress SEO: 15 Tips That Actually Work",
      excerpt:
        "Your WordPress site is live but traffic is flat. After 20 years of building and optimizing WordPress sites, here are the 15 things I do on every single project to get Google traffic flowing.",
      content: improveWordPressSeoContent,
      category: "seo",
      tags: [
        "wordpress seo",
        "improve seo",
        "seo tips",
        "on-page seo",
        "technical seo",
        "google ranking",
        "search engine optimization",
        "wordpress seo tips",
      ],
      seoTitle: "How to Improve WordPress SEO: 15 Actionable Tips (2026)",
      seoDescription:
        "15 practical WordPress SEO tips you can implement today. Covers permalinks, SEO plugins, sitemaps, image optimization, internal linking, site speed, and more.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing improve SEO article:", existing._id);
      return {
        message: "Updated existing improve SEO article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new improve SEO article:", postId);
      return { message: "Created new improve SEO article", id: postId };
    }
  },
});

const improveWordPressSeoContent = `
<p>Your WordPress site is live but traffic is flat. I've been there — back in 2006, I published my first WordPress blog and waited for traffic that never came. WordPress doesn't magically rank on Google just because you hit "Publish." You have to give it a reason to show your site over millions of others. The good news? WordPress is already one of the <a href="/is-wordpress-good-for-seo/">best platforms for SEO</a>. These 15 tips are the exact things I do on every project to get Google traffic flowing. Most take less than 10 minutes.</p>

<h2>Beginner SEO Tips (Do These First)</h2>

<p>If you haven't touched any SEO settings yet, start here. These five tips form the foundation that everything else builds on. Skip them, and nothing else on this list will matter much.</p>

<h3>1. Set Your Permalink Structure to Post Name</h3>

<p>This is the single most impactful 30-second change you can make. By default, WordPress uses "ugly" permalinks that look like <code>yoursite.com/?p=123</code>. That tells Google absolutely nothing about what the page is about. Go to <strong>Settings → Permalinks</strong> and select <strong>"Post name"</strong> so your URLs look like <code>yoursite.com/how-to-improve-wordpress-seo/</code>. Clean, keyword-rich URLs are a ranking signal, and they also look way more clickable in search results.</p>

<p><strong>Warning:</strong> If your site already has indexed pages, changing permalinks will break existing URLs. For brand new sites, just do it now. For established sites, use the Redirection plugin to set up 301 redirects first.</p>

<h3>2. Install an SEO Plugin</h3>

<p>WordPress handles basics well, but it doesn't give you control over title tags, meta descriptions, sitemaps, or schema markup. You need an SEO plugin for that. I've used both Yoast and Rank Math extensively, and honestly, either one will get the job done. Rank Math gives you more features for free, while Yoast has been around longer and is slightly more beginner-friendly. Check my <a href="/yoast-vs-rank-math/">detailed Yoast vs Rank Math comparison</a> to decide which fits your workflow.</p>

<img src="/screenshots/yoast-seo-plugin.webp" alt="Yoast SEO plugin showing on-page analysis with readability and SEO scores in the WordPress editor" />

<p>Once installed, walk through the setup wizard. The key features you want active from day one: XML sitemaps, title tag templates, meta description fields on every post, and Open Graph tags for social sharing. The defaults are solid — don't overthink the advanced settings yet.</p>

<h3>3. Submit Your Sitemap to Google Search Console</h3>

<p>Google Search Console is the single most underrated free SEO tool. It shows you exactly what Google sees when it looks at your site — crawl errors, indexed pages, search queries, and performance data. If you're not using it, you're flying blind. Head to <a href="https://search.google.com/search-console/about" target="_blank" rel="noopener">search.google.com/search-console</a>, verify your site ownership (the DNS method is the most reliable), and then submit your XML sitemap.</p>

<img src="/screenshots/search-console-performance.webp" alt="Google Search Console about page showing performance monitoring and search analytics tools" />

<p>Your SEO plugin generates the sitemap automatically at <code>yoursite.com/sitemap_index.xml</code>. Once submitted, Google starts crawling within days. Check back weekly — I've caught broken pages, accidental noindex tags, and mobile issues all because Search Console flagged them early.</p>

<h3>4. Write Compelling Title Tags with Your Target Keyword</h3>

<p>Your title tag is the blue clickable link in Google search results. It's the first thing people see, and it's a direct ranking factor. Every page on your site should have a unique title tag that includes the keyword you're targeting, ideally near the beginning. Your SEO plugin adds a field for this right in the editor — use it on every single post and page.</p>

<p>"WordPress Tips" is boring. "15 WordPress SEO Tips That Actually Work (2026)" tells people exactly what they'll get. Keep titles under 60 characters so Google doesn't truncate them, and always preview using the snippet tool in your SEO plugin before publishing.</p>

<h3>5. Write Meta Descriptions That Get Clicks</h3>

<p>Meta descriptions don't directly affect rankings, but they massively impact click-through rate — and click-through rate <em>does</em> affect rankings indirectly. A compelling meta description can double your clicks even at the same ranking position. Think of it as your 155-character sales pitch. Include your target keyword (Google bolds matching terms), state the benefit clearly, and end with a subtle call to action.</p>

<p><strong>Pro tip:</strong> If you don't write a meta description, Google auto-generates one by pulling random text from your page. I've seen it pull footer text and copyright notices. Write one yourself — 30 seconds of work gives you control over how your page appears in search results.</p>

<h2>On-Page SEO Tips</h2>

<p>Once your foundation is set, these five tips will help every individual post and page rank as high as possible. On-page SEO is where most beginners leave the biggest gains on the table — small tweaks that compound over dozens of posts.</p>

<h3>6. Use Proper Heading Hierarchy</h3>

<p>Your page should have exactly one H1 tag — that's your post title, and WordPress handles this automatically. After that, use H2 tags for main sections and H3 tags for subsections within those. Never skip levels (jumping from H2 to H4), and never use headings just to make text bigger. Google uses your heading structure to understand the hierarchy and topics on your page. A well-structured post with clear headings consistently outranks a wall-of-text post, even if the content quality is similar.</p>

<p>I structure every post before writing by outlining all H2s and H3s first, then filling in content. This keeps articles focused and scannable — reducing bounce rate, which Google pays attention to. Use my <a href="/wordpress-seo-checklist/">WordPress SEO checklist</a> to make sure you're not missing structural elements.</p>

<h3>7. Optimize Your Images</h3>

<p>Images are often the heaviest elements on a page, and slow pages rank worse. Every image on your site needs three things: a descriptive filename (not <code>IMG_4532.jpg</code>), a meaningful alt tag that describes what the image shows, and compression. Rename your files before uploading — <code>wordpress-dashboard-settings.webp</code> tells Google what the image is about.</p>

<p>For compression, I use dedicated <a href="/best-image-optimization-plugins/">image optimization plugins</a> that automatically compress and convert images to WebP format on upload. WebP images are 25-35% smaller than JPEG at the same visual quality. If your site has hundreds of unoptimized images, this single change can cut your page load time in half. Alt tags also make your site accessible to screen readers, which is both good practice and increasingly important for SEO.</p>

<h3>8. Add Internal Links (3-5 Per Post)</h3>

<p>Internal linking is the most underused SEO technique I see on WordPress sites. Every time you publish a post, link to 3-5 other relevant posts on your site using descriptive anchor text. Don't just link with "click here" — use anchor text that describes the target page, like <a href="/wordpress-seo-guide/">WordPress SEO guide</a>. This helps Google discover and understand the relationship between your pages, and it passes authority from your stronger pages to newer ones.</p>

<p>Here's something most tutorials skip: internal linking works both ways. After publishing a new post, go back to 2-3 older related posts and add links pointing to it. I spend 5 minutes after every publish adding reciprocal links — tedious, but one of the highest-ROI SEO activities you can do for free.</p>

<h3>9. Target One Primary Keyword Per Post</h3>

<p>Every post should target one specific keyword. Not three. Not five. One primary keyword, with a few natural variations sprinkled in. If you try to rank one post for "best WordPress themes" AND "how to install a WordPress theme," you'll end up ranking for neither. Each keyword deserves its own dedicated post. Your SEO plugin will show you whether you've used your target keyword in the title, headings, URL, meta description, and body — aim for green lights across the board.</p>

<p>Not sure how to pick keywords? Start with my <a href="/keyword-research-beginners/">keyword research for beginners</a> guide. Target keywords with 100+/month search volume and keyword difficulty under 30. Long-tail keywords like "how to improve WordPress SEO" are easier to rank for than broad terms like "SEO" — and convert better because the intent is specific.</p>

<h3>10. Optimize for Featured Snippets</h3>

<p>Featured snippets are those answer boxes that appear above position #1 in Google. They pull content directly from a page and display it prominently — and they drive a disproportionate amount of clicks. To win them, structure your content in the format Google prefers: use numbered lists for step-by-step processes, bullet lists for collections, tables for comparisons, and short direct-answer paragraphs (40-50 words) right after your H2 headings.</p>

<p>The trick: put a concise, direct answer (40-50 words) right after your H2/H3, then follow with detailed explanation. Google wants the short answer for the snippet and the long answer to verify comprehensiveness. Tables are especially powerful for snippets. Learn to <a href="/write-blog-post-that-ranks/">write blog posts that rank</a> and you'll naturally capture these positions.</p>

<h2>Technical SEO Tips</h2>

<p>Technical SEO ensures Google can crawl, render, and index your site without issues. You don't need to be a developer for these — most are one-time setup tasks that keep working in the background.</p>

<h3>11. Speed Up Your Site</h3>

<p>Page speed is a confirmed ranking factor that got even more important with Core Web Vitals. A slow site doesn't just rank worse — visitors leave before content loads. The biggest speed killers are almost always the same: too many plugins, unoptimized images, no caching, and cheap shared hosting.</p>

<img src="/screenshots/pagespeed-insights.webp" alt="Google PageSpeed Insights showing Core Web Vitals scores and performance metrics for a WordPress site" />

<p>Test your site with <a href="https://pagespeed.web.dev/" target="_blank" rel="noopener">Google PageSpeed Insights</a> and aim for 80+ on mobile. Install a caching plugin, enable GZIP compression, and consider Cloudflare's free CDN. My guide on how to <a href="/speed-up-wordpress/">speed up WordPress</a> covers every technique from quick wins to advanced tuning.</p>

<h3>12. Make Sure Your Site Is Mobile-Friendly</h3>

<p>Google uses mobile-first indexing, meaning it primarily ranks based on your mobile site. Most modern WordPress themes are responsive by default, but "responsive" doesn't always mean "mobile-friendly." Test on your actual phone, not just by resizing your browser window.</p>

<p>Common issues: text too small to read, buttons too close together, images causing horizontal scroll, and full-screen pop-ups. Google's PageSpeed Insights flags most of these. Over 60% of web traffic is mobile — if you're choosing a theme, check my <a href="/best-wordpress-themes/">best WordPress themes</a> guide, they're all mobile-optimized.</p>

<h3>13. Fix Broken Links</h3>

<p>Broken links — both internal and external — hurt your SEO in two ways. First, they waste Google's crawl budget. Every time Googlebot hits a 404 page, that's a crawl it could have spent on an actual page. Second, they create a terrible user experience, and Google measures engagement signals like bounce rate and pogo-sticking. I install the Broken Link Checker plugin on every new WordPress site and run it monthly.</p>

<p><strong>Pro tip:</strong> Find broken links on <em>other</em> sites in your niche, create equivalent content, then reach out suggesting your page as a replacement. This is broken link building — one of the most effective white-hat link building strategies.</p>

<h3>14. Set Up SSL/HTTPS</h3>

<p>If your site isn't running on HTTPS in 2026, Google will actively penalize you. Chrome shows a "Not Secure" warning on HTTP sites, which tanks your credibility and click-through rate. Most hosting providers offer free SSL certificates through Let's Encrypt — check your hosting control panel or contact support. Once the certificate is installed, you need to update your WordPress URL settings and set up redirects from HTTP to HTTPS.</p>

<p>I've written a complete walkthrough on how to <a href="/setup-ssl-wordpress/">set up SSL on WordPress</a> covering every hosting provider. The process takes about 15 minutes. After switching, update your sitemap and Search Console property, and check for mixed content warnings. If you're on a new site, set up SSL before you publish anything — migrating later is doable but annoying.</p>

<h3>15. Update Old Content Regularly</h3>

<p>Google loves fresh content. Posts that haven't been updated in years gradually lose rankings to newer, more current competitors. I audit every post on my sites quarterly. I check if the information is still accurate, update screenshots, add sections covering new developments, refresh the publish date, and improve anything that feels thin. A 30-minute content refresh can often recover rankings that took months to build originally.</p>

<p><strong>Pro tip:</strong> Check Search Console for posts declining in clicks — these are your highest-priority refresh targets. Add new sections, update statistics, replace outdated screenshots, then resubmit the URL using the URL Inspection tool. I've seen updated posts jump 10-20 positions within a week.</p>

<h2>Quick Wins vs. Long-Term SEO Strategies</h2>

<p>Not all SEO tips deliver results at the same speed. Here's how to prioritize based on the timeline you're working with:</p>

<table>
<thead>
<tr>
<th>Tip</th>
<th>Time to Implement</th>
<th>Time to See Results</th>
<th>Impact</th>
</tr>
</thead>
<tbody>
<tr>
<td>Set permalink structure</td>
<td>1 minute</td>
<td>1-2 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Install SEO plugin</td>
<td>10 minutes</td>
<td>2-4 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Submit sitemap to Search Console</td>
<td>5 minutes</td>
<td>1-2 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Write title tags &amp; meta descriptions</td>
<td>5 min per post</td>
<td>2-4 weeks</td>
<td>Medium</td>
</tr>
<tr>
<td>Fix heading hierarchy</td>
<td>10 min per post</td>
<td>2-6 weeks</td>
<td>Medium</td>
</tr>
<tr>
<td>Optimize images</td>
<td>15 minutes (plugin)</td>
<td>1-2 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Add internal links</td>
<td>5 min per post</td>
<td>2-8 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Target one keyword per post</td>
<td>Ongoing</td>
<td>1-3 months</td>
<td>High</td>
</tr>
<tr>
<td>Optimize for featured snippets</td>
<td>15 min per post</td>
<td>2-8 weeks</td>
<td>Medium</td>
</tr>
<tr>
<td>Speed up your site</td>
<td>1-2 hours</td>
<td>1-4 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Mobile optimization</td>
<td>Varies</td>
<td>2-4 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Fix broken links</td>
<td>30 minutes</td>
<td>2-6 weeks</td>
<td>Low-Medium</td>
</tr>
<tr>
<td>Set up SSL/HTTPS</td>
<td>15 minutes</td>
<td>1-2 weeks</td>
<td>High</td>
</tr>
<tr>
<td>Update old content</td>
<td>30 min per post</td>
<td>1-4 weeks</td>
<td>High</td>
</tr>
</tbody>
</table>

<p>If you only have an hour, focus on tips 1-3 (permalinks, SEO plugin, and Search Console). These three alone will put you ahead of 80% of WordPress sites that never touch their SEO settings. Then work through the on-page tips post by post — each one you optimize compounds the effect. Technical tips like speed and SSL are one-time investments that benefit every page on your site.</p>

<h2>Frequently Asked Questions</h2>

<h3>How long does it take to see SEO results?</h3>

<p>For a brand new site, expect 3-6 months before meaningful organic traffic. That's Google's own guidance — it needs time to crawl, index, and evaluate your content. However, sites with strong technical foundations can start ranking for low-competition keywords within 4-6 weeks. The key is consistency: keep publishing optimized content, build internal links, and the compound effect kicks in around month 4-5.</p>

<h3>Do I need paid SEO tools to rank on Google?</h3>

<p>Absolutely not. Google Search Console, Rank Math (free version), PageSpeed Insights, and the free tiers of Ubersuggest all cover what you need to start. Paid tools like Ahrefs and Semrush are powerful for competitive analysis, but they're investments that make sense once your site generates revenue. Start free, prove the concept, then upgrade.</p>

<h3>Which single SEO tip matters most?</h3>

<p>Internal linking (tip #8). You can have perfect title tags and blazing fast load times, but if pages aren't connected through logical links, Google struggles to understand your topical authority. I've seen sites jump 20+ positions just by adding strategic internal links. It's free, under your control, and surprisingly fast. See our <a href="/wordpress-seo-guide/">complete WordPress SEO guide</a> for the full picture.</p>

<h3>How often should I audit my site's SEO?</h3>

<p>Lightweight weekly check (glance at Search Console for errors) and a thorough audit quarterly. During quarterly audits, I review every post for outdated info, broken links, thin content, and declining rankings. I also check if posts are ranking for unexpected keywords I can optimize further. Set a calendar reminder — SEO is ongoing maintenance, not a one-time project. Your competitors are improving constantly, and you need to keep up.</p>
`;
