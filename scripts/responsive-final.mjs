import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

const BASE = 'http://localhost:3000';
const OUT = '/tmp/mobile-audit/v2';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const tests = [
  // Mobile
  { name: 'mobile-home', width: 375, height: 667, path: '/' },
  { name: 'mobile-menu', width: 375, height: 667, path: '/', openMenu: true },
  { name: 'mobile-article', width: 375, height: 667, path: '/speed-up-wordpress' },
  // Tablet
  { name: 'tablet-home', width: 768, height: 1024, path: '/' },
  { name: 'tablet-article', width: 768, height: 1024, path: '/speed-up-wordpress' },
  // Small desktop
  { name: 'desktop-sm', width: 1024, height: 768, path: '/' },
];

for (const t of tests) {
  const ctx = await browser.newContext({ viewport: { width: t.width, height: t.height } });
  const p = await ctx.newPage();
  await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
  await p.goto(`${BASE}${t.path}`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
  await p.waitForTimeout(1500);
  
  if (t.openMenu) {
    const btn = await p.$('button[aria-label="Open navigation menu"]');
    if (btn) {
      await btn.click();
      await p.waitForTimeout(800);
    }
  }
  
  if (t.name.includes('home') || t.name.includes('menu')) {
    await p.screenshot({ path: `${OUT}/${t.name}.png`, fullPage: t.name.includes('menu') ? false : true });
  } else {
    // Just above the fold for articles
    await p.screenshot({ path: `${OUT}/${t.name}.png`, fullPage: false });
  }
  console.log(`✓ ${t.name} (${t.width}x${t.height})`);
  await ctx.close();
}

await browser.close();
console.log('Done');
