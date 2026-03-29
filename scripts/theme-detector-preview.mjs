import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
await p.goto('http://localhost:3000/tools/theme-detector', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(2000);
await p.screenshot({ path: '/tmp/theme-detector-empty.png', fullPage: true });
console.log('Empty state screenshot taken');

// Now test with a real WordPress site
const input = await p.$('input[type="url"], input[type="text"]');
if (input) {
  await input.fill('https://wpastra.com');
  const button = await p.$('button[type="submit"]');
  if (button) {
    await button.click();
    console.log('Scanning wpastra.com...');
    await p.waitForTimeout(8000);
    await p.screenshot({ path: '/tmp/theme-detector-results.png', fullPage: true });
    console.log('Results screenshot taken');
  }
}

await browser.close();
