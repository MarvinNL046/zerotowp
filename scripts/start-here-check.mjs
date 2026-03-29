import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
await p.goto('https://zerotowp.com/start-here', { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
await p.waitForTimeout(3000);
await p.screenshot({ path: '/tmp/start-here-audit/prod-after-cleanup.png', fullPage: true });

// Also mobile
const ctx2 = await browser.newContext({ viewport: { width: 375, height: 667 } });
const p2 = await ctx2.newPage();
await p2.goto('https://zerotowp.com/start-here', { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
await p2.waitForTimeout(3000);
await p2.screenshot({ path: '/tmp/start-here-audit/prod-mobile-after.png', fullPage: true });

await browser.close();
console.log('Done');
