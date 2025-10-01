# Implementation Plan — Chinese Reading Companion

**Last Updated**: 2025-09-30
**Status**: Phase 0 - Planning Complete, Ready to Begin

---

## Overview

This document provides a detailed, task-based implementation plan organized by development phases. Each phase builds incrementally toward a production-ready Chinese reading companion application.

**Estimated Total Duration**: 18-22 weeks across 4 phases

---

## Phase 0: Foundation & Spike (2-3 weeks)

**Goal**: Validate core technical approach, prepare datasets, establish development environment

### P0.1: Project Setup & Infrastructure (3-5 days)

- [ ] Initialize Next.js 14+ project with TypeScript, App Router
- [ ] Configure ESLint, Prettier, TypeScript strict mode
- [ ] Set up testing framework (Vitest + React Testing Library)
- [ ] Configure Tailwind CSS or chosen styling solution
- [ ] Set up Git repository with branch protection and commit conventions
- [ ] Create development environment documentation
- [ ] Configure Web Workers support and build optimization
- [ ] Set up IndexedDB testing utilities

**Dependencies**: None
**Deliverable**: Functioning Next.js app scaffold with CI/CD basics

---

### P0.2: Dataset Preparation (5-7 days)

- [ ] Download and validate CC-CEDICT source data
- [ ] Parse CC-CEDICT into structured JSON format (DictEntry schema)
- [ ] Research and acquire HSK word lists (HSK 1-6, optionally 7-9)
- [ ] Map HSK levels to dictionary entries (fuzzy matching for variants)
- [ ] Acquire Chinese word frequency data (SUBTLEX-CH or equivalent)
- [ ] Integrate frequency ranks into dictionary entries
- [ ] Create chengyu/idiom flags dataset (initial seed list)
- [ ] Validate all datasets against JSON schemas
- [ ] Create data build pipeline (scripts to regenerate datasets)
- [ ] Generate compact production JSON files (<5MB compressed)
- [ ] Add proper attribution metadata to all datasets
- [ ] Document data sources and licenses in attribution.html

**Dependencies**: P0.1
**Deliverable**: Validated, compact datasets ready for IndexedDB ingestion

---

### P0.3: Core Tokenizer Implementation (5-7 days)

- [ ] Implement trie builder from dictionary entries
- [ ] Create DAG edge construction with cost calculation
- [ ] Implement Viterbi shortest-path algorithm
- [ ] Add user-known word bonus integration
- [ ] Add chengyu/idiom bonus to cost function
- [ ] Implement OOV (out-of-vocabulary) penalty
- [ ] Create Web Worker wrapper for tokenizer
- [ ] Add incremental tokenization for long texts (chunking)
- [ ] Implement tokenizer performance benchmarks
- [ ] Test on sample texts (target: <30ms/1k chars desktop)
- [ ] Optimize trie memory usage
- [ ] Add tokenizer unit tests (edge cases, Unicode, punctuation)

**Dependencies**: P0.2 (requires dictionary data)
**Deliverable**: Production-ready tokenizer achieving performance targets

---

### P0.4: Difficulty Scorer & Basic UI (4-5 days)

- [ ] Implement coverage calculation
- [ ] Implement unknown density metric
- [ ] Implement frequency score calculation
- [ ] Implement idiom density metric
- [ ] Create difficulty label logic (too easy/just right/stretch/too hard)
- [ ] Generate human-readable explanations
- [ ] Build DifficultyBadge component with color coding
- [ ] Create minimal reader page accepting pasted text
- [ ] Display tokenized text with difficulty badge
- [ ] Add basic error handling and loading states
- [ ] Test with various difficulty levels

**Dependencies**: P0.3
**Deliverable**: Working proof-of-concept with paste-text analysis

---

### P0.5: IndexedDB Foundation (3-4 days)

