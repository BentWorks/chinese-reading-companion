# Revised Technology Stack

**Last Updated**: 2025-10-01
**Based on**: Product vision clarification discussion

---

## System Architecture

### Two-Component System

**Web App (Discovery Platform)** ← Cloud-based
- Article curation and recommendations
- User accounts and mastery tracking
- Reading history and progress
- Community features (later)

**Browser Extension (Reading Assistant)** ← Client-side
- Text analysis and highlighting
- Sidebar glossary and tooltips
- Syncs with web app for user data

---

## Web App Stack

### Framework
**Vite 5+ + React 18+ + TypeScript 5+**
- **Rationale**: Simpler than Next.js for SPA, faster builds, smaller bundle
- **Why not Next.js**: No SSR needed for authenticated app, Vite is leaner
- **Routing**: React Router 6+

### UI & Styling
- **Tailwind CSS 3+**: Utility-first, rapid prototyping
- **Shadcn/ui**: High-quality, accessible components (built on Radix UI)
- **Lucide React**: Icon library

### State Management
- **TanStack Query (React Query) 5+**: Server state, caching, sync
- **Zustand**: Simple client state (user preferences, UI state)
- **Why**: Query handles backend sync, Zustand for local UI state

### Backend & Database
**Supabase** (PostgreSQL + Auth + Storage + Realtime)
- **Authentication**: Email/password, OAuth (Google), magic links
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Storage**: User data, article metadata, mastery records
- **Realtime**: Future live features (study groups)
- **Why**: Full backend-as-a-service, generous free tier, privacy-friendly EU hosting option

**Database Schema** (Supabase PostgreSQL):
```sql
-- Users (handled by Supabase Auth)
-- Extends auth.users

-- User profiles
profiles (
  id uuid primary key references auth.users,
  hsk_level int,
  interests text[],
  created_at timestamp
)

-- User word mastery
user_mastery (
  id uuid primary key,
  user_id uuid references profiles,
  lemma_id text,
  mastery float, -- 0.0 to 1.0
  last_seen timestamp,
  exposure_count int,
  created_at timestamp,
  UNIQUE(user_id, lemma_id)
)

-- Articles (curated content)
articles (
  id uuid primary key,
  url text unique,
  title text,
  source text,
  language text, -- 'simplified' or 'traditional'
  difficulty_score float,
  hsk_level_distribution jsonb, -- {1: 0.2, 2: 0.3, ...}
  word_count int,
  unknown_density float,
  topics text[],
  analyzed_at timestamp,
  created_at timestamp
)

-- User reading history
reading_history (
  id uuid primary key,
  user_id uuid references profiles,
  article_id uuid references articles,
  started_at timestamp,
  completed_at timestamp,
  words_learned int
)

-- Dictionary (CC-CEDICT)
dictionary (
  id text primary key, -- e.g., "爱_ai4"
  simplified text,
  traditional text,
  pinyin text,
  definitions jsonb, -- [{gloss: "love"}, ...]
  hsk_level int,
  frequency_rank int,
  flags jsonb -- {chengyu: true, properNoun: false}
)
```

### Content Crawling & Analysis
**Separate Service** (Node.js + TypeScript)
- **Crawler**: Puppeteer or Playwright for JS-rendered sites
- **Article Extraction**: Mozilla Readability
- **Text Analysis**: jieba-wasm for segmentation
- **Scheduling**: Node-cron or Supabase Edge Functions (cron)
- **Storage**: Save analyzed articles to Supabase
- **Deployment**: Fly.io or Railway (cheap, easy)

**Why separate service**:
- Heavy processing (crawling, analyzing)
- Runs on schedule, not per-request
- Can scale independently

---

## Browser Extension Stack

### Core
- **Manifest V3**: Chrome, Edge, Firefox compatible
- **React 18+**: For popup and sidebar UI
- **TypeScript 5+**: Type safety
- **Vite**: Build tool (with vite-plugin-web-extension)

### Text Processing
- **jieba-wasm**: Chinese word segmentation
  - **Why**: Proven accuracy, WASM = fast, offline capable
  - **Bundle size**: ~2MB (acceptable for extension)
- **Difficulty scoring**: Custom logic (from original difficulty.ts)

