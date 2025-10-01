import React from 'react';
type Props = { hanzi: string; pinyin?: string; gloss?: string; actions?: React.ReactNode };
export default function TooltipCard({hanzi, pinyin, gloss, actions}: Props){
  return <div style={{padding:8, background:'#1f2937', color:'#f9fafb', borderRadius:12, boxShadow:'0 6px 18px rgba(0,0,0,.25)'}}>
    <div style={{fontSize:20, fontWeight:700}}>{hanzi}</div>
    {pinyin && <div style={{opacity:.85, marginTop:4}}>{pinyin}</div>}
    {gloss && <div style={{marginTop:6}}>{gloss}</div>}
    <div style={{marginTop:8}}>{actions}</div>
  </div>;
}