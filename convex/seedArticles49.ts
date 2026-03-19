import { internalMutation } from "./_generated/server";

// ─── Supporting: WooPayments Plugin Review ────────────────────────────────────

export const seedWooPaymentsReview = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();
    const slug = "woopayments-review";

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
      title: "WooPayments Review: WooCommerce's Built-In Payment Plugin",
      excerpt:
        "WooPayments lets you accept credit cards, Apple Pay, Google Pay, and more directly from your WordPress dashboard — no separate Stripe account needed. Here's what it does well, where it falls short, and when you should use the direct Stripe plugin instead.",
      content: wooPaymentsReviewContent,
      category: "plugins",
      tags: [
        "woopayments",
        "woocommerce payments",
        "wordpress payment gateway",
        "stripe woocommerce",
        "accept payments wordpress",
        "wordpress plugins",
        "woocommerce",
      ],
      seoTitle:
        "WooPayments Review 2026 — WooCommerce's Native Payment Plugin Explained",
      seoDescription:
        "WooPayments is WooCommerce's built-in payment solution powered by Stripe. Honest review of features, transaction fees, pros and cons, and how it compares to using Stripe directly.",
      author: "marvin",
      authorName: "Marvin",
      clusterId: cluster._id,
      clusterRole: "supporting" as const,
      updatedAt: now,
    };

    if (existing) {
      await ctx.db.patch(existing._id, fields);
      console.log("Updated existing WooPayments review article:", existing._id);
      return {
        message: "Updated existing WooPayments review article",
        id: existing._id,
      };
    } else {
      const postId = await ctx.db.insert("posts", {
        ...fields,
        slug,
        status: "published",
        publishedAt: now,
      });
      console.log("Created new WooPayments review article:", postId);
      return {
        message: "Created new WooPayments review article",
        id: postId,
      };
    }
  },
});

