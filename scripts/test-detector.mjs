import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}' }).catch(()=>{});

// Test with ?url= param for auto-scan
await p.goto('http://localhost:3000/tools/theme-detector?url=wpastra.com', { waitUntil: 'networkidle', timeout: 15000 });
await p.waitForTimeout(10000); // Wait for the scan to complete

await p.screenshot({ path: '/tmp/theme-detector-results.png', fullPage: true });
console.log('Results screenshot taken');

// Check what was detected
const text = await p.textContent('body');
const hasWordPress = text.includes('WordPress') && (text.includes('Detected') || text.includes('detected'));
const hasTheme = text.includes('Theme') || text.includes('theme');
console.log('WordPress detected:', hasWordPress);
console.log('Theme section:', hasTheme);

await browser.close();
