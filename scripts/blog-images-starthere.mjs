import { chromium } from 'playwright';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/images/blog';
const browser = await chromium.launch();

const articles = [
  { slug: 'wordpress-settings-after-install', path: '/wp-admin/options-general.php' },
  { slug: 'choose-install-wordpress-theme', path: '/wp-admin/theme-install.php' },
  { slug: 'essential-wordpress-plugins-beginners', path: '/wp-admin/plugin-install.php' },
  { slug: 'create-wordpress-pages-posts', path: '/wp-admin/post-new.php' },
  { slug: 'wordpress-pre-launch-checklist', path: '/wp-admin/' },
];

for (const a of articles) {
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 } });
  const p = await ctx.newPage();
  
  const url = `https://playground.wordpress.net/?url=${encodeURIComponent(a.path)}`;
  await p.goto(url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
  await p.waitForTimeout(7000);
  
  // Crop out Playground toolbar (top 45px)
  await p.screenshot({ 
    path: `${OUT}/${a.slug}.tmp.png`,
    clip: { x: 0, y: 45, width: 1200, height: 585 }
  });
  console.log(`✓ ${a.slug}`);
  await ctx.close();
}

await browser.close();
console.log('Done');