const wooPaymentsReviewContent = `
<img src="/images/blog/woopayments-review.webp" alt="WooPayments plugin page on WordPress.org showing 42 million+ downloads and integrated WooCommerce payment features" />

<p>If you run a WooCommerce store, accepting payments is obviously non-negotiable. WooPayments is the payment plugin built and maintained by WooCommerce (Automattic) specifically for that purpose. It lets you accept credit cards, Apple Pay, Google Pay, and more — all managed from your WordPress dashboard, without ever logging into a separate payment platform.</p>

<p>That convenience has made it one of the most installed plugins on WordPress.org, with over 42 million downloads. But "most installed" doesn't always mean "best choice." Here's an honest look at what WooPayments actually does, what it costs, and when you should reach for a different tool.</p>

<h2>What Is WooPayments?</h2>

<p><a href="https://wordpress.org/plugins/woocommerce-payments/" target="_blank" rel="noopener noreferrer nofollow">WooPayments</a> is WooCommerce's native payment solution. Under the hood, it runs on Stripe's infrastructure — but instead of creating your own Stripe account and connecting it via API keys, WooPayments creates a special Stripe Express account on your behalf. The trade-off: you get a seamless setup experience, but you get less access to the underlying Stripe account than you would with a direct Stripe integration.</p>

<p>The plugin is free to install. You pay per transaction, not a monthly fee.</p>

<img src="/screenshots/plugin-woocommerce-payments.webp" alt="WooPayments plugin listing on WordPress.org showing 42 million+ downloads, current version, and plugin description" />

<h2>Key Features</h2>

<h3>Payments Dashboard Inside WordPress</h3>

<p>This is WooPayments' biggest selling point. Every transaction, refund, dispute, and payout shows up directly in your WordPress admin under WooCommerce > Payments. You never need to open a separate tab to check your balance or issue a refund. For store owners who prefer to keep everything in one place, this is genuinely useful.</p>

<h3>Apple Pay, Google Pay, and Amazon Pay</h3>

<p>WooPayments supports express checkout buttons out of the box. When a customer is on a mobile device with Apple Pay configured, they can pay in two taps without entering card details. Google Pay works the same way on Android and Chrome. These buttons appear on product pages and in the cart — reducing friction at the most important point in the funnel.</p>

<h3>Multi-Currency Support</h3>

<p>You can accept payments in multiple currencies and show customers prices in their local currency. WooPayments handles the conversion and applies a currency conversion fee (around 2%) on top of standard transaction fees. This is a meaningful advantage over using Stripe directly, which requires a separate plugin to achieve the same thing.</p>

<h3>Dispute and Chargeback Management</h3>

<p>Chargebacks happen. WooPayments includes built-in tools for responding to disputes — you can upload evidence directly from your WordPress dashboard without needing to log into Stripe. Given that the alternative is navigating Stripe's separate dispute portal, this is a practical time-saver.</p>

<h3>Subscription Support</h3>

<p>WooPayments works with WooCommerce Subscriptions for recurring billing. Customers can update their payment method, and you can manage subscription billing cycles from the same dashboard.</p>

<h3>In-Person Payments</h3>

<p>For merchants in the US, UK, and Canada, WooPayments supports a card reader for in-person sales. If you also run a physical location or attend markets, this lets you use a single payment system across online and offline.</p>

<h2>Pricing and Transaction Fees</h2>

<p>WooPayments has no monthly fee. You pay per transaction:</p>

<table>
<thead>
<tr>
<th>Transaction Type</th>
<th>Fee</th>
</tr>
</thead>
<tbody>
<tr>
<td>US cards (online)</td>
<td>2.9% + $0.30</td>
</tr>
<tr>
<td>In-person (US)</td>
<td>2.6% + $0.10</td>
</tr>
<tr>
<td>International cards</td>
<td>2.9% + $0.30 + 1.5% international fee</td>
</tr>
<tr>
<td>Currency conversion</td>
<td>~2% FX fee</td>
</tr>
<tr>
<td>Disputed charges</td>
<td>$15 dispute fee (refunded if you win)</td>
</tr>
</tbody>
</table>

<p>These rates are effectively identical to Stripe's standard pricing, which makes sense — Stripe is the underlying infrastructure.</p>

<h2>Pros and Cons</h2>

<p><strong>Pros</strong></p>
<ul>
<li>Zero monthly fee — pure pay-as-you-go pricing</li>
<li>Easiest WooCommerce payment setup — no API keys, no separate account management</li>
<li>Full payments dashboard inside WordPress admin</li>
<li>Apple Pay, Google Pay, Amazon Pay included out of the box</li>
<li>Built-in multi-currency without needing an extra plugin</li>
<li>Dispute management without leaving WordPress</li>
</ul>

<p><strong>Cons</strong></p>
<ul>
<li>Uses a Stripe Express account, not a full Stripe account — you have less control and visibility into the underlying platform</li>
<li>No API key access, which limits integrations with accounting tools like QuickBooks or Xero that connect via Stripe</li>
<li>Only available in 37 countries vs. Stripe's broader 47-country coverage</li>
<li>Mixed rating on WordPress.org (3.1/5 from 136 reviews) — some users report account suspension issues</li>
<li>WordPress.com account connection is required for the plugin to function</li>
</ul>

<h2>WooPayments vs. Stripe Plugin: Which Should You Use?</h2>

<p>This is the question most WooCommerce store owners actually face. Both use Stripe's payment infrastructure — the difference is how much control you get and how integrated the experience is.</p>

<p>Choose <strong>WooPayments</strong> if you want everything managed inside WordPress, you don't need third-party Stripe integrations, and you're operating in one of the 37 supported countries. The setup takes minutes and the dashboard integration is genuinely convenient.</p>

<p>Choose the <strong>direct Stripe plugin</strong> if you need full Stripe API access (for accounting integrations, advanced reporting, or multi-site setups), you're in a country WooPayments doesn't support, or you want to manage your payment account independently from your WordPress install. The Stripe plugin requires manual API key setup but gives you a standard Stripe account with no restrictions.</p>

<p>If you've been using Stripe on other platforms or already have a Stripe account, the direct Stripe plugin is usually the better fit. WooPayments' convenience comes at the cost of account flexibility.</p>

<h2>Who Should Use WooPayments?</h2>

<p><strong>Good fit:</strong> New WooCommerce stores that want to start accepting payments fast, store owners who prefer keeping everything inside WordPress, and merchants who need multi-currency without setting up a separate tool.</p>

<p><strong>Not a good fit:</strong> Developers managing multiple client sites (the Stripe plugin scales better), businesses that rely on Stripe integrations with accounting software, or stores in countries outside WooPayments' supported list.</p>

<h2>Frequently Asked Questions</h2>

<h3>Is WooPayments really free?</h3>

<p>The plugin is free to install, but you pay a percentage of each transaction — 2.9% + $0.30 for standard US card transactions. There's no monthly subscription. At low transaction volumes this is fine; at high volumes, negotiating enterprise rates directly with Stripe (via the Stripe plugin) may save money.</p>

<h3>Do I need a Stripe account to use WooPayments?</h3>

<p>Not a standard one. WooPayments creates a Stripe Express account for you automatically during setup. This is different from a full Stripe account — you won't be able to log into stripe.com and see all the same data, and you can't use those credentials to connect other tools.</p>

<h3>Can I switch from WooPayments to Stripe later?</h3>

<p>Yes. You can install the Stripe plugin, set it up with a standard Stripe account, and disable WooPayments. Your transaction history from WooPayments stays in WordPress, but future payments go through your Stripe account directly. It's not a difficult migration, just a settings change.</p>

<h3>What's the difference between WooPayments and PayPal?</h3>

<p>WooPayments processes credit and debit cards plus express checkout (Apple Pay, Google Pay). PayPal lets customers pay from their PayPal balance or via PayPal's card processing. Many stores offer both — one for card payments, one for customers who prefer PayPal. The WooCommerce PayPal Payments plugin handles the PayPal side.</p>

<hr />

<p><small>Sources: <a href="https://wordpress.org/plugins/woocommerce-payments/" target="_blank" rel="noopener noreferrer nofollow">WordPress.org — WooPayments</a> · <a href="https://woocommerce.com/document/woopayments/compatibility/woopayments-vs-stripe-plugin-comparison/" target="_blank" rel="noopener noreferrer nofollow">WooCommerce — WooPayments vs. Stripe Plugin Comparison</a></small></p>
`;
