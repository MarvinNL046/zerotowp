import { chromium } from 'playwright';
import sharp from 'sharp';
import path from 'path';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/images/blog';

const articles = [
  {
    slug: 'customer-reviews-woocommerce-cve-2026-4664-auth-bypass',
    badge: 'SECURITY ALERT',
    badgeBg: '#c94a3d',
    title: 'WooCommerce<br/>Reviews CVE',
    subtitle: 'Auth bypass in Customer Reviews for WooCommerce lets unauthenticated attackers submit reviews. Update to 5.104.0.',
    tags: [
      { label: 'CVE-2026-4664', bg: '#f4b8a8' },
      { label: 'CVSS 5.3', bg: '#f4e4c1' },
      { label: '80K installs', bg: '#e8a363' },
    ],
    mockupType: 'version-warn',
    versionData: {
      label: 'CVE-2026-4664',
      sublabel: 'auth bypass',
      rows: [
        { version: '5.102.0', status: 'safe', color: '#4a9e7e' },
        { version: '5.103.0', status: 'affected', color: '#c94a3d' },
        { version: '5.104.0', status: 'patched', color: '#4a9e7e' },
      ],
    },
  },
  {
    slug: 'woocommerce-ai-automation-guide',
    badge: 'TUTORIAL',
    badgeBg: '#1d3a3a',
    title: 'WooCommerce<br/>AI Automation',
    subtitle: 'The 2026 stack for running a WooCommerce store with AI \u2014 tools that actually work, honest pricing, real limits.',
    tags: [
      { label: 'MCP', bg: '#f4e4c1' },
      { label: 'AI Engine', bg: '#c8e0d8' },
      { label: 'Tidio AI', bg: '#e8a363' },
    ],
    mockupType: 'stack',
  },
  {
    slug: 'cloudflare-emdash-vs-wordpress-ai-cms',
    badge: 'OPINION',
    badgeBg: '#1d3a3a',
    title: 'EmDash vs<br/>WordPress',
    subtitle: 'Cloudflare\u2019s AI-native CMS launched April 1, 2026. Here\u2019s what\u2019s actually true after two weeks of testing.',
    tags: [
      { label: 'EmDash', bg: '#f4e4c1' },
      { label: 'WordPress', bg: '#c8e0d8' },
      { label: 'April 2026', bg: '#e8a363' },
    ],
    mockupType: 'versus',
  },
];

function mockupHtml(article) {
  if (article.mockupType === 'version-warn') {
    const d = article.versionData;
    const rowsHtml = d.rows.map(r => `
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#1d3a3a;font-family:monospace;margin-bottom:6px;${r.status === 'affected' ? 'font-weight:700;' : ''}">
        <span>${r.version}</span><span style="color:${r.color};">${r.status}</span>
      </div>`).join('');
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:22px 20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="background:#c94a3d;color:#fdfaf3;padding:5px 12px;border-radius:6px;font-size:11px;font-family:monospace;display:inline-block;margin-bottom:10px;font-weight:700;letter-spacing:0.5px;">${d.label}</div>
        <div style="color:#c94a3d;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">${d.sublabel}</div>
        <div style="border-top:1px solid #e8dcc3;padding-top:10px;">${rowsHtml}</div>
      </div>`;
  }
  if (article.mockupType === 'stack') {
    const items = [
      { icon: '\u2328', label: 'AI content', bg: '#cfe5dd' },
      { icon: '\u26A1', label: 'Chatbot', bg: '#f4e4c1' },
      { icon: '\u2B50', label: 'Reviews', bg: '#e8a363' },
      { icon: '\u2699', label: 'MCP agents', bg: '#f4b8a8' },
    ];
    const rowsHtml = items.map(i => `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;padding:8px 10px;background:${i.bg};border-radius:8px;">
        <div style="font-size:16px;">${i.icon}</div>
        <div style="flex:1;color:#1d3a3a;font-weight:600;font-size:13px;">${i.label}</div>
        <div style="color:#1d3a3a;font-size:11px;font-family:monospace;opacity:0.7;">\u2713</div>
      </div>`).join('');
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="color:#1d3a3a;font-size:10px;letter-spacing:2px;font-weight:700;margin-bottom:12px;text-align:center;">AI STACK</div>
        ${rowsHtml}
      </div>`;
  }
  if (article.mockupType === 'versus') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:22px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="display:flex;gap:12px;align-items:stretch;">
          <div style="flex:1;text-align:center;padding:14px 10px;background:#cfe5dd;border-radius:10px;">
            <div style="font-family:Georgia,serif;font-weight:700;font-size:36px;color:#1d3a3a;line-height:1;margin-bottom:4px;">E</div>
            <div style="color:#1d3a3a;font-size:11px;font-weight:700;letter-spacing:1px;">EMDASH</div>
            <div style="margin-top:8px;font-size:10px;color:#1d3a3a;opacity:0.7;">new &middot; MIT</div>
          </div>
          <div style="display:flex;align-items:center;color:#c94a3d;font-weight:700;font-size:14px;font-family:monospace;">VS</div>
          <div style="flex:1;text-align:center;padding:14px 10px;background:#f4e4c1;border-radius:10px;">
            <div style="font-family:Georgia,serif;font-weight:700;font-size:36px;color:#1d3a3a;line-height:1;margin-bottom:4px;">W</div>
            <div style="color:#1d3a3a;font-size:11px;font-weight:700;letter-spacing:1px;">WORDPRESS</div>
            <div style="margin-top:8px;font-size:10px;color:#1d3a3a;opacity:0.7;">42.2% web</div>
          </div>
        </div>
        <div style="margin-top:14px;padding-top:10px;border-top:1px solid #e8dcc3;text-align:center;font-size:11px;color:#1d3a3a;font-weight:600;">real-world test &middot; April 2026</div>
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
    font-size: 62px;
    line-height: 1.05;
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
      ${mockupHtml(article)}
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
console.log('Done \u2014 3 batch-3 hero images generated');
