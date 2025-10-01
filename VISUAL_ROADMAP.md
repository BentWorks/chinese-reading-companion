# Visual Project Roadmap

**Simplified view of what we're building and when**

---

## 🎯 The Big Picture

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR VISION                             │
│                                                             │
│  "Help Chinese learners find the perfect articles to read   │
│   and assist them while reading with instant definitions    │
│   and progress tracking"                                    │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  TWO-PART SOLUTION                          │
│                                                             │
│  ┌─────────────────┐         ┌──────────────────┐           │
│  │   WEB APP       │         │   EXTENSION      │           │
│  │  (Discovery)    │◄───────►│  (Reading Help)  │           │
│  │                 │  Syncs  │                  │           │
│  │ • Find articles │         │ • Highlights     │           │
│  │ • Recommend     │         │ • Tooltips       │           │
│  │ • Track progress│         │ • Sidebar vocab  │           │
│  └─────────────────┘         └──────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📅 Timeline (17 Weeks Total)

```
┌──────────────────────────────────────────────────────────────────────┐
│ WEEK 1          │ WEEKS 2-7        │ WEEKS 8-12      │ WEEKS 13-17   │
│ Phase 0         │ Phase 1          │ Phase 2         │ Phase 3       │
│ POC             │ MVP              │ Growth          │ Advanced      │
│                 │                  │                 │               │
│ ┌─────┐         │ ┌──────┐         │ ┌─────┐         │ ┌──────┐      │
│ │Demo │         │ │Public│         │ │Scale│         │ │Social│      │
│ │Ready│         │ │Beta  │         │ │Up   │         │ │ +SRS │      │
│ └─────┘         │ └──────┘         │ └─────┘         │ └──────┘      │
└──────────────────────────────────────────────────────────────────────┘
    ↑                  ↑                 ↑                 ↑
    │                  │                 │                 │
  Test with        Launch to         500+ users       1000+ users
  2-3 users      100+ users         Auto-crawler    Study groups
```

---

## 🏗️ Phase Breakdown

### **Phase 0: Proof of Concept** (1 Week)

**Goal**: Validate core idea works

```
Day 1-2: Setup
├── Create monorepo
├── Setup Supabase
├── Parse CC-CEDICT
└── Create database

Day 3-4: Core Tech
├── Integrate jieba (segmentation)
├── Build basic extension
└── Test on websites

Day 5-6: UI
├── Sidebar component
├── Word highlighting
└── Difficulty badge

Day 7: Validation
├── Test with users
├── Collect feedback
└── Decision: Continue or pivot?
```

**Deliverable**: Extension that segments Chinese text and highlights unknowns

---

### **Phase 1: MVP** (6 Weeks)

**Goal**: Production-ready product for public beta

```
Week 1: Web App Foundation
├── Landing page
├── User signup/login
├── Onboarding (HSK level, interests)
└── Diagnostic test

Week 2: Extension ↔ Web App Sync
├── Login in extension
├── Fetch user mastery
├── Sync reading events
└── Update difficulty based on user

Week 3: Extension UI Polish
├── Sidebar (unknown words list)
├── Tooltips (definitions, pinyin)
├── "Mark as known" button
└── Styling and performance

Week 4: Article Discovery
├── Manual curation (20-30 articles)
├── Discovery feed in web app
├── Recommendation algorithm
└── Article analysis pipeline

Week 5: Dashboard & Progress
├── Words learned count
├── Reading history
├── Estimated HSK level
└── Export/delete data

Week 6: Testing & Launch Prep
├── Beta testing (10-15 users)
├── Bug fixes
├── Chrome Web Store listing
└── Documentation
```

**Deliverable**: Publicly available Chrome extension + web app

---

### **Phase 2: Growth** (5 Weeks)

**Goal**: Scale content, improve recommendations

```
Week 1-2: Automated Crawling
├── RSS feed integration
├── Daily cron job (10-20 articles/day)
├── Content quality filters
└── Moderation queue

Week 3: ML Recommendations
├── Article embeddings
├── Semantic similarity
└── A/B testing

Week 4: Traditional Chinese
├── OpenCC.js integration
├── Script toggle
└── Traditional article support

Week 5: User Content
├── "Submit URL" feature
├── Share with community
└── Popular articles section
```

