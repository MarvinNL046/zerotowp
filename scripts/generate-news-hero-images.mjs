import { chromium } from 'playwright';
import sharp from 'sharp';
import path from 'path';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/images/blog';

const articles = [
  {
    slug: 'essential-plugin-supply-chain-backdoor-attack',
    badge: 'SECURITY ALERT',
    badgeBg: '#c94a3d',
    title: '31 Plugins<br/>Backdoored',
    subtitle: 'An 8-month dormant supply-chain attack activated April 2026 — closed by WordPress.org across the Essential Plugin portfolio.',
    tags: [
      { label: 'Supply Chain', bg: '#f4b8a8' },
      { label: '31 Plugins', bg: '#f4e4c1' },
      { label: 'April 2026', bg: '#e8a363' },
    ],
    mockupType: 'warning',
    mockupLabel: '31',
    mockupSublabel: 'plugins affected',
  },
  {
    slug: 'smart-slider-3-pro-backdoor-attack-april-2026',
    badge: 'SECURITY ALERT',
    badgeBg: '#c94a3d',
    title: 'Smart Slider 3<br/>Hijacked',
    subtitle: 'Version 3.5.1.35 shipped with a backdoor through Nextend\u2019s compromised update servers. Update to 3.5.1.36 now.',
    tags: [
      { label: 'Nextend', bg: '#f4b8a8' },
      { label: 'v3.5.1.35', bg: '#f4e4c1' },
      { label: 'April 2026', bg: '#e8a363' },
    ],
    mockupType: 'version-warn',
    mockupLabel: '3.5.1.35',
    mockupSublabel: 'poisoned',
  },
  {
    slug: 'wordpress-6-9-4-security-cleanup-april-2026',
    badge: 'SECURITY UPDATE',
    badgeBg: '#1d3a3a',
    title: 'WordPress<br/>6.9.4 Released',
    subtitle: 'A quick follow-up cleanup after 6.9.2 and 6.9.3 \u2014 three security fixes that were missed in the first pass.',
    tags: [
      { label: 'PclZip', bg: '#f4e4c1' },
      { label: 'Notes API', bg: '#c8e0d8' },
      { label: 'getID3', bg: '#e8a363' },
    ],
    mockupType: 'version-ok',
    mockupLabel: '6.9.4',
    mockupSublabel: 'update now',
  },
];

function mockupHtml(type, label, sublabel) {
  if (type === 'warning') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:28px 20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;text-align:center;">
        <div style="color:#c94a3d;font-size:14px;font-weight:700;letter-spacing:1px;margin-bottom:4px;">AFFECTED</div>
        <div style="font-family:Georgia,serif;font-weight:700;font-size:96px;color:#1d3a3a;line-height:1;margin-bottom:6px;">${label}</div>
        <div style="color:#1d3a3a;font-size:14px;font-weight:600;margin-bottom:14px;">${sublabel}</div>
        <div style="display:flex;gap:4px;justify-content:center;">
          <div style="width:12px;height:6px;background:#c94a3d;border-radius:2px;"></div>
          <div style="width:12px;height:6px;background:#c94a3d;border-radius:2px;"></div>
          <div style="width:12px;height:6px;background:#c94a3d;border-radius:2px;"></div>
          <div style="width:12px;height:6px;background:#c94a3d;border-radius:2px;"></div>
          <div style="width:12px;height:6px;background:#c94a3d;border-radius:2px;"></div>
          <div style="width:12px;height:6px;background:#e8a363;border-radius:2px;"></div>
        </div>
      </div>`;
  }
  if (type === 'version-warn') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:24px 20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="background:#c94a3d;color:#fdfaf3;padding:5px 12px;border-radius:6px;font-size:12px;font-family:monospace;display:inline-block;margin-bottom:12px;font-weight:700;">COMPROMISED</div>
        <div style="font-family:monospace;font-weight:700;font-size:44px;color:#1d3a3a;line-height:1;margin-bottom:8px;">${label}</div>
        <div style="color:#c94a3d;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">${sublabel}</div>
        <div style="border-top:1px solid #e8dcc3;padding-top:10px;">
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#1d3a3a;font-family:monospace;margin-bottom:4px;">
            <span>3.5.1.34</span><span style="color:#4a9e7e;">safe</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#1d3a3a;font-family:monospace;margin-bottom:4px;font-weight:700;">
            <span>3.5.1.35</span><span style="color:#c94a3d;">hacked</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:11px;color:#1d3a3a;font-family:monospace;">
            <span>3.5.1.36</span><span style="color:#4a9e7e;">patched</span>
          </div>
        </div>
      </div>`;
  }
  if (type === 'version-ok') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:22px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;text-align:center;">
        <div style="color:#1d3a3a;font-size:10px;letter-spacing:2px;font-weight:600;margin-bottom:6px;">WORDPRESS CORE</div>
        <div style="font-family:Georgia,serif;font-weight:700;font-size:72px;color:#1d3a3a;line-height:1;margin-bottom:8px;">${label}</div>
        <div style="display:inline-block;background:#4a9e7e;color:#fdfaf3;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">${sublabel}</div>
        <div style="margin-top:6px;display:flex;justify-content:space-between;gap:6px;">
          <div style="flex:1;height:6px;background:#cfe5dd;border-radius:3px;"></div>
          <div style="flex:1;height:6px;background:#cfe5dd;border-radius:3px;"></div>
          <div style="flex:1;height:6px;background:#cfe5dd;border-radius:3px;"></div>
          <div style="flex:1;height:6px;background:#4a9e7e;border-radius:3px;"></div>
        </div>
      </div>`;
  }
  return '';
}

function renderHtml(article) {
  const tagsHtml = article.tags.map(t =>
    `<div style="background:${t.bg};color:#1d3a3a;padding:14px 28px;border-radius:30px;font-size:17px;font-weight:700;">${t.label}</div>`
  ).join('');

  return `<!DOCTYPE html>
