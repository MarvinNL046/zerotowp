import { chromium } from "playwright";
import sharp from "sharp";

const screenshots = [
  {
    url: "https://wordpress.org/plugins/translatepress-multilingual/",
    path: "public/screenshots/translatepress-plugin.webp",
    name: "TranslatePress plugin page",
  },
  {
    url: "https://wpml.org/",
    path: "public/screenshots/wpml-homepage.webp",
    name: "WPML homepage",
  },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "en-US",
    viewport: { width: 1280, height: 800 },
  });

  for (const s of screenshots) {
    console.log(`Taking screenshot: ${s.name} (${s.url})`);
    const page = await context.newPage();

    // Hide scrollbars
    await page.addInitScript(() => {
      const style = document.createElement("style");
      style.textContent = `
        ::-webkit-scrollbar { display: none !important; }
        * { scrollbar-width: none !important; }
        html, body { overflow: -moz-scrollbars-none; }
      `;
      document.addEventListener("DOMContentLoaded", () => {
        document.head.appendChild(style);
      });
    });

    await page.goto(s.url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForTimeout(3000);

    // Dismiss cookie/consent banners
    const consentSelectors = [
      'button:has-text("Accept")',
      'button:has-text("Accept All")',
      'button:has-text("Accept all")',
      'button:has-text("I agree")',
      'button:has-text("Got it")',
      'button:has-text("Allow")',
      'button:has-text("Consent")',
      '[class*="cookie"] button',
      '[class*="consent"] button',
      '[id*="cookie"] button',
      '[id*="consent"] button',
    ];

    for (const sel of consentSelectors) {
      try {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 1000 })) {
          await btn.click();
          await page.waitForTimeout(500);
          break;
        }
      } catch {
        // Continue trying other selectors
      }
    }

    // Inject scrollbar hiding CSS again after any consent interactions
    await page.evaluate(() => {
      const style = document.createElement("style");
      style.textContent = `
        ::-webkit-scrollbar { display: none !important; }
        * { scrollbar-width: none !important; }
      `;
      document.head.appendChild(style);
    });

    await page.waitForTimeout(1000);

    const buffer = await page.screenshot({ type: "png", fullPage: false });
    await sharp(buffer).webp({ quality: 80 }).toFile(s.path);

    console.log(`Saved: ${s.path}`);
    await page.close();
  }

  await browser.close();
  console.log("All screenshots done!");
})();
