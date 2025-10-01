// db.ts — IndexedDB wrappers (using idb-like API idea)
export type LemmaMastery = {
  lemmaId: string; mastery: number; uncertainty: number; lastSeen: number;
  easiness: number; reps: number; lapses: number;
};

export async function saveMastery(m: LemmaMastery){ /* ... */ }
export async function getMastery(id: string): Promise<LemmaMastery|undefined> { return undefined; }
export async function batchSaveMastery(ms: LemmaMastery[]){ /* ... */ }
