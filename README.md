# Chinese Reading Companion

**A browser extension and web app that helps Chinese learners find the perfect articles and read with confidence.**

---

## 🚀 Get Started

**New to this project?** Read **[START_HERE.md](START_HERE.md)** first.

**Ready to build?** Follow **[QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)**.

---

## 📚 Documentation

### Essential Reading
- **[START_HERE.md](START_HERE.md)** — Your entry point and navigation guide
- **[PROJECT_REVISION_SUMMARY.md](PROJECT_REVISION_SUMMARY.md)** — What we're building and why
- **[VISUAL_ROADMAP.md](VISUAL_ROADMAP.md)** — Timeline, diagrams, user journey

### Implementation Details
- **[REVISED_IMPLEMENTATION_PLAN.md](REVISED_IMPLEMENTATION_PLAN.md)** — 17-week detailed plan
- **[REVISED_TECH_STACK.md](REVISED_TECH_STACK.md)** — Technology choices and rationale
- **[COMPARISON_AND_RECOMMENDATIONS.md](COMPARISON_AND_RECOMMENDATIONS.md)** — Why this approach

### Original Context
- **[PRD.md](PRD.md)** — Product requirements (contractor)
- **[Tech_Spec.md](Tech_Spec.md)** — Technical architecture (contractor)
- **[Legal_Compliance_Checklist.md](Legal_Compliance_Checklist.md)** — Licensing and privacy
- **[Roadmap.md](Roadmap.md)** — Original timeline (contractor)

### For AI Assistants
- **[CLAUDE.md](CLAUDE.md)** — Development guidelines and architecture

---

## 🎯 What We're Building

**Problem**: Chinese learners struggle to find articles at the right difficulty level and need help with unknown words.

**Solution**:
1. **Web app** curates and recommends articles matched to user's level
2. **Browser extension** highlights unknowns and shows definitions while reading
3. **Progress tracking** shows words learned, reading streak, estimated HSK level

---

## 📅 Timeline

- **Phase 0** (1 week): Proof-of-concept extension
- **Phase 1** (5-6 weeks): MVP with discovery + extension
- **Total to MVP**: 6-7 weeks

---

## 🛠️ Tech Stack

- **Frontend**: Vite + React 18 + TypeScript 5
- **Backend**: Supabase (PostgreSQL + Auth)
- **Segmentation**: jieba-wasm
- **Extension**: Manifest V3 (Chrome/Firefox)
- **Dictionary**: CC-CEDICT (115k entries)

---

## 📁 Project Structure

```
LanguageLearningModel/
├── START_HERE.md                          ⭐ Start here!
├── README.md                              📖 This file
├── QUICK_START_GUIDE.md                   🎬 Day 1 setup
├── PROJECT_REVISION_SUMMARY.md            📋 Decision summary
├── VISUAL_ROADMAP.md                      👁️ Visual overview
├── REVISED_IMPLEMENTATION_PLAN.md         📅 Detailed plan (17 weeks)
├── REVISED_TECH_STACK.md                  🛠️ Tech stack & decisions
├── COMPARISON_AND_RECOMMENDATIONS.md      🔍 Original vs revised
├── SEO_STRATEGY.md                        🔍 SEO & discoverability
├── CLAUDE.md                              🤖 AI development guidelines
├── updated-chinese-websites.md            📰 Article sources (20+ sites)
├── GIT_SETUP_SUMMARY.md                   📦 Git & GitHub setup
├── CLEANUP_SUMMARY.md                     🗑️ Project cleanup log
├── PRD.md                                 📄 Original product requirements
├── Tech_Spec.md                           📄 Original technical spec
├── Legal_Compliance_Checklist.md         ⚖️ Legal & privacy guidelines
└── Roadmap.md                             📄 Original roadmap (reference)
```

---

## 📖 Quick Links

**Planning**:
- [What we're building](PROJECT_REVISION_SUMMARY.md#-what-were-building-revised-vision)
- [Timeline and phases](VISUAL_ROADMAP.md#-timeline-17-weeks-total)
- [User journey](VISUAL_ROADMAP.md#-user-journey-mvp)

**Technical**:
- [Architecture](REVISED_TECH_STACK.md#system-architecture)
- [Database schema](REVISED_TECH_STACK.md#backend--database)
- [Tech decisions](REVISED_TECH_STACK.md#decision-log)

**Getting Started**:
- [Prerequisites](QUICK_START_GUIDE.md#-prerequisites-install-these-first)
- [Day 1 setup](QUICK_START_GUIDE.md#-phase-0---day-1-setup-2-3-hours)
- [Supabase setup](QUICK_START_GUIDE.md#step-4-set-up-supabase-30-min)

---

## 💡 Key Principles

1. **Content discovery first** — Help learners find the right articles
2. **Read on real websites** — Drive traffic to original sources (ethical)
3. **Privacy-focused** — User data secured, export/delete controls
4. **Use proven libraries** — Don't reinvent wheels (jieba, Supabase)
5. **Fast to MVP** — Validate product-market fit in 6-7 weeks

---

## 📞 Status

**Current Phase**: Planning complete, awaiting approval to begin

**Next Step**: Read [START_HERE.md](START_HERE.md) and decide to approve, discuss, or modify

---

## 📜 License

TBD — Will align with CC-CEDICT (CC BY-SA 4.0) for dictionary data

---

**Built with ❤️ for Chinese language learners**
