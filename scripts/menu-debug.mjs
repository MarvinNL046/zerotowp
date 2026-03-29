import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const OUT = '/tmp/mobile-audit';

const browser = await chromium.launch();

// iPhone SE - menu detail
const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
const p = await ctx.newPage();
await p.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p.waitForTimeout(1500);

// Click hamburger
const menuBtn = await p.$('button[aria-label="Open navigation menu"]');
await menuBtn.click();
await p.waitForTimeout(1000);

// Screenshot the full viewport with menu open
await p.screenshot({ path: `${OUT}/menu-detail.png`, fullPage: false });

// Check the nav panel's visibility and content
const navInfo = await p.evaluate(() => {
  // Find the slide panel
  const panel = document.querySelector('[role="dialog"]');
  if (!panel) return { error: 'No dialog found' };
  
  const style = window.getComputedStyle(panel);
  const links = panel.querySelectorAll('a');
  const nav = panel.querySelector('nav');
  
  return {
    panelTransform: style.transform,
    panelDisplay: style.display,
    panelVisibility: style.visibility,
    panelZIndex: style.zIndex,
    panelWidth: panel.offsetWidth,
    panelHeight: panel.offsetHeight,
    panelClasses: panel.className,
    navExists: !!nav,
    navHeight: nav?.offsetHeight,
    navOverflow: nav ? window.getComputedStyle(nav).overflow : null,
    linkCount: links.length,
    links: Array.from(links).map(a => ({
      text: a.textContent?.trim(),
      href: a.getAttribute('href'),
      visible: a.offsetParent !== null,
      rect: a.getBoundingClientRect(),
    }))
  };
});
console.log('Nav panel info:', JSON.stringify(navInfo, null, 2));

// Also check for overlapping elements
const overlaps = await p.evaluate(() => {
  const elements = document.elementsFromPoint(300, 300);
  return elements.map(el => ({
    tag: el.tagName,
    class: el.className?.toString().slice(0, 80),
    zIndex: window.getComputedStyle(el).zIndex,
  }));
});
console.log('Elements at center-right:', JSON.stringify(overlaps, null, 2));

await ctx.close();

// Tablet view
const ctx2 = await browser.newContext({ viewport: { width: 768, height: 1024 } });
const p2 = await ctx2.newPage();
await p2.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
await p2.waitForTimeout(1000);
await p2.screenshot({ path: `${OUT}/tablet-home.png`, fullPage: false });

// Check if desktop nav or mobile nav shows at 768px
const navState768 = await p2.evaluate(() => {
  const desktopNav = document.querySelector('nav.hidden.md\\:flex');
  const mobileBtn = document.querySelector('button[aria-label="Open navigation menu"]');
  return {
    desktopNavVisible: desktopNav ? window.getComputedStyle(desktopNav).display !== 'none' : false,
    mobileBtnVisible: mobileBtn ? mobileBtn.offsetParent !== null : false,
  };
});
console.log('768px nav state:', JSON.stringify(navState768));

await ctx2.close();
await browser.close();
