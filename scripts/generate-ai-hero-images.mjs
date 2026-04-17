import { chromium } from 'playwright';
import sharp from 'sharp';
import path from 'path';

const OUT = '/home/marvin/Projecten/zerotowordpress/public/images/blog';

const articles = [
  {
    slug: 'connect-ai-agents-to-wordpress-mcp-setup',
    title: 'Connect AI<br/>to WordPress',
    subtitle: 'Set up the WordPress MCP Adapter for Claude, ChatGPT, and any MCP client.',
    tags: [
      { label: 'MCP Adapter', bg: '#f4e4c1' },
      { label: 'Claude Desktop', bg: '#c8e0d8' },
      { label: 'OAuth 2.1', bg: '#e8a363' },
    ],
    mockupType: 'code',
    mockupLabel: 'mcp.json',
  },
  {
    slug: 'build-wordpress-website-with-ai',
    title: 'Build WordPress<br/>with AI',
    subtitle: 'The 2026 workflow for launching a WordPress site in a single afternoon.',
    tags: [
      { label: 'AI Builders', bg: '#f4e4c1' },
      { label: 'Elementor AI', bg: '#c8e0d8' },
      { label: 'Ship Fast', bg: '#e8a363' },
    ],
    mockupType: 'browser',
    mockupLabel: 'ai-site.com',
  },
  {
    slug: 'optimize-wordpress-for-ai-search-geo',
    title: 'GEO for<br/>WordPress',
    subtitle: 'Get your WordPress content cited by ChatGPT, Claude, and Perplexity.',
    tags: [
      { label: 'Schema.org', bg: '#f4e4c1' },
      { label: 'llms.txt', bg: '#c8e0d8' },
      { label: 'AI Citations', bg: '#e8a363' },
    ],
    mockupType: 'citation',
    mockupLabel: 'cited by AI',
  },
  {
    slug: 'best-ai-plugins-wordpress-2026',
    title: 'Best AI Plugins<br/>for WordPress',
    subtitle: 'Nine AI plugins tested on real WordPress sites in 2026.',
    tags: [
      { label: 'AI Engine', bg: '#f4e4c1' },
      { label: 'Rank Math AI', bg: '#c8e0d8' },
      { label: 'Elementor AI', bg: '#e8a363' },
    ],
    mockupType: 'list',
    mockupLabel: 'plugins',
  },
  {
    slug: 'wordpress-7-0-complete-guide',
    title: 'WordPress 7.0<br/>Complete Guide',
    subtitle: 'Release timeline, new features, and how to prepare your site.',
    tags: [
      { label: 'Abilities API', bg: '#f4e4c1' },
      { label: 'Realtime Collab', bg: '#c8e0d8' },
      { label: '2026 Release', bg: '#e8a363' },
    ],
    mockupType: 'version',
    mockupLabel: 'v7.0',
  },
];

