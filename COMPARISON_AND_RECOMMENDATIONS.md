# Original Plan vs. Revised Plan — Comparison & Recommendations

**Date**: 2025-10-01
**Status**: Awaiting approval to proceed

---

## 📊 Key Differences

| Aspect | Original Plan | Revised Plan | Why Changed |
|--------|---------------|--------------|-------------|
| **Primary UX** | Paste text into web app | Browser extension on real articles | Better fits "reading in wild" use case |
| **Content Strategy** | User finds articles | App curates & recommends articles | Solves discovery problem for learners |
| **Architecture** | Local-first (IndexedDB only) | Cloud-based (Supabase) | Multi-device support, data safety, backend features |
| **Framework** | Next.js 14 | Vite + React | Simpler for SPA, no SSR needed |
| **Tokenizer** | Custom Trie+DAG+Viterbi | jieba-wasm library | Proven accuracy, save weeks of dev time |
| **SRS** | Phase 1 (MVP) | Phase 3 (Advanced) | Passive tracking sufficient for MVP |
| **Timeline** | 18-22 weeks | 10-12 weeks to MVP | Leaner scope, use libraries vs. custom |
| **Backend** | None (client-only) | Supabase (PostgreSQL + Auth + Storage) | Enables recommendations, user accounts, data persistence |
| **HSK Support** | HSK 2.0 (levels 1-6) | Defer to Phase 2 | Nice-to-have, not core to MVP |
| **Traditional Chinese** | Phase 2 | Phase 2 (unchanged) | Same priority |

---

## 🎯 What We're Building (Revised Vision)

### **The User Journey**

1. **User visits web app** → Signs up → Onboarding:
   - "What's your Chinese level?" (HSK 1-6 or "I don't know")
   - Quick diagnostic: 10 words, mark known/unknown
   - "What interests you?" (news, culture, tech, etc.)

2. **Web app shows personalized feed**:
   - Articles matched to user's level (90-95% known words = "sweet spot")
   - Filtered by interests
   - Each article shows: Title, source, difficulty badge, "Read" button

3. **User clicks "Read"** → Article opens on original website in new tab

4. **Browser extension auto-activates**:
   - Sidebar appears with:
     - Difficulty badge
     - "Unknown words in this article" (pre-read vocab list)
     - Progress indicator
   - Unknown words highlighted with subtle underline in article text
   - Hover over word → Tooltip with pinyin + definition
   - Click "Mark as known" → Updates user's mastery

5. **Extension syncs data back to web app**:
   - Reading completed, time spent
   - Words encountered
   - Mastery updated

6. **User returns to web app** → Sees progress dashboard:
   - Words learned this week
   - Articles read
   - Reading streak
   - Recommendations updated based on new mastery

---

## ✅ Why This Approach is Better

### 1. **Solves the Discovery Problem**
**Original**: User has to find articles themselves, paste into app
**Revised**: App recommends perfect articles for user's level
**Impact**: Lower friction, better learning outcomes

### 2. **Better Reading Experience**
**Original**: Reading in our web app (isolated environment)
**Revised**: Reading on real Chinese websites (authentic content, supports creators)
**Impact**: More engaging, ethical (drives traffic to sources)

### 3. **Faster to MVP**
**Original**: 18-22 weeks, custom implementations
**Revised**: 10-12 weeks, leverage existing libraries
**Impact**: Ship faster, validate product-market fit sooner

### 4. **More Scalable**
**Original**: No backend, limited to single device, data loss risk
**Revised**: Cloud backend from day 1, multi-device ready
**Impact**: Better user retention, easier to add features

### 5. **Lower Maintenance Burden**
**Original**: Custom tokenizer, custom SRS, all built from scratch
**Revised**: Use battle-tested libraries (jieba, ts-fsrs)
**Impact**: Focus on UX and product, not reinventing NLP algorithms

---

## 📦 What We're Deferring (Smart Cuts)

### ❌ Not in MVP (moved to Phase 2+)
1. **Active SRS flashcard reviews** → Phase 3
   - **Why**: Passive mastery tracking is enough for MVP
   - **MVP has**: Words learned count, progress tracking
   - **Later adds**: Daily review queue, spaced repetition scheduling

2. **HSK 3.0 alignment** → Phase 2
   - **Why**: Nice-to-have, not core value prop
   - **MVP has**: Generic difficulty scoring (% known words)
   - **Later adds**: "Equivalent HSK level" indicator

3. **Automated content crawling** → Phase 2
   - **Why**: Manual curation faster to start (20-30 articles is enough for MVP)
   - **MVP has**: Hand-picked, high-quality articles
   - **Later adds**: Daily automated crawling (10-20 new articles/day)

