# Technology Stack

**Last Updated**: 2025-09-30
**Project**: Chinese Reading Companion (Web-First)

---

## Frontend Framework

### Core
- **Next.js** 14+ (App Router)
  - **Rationale**: React-based framework with excellent TypeScript support, built-in routing, SSR/SSG capabilities, and strong ecosystem
  - **Version**: 14.x or latest stable
  - **Configuration**: App Router, TypeScript strict mode, SWC compiler

- **React** 18+
  - **Rationale**: Industry-standard UI library with hooks, concurrent features, and excellent developer experience
  - **Version**: 18.x or latest stable

- **TypeScript** 5+
  - **Rationale**: Type safety, better IDE support, catches errors at compile time, essential for complex data modeling
  - **Configuration**: Strict mode enabled, path aliases configured

---

## Styling

- **Tailwind CSS** 3+ (Primary choice)
  - **Rationale**: Utility-first CSS, excellent for rapid prototyping, small bundle size with purging, dark mode support
  - **Alternative**: CSS Modules or styled-components if team prefers CSS-in-JS

- **Radix UI** or **Headless UI**
  - **Rationale**: Unstyled, accessible component primitives for tooltips, dialogs, dropdowns
  - **Phase**: P1.2 onwards

---

## State Management

- **React Hooks** (useState, useReducer, useContext)
  - **Rationale**: Built-in, sufficient for MVP, avoids external dependencies
  - **Scope**: Local component state, simple global state via Context

- **Zustand** or **Jotai** (Optional for Phase 2+)
  - **Rationale**: Lightweight state management if Context becomes insufficient
  - **Decision Point**: P1.11 evaluation

---

## Data Storage

### Client-Side Database
- **IndexedDB** (Native Browser API)
  - **Rationale**: Large storage capacity (50MB+), structured data, asynchronous, no network required
  - **Namespaces**: `dict`, `userModel`, `events`, `settings`, `cache:pageAnalysis`

- **idb** library
  - **Rationale**: Promise-based wrapper for IndexedDB, simpler API than raw IndexedDB
  - **Version**: Latest stable
  - **Phase**: P0.5

---

## Performance Optimization

### Web Workers
- **Native Web Workers API**
  - **Rationale**: Offload CPU-intensive tokenization to background thread, keep UI responsive
  - **Scope**: Tokenizer, large text processing
  - **Phase**: P0.3

### WASM (Optional)
- **Rust + wasm-bindgen** or **AssemblyScript** (Future consideration)
  - **Rationale**: Potential 2-5x speedup for tokenizer if JavaScript performance insufficient
  - **Decision Point**: Post-P0.3 benchmarking
  - **Status**: Not planned for MVP unless performance targets missed

---

## Natural Language Processing

### Segmentation
- **Custom Trie + DAG + Viterbi** (TypeScript)
  - **Rationale**: Full control over algorithm, no external API dependencies, privacy-preserving
  - **Implementation**: [algorithms/tokenizer.ts](algorithms/tokenizer.ts)
  - **Phase**: P0.3

### Traditional ↔ Simplified Conversion
- **OpenCC.js**
  - **Rationale**: Industry-standard conversion library, client-side, accurate
  - **Version**: Latest stable
  - **Phase**: P2.1

### Disambiguation (Optional)
- **ONNX Runtime Web** + custom model
  - **Rationale**: Run lightweight ML models in browser for segmentation tie-breaking
  - **Status**: Optional for Phase 3
  - **Model Size Target**: <2MB

---

## Text-to-Speech

- **Web Speech API** (Browser Native)
  - **Rationale**: Free, built-in, works offline, no API costs
  - **Limitations**: Voice quality varies by browser/OS
  - **Phase**: P3.2

- **Cloud TTS** (Optional Enhancement)
  - **Options**: Google Cloud TTS, Azure Cognitive Services, AWS Polly
  - **Rationale**: Higher quality voices, more natural intonation
  - **Phase**: Post-v1.0 if user demand exists
  - **Cost Consideration**: Usage-based pricing

---

## Data Sources

