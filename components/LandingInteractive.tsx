"use client";
import { useMemo, useState } from "react";
import { BrainCircuit, Network, Route, ShieldCheck, Sparkles } from "lucide-react";

const views=[
 {name:"Overview",kicker:"NEXT BEST ACTION",title:"Close your React gap",copy:"React is the highest-leverage gap for your target role and current opportunity set.",metric:"82",metricLabel:"READINESS",chips:["React 46 → 72","+9 projected readiness","2 stronger matches"]},
 {name:"Skill Passport",kicker:"EVIDENCE SIGNAL",title:"Proof changes confidence",copy:"Self-rating and proof are separate. Attach a project, repository or assessment without changing your claimed proficiency.",metric:"68",metricLabel:"EVIDENCE",chips:["4 skills tracked","3 proof items","1 assessment signal"]},
 {name:"Career Graph",kicker:"ROLE GRAPH",title:"See exactly what is missing",copy:"Every target role becomes a visible set of skill thresholds. Missing requirements are ranked by normalized gap.",metric:"4",metricLabel:"ACTIVE GAPS",chips:["React highest gap","Git next","JavaScript near target"]},
 {name:"Opportunities",kicker:"EXPLAIN MATCH",title:"A score you can inspect",copy:"Skill fit, proficiency, role interest, availability and learning readiness stay visible instead of disappearing into a black box.",metric:"82",metricLabel:"MATCH",chips:["45% skill fit","20% proficiency","5 visible factors"]},
 {name:"AI Mentor",kicker:"GROUNDED GUIDANCE",title:"Ask why, not just what",copy:"The mentor receives your deterministic readiness and gaps, then explains them in plain language without rewriting the numbers.",metric:"3",metricLabel:"TOP GAPS",chips:["uses live context","does not score","fallback-safe"]},
];

export function LandingInteractive(){
 const [active,setActive]=useState(0); const [skill,setSkill]=useState(46);
 const v=views[active];
 const projected=Math.min(96,82+Math.round((skill-46)*.35));
 const bars=useMemo(()=>[["React",skill],["Git",63],["JavaScript",72]] as const,[skill]);
 return <div className="productStage2 interactiveStage">
  <div className="stageHalo"/>
  <div className="appPreview interactivePreview">
   <div className="previewTop"><div className="previewDots"><i/><i/><i/></div><span>student.skillbridge.ai</span><span className="previewLive"><i/> LIVE MODEL</span></div>
   <div className="previewBody"><aside className="previewSide"><div className="previewSideLogo">S</div>{views.map((x,i)=><button className={`previewNav ${i===active?"active":""}`} key={x.name} onClick={()=>setActive(i)}>{x.name}</button>)}</aside>
    <div className="previewContent interactiveContent" key={active}>
      <div className="previewHeader"><div><small>{v.kicker}</small><h3>{v.title}</h3></div><span className="miniTag">CLICKABLE PREVIEW</span></div>
      <div className="commandHero interactiveHero"><div className="previewRing"><span>{active===0?projected:v.metric}</span><small>{v.metricLabel}</small></div><div className="previewHeroCopy"><b>{v.title}</b><p>{v.copy}</p><div className="interactiveChips">{v.chips.map(c=><span key={c}>{c}</span>)}</div></div></div>
      {active===0?<div className="whatIfMini"><div><span>WHAT IF I IMPROVE REACT?</span><b>{skill}%</b></div><input aria-label="React proficiency simulation" type="range" min="20" max="80" value={skill} onChange={e=>setSkill(Number(e.target.value))}/><div className="whatIfScale"><span>current 46</span><strong>projected readiness {projected}%</strong><span>target 70</span></div></div>:<div className="previewMetrics">{v.chips.map((x,i)=><div className="previewMetric" key={x}><small>0{i+1}</small><b>{x}</b></div>)}</div>}
      <div className="previewGrid"><div className="previewPanel"><div className="previewPanelHead"><b>{active===3?"VISIBLE FACTORS":"LIVE SIGNALS"}</b><span>{active===0?"DRAG THE SLIDER":"NO BLACK BOX"}</span></div>{bars.map(([n,val])=><div className="barLine" key={n}><span>{n}</span><i style={{"--w":`${val}%`} as React.CSSProperties}/><b>{val}%</b></div>)}</div><div className="previewPanel"><div className="previewPanelHead"><b>WHY THIS MATTERS</b><span>EXPLAINABLE</span></div><div className="roleMini"><strong>{active===4?"Mentor explains structured facts":"Product Engineering Intern"}</strong><span>{active===3?"82% match · 5 visible signals":"Nova Labs · Remote"}</span><p>{active===4?"Ask “why React first?” and the answer is grounded in your actual gap graph.":"Change the simulated skill and the projection reacts immediately."}</p></div></div></div>
    </div>
   </div>
  </div>
  <div className="stageInteractionHint"><Route size={15}/><span>Try it — switch tabs and drag the skill simulator</span></div>
 </div>
}

export function InteractiveMatchEngine(){
 const [vals,setVals]=useState({skill:86,prof:71,interest:90,available:80,learn:75});
 const rows=[['Skill fit','skill',45],['Proficiency','prof',20],['Role interest','interest',15],['Availability','available',10],['Learning readiness','learn',10]] as const;
 const total=Math.round(vals.skill*.45+vals.prof*.20+vals.interest*.15+vals.available*.10+vals.learn*.10);
 return <div className="engineBoard interactiveEngine"><div className="engineBoardTop"><div><small>LIVE MATCH LAB</small><div className="engineSub">Move any signal. The score recalculates instantly.</div></div><strong>{total}%</strong></div>{rows.map(([name,key,weight])=><div className="engineRow interactiveEngineRow" key={name}><div><b>{name}</b><small>{weight}% weight</small></div><input aria-label={name} type="range" min="0" max="100" value={vals[key]} onChange={e=>setVals({...vals,[key]:Number(e.target.value)})}/><strong>{vals[key]}%</strong></div>)}<div className="explainCallout"><Sparkles size={16}/><p><b>Nothing hidden:</b> {total}% is produced only from the five values above. AI can explain this result, but it does not choose the number.</p></div></div>
}
