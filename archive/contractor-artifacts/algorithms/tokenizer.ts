// tokenizer.ts — trie + DAG + Viterbi (sketch)
export type DictEntry = {
  id: string; simp: string; trad?: string; pinyin: string;
  senses: { gloss: string }[]; hskLevel?: number; frequencyRank?: number;
  flags?: { chengyu?: boolean; properNoun?: boolean };
};

export type Token = {
  text: string; start: number; end: number; lemmaId?: string;
  pinyin?: string; hskLevel?: number; frequencyRank?: number;
  flags?: Record<string, boolean>; knownByUser?: boolean;
};

type TrieNode = { children: Map<string, TrieNode>; entries?: DictEntry[] };

export function buildTrie(entries: DictEntry[]): TrieNode {
  const root: TrieNode = { children: new Map() };
  for (const e of entries) {
    let node = root;
    for (const ch of e.simp) {
      if (!node.children.has(ch)) node.children.set(ch, { children: new Map() });
      node = node.children.get(ch)!;
    }
    (node.entries ||= []).push(e);
  }
  return root;
}

export function segment(text: string, trie: TrieNode, isKnown:(id:string)=>boolean): Token[] {
  // Build DAG: edges i -> j with cost
  const n = text.length;
  const edges: Map<number, {j:number, entry?:DictEntry, cost:number}[]> = new Map();
  for (let i=0;i<n;i++) {
    const arr: {j:number, entry?:DictEntry, cost:number}[] = [];
    let node = trie; let k=i;
    while (k<n && node.children.has(text[k])) {
      node = node.children.get(text[k++])!;
      if (node.entries) {
        for (const entry of node.entries) {
          const base = Math.log(entry.frequencyRank ? entry.frequencyRank : 50000);
          const bonus = (isKnown(entry.id)? -1.0 : 0) + (entry.flags?.chengyu ? -0.7 : 0);
          arr.push({ j:k, entry, cost: Math.max(0.01, base + bonus) });
        }
      }
    }
    // fallback single char
    if (!arr.length) arr.push({ j:i+1, entry: undefined, cost: 5.0 });
    edges.set(i, arr);
  }
  // Viterbi / shortest path
  const dp = new Array(n+1).fill(Infinity); dp[n]=0;
  const nxt: number[] = new Array(n).fill(-1);
  const pick: (DictEntry|undefined)[] = new Array(n).fill(undefined);
  for (let i=n-1;i>=0;i--) {
    for (const e of edges.get(i)!) {
      const cand = e.cost + dp[e.j];
      if (cand < dp[i]) { dp[i]=cand; nxt[i]=e.j; pick[i]=e.entry; }
    }
  }
  // Reconstruct
  const out: Token[] = [];
  for (let i=0;i<n; i = nxt[i]) {
    const entry = pick[i];
    const end = nxt[i];
    const textSpan = text.slice(i,end);
    out.push({
      text: textSpan, start:i, end:end!,
      lemmaId: entry?.id, pinyin: entry?.pinyin, hskLevel: entry?.hskLevel,
      frequencyRank: entry?.frequencyRank, flags: entry?.flags as any
    });
  }
  return out;
}
