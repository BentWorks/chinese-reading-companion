# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Chinese Reading Companion** — A web-first browser application that helps learners read Chinese text at the right difficulty level with instant in-context help, progress tracking, and spaced repetition. This is currently skeleton/prototype code focusing on architecture and modularity.

**Tech Stack**: Next.js/React (TypeScript), IndexedDB (local-first), Web Workers, optional ONNX runtime for ML disambiguation.

**Core Philosophy**:
- Privacy-by-default (all processing client-side, IndexedDB storage)
- Web-first with optional browser extension later
- HSK-aligned, Simplified Chinese first (Traditional via OpenCC later)

## Architecture

### Three-Layer System

1. **Text Analysis Pipeline** ([algorithms/](algorithms/))
   - Tokenization: Trie + DAG + Viterbi segmentation ([tokenizer.ts](algorithms/tokenizer.ts))
   - Difficulty scoring: Coverage, unknown density, frequency, idiom detection ([difficulty.ts](algorithms/difficulty.ts))
   - Runs in Web Workers for performance

2. **Data Layer** ([Data_Schema/](Data_Schema/) + [web-app-skeleton/lib/db.ts](web-app-skeleton/lib/db.ts))
   - **DictEntry**: Dictionary entries with pinyin, HSK level, frequency rank, flags (chengyu/proper nouns)
   - **LemmaMastery**: Per-word mastery (0-1), uncertainty, SRS metadata (easiness, reps, lapses)
   - **Token**: Segmented word with metadata (start/end position, lemmaId reference)
   - **Difficulty**: Computed metrics (coverage, label, explanation)
   - Storage: IndexedDB namespaces (`dict`, `userModel`, `events`, `settings`, `cache:pageAnalysis`)

3. **UI Components** ([web-app-skeleton/components/](web-app-skeleton/components/))
   - DifficultyBadge, TooltipCard, Sidebar (unknowns queue), HskMeter
   - All React/TSX, minimal Next.js app structure

### Tokenization Algorithm

The hybrid segmentation uses:
- Dictionary trie traversal to find all possible word boundaries
- DAG (Directed Acyclic Graph) construction with cost edges
- Viterbi shortest-path to select optimal segmentation
- Cost factors: frequency rank (base), user-known bonus, chengyu/idiom bonus, OOV penalty
- See [tokenizer.ts:29-73](algorithms/tokenizer.ts#L29-L73) for implementation

### Difficulty Computation

Four-factor scoring system in [difficulty.ts](algorithms/difficulty.ts):
- **Coverage**: % of tokens user knows
- **Unknown density**: unknowns per 100 characters
- **Frequency score**: weighted by word rarity
- **Idiom density**: % chengyu/idioms

Labels: "too easy" (≥97% coverage), "just right" (90-97%), "stretch" (80-90%), "too hard" (<80%)

## Key Data Sources

- **CC-CEDICT**: Dictionary data (requires attribution + share-alike license)
- **HSK lists**: Word level alignment (check licensing)
- **Frequency lists**: For segmentation cost and difficulty weighting

## Performance Targets

- Tokenization: ≤30ms per 1k chars (desktop), ≤80ms (mobile mid-range)
- Tooltip open: ≤50ms
- Sidebar render: ≤150ms
- Use batched IndexedDB lookups and memory cache for hot lemmas

## Development Phases

Current: **Phase 0 (Spike)** — Dataset prep, tokenizer implementation, minimal web app
- See [Roadmap.md](Roadmap.md) for full phasing through MVP → v1.0 → Social Beta

## Important Constraints

### Privacy & Legal
- All processing runs client-side (no server-side text scraping)
- IndexedDB storage with export/delete controls
- Proper attribution for CC-CEDICT and other open data
- Respect robots.txt and ToS for any external content
- See [Legal_Compliance_Checklist.md](Legal_Compliance_Checklist.md)

### Code Structure
- Keep algorithms ([algorithms/](algorithms/)) separate from web app ([web-app-skeleton/](web-app-skeleton/))
- TypeScript types must match JSON schemas in [Data_Schema/](Data_Schema/)
- All skeleton code is illustrative — not production-ready

## Project Tracking Documents

**CRITICAL**: These 4 documents MUST be maintained automatically during all development:

1. **[implementation_plan.md](implementation_plan.md)** — Detailed task-based implementation plan
   - Phased breakdown of all features (Phase 0-4)
   - Task dependencies and estimates
   - Success criteria and risk mitigation
   - **Update**: When tasks are added, removed, or restructured

2. **[current_task.md](current_task.md)** — Active task tracking
   - Current focus and daily progress
   - Upcoming tasks (next 2 weeks)
   - Blocked items and decisions needed
   - **Update**: At start and end of each work session

3. **[changelog.md](changelog.md)** — Version history and changes
   - All features added, changed, or removed
   - Follows Keep a Changelog format
   - **Update**: Daily during active development, at phase completion

4. **[tech_stack.md](tech_stack.md)** — Technology decisions and rationale
   - Complete inventory of libraries, tools, and services
   - Decision log with dates and reasoning
   - **Update**: When new technologies are adopted or changed

## Key Reference Files

- [PRD.md](PRD.md) — Product requirements, user value, features, metrics
- [Tech_Spec.md](Tech_Spec.md) — Architecture, modules, data flow, performance targets
- [Roadmap.md](Roadmap.md) — High-level development phases and timeline
- [Legal_Compliance_Checklist.md](Legal_Compliance_Checklist.md) — Licensing and privacy guidelines
- [web-app-skeleton/STRUCTURE.txt](web-app-skeleton/STRUCTURE.txt) — Web app file organization

## Development Workflow

1. **Check** [current_task.md](current_task.md) for active work
2. **Reference** [implementation_plan.md](implementation_plan.md) for detailed task requirements
3. **Consult** [tech_stack.md](tech_stack.md) for technology choices
4. **Implement** following architecture in CLAUDE.md and Tech_Spec.md
5. **Update** all 4 tracking documents as work progresses
6. **Log** changes in [changelog.md](changelog.md) at end of session
