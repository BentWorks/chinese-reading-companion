# Technical Spec — Web‑First Chinese Reading Companion

## Architecture Overview
- **Client (Web App)**: Next.js/React (TS), IndexedDB (idb), Web Workers, onnxruntime-web (optional), OpenCC (optional).
- **Local-first** core: dictionaries, segmentation, mastery, SRS all run client-side.
- **Optional Services**:
  - Feed indexing & interest embeddings (Node/Nest or FastAPI).
  - Auth & encrypted sync (later).
  - Reader proxy (fallback) obeying robots & ToS (ephemeral).

```
Browser Page ──(inject/analyze)──► Web App Overlay
               └─► Tokenizer (Worker/WASM)
                     └─► Dict/HSK/Chengyu (IndexedDB)
                     └─► Difficulty Scorer
                     └─► HSK/coverage display
               └─► Sidebar: Glossary, SRS, Quiz
               └─► User Model (local)
```

## Key Modules
1. **Text Extraction**
   - DOM walker for visible text nodes; readability mode for pasted URLs.
   - Normalization: Unicode, punctuation, whitespace, OpenCC (optional simp⇄trad).

2. **Segmentation (Hybrid)**
   - Dictionary trie → spans; DAG + Viterbi to resolve; bonuses: user‑known words, idioms; penalties: rare OOV.
   - Optional ONNX mini-disambiguator model for ties.

3. **Enrichment**
   - Pinyin map, HSK level, freq ranks, idiom flags, POS/NER (lightweight).

4. **Difficulty Engine**
   - Coverage, unknown density, freq score, idiom density → [0..1] score & label with explanation.

5. **User Model & SRS**
   - Per-lemma mastery (0..1), uncertainty, lastSeen, easiness (FSRS/SM-2), events (lookup/read/quiz).
   - Local-first; export/delete; optional encrypted sync later.

6. **UX**
   - Tooltip (hover/select), Sidebar (unknowns queue, batch add, mini-quiz), Difficulty badge, HSK meter.
   - Accessibility (fonts, contrast), keyboard shortcuts.

## Data
- **Dictionaries**: CC‑CEDICT (attribution + share-alike), Unihan, HSK lists (check license), frequency lists.
- **Storage**: IndexedDB (idb). Namespaces: `dict`, `userModel`, `events`, `settings`, `cache:pageAnalysis`.

## Performance Targets
- Tokenization ≤ 30ms per 1k characters (desktop), ≤ 80ms mobile mid-range.
- Tooltip open ≤ 50ms; sidebar first render ≤ 150ms.
- IndexedDB lookups batched; memory cache for hot lemmas.

## Security & Privacy
- All local by default. No third-party analytics in MVP.
- CSP friendly. No DOM data exfiltration without explicit action.
- Export/erase controls; audit log of outbound requests (if any).

