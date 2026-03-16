# Plan: Glossary + Free Tools + Niche Guides

## Fase 1: WordPress Glossary (hoogste prioriteit)
**Waarom:** Long-tail SEO, intern linknetwerk, lage KD, hoge TP.
**Aanpak:** 50 begrippen, elk een eigen pagina `/glossary/[term]`.

### Technisch:
- Nieuwe Convex tabel `glossary` (term, slug, definition, relatedTerms, relatedArticles)
- Hub pagina `/glossary` met alle termen A-Z
- Individuele pagina's `/glossary/[slug]` met:
  - Korte definitie (1-2 zinnen)
  - Uitgebreide uitleg (200-400 woorden)
  - "In de praktijk" sectie
  - Gerelateerde termen (links naar andere glossary items)
  - Gerelateerde artikelen (links naar onze bestaande content)
  - FAQ schema markup

### Content kwaliteitsregels:
- Elke definitie MOET geverifieerd worden tegen wordpress.org/documentation
- Geen hallucinaties — alleen echte WordPress concepten
- Schrijf voor beginners, niet voor developers
- Elke term linkt naar minimaal 2 bestaande artikelen
- Elke term linkt naar minimaal 2 andere glossary termen

### Eerste 50 termen (gegroepeerd):
**Basis (15):** WordPress, Plugin, Theme, Widget, Dashboard, Post, Page, Category, Tag, Menu, Permalink, Slug, Excerpt, Featured Image, Gutenberg

**Technisch (15):** PHP, MySQL, FTP, SFTP, SSL, DNS, CDN, Caching, API, REST API, Hook, Filter, Action, Child Theme, Template

**Hosting (10):** Web Hosting, Shared Hosting, VPS, Dedicated Server, Managed Hosting, cPanel, Domain Name, DNS Records, Nameserver, Uptime

**SEO (10):** SEO, SERP, Keyword, Backlink, Meta Description, Alt Text, Schema Markup, XML Sitemap, Robots.txt, Core Web Vitals

## Fase 2: Niche Blog Startgidsen (medium prioriteit)
**Waarom:** Long-tail keywords met hoge affiliate waarde.
**Aanpak:** 5 niche guides als supporting articles in Tutorials cluster.

### Artikelen:
1. How to Start a Food Blog (niche: food bloggers)
2. How to Start a Travel Blog (niche: travel bloggers)
3. How to Start a Fashion Blog (niche: fashion bloggers)
4. How to Start a Tech Blog (niche: tech writers)
5. How to Start a Fitness Blog (niche: fitness/health)

### Per artikel:
- 2000-2500 woorden
- Niche-specifieke plugin/theme aanbevelingen
- Niche-specifieke monetization tips
- 3-4 screenshots van echte niche blog voorbeelden
- Interne links naar hosting, themes, plugins, SEO artikelen

## Fase 3: Free Tools (lage prioriteit, hoge impact lange termijn)
**Waarom:** Backlink magneten, unieke waarde, recurring traffic.
**Aanpak:** Start met 2 simpele tools.

### Tool 1: WordPress Theme Detector
- Input: URL van een website
- Output: welk WordPress theme en plugins ze gebruiken
- Technisch: API call naar whatwpthemeisthat.com of eigen scraper

### Tool 2: WordPress SEO Checker
- Input: URL van een WordPress pagina
- Output: SEO score met aanbevelingen (title tag, meta description, headings, images, etc.)
- Technisch: server-side fetch + parse HTML

---

## Uitvoeringsproces per item

Elke taak doorloopt deze stappen:

### Stap 1: Research (VERPLICHT)
- Zoek de term/topic op wordpress.org/documentation
- Check 2-3 betrouwbare bronnen (wordpress.org, developer.wordpress.org, web.dev)
- Noteer echte feiten, geen aannames

### Stap 2: Schrijven
- Gebruik geverifieerde data uit stap 1
- Eerste persoon als Marvin
- Concise, scanbaar, geen filler

### Stap 3: Verificatie
- Controleer alle feiten tegen bronnen
- Controleer alle interne links tegen bestaande slugs
- Controleer of screenshots kloppen

### Stap 4: Seed + Deploy
- Seed naar dev + prod
- Hero image aanmaken
- Datum toekennen
- Build check
- Deploy

## Cronschema
- Elke 45 minuten: 1 glossary term (research + schrijven + deployen)
- Na 50 termen: overschakelen naar niche guides
- Na niche guides: tools bouwen