### Dictionary
- **CC-CEDICT**
  - **License**: Creative Commons Attribution-ShareAlike 4.0
  - **Source**: https://cc-cedict.org/
  - **Format**: Custom parser to JSON
  - **Size**: ~115k entries → target <5MB compressed
  - **Phase**: P0.2

### HSK Word Lists
- **HSK 1-6** (Official vocabulary)
  - **Source**: Public HSK lists (verify licensing)
  - **Alternative**: Compile from multiple permissive sources
  - **Size**: ~5,000 words across 6 levels
  - **Phase**: P0.2

- **HSK 7-9** (Optional, new standard)
  - **Status**: Evaluate availability and licensing
  - **Phase**: Post-MVP

### Frequency Data
- **SUBTLEX-CH** or equivalent
  - **Source**: Research publication or open dataset
  - **License**: Verify redistribution rights
  - **Size**: ~50k word frequencies
  - **Phase**: P0.2

### Chengyu/Idioms
- **Compiled from open sources**
  - **Size Target**: 1,000-5,000 entries
  - **Phase**: P0.2 (seed list), P3.1 (expansion)

---

## Testing

### Unit Testing
- **Vitest**
  - **Rationale**: Fast, Vite-native, Jest-compatible API, excellent TypeScript support
  - **Configuration**: DOM environment for React components
  - **Phase**: P0.1

### React Component Testing
- **React Testing Library**
  - **Rationale**: Encourages accessibility-first testing, user-centric queries
  - **Phase**: P0.1

### E2E Testing (Optional)
- **Playwright** or **Cypress**
  - **Rationale**: Cross-browser testing, realistic user scenarios
  - **Phase**: P1.11 or P2.x if resources allow
  - **Status**: Nice-to-have, not required for MVP

---

## Development Tools

### Code Quality
- **ESLint**
  - **Config**: Next.js recommended + strict TypeScript rules
  - **Phase**: P0.1

- **Prettier**
  - **Config**: Standard formatting, integrated with ESLint
  - **Phase**: P0.1

### Version Control
- **Git** with conventional commits
  - **Commit Format**: `type(scope): description` (e.g., `feat(tokenizer): add trie builder`)
  - **Branches**: `main` (production), `develop` (integration), feature branches

### Build Tools
- **Next.js Built-in Tooling** (Turbopack/Webpack)
  - **Rationale**: Zero-config, optimized for React, built-in optimizations

---

## Backend Services (Phase 3+)

### Authentication
- **Supabase Auth** or **Firebase Auth** (Phase 3.3)
  - **Rationale**: Easy integration, handles OAuth, secure token management
  - **Decision Point**: P3.3

### Cloud Sync (Optional)
- **Supabase** or **Firebase Firestore** (Phase 3.3)
  - **Rationale**: Real-time sync, generous free tier, client libraries
  - **Security**: End-to-end encryption via Web Crypto API (client-side encrypt before upload)

### Serverless Functions
- **Vercel Serverless Functions** or **Cloudflare Workers** (Phase 2+)
  - **Use Cases**: Feed indexing, content proxying (ephemeral), interest embeddings
  - **Phase**: P2.2 (content discovery)

---

## Browser Extension (Phase 2)

- **Manifest V3** (Chrome, Edge, Firefox)
  - **Content Scripts**: Inject analyzer into third-party pages
  - **Background Service Worker**: Message passing, state management
  - **Popup UI**: React-based, shares components with web app
  - **Phase**: P2.3

---

## Hosting & Deployment

### Static Hosting
- **Vercel** (Recommended for Next.js)
  - **Rationale**: Optimized for Next.js, automatic deployments, edge network, generous free tier
  - **Alternative**: Netlify, Cloudflare Pages

### CDN
- **Vercel Edge Network** (included)
  - **Rationale**: Low latency globally, automatic HTTPS, DDoS protection

### Database
- **Client-Side Only** (MVP)
  - **Rationale**: No backend database needed for local-first architecture
  - **Phase 3+**: Optional Supabase/Firebase for sync

---

## Analytics (Post-MVP)

