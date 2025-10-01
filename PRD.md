# PRD — Chinese Reading Companion (Web‑First)

## Vision
A browser-based companion that helps learners **read more Chinese, more enjoyably**, by selecting texts at the
right challenge level, providing instant, in-context help, and tracking progress over time. Social features arrive later
to sustain motivation through community, creation, and shared challenges.

## Target Users
- Adult learners (HSK 1–6/7) pursuing self-study or coursework.
- Heritage learners rebuilding literacy.
- Later: classrooms and study groups (teacher dashboards).

## User Value (Top Jobs)
1. **Find readable, interesting articles** matched to my level and interests.
2. **Understand as I read** with instant glosses and unobtrusive highlights.
3. **Make steady progress** via spaced repetition and micro-quizzes based on what I actually read.
4. **See my growth** (coverage, HSK alignment, streaks) and share milestones (post-MVP).

## Non-Goals (MVP)
- Full social network, public profiles, or content hosting for UGC articles.
- Server-side scraping of third‑party full text without permission.
- Native mobile app (PWA can come later).

## Key Features (MVP)
- **On-page analyzer** (web-first site + embeddable script) that evaluates difficulty and highlights unknown words.
- **Adaptive difficulty**: “Just right” band (e.g., 90–95% known coverage) with clear explanation badges.
- **User mastery model**: per-lemma mastery (0..1) with SRS (local-first).
- **HSK alignment** (Simplified-first): per token & per-article HSK breakdown.
- **Lookup & sidebar dictionary** using open data (CC‑CEDICT with attribution).
- **Placement**: user-declared level + quick diagnostic passages.
- **Privacy-by-default**: IndexedDB storage, export/delete; optional encrypted sync later.

## Post-MVP
- **Social layer**: study circles, progress posts, shared reading lists, UGC stories with on-site licenses.
- **Interest-based recommendations** from permitted feeds and partnerships.
- **Traditional support** with OpenCC; user-switchable.
- **TTS** improvements (on-device baseline; pluggable high-quality voices later).
- **Extension** for any site with overlay UI when embedding is blocked.

## Success Metrics
- Week 4 retention ≥ 30% of onboarded users.
- Avg weekly reading time ≥ 45 minutes.
- SRS review adherence: ≥ 60% complete scheduled reviews.
- Difficulty calibration: ≥ 80% of reads self-rated “just right” or “good challenge”.

## Risks & Mitigations
- **Legal/ToS**: prefer client-side analysis; obtain permissions or embed via links; attribute clearly.
- **Latency**: WASM + workers, incremental tokenization, caching.
- **Ambiguity**: hybrid segmentation with idiom & NER lists; user controls for split/merge.
- **Cold start**: user-declared + quick diagnostic + curated starter packs.

