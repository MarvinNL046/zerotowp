import { chromium } from 'playwright';

const browser = await chromium.launch();

// Test Shopify site
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}' }).catch(()=>{});
await p.goto('http://localhost:3000/tools/theme-detector?url=gymshark.com', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(10000);
await p.screenshot({ path: '/tmp/detector-shopify.png', fullPage: false });
const shopifyText = await p.textContent('body');
console.log('Shopify detected:', shopifyText.includes('Shopify'));
await ctx.close();

// Test Squarespace  
const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:3000/tools/theme-detector?url=virgin.com', { waitUntil: 'networkidle', timeout: 15000 });
await p2.waitForTimeout(10000);
await p2.screenshot({ path: '/tmp/detector-other.png', fullPage: false });
await ctx2.close();

await browser.close();
console.log('Done');