<html>
<head>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background: #f5efe4;
    width: 1200px;
    height: 675px;
    position: relative;
    overflow: hidden;
  }
  .bg-circle-1 { position: absolute; top: -40px; right: -40px; width: 220px; height: 220px; background: #e8dcc3; border-radius: 50%; opacity: 0.5; }
  .bg-circle-2 { position: absolute; bottom: -60px; right: 320px; width: 160px; height: 160px; background: #d9c9a8; border-radius: 50%; opacity: 0.4; }
  .card {
    position: absolute;
    top: 50px; left: 50px; right: 50px; bottom: 50px;
    background: linear-gradient(135deg, #1d3a3a 0%, #264a4a 100%);
    border-radius: 24px;
    padding: 50px 60px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 40px;
  }
  .content { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .top-row { display: flex; align-items: center; gap: 12px; }
  .brand { color: #c8e0d8; font-size: 15px; font-weight: 600; letter-spacing: 0.5px; }
  .badge {
    display: inline-block;
    background: ${article.badgeBg};
    color: #fdfaf3;
    padding: 5px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.5px;
  }
  .title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #fdfaf3;
    font-size: 66px;
    line-height: 1.04;
    margin: 18px 0 16px;
  }
  .subtitle {
    color: #c8e0d8;
    font-size: 18px;
    line-height: 1.45;
    max-width: 540px;
    margin-bottom: 28px;
  }
  .tags { display: flex; gap: 12px; flex-wrap: wrap; }
  .mockup-wrapper { width: 320px; display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
  <div class="bg-circle-1"></div>
  <div class="bg-circle-2"></div>
  <div class="card">
    <div class="content">
      <div class="top-row">
        <div class="brand">Zero To WP</div>
        <div class="badge">${article.badge}</div>
      </div>
      <div>
        <div class="title">${article.title}</div>
        <div class="subtitle">${article.subtitle}</div>
        <div class="tags">${tagsHtml}</div>
      </div>
    </div>
    <div class="mockup-wrapper">
      ${mockupHtml(article.mockupType, article.mockupLabel, article.mockupSublabel)}
    </div>
  </div>
</body>
</html>`;
}

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 675 },
  deviceScaleFactor: 2,
});

for (const article of articles) {
  const page = await ctx.newPage();
  await page.setContent(renderHtml(article), { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(200);
  const outPath = path.join(OUT, `${article.slug}.webp`);
  const pngBuffer = await page.screenshot({
    type: 'png',
    fullPage: false,
    clip: { x: 0, y: 0, width: 1200, height: 675 },
  });
  await sharp(pngBuffer).webp({ quality: 85 }).toFile(outPath);
  console.log(`\u2713 ${article.slug}.webp`);
  await page.close();
}

await ctx.close();
await browser.close();
console.log('Done \u2014 3 news hero images generated');
