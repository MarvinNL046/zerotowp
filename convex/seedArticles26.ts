import { internalMutation } from "./_generated/server";

export const seedKeywordResearchBeginners = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "keyword-research-beginners";

    const cluster = await ctx.db
      .query("clusters")
      .withIndex("by_slug", (q) => q.eq("slug", "wordpress-seo"))
      .first();

    if (!cluster) {
      return {
        message:
          "Cluster 'wordpress-seo' not found. Seed the SEO cluster first.",
      };
    }

    console.log("Found cluster 'wordpress-seo':", cluster._id);

    const existing = await ctx.db
      .query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    const fields = {
      title:
        "Keyword Research for Bloggers — A Practical Beginner's Guide (2026)",
      excerpt:
        "Keyword research doesn't have to be complicated. I'll walk you through the exact process I use to find low-competition keywords for every article on this site — using free tools only.",
      content: keywordResearchContent,
      category: "seo",
      tags: [
        "keyword research",
        "keyword research for bloggers",
        "beginner keyword research",
        "free keyword tools",
        "long-tail keywords",
        "search intent",
        "seo for beginners",
      ],
      seoTitle:
        "Keyword Research for Bloggers — Free Tools & Step-by-Step Process (2026)",
      seoDescription:
        "Learn keyword research the practical way. I'll show you my exact process using free tools like Ahrefs, Ubersuggest, and Google Trends — plus real examples from this site.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log(
        "Updated existing keyword research beginners article:",
        existing._id
      );
      return {
        message: "Updated existing keyword research beginners article",
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
        "Created new keyword research beginners article:",
        postId
      );
      return {
        message: "Created new keyword research beginners article",
        id: postId,
      };
    }
  },
});

