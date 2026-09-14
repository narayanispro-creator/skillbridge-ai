"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, BadgeCheck, Route, BriefcaseBusiness, Sparkles, UserRound, ClipboardCheck, Home, X } from "lucide-react";

const items=[
  {href:"/dashboard",label:"Home",hint:"Career command center",Icon:Home},
  {href:"/skills",label:"Skills",hint:"Edit your living skill passport",Icon:BadgeCheck},
  {href:"/career",label:"Career",hint:"Inspect gaps and projections",Icon:Route},
  {href:"/assessment",label:"Assessment",hint:"Create an assessment signal",Icon:ClipboardCheck},
  {href:"/explore",label:"Explore",hint:"See explainable opportunity matches",Icon:BriefcaseBusiness},
  {href:"/mentor",label:"Mentor",hint:"Ask questions using your live context",Icon:Sparkles},
  {href:"/profile",label:"Profile",hint:"Preferences, privacy and activity",Icon:UserRound},
];

export function CommandPalette({open,setOpen}:{open:boolean;setOpen:(v:boolean)=>void}){
 const router=useRouter(); const [q,setQ]=useState(""); const [active,setActive]=useState(0);
 const filtered=useMemo(()=>items.filter(x=>(x.label+" "+x.hint).toLowerCase().includes(q.toLowerCase())),[q]);
 useEffect(()=>{if(open){setQ("");setActive(0);requestAnimationFrame(()=>document.getElementById("command-input")?.focus())}},[open]);
 useEffect(()=>{const fn=(e:KeyboardEvent)=>{if(!open)return;if(e.key==="Escape")setOpen(false);if(e.key==="ArrowDown"){e.preventDefault();setActive(x=>Math.min(x+1,Math.max(0,filtered.length-1)))}if(e.key==="ArrowUp"){e.preventDefault();setActive(x=>Math.max(0,x-1))}if(e.key==="Enter"&&filtered[active]){e.preventDefault();router.push(filtered[active].href);setOpen(false)}};window.addEventListener("keydown",fn);return()=>window.removeEventListener("keydown",fn)},[open,filtered,active,router,setOpen]);
 if(!open)return null;
 return <div className="commandOverlay" onMouseDown={()=>setOpen(false)}>
   <div className="commandPalette" onMouseDown={e=>e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Quick navigation">
     <div className="commandSearch"><Search size={17}/><input id="command-input" value={q} onChange={e=>{setQ(e.target.value);setActive(0)}} placeholder="Jump to a workspace…"/><button onClick={()=>setOpen(false)}><X size={15}/></button></div>
     <div className="commandResults">{filtered.length?filtered.map((x,i)=><button key={x.href} className={i===active?"active":""} onMouseEnter={()=>setActive(i)} onClick={()=>{router.push(x.href);setOpen(false)}}><span className="commandResultIcon"><x.Icon size={16}/></span><span><b>{x.label}</b><small>{x.hint}</small></span><ArrowRight size={15}/></button>):<div className="commandEmpty">No workspace matches “{q}”.</div>}</div>
     <div className="commandFooter"><span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span></div>
   </div>
 </div>
}
