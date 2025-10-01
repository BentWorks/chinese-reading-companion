# Project Approval Summary

**Date**: 2025-10-01
**Status**: ✅ All questions answered, plan finalized, ready for approval

---

## 🎯 Your Decisions (Finalized)

### 1. **Cost** ✅
- **MVP**: $5 one-time (Chrome Web Store) + $0/month
- **No ongoing costs** until 10,000+ users
- **Free tiers**: Supabase, Vercel, GitHub Actions, Supabase Edge Functions

### 2. **Article Curation** ✅
- You provided [updated-chinese-websites.md](updated-chinese-websites.md) with 20+ sources
- We'll curate 30-50 articles for MVP from these sources
- Plenty of content across all HSK levels

### 3. **Web Crawler** ✅
- **Dual Strategy**: GitHub Actions + Supabase Edge Functions (both FREE)
- Deploy simultaneously in Phase 2
- A/B test which performs better
- Target: 20-30 articles/day combined

### 4. **Domain** ✅
- Use Vercel subdomain for MVP (e.g., `chinese-reading.vercel.app`)
- Switch to custom domain later (~5 minutes, zero code changes)
- Cost: $0 now, ~$12/year when ready

### 5. **Tech Stack** ✅
- **Vite + React**: Perfect for full website vision
- **SEO Strategy**: Astro for marketing pages (Phase 2)
- **You'll be discoverable on Google!** (see [SEO_STRATEGY.md](SEO_STRATEGY.md))
- Migration is easy if ever needed

### 6. **Design** ✅
- Use Shadcn/ui components (high-quality, accessible)
- I'll handle component selection and customization
- You trust my judgment on this

### 7. **Testing** ✅
- You'll recruit 2-3 Chinese learners to test POC (Week 1)
- I'll help with testing scripts and feedback collection

---

## 📋 What We're Building (Confirmed)

### **Two-Component System**

**1. Web App** (Discovery Platform)
- User signup/onboarding
- Article discovery feed (personalized by level + interests)
- Progress dashboard
- 30-50 curated articles for MVP

**2. Browser Extension** (Reading Assistant)
- Highlights unknown words on real websites
- Sidebar with pre-read vocabulary
- Tooltips with definitions and pinyin
- Syncs data with web app

---

## 💰 Final Cost Breakdown

| Item | Cost | When |
|------|------|------|
| Chrome Web Store fee | $5 one-time | Before publishing extension |
| Firefox Add-ons | $0 | Free |
| Supabase (database + auth) | $0/month | Free tier: 1,000+ users |
| Vercel (hosting) | $0/month | Free tier |
| GitHub Actions (crawler) | $0/month | Free tier: 2,000 min/month |
| Supabase Edge Functions (crawler) | $0/month | Free tier: 500k calls/month |
| Domain | $0 now | Optional: $12/year later |
| **TOTAL MVP** | **$5** | **One-time** |
| **Monthly** | **$0** | **Until 10k+ users** |

**When you'd pay** (future):
- If you reach 10,000+ users: Supabase Pro (~$25/month)
- But you'd have revenue by then!

---

## 🛠️ Technology Stack (Finalized)

### Core
- **Frontend**: Vite + React 18 + TypeScript 5
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Segmentation**: jieba-wasm (proven Chinese tokenizer)
- **Extension**: Manifest V3 (Chrome, Firefox, Edge)
- **Dictionary**: CC-CEDICT (115k entries, open license)
- **UI Components**: Shadcn/ui (React + Radix UI + Tailwind)

### Infrastructure
- **Hosting**: Vercel (web app) - FREE
- **Database**: Supabase (cloud PostgreSQL) - FREE
- **Crawler**: GitHub Actions + Supabase Edge Functions - FREE
- **Version Control**: GitHub (public repo)
- **Monorepo**: Turborepo + pnpm

### SEO Strategy
- **MVP**: Vite SPA with meta tags
- **Phase 2**: Add Astro for marketing pages (landing, blog, guides)
- **Result**: Fully Google-indexable, SEO-friendly

---

## 📅 Timeline (17 Weeks Total)

### **Phase 0: POC** (1 week)
- Proof-of-concept extension
- Test with 2-3 learners
- **Decision point**: Continue or pivot

### **Phase 1: MVP** (5-6 weeks)
- Full web app + extension
- User accounts + mastery tracking
- 30-50 curated articles
- Progress dashboard
- **Deliverable**: Public beta launch

### **Phase 2: Growth** (4-5 weeks)
- Dual crawler deployment (automated content)
- Traditional Chinese support
- ML-powered recommendations
- **Goal**: 500+ users, 500+ articles

### **Phase 3: Advanced** (4-5 weeks)
- Spaced repetition system (SRS)
- Study groups
- Text-to-speech
- **Goal**: 1,000+ active users

**Total to MVP**: 6-7 weeks from start
**Total to full platform**: 14-17 weeks

