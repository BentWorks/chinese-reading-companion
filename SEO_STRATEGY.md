# SEO & Discoverability Strategy

**Last Updated**: 2025-10-01
**Goal**: Ensure the Chinese Reading Companion is discoverable on Google and other search engines

---

## 🎯 The Challenge

**Issue**: Single-Page Apps (SPAs) like Vite can have SEO limitations because:
- Content loads via JavaScript (search bots may not execute JS)
- No server-side rendering by default
- Dynamic routes not easily crawlable

**But we still want**:
- Landing page discoverable on Google
- Blog/guide content indexed
- Marketing pages ranking for Chinese learning keywords

---

## ✅ Our SEO-Friendly Architecture

### **Hybrid Approach**: Best of Both Worlds

```
┌─────────────────────────────────────────────────────────────┐
│                     PUBLIC PAGES                            │
│              (SEO-optimized, Static/SSG)                    │
│                                                             │
│  yoursite.com              → Landing page                   │
│  yoursite.com/about        → About page                     │
│  yoursite.com/blog         → Blog (list of posts)           │
│  yoursite.com/blog/post-1  → Individual blog posts          │
│  yoursite.com/guides       → Learning guides                │
│                                                             │
│  Technology: Astro or Vite SSG                             │
│  Result: Fully indexable by Google                         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   AUTHENTICATED APP                         │
│                 (Vite SPA, Behind Login)                    │
│                                                             │
│  yoursite.com/app          → Main app (requires login)      │
│  OR app.yoursite.com       → Separate subdomain             │
│                                                             │
│  Technology: Vite + React SPA                              │
│  Result: Fast, interactive, no SEO needed (private)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Implementation Plan

### **Phase 1 (MVP)**: Basic SEO

**Landing Page** (`/`):
- Static HTML with meta tags
- Proper title, description, Open Graph tags
- Schema.org markup for SaaS/Educational Tool
- Fast loading (Lighthouse score >90)

**Example meta tags**:
```html
<head>
  <title>Chinese Reading Companion - Learn Chinese by Reading</title>
  <meta name="description" content="Find Chinese articles perfectly matched to your level. Read with confidence using our browser extension that highlights unknowns and shows instant definitions.">
  <meta property="og:title" content="Chinese Reading Companion">
  <meta property="og:description" content="Personalized Chinese reading platform for learners">
  <meta property="og:image" content="https://yoursite.com/og-image.png">
  <meta name="keywords" content="Chinese learning, HSK, Chinese reading, language learning, Mandarin">
</head>
```

**Sitemap**:
- Generate `sitemap.xml` with all public pages
- Submit to Google Search Console
- Include changefreq and priority

**robots.txt**:
```
User-agent: *
Allow: /
Disallow: /app/

Sitemap: https://yoursite.com/sitemap.xml
```

**Tools**:
- Use Vite's static generation for landing page
- Add basic meta tags manually
- Deploy as static HTML to Vercel

---

### **Phase 2 (Month 2-3)**: Full SEO with Astro

**Migrate marketing pages to Astro**:

**What is Astro?**
- Modern static site generator
- Ships zero JavaScript by default (fastest possible)
- Can embed React components where needed
- Perfect for content/marketing pages

**Pages to create**:
1. **Landing** (`/`) - Hero, features, CTA
2. **About** (`/about`) - Mission, team, story
3. **Blog** (`/blog`) - SEO-friendly articles about Chinese learning
4. **Guides** (`/guides`) - "How to use" content
5. **Pricing** (`/pricing`) - Future pricing tiers

**Architecture**:
```
Repository structure:
├── apps/
│   ├── web/           ← Vite SPA (app.yoursite.com or /app)
│   ├── marketing/     ← Astro site (yoursite.com) - NEW
│   └── extension/     ← Browser extension
```

**SEO Benefits**:
- ✅ All content pre-rendered (no JS needed)
- ✅ Perfect Lighthouse scores (95-100)
- ✅ Google indexes instantly
- ✅ Blog posts show up in search results
- ✅ Can add MDX for content (Markdown + React components)

---

### **Phase 3 (Month 4+)**: Advanced SEO

**Content Marketing**:
- Publish blog posts targeting keywords:
  - "How to improve Chinese reading"
  - "Best Chinese articles for HSK 3 learners"
  - "Chinese reading practice online"
  - "Learn Chinese by reading news"
- Optimize for long-tail keywords

**Structured Data** (Schema.org):
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Chinese Reading Companion",
  "applicationCategory": "EducationalApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
}
```

