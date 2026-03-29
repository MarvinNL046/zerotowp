import { chromium } from 'playwright';

const browser = await chromium.launch();

// Desktop
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
await p.goto('http://localhost:3000/start-here', { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p.waitForTimeout(2000);
await p.screenshot({ path: '/tmp/start-here-audit/v2-desktop.png', fullPage: true });

// Mobile
const ctx2 = await browser.newContext({ viewport: { width: 375, height: 667 } });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:3000/start-here', { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p2.waitForTimeout(2000);
await p2.screenshot({ path: '/tmp/start-here-audit/v2-mobile.png', fullPage: true });

await browser.close();
console.log('Done');