- [ ] Set up idb library integration
- [ ] Create database schema with namespaces (dict, userModel, events, settings, cache)
- [ ] Implement dictionary data loader (bulk insert on first run)
- [ ] Create indexed queries for dictionary lookups (by simp, by id)
- [ ] Implement basic LemmaMastery storage/retrieval
- [ ] Add database versioning and migration logic
- [ ] Create data export functionality (JSON download)
- [ ] Create data deletion functionality (full reset)
- [ ] Add IndexedDB error handling and fallback
- [ ] Test database performance with full dictionary

**Dependencies**: P0.2
**Deliverable**: Robust local storage layer

---

### P0.6: Phase 0 Integration & Testing (2-3 days)

- [ ] Integrate tokenizer worker with UI
- [ ] Connect difficulty scorer to reader page
- [ ] Test end-to-end flow: paste text → tokenize → display difficulty
- [ ] Performance profiling and optimization
- [ ] Fix any critical bugs discovered in integration
- [ ] Document Phase 0 learnings and technical decisions
- [ ] Update CLAUDE.md with implementation notes

**Dependencies**: P0.3, P0.4, P0.5
**Deliverable**: Phase 0 spike complete, ready for demo

---

## Phase 1: MVP - Core Reading Experience (6-8 weeks)

**Goal**: Deliver complete MVP with reading analysis, SRS, and user mastery tracking

### P1.1: Advanced Text Input & Extraction (1 week)

- [ ] Implement URL paste with fetch and sanitization
- [ ] Integrate Readability.js or similar for article extraction
- [ ] Add DOM walker for extracting visible text from HTML
- [ ] Implement Unicode normalization (NFC/NFKC)
- [ ] Add punctuation and whitespace handling
- [ ] Create text preprocessing pipeline
- [ ] Support both pasted text and URL input modes
- [ ] Add input validation and error messages
- [ ] Test with variety of Chinese websites and formats

**Dependencies**: P0.6 complete
**Deliverable**: Robust text extraction from URLs and paste

---

### P1.2: Interactive Tooltip System (1 week)

- [ ] Create TooltipCard component with pinyin, definitions, HSK level
- [ ] Implement hover detection on tokenized spans
- [ ] Add click/tap support for mobile
- [ ] Position tooltip intelligently (avoid viewport overflow)
- [ ] Add keyboard navigation support (Tab, Escape)
- [ ] Implement "Add to SRS" button in tooltip
- [ ] Show mastery indicator in tooltip (known/unknown)
- [ ] Add pronunciation audio trigger (placeholder for Phase 3)
- [ ] Optimize tooltip render performance (<50ms target)
- [ ] Test accessibility (screen readers, keyboard-only)

**Dependencies**: P0.6
**Deliverable**: Fully interactive word lookup via tooltip

---

### P1.3: Sidebar - Unknowns Queue (1 week)

- [ ] Create Sidebar component with unknowns list
- [ ] Implement "unknown words" detection from current text
- [ ] Display unknowns with definitions and context sentence
- [ ] Add "batch add all to SRS" functionality
- [ ] Implement individual "add to SRS" per word
- [ ] Add filtering/sorting options (frequency, HSK level)
- [ ] Show estimated study time for unknown set
- [ ] Make sidebar collapsible/expandable
- [ ] Optimize sidebar render (<150ms target)
- [ ] Test with long texts (100+ unknowns)

**Dependencies**: P1.2
**Deliverable**: Working unknowns queue with SRS integration

---

### P1.4: HSK Meter & Coverage Display (3-5 days)

- [ ] Create HskMeter component showing level breakdown
- [ ] Calculate per-text HSK distribution (% HSK1, HSK2, etc.)
- [ ] Display coverage percentage prominently
- [ ] Show vocabulary composition chart/graph
- [ ] Add "recommended HSK level" suggestion
- [ ] Integrate with difficulty badge display
- [ ] Add visual indicators for target difficulty band (90-95%)
- [ ] Test with texts across HSK 1-6 range