### Local Storage
- **Dexie.js**: IndexedDB wrapper
  - **Why**: Better DX than raw IndexedDB, TypeScript support, versioning
  - **Stores**:
    - Cached user mastery (synced from web app)
    - Dictionary subset (user's HSK level + frequency-based)
    - Article analysis cache

### Sync with Web App
- **Supabase JS Client**: Direct connection to backend
- **Auth**: User logged in via extension popup
- **Sync strategy**:
  - Download user mastery on login/periodically
  - Upload reading events (words seen, time on page)
  - Cache dictionary data locally for offline use

### UI Components
- **Sidebar**: React component injected into page
- **Tooltips**: Floating UI (Popper.js successor)
- **Shared components**: Reuse from web app where possible

---

## Shared Libraries

### Dictionary & NLP
- **jieba-wasm**: Segmentation (used by both extension and crawler service)
- **OpenCC.js**: Simplified ↔ Traditional conversion (Phase 2)

### Data
- **Shared TypeScript types**: Define once, import in web app + extension + crawler
  - Example: `DictEntry`, `UserMastery`, `Article`, `Token`

---

## Development Tools

### Code Quality
- **ESLint**: Strict TypeScript rules
- **Prettier**: Code formatting
- **Husky + lint-staged**: Pre-commit hooks

### Testing
- **Vitest**: Unit tests (tokenizer, difficulty scoring, utils)
- **React Testing Library**: Component tests
- **Playwright**: E2E tests (extension + web app flow)
- **Property-based testing**: fast-check (for NLP edge cases)

### Monorepo Management
**Turborepo** or **pnpm workspaces**
- **Packages**:
  - `apps/web`: Web app (Vite + React)
  - `apps/extension`: Browser extension
  - `apps/crawler`: Article crawler service
  - `packages/shared`: Shared types, constants
  - `packages/nlp`: Segmentation and difficulty scoring logic
  - `packages/ui`: Shared React components

**Why monorepo**: Code sharing, unified tooling, single repo

---

## Data Sources

### Dictionary
- **CC-CEDICT** (Creative Commons BY-SA 4.0)
  - Parser: Custom (or use existing like [cedict-json](https://github.com/peterolson/cedict-json))
  - Storage: Supabase PostgreSQL (full dictionary ~115k entries)
  - Extension cache: Subset based on frequency + user HSK level

### Frequency Data
- **SUBTLEX-CH** (Verify license for redistribution)
  - Alternative: [Leipzig Corpora Collection](https://wortschatz.uni-leipzig.de/)

### HSK Lists
- **HSK 3.0** (New standard, 9 levels)
  - Source: Compile from public sources or official lists
  - **Note**: Not needed for MVP, defer to Phase 2

### Chengyu/Idioms
- **Open source lists** (e.g., GitHub compilations)
  - Seed list: ~1000 most common

---

## Hosting & Deployment

### Web App
- **Vercel** or **Netlify**: Static site hosting
  - **Why**: Free tier, automatic deployments, edge CDN

### Backend
- **Supabase Cloud**: Free tier (50k rows, 500MB storage, 2GB bandwidth)
  - **Why**: Fully managed, scales on demand
  - **Pricing**: Generous free tier, ~$25/month if we outgrow it

### Crawler Service
- **Fly.io** or **Railway**: Container hosting
  - **Why**: Cheap ($5-10/month), easy deployment, cron jobs
  - **Alternative**: Supabase Edge Functions (Deno runtime)

### Browser Extension
- **Chrome Web Store**: One-time $5 fee
- **Firefox Add-ons**: Free
- **Edge Add-ons**: Free (uses Chrome package)

---

## Content Discovery Strategy

### Article Sources (MVP)
**Manual curation** to start:
- Popular Chinese news sites (人民日报, 新华社, 知乎, etc.)
- RSS feeds from approved sources
- User submissions (moderated)

**Crawler schedule**:
- Run daily, fetch ~10-20 new articles per day
- Analyze and tag with difficulty metrics
- Store in Supabase

### Recommendation Algorithm (MVP)
**Simple scoring**:
```typescript
score = (
  difficulty_match * 0.4 +  // How close to user's "sweet spot"
  interest_match * 0.3 +    // Topic overlap with user interests
  freshness * 0.2 +         // Recent articles score higher
  diversity * 0.1           // Avoid showing same source repeatedly
)
```

**Phase 2**: ML-based embeddings for semantic similarity

---

## Privacy & Security

### Data Handling
- **User mastery**: Stored server-side, encrypted at rest (Supabase default)
- **Reading history**: User can delete anytime (GDPR compliance)
- **No third-party analytics** in MVP
- **Extension permissions**: Minimal (activeTab, storage, only access on user click)

### Security
- **Supabase RLS**: Row-level security ensures users only see their data
- **HTTPS**: Enforced everywhere
- **CSP**: Content Security Policy headers
- **No localStorage for sensitive data**: Use Supabase session tokens

---

## Deployment Pipeline

### CI/CD
- **GitHub Actions**:
  - Run tests on PR
  - Type-check TypeScript
  - Lint code
  - Build extension and web app
  - Deploy web app to Vercel (on merge to main)
  - Deploy crawler to Fly.io

### Environments
- **Development**: Local + Supabase local dev
- **Staging**: Separate Supabase project
- **Production**: Production Supabase project

---

## Cost Estimate (MVP)

| Service | Cost (Monthly) |
|---------|----------------|
| Supabase | $0 (free tier) |
| Vercel/Netlify | $0 (free tier) |
| Fly.io (crawler) | ~$5-10 |
| Chrome Web Store | $5 (one-time) |
| Domain name | ~$12/year |
| **Total** | **~$5-10/month** |

---

## Migration Path

### From Current Skeleton Code
- **algorithms/tokenizer.ts**: Replace with jieba-wasm wrapper
- **algorithms/difficulty.ts**: Keep logic, adapt to use jieba tokens
- **Data_Schema/**: Convert to TypeScript types + Supabase schema
- **web-app-skeleton/**: Rebuild with Vite + React (simpler structure)

### Phase 0 Focus
1. Set up monorepo (Turborepo + pnpm)
2. Initialize web app (Vite + React + Supabase auth)
3. Build basic extension (manifest, content script, sidebar)
4. Integrate jieba-wasm in extension
5. Create shared types package
6. Set up Supabase database with initial schema

---

## Decision Log

| Decision | Date | Rationale |
|----------|------|-----------|
| Vite over Next.js | 2025-10-01 | Simpler for SPA, no SSR needed |
| Supabase over local-first | 2025-10-01 | Multi-device not needed, but data safety + backend features critical |
| jieba-wasm over custom | 2025-10-01 | Proven accuracy, save dev time, focus on UX |
| Monorepo structure | 2025-10-01 | Code sharing between web app + extension + crawler |
| Extension-first UX | 2025-10-01 | Better for "reading in wild" use case |
| Manual curation MVP | 2025-10-01 | Faster to start than automated crawling |
| Defer HSK 3.0 | 2025-10-01 | Nice-to-have, not core to MVP |
| Defer SRS | 2025-10-01 | Passive mastery tracking sufficient for MVP |

---

**Next**: Create revised implementation plan based on this stack.