4. **Traditional Chinese** → Phase 2
   - **Why**: Simplified is 90%+ of learners, adding Traditional is easy later
   - **MVP has**: Simplified Chinese only
   - **Later adds**: OpenCC toggle, Traditional support

### ✅ Still in MVP
- Browser extension ✅
- User accounts and mastery tracking ✅
- Article recommendations ✅
- Tooltips and sidebar ✅
- Progress dashboard ✅
- 20-30 curated articles ✅

---

## 💰 Cost Analysis

### Original Plan (Local-First)
- **Hosting**: $0 (static site)
- **Database**: $0 (IndexedDB in browser)
- **Total**: $0/month

**Tradeoffs**:
- ❌ No multi-device sync
- ❌ No recommendations (can't analyze articles without backend)
- ❌ Data loss risk if browser storage cleared
- ❌ Can't track aggregate metrics (which articles are popular, etc.)

### Revised Plan (Cloud Backend)
- **Supabase**: $0/month (free tier: 50k rows, 500MB, 2GB bandwidth)
- **Vercel**: $0/month (free tier)
- **Fly.io** (crawler): ~$5-10/month
- **Domain**: ~$1/month
- **Total**: **~$5-10/month**

**Benefits**:
- ✅ User accounts and data persistence
- ✅ Multi-device sync ready (even if not used initially)
- ✅ Article recommendations (requires backend to analyze and store articles)
- ✅ Reading analytics (popular articles, completion rates)
- ✅ Scales to 1000s of users on free tier

**Verdict**: $5-10/month is negligible cost for massive feature unlock

---

## 🏗️ Architecture Diagram (Revised)

```
┌─────────────────────────────────────────────────────────┐
│                     WEB APP (Vite + React)              │
│                                                          │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────┐    │
│  │ Landing    │  │ Discovery    │  │ Dashboard   │    │
│  │ Page       │  │ Feed         │  │ (Progress)  │    │
│  └────────────┘  └──────────────┘  └─────────────┘    │
│         │                │                  │           │
│         └────────────────┴──────────────────┘           │
│                          │                               │
│                          ▼                               │
│                  ┌───────────────┐                      │
│                  │   Supabase    │                      │
│                  │   (Backend)   │                      │
│                  └───────────────┘                      │
│                          │                               │
│          ┌───────────────┼───────────────┐             │
│          ▼               ▼               ▼             │
│    ┌─────────┐   ┌──────────┐   ┌──────────┐         │
│    │  Users  │   │ Articles │   │ Mastery  │         │
│    │  Auth   │   │   DB     │   │  Data    │         │
│    └─────────┘   └──────────┘   └──────────┘         │
└─────────────────────────────────────────────────────────┘
                          │
                          │ (Syncs user mastery)
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│            BROWSER EXTENSION (Content Script)           │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │       Chinese Article (e.g., people.cn)          │  │
│  │                                                    │  │
│  │  你好，这是一篇关于中国经济的文章...              │  │
│  │  ─────  ────    ────  ────────                    │  │
│  │  (underlined = unknown words)                     │  │
│  │                                                    │  │
│  │  ┌─────────────────────────┐                      │  │
│  │  │ Sidebar                │                      │  │
│  │  │                        │                      │  │
│  │  │ Difficulty: Just Right│                      │  │
│  │  │                        │                      │  │
│  │  │ Unknown Words:         │                      │  │
│  │  │ • 经济 (jīngjì)        │                      │  │
│  │  │ • 发展 (fāzhǎn)        │                      │  │
│  │  │ • 改革 (gǎigé)         │                      │  │
│  │  └─────────────────────────┘                      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  Powered by: jieba-wasm (segmentation)                  │
│              Dexie.js (local cache)                     │
│              Supabase (sync)                            │
└─────────────────────────────────────────────────────────┘
                          │
                          │ (Sends reading events)
                          │
                          ▼
                  ┌───────────────┐
                  │   Supabase    │
                  │  (Update DB)  │
                  └───────────────┘
```

---

## 🛠️ Technology Stack Summary

| Layer | Technology | Why |
|-------|------------|-----|
| **Web App** | Vite + React + TypeScript | Fast, simple, perfect for SPA |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) | Full-featured BaaS, free tier, scales easily |
| **Extension** | Manifest V3 + React | Standard approach, code reuse from web app |
| **Segmentation** | jieba-wasm | Battle-tested, 10+ years of development, accurate |
| **Dictionary** | CC-CEDICT (115k entries) | Open license (CC-BY-SA), comprehensive |
| **Local Cache** | Dexie.js (IndexedDB) | Better DX than raw IndexedDB, TypeScript support |
| **State** | TanStack Query + Zustand | Server state (Query) + client state (Zustand) |
| **Styling** | Tailwind CSS + Shadcn/ui | Rapid prototyping, accessible components |
| **Testing** | Vitest + RTL + Playwright | Unit, component, E2E coverage |
| **Hosting** | Vercel (web app) + Fly.io (crawler) | Free/cheap, easy deployment |
| **Monorepo** | Turborepo + pnpm | Code sharing, fast builds |

