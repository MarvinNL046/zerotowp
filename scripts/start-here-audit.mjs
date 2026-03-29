import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'https://zerotowp.com';
const OUT = '/tmp/start-here-audit';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const p = await ctx.newPage();
  await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
  await p.goto(`${BASE}/start-here`, { waitUntil: 'networkidle', timeout: 20000 }).catch(() => {});
  await p.waitForTimeout(2000);
  await p.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true });
  await p.screenshot({ path: `${OUT}/${vp.name}-above-fold.png`, fullPage: false });
  console.log(`✓ ${vp.name}`);
  await ctx.close();
}

await browser.close();
console.log('Done');
