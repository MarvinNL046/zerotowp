import { chromium } from 'playwright';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/screenshots';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 850 } });
const p = await ctx.newPage();

await p.goto('https://playground.wordpress.net/?url=/wp-admin/post-new.php', { 
  waitUntil: 'networkidle', timeout: 45000 
}).catch(() => {});
await p.waitForTimeout(8000);

// Hide playground bar + scrollbars
await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' });

// Close the welcome modal - try multiple approaches
const closeSelectors = [
  '.components-modal__header button',
  '[aria-label="Close"]', 
  'button.components-button:has(svg)',
];
for (const sel of closeSelectors) {
  const btns = await p.$$(sel);
  for (const btn of btns) {
    const text = await btn.textContent().catch(() => '');
    const label = await btn.getAttribute('aria-label').catch(() => '');
    if (label === 'Close' || text === '') {
      await btn.click().catch(() => {});
      await p.waitForTimeout(500);
      break;
    }
  }
}
await p.waitForTimeout(1000);

// Type a title
const titleField = await p.$('[aria-label="Add title"], .editor-post-title__input, h1[contenteditable]');
if (titleField) {
  await titleField.click();
  await p.keyboard.type('My First Blog Post', { delay: 40 });
}
await p.waitForTimeout(500);

// Click in the content area and type something
const contentArea = await p.$('[aria-label="Type / to choose a block"], .block-editor-default-block-appender__content, p[data-empty="true"]');
if (contentArea) {
  await contentArea.click();
  await p.waitForTimeout(300);
  await p.keyboard.type('Welcome to my new WordPress site! This is my very first blog post.', { delay: 20 });
}
await p.waitForTimeout(1000);

await p.screenshot({ 
  path: `${OUT}/create-pages-posts.tmp.png`,
  clip: { x: 0, y: 45, width: 1280, height: 805 }
});
console.log('✓ Block editor with content');

await browser.close();
