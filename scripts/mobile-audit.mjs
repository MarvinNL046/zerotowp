import { chromium } from 'playwright';
import path from 'path';

const BASE = 'http://localhost:3000';
const OUT = '/tmp/mobile-audit';

import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: 'iphone-se', width: 375, height: 667 },
  { name: 'iphone-14', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
];

const pages = [
  { name: 'home', path: '/' },
  { name: 'article', path: '/speed-up-wordpress' },
  { name: 'glossary', path: '/glossary' },
];

const browser = await chromium.launch();

for (const vp of viewports) {
  for (const pg of pages) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const p = await ctx.newPage();
    await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
    await p.goto(`${BASE}${pg.path}`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
    await p.waitForTimeout(1000);
    await p.screenshot({ path: path.join(OUT, `${vp.name}-${pg.name}.png`), fullPage: true });
    console.log(`✓ ${vp.name} / ${pg.name}`);
    await ctx.close();
  }
}

// Test mobile menu
const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
const p = await ctx.newPage();
await p.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p.waitForTimeout(500);

// Screenshot header area first
await p.screenshot({ path: path.join(OUT, 'header-before-menu.png'), fullPage: false });

const menuBtn = await p.$('button[aria-label="Open navigation menu"]');
if (menuBtn) {
  console.log('✓ Hamburger button found, clicking...');
  await menuBtn.click();
  await p.waitForTimeout(800);
  await p.screenshot({ path: path.join(OUT, 'menu-open.png'), fullPage: false });
  console.log('✓ Menu open screenshot taken');
} else {
  console.log('✗ No hamburger menu button found');
  const allBtns = await p.$$eval('button', btns => btns.map(b => ({
    label: b.getAttribute('aria-label'),
    text: b.textContent?.trim().slice(0, 50),
    visible: b.offsetParent !== null
  })));
  console.log('All buttons:', JSON.stringify(allBtns));
}

// Check for horizontal overflow
const overflowCheck = await p.evaluate(() => {
  const body = document.body;
  const html = document.documentElement;
  return {
    bodyScrollWidth: body.scrollWidth,
    windowInnerWidth: window.innerWidth,
    hasHorizontalOverflow: body.scrollWidth > window.innerWidth,
    overflowAmount: body.scrollWidth - window.innerWidth
  };
});
console.log('Overflow check:', JSON.stringify(overflowCheck));

await ctx.close();
await browser.close();
console.log('Done - screenshots in /tmp/mobile-audit/');