function mockupHtml(type, label) {
  if (type === 'code') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:18px 20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="background:#1d3a3a;color:#f1ddb3;padding:6px 14px;border-radius:6px;font-size:14px;font-family:monospace;display:inline-block;margin-bottom:14px;">${label}</div>
        <div style="height:8px;background:#cfe5dd;border-radius:4px;width:88%;margin-bottom:8px;"></div>
        <div style="height:8px;background:#e8dcc3;border-radius:4px;width:72%;margin-bottom:8px;"></div>
        <div style="height:8px;background:#e8dcc3;border-radius:4px;width:94%;margin-bottom:8px;"></div>
        <div style="height:8px;background:#cfe5dd;border-radius:4px;width:60%;margin-bottom:8px;"></div>
        <div style="height:8px;background:#e8dcc3;border-radius:4px;width:80%;"></div>
      </div>`;
  }
  if (type === 'browser') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:0;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;overflow:hidden;">
        <div style="background:#1d3a3a;padding:10px 14px;display:flex;align-items:center;gap:6px;">
          <div style="width:10px;height:10px;border-radius:50%;background:#e8a363;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#f4e4c1;"></div>
          <div style="width:10px;height:10px;border-radius:50%;background:#c8e0d8;"></div>
          <div style="background:#2d4a4a;color:#c8e0d8;font-size:11px;padding:4px 12px;border-radius:10px;margin-left:8px;font-family:monospace;">${label}</div>
        </div>
        <div style="padding:20px;">
          <div style="height:14px;background:#cfe5dd;border-radius:4px;width:60%;margin-bottom:12px;"></div>
          <div style="height:8px;background:#e8dcc3;border-radius:4px;width:88%;margin-bottom:8px;"></div>
          <div style="height:8px;background:#e8dcc3;border-radius:4px;width:76%;margin-bottom:14px;"></div>
          <div style="display:flex;gap:8px;">
            <div style="flex:1;height:48px;background:#cfe5dd;border-radius:6px;"></div>
            <div style="flex:1;height:48px;background:#e8dcc3;border-radius:6px;"></div>
          </div>
        </div>
      </div>`;
  }
  if (type === 'citation') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:22px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="background:#e8a363;color:#1d3a3a;padding:6px 14px;border-radius:6px;font-size:13px;font-weight:600;display:inline-block;margin-bottom:14px;">${label}</div>
        <div style="height:8px;background:#cfe5dd;border-radius:4px;width:90%;margin-bottom:8px;"></div>
        <div style="height:8px;background:#cfe5dd;border-radius:4px;width:70%;margin-bottom:14px;"></div>
        <div style="border-left:3px solid #1d3a3a;padding-left:10px;">
          <div style="height:7px;background:#e8dcc3;border-radius:3px;width:85%;margin-bottom:6px;"></div>
          <div style="height:7px;background:#e8dcc3;border-radius:3px;width:65%;"></div>
        </div>
        <div style="margin-top:14px;color:#1d3a3a;font-size:11px;font-family:monospace;">[1] zerotowp.com</div>
      </div>`;
  }
  if (type === 'list') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:20px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #e8dcc3;">
          <div style="width:22px;height:22px;background:#1d3a3a;border-radius:6px;"></div>
          <div style="height:10px;background:#cfe5dd;border-radius:4px;flex:1;"></div>
          <div style="color:#e8a363;font-weight:700;font-size:14px;">★★★★★</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #e8dcc3;">
          <div style="width:22px;height:22px;background:#e8a363;border-radius:6px;"></div>
          <div style="height:10px;background:#e8dcc3;border-radius:4px;flex:1;"></div>
          <div style="color:#e8a363;font-weight:700;font-size:14px;">★★★★☆</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:22px;height:22px;background:#cfe5dd;border-radius:6px;"></div>
          <div style="height:10px;background:#e8dcc3;border-radius:4px;flex:1;"></div>
          <div style="color:#e8a363;font-weight:700;font-size:14px;">★★★★☆</div>
        </div>
      </div>`;
  }
  if (type === 'version') {
    return `
      <div style="background:#fdfaf3;border-radius:14px;padding:22px;box-shadow:0 8px 24px rgba(0,0,0,0.12);width:100%;text-align:center;">
        <div style="color:#1d3a3a;font-size:10px;letter-spacing:2px;font-weight:600;margin-bottom:6px;">WORDPRESS</div>
        <div style="font-family:Georgia,serif;font-weight:700;font-size:56px;color:#1d3a3a;line-height:1;margin-bottom:10px;">${label}</div>
        <div style="display:inline-block;background:#e8a363;color:#1d3a3a;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;">Coming 2026</div>
        <div style="margin-top:14px;display:flex;justify-content:space-between;gap:8px;">
          <div style="flex:1;height:6px;background:#cfe5dd;border-radius:3px;"></div>
          <div style="flex:1;height:6px;background:#cfe5dd;border-radius:3px;"></div>
          <div style="flex:1;height:6px;background:#e8dcc3;border-radius:3px;"></div>
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
  .bg-circle-1 {
    position: absolute;
    top: -40px;
    right: -40px;
    width: 220px;
    height: 220px;
    background: #e8dcc3;
    border-radius: 50%;
    opacity: 0.5;
  }
  .bg-circle-2 {
    position: absolute;
    bottom: -60px;
    right: 320px;
    width: 160px;
    height: 160px;
    background: #d9c9a8;
    border-radius: 50%;
    opacity: 0.4;
  }
  .card {
    position: absolute;
    top: 50px;
    left: 50px;
    right: 50px;
    bottom: 50px;
    background: linear-gradient(135deg, #1d3a3a 0%, #264a4a 100%);
    border-radius: 24px;
    padding: 60px;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 40px;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .brand {
    color: #c8e0d8;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .title {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 700;
    color: #fdfaf3;
    font-size: 68px;
    line-height: 1.04;
    margin: 20px 0 18px;
  }
  .subtitle {
    color: #c8e0d8;
    font-size: 19px;
    line-height: 1.45;
    max-width: 540px;
    margin-bottom: 32px;
  }
  .tags {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }
  .mockup-wrapper {
    width: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
</head>
<body>
  <div class="bg-circle-1"></div>
  <div class="bg-circle-2"></div>
  <div class="card">
    <div class="content">
      <div class="brand">Zero To WP</div>
      <div>
        <div class="title">${article.title}</div>
        <div class="subtitle">${article.subtitle}</div>
        <div class="tags">${tagsHtml}</div>
      </div>
    </div>
    <div class="mockup-wrapper">
      ${mockupHtml(article.mockupType, article.mockupLabel)}
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
  console.log(`✓ ${article.slug}.webp`);
  await page.close();
}

await ctx.close();
await browser.close();
console.log('Done — 5 hero images generated');
