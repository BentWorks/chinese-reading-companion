import React from 'react';
type Props = { label: 'too easy'|'just right'|'stretch'|'too hard'; explanation: string };
export default function DifficultyBadge({label, explanation}: Props){
  const color = { 'too easy':'#6ee7b7','just right':'#60a5fa','stretch':'#fbbf24','too hard':'#f87171' }[label];
  return <span title={explanation} style={{background:color, padding:'4px 8px', borderRadius:8, color:'#111'}}>
    {label.toUpperCase()}
  </span>;
}