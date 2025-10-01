import React from 'react';
type Word = { id:string; hanzi:string; pinyin?:string; gloss?:string; checked?:boolean };
type Props = { newWords: Word[]; onAddAll: ()=>void };
export default function Sidebar({newWords, onAddAll}: Props){
  return <aside style={{position:'fixed', right:16, top:16, width:320, height:'90vh', overflow:'auto', background:'#111827', color:'#e5e7eb', borderRadius:16, padding:16}}>
    <h3 style={{fontWeight:700, fontSize:18}}>New on this page ({newWords.length})</h3>
    <button onClick={onAddAll} style={{marginTop:8, padding:'6px 10px', borderRadius:8}}>Add all to review</button>
    <ul style={{marginTop:12}}>
      {newWords.map(w=> <li key={w.id} style={{padding:'6px 0', borderBottom:'1px solid #374151'}}>
        <div style={{fontWeight:600}}>{w.hanzi}</div>
        <div style={{fontSize:12, opacity:.75}}>{w.pinyin} — {w.gloss}</div>
      </li>)}
    </ul>
  </aside>;
}