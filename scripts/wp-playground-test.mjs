import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const p = await ctx.newPage();

await p.goto('https://playground.wordpress.net/', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
await p.waitForTimeout(5000);
await p.screenshot({ path: '/tmp/wp-playground.png', fullPage: false });

console.log('URL:', p.url());
console.log('Title:', await p.title());

await browser.close();
console.log('Done');
