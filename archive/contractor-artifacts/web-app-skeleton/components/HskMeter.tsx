import React from 'react';
type Props = { counts: Record<string, number> };
export default function HskMeter({counts}: Props){
  const levels = Object.keys(counts).sort();
  return <div style={{display:'flex', gap:6}}>
    {levels.map(l=> <div key={l} title={`HSK ${l}: ${counts[l]}`} style={{height:10, width:40, background:'#4b5563', position:'relative'}}>
      <div style={{position:'absolute', left:0, top:0, bottom:0, width:Math.min(100, counts[l])+'%', background:'#10b981'}}></div>
    </div>)}
  </div>;
}