**Backlinks**:
- Submit to Chinese learning directories
- Partner with language learning blogs
- Guest posts on education sites
- Reddit/HackerNews launches

**Performance**:
- CDN for images (Cloudflare)
- Lazy loading for below-the-fold content
- WebP images with fallbacks
- Minimize Core Web Vitals (LCP, FID, CLS)

---

## 🔍 Target Keywords

### Primary Keywords (High Intent)
- "Chinese reading practice"
- "Learn Chinese by reading"
- "Chinese articles for learners"
- "HSK reading practice"
- "Chinese reading app"

### Secondary Keywords (Long-tail)
- "Chinese articles for HSK 3"
- "How to read Chinese news"
- "Chinese reading extension"
- "Simplified Chinese reading practice"
- "Chinese vocabulary from reading"

### Content Keywords (Blog)
- "Best way to learn Chinese characters"
- "Chinese reading comprehension tips"
- "How to find Chinese articles at my level"
- "Chinese reading difficulty levels"

---

## 📊 SEO Metrics & Goals

### **Month 1 (MVP)**:
- Google Search Console setup ✅
- Landing page indexed ✅
- 0-10 organic visitors/month

### **Month 3** (Astro + Blog):
- 5-10 blog posts published
- 100-300 organic visitors/month
- Ranking for 2-3 long-tail keywords (top 20)

### **Month 6**:
- 20+ blog posts
- 1,000+ organic visitors/month
- Ranking for 5-10 keywords (top 10)
- Backlinks from 5+ education sites

---

## 🛠️ Tools & Monitoring

### **SEO Tools** (Free):
- **Google Search Console** - Monitor indexing, keywords, clicks
- **Google Analytics** - Track traffic sources
- **Lighthouse** - Performance and SEO audits
- **Ubersuggest** (Free tier) - Keyword research

### **Optional** (Paid):
- Ahrefs or SEMrush (if budget allows) - ~$100/month
- Screaming Frog - Site crawling

---

## 🚀 Migration Path: Vite → Astro

**When ready to add Astro** (Phase 2):

### Step 1: Set up Astro marketing site
```bash
# In apps/ directory
pnpm create astro@latest marketing
cd marketing
pnpm install
```

### Step 2: Move landing page to Astro
- Copy landing page design
- Convert to Astro components
- Add blog structure

### Step 3: Configure routing
**Option A**: Subdomain
- `yoursite.com` → Astro (marketing)
- `app.yoursite.com` → Vite SPA (app)

**Option B**: Path-based
- `yoursite.com/*` → Astro (marketing)
- `yoursite.com/app/*` → Vite SPA (app)

### Step 4: Deploy
- Astro: Deploy to Vercel (or same as Vite)
- Configure Vercel rewrites if using path-based routing

---

## ✅ Recommended Approach

### **MVP (Now - Month 1)**:
1. Create basic landing page with Vite
2. Add proper meta tags and sitemap
3. Submit to Google Search Console
4. **Good enough for launch!**

### **Phase 2 (Month 2-3)**:
1. Add Astro for marketing pages
2. Start blog with 1-2 posts/week
3. Optimize for 3-5 target keywords

### **Phase 3 (Month 4+)**:
1. Scale content production
2. Build backlinks
3. Track and optimize based on Search Console data

---

## 🎯 Bottom Line

**Your site WILL be discoverable on Google!**

- ✅ Vite is NOT limiting SEO (with proper strategy)
- ✅ Hybrid approach (Astro marketing + Vite app) is standard
- ✅ Migration is easy when ready
- ✅ Can start with basic meta tags and evolve

**Don't worry about being "invisible"** - thousands of successful SaaS products use this exact architecture!

---

## 📚 Resources

- [Astro SEO Guide](https://docs.astro.build/en/guides/seo/)
- [Google Search Console](https://search.google.com/search-console)
- [Vite SSG Plugin](https://github.com/antfu/vite-ssg)
- [Schema.org for Education](https://schema.org/EducationalApplication)

---

**Next Steps**: Start with basic meta tags in MVP, add Astro in Month 2-3 as content grows.
