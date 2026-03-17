import { chromium } from 'playwright';
import { execSync } from 'child_process';
import { existsSync, unlinkSync } from 'fs';

const term = process.argv[2];
const url = process.argv[3];
const output = process.argv[4]; // should end in .webp

if (!term || !url || !output) {
  console.error('Usage: node glossary-screenshot.mjs <term> <url> <output.webp>');
  process.exit(1);
}

const pngPath = output.replace('.webp', '.tmp.png');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    locale: 'en-US',
  });
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });

    // Dismiss common cookie/consent banners
    const dismissSelectors = [
      '[class*="cookie"] button[class*="accept"]',
      '[class*="consent"] button[class*="accept"]',
      '#onetrust-accept-btn-handler',
      '.cc-btn.cc-dismiss',
      'button[data-testid="cookie-accept"]',
    ];
    for (const sel of dismissSelectors) {
      try { await page.click(sel, { timeout: 2000 }); } catch {}
    }

    // Hide scrollbars
    await page.evaluate(() => {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    });

    await page.waitForTimeout(1000);
    await page.screenshot({ path: pngPath, type: 'png' });

    // Convert to webp
    execSync(`convert "${pngPath}" "${output}"`);
    if (existsSync(pngPath)) unlinkSync(pngPath);

    console.log(`Screenshot saved: ${output}`);
  } catch (err) {
    console.error(`Failed: ${err.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
