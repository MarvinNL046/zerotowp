import { chromium } from 'playwright';

const browser = await chromium.launch();
const OUT = '/home/marvin/Projecten/zerotowordpress/public/screenshots';

async function takeScreenshot(name, path, waitFor) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const p = await ctx.newPage();
  
  // Hide scrollbars
  await p.addStyleTag({ content: '::-webkit-scrollbar{display:none!important}*{scrollbar-width:none!important}' }).catch(()=>{});
  
  // Go to playground with wp-admin path via URL params
  const url = `https://playground.wordpress.net/?url=${encodeURIComponent(path)}`;
  console.log(`Navigating to ${path}...`);
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await p.waitForTimeout(6000);
  
  if (waitFor) {
    await p.waitForSelector(waitFor, { timeout: 10000 }).catch(() => {
      console.log(`  Warning: selector "${waitFor}" not found, continuing anyway`);
    });
    await p.waitForTimeout(1000);
  }
  
  // Try to dismiss any welcome modals/tooltips
  const closeButtons = await p.$$('[aria-label="Close"]');
  for (const btn of closeButtons) {
    await btn.click().catch(() => {});
    await p.waitForTimeout(300);
  }
  
  // Take screenshot
  await p.screenshot({ path: `${OUT}/${name}.tmp.png`, fullPage: false });
  console.log(`✓ ${name}`);
  await ctx.close();
}

// 1. Dashboard
await takeScreenshot('wp-dashboard', '/wp-admin/', 'h1');

// 2. General Settings (for settings article)
await takeScreenshot('wordpress-settings-after-install', '/wp-admin/options-general.php', '#blogname');

// 3. Permalink Settings (important for settings article)
await takeScreenshot('wp-permalink-settings', '/wp-admin/options-permalink.php', 'h1');

// 4. Themes page (for theme article)
await takeScreenshot('choose-install-theme', '/wp-admin/themes.php', '.theme');

// 5. Add New Theme (theme browser)
await takeScreenshot('wp-theme-browser', '/wp-admin/theme-install.php', '.theme-browser');

// 6. Plugins page (for plugins article)
await takeScreenshot('essential-plugins-beginners', '/wp-admin/plugins.php', 'h1');

// 7. Add New Plugin
await takeScreenshot('wp-add-plugin', '/wp-admin/plugin-install.php', '.plugin-card');

// 8. Block Editor - new post (for pages & posts article)
await takeScreenshot('create-pages-posts', '/wp-admin/post-new.php', '.editor-styles-wrapper');

// 9. All Pages (for pages & posts article)
await takeScreenshot('wp-all-pages', '/wp-admin/edit.php?post_type=page', 'h1');

// 10. Reading Settings (for launch checklist - homepage settings)
await takeScreenshot('wp-reading-settings', '/wp-admin/options-reading.php', 'h1');

await browser.close();
console.log('\nAll screenshots taken! Converting to webp...');