- **Plausible Analytics** or **Umami** (Privacy-focused)
  - **Rationale**: No cookies, GDPR-compliant, self-hostable
  - **Phase**: P2+ only if user research requires metrics
  - **MVP**: No analytics (privacy-first)

---

## Accessibility

- **axe-core** DevTools Extension
  - **Rationale**: Automated accessibility testing during development
  - **Phase**: P1.10

- **WAVE** Browser Extension
  - **Rationale**: Visual accessibility evaluation
  - **Phase**: P1.10

---

## Documentation

- **Markdown** files in repository
  - Current: README, PRD, Tech Spec, Roadmap, CLAUDE.md, implementation_plan.md, etc.
  - Phase-specific: API documentation, user guides

- **Docusaurus** or **VitePress** (Optional, Phase 4+)
  - **Rationale**: Professional documentation site for user guides and API docs
  - **Status**: Not planned for MVP

---

## Internationalization (i18n)

- **next-intl** or **react-i18next** (Phase 2+)
  - **Rationale**: UI translation for English, Spanish, Japanese learners of Chinese
  - **Status**: Deferred to post-MVP
  - **Priority**: Low (English-first for MVP)

---

## Monitoring & Error Tracking (Post-MVP)

- **Sentry** (Optional, Phase 2+)
  - **Rationale**: Client-side error tracking, performance monitoring
  - **Configuration**: Privacy-safe (no PII in error reports)

---

## Design Tools

- **Figma** or **Sketch** (Optional, for P1.10 UI polish)
  - **Rationale**: Collaborative design, component libraries
  - **Status**: Minimal design needed for MVP (use Tailwind defaults)

---

## Data Processing Pipeline

- **Node.js Scripts** (TypeScript)
  - **Use Cases**: Parse CC-CEDICT, generate compact JSON, validate schemas
  - **Location**: `scripts/` directory
  - **Phase**: P0.2

---

## Dependency Management

- **npm** or **pnpm** (Recommended: pnpm for speed and disk efficiency)
  - **Lock File**: Committed to repository
  - **Security**: Automated dependency updates via Dependabot or Renovate

---

## Performance Monitoring

- **Lighthouse CI** (Integrated into CI/CD)
  - **Targets**: Performance score >90, Accessibility >95
  - **Phase**: P1.10

- **Web Vitals**
  - **Metrics**: LCP, FID, CLS
  - **Target**: All "Good" ratings
  - **Phase**: P1.10

---

## Security

- **Content Security Policy (CSP)**
  - **Configuration**: Restrict inline scripts, enforce HTTPS
  - **Phase**: P1.9

- **Web Crypto API**
  - **Use Case**: Client-side encryption for sync (Phase 3.3)
  - **Algorithm**: AES-GCM with user-derived keys

---

## Decision Log

| Decision | Date | Rationale |
|----------|------|-----------|
| Next.js over Vite+React | 2025-09-30 | Better DX, built-in SSR, ecosystem |
| Vitest over Jest | 2025-09-30 | Faster, better Vite integration |
| Tailwind over CSS-in-JS | 2025-09-30 | Rapid prototyping, smaller bundle |
| IndexedDB over LocalStorage | 2025-09-30 | Structured data, larger capacity |
| Web Workers for tokenizer | 2025-09-30 | Keep UI responsive during heavy processing |
| CC-CEDICT as primary dictionary | 2025-09-30 | Open license, comprehensive, community-maintained |

---

## Future Technology Considerations

### Under Evaluation
- **WASM for tokenizer**: If performance targets not met with JS
- **ONNX models**: For segmentation disambiguation (Phase 3)
- **Progressive Web App (PWA)**: Offline support, install prompts (Phase 2)
- **WebGPU**: If ML models become more complex (Phase 4+)

### Explicitly Not Using (MVP)
- ❌ Server-side rendering of user content (privacy risk)
- ❌ Third-party analytics (privacy-first approach)
- ❌ Native mobile apps (web-first strategy)
- ❌ Blockchain/crypto (unnecessary complexity)

---

**Maintenance**: This document will be updated as technology decisions are made during implementation. All changes should be logged with rationale and date.

**Last Review**: 2025-09-30 (Project Kickoff)
