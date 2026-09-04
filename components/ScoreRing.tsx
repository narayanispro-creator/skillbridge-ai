import type { CSSProperties } from "react";
export function ScoreRing({value,label="readiness",size=146}:{value:number;label?:string;size?:number}){
 const v=Math.max(0,Math.min(100,value));
 return <div className="scoreRing" style={{width:size,height:size,"--score":`${v*3.6}deg`} as CSSProperties}><div className="scoreRingInner"><strong>{v}</strong><span>/100</span><small>{label}</small></div></div>
}