---

## 📅 Timeline Comparison

| Phase | Original | Revised | Savings |
|-------|----------|---------|---------|
| Phase 0 (Foundation) | 2-3 weeks | **1 week** | 1-2 weeks |
| Phase 1 (MVP) | 6-8 weeks | **5-6 weeks** | 1-2 weeks |
| **To MVP** | **8-11 weeks** | **6-7 weeks** | **~4 weeks faster** |
| Phase 2 | 4-5 weeks | 4-5 weeks | Same |
| Phase 3 | 5-6 weeks | 4-5 weeks | 1 week |
| **Total** | 18-22 weeks | **14-17 weeks** | **~4-5 weeks faster** |

**Why faster**:
- Using jieba instead of custom tokenizer (saves 1-2 weeks)
- Simpler stack (Vite vs Next.js) (saves 3-5 days)
- Defer SRS to Phase 3 (saves 1-2 weeks in MVP)
- Defer HSK alignment (saves 3-5 days)

---

## 🚀 My Strong Recommendations

### ✅ Approve Revised Plan
**Reasons**:
1. **Better aligns with your vision**: Discovery + extension-based reading
2. **Faster to MVP**: 6-7 weeks vs 8-11 weeks
3. **Lower risk**: Using proven libraries (jieba, Supabase) vs custom implementations
4. **More scalable**: Cloud backend enables features like recommendations, multi-device
5. **Minimal cost**: $5-10/month is negligible for feature unlock
6. **Easier to maintain**: Less custom code to debug and improve

### 🎯 Phase 0 Goal (1 Week)
**Build a working proof-of-concept**:
- Extension that segments Chinese text on any webpage
- Highlights unknown words
- Shows sidebar with vocabulary list
- Calculates article difficulty

**Validation criteria**:
- Test with 2-3 Chinese learners
- Get feedback: "Would you use this?"
- If yes → Proceed to MVP
- If no → Pivot based on feedback

### 📝 After Phase 0, Decide:
1. **Continue to MVP** (if POC validates core value)
2. **Pivot** (if users want something different)
3. **Stop** (if no product-market fit)

**Low risk**: Only 1 week invested to validate idea

---

## ❓ Open Questions (Need Your Input)

1. **Monorepo setup**: Are you comfortable with Turborepo + pnpm? (Alternative: single repo with folders)
2. **Supabase**: Okay to create account and use free tier? (I'll walk you through setup)
3. **Extension stores**: Plan to publish to Chrome Web Store ($5 fee) + Firefox Add-ons (free)?
4. **Content curation**: For MVP, can you/we manually curate 20-30 articles? Or use automated crawler from day 1?
5. **Design**: Will you handle UI design, or use Shadcn/ui defaults with minimal customization?

---

## ✋ Decision Point

**Three options**:

### Option 1: Proceed with Revised Plan (RECOMMENDED)
- Start Phase 0 immediately
- 1 week to POC
- Validate with users
- Decide on MVP continuation

### Option 2: Hybrid Approach
- Keep some elements of original (e.g., local-first for MVP, cloud later)
- Mix and match based on your preferences
- Would need to discuss specific hybrid choices

### Option 3: Stick with Original Plan
- Follow contractor's plan
- Build custom tokenizer, local-first, Next.js
- Slower but more control

---

## 🎬 Next Steps (If You Approve Revised Plan)

**Immediate (Today)**:
1. Create Supabase account (I'll guide you)
2. Initialize monorepo structure
3. Download CC-CEDICT dataset
4. Set up Git repository

**This Week (Phase 0)**:
- Day 1-2: Project setup + Supabase + dictionary prep
- Day 3-4: Jieba integration + basic extension
- Day 5-6: Difficulty scoring + sidebar UI
- Day 7: Testing + demo to test users

**Deliverable**: Working extension that proves core value

---

**What do you think? Ready to proceed with the revised plan?**

Or do you have questions/concerns about specific technology choices?
