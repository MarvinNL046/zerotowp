import { chromium } from 'playwright';

const browser = await chromium.launch();
const OUT = '/home/marvin/Projecten/zerotowordpress/public/screenshots';

async function screenshot(name, path, actions) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 850 } });
  const p = await ctx.newPage();
  
  const url = `https://playground.wordpress.net/?url=${encodeURIComponent(path)}`;
  console.log(`→ ${name} (${path})`);
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await p.waitForTimeout(6000);
  
  // Hide Playground top bar and scrollbars
  await p.addStyleTag({ content: `
    ::-webkit-scrollbar { display: none !important; }
    * { scrollbar-width: none !important; }
    /* Hide playground toolbar */
    [class*="playground-toolbar"], 
    .playground-top-bar,
    body > div:first-child > div:first-child {
      display: none !important;
    }
  `}).catch(()=>{});
  
  // Close any modals/welcome screens
  for (let i = 0; i < 3; i++) {
    const closeBtn = await p.$('[aria-label="Close"]');
    if (closeBtn) { await closeBtn.click().catch(()=>{}); await p.waitForTimeout(500); }
    const dismissBtn = await p.$('button:has-text("Dismiss")');
    if (dismissBtn) { await dismissBtn.click().catch(()=>{}); await p.waitForTimeout(500); }
  }
  
  if (actions) await actions(p);
  await p.waitForTimeout(1000);
  
  // Crop out the top 45px (Playground toolbar) by taking a clip screenshot
  const viewport = p.viewportSize();
  await p.screenshot({ 
    path: `${OUT}/${name}.tmp.png`,
    clip: { x: 0, y: 45, width: viewport.width, height: viewport.height - 45 }
  });
  
  console.log(`  ✓ ${name}`);
  await ctx.close();
}

// 1. Dashboard
await screenshot('wp-dashboard', '/wp-admin/', async (p) => {
  // Dismiss welcome panel
  const dismiss = await p.$('a.welcome-panel-close');
  if (dismiss) await dismiss.click().catch(()=>{});
});

// 2. General Settings
await screenshot('wordpress-settings-after-install', '/wp-admin/options-general.php');

// 3. Permalink Settings  
await screenshot('wp-permalink-settings', '/wp-admin/options-permalink.php');

// 4. Theme Install / Browser (Add New Themes)
await screenshot('choose-install-theme', '/wp-admin/theme-install.php', async (p) => {
  await p.waitForTimeout(3000); // Let themes load
});

// 5. Plugin Install (Add New Plugins)
await screenshot('essential-plugins-beginners', '/wp-admin/plugin-install.php', async (p) => {
  await p.waitForTimeout(3000); // Let plugins load
});

// 6. Block Editor - dismiss welcome, show clean editor
await screenshot('create-pages-posts', '/wp-admin/post-new.php', async (p) => {
  // Close welcome to editor modal
  await p.waitForTimeout(2000);
  const closeModal = await p.$('.components-modal__header button[aria-label="Close"]');
  if (closeModal) {
    await closeModal.click();
    await p.waitForTimeout(500);
  }
  // Also try the X button
  const xBtn = await p.$('[aria-label="Close"]');
  if (xBtn) { await xBtn.click().catch(()=>{}); }
  await p.waitForTimeout(500);
  
  // Type a title
  const titleField = await p.$('[aria-label="Add title"]');
  if (titleField) {
    await titleField.click();
    await titleField.type('My First Blog Post', { delay: 30 });
    await p.waitForTimeout(500);
  }
});

// 7. Reading Settings
await screenshot('wp-reading-settings', '/wp-admin/options-reading.php');

// 8. Launch checklist - Google Search Console
await screenshot('launch-wordpress-site', '/wp-admin/', async (p) => {
  // Just use dashboard for launch
});

await browser.close();
console.log('\nDone! Converting to webp...');