---

## 📊 Content Strategy (Finalized)

### **MVP (Manual Curation)**
- Source: [updated-chinese-websites.md](updated-chinese-websites.md)
- Target: 30-50 articles across HSK 1-6
- Categories: News, stories, educational, social media
- Time: ~2-3 hours to curate (one-time)

### **Phase 2 (Automated Crawling)**
- **GitHub Actions Crawler**: 10-15 articles/day
- **Supabase Edge Functions Crawler**: 10-15 articles/day
- **Combined**: 20-30 articles/day
- **Result**: 400-600 articles/month

### **Sources** (from your list)
- Educational: Chinese Reading Practice, HSK Reading, Mandarin Bean
- News: BBC Chinese, Xinhua, People's Daily
- Social: Weibo, Zhihu, Xiaohongshu
- Fiction: Qidian, 17K, Story 365
- **20+ high-quality sources ready to go!**

---

## 🔍 SEO & Discoverability (You Asked About This!)

**You will be discoverable on Google!** Here's how:

### **MVP Approach**:
- Basic meta tags on landing page
- Proper title, description, keywords
- Submit to Google Search Console
- **Good enough for launch**

### **Phase 2 Enhancement**:
- Add Astro for marketing pages (landing, about, blog)
- SEO-optimized static pages
- Blog posts targeting Chinese learning keywords
- **Fully indexed by Google**

### **Architecture**:
```
yoursite.com/              → Astro (landing, SEO-optimized)
yoursite.com/app           → Vite SPA (main app, behind login)
yoursite.com/blog          → Astro (SEO-optimized blog)
```

**Result**: Best of both worlds!
- Fast, interactive app (Vite SPA)
- Discoverable marketing pages (Astro static)

See full strategy: [SEO_STRATEGY.md](SEO_STRATEGY.md)

---

## ✅ What's Been Updated

### **Documents Updated Today**:
1. ✅ [PROJECT_REVISION_SUMMARY.md](PROJECT_REVISION_SUMMARY.md) - Updated cost breakdown
2. ✅ [REVISED_IMPLEMENTATION_PLAN.md](REVISED_IMPLEMENTATION_PLAN.md) - Added dual crawler strategy
3. ✅ [README.md](README.md) - Cleaned up structure references
4. ✅ [SEO_STRATEGY.md](SEO_STRATEGY.md) - NEW: Complete SEO plan
5. ✅ [updated-chinese-websites.md](updated-chinese-websites.md) - YOUR article sources added

### **Removed**:
- ❌ archive/contractor-artifacts/ (skeleton code - not needed)
- ❌ archive/superseded-planning/ (old plans - confusing)

### **Kept** (for reference):
- ✅ PRD.md, Tech_Spec.md, Roadmap.md (original context)
- ✅ Legal_Compliance_Checklist.md (still relevant)

---

## 🎬 Next Steps (If You Approve)

### **Immediate** (When you say "Approved"):
1. I'll create a fresh `current_task.md` for Phase 0
2. You follow [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) (Day 1 setup)
3. We start building the POC extension

### **Week 1** (Phase 0):
- Day 1-2: Project setup, Supabase, CC-CEDICT parsing
- Day 3-4: jieba integration, basic extension
- Day 5-6: Difficulty scoring, sidebar UI
- Day 7: Test with 2-3 learners

### **Deliverable** (End of Week 1):
- Working browser extension that:
  - Segments Chinese text on any webpage
  - Highlights unknown words
  - Shows sidebar with vocabulary
  - Calculates article difficulty

---

## 📝 Your Questions (All Answered!)

### ✅ Cost → $5 one-time, $0/month (answered)
### ✅ Crawler → Dual free strategy (answered)
### ✅ Vite vs Next.js → Vite is perfect for your vision (answered)
### ✅ SEO → You'll be discoverable (full strategy documented)
### ✅ Domain → Free subdomain for MVP, easy switch later (answered)
### ✅ Content → You provided awesome sources! (answered)

---

## 🚀 Ready to Proceed?

**Everything is prepared**:
- ✅ Plan finalized based on your feedback
- ✅ All costs clarified ($5 one-time, $0/month)
- ✅ Free crawler strategy (GitHub Actions + Supabase)
- ✅ SEO strategy documented (Vite + Astro hybrid)
- ✅ Article sources provided by you (20+ websites)
- ✅ All changes committed to GitHub
- ✅ Project cleaned up (no confusing artifacts)

**One decision remains**:

### 🎯 Do You Approve This Plan?

**If YES**:
- Say: "Approved, let's start Phase 0"
- I'll guide you through Day 1 setup
- We'll have a working POC in 1 week

**If you have more questions**:
- Ask anything about the plan
- I'll clarify or adjust as needed

---

**Repository**: https://github.com/BentWorks/chinese-reading-companion
**All changes pushed**: Commit `a7fe2af`

**I'm ready when you are! 🚀**
