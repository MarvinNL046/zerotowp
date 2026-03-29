import { chromium } from 'playwright';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/images/blog';
const browser = await chromium.launch();

const reviews = [
  { slug: 'hostinger-review', url: 'https://www.hostinger.com' },
  { slug: 'siteground-review', url: 'https://www.siteground.com' },
  { slug: 'bluehost-review', url: 'https://www.bluehost.com' },
];

for (const r of reviews) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const p = await ctx.newPage();
  
  // Dismiss cookie banners
  await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}[class*="cookie"],[class*="consent"],[class*="banner"],[id*="cookie"],[id*="consent"]{display:none!important}' }).catch(()=>{});
  
  await p.goto(r.url, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
  await p.waitForTimeout(2000);
  
  // Try to dismiss common cookie/consent buttons
  for (const sel of ['button:has-text("Accept")', 'button:has-text("Got it")', 'button:has-text("I agree")', 'button:has-text("OK")', '[class*="cookie"] button', '[id*="cookie"] button']) {
    const btn = await p.$(sel);
    if (btn) { await btn.click().catch(()=>{}); await p.waitForTimeout(500); break; }
  }
  
  await p.screenshot({ path: `${OUT}/${r.slug}.tmp.png`, fullPage: false });
  console.log(`✓ ${r.slug}`);
  await ctx.close();
}

await browser.close();
console.log('Done - converting to webp...');
