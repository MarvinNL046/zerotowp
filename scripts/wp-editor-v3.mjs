import { chromium } from 'playwright';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/screenshots';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 850 } });
const p = await ctx.newPage();

await p.goto('https://playground.wordpress.net/?url=/wp-admin/post-new.php', { 
  waitUntil: 'networkidle', timeout: 45000 
}).catch(() => {});
await p.waitForTimeout(8000);

// Find the iframe
const frames = p.frames();
console.log(`Found ${frames.length} frames`);
for (const f of frames) {
  console.log(`  Frame: ${f.url().slice(0, 80)}`);
}

// Get the WordPress iframe
const wpFrame = frames.find(f => f.url().includes('wp-admin') || f.url().includes('scope:'));
if (wpFrame) {
  console.log('Found WP frame, closing modal...');
  
  // Close welcome modal via the X button
  const closeBtn = await wpFrame.$('.components-modal__header button[aria-label="Close"]');
  if (closeBtn) {
    await closeBtn.click();
    console.log('  Closed modal via header button');
  } else {
    // Try escape key
    await p.keyboard.press('Escape');
    console.log('  Tried Escape key');
  }
  await p.waitForTimeout(1000);
  
  // Type title
  const title = await wpFrame.$('[aria-label="Add title"]');
  if (title) {
    await title.click();
    await title.type('My First Blog Post', { delay: 30 });
    console.log('  Typed title');
  }
  
  // Click content area
  const content = await wpFrame.$('[aria-label="Add default block"]');
  if (content) {
    await content.click();
    await p.waitForTimeout(300);
    await p.keyboard.type('Welcome to my new WordPress site! This is my very first blog post where I share my journey of building a website from scratch.', { delay: 15 });
    console.log('  Typed content');
  }
} else {
  console.log('No WP frame found, trying escape on main page');
  await p.keyboard.press('Escape');
}

await p.waitForTimeout(1000);

// Screenshot with toolbar cropped
await p.screenshot({ 
  path: `${OUT}/create-pages-posts.tmp.png`,
  clip: { x: 0, y: 45, width: 1280, height: 805 }
});
console.log('✓ Done');

await browser.close();