**Dependencies**: P1.1
**Deliverable**: Clear HSK-aligned difficulty visualization

---

### P1.5: User Mastery Model (1-1.5 weeks)

- [ ] Implement LemmaMastery data structure with all fields
- [ ] Create mastery initialization (default 0.0 for new words)
- [ ] Implement mastery update logic on word interactions
- [ ] Track lookup events and increment exposure count
- [ ] Implement uncertainty decay over time
- [ ] Create mastery query functions (batch lookup by lemmaIds)
- [ ] Add mastery import/export with versioning
- [ ] Implement "mark as known" and "mark as unknown" actions
- [ ] Add mastery reset functionality (per word or global)
- [ ] Create mastery statistics dashboard (total known, by HSK level)

**Dependencies**: P0.5
**Deliverable**: Complete user knowledge tracking system

---

### P1.6: SRS Algorithm Implementation (1.5-2 weeks)

- [ ] Research and select SRS algorithm (FSRS or SM-2)
- [ ] Implement core SRS scheduling algorithm
- [ ] Create review queue logic (due items calculation)
- [ ] Implement easiness/stability calculations
- [ ] Add lapse handling (forgot word)
- [ ] Create review session state management
- [ ] Implement review history tracking (events table)
- [ ] Add SRS configuration (daily review limits, algorithm params)
- [ ] Test algorithm with simulated user data
- [ ] Document SRS behavior and parameters

**Dependencies**: P1.5
**Deliverable**: Working SRS scheduler

---

### P1.7: Review Quiz Interface (1 week)

- [ ] Create quiz UI with word presentation
- [ ] Implement multiple quiz modes (recognition, recall, production)
- [ ] Add answer grading (easy/good/hard/again buttons)
- [ ] Show correct answer and feedback
- [ ] Display progress during review session (X of Y cards)
- [ ] Add keyboard shortcuts for review (1-4 for ratings)
- [ ] Implement session completion summary
- [ ] Track review metrics (time per card, accuracy)
- [ ] Add "undo" functionality for last review
- [ ] Test review flow end-to-end

**Dependencies**: P1.6
**Deliverable**: Complete SRS review experience

---

### P1.8: User Onboarding & Placement (1 week)

