# Changelog

All notable changes to the Chinese Reading Companion project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Phase 0 - Foundation & POC (In Progress)

**Started**: 2025-10-01
**Goal**: Build proof-of-concept browser extension with core functionality

---

## [0.1.0] - 2025-10-01 - Planning Complete

### Added
- Complete project planning documentation
  - [START_HERE.md](START_HERE.md) - Entry point and navigation
  - [APPROVAL_SUMMARY.md](APPROVAL_SUMMARY.md) - Final decisions and cost breakdown
  - [REVISED_IMPLEMENTATION_PLAN.md](REVISED_IMPLEMENTATION_PLAN.md) - 17-week detailed plan
  - [REVISED_TECH_STACK.md](REVISED_TECH_STACK.md) - Technology stack and decisions
  - [VISUAL_ROADMAP.md](VISUAL_ROADMAP.md) - Timeline diagrams and user journey
  - [SEO_STRATEGY.md](SEO_STRATEGY.md) - SEO and discoverability strategy
  - [COMPARISON_AND_RECOMMENDATIONS.md](COMPARISON_AND_RECOMMENDATIONS.md) - Analysis of approaches
  - [QUICK_START_GUIDE.md](QUICK_START_GUIDE.md) - Day 1 setup walkthrough
  - [CLAUDE.md](CLAUDE.md) - AI development guidelines
  - [current_task.md](current_task.md) - Active task tracking
  - [changelog.md](changelog.md) - This file

- Reference documentation
  - [PRD.md](PRD.md) - Original product requirements (context)
  - [Tech_Spec.md](Tech_Spec.md) - Original technical spec (context)
  - [Legal_Compliance_Checklist.md](Legal_Compliance_Checklist.md) - Legal guidelines
  - [Roadmap.md](Roadmap.md) - Original roadmap (context)
  - [updated-chinese-websites.md](updated-chinese-websites.md) - 20+ article sources

- Git & GitHub setup
  - [GIT_SETUP_SUMMARY.md](GIT_SETUP_SUMMARY.md) - Version control documentation
  - `.gitignore` - Comprehensive exclusions
  - Repository: https://github.com/BentWorks/chinese-reading-companion

### Changed
- Cost structure: $5 one-time (Chrome Web Store) + $0/month (free tiers)
- Crawler strategy: Dual approach (GitHub Actions + Supabase Edge Functions)
- Highlighting UX: Only unknown words (not known/learning/unknown colors)
- SEO approach: Vite + Astro hybrid (marketing pages SEO-optimized)

### Removed
- Contractor skeleton code (archived then deleted)
- Superseded planning documents (old tech stack, implementation plan)
- Fly.io crawler (replaced with free GitHub Actions + Supabase)

### Decisions
- **Framework**: Vite + React (not Next.js) - simpler for SPA
- **Backend**: Supabase (PostgreSQL + Auth + Storage) - free tier
- **Segmentation**: jieba-wasm - proven library, not custom tokenizer
- **Crawler**: Dual free strategy - GitHub Actions + Supabase Edge Functions
- **Domain**: Vercel subdomain for MVP - custom domain later
- **Design**: Shadcn/ui components - high-quality, accessible
- **SEO**: Vite + Astro hybrid - discoverable on Google
- **Highlighting**: Only unknowns - cleaner UX, adaptive learning

### UX Improvements
- **Smart highlighting**: Only highlight unknown words (mastery < 0.5)
- **Adaptive learning**: Reduce mastery if user looks up "known" word
- **Clean reading**: 90%+ of text unhighlighted (natural flow)
- **User-initiated help**: Click any word for definition

---

## Planning Milestones

### 2025-10-01
- ✅ Project vision clarified with owner
- ✅ All questions answered (cost, crawler, SEO, tech stack)
- ✅ Plan approved and finalized
- ✅ Git repository initialized and pushed to GitHub
- ✅ Project structure cleaned (removed confusing artifacts)
- ✅ Phase 0 ready to begin

---

## Upcoming (Phase 0 - Week 1)

### P0.1: Project Setup
- Initialize Turborepo monorepo
- Set up TypeScript, ESLint, Prettier
- Configure Supabase project

### P0.2: Dictionary Data
- Download and parse CC-CEDICT
- Seed Supabase database
- Verify dictionary queries

### P0.3: Jieba Integration
- Install jieba-wasm
- Create segmentation wrapper
- Benchmark performance

### P0.4: Extension Prototype
- Manifest V3 setup
- Content script injection
- Smart highlighting (unknowns only)
- Basic sidebar

### P0.5: Difficulty Scoring
- Calculate coverage, frequency, idiom density
- Display difficulty badge
- Test with mock user data

### P0.6: Testing & Validation
- Test on 5+ websites
- User testing (2-3 learners)
- Decision: Continue or pivot

**Expected Deliverable**: Working POC extension by 2025-10-08

---

## Version History

### [0.1.0] - 2025-10-01
- Planning phase complete
- Repository initialized
- Ready for development

---

## Changelog Maintenance

This changelog will be updated:
- **Daily** during active development with completed tasks
- **At phase completion** with summary of deliverables
- **On releases** with version numbers and deployment dates

Categories:
- **Added**: New features or files
- **Changed**: Changes to existing functionality
- **Deprecated**: Features that will be removed in future versions
- **Removed**: Removed features or files
- **Fixed**: Bug fixes
- **Security**: Security-related changes
- **UX**: User experience improvements
- **Decisions**: Technical or product decisions

---

**Last Updated**: 2025-10-01 by Claude (AI Assistant)
**Next Update**: End of Day 1 (P0.1 completion)