**Deliverable**: Self-sustaining content pipeline, 500+ users

---

### **Phase 3: Advanced** (5 Weeks)

**Goal**: Retention features (SRS, social)

```
Week 1-2: Spaced Repetition
├── ts-fsrs integration
├── Review queue
├── Flashcard UI
└── Daily reminders

Week 3: Better Segmentation
├── Idiom database expansion
├── User corrections
└── Crowdsourced improvements

Week 4: Study Groups
├── Create/join groups
├── Shared reading lists
└── Group leaderboards

Week 5: TTS
├── Web Speech API
├── Per-word audio
└── Voice settings
```

**Deliverable**: Full-featured platform with 1000+ active users

---

## 🎨 User Journey (MVP)

```
┌────────────────────────────────────────────────────────────┐
│ 1. DISCOVER                                                │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  User visits web app                                      │
│       ↓                                                   │
│  Signs up (email + password)                             │
│       ↓                                                   │
│  Onboarding:                                             │
│    • "What's your HSK level?" (1-6 or unknown)          │
│    • Quick diagnostic (10 words)                        │
│    • "What interests you?" (news, culture, tech...)     │
│       ↓                                                   │
│  Sees personalized feed:                                 │
│    ┌───────────────────────────────────────┐             │
│    │ 📰 中国经济新闻 (Economics)           │             │
│    │ 🟢 Just Right • 350 words • 人民日报 │                │
│    │ [Read Article] →                     │                │
│    └──────────────────────────────────────┘                 │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ 2. READ                                                    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Clicks "Read Article"                                    │
│       ↓                                                   │
│  Opens on original site (e.g., people.cn)                │
│       ↓                                                   │
│  Extension activates automatically                        │
│       ↓                                                   │
│  Article text segmented and analyzed:                     │
│    ┌──────────────────────────────────┐                 │
│    │ 中国 的 经济 在 去年 增长 了...   │                 │
│    │ ──── ── ──── ── ──── ──── ──     │                 │
│    │ (green = known, yellow = learning, red = unknown)  │
│    └──────────────────────────────────┘                 │
│       ↓                                                   │
│  Sidebar shows:                                          │
│    ┌───────────────────┐                                │
│    │ Difficulty: 92%   │                                │
│    │ Unknown Words:    │                                │
│    │ • 经济 (jīngjì)   │                                │
│    │ • 增长 (zēngzhǎng)│                                │
│    └───────────────────┘                                │
│       ↓                                                   │
│  User hovers over word → Tooltip:                        │
│    ┌────────────────────────┐                           │
│    │ 经济                    │                           │
│    │ jīngjì                 │                           │
│    │ economy; economic      │                           │
│    │ [Mark as Known]        │                           │
│    └────────────────────────┘                           │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ 3. TRACK PROGRESS                                          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Returns to web app                                       │
│       ↓                                                   │
│  Dashboard shows:                                         │
│    ┌───────────────────────────────┐                    │
│    │ 📊 This Week:                 │                    │
│    │ • 12 words learned            │                    │
│    │ • 5 articles read             │                    │
│    │ • 3-day streak! 🔥            │                    │
│    │                               │                    │
│    │ 📈 Estimated Level: HSK 3     │                    │
│    │                               │                    │
│    │ 📚 Reading History:           │                    │
│    │ • 中国经济新闻 (Oct 1)        │                    │
│    │ • 文化报道 (Sep 30)           │                    │
│    └───────────────────────────────┘                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🔧 Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                               │
│                                                             │
│  ┌──────────────┐              ┌───────────────┐          │
│  │   Web App    │              │   Extension   │          │
│  │              │              │               │          │
│  │ Vite         │              │ Manifest V3   │          │
│  │ React 18     │              │ React 18      │          │
│  │ TypeScript   │              │ jieba-wasm    │          │
│  │ Tailwind     │              │ Dexie.js      │          │
│  │ Shadcn/ui    │              │               │          │
│  └──────┬───────┘              └───────┬───────┘          │
│         │                              │                   │
│         └──────────────┬───────────────┘                   │
│                        │                                   │
│                        ▼                                   │
│         ┌──────────────────────────┐                      │
│         │   Supabase Client SDK    │                      │
│         └──────────────┬───────────┘                      │
└────────────────────────┼─────────────────────────────────┘
                         │
                         │ HTTPS + Auth
                         │
┌────────────────────────┼─────────────────────────────────┐
│                        ▼         BACKEND                  │
│         ┌──────────────────────────┐                      │
│         │       Supabase           │                      │
│         │  (Backend-as-a-Service)  │                      │
│         ├──────────────────────────┤                      │
│         │ • PostgreSQL (database)  │                      │
│         │ • Auth (email/OAuth)     │                      │
│         │ • Storage (files)        │                      │
│         │ • Realtime (websockets)  │                      │
│         │ • Edge Functions (APIs)  │                      │
│         └──────────────────────────┘                      │
│                                                             │
│  ┌──────────────────────────────────────┐                │
│  │ Database Tables:                     │                │
│  │ • profiles (user info)               │                │
│  │ • user_mastery (word knowledge)      │                │
│  │ • articles (curated content)         │                │
│  │ • dictionary (CC-CEDICT)             │                │
│  │ • reading_history (tracking)         │                │
│  └──────────────────────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 What's in the Monorepo

```
reading-companion/
├── apps/
│   ├── web/              ← Web app (Vite + React)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── Landing.tsx
│   │   │   │   ├── Onboarding.tsx
│   │   │   │   ├── Discovery.tsx
│   │   │   │   └── Dashboard.tsx
│   │   │   ├── components/
│   │   │   └── lib/
│   │   └── package.json
│   │
│   └── extension/        ← Browser extension
│       ├── src/
│       │   ├── content-script.tsx  (injected into pages)
│       │   ├── popup.tsx           (extension popup)
│       │   ├── sidebar.tsx         (vocab sidebar)
│       │   └── tooltip.tsx         (definition tooltip)
│       ├── manifest.json
│       └── package.json
│
├── packages/
│   ├── shared/           ← Shared TypeScript types
│   │   └── src/
│   │       ├── types.ts  (DictEntry, Token, etc.)
│   │       └── constants.ts
│   │
│   ├── nlp/              ← Segmentation & difficulty
│   │   └── src/
│   │       ├── tokenizer.ts     (jieba wrapper)
│   │       ├── difficulty.ts    (scoring logic)
│   │       └── index.ts
│   │
│   └── ui/               ← Shared React components
│       └── src/
│           ├── Button.tsx
│           ├── Card.tsx
│           └── Badge.tsx
│
├── data/
│   ├── raw/              ← CC-CEDICT source files
│   └── scripts/          ← Data processing scripts
│       └── parse-cedict.ts
│
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

