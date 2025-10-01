// difficulty.ts — compute coverage & difficulty label
import type { Token } from './tokenizer';

export type Difficulty = {
  coverage: number;
  unknownPer100Chars: number;
  freqScore: number;
  idiomDensity: number;
  label: 'too easy'|'just right'|'stretch'|'too hard';
  explanation: string;
  score: number;
};

export function computeDifficulty(tokens: Token[], isKnown:(lemmaId?:string)=>boolean): Difficulty {
  const totalChars = tokens.reduce((s,t)=>s+(t.end-t.start),0);
  const knownTokens = tokens.filter(t=> t.lemmaId && isKnown(t.lemmaId));
  const coverage = knownTokens.length / tokens.length;
  const unknowns = tokens.length - knownTokens.length;
  const unknownPer100 = totalChars ? (unknowns / totalChars) * 100 : 0;
  const avgFreq = tokens.reduce((s,t)=> s + (t.frequencyRank || 50000), 0) / Math.max(1,tokens.length);
  const freqScore = 1 - Math.min(1, Math.log(avgFreq)/Math.log(50000));
  const idiomCount = tokens.filter(t=> t.flags && (t.flags as any).chengyu).length;
  const idiomDensity = idiomCount / Math.max(1,tokens.length);
  // Simple label rule
  let label: Difficulty['label'] = 'just right';
  if (coverage >= 0.97) label = 'too easy';
  else if (coverage >= 0.90) label = 'just right';
  else if (coverage >= 0.80) label = 'stretch';
  else label = 'too hard';
  const score = 0.5*coverage + 0.2*(1-unknownPer100/20) + 0.2*freqScore + 0.1*(1-idiomDensity);
  const explanation = `${Math.round(coverage*100)}% known; ~${unknownPer100.toFixed(1)} unknowns/100 chars; idioms ${Math.round(idiomDensity*100)}%`;
  return { coverage, unknownPer100Chars: unknownPer100, freqScore, idiomDensity, label, explanation, score: Math.max(0, Math.min(1, score)) };
}
