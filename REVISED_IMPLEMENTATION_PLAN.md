# Revised Implementation Plan — Chinese Reading Companion

**Last Updated**: 2025-10-01
**Based on**: Product vision clarification
**Estimated Total Duration**: 10-12 weeks to MVP

---

## System Overview

**Two-Component Architecture**:
1. **Web App** (Discovery Platform): Curate articles, recommend content, track progress
2. **Browser Extension** (Reading Assistant): Highlight words, show sidebar, sync data

---

## Phase 0: Foundation & Proof of Concept (1 week)

**Goal**: Validate core technical approach with minimal working prototype

### P0.1: Project Setup (Day 1)
- [ ] Initialize monorepo with Turborepo + pnpm
- [ ] Create workspace packages:
  - `apps/web` - Vite + React + TypeScript
  - `apps/extension` - Manifest V3 extension
  - `packages/shared` - Shared TypeScript types
  - `packages/nlp` - Segmentation and difficulty logic
- [ ] Configure ESLint, Prettier, TypeScript (strict mode)
- [ ] Set up Vitest for testing
- [ ] Initialize Git repository

**Deliverable**: Monorepo structure with basic build pipeline

---

### P0.2: Supabase Setup (Day 1-2)
- [ ] Create Supabase project
- [ ] Set up authentication (email/password)
- [ ] Create initial database schema:
  - `profiles` table
  - `user_mastery` table
  - `articles` table (empty for now)
  - `dictionary` table structure (don't populate yet)
- [ ] Configure Row Level Security (RLS) policies
- [ ] Test auth flow with basic React login page

**Deliverable**: Working Supabase backend with auth

---

### P0.3: Dictionary Data Preparation (Day 2-3)
- [ ] Download CC-CEDICT source
- [ ] Write parser to convert to JSON
- [ ] Extract frequency data (SUBTLEX-CH or alternative)
- [ ] Merge frequency ranks into dictionary entries
- [ ] Create database seed script for Supabase
- [ ] Populate Supabase `dictionary` table (~115k entries)
- [ ] Test dictionary queries (by simplified, by ID)
- [ ] Add proper CC-CEDICT attribution to codebase

**Deliverable**: Full dictionary in Supabase, queryable

---

### P0.4: Jieba Integration (Day 3-4)
- [ ] Install jieba-wasm in `packages/nlp`
- [ ] Create wrapper functions for segmentation
- [ ] Load dictionary in jieba
- [ ] Test segmentation on sample Chinese texts
- [ ] Benchmark performance (target: <30ms per 1k chars)
- [ ] Write unit tests for segmentation edge cases
- [ ] Create `Token` type and output format

**Deliverable**: Working Chinese segmentation library

---

### P0.5: Basic Extension Prototype (Day 4-6)
- [ ] Set up Manifest V3 extension structure
- [ ] Create content script that injects on page load
- [ ] Implement text extraction from DOM (visible text only)
- [ ] Integrate jieba-wasm in content script
- [ ] Highlight Chinese words with colored underlines (random colors for now)
- [ ] Create simple sidebar that lists all segmented words
- [ ] Test on a real Chinese news site (e.g., people.cn)
- [ ] Package extension and load in Chrome/Firefox

**Deliverable**: Working browser extension that segments and highlights Chinese text

---

### P0.6: Difficulty Scoring POC (Day 6-7)
- [ ] Implement difficulty calculation (coverage, unknown density, frequency)
- [ ] Mock user mastery (e.g., assume user knows HSK 1-3)
- [ ] Calculate difficulty for sample articles
- [ ] Display difficulty badge in extension sidebar
- [ ] Test with articles of varying difficulty levels
- [ ] Validate that "sweet spot" detection works

**Deliverable**: Difficulty scoring working in extension

---

### P0.7: Integration Testing (Day 7)
- [ ] End-to-end test: Open article → extension activates → shows sidebar with difficulty
- [ ] Test on 5+ different Chinese websites
- [ ] Verify performance (page load impact <500ms)
- [ ] Document any issues or limitations found
- [ ] Demo to 1-2 test users for feedback

**Deliverable**: **Phase 0 Complete** - Working POC demonstrating core value

---

## Phase 1: MVP - Core Features (5-6 weeks)

**Goal**: Production-ready extension + web app with user accounts, mastery tracking, and basic article discovery

### P1.1: Web App Foundation (Week 1)
- [ ] Build landing page (value prop, screenshots, CTA)
- [ ] Implement Supabase auth UI (signup, login, logout)
- [ ] Create user onboarding flow:
  - Welcome screen
  - Select HSK level (1-6) or "I don't know"
  - Select interests (news, culture, tech, business, lifestyle)
  - Quick diagnostic (10 words, mark known/unknown) → estimate mastery
- [ ] Initialize user profile in Supabase
- [ ] Seed initial mastery data based on diagnostic
- [ ] Build basic dashboard (progress placeholder)

**Deliverable**: Functional web app with user onboarding

---

### P1.2: Extension ↔ Web App Sync (Week 1-2)
- [ ] Add Supabase auth to extension (popup login)
- [ ] Fetch user mastery from Supabase on extension load
- [ ] Cache mastery in Dexie.js (IndexedDB)
- [ ] Update difficulty calculation to use real user mastery
- [ ] Highlight only unknown words (mastery < 0.5) in extension
- [ ] Send reading events back to Supabase:
  - Page URL, words encountered, time spent
- [ ] Update user mastery on word exposure (increment count, update timestamp)
- [ ] Test sync: Change mastery in web app → see in extension

**Deliverable**: Extension synced with user account

---

### P1.3: Enhanced Extension UI (Week 2)
- [ ] Build proper sidebar React component
  - Header with difficulty badge
  - "Unknown words" section (pre-read vocabulary)
  - Collapsible/expandable
- [ ] Style word highlights (subtle underline, color by difficulty)
- [ ] Implement tooltip on hover/click:
  - Pinyin
  - Definitions (from CC-CEDICT)
  - "Mark as known" button
- [ ] Add keyboard shortcuts (Esc to close tooltip)
- [ ] Optimize sidebar render performance (<150ms)
- [ ] Test on mobile browsers (Chrome Android)

**Deliverable**: Polished extension UX

---

### P1.4: Article Discovery - Manual Curation (Week 2-3)
- [ ] Create admin interface in web app (simple form)
- [ ] Manually add 20-30 articles:
  - Title, URL, source
  - Manually assign HSK level range (e.g., "HSK 2-3")
  - Manually assign topics
- [ ] Build article discovery feed in web app:
  - List articles filtered by user's HSK level
  - Show title, source, estimated difficulty
  - "Read" button → opens URL in new tab
- [ ] Track which articles user has read (reading_history table)
- [ ] Simple recommendation: Show unread articles near user's level

**Deliverable**: 20-30 curated articles, discoverable in web app

---

### P1.5: Automated Article Analysis (Week 3-4)
- [ ] Build article crawler service (Node.js + TypeScript):
  - Fetch URL via Puppeteer/Playwright
  - Extract text with Mozilla Readability
  - Segment with jieba
  - Calculate difficulty metrics
  - Extract keywords/topics (simple TF-IDF or keyword extraction)
  - Store in Supabase `articles` table
- [ ] Create API endpoint (Supabase Edge Function or REST API):
  - Input: URL
  - Output: Analyzed article metadata
- [ ] Add "Analyze URL" feature in web app:
  - User pastes URL
  - System analyzes and saves to database
  - Shows difficulty and adds to feed
- [ ] Test with 10+ URLs from different sources

**Deliverable**: Automated article analysis pipeline

---

### P1.6: Improved Recommendations (Week 4)
- [ ] Implement "sweet spot" algorithm:
  - Target coverage: 90-95% known words
  - Filter articles by user's mastery distribution
- [ ] Add interest-based filtering:
  - Match article topics to user's selected interests
- [ ] Diversify sources (don't show all from one site)
- [ ] Add freshness boost (recent articles score higher)
- [ ] Test with 50+ analyzed articles in database
- [ ] Validate recommendations with 3-5 test users

**Deliverable**: Personalized article recommendations

---

### P1.7: User Dashboard & Progress (Week 4-5)
- [ ] Build progress dashboard in web app:
  - Total words learned (mastery > 0.7)
  - Articles read (count, time spent)
  - Estimated HSK level (based on mastery)
  - Learning streak (days with reading activity)
- [ ] Show reading history (list of articles read, dates)
- [ ] "Words I'm learning" list (mastery 0.3-0.7)
- [ ] "Words I know" list (mastery > 0.7)
- [ ] Export data (JSON download of all user data)
- [ ] Delete account (GDPR compliance)

**Deliverable**: User progress tracking and privacy controls

---

### P1.8: Polish & Accessibility (Week 5)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support
- [ ] Improve Chinese font rendering (font stack)
- [ ] Accessibility audit (WCAG AA compliance):
  - Keyboard navigation
  - Screen reader support
  - Color contrast
- [ ] Add loading states and error handling
- [ ] Performance optimization (Lighthouse score >90)
- [ ] Cross-browser testing (Chrome, Firefox, Edge, Safari)

**Deliverable**: Production-quality UI/UX

---

### P1.9: MVP Testing & Bug Fixes (Week 5-6)
- [ ] Recruit 10-15 beta testers (Chinese learners)
- [ ] End-to-end testing of full user journey:
  - Signup → onboarding → browse articles → read with extension → check progress
- [ ] Collect feedback on usability, bugs, feature requests
- [ ] Fix critical bugs
- [ ] Performance profiling and optimization
- [ ] Write user documentation (FAQ, how-to guides)
- [ ] Prepare Chrome Web Store listing (screenshots, description)

**Deliverable**: **MVP Complete** - Ready for public beta

---

## Phase 2: Growth & Enhancement (4-5 weeks)

**Goal**: Scale content library, improve recommendations, add community features

### P2.1: Automated Content Crawling - Dual Strategy (Week 1-2)

**Approach**: Deploy BOTH crawlers simultaneously to maximize content acquisition and A/B test which works best.

#### GitHub Actions Crawler
- [ ] Create Node.js crawler script in `.github/workflows/`
- [ ] Set up daily cron schedule (runs at midnight)
- [ ] Configure to crawl 10-15 sources from `updated-chinese-websites.md`
- [ ] Extract text with Mozilla Readability
- [ ] Analyze with jieba-wasm
- [ ] Store results to Supabase via API
- [ ] Target: 10-15 articles/day

#### Supabase Edge Function Crawler
- [ ] Create Deno-based crawler in Supabase Edge Functions
- [ ] Set up daily cron trigger (runs at noon, offset from GitHub Actions)
- [ ] Configure to crawl different 10-15 sources from `updated-chinese-websites.md`
- [ ] Extract and analyze articles
- [ ] Store directly to Supabase database
- [ ] Target: 10-15 articles/day

#### Shared Infrastructure
- [ ] Content quality filters (min 200 characters, Chinese language detection)
- [ ] Duplicate detection (don't re-crawl same URL)
- [ ] Error handling and logging
- [ ] Moderation queue for manual review
- [ ] Performance monitoring dashboard

#### A/B Testing & Optimization (Week 2)
- [ ] Compare success rates (GitHub Actions vs Supabase)
- [ ] Measure latency and reliability
- [ ] Track article quality scores
- [ ] Decide: Keep both, choose one, or optimize hybrid
- [ ] Test with 1 month of automated crawling (400-600 articles total)

**Deliverable**: Self-sustaining content pipeline with 20-30 articles/day from dual crawlers

---

### P2.2: Enhanced Recommendations with Embeddings (Week 2-3)
- [ ] Generate article embeddings (OpenAI or open-source model)
- [ ] Store embeddings in Supabase (pgvector extension)
- [ ] Implement semantic similarity search
- [ ] Combine embedding similarity with difficulty + interest scoring
- [ ] A/B test new recommendations vs. old algorithm
- [ ] Improve based on user click-through rates

**Deliverable**: ML-powered recommendations

---

### P2.3: User-Submitted Content (Week 3)
- [ ] Add "Submit URL" feature in web app
- [ ] User submits article URL → auto-analyze → add to their library
- [ ] Optionally share with community (public vs. private)
- [ ] Implement voting/likes on shared articles
- [ ] Show "Popular with learners at your level" section

**Deliverable**: Community content sharing

---

### P2.4: Traditional Chinese Support (Week 4)
- [ ] Integrate OpenCC.js in extension
- [ ] Add Traditional/Simplified toggle in settings
- [ ] Convert text to Simplified for processing (if Traditional)
- [ ] Display in user's preferred script
- [ ] Update dictionary with Traditional variants
- [ ] Test with Traditional Chinese articles

**Deliverable**: Full Traditional Chinese support

---

### P2.5: Mobile Browser Extension (Week 4-5)
- [ ] Test extension on Firefox for Android
- [ ] Optimize UI for mobile (larger touch targets, sidebar width)
- [ ] Add mobile-specific gestures (swipe to close sidebar)
- [ ] Test on iOS (limited extension support, may need workaround)

**Deliverable**: Mobile-friendly extension

---

## Phase 3: Advanced Features (4-5 weeks)

**Goal**: Spaced repetition, enhanced segmentation, social features

### P3.1: Spaced Repetition System (Week 1-2)
- [ ] Integrate ts-fsrs library for SRS algorithm
- [ ] Create review queue (due words based on schedule)
- [ ] Build flashcard review UI:
  - Show word, user recalls definition
  - Grade difficulty (easy/good/hard/again)
  - Update schedule
- [ ] Add daily review reminder
- [ ] Track SRS adherence metrics
- [ ] Test with 50+ words over 2 weeks

**Deliverable**: Active vocabulary review system

---

### P3.2: Advanced Segmentation (Week 2-3)
- [ ] Expand chengyu/idiom database (5000+ entries)
- [ ] Add named entity recognition (NER) for proper nouns
- [ ] Implement user feedback on segmentation:
  - "Split this word" / "Merge these words"
  - Crowdsource improvements
- [ ] Store user corrections, apply to future segmentations
- [ ] Measure segmentation accuracy improvement

**Deliverable**: Improved segmentation accuracy

---

### P3.3: Study Circles (Week 3-4)
- [ ] Create study group feature:
  - User creates group, invites friends (email or link)
  - Shared reading list
  - Group leaderboard (words learned, articles read)
- [ ] Group chat (simple text chat)
- [ ] Shared milestones ("We collectively read 100 articles!")

**Deliverable**: Social study groups

---

### P3.4: Text-to-Speech (Week 4-5)
- [ ] Integrate Web Speech API for Chinese TTS
- [ ] Add audio playback button in tooltip (per word)
- [ ] Add sentence-level playback
- [ ] Voice settings (speed, voice selection)
- [ ] Test cross-browser compatibility
- [ ] Fallback for browsers without TTS support

**Deliverable**: Audio pronunciation support

---

## Success Criteria

### Phase 0 Success:
- ✅ Extension segments Chinese text accurately (>90% correct words)
- ✅ Difficulty calculation shows meaningful differences across articles
- ✅ Extension loads in <500ms on test pages
- ✅ 2+ test users say "I would use this"

### MVP (Phase 1) Success:
- ✅ 50+ articles in discovery feed
- ✅ 100+ registered users
- ✅ 30% of users return in Week 2 (retention)
- ✅ Average 3+ articles read per user per week
- ✅ Extension works on 20+ major Chinese websites
- ✅ User-reported difficulty matches calculated difficulty 80%+ of time

### Phase 2 Success:
- ✅ 500+ articles in database (via automated crawling)
- ✅ 500+ registered users
- ✅ 50+ user-submitted articles
- ✅ Recommendation CTR improves by 20% with embeddings

### Phase 3 Success:
- ✅ 1000+ registered users
- ✅ 100+ active SRS users (using review feature weekly)
- ✅ 20+ active study groups
- ✅ Segmentation accuracy >95%

---

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Jieba segmentation inaccurate | Medium | High | Have fallback to custom segmenter, collect user feedback |
| Article crawler blocked by sites | High | Medium | Rotate user agents, respect robots.txt, have manual curation fallback |
| Extension breaks on some sites | High | Low | Test on diverse sites, add site-specific fixes |
| Users don't find articles interesting | Medium | High | Diversify sources, add more interest categories, user submissions |
| Supabase free tier limit exceeded | Low | Medium | Monitor usage, have paid plan budget ($25/month) |
| Dictionary license compliance issue | Low | High | Review CC-BY-SA requirements, consult lawyer before launch |

---

## Timeline Summary

| Phase | Duration | End Date (from 2025-10-01) |
|-------|----------|----------------------------|
| Phase 0 (POC) | 1 week | 2025-10-08 |
| Phase 1 (MVP) | 6 weeks | 2025-11-19 |
| Phase 2 (Growth) | 5 weeks | 2025-12-24 |
| Phase 3 (Advanced) | 5 weeks | 2025-01-28 |
| **Total** | **17 weeks** | **~4 months** |

---

## Immediate Next Steps (Day 1)

1. Initialize monorepo with Turborepo
2. Create Supabase account and project
3. Set up initial workspace packages
4. Download CC-CEDICT dataset
5. Install jieba-wasm and test basic segmentation

**Ready to start Phase 0!**
