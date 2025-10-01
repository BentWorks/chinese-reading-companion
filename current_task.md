# Current Task

**Last Updated**: 2025-10-01
**Current Phase**: Phase 0 - Foundation & Proof of Concept
**Status**: ✅ APPROVED - Beginning Development

---

## 🎯 Active Task

**Task ID**: P0.1 - Project Setup & Infrastructure
**Started**: 2025-10-01
**Estimated Completion**: 2025-10-02 (Day 1-2)
**Status**: Ready to begin

### Description
Initialize the monorepo structure, set up development tools, and prepare the foundation for building the Chinese Reading Companion.

### Tasks to Complete

#### Step 1: Install Prerequisites (30 minutes)
- [ ] Install Node.js 20+ (if not already installed)
- [ ] Install pnpm globally (`npm install -g pnpm`)
- [ ] Verify git is installed
- [ ] Install VS Code extensions (ESLint, Prettier, TypeScript)

#### Step 2: Initialize Monorepo (30 minutes)
- [ ] Follow [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) Step 1
- [ ] Create Turborepo structure
- [ ] Set up workspace packages (apps/web, apps/extension, packages/*)
- [ ] Configure TypeScript and ESLint

#### Step 3: Supabase Setup (30 minutes)
- [ ] Create Supabase account
- [ ] Create new project (`chinese-reading-dev`)
- [ ] Save credentials to `.env` file
- [ ] Run database schema SQL

#### Step 4: Verify Setup (15 minutes)
- [ ] Run `pnpm install` successfully
- [ ] Verify all packages installed
- [ ] Test basic dev server starts
- [ ] Commit initial monorepo setup

---

## 📋 Upcoming Tasks (This Week)

### P0.2: Dictionary Data Preparation (Day 2-3)
- Download CC-CEDICT
- Parse to JSON format
- Seed Supabase database
- Verify dictionary queries work

### P0.3: Jieba Integration (Day 3-4)
- Install jieba-wasm in packages/nlp
- Create segmentation wrapper
- Test on sample Chinese texts
- Benchmark performance

### P0.4: Basic Extension Prototype (Day 4-6)
- Set up Manifest V3 extension
- Inject content script
- Integrate jieba for segmentation
- **Implement smart highlighting** (only unknowns, not known words)
- Create simple sidebar

### P0.5: Difficulty Scoring POC (Day 6-7)
- Calculate difficulty metrics
- Mock user mastery for testing
- Display difficulty badge
- Test with various articles

### P0.6: Testing & Validation (Day 7)
- Test on 5+ Chinese websites
- Demo to 2-3 test users
- Collect feedback
- **Decision**: Continue to MVP or pivot

---

## 🎨 UX Decisions (Finalized)

### Highlighting Strategy (YOUR IMPROVED APPROACH)
**Only highlight unknown words**:
- ✅ No highlighting for known words (mastery ≥ 0.5)
- ✅ Subtle underline/background for unknown words (mastery < 0.5)
- ✅ User can click ANY word to see definition
- ✅ **Adaptive learning**: If user looks up a "known" word, decrease mastery
  - Example: User clicks word with mastery 0.7 → reduce to 0.6
  - Signals: "User still struggles with this"

**Color Scheme** (simple):
- Unknown words: Subtle blue/purple underline (not red - less intimidating)
- Tooltip: Clean white card with shadow
- Sidebar: Grouped by frequency/HSK level

**Benefits**:
- 🎯 Less visual clutter (90%+ of text unhighlighted)
- 👁️ Easier to focus on reading
- 🧠 Natural reading flow
- 📊 Adaptive learning from user behavior

---

## 🗂️ Project Structure (Current)

```
LanguageLearningModel/
├── README.md                              📖 Project overview
├── START_HERE.md                          ⭐ Entry point
├── APPROVAL_SUMMARY.md                    ✅ Final decisions
├── current_task.md                        📋 This file
├── QUICK_START_GUIDE.md                   🎬 Day 1 setup guide
├── REVISED_IMPLEMENTATION_PLAN.md         📅 17-week plan
├── REVISED_TECH_STACK.md                  🛠️ Tech choices
├── SEO_STRATEGY.md                        🔍 SEO plan
├── updated-chinese-websites.md            📰 Article sources
├── .gitignore                             🚫 Git exclusions
└── (monorepo structure will be created)
```

**After setup (Day 1)**:
```
chinese-reading-companion/                 (New monorepo root)
├── apps/
│   ├── web/                               (Vite + React web app)
│   └── extension/                         (Browser extension)
├── packages/
│   ├── shared/                            (Shared types)
│   ├── nlp/                               (Jieba + difficulty)
│   └── ui/                                (Shared components)
├── turbo.json                             (Turborepo config)
└── package.json                           (Root package.json)
```

---

## 🚧 Blocked Items
None currently

---

## 📝 Notes & Decisions

**Today's Decisions**:
1. ✅ **Highlighting**: Only unknown words (user's improved approach)
2. ✅ **Adaptive learning**: Reduce mastery if user looks up "known" word
3. ✅ **Color scheme**: Subtle blue/purple (not red/yellow/green clutter)

**Key Principles**:
- Keep reading experience clean and natural
- Only draw attention to what matters (unknowns)
- Learn from user behavior (adaptive mastery)
- Trust user to ask when they need help

---

## 💬 Questions / Issues

**Questions for user**:
1. Highlight color preference? (Suggest: soft blue `#3b82f6` or purple `#8b5cf6`)
2. Underline vs background highlight? (Suggest: dotted underline - less intrusive)
3. Any specific Chinese websites you want to test on first?

---

## 🎯 Success Criteria (Phase 0)

By end of Week 1, we should have:
- ✅ Extension segments Chinese text accurately (>90% correct)
- ✅ Highlights ONLY unknown words (clean UX)
- ✅ User can click any word for definition
- ✅ Adaptive mastery updates on lookup
- ✅ Difficulty badge shows article rating
- ✅ Works on 5+ major Chinese websites
- ✅ 2+ test users say "I would use this"

---

## 🚀 Next Steps

**Right now**:
1. Read [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)
2. Install prerequisites (Node.js, pnpm)
3. Follow Step 1: Initialize Monorepo
4. Let me know when you're ready for Supabase setup

**I'll guide you through each step!**

---

**Status**: Phase 0 officially started! Let's build this! 🎉