- [ ] Create welcome/onboarding flow
- [ ] Implement user-declared HSK level selection
- [ ] Design quick diagnostic test (10-20 representative words)
- [ ] Score diagnostic and estimate mastery distribution
- [ ] Initialize user model with placement results
- [ ] Add "skip placement" option with manual level selection
- [ ] Create onboarding tutorial/walkthrough
- [ ] Add sample text recommendations for each level
- [ ] Implement one-time onboarding flag (don't repeat)
- [ ] Test placement accuracy with real learners

**Dependencies**: P1.5
**Deliverable**: Smooth new user experience with level calibration

---

### P1.9: Privacy & Data Controls (3-5 days)

- [ ] Create privacy settings page
- [ ] Implement full data export (all IndexedDB namespaces to JSON)
- [ ] Implement full data deletion with confirmation
- [ ] Add privacy policy page (local processing emphasis)
- [ ] Create attribution page with all data sources
- [ ] Add data storage usage display (MB used)
- [ ] Implement audit log for any outbound requests
- [ ] Add "no analytics" badge to UI
- [ ] Test export/import round-trip
- [ ] Ensure GDPR-friendly controls

**Dependencies**: P1.5
**Deliverable**: Complete privacy-by-default implementation

---

### P1.10: UI Polish & Accessibility (1 week)

- [ ] Implement responsive design (mobile, tablet, desktop)
- [ ] Add dark mode support
- [ ] Improve font rendering for Chinese text (font stack)
- [ ] Enhance color contrast for accessibility (WCAG AA)
- [ ] Add loading skeletons and states
- [ ] Implement error boundaries and error pages
- [ ] Add keyboard shortcuts documentation
- [ ] Test with screen readers (NVDA, VoiceOver)
- [ ] Add focus indicators and keyboard navigation polish
- [ ] Performance optimization pass (Lighthouse score >90)

**Dependencies**: All P1.x components
**Deliverable**: Production-quality UI/UX

---

### P1.11: MVP Integration & Testing (1 week)

- [ ] Full end-to-end testing of user journey
- [ ] Performance profiling and optimization
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile browser testing (iOS Safari, Chrome Android)
- [ ] Load testing with large texts (10k+ characters)
- [ ] Fix critical bugs from testing
- [ ] User acceptance testing with 3-5 beta testers
- [ ] Document known issues and future improvements
- [ ] Create user documentation/help guide
- [ ] Update all tracking documents

**Dependencies**: All P1.x complete
**Deliverable**: MVP ready for production release

---

## Phase 2: Enhanced Features (v0.9) (4-5 weeks)

**Goal**: Add Traditional Chinese, basic browser extension, content discovery

### P2.1: Traditional Chinese Support (1 week)

- [ ] Integrate OpenCC library (client-side conversion)
- [ ] Add Traditional/Simplified toggle in UI
- [ ] Convert text input to Simplified for processing
- [ ] Display results in user's preferred script
- [ ] Update dictionary with Traditional variants
- [ ] Test with Traditional-only texts
- [ ] Handle mixed Traditional/Simplified input

**Dependencies**: P1.11
**Deliverable**: Full Traditional Chinese support

---

### P2.2: Interest Tags & Filtering (1 week)

- [ ] Design interest taxonomy (news, culture, tech, etc.)
- [ ] Add interest tag UI to settings
- [ ] Create curated content links by interest + HSK level
- [ ] Implement simple content recommendations
- [ ] Add "save for later" reading list
- [ ] Test with diverse content sources

**Dependencies**: P1.11
**Deliverable**: Interest-based content discovery

---

### P2.3: Browser Extension (Basic) (2-3 weeks)

- [ ] Set up browser extension project structure
- [ ] Implement content script injection
- [ ] Create extension popup UI
- [ ] Add "analyze this page" functionality
- [ ] Implement overlay mode for third-party sites
- [ ] Add extension settings sync with web app
- [ ] Handle cross-origin restrictions
- [ ] Test on major Chinese news sites
- [ ] Package for Chrome Web Store and Firefox Add-ons
- [ ] Create extension documentation

**Dependencies**: P1.11
**Deliverable**: Browser extension for Chrome and Firefox

---

## Phase 3: Advanced Features (v1.0) (5-6 weeks)

**Goal**: Enhanced segmentation, TTS, optional cloud sync

### P3.1: Advanced Segmentation (2 weeks)

- [ ] Expand idiom/chengyu database (1000+ entries)
- [ ] Add NER (named entity recognition) for proper nouns
- [ ] Implement ONNX model for segmentation disambiguation
- [ ] Add user feedback for segmentation corrections
- [ ] Implement manual split/merge controls
- [ ] Create segmentation quality metrics
- [ ] Test on ambiguous cases

**Dependencies**: P1.11
**Deliverable**: Significantly improved segmentation accuracy

---

### P3.2: Text-to-Speech Integration (1-1.5 weeks)

- [ ] Implement browser Web Speech API baseline
- [ ] Add per-word audio playback in tooltip
- [ ] Add sentence-level audio playback
- [ ] Create audio controls (speed, voice selection)
- [ ] Test cross-browser TTS compatibility
- [ ] Add fallback for unsupported browsers
- [ ] (Optional) Integrate premium TTS API

**Dependencies**: P1.11
**Deliverable**: Audio pronunciation support

---

### P3.3: Encrypted Cloud Sync (2-3 weeks)

- [ ] Design sync architecture (end-to-end encryption)
- [ ] Set up authentication service (Firebase/Supabase/custom)
- [ ] Implement client-side encryption (Web Crypto API)
- [ ] Create sync conflict resolution
- [ ] Build sync settings UI
- [ ] Implement incremental sync (delta updates)
- [ ] Add sync status indicators
- [ ] Test sync across devices
- [ ] Document sync security model

**Dependencies**: P1.9
**Deliverable**: Optional cloud sync for user data

---

## Phase 4: Social Features (Beta) (6-8 weeks)

**Goal**: Community features, study groups, UGC content

### P4.1: Study Circles & Groups (2-3 weeks)

- [ ] Design study circle data model
- [ ] Implement circle creation and joining
- [ ] Add member management (invites, roles)
- [ ] Create shared reading lists
- [ ] Implement group progress tracking
- [ ] Add study circle chat/discussion
- [ ] Test with pilot study groups

**Dependencies**: P3.3 (requires auth)
**Deliverable**: Social study groups

---

### P4.2: Progress Sharing & Milestones (1-2 weeks)

- [ ] Create shareable progress cards
- [ ] Implement streak tracking
- [ ] Add achievement/badge system
- [ ] Build social feed for progress posts
- [ ] Add privacy controls for sharing
- [ ] Test social features

**Dependencies**: P4.1
**Deliverable**: Social motivation features

---

### P4.3: User-Generated Content Platform (2-3 weeks)

- [ ] Design UGC submission workflow
- [ ] Implement content licensing options (CC licenses)
- [ ] Add content moderation queue
- [ ] Create reporting system for inappropriate content
- [ ] Build content discovery/search
- [ ] Test with community beta testers

**Dependencies**: P4.1
**Deliverable**: Community content platform

---

## Critical Path Analysis

**Must-Have for MVP (Phase 1)**:
- P0.x (all foundation tasks)
- P1.1-P1.7 (core reading + SRS)
- P1.8 (onboarding)
- P1.9 (privacy)

**Parallel Development Opportunities**:
- P1.2 (tooltip) and P1.3 (sidebar) can be developed concurrently
- P1.6 (SRS algorithm) and P1.4 (HSK meter) are independent
- P2.1 and P2.2 can proceed in parallel

**High-Risk Items**:
- P0.2: Dataset licensing and quality
- P0.3: Tokenizer performance targets
- P1.6: SRS algorithm complexity
- P3.3: Sync security and reliability

---

## Success Criteria by Phase

### Phase 0 Success:
- Tokenizer achieves <30ms/1k chars on desktop
- Dictionary data compressed to <5MB
- Basic difficulty scoring working accurately

### Phase 1 (MVP) Success:
- All PRD MVP features implemented
- Performance targets met (tooltip <50ms, sidebar <150ms)
- Cross-browser compatibility verified
- 5+ beta testers complete full user journey

### Phase 2 Success:
- Traditional Chinese works flawlessly
- Browser extension installs and runs on 3+ major sites
- Content recommendations rated useful by 80%+ of users

### Phase 3 Success:
- Segmentation accuracy improves by 15%+ over Phase 1
- TTS works in 90%+ of target browsers
- Sync maintains data integrity across 3+ devices

### Phase 4 Success:
- 10+ active study circles formed
- 50+ pieces of UGC content submitted
- Community moderation handles issues within 24hrs

---

## Resource Requirements

**Development**: 1 full-stack engineer (or equivalent)
**Design**: UX/UI consultation for P1.10, P4.x
**Data**: Dataset sourcing and validation effort
**Testing**: Beta tester recruitment (5-10 users per phase)

---

## Risk Mitigation

1. **Dataset Issues**: Have backup sources for HSK lists and frequency data
2. **Performance**: Profile early and often; use Web Workers aggressively
3. **Legal**: Consult legal review before Phase 2 content features
4. **Scope Creep**: Stick to phase definitions; defer features to next phase
5. **User Adoption**: Build feedback loops into each phase

---

**Next Steps**: Begin Phase 0 immediately with P0.1 (Project Setup)
