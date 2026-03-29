import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const OUT = '/tmp/mobile-audit';
const browser = await chromium.launch();

// Test menu fix on iPhone SE
const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
const p = await ctx.newPage();
await p.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p.waitForTimeout(2000);

const menuBtn = await p.$('button[aria-label="Open navigation menu"]');
if (menuBtn) {
  await menuBtn.click();
  await p.waitForTimeout(800);
  
  // Check panel height
  const info = await p.evaluate(() => {
    const panel = document.querySelector('[role="dialog"]');
    if (!panel) return { error: 'No dialog found' };
    return {
      height: panel.offsetHeight,
      width: panel.offsetWidth,
      top: panel.getBoundingClientRect().top,
      classes: panel.className,
      linkCount: panel.querySelectorAll('a').length,
      navHeight: panel.querySelector('nav')?.offsetHeight,
    };
  });
  console.log('Panel info:', JSON.stringify(info));
  
  await p.screenshot({ path: `${OUT}/menu-fixed.png`, fullPage: false });
  console.log('✓ Menu screenshot taken');
} else {
  console.log('✗ No menu button found');
}
await ctx.close();

// Test at 768px tablet — check if nav overflows
const ctx2 = await browser.newContext({ viewport: { width: 768, height: 1024 } });
const p2 = await ctx2.newPage();
await p2.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p2.waitForTimeout(1000);

const navOverflow = await p2.evaluate(() => {
  const nav = document.querySelector('nav.hidden.md\\:flex');
  if (!nav) return { error: 'No desktop nav found' };
  const header = nav.closest('header');
  const headerDiv = nav.closest('.max-w-6xl');
  return {
    navScrollWidth: nav.scrollWidth,
    navClientWidth: nav.clientWidth,
    overflows: nav.scrollWidth > nav.clientWidth,
    headerWidth: header?.offsetWidth,
    containerWidth: headerDiv?.offsetWidth,
    navItems: Array.from(nav.querySelectorAll('a')).map(a => ({
      text: a.textContent?.trim(),
      width: a.offsetWidth,
      right: a.getBoundingClientRect().right,
    })),
    viewportWidth: window.innerWidth,
  };
});
console.log('Nav overflow at 768px:', JSON.stringify(navOverflow, null, 2));

await p2.screenshot({ path: `${OUT}/tablet-nav-check.png`, fullPage: false });
await ctx2.close();

await browser.close();
