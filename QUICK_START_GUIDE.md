# Quick Start Guide — Phase 0 Day 1

**When you're ready to begin, follow these steps exactly**

---

## ✅ Prerequisites (Install These First)

1. **Node.js 20+**
   - Download: https://nodejs.org/
   - Verify: `node --version` (should be 20.x or higher)

2. **pnpm** (package manager)
   ```bash
   npm install -g pnpm
   pnpm --version  # Should be 8.x or higher
   ```

3. **Git**
   - Download: https://git-scm.com/
   - Verify: `git --version`

4. **VS Code** (recommended editor)
   - Download: https://code.visualstudio.com/
   - Install extensions:
     - ESLint
     - Prettier
     - TypeScript Vue Plugin (Volar)

5. **Chrome or Firefox** (for extension testing)

---

## 📦 Phase 0 - Day 1 Setup (2-3 hours)

### Step 1: Initialize Monorepo (30 min)

```bash
# Navigate to your project directory
cd c:\Users\dougb\Projects\LanguageLearningModel

# Initialize Turborepo
pnpm dlx create-turbo@latest

# When prompted:
# - Name: chinese-reading-companion
# - Package manager: pnpm
# - Template: basic (React + TypeScript)

# This creates the monorepo structure
```

**Expected structure after**:
```
chinese-reading-companion/
├── apps/
│   ├── web/           # Web app (Vite + React)
│   └── docs/          # (Delete this, we don't need it)
├── packages/
│   ├── ui/            # Shared UI components
│   ├── typescript-config/
│   └── eslint-config/
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

**Clean up**:
```bash
cd chinese-reading-companion
rm -rf apps/docs  # Remove docs app (not needed)
```

### Step 2: Add Extension and Packages (30 min)

```bash
# Create extension app
mkdir -p apps/extension
cd apps/extension
pnpm init

# Create shared packages
mkdir -p packages/shared packages/nlp
cd packages/shared && pnpm init
cd ../nlp && pnpm init
```

**Manually create these files**:

**`apps/extension/package.json`**:
```json
{
  "name": "extension",
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "shared": "workspace:*",
    "nlp": "workspace:*"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

**`packages/shared/package.json`**:
```json
{
  "name": "shared",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

**`packages/nlp/package.json`**:
```json
{
  "name": "nlp",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "jieba-wasm": "^0.0.2"
  }
}
```

### Step 3: Install Dependencies

```bash
# From monorepo root
pnpm install
```

### Step 4: Set Up Supabase (30 min)

1. **Create Supabase account**:
   - Go to: https://supabase.com/
   - Click "Start your project"
   - Sign up with GitHub or email

2. **Create new project**:
   - Organization: Create new (name it "ChineseReadingCompanion")
   - Project name: `chinese-reading-dev` (for development)
   - Database password: Generate strong password (SAVE THIS!)
   - Region: Choose closest to you (e.g., US East, EU West)
   - Pricing: Free tier

3. **Wait for project to provision** (~2 minutes)

4. **Get API credentials**:
   - Go to Project Settings → API
   - Copy these values:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon public key** (starts with `eyJ...`)

5. **Create `.env` file in `apps/web`**:

```bash
# apps/web/.env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

**⚠️ IMPORTANT**: Add `.env` to `.gitignore`:
```bash
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### Step 5: Create Database Schema (15 min)

1. **Open Supabase SQL Editor**:
   - In Supabase dashboard → SQL Editor
   - Click "New query"

2. **Paste this schema**:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  hsk_level INTEGER CHECK (hsk_level >= 1 AND hsk_level <= 6),
  interests TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- User mastery table
CREATE TABLE user_mastery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lemma_id TEXT NOT NULL,
  mastery FLOAT NOT NULL DEFAULT 0.0 CHECK (mastery >= 0 AND mastery <= 1),
  exposure_count INTEGER DEFAULT 1,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lemma_id)
);

ALTER TABLE user_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own mastery"
  ON user_mastery FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mastery"
  ON user_mastery FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own mastery"
  ON user_mastery FOR UPDATE
  USING (auth.uid() = user_id);

-- Dictionary table (public, read-only for users)
CREATE TABLE dictionary (
  id TEXT PRIMARY KEY,
  simplified TEXT NOT NULL,
  traditional TEXT,
  pinyin TEXT NOT NULL,
  definitions JSONB NOT NULL,
  hsk_level INTEGER,
  frequency_rank INTEGER,
  flags JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE dictionary ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Dictionary is publicly readable"
  ON dictionary FOR SELECT
  TO authenticated
  USING (true);

-- Articles table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  url TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  source TEXT,
  language TEXT DEFAULT 'simplified',
  difficulty_score FLOAT,
  hsk_distribution JSONB,
  word_count INTEGER,
  topics TEXT[] DEFAULT '{}',
  analyzed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles are publicly readable"
  ON articles FOR SELECT
  TO authenticated
  USING (true);

-- Reading history
CREATE TABLE reading_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  words_encountered INTEGER DEFAULT 0
);

ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reading history"
  ON reading_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history"
  ON reading_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_mastery_user_id ON user_mastery(user_id);
CREATE INDEX idx_user_mastery_lemma_id ON user_mastery(lemma_id);
CREATE INDEX idx_dictionary_simplified ON dictionary(simplified);
CREATE INDEX idx_articles_difficulty ON articles(difficulty_score);
CREATE INDEX idx_reading_history_user ON reading_history(user_id);
```

3. **Run the query** (click "Run" button)
4. **Verify tables created**: Go to "Table Editor" → should see 5 tables

### Step 6: Download CC-CEDICT (15 min)

```bash
# Create data directory
mkdir -p data/raw

# Download CC-CEDICT
cd data/raw
curl -O https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz

# Extract
gunzip cedict_1_0_ts_utf-8_mdbg.txt.gz

# Verify
head cedict_1_0_ts_utf-8_mdbg.txt
# Should see lines like:
# 你好 你好 [ni3 hao3] /hello/hi/how are you/
```

---

## 🎯 End of Day 1 Checklist

- [ ] Monorepo created with Turborepo + pnpm
- [ ] Supabase account created, project provisioned
- [ ] Database schema created (5 tables)
- [ ] Environment variables set (`.env` file)
- [ ] CC-CEDICT downloaded (raw data ready)
- [ ] All dependencies installed (`pnpm install` successful)

**If all checked ✅ → Ready for Day 2!**

---

## 📅 What's Next (Day 2)

1. **Parse CC-CEDICT** → Convert to JSON format
2. **Seed Supabase** → Upload dictionary to database
3. **Build basic web app** → Login page with Supabase auth
4. **Test auth flow** → Signup, login, logout

---

## 🆘 Troubleshooting

### "pnpm not found"
```bash
npm install -g pnpm
```

### "Supabase connection error"
- Check `.env` file has correct URL and key
- Verify Supabase project is running (green status in dashboard)
- Check for typos in environment variable names

### "Database schema error"
- Make sure you're in the correct Supabase project
- Copy SQL exactly (no modifications)
- If error persists, drop tables and re-run

### "Can't download CC-CEDICT"
- Try browser download: https://www.mdbg.net/chinese/dictionary/worddict/english/cedict/cedict.txt.gz
- Save to `data/raw/` directory
- Extract manually

---

## 💬 Questions?

If stuck, check:
1. Error messages carefully
2. Console logs
3. Supabase dashboard logs (Project Settings → Logs)

**Ready to start? Let's build this! 🚀**