const keywordResearchContent = `
<p>When I launched ZeroToWP, I made a classic beginner mistake: I wrote articles about whatever I felt like writing about. "Best WordPress hosting" seemed like a great first article. It wasn't until I actually checked the numbers that I realized I was competing against WPBeginner, Forbes, and every other authority site on the internet for a keyword with a difficulty score of 62. That article sat on page 7 of Google for months.</p>

<p>Then I changed my approach. I started doing keyword research <em>before</em> writing — and within weeks, I had articles ranking on page one for keywords I'd never have found by guessing. The difference wasn't my writing. It was my targeting.</p>

<p>In this guide, I'll show you exactly how I do keyword research for every article on this site. No theory-heavy textbook stuff — just the practical process I use, using free tools only.</p>

<h2>What Is Keyword Research (And Why Should You Care)?</h2>

<p>Keyword research is the process of finding out what people actually type into Google — and then deciding which of those searches you should create content for. That's it. It's not rocket science, and you don't need a $99/month tool to do it well.</p>

<p>Here's why it matters: every blog post you write is a bet. You're investing hours of your time creating content, and keyword research tells you whether that bet has a chance of paying off. Without it, you're writing blind. You might create a masterpiece that nobody ever finds because nobody searches for the topic — or because 50 authority sites already own that keyword.</p>

<p>With even basic keyword research, you can find topics where real people are searching, the competition is low enough that your new site can actually rank, and the search intent matches what you're offering. That's the entire game.</p>

<h2>The 3 Things That Actually Matter</h2>

<p>When you're looking at a keyword, there are dozens of metrics you <em>could</em> analyze. But as a beginner, only three actually matter. Focus on these and ignore everything else for now.</p>

<h3>1. Search Volume</h3>

<p>Search volume tells you how many people search for a keyword each month. A keyword with 10 searches per month might not be worth a full article. A keyword with 5,000 searches per month could drive real traffic to your site.</p>

<p>But here's the thing most guides don't tell you: <strong>don't chase high volume</strong>. A keyword with 200 monthly searches and zero competition will send you more traffic than a keyword with 10,000 searches where you rank on page 5. For a new blog, I look for keywords with 100-1,000 monthly searches. That's the sweet spot.</p>

<h3>2. Keyword Difficulty (KD)</h3>

<p>Keyword difficulty is a score (usually 0-100) that estimates how hard it'll be to rank on the first page for a given keyword. Different tools calculate it differently, but the concept is the same: higher number = harder to rank.</p>

<p><strong>My rule for new sites: target keywords with a KD of 20 or lower.</strong> That's not a suggestion — it's a rule I follow religiously. When your site is brand new with zero backlinks and zero authority, you simply cannot compete for KD 40+ keywords. You'll write great content that sits on page 4 forever. I learned this the hard way.</p>

<h3>3. Search Intent</h3>

<p>Search intent is <em>why</em> someone is searching. There are four main types:</p>

<ul>
<li><strong>Informational:</strong> "how to install WordPress" — they want to learn something</li>
<li><strong>Navigational:</strong> "WordPress login" — they're looking for a specific page</li>
<li><strong>Commercial:</strong> "best WordPress hosting" — they're researching before buying</li>
<li><strong>Transactional:</strong> "buy Bluehost plan" — they're ready to purchase</li>
</ul>

<p>Why does this matter? Because Google only ranks content that matches the intent. If everyone searching "best WordPress themes" wants a comparison list and you write a tutorial on how to install themes, you won't rank — no matter how good your content is. Always Google your keyword first and look at what's already ranking. That tells you exactly what Google thinks the intent is.</p>

<h2>Free Keyword Research Tools (The Only Ones You Need)</h2>

<p>You don't need Ahrefs' $99/month plan or Semrush's $129/month subscription to do solid keyword research. Here are the three free tools I use for every article on this site.</p>

<h3>Google Keyword Planner &amp; Google Trends</h3>

<figure>
<img src="/screenshots/google-trends-homepage.webp" alt="Google Trends homepage showing trending search topics and the Explore feature for comparing keyword interest over time" />
<figcaption>Google Trends is completely free and shows you whether a topic is growing, stable, or dying — essential context that raw search volume numbers don't give you.</figcaption>
</figure>

<p>Google Keyword Planner is built for advertisers, but it's a goldmine for bloggers. You need a free Google Ads account to access it (you don't have to run any ads). Once inside, use the "Discover new keywords" feature: type in a seed keyword and it'll spit out hundreds of related keywords with monthly search volume ranges.</p>

<p>The catch? Keyword Planner shows volume ranges (like "100-1K") instead of exact numbers unless you're running ads. That's fine for our purposes — we just need a ballpark.</p>

<p>I pair Keyword Planner with <strong>Google Trends</strong>, which does something no other tool can: it shows you whether interest in a topic is growing, stable, or declining. This is crucial. A keyword with 500 monthly searches and a rising trend is far more valuable than one with 1,000 searches that's been declining for two years. I check Google Trends for every keyword I'm seriously considering.</p>

<p>Google Trends is also great for comparing keywords head-to-head. When I was deciding between writing about "WordPress SEO tips" vs "WordPress SEO checklist," Trends showed me that "checklist" had steadily grown over the past five years while "tips" was flat. Easy decision.</p>

<h3>Ahrefs Free Keyword Generator</h3>

<figure>
<img src="/screenshots/ahrefs-keyword-generator.webp" alt="Ahrefs Free Keyword Generator tool with search box to enter keywords and find keyword ideas for Google, Bing, YouTube, and Amazon" />
<figcaption>Ahrefs' free keyword generator gives you up to 100 keyword ideas with search volume and keyword difficulty — no account required.</figcaption>
</figure>

<p><a href="https://ahrefs.com/keyword-generator" target="_blank" rel="noopener">Ahrefs' free keyword generator</a> is my favorite free tool for keyword research, hands down. You type in a seed keyword, and it gives you up to 100 keyword ideas with real data: search volume, keyword difficulty (KD), and when the data was last updated.</p>

<p>What makes it special is the KD score. Unlike Google Keyword Planner, which doesn't show difficulty at all, Ahrefs gives you an actual number on a 0-100 scale. This is the single most useful metric for a new blogger because it tells you whether you have any realistic chance of ranking.</p>

<p>Here's my workflow: I type in my seed keyword (like "WordPress SEO"), look at the results, and immediately sort by KD. I'm hunting for anything under KD 20 with at least 100 monthly searches. Those are the hidden gems that bigger sites are ignoring — and they're exactly what a new blog should target.</p>

<p>One limitation: the free version only shows 100 results and doesn't let you apply advanced filters. But 100 results is plenty for finding a few solid keywords per article. I've never needed more than that.</p>

<h3>Ubersuggest</h3>

<figure>
<img src="/screenshots/ubersuggest-homepage.webp" alt="Ubersuggest homepage by Neil Patel showing the keyword search tool with options for SEO search and competitor analysis" />
<figcaption>Ubersuggest by Neil Patel gives you keyword ideas, search volume, SEO difficulty, and even content ideas — with a generous free tier.</figcaption>
</figure>

<p><a href="https://neilpatel.com/ubersuggest/" target="_blank" rel="noopener">Ubersuggest</a> by Neil Patel is another excellent free option that I use regularly, especially for two things: content ideas and competitive analysis.</p>

<p>Where Ubersuggest shines compared to Ahrefs' free tool is the <strong>content ideas</strong> feature. Type in a keyword and it'll show you existing articles ranking for related terms, along with their estimated traffic, backlinks, and social shares. This tells you two things: what type of content Google wants to see, and how much traffic you can realistically expect if you rank.</p>

<p>The free tier gives you three searches per day, which is honestly enough for most bloggers. I use those three searches strategically: one for my main seed keyword, one for a variation I'm considering, and one for a competitor's domain to see what they're ranking for.</p>

<p>Ubersuggest also provides an "SEO Difficulty" score that's separate from its "Paid Difficulty" score. For organic content, you only care about SEO Difficulty. Same rule applies: aim for 20 or lower when your site is new.</p>

<h2>My Keyword Research Process — Step by Step</h2>

<p>Enough theory. Here's the exact process I follow before writing every single article on ZeroToWP. The whole thing takes me about 20-30 minutes per article now, but take your time when you're learning.</p>

<h3>Step 1: Start With a Seed Topic</h3>

<p>A seed topic is just a broad subject you want to write about. For this site, my seed topics are things like "WordPress hosting," "WordPress SEO," "WordPress plugins," and "WordPress security." I don't overthink this step — I just pick a topic that fits my site's niche.</p>

<p>For example, when I was planning content for my SEO cluster, I started with the seed topic "WordPress SEO." That's it — just two words to start the process.</p>

<h3>Step 2: Find Long-Tail Variations</h3>

<p>This is where the magic happens. I take my seed topic and plug it into all three free tools I mentioned above. I'm looking for <strong>long-tail keywords</strong> — longer, more specific phrases that have lower competition.</p>

<p>"WordPress SEO" has a KD of 71 — way too competitive. But "is WordPress good for SEO" has a KD of 0. "WordPress SEO checklist for beginners" has a KD of 5. "How to improve WordPress SEO without plugins" has a KD of 3. See the pattern? The more specific the phrase, the lower the competition.</p>

<p>I usually aim to collect 15-20 potential keywords at this stage. I dump them all into a simple spreadsheet with three columns: keyword, search volume, and KD.</p>

<h3>Step 3: Filter by Keyword Difficulty</h3>

<p>Now I get ruthless. I sort my spreadsheet by KD and eliminate anything above 20. Yes, this means throwing away keywords with impressive search volumes. That's okay. A keyword you can rank for is infinitely more valuable than one you can't.</p>

<p>After filtering, I usually have 5-8 keywords left. These are my candidates.</p>

<h3>Step 4: Check Search Intent</h3>

<p>For each remaining keyword, I Google it in an incognito window and look at the top 10 results. I'm asking myself: what kind of content is ranking? Are these how-to guides? Listicles? Product reviews? Comparison posts?</p>

<p>If the top 10 results are all massive comparison posts and I'm planning to write a short tutorial, that keyword isn't for me — not because of difficulty, but because of intent mismatch. I need to create the <em>same type</em> of content that's already ranking, just better.</p>

<h3>Step 5: Pick Your Primary + Secondary Keywords</h3>

<p>From my remaining candidates, I pick one primary keyword and 2-3 secondary keywords for the article. The primary keyword goes in my title, H1, and meta description. The secondary keywords go in H2s and naturally throughout the body text.</p>

<p>For example, for the article you're reading right now:</p>

<ul>
<li><strong>Primary keyword:</strong> "keyword research for bloggers"</li>
<li><strong>Secondary keywords:</strong> "beginner keyword research," "free keyword research tools," "how to find low-competition keywords"</li>
</ul>

<p>That's it. Five steps, 20-30 minutes, and I have a clear target for my article before I write a single word.</p>

<h2>Real Example: How I Found Keywords for THIS Site</h2>

<p>Let me show you exactly how this played out when I was planning content for ZeroToWP. No hypotheticals — these are real numbers from real keyword research sessions.</p>

<p>When I started this site, I knew I wanted to write about WordPress hosting. So I typed "best WordPress hosting" into Ahrefs' free keyword generator. The results were sobering:</p>

<ul>
<li><strong>"best WordPress hosting"</strong> — KD 62, search volume 12,000/mo</li>
<li><strong>"WordPress hosting comparison"</strong> — KD 38, search volume 1,200/mo</li>
<li><strong>"cheap WordPress hosting"</strong> — KD 45, search volume 3,400/mo</li>
</ul>

<p>Every single obvious hosting keyword had a KD way above my threshold. If I'd just picked "best WordPress hosting" and started writing, I'd have wasted days creating content that would never see page one.</p>

<p>So I dug deeper into long-tail variations:</p>

<ul>
<li><strong>"is WordPress hosting worth it"</strong> — KD 8, search volume 250/mo</li>
<li><strong>"WordPress hosting for beginners"</strong> — KD 11, search volume 400/mo</li>
<li><strong>"do I need WordPress hosting"</strong> — KD 3, search volume 300/mo</li>
</ul>

<p>Now we're talking. These keywords have realistic difficulty scores and enough volume to be worth writing about. Plus, the search intent is clearly informational — perfect for a helpful guide on a new site.</p>

<p>I did the same thing for my SEO content. "WordPress SEO" (KD 71) was out of reach, but <strong>"is WordPress good for SEO"</strong> (KD 0, 800/mo) was sitting right there, uncontested. That became one of my first SEO articles, and it reached page one within two months.</p>

<p>The lesson? The keywords that seem "obvious" are usually the ones you can't win. The real opportunities are hiding in the long-tail variations that bigger sites aren't bothering to target.</p>

<h2>Common Keyword Research Mistakes (I've Made All of Them)</h2>

<p>After doing this for a while, I've seen the same mistakes over and over — mostly because I made them myself first. Here are the big ones to avoid:</p>

<ul>
<li><strong>Targeting high-volume keywords on a new site.</strong> I know it's tempting. "Best WordPress hosting" with 12,000 monthly searches sounds amazing. But if your site has zero authority, you're bringing a knife to a gunfight. Start with KD 0-20 keywords and build up.</li>
<li><strong>Ignoring search intent.</strong> I once wrote a beautiful 3,000-word guide for a keyword where every result on page one was a short listicle. Google wanted listicles, not guides. My article never ranked because it didn't match what searchers wanted.</li>
<li><strong>Keyword stuffing.</strong> This is 2026, not 2010. You don't need to cram your keyword into every paragraph. Use it naturally in your title, one H2, and a few times in the body. Google is smart enough to understand what your content is about without you being repetitive.</li>
<li><strong>Only researching once.</strong> I used to do keyword research when planning an article and then never revisit it. Now I check my rankings monthly and update my keyword targets if new opportunities emerge. SEO is ongoing, not a one-time task.</li>
<li><strong>Skipping keyword research entirely.</strong> "I'll just write about what I know and hope for the best." That was me for my first six months of blogging. Don't be me. Twenty minutes of research before writing can be the difference between 0 visitors and 500 visitors per month for a single article.</li>
</ul>

<h2>Frequently Asked Questions</h2>

<h3>How long does keyword research take?</h3>

<p>When you're starting out, expect 30-45 minutes per article as you learn the tools. Once you have a rhythm, it takes me about 15-20 minutes. The time investment pays for itself many times over — a well-targeted article can bring in traffic for years.</p>

<h3>Do I really need to do keyword research for every article?</h3>

<p>Yes. Every single one. Even a quick 10-minute check is better than nothing. I've seen bloggers write phenomenal content that gets zero traffic because they never checked whether anyone was actually searching for the topic. Don't let that be you.</p>

<h3>What's the best free keyword research tool?</h3>

<p>For beginners, I recommend starting with <a href="https://ahrefs.com/keyword-generator" target="_blank" rel="noopener">Ahrefs' free keyword generator</a> because it shows both search volume and keyword difficulty in one view. Combine it with Google Trends for trend data, and you have 90% of what paid tools offer.</p>

<h3>When should I upgrade to a paid keyword tool?</h3>

<p>When your site is consistently getting 5,000+ monthly visitors and you're publishing 4+ articles per month. At that point, the time saved by features like bulk keyword analysis, rank tracking, and competitive research justifies the cost. Before that, free tools are more than enough.</p>

<h3>What keyword difficulty should I target as a beginner?</h3>

<p>Aim for KD 20 or lower on any tool you use. Once your site has 50+ published articles and is getting regular traffic, you can start pushing up to KD 30-40. But in the early days, low difficulty is your best friend. One page-one ranking for a KD 5 keyword will do more for your site than ten articles stuck on page 4 for KD 50 keywords.</p>
`;