---

## 💡 Key Decisions Explained

### Why Vite instead of Next.js?
- Simpler for single-page app
- Faster builds (10x faster than Webpack)
- No server-side rendering needed
- Easier to learn

### Why Supabase instead of local-only?
- Multi-device ready (even if not used immediately)
- Data safety (browser storage can be cleared)
- Enables recommendations (need backend to analyze articles)
- Free tier supports 1000+ users
- Built-in auth (don't reinvent auth)

### Why jieba instead of custom tokenizer?
- Battle-tested (10+ years, millions of users)
- Proven accuracy (>95% correct segmentation)
- Saves 2-3 weeks of development
- Active maintenance (bug fixes, improvements)
- Can always build custom layer on top if needed

### Why monorepo?
- Share code between web app and extension
- Single source of truth for types
- Unified tooling (one ESLint, one Prettier)
- Atomic commits (change type, update both apps)

---

## ✅ Success Metrics

### Phase 0 (POC) Success:
- [ ] Extension loads on Chinese websites
- [ ] Segmentation accuracy >90%
- [ ] 2 out of 3 test users say "I would use this"

### Phase 1 (MVP) Success:
- [ ] 100 registered users
- [ ] 30% retention (users return in Week 2)
- [ ] 3+ articles read per user per week
- [ ] 80%+ users rate difficulty as "accurate"

### Phase 2 (Growth) Success:
- [ ] 500 registered users
- [ ] 500+ articles in database
- [ ] Recommendation CTR >40%

### Phase 3 (Advanced) Success:
- [ ] 1000 registered users
- [ ] 100+ active SRS users
- [ ] 20+ study groups

---

**Ready to build? Start with [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)!**